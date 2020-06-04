<template>
  <Layout>
    <div class="container mx-auto">
      <div class="slider my-5">
        <ClientOnly>
          <h1
            class="text-4xl antialiased text-coffee tracking-widest border-b border-coffee text-center mb-10"
          >
            Latest artworks
          </h1>
          <Carousel
            :centerMode="true"
            paginationActiveColor="#785e48"
            paginationColor="#d5cac4"
            paginationPosition="bottom-overlay"
            paginationSize="12"
            :navigationEnabled="true"
            :autoplayTimeout="4000"
            v-if="carouselItems.length"
          >
            <Slide v-for="item of carouselItems" :key="item.id" class="h-54">
              <g-link :to="item.node.path">
                <img
                  class="slide__image px-3"
                  :src="item.node.image.file.url"
                />
              </g-link>
            </Slide>
          </Carousel>
        </ClientOnly>
      </div>
    </div>
  </Layout>
</template>
<page-query>
query Products {
  products: allContentfulProduct(sortBy: "createdAt", order: DESC, limit: 5) {
    edges {
      node {
        id,
        title,
        slug,
        price,
        artist {
          name
        },
        createdAt,
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
        path
      }
    }
  }
}
</page-query>
<script>
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Carousel: () =>
      import('vue-carousel')
        .then((m) => m.Carousel)
        .catch(),
    Slide: () =>
      import('vue-carousel')
        .then((m) => m.Slide)
        .catch(),
  },
  data() {
    return {
      captions: ['This is slide 1', 'This is a third and final slide'],
      carouselItems: [],
      currentSlide: 0,
    }
  },
  watch: {
    $page: {
      deep: true,
      immediate: true,
      handler() {
        this.carouselItems =
          (this.$page && this.$page.products && this.$page.products.edges) || []
      },
    },
  },
}
</script>

<style lang="scss">
.home-links a {
  margin-right: 1rem;
}

.slide__image {
  width: 100%;
  height: 500px;
  object-fit: contain;
}
</style>
