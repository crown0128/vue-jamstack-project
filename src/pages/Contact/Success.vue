<template>
  <Layout>
    <div class="container mx-auto">
      <h1 class="text-4xl text-coffee mb-3 tracking-widest text-center mx-auto">
        Message sent successfully
      </h1>

      <div class="w-full text-center mt-10">
        <g-link
          class="px-4 py-2 text-center transition duration-500 ease-in-out tracking-wider leading-none border rounded bg-coffee text-white hover:bg-dark-coffee mt-4 lg:mt-0 tracking-wide text-lg"
          to="/products"
        >
          Browse our artworks
        </g-link>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'ContactSuccess',
  },
}
</script>
