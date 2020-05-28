<template>
  <div>
    <a href="" @click.prevent="$emit('backToList')">&larr; Go Back</a>
    <p>Référence de la commande: #{{ order.ref.toUpperCase() }}</p>
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
</template>

<script>
export default {
  name: 'Order',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
