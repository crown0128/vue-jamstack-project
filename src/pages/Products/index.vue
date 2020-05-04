<template>
  <Layout>
    <div class="flex w-full">

        <Sidebar class="sm:w-1/3 lg:w-1/5 w-full"/>
        <div class="products sm:w-2/3 lg:w-4/5 w-full">

    <h1>Products</h1>
    <ul v-if="$page.products && $page.products.edges && $page.products.edges.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <li v-for="item in $page.products.edges" :key="item.node.id">
        <Item :item="item.node" />
      </li>
    </ul>
        </div>
    </div>
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
import Item from "./Item";
import Sidebar from "./Sidebar"
export default {
  metaInfo: {
    title: "Products"
  },
  name: "Products",
  components: { Item, Sidebar }
};
</script>

<style lang="scss" src="../../styles/modules/pages/_products.scss" scoped>
