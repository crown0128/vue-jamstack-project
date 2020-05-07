<template>
  <Layout>
    <section class="flex w-full">
      <Sidebar class="sm:w-1/3 lg:w-1/5 w-full" @updateList="updateList" />
      <div class="products sm:w-2/3 lg:w-4/5 w-full">
        <h1 class="text-4xl antialiased font-medium text-center pb-6">
          All Photographs
        </h1>
        <ul
          v-if="filteredList && filteredList.length"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          <li v-for="item in filteredList" :key="item.node.id">
            <Item :item="item.node" />
          </li>
        </ul>
        <p class="text-xl antialiased font-medium text-center pt-6" v-else>
          No photographs to show...
        </p>
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
        description,
        price,
        artist {
          id,
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
        isBlackAndWhite
      }
    }
  }
}
</page-query>

<script>
import Item from './Item'
import Sidebar from './Sidebar'

export default {
  metaInfo: {
    title: 'Products',
  },
  name: 'Products',
  components: { Item, Sidebar },
  data() {
    return {
      filteredList: [],
      isFiltered: false,
      list: [],
    }
  },
  watch: {
    $page: {
      deep: true,
      immediate: true,
      handler() {
        if (!this.isFiltered) {
          this.list =
            (this.$page && this.$page.products && this.$page.products.edges) ||
            []
          this.filteredList = JSON.parse(JSON.stringify(this.list))
        }
      },
    },
  },
  created() {
    this.list =
      (this.$page && this.$page.products && this.$page.products.edges) || []
    this.filteredList = JSON.parse(JSON.stringify(this.list))
  },
  methods: {
    hasElements(itemElements, filterElements, fieldName) {
      if (!filterElements.length) {
        return true
      }
      const formattedItemElements = itemElements.map((element) =>
        element.toLowerCase()
      )
      for (const element of filterElements) {
        if (!formattedItemElements.includes(element.toLowerCase())) {
          return false
        }
      }
      return true
    },
    hasThemes(itemThemes, filterThemes) {
      if (!filterThemes.length) {
        return true
      }
      for (const theme of filterThemes) {
        if (itemThemes.find((element) => element.slug === theme)) {
          return true
        }
      }
      return false
    },
    updateList(event) {
      // If this is a reset, list is no longer considered as filtered
      this.isFiltered = event.reset === true ? false : true

      const filters = event.filters
      this.filteredList = this.list.filter((item) => {
        const product = item.node
        return (
          // Black and white filter
          product.isBlackAndWhite === filters.isBlackAndWhite &&
          // if not black and white only, dominant colors filter
          (!filters.isBlackAndWhite &&
            this.hasElements(product.dominantColors, filters.dominantColors)) &&
          // orientations (formats) filter
          (!filters.orientations.length ||
            filters.orientations.includes(product.orientation)) &&
          // Tags (keywords) filter
          this.hasElements(product.tags, filters.keywords) &&
          // Title search filter
          product.title
            .toLowerCase()
            .includes(filters.search.toLowerCase().trim()) &&
          // Themes filter
          this.hasThemes(product.categories, filters.themes) &&
          // Artists filter
          (!filters.artists.length ||
            filters.artists.some((artist) => artist.id === product.artist.id))
        )
      })
    },
  },
}
</script>

<style lang="css" scoped>
.products {
  margin: 15px;
}
</style>
