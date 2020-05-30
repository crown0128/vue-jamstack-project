<template>
  <Layout>
    <div class="container mx-auto mb-20">
      <h1 class="text-4xl text-forest mb-3 tracking-widest text-center mx-auto">
        An error occured during the checkout.
      </h1>
      <h2 class="text-xl text-limed tracking-widest text-center mx-auto">
        The payment was unsuccessful.
      </h2>
      <p class="text-xl text-limed tracking-widest text-center mx-auto">
        Please try again later.
      </p>
      <div class="w-full text-center mt-10">
        <g-link
          class="px-4 py-2 text-center transition duration-500 ease-in-out tracking-wider leading-none border rounded bg-coffee text-white hover:bg-dark-coffee mt-4 lg:mt-0 tracking-wide text-lg"
          to="/cart"
        >
          Go back to cart
        </g-link>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  name: 'CheckoutCancel',
}
</script>
