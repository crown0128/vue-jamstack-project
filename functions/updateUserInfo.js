require('dotenv').config()
const mongoose = require('mongoose')
const UserModel = require('../models/User')

exports.handler = async (event, context, callback) => {
  try {
    if (event.httpMethod.toLowerCase() !== 'post') {
      return {
        statusCode: 400,
        body: 'Wrong HTTP method. Only accepts POST.',
      }
    }

    await mongoose.connect(process.env.GRIDSOME_DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    const payload = JSON.parse(event.body)
    console.log(payload)
    if (!payload.user) {
      return {
        statusCode: 400,
        body: 'user info are missing.',
      }
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { netlifyId: payload.user.netlifyId },
      { $set: { name: payload.user.name } },
      { new: true }
    )

    return {
      statusCode: 200,
      body: JSON.stringify(updatedUser),
    }
  } catch (error) {
    console.error('Error while saving order in DB', error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
