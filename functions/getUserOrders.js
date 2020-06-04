require('dotenv').config()
const mongoose = require('mongoose')
const UserModel = require('../models/User')
const Contentful = require('contentful')

exports.handler = async (event, context, callback) => {
  try {
    // Only accept GET method for this function
    if (event.httpMethod.toLowerCase() !== 'get') {
      return {
        statusCode: 400,
        body: 'Wrong HTTP method. Only accepts GET.',
      }
    }
    const userId = event.queryStringParameters.userId

    // If no user id we can't retreive its orders
    if (!userId) {
      return {
        statusCode: 400,
        body: 'The user id is missing.',
      }
    }

    // Connect to the DB
    await mongoose.connect(process.env.GRIDSOME_DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    // Get user from DB
    const user = await UserModel.findOne({ netlifyId: userId }).lean()

    const orders = (user && user.orders) || []

    if (orders.length) {
      // Create a Contentful Client
      const contentfulClient = Contentful.createClient({
        space: process.env.GRIDSOME_CONTENTFUL_SPACE,
        accessToken: process.env.GRIDSOME_CONTENTFUL_ACCESS_TOKEN,
        resolveLinks: true,
      })

      let productIds = []

      // Gather all products from all user orders to send only one request to the Contentful API
      for (const order of orders) {
        productIds = productIds.concat(
          order.items.map((item) => item.productId)
        )
      }

      // Format products ids as a string separated by commas for the Contentful request
      const queryProductIds = [...new Set(productIds)].join(',')

      // Get products entries from Contentful
      const productEntries = await contentfulClient.getEntries({
        content_type: 'product',
        'sys.id[in]': queryProductIds,
      })

      // Get the list of products from the entries
      const products = productEntries ? productEntries.items : []

      // Add data from Contentful to the orders' items
      for (const order of orders) {
        for (const item of order.items) {
          // Find Contentful product matching the order's item id
          const matchingProduct = products.find(
            (product) => product.sys.id === item.productId
          )
          // Add necessary data to order's item if a Contentful product xas found
          if (matchingProduct) {
            const fields = matchingProduct.fields
            item.name = fields.name
            item.slug = fields.slug
            item.artist = fields.artist.fields.name
            item.image = fields.image.fields.file.url
          }
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        orders.sort((a, b) => {
          return b.createdAt - a.createdAt
        })
      ),
    }
  } catch (error) {
    console.error("Error while getting user's orders from DB", error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
