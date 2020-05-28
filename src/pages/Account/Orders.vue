<template>
  <Layout>
    <h1>My orders</h1>
    <div v-if="orders.length">
      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Reference</th>
            <th class="px-4 py-2">Price</th>
            <th class="px-4 py-2">Date</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <td class="border px-4 py-2">{{ order.ref }}</td>
            <td class="border px-4 py-2">{{ order.total }}€</td>
            <td class="border px-4 py-2">{{ order.createdAt }}</td>
            <td class="border px-4 py-2">View details</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <span>
        No orders so far...
      </span>
      <div class="text-center mt-4">
        <g-link
          class="px-4 py-2 leading-none border rounded bg-red-800 text-white hover:bg-red-900 mt-4 lg:mt-0"
          to="/products"
        >
          Check our artworks
        </g-link>
      </div>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AccountOrders',
  data() {
    return {
      isLoading: true,
      orders: [],
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    getOrders() {
      // @TODO add loader
      const user =
        localStorage.getItem('gotrue.user') &&
        JSON.parse(localStorage.getItem('gotrue.user'))

      if (!user || !user.id) {
        this.isLoading = false
        return
      }
      axios
        .get(`${process.env.GRIDSOME_API_URL}/getUserOrders?userId=${user.id}`)
        .then((response) => {
          // handle success
          if (!response.data) {
            return
          }

          this.orders = response.data
        })
        .catch((error) => {
          // handle error
          // @TODO display error message
          console.log(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>
