<template>
  <Layout>
    <div class="container mx-auto">
      <div class="slider my-5">
        <ClientOnly>
          <Carousel :centerMode="true" :perPage="1" v-if="carouselItems.length">
            <Slide v-for="item of carouselItems" :key="item.id">
              <g-link :to="item.node.path">
                <img class="" :src="item.node.image.file.url" />
              </g-link>
            </Slide>

            <!-- <template slot="caption" class="p-6">
              {{ captions[currentSlide] }}
            </template>
            <template slot="prevButton"
              ><svg
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="text-coffee block mx-auto h-8 w-8 fill-current"
              >
                <g>
                  <g id="icon-shape">
                    <polygon
                      id="Combined-Shape"
                      points="7.05025253 9.29289322 6.34314575 10 12 15.6568542 13.4142136 14.2426407 9.17157288 10 13.4142136 5.75735931 12 4.34314575"
                    ></polygon>
                  </g>
                </g></svg
            ></template>
            <template slot="nextButton"
              ><svg
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="text-coffee block mx-auto h-8 w-8 fill-current"
              >
                <g>
                  <g id="icon-shape">
                    <polygon
                      id="Combined-Shape"
                      points="12.9497475 10.7071068 13.6568542 10 8 4.34314575 6.58578644 5.75735931 10.8284271 10 6.58578644 14.2426407 8 15.6568542 12.9497475 10.7071068"
                    ></polygon>
                  </g>
                </g></svg
            ></template> -->
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
</style>
