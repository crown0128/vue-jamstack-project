<template>
  <Layout>
    <modal name="addedToCart">
      <div class="px-5 py-5">
        <p class="text-2xl font-semibold pb-3">
          You just added to your cart:
        </p>
        <div class="grid grid-cols-2">
          <div>
            <img :src="$page.product.image.file.url" width="175" />
          </div>
          <div>
            <h1>{{ $page.product.title }}</h1>
            <h2>{{ $page.product.artist.name }}</h2>
            <p class="text-2xl font-semibold pb-3">
              {{ $page.product.price }}€
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 mt-3">
          <a
            href=""
            class="text-lg tracking-wide"
            @click.prevent="$modal.hide('addedToCart')"
            >&larr; Continue shopping
          </a>
          <g-link
            class="px-4 py-2 leading-none border rounded bg-red-800 text-white hover:bg-red-900 mt-4 lg:mt-0 tracking-wide text-lg"
            to="/cart"
          >
            Go to cart &rarr;
          </g-link>
        </div>
      </div>
    </modal>
    <g-link to="/products" class="link"> &larr; Go Back</g-link>
    <section v-if="$page.product">
      <div class="grid grid-rows-2">
        <div class="product__main grid grid-cols-2">
          <img v-img :src="$page.product.image.file.url" />
          <div class="main__details">
            <div class="product__title">
              <h1>{{ $page.product.title }}</h1>
              <h2>{{ $page.product.artist.name }}</h2>
              <h3>Options <small class="italic">Coming soon...</small></h3>
              <p>{{ $page.product.dimensions }}</p>
              <p>{{ $page.product.price }}€</p>
              <button
                class="px-4 py-2 leading-none border rounded bg-red-800 text-white hover:bg-red-900 mt-4 lg:mt-0"
                @click.prevent="addToCart($page.product)"
              >
                &#43; Add to cart
              </button>
            </div>
          </div>
        </div>
        <div class="product__details grid grid-cols-2">
          <div class="details__product">
            <p>Description</p>
            <p>{{ $page.product.description }}</p>
            <p
              v-if="
                $page.product.dominantColors &&
                  $page.product.dominantColors.length
              "
            >
              {{ $page.product.dominantColors }}
            </p>
            <p>{{ $page.product.tags }}</p>
          </div>
          <div class="details__artist">
            <p>Photographer</p>
            <p>
              {{ $page.product.artist.biography.content[0].content[0].value }}
            </p>
            <a href="" @click.prevent>view more...</a>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query Product ($path: String!) {
   product: contentfulProduct (path: $path) {
    id,
    title,
    slug,
    description,
    price,
    artist {
      name,
      biography
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
    dimensions {
      format {
        name
      },
      height,
      width
    },
    stripeId,
    sku
  }
}
</page-query>

<script>
export default {
  name: 'Product',
  methods: {
    addToCart(product) {
      if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]))
      }
      const cart = JSON.parse(localStorage.getItem('cart'))

      const existingReference = cart.find((item) => item.id === product.id)

      if (!existingReference) {
        cart.push({
          id: product.id,
          title: product.title,
          slug: product.slug,
          artist: product.artist.name,
          price: product.price,
          image: product.image.file.url,
          stripeId: product.stripeId,
          sku: product.sku,
          quantity: 1,
        })
      } else {
        existingReference.quantity += 1
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      this.$modal.show('addedToCart')
    },
  },
}
</script>

<style lang="scss" scoped></style>
