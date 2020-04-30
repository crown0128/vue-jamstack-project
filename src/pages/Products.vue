<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <div v-for="product in $page.products.edges" :key="product.node.id" class="article d-flex">
      <h4>{{ product.node.title }}</h4>
      <p>{{ product.node.price }}€</p>
      <p>{{ product.node.description }}</p>
      <g-image :src="product.node.image" width="50" />
    </div>
  </Layout>
</template>

<page-query>
query {
  products: allProduct {
    edges {
      node {
        title
        price
        description
        image
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: "Hello, world!"
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
