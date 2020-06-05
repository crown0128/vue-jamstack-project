require('dotenv').config()
const Contentful = require('contentful')

exports.handler = async (event, context, callback) => {
  try {
    // Only accept POST method for this function
    if (event.httpMethod.toLowerCase() !== 'post') {
      return {
        statusCode: 400,
        body: 'Wrong HTTP method. Only accepts POST.',
      }
    }

    const payload = JSON.parse(event.body)

    if (!payload.cart) {
      return {
        status: 400,
        body: 'Cart is missing.',
      }
    }

    // Format products ids as a string separated by commas for the Contentful request
    const queryProductIds = payload.cart.map((item) => item.id).join(',')
    const invetoryIds = payload.cart.map((item) => item.inventoryId).join(',')

    // Create a Contentful Client
    const contentfulClient = Contentful.createClient({
      space: process.env.GRIDSOME_CONTENTFUL_SPACE,
      accessToken: process.env.GRIDSOME_CONTENTFUL_ACCESS_TOKEN,
      resolveLinks: true,
    })

    // Get products entries from Contentful
    const productEntries = await contentfulClient.getEntries({
      content_type: 'product',
      'sys.id[in]': queryProductIds,
    })

    const missingProducts = []

    // Get the list of products from the entries
    const products = productEntries ? productEntries.items : []

    for (const product of products) {
      const inventoryItem = product.fields.inventory.find((item) =>
        invetoryIds.includes(item.sys.id)
      )

      const cartItem = payload.cart.find(
        (item) => item.inventoryId === inventoryItem.sys.id
      )

      if (inventoryItem.fields.quantity - cartItem.quantity < 0) {
        missingProducts.push({
          itemId: cartItem.id,
          remaining: inventoryItem.fields.quantity,
        })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(missingProducts),
    }
  } catch (error) {
    console.error('Error while checking inventory', error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
