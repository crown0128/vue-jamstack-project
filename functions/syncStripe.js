require('dotenv').config()
const Stripe = require('stripe')(process.env.GRIDSOME_STRIPE_SECRET_API_KEY)
const Contentful = require('contentful-management')

exports.handler = async function(event, context, callback) {
  try {
    const payload = JSON.parse(event.body)

    // If the sync is triggered by the API, ignore it to avoid an infinite loop
    if (payload.fields.updatedByApi) {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify('No synchronization needed.'),
      })
    }
    switch (payload.sys.type) {
      case 'Entry':
        payload.fields.id = payload.sys.id
        await upsertProduct(payload.fields)
        break
      case 'DeleteEntry':
        await deleteProduct(payload.sys.id)
        break
      default:
        break
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify('Synchronized with Stripe !'),
    })
  } catch (error) {
    console.error('Error while synchronizing product with Stripe', error)
    callback(null, {
      statusCode: 500,
      body: JSON.stringify(error),
    })
  }
}

const upsertProduct = async (product) => {
  const contentfulClient = Contentful.createClient({
    accessToken: process.env.GRIDSOME_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  })
  if (product.stripeId) {
    await updateProduct(product, contentfulClient)
    return
  }
  await createProduct(product, contentfulClient)
}

const updateProduct = async (product, contentfulClient) => {
  /**
   *  @TODO update if:
   * - name is different
   * - slug is different
   * - description is different
   * - new formats available
   *    - Get SKUs
   *        - check attributes value (update )
   */

  console.log('UPDATE PRODUCT')
  return
}

const createProduct = async (product, contentfulClient) => {
  // 1. Create product on Stripe
  const stripeProduct = await Stripe.products.create({
    name: product.name['en-US'],
    type: 'good',
    description: product.description['en-US'],
    attributes: ['format'],
    metadata: {
      contentfulId: product.id,
      slug: product.slug['en-US'],
    },
  })

  // Create new SKU for this product
  const SKU = await Stripe.skus.create({
    attributes: {
      // Static for now @TODO dynamic format once options are available
      format: 'classic',
    },
    // @TODO update depending on the format once multiple format will be available
    // Price in cents
    price: product.price['en-US'] * 100,
    currency: 'eur',
    inventory: { type: 'finite', quantity: 500 },
    product: stripeProduct.id,
  })

  // 3. Update the product on  Contentful with the Stripe info (id, sku id, quantity)
  const contentfulSpace = await contentfulClient.getSpace(
    process.env.GRIDSOME_CONTENTFUL_SPACE
  )
  const entry = await contentfulSpace.getEntry(product.id)
  entry.fields.stripeId = { 'en-US': stripeProduct.id }
  entry.fields.sku = { 'en-US': SKU.id }
  entry.fields.quantity = { 'en-US': SKU.inventory.quantity }
  entry.fields.maxQuantity = { 'en-US': SKU.inventory.quantity }
  entry.fields.updatedByApi = { 'en-US': true }
  const updatedEntry = await entry.update()
  await updatedEntry.publish()
}

const deleteProduct = async (productId) => {
  // @TODO delete SKUs then product
  console.log('DELETE PRODUCT')
  return
}
