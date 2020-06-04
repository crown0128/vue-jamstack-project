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
      <div class="my-24 border-t pt-10 border-granny">
        <h2
          class="text-2xl text-granny mb-3 tracking-widest text-center mx-auto"
        >
          <span class=" px-5">Join our newsletter</span>
        </h2>
        <div class="newsletter w-full max-w-lg mx-auto">
          <form
            name="Newsletter Form"
            method="POST"
            @submit.prevent="register"
            class="rounded px-8 pt-6 pb-8 mb-4"
          >
            <div class="mb-4 w-full">
              <label for="email" class="block mb-2">Your email</label>

              <input
                v-model="email"
                type="email"
                name="email"
                placeholder="Enter your email address..."
                :disabled="isLoading"
                class="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="flex items-center text-right">
              <div class="w-2/3">
                <p class="text-center" v-if="isSuccessful">
                  {{ successMessage }}
                </p>
                <p
                  class="text-center text-red-500"
                  v-if="!isSuccessful && errorMessage"
                >
                  {{ errorMessage }}
                </p>
              </div>
              <button
                class="w-1/3 transition duration-500 ease-in-out bg-coffee hover:bg-dark-coffee text-white tracking-wider py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                :disabled="isLoading"
              >
                Send
              </button>
            </div>
          </form>
        </div>
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
      carouselItems: [],
      email: '',
      errorMessage: null,
      isLoading: false,
      isSuccessful: false,
      successMessage: 'You subscribed successfully!',
    }
  },
  watch: {
    email: function(newValue, oldValue) {
      this.isSuccessful = false
      if (this.errorMessage && !oldValue.length && newValue.length) {
        this.errorMessage = null
      }
      if (!this.errorMessage && !newValue.length) {
        this.errorMessage = 'Email cannot be empty'
      }
      // @TODO check email format
    },
    $page: {
      deep: true,
      immediate: true,
      handler() {
        this.carouselItems =
          (this.$page && this.$page.products && this.$page.products.edges) || []
      },
    },
  },
  methods: {
    register() {
      // @TODO check email format
      this.isSuccessful = false
      this.errorMessage = null
      if (!this.email || !this.email.length) {
        this.errorMessage = 'Email cannot be empty'
        return
      }

      this.isLoading = true

      axios
        .post(`${process.env.GRIDSOME_API_URL}/mailchimp`, {
          body: { email: this.email },
        })
        .then((response) => {
          // handle success
          this.isSuccessful = true
        })
        .catch((error) => {
          // handle error
          this.isSuccessful = false
          this.errorMessage = 'Something went wrong... Please try again later.'
        })
        .finally(() => {
          this.isLoading = false
        })
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
