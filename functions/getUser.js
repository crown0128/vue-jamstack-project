require('dotenv').config()
const mongoose = require('mongoose')
const UserModel = require('../models/User')

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

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    }
  } catch (error) {
    console.error('Error while getting user from DB', error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
