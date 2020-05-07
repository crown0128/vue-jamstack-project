<template>
  <header>
    <nav class="flex items-center justify-between flex-wrap bg-red-800 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <g-link to="/" class="font-semibold text-xl tracking-tight">{{
          $static.metadata.siteName
        }}</g-link>
      </div>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <g-link
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-red-200 mr-4"
            to="/"
            >Home</g-link
          >
          <g-link
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-red-200 mr-4"
            to="/products"
            >Products</g-link
          >
          <g-link
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-red-200 mr-4"
            to="/contact"
            >Contact us</g-link
          >
          <g-link
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-red-200"
            to="/newsletter"
            >Newsletter</g-link
          >
        </div>
        <div>
          <a
            href="#"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-800 hover:bg-white mt-4 lg:mt-0 "
          >
            <svg
              class="stroke-current inline-block h-4 w-4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="8" cy="21" r="2"></circle>
              <circle cx="20" cy="21" r="2"></circle>
              <path
                d="M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {}
</script>
