<template>
  <Layout>
    <div class="container mx-auto mb-20">
      <h1
        class="text-4xl text-coffee border-b border-coffee mb-3 tracking-widest text-center mx-auto"
      >
        Cart
      </h1>
      <div v-if="cart && cart.length">
        <div
          v-for="item in cart"
          :key="item.id"
          class="grid grid-cols-4 mx-5 px-5 py-3 text-center items-center"
        >
          <g-link :to="`/products/${item.slug}`" class="mx-auto">
            <img :src="item.image" :alt="item.title" width="200" />
          </g-link>
          <g-link :to="`/products/${item.slug}`">
            <p class="text-xl">{{ item.title }}</p>
            <p>
              {{ item.artist }}
            </p>
          </g-link>
          <div>
            <p>Quantity</p>
            <div
              class="flex flex-row h-10 w-32 rounded-lg relative bg-transparent mt-1 mx-auto"
            >
              <button
                @click.prevent="item.quantity > 1 ? item.quantity-- : null"
                class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
              >
                <span class="m-auto text-2xl font-thin">−</span>
              </button>
              <input
                type="number"
                class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center outline-none"
                min="1"
                v-model="item.quantity"
              />
              <button
                @click.prevent="item.quantity++"
                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
              >
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
            <p>
              <a
                href=""
                @click.prevent="removeItem(item.id)"
                class="text-coffee hover:text-dark-coffee"
                >Remove</a
              >
            </p>
          </div>
          <p class="text-lg font-semibold">
            {{ getItemPrice(item.quantity, item.price) }}€
          </p>
        </div>
        <div class="text-right">
          <p class="text-xl font-semibold tracking-wide mb-5">
            Total: <span class="text-2xl pl-2">{{ getTotalPrice(cart) }}€</span>
          </p>
          <button
            class="px-4 py-2 text-center transition duration-500 ease-in-out tracking-wider leading-none border rounded bg-coffee text-white hover:bg-dark-coffee mt-4 lg:mt-0 tracking-wide text-lg"
            @click.prevent="goToCheckout(cart)"
          >
            Checkout
          </button>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-xl italic">
          You don't have anything in your cart yet...
        </p>
        <div class="w-full text-center mt-10">
          <g-link
            class="px-4 py-2 text-center transition duration-500 ease-in-out tracking-wider leading-none border rounded bg-coffee text-white hover:bg-dark-coffee mt-4 lg:mt-0 tracking-wide text-lg"
            to="/products"
          >
            Browse our artworks
          </g-link>
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

<style lang="scss" scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
</style>
