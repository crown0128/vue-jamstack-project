const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  netlifyId: String,
  email: String,
  name: String,
  phone: String,
  orders: {
    type: [
      {
        ref: String,
        // Contentful ids
        items: [
          {
            id: String,
            quantity: Number,
            price: Number,
          },
        ],
        total: Number,
      },
    ],
    default: [],
  },
})

module.exports = mongoose.model('User', UserSchema)
