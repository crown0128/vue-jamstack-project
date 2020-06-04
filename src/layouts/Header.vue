<template>
  <header>
    <nav class="flex items-center text-grey justify-between flex-wrap  p-3">
      <div class="flex items-center flex-shrink-0 mr-6">
        <g-link
          to="/"
          class="font-semibold text-xl text-coffee tracking-tight border-b-2 border-coffee"
          >{{ $static.metadata.siteName }}</g-link
        >
      </div>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded hover:border-coffee border-b border-transparent"
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
            class="block mt-4 lg:inline-block lg:mt-0 text-lg text-limed border-b border-transparent hover:border-coffee hover:text-coffee mr-4"
            to="/"
            >Home</g-link
          >
          <g-link
            class="block mt-4 lg:inline-block lg:mt-0 text-lg text-limed border-b border-transparent hover:border-coffee hover:text-coffee mr-4"
            to="/products"
            >Products</g-link
          >
          <g-link
            class="block mt-4 lg:inline-block lg:mt-0 text-lg text-limed border-b border-transparent hover:border-coffee hover:text-coffee mr-4"
            to="/contact"
            >Contact us</g-link
          >
          <g-link
            class="block mt-4 lg:inline-block lg:mt-0 text-lg text-limed border-b border-transparent hover:border-coffee hover:text-coffee"
            to="/blog"
            >Blog</g-link
          >
        </div>
        <Dropdown>
          <template v-slot:button>
            <span
              class="inline-block px-4 py-4 no-underline rounded-full text-limed hover:bg-swirl"
              href="#"
            >
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <circle fill="none" cx="12" cy="7" r="3" />
                <path
                  d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"
                />
              </svg>
            </span>
          </template>
          <template v-slot:content>
            <div v-if="isLoggedIn">
              <li class="dropdown__item">
                <g-link to="/account">My account</g-link>
              </li>
              <li class="dropdown__item">
                <g-link to="/account/orders">
                  Orders
                </g-link>
              </li>
              <li class="dropdown__item">
                <a
                  href="#"
                  @click.prevent="triggerNetlifyIdentityAction('logout')"
                >
                  Log out
                </a>
              </li>
            </div>
            <div v-else>
              <li class="dropdown__item">
                <a
                  href="#"
                  @click.prevent="triggerNetlifyIdentityAction('signup')"
                >
                  Sign up
                </a>
              </li>
              <li class="dropdown__item">
                <a
                  href="#"
                  @click.prevent="triggerNetlifyIdentityAction('login')"
                >
                  Log In
                </a>
              </li>
            </div>
          </template>
        </Dropdown>
        <div>
          <g-link
            to="/cart"
            class="inline-block text-sm px-4 py-4 leading-none text-limed rounded-full hover:bg-swirl mt-4 lg:mt-0 text-lg "
          >
            <svg
              class="fill-current hover:text-black h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z"
              />
              <circle cx="10.5" cy="18.5" r="1.5" />
              <circle cx="17.5" cy="18.5" r="1.5" />
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
import netlifyIdentity from 'netlify-identity-widget'

export default {
  name: 'Header',
  components: {
    Dropdown,
  },
  data() {
    return {
      isLoggedIn: false,
    }
  },
  mounted() {
    netlifyIdentity.init({
      APIUrl: 'https://vue-jamstack-nao.netlify.app/.netlify/identity',
      logo: false,
    })
    this.isLoggedIn = localStorage && localStorage.getItem('gotrue.user')
  },
  methods: {
    triggerNetlifyIdentityAction(action) {
      if (action === 'login' || action === 'signup') {
        netlifyIdentity.open(action)
        netlifyIdentity.on(action, (user) => {
          netlifyIdentity.close()
          this.isLoggedIn = true
        })
      } else if (action === 'logout') {
        netlifyIdentity.logout()
        this.isLoggedIn = false
      }
    },
  },
}
</script>

<style lang="scss">
.netlify-identity-item,
.dropdown__item {
  a {
    display: block;
    padding: 15px;
    width: 100%;
    background-color: #fafafa;

    white-space: nowrap;
  }
  a:hover {
    background-color: #d5cac4;
  }
}
.netlify-identity-user-details {
  display: none;
}
</style>
