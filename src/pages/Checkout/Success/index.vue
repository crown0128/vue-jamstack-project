<template>
  <Layout>
    <div class="grid grid-cols-3">
      <div v-if="order && order.items.length" class="col-start-2 col-span-1">
        <h1 class="text-3xl font-semibold text-center">Thank you!</h1>
        <h2 class="text-center">Order summary</h2>
        <h3>Ref: {{ order.ref }}</h3>
        <div
          v-for="item in order.items"
          :key="item.id"
          class="grid grid-cols-6 mt-5"
        >
          <img
            :src="item.image"
            :alt="item.title"
            width="200"
            class="col-span-2"
          />
          <p class="col-span-2 pl-3">
            {{ item.title }} <br />
            <small>{{ item.artist }}</small>
          </p>

          <p class="col-auto text-right">x{{ item.quantity }}</p>
          <p class="col-auto text-right">{{ item.quantity * item.price }}€</p>
        </div>
        <div class=" grid grid-rows-2">
          <p class="text-right text-lg font-medium">
            Total: {{ getTotalPrice(order.items) }}€
          </p>
          <div class="text-center mt-4">
            <g-link
              class="px-4 py-2 leading-none border rounded bg-red-800 text-white hover:bg-red-900 mt-4 lg:mt-0"
              to="/products"
            >
              See more artworks
            </g-link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CheckoutSuccess',
  data() {
    return {
      order: { ref: '', items: [] },
    }
  },
  mounted() {
    if (sessionStorage.getItem('order') && !localStorage.getItem('cart')) {
      this.order = JSON.parse(sessionStorage.getItem('order'))
      return
    }
    this.order.items =
      (localStorage.getItem('cart') &&
        JSON.parse(localStorage.getItem('cart'))) ||
      []
    this.order.ref = Math.random()
      .toString(36)
      .substr(2)
    sessionStorage.setItem('order', JSON.stringify(this.order))
    localStorage.removeItem('cart')

    this.saveOrder(this.order)
  },
  methods: {
    getTotalPrice(items) {
      return items.reduce(function(prev, cur) {
        return prev + cur.price * cur.quantity
      }, 0)
    },
    saveOrder(order) {
      const user =
        localStorage.getItem('gotrue.user') &&
        JSON.parse(localStorage.getItem('gotrue.user'))

      if (!user || !user.id) {
        return
      }
      const items = order.items.map((item) => {
        return {
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        }
      })

      const formattedOrder = {
        ref: order.ref,
        items,
        total: this.getTotalPrice(order.items),
        userId: user.id,
      }

      axios
        .post(`${process.env.GRIDSOME_API_URL}/saveUserOrder`, {
          order: formattedOrder,
        })
        .catch((error) => {
          // handle error
          // @TODO display error message
          console.log(error)
        })
    },
  },
}
</script>
