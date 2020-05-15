<template>
  <Layout>
    <h1>An error occured during the checkout.</h1>
    <h2>The payment was unsuccessful.</h2>
    <p>Please try again later.</p>
    <div class="text-center">
      <g-link
        class="px-4 py-2 leading-none border rounded bg-red-800 text-white hover:bg-red-900 mt-4 lg:mt-0"
        to="/cart"
      >
        Go back to cart
      </g-link>
    </div>
  </Layout>
</template>

<script>
export default {
  name: 'CheckoutCancel',
}
</script>
