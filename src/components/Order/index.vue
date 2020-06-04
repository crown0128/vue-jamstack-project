<template>
  <div class="container mx-auto">
    <div class="flex flex-col justify-center ">
      <span>
        <a href="" @click.prevent="$emit('backToList')" class="transition duration-500 ease-in-out text-limed tracking-wider border-b border-transparent hover:border-coffee hover:text-coffee">&larr; Go Back</a>
      </span>
      <h2 class="text-2xl">Référence de la commande: #{{ order.ref.toUpperCase() }}</h2>
      <p class="italic">{{ orderDate }}</p>
      <table class="table-auto">
        <thead></thead>
        <tbody>
          <tr v-for="item in order.items" :key="item.productId">
            <td class="px-4 py-2">
              <img :src="item.image" :alt="item.name" width="200" />
            </td>
            <td class="px-4 py-2">{{ item.name }}</td>
            <td class="px-4 py-2">{{ item.artist }}</td>
            <td class="px-4 py-2">{{ item.quantity }}</td>
            <td class="px-4 py-2">{{ item.price * item.quantity }}€</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td class="text-right font-bold pr-3">Total:</td>
            <td>{{ order.total }}€</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "Order",
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  computed: {
    orderDate() {
      return dayjs(this.order.createdAt).format("MMM DD, YYYY HH:mm A");
    }
  }
};
</script>

<style lang="scss" scoped></style>
