<template>
  <div>
    <g-image :src="item.image.file.url" />
    <p>
      {{ item.title }}
      <br />
      {{ item.artist.name }}
    </p>
    <p>{{ item.price }}€</p>
  </div>
</template>

<script>
export default {
  name: "ProductsListItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>