const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  netlifyId: String,
  email: String,
  name: String,
  username: String,
  phone: String,
  orders: {
    type: [
      {
        ref: String,
        // Contentful ids
        items: [
          {
            productId: String,
            quantity: Number,
            price: Number,
          },
        ],
        total: Number,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    default: [],
  },
})

module.exports = mongoose.model('User', UserSchema)
