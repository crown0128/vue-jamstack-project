<template>
  <Layout>
    <div class="grid grid-cols-3">
      <div v-if="order && order.length" class="col-start-2 col-span-1">
        <h1 class="text-3xl font-semibold text-center">Thank you!</h1>
        <h2 class="text-center">Order summary</h2>
        <div v-for="item in order" :key="item.id" class="grid grid-cols-6 mt-5">
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
            Total: {{ getTotalPrice(order) }}€
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
export default {
  name: 'CheckoutSuccess',
  data() {
    return {
      order: [],
    }
  },
  mounted() {
    if (sessionStorage.getItem('order') && !localStorage.getItem('cart')) {
      this.order = JSON.parse(sessionStorage.getItem('order'))
      return
    }
    this.order =
      (localStorage.getItem('cart') &&
        JSON.parse(localStorage.getItem('cart'))) ||
      []
    sessionStorage.setItem('order', JSON.stringify(this.order))
    localStorage.removeItem('cart')
  },
  methods: {
    getTotalPrice(order) {
      return order.reduce(function(prev, cur) {
        return prev + cur.price * cur.quantity
      }, 0)
    },
  },
}
</script>
