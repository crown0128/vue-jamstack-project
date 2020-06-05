<template>
  <Layout>
    <modal name="addedToCart" transition="fade">
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
          <span>
            <a href="" class="text-lg transition duration-500 ease-in-out text-limed border-b border-transparent hover:border-coffee hover:text-coffee" @click.prevent="$modal.hide('addedToCart')">&larr; Continue shopping
            </a>
          </span>
          <g-link class="px-4 py-2 text-center transition duration-500 ease-in-out tracking-wider leading-none border rounded bg-coffee text-white hover:bg-dark-coffee mt-4 lg:mt-0 tracking-wide text-lg" to="/cart">
            Go to cart &rarr;
          </g-link>
        </div>
      </div>
    </modal>
    <div class="container mx-auto">
      <g-link to="/products" class="transition duration-500 ease-in-out text-limed tracking-wider border-b border-transparent hover:border-coffee hover:text-coffee ">
        &larr; Go Back</g-link>
      <section v-if="$page.product">
        <div class="grid grid-rows-2 text-limed">
          <div class="product__main grid grid-cols-2 py-2">
            <img v-img :src="$page.product.image.file.url" class="px-5" />
            <div class="main__details px-5">
              <h1 class="text-2xl">{{ $page.product.title }}</h1>
              <h2 class="text-xl text-granny">
                {{ $page.product.artist.name }}
              </h2>
              <!-- <p class="text-gray-500 pb-5">
                  {{ $page.product.dimensions[0].format.name }}
                  <span>{{ formatDimensions($page.product.dimensions[0]) }}</span>
                </p> -->
              <p class="pb-5">
                Options <small class="italic">Coming soon...</small>
              </p>
              <p class="text-xl pb-5 font-bold">{{ $page.product.price }}€</p>
              <button class="px-4 py-2 transition duration-500 ease-in-out tracking-wider leading-none border rounded bg-coffee text-white hover:bg-dark-coffee mt-4 lg:mt-0" @click.prevent="addToCart($page.product)">
                &#43; Add to cart
              </button>
              <div class="dimensions w-full mt-5">
                <p class="text-xl text-coffee tracking-wide">Limited editions</p>
                <div v-for="(item, index) in $page.product.inventory" :key="index" class="pt-3">
                  <p><span class="text-lg tracking-wide font-semibold">{{ item.dimension.format.name.toUpperCase() }}</span> - {{ formatDimensions(item.dimension)}}
                  </p>
                  <p class="">{{ item.maxQuantity }} prints <span v-if="item.maxQuantity > item.quantity" class="italic text-xs"> - {{ item.quantity }} remaining</span></p>

                  <div class="bg-gray-400 rounded">
                    <div class="bg-granny text-xs leading-none py-1 rounded" :style="{ width: `${getPercentageInventory(item.maxQuantity, item.quantity)}%` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product__details grid grid-cols-2 py-2">
            <div class="details__product px-5">
              <p class="text-2xl text-coffee border-b border-coffee mb-3 tracking-widest">
                About the artwork
              </p>
              <p class="text-justify">{{ $page.product.description }}</p>
              <div class="grid grid-cols-2">
                <div v-if="
                    $page.product.dominantColors &&
                      $page.product.dominantColors.length
                  " class="pt-5 mr-2">
                  <p class="text-lg text-granny border-b border-granny mb-3 tracking-widest">
                    Dominant colors
                  </p>
                  <div class="grid grid-cols-5 sm:grid-cols-3">
                    <div class="p-2 sm:col-span-1" v-for="color in $page.product.dominantColors" :key="color">
                      <div v-if="getColorHex(color)" class="w-8 h-8 rounded-full mx-auto border border-solid border-gray-400 flex items-center justify-center" :style="{ 'background-color': getColorHex(color) }"></div>
                    </div>
                  </div>
                </div>
                <div v-if="$page.product.tags && $page.product.tags.length" class="pt-5 ml-2">
                  <p class="text-lg text-granny border-b border-granny mb-3 tracking-widest">
                    Keywords
                  </p>
                  <div class="grid grid-cols-5 sm:grid-cols-3">
                    <span v-for="(tag, index) in $page.product.tags" :key="index" class="sm:col-span-1 mb-1 px-2 py-1 mx-auto"><span class="text-granny">#</span>{{ tag }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="details__artist px-5">
              <p class="text-2xl text-coffee border-b border-coffee mb-3 tracking-widest">
                The photographer
              </p>
              <p class="text-justify">
                {{ $page.product.artist.biography.content[0].content[0].value }}
              </p>
              <a href="" @click.prevent>view more...</a>
            </div>
          </div>
        </div>
      </section>
    </div>
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
    stripeId,
    inventory {
      id,
      dimension {
        format {
          name
        },
        height,
        width
      },
      quantity,
      maxQuantity,
    },
    stripePriceId
  }
}
</page-query>

<script>
import config from "@/config";

export default {
  name: "Product",
  methods: {
    addToCart(product) {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      const cart = JSON.parse(localStorage.getItem("cart"));

      const existingReference = cart.find(item => item.id === product.id);

      if (!existingReference) {
        cart.push({
          id: product.id,
          title: product.title,
          slug: product.slug,
          artist: product.artist.name,
          price: product.price,
          image: product.image.file.url,
          stripeId: product.stripeId,
          stripePriceId: product.stripePriceId,
          inventoryId: product.inventory[0].id,
          quantity: 1
        });
      } else {
        existingReference.quantity += 1;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      this.$modal.show("addedToCart");
    },
    formatDimensions(dimensions) {
      return `${dimensions.width} x ${dimensions.height}`;
    },
    getColorHex(colorName) {
      const color = config.DOMINANT_COLORS.find(
        color => color.name === colorName
      );
      return color ? color.hex : null;
    },
    getPercentageInventory(max, value) {
      return (value / max) * 100;
    }
  }
};
</script>

<style lang="scss" scoped></style>
