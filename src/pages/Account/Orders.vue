<template>
  <Layout>
    <div class="container mx-auto mb-32 relative">
      <Loader v-if="isLoading" />
      <h1 class="text-4xl text-coffee border-b border-coffee mb-3 tracking-widest text-center mx-auto">{{ selectedOrder ? 'Order details' : 'My orders' }}</h1>
      <div v-if="orders.length && !selectedOrder">
        <table class="table-auto w-full">
          <thead>
            <tr class="text-left">
              <th class="px-4 py-2">Reference</th>
              <th class="px-4 py-2">Price</th>
              <th class="px-4 py-2">Date</th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id" class="hover:bg-gray-200 cursor-pointer" @click.prevent="selectedOrder = order">
              <td class="border px-4 py-2">{{ order.ref.toUpperCase() }}</td>
              <td class="border px-4 py-2">{{ order.total }}€</td>
              <td class="border px-4 py-2">{{ formatDate(order.createdAt) }}</td>
              <td class="border px-4 py-2 text-center">
                <a href="" @click.prevent="selectedOrder = order">View details</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Order v-else-if="selectedOrder" :order="selectedOrder" @backToList="selectedOrder = null" />
      <div v-else>
        <span>
          No orders so far...
        </span>
        <div class="text-center mt-4">
          <g-link class="px-4 py-2 leading-none border rounded bg-red-800 text-white hover:bg-red-900 mt-4 lg:mt-0" to="/products">
            Check our artworks
          </g-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import Loader from "@/components/Loader";
import Order from "@/components/Order";
export default {
  name: "AccountOrders",
  components: { Loader, Order },
  data() {
    return {
      isLoading: true,
      orders: [],
      selectedOrder: null
    };
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("MMM DD, YYYY HH:mm A");
    },
    getOrders() {
      // @TODO add loader
      const user =
        localStorage.getItem("gotrue.user") &&
        JSON.parse(localStorage.getItem("gotrue.user"));

      if (!user || !user.id) {
        this.isLoading = false;
        return;
      }
      axios
        .get(`${process.env.GRIDSOME_API_URL}/getUserOrders?userId=${user.id}`)
        .then(response => {
          // handle success
          if (!response.data) {
            return;
          }

          this.orders = response.data;
        })
        .catch(error => {
          // handle error
          // @TODO display error message
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
