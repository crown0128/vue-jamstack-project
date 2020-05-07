<template>
  <div class="product">
    <g-image :src="item.image.file.url" />
    <div class="product--info mt-2 grid grid-cols-1 sm:grid-cols-4">
      <p class="antialiased sm:col-span-3">
        <span class="product--title font-semibold">{{ item.title }}</span>
        <br />
        <span class="product--artist">{{ item.artist.name }}</span>
      </p>
      <p class="product--price sm:col-span-1 sm:text-right">
        {{ item.price }}€
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsListItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.product {
  margin: 10px;
}
</style>
