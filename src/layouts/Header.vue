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
        <Dropdown>
          <template v-slot:button>
            <div
              class="inline-block text-sm px-4 py-2 leading-none  text-white hover:text-red-800 hover:bg-white mt-4 lg:mt-0 "
            >
              <svg
                class="fill-current text-teal-500 inline-block h-5 w-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke-width="2"
              >
                <path
                  d="M68.169,447.023C71.835,449.023,159.075,496,256,496c105.008,0,184.772-47.134,188.116-49.14A8,8,0,0,0,448,440c0-64.593-19.807-123.7-55.771-166.442-25.158-29.9-56.724-50.28-91.539-59.662a104,104,0,1,0-89.38,0c-34.815,9.382-66.381,29.765-91.539,59.662C83.807,316.3,64,375.407,64,440A8,8,0,0,0,68.169,447.023ZM168,120a88,88,0,1,1,88,88A88.1,88.1,0,0,1,168,120ZM132.013,283.859C164.5,245.258,208.528,224,256,224s91.5,21.258,123.987,59.859c32.681,38.838,51.056,92.48,51.977,151.474C414.845,444.6,343.708,480,256,480c-81.11,0-157.5-35.609-175.96-44.856C81,376.223,99.367,322.656,132.013,283.859Z"
                />
              </svg>
            </div>
          </template>
          <template v-slot:content>
            <div id="netlify-login" data-netlify-identity-menu></div>
          </template>
        </Dropdown>
        <div>
          <g-link
            to="/cart"
            class="inline-block text-sm px-4 py-2 leading-none text-white hover:border-transparent hover:text-red-800 hover:bg-white mt-4 lg:mt-0 "
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
          </g-link>
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
import Dropdown from '@/components/Dropdown'
export default {
  name: 'Header',
  components: {
    Dropdown,
  },
}
</script>

<style lang="scss">
.netlify-identity-item {
  a {
    display: block;
    padding: 15px;
    width: 100%;
    background-color: #edf2f7;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    white-space: nowrap;
  }
  a:hover {
    color: #edf2f7;
    background-color: #c53030;
  }
}
</style>
