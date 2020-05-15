<template>
  <Layout>
    <div class="m-20 px-5">
      <h1 class="text-2xl">Cart</h1>
      <div v-if="cart && cart.length">
        <div
          v-for="item in cart"
          :key="item.id"
          class="grid grid-cols-4 mx-5 px-5 py-3 "
        >
          <g-link :to="`/products/${item.slug}`">
            <img :src="item.image" :alt="item.title" width="200" />
          </g-link>
          <g-link :to="`/products/${item.slug}`">
            <p>{{ item.title }}</p>
            <p>
              <small>{{ item.artist }}</small>
            </p>
          </g-link>
          <div>
            <p>Quantity</p>
            <input type="number" min="1" v-model="item.quantity" />
            <p>
              <a
                href=""
                @click.prevent="removeItem(item.id)"
                class="text-red-800 hover:text-red-900"
                >Remove</a
              >
            </p>
          </div>
          <p>{{ getItemPrice(item.quantity, item.price) }}€</p>
        </div>
        <div class="text-right">
          <p>{{ getTotalPrice(cart) }}€</p>
          <button
            class="px-4 py-2 leading-none border rounded bg-red-800 text-white hover:bg-red-900 mt-4 lg:mt-0"
            @click.prevent="goToCheckout(cart)"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'

export default {
  name: 'Cart',
  data() {
    return {
      cart: [],
    }
  },
  mounted() {
    this.cart =
      (localStorage.getItem('cart') &&
        JSON.parse(localStorage.getItem('cart'))) ||
      []
  },
  methods: {
    getItemPrice(quantity, price) {
      localStorage.setItem('cart', JSON.stringify(this.cart))
      return quantity * price
    },
    getTotalPrice(cart) {
      return cart.reduce(function(prev, cur) {
        return prev + cur.price * cur.quantity
      }, 0)
    },
    async goToCheckout(cart) {
      const formattedItems = cart.map((item) => {
        return {
          price: item.sku,
          quantity: parseInt(item.quantity, 10),
        }
      })

      const stripeSession = require('stripe')(
        process.env.GRIDSOME_STRIPE_PUBLIC_API_KEY
      )

      const stripe = await loadStripe(
        process.env.GRIDSOME_STRIPE_PUBLIC_API_KEY
      )
      stripe
        .redirectToCheckout({
          successUrl: `${process.env.GRIDSOME_BASE_URL}/checkout/success`,
          cancelUrl: `${process.env.GRIDSOME_BASE_URL}/cart`,
          mode: 'payment',
          lineItems: formattedItems,
        })
        .catch((error) => {
          console.error('ERROR', error)
        })
    },
    removeItem(itemId) {
      const index = this.cart.findIndex((item) => item.id === itemId)
      if (index > -1) {
        this.cart.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
