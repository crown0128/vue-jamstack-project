<template>
  <Layout>
    <h1>Products</h1>
    <ul v-if="$page.products && $page.products.edges && $page.products.edges.length">
      <li v-for="item in $page.products.edges" :key="item.node.id">
        <ProductsListItem :item="item.node" />
      </li>
    </ul>
  </Layout>
</template>

<page-query>
query Products {
  products: allContentfulProduct {
    edges {
      node {
        id,
        title,
        description,
        price,
        artist {
          name
        },
        createdAt,
        tags,
        categories {
          title
        },
        orientation,
        image {
          file {
            url
          }
        },
        dominantColors, 
      }
    }
  }
}
</page-query>

<script>
import ProductsListItem from "../components/ProductsListItem/index";

export default {
  metaInfo: {
    title: "Products"
  },
  name: "Products",
  components: { ProductsListItem }
};
</script>
