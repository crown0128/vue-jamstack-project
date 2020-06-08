<template>
  <Layout ref="layout">
    <section class="flex w-full mb-16">
      <Sidebar class="sm:w-1/3 lg:w-1/5 w-full" @updateList="updateList" />
      <div class="products sm:w-2/3 lg:w-4/5 w-full">
        <h1 class="text-4xl antialiased text-coffee tracking-widest border-b border-coffee text-center mb-10">
          All Photographs
        </h1>
        <transition tag="div" name="fade" mode="out-in">
          <div v-if="filteredList && filteredList.length" key="list">
            <paginate tag="div" name="products" class="mb-16" :list="filteredList" :container="this" :per="4">
              <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <li v-for="item in paginated('products')" :key="item.node.id" class="product__item">
                  <Item :item="item.node" />
                </li>
              </ul>
            </paginate>
            <PaginationLinks :container="{
                state: paginate.products,
                el: $refs.layout,
              }" paginateName="products" />
          </div>
          <p v-else class="text-xl antialiased font-medium text-center pt-6" key="empty">
            No photographs to show...
          </p>
        </transition>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query Products {
  products: allContentfulProduct {
    edges {
      node {
        id,
        title,
        slug,
        description,
        price,
        artist {
          name
        },
        createdAt,
        tags,
        categories {
          title,
          slug
        },
        orientation,
        image {
          file {
            url
          }
        },
        dominantColors, 
        isBlackAndWhite,
        path
      }
    }
  }
}
</page-query>

<script>
import Item from "./Item";
import PaginationLinks from "@/components/PaginationLinks";
import Sidebar from "./Sidebar";

export default {
  metaInfo: {
    title: "Products"
  },
  name: "Products",
  components: { Item, PaginationLinks, Sidebar },
  data() {
    return {
      filteredList: [],
      isFiltered: false,
      list: [],
      paginate: ["products"]
    };
  },
  watch: {
    $page: {
      deep: true,
      immediate: true,
      handler() {
        if (!this.isFiltered) {
          this.list =
            (this.$page && this.$page.products && this.$page.products.edges) ||
            [];
          this.filteredList = JSON.parse(JSON.stringify(this.list));
        }
      }
    }
  },
  created() {
    this.list =
      (this.$page && this.$page.products && this.$page.products.edges) || [];
    this.filteredList = JSON.parse(JSON.stringify(this.list));
  },
  methods: {
    hasElements(itemElements, filterElements, fieldName) {
      if (!filterElements.length) {
        return true;
      }
      const formattedItemElements = itemElements.map(element =>
        element.toLowerCase()
      );
      for (const element of filterElements) {
        if (!formattedItemElements.includes(element.toLowerCase())) {
          return false;
        }
      }
      return true;
    },
    hasThemes(itemThemes, filterThemes) {
      if (!filterThemes.length) {
        return true;
      }
      for (const theme of filterThemes) {
        if (itemThemes.find(element => element.slug === theme)) {
          return true;
        }
      }
      return false;
    },
    updateList(event) {
      // If this is a reset, list is no longer considered as filtered
      this.isFiltered = event.reset === true ? false : true;

      const filters = event.filters;
      this.filteredList = this.list.filter(item => {
        const product = item.node;
        return (
          // Black and white filter
          product.isBlackAndWhite === filters.isBlackAndWhite &&
          // if not black and white only, dominant colors filter
          !filters.isBlackAndWhite &&
          this.hasElements(product.dominantColors, filters.dominantColors) &&
          // orientations (formats) filter
          (!filters.orientations.length ||
            filters.orientations.includes(product.orientation)) &&
          // Tags (keywords) filter
          this.hasElements(product.tags, filters.keywords) &&
          // Title  or artist search filter
          (product.title
            .toLowerCase()
            .includes(filters.search.toLowerCase().trim()) ||
            product.artist.name
              .toLowerCase()
              .includes(filters.search.toLowerCase().trim())) &&
          // Themes filter
          this.hasThemes(product.categories, filters.themes)
        );
      });
    }
  }
};
</script>

<style lang="css" scoped>
.products {
  margin: 15px;
}
.products__item {
  transition: all 1s;
}
</style>
