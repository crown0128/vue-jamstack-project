require('dotenv').config()
const Stripe = require('stripe')(process.env.GRIDSOME_STRIPE_SECRET_API_KEY)
const ContentfulManagement = require('contentful-management')
// https://community.netlify.com/t/how-to-include-dependencies-in-netlify-lambda-functions/2323/5

exports.handler = async function(event, context, callback) {
  try {
    const payload = JSON.parse(event.body)

    // If the sync is triggered by the API, ignore it to avoid an infinite loop
    if (payload.fields.updatedByApi) {
      return {
        statusCode: 200,
        body: JSON.stringify('No synchronization needed.'),
      }
    }
    switch (payload.sys.type) {
      // 'Entry' means creation or update of a product
      case 'Entry':
        payload.fields.id = payload.sys.id
        await upsertProduct(payload.fields)
        break
      // 'DeleteEntry' means deletion of a product
      case 'DeleteEntry':
        await Stripe.products.del(payload.sys.id)
        break
      default:
        break
    }
    return {
      statusCode: 200,
      body: JSON.stringify('Synchronized with Stripe !'),
    }
  } catch (error) {
    console.error('Error while synchronizing product with Stripe', error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}

const upsertProduct = async (product) => {
  const contentfulClient = ContentfulManagement.createClient({
    accessToken: process.env.GRIDSOME_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  })
  if (product.stripeId) {
    await updateProduct(product, contentfulClient)
    return
  }
  await createProduct(product, contentfulClient)
}

const updateProduct = async (product, contentfulClient) => {
  const contentfulSpace = await contentfulClient.getSpace(
    process.env.GRIDSOME_CONTENTFUL_SPACE
  )
  const entry = await contentfulSpace.getEntry(product.id)

  // If the product does not have a Stripe Price yet, let's create it
  if (!product.stripePriceId) {
    const stripePrice = await Stripe.prices.create({
      unit_amount: product.price['en-US'] * 100,
      currency: 'eur',
      product: product.stripeId['en-US'],
    })
    entry.fields.stripePriceId = { 'en-US': stripePrice.id }
  }

  // Update product in Stripe
  await Stripe.products.update(product.stripeId['en-US'], {
    name: product.name['en-US'],
    description: product.description['en-US'],
    metadata: {
      contentfulId: product.id,
      slug: product.slug['en-US'],
    },
  })

  // This field is important to avoid infinite loop when 'publish' event is detected
  entry.fields.updatedByApi = { 'en-US': true }
  const updatedEntry = await entry.update()
  await updatedEntry.publish()
}

const createProduct = async (product, contentfulClient) => {
  const contentfulSpace = await contentfulClient.getSpace(
    process.env.GRIDSOME_CONTENTFUL_SPACE
  )

  // 1. Create product on Stripe
  const stripeProduct = await Stripe.products.create({
    name: product.name['en-US'],
    type: 'good',
    description: product.description['en-US'],
    metadata: {
      contentfulId: product.id,
      slug: product.slug['en-US'],
    },
  })

  // 2. Create new price for this product
  const stripePrice = await Stripe.prices.create({
    unit_amount: product.price['en-US'] * 100,
    currency: 'eur',
    product: stripeProduct.id,
  })

  // 3. Update the product on  Contentful with the Stripe info (id, sku id, quantity)
  const entry = await contentfulSpace.getEntry(product.id)
  entry.fields.stripeId = { 'en-US': stripeProduct.id }
  entry.fields.stripePriceId = { 'en-US': stripePrice.id }
  // This field is important to avoid infinite loop when 'publish' event is detected
  entry.fields.updatedByApi = { 'en-US': true }
  const updatedEntry = await entry.update()
  await updatedEntry.publish()
}
