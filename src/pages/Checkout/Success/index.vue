<template>
  <Layout>
    <div class="container mx-auto mb-20">
      <div v-if="order && order.items.length">
        <h1
          class="text-4xl text-coffee border-b border-coffee mb-3 tracking-widest text-center mx-auto"
        >
          Thank you!
        </h1>
        <h2
          class="text-2xl text-granny mb-3 tracking-widest text-center mx-auto"
        >
          Order summary
        </h2>
        <h3 class="text-lg font-semibold text-center">
          Reference: #{{ order.ref.toUpperCase() }}
        </h3>
        <div
          v-for="item in order.items"
          :key="item.id"
          class="grid grid-cols-6 my-5 items-center"
        >
          <div class="mx-auto col-span-2">
            <img :src="item.image" :alt="item.title" width="200" />
          </div>
          <p class="col-span-2 pl-3 text-lg  text-center">
            {{ item.title }} <br />
            <small>{{ item.artist }}</small>
          </p>

          <p class="col-auto text-right">x{{ item.quantity }}</p>
          <p class="col-auto text-lg font-semibold text-right">
            {{ item.quantity * item.price }}€
          </p>
        </div>
        <div class=" grid grid-rows-2">
          <p class="text-right text-lg tracking-wide font-semibold">
            Total: {{ getTotalPrice(order.items) }}€
          </p>
          <div class="w-full text-center mt-10">
            <g-link
              class="px-4 py-2 text-center transition duration-500 ease-in-out tracking-wider leading-none border rounded bg-coffee text-white hover:bg-dark-coffee mt-4 lg:mt-0 tracking-wide text-lg"
              to="/products"
            >
              Browse more artworks
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
