<template>
  <div class="layout">
    <Header />
    <main class="mx-auto mt-5">
      <slot />
    </main>
  </div>
</template>

<script>
import Header from './Header'
import netlifyIdentity from 'netlify-identity-widget'

export default {
  name: 'Layout',
  components: { Header },
  mounted() {
    let netlifyIdentityScript = document.createElement('script')
    netlifyIdentityScript.setAttribute(
      'src',
      'https://identity.netlify.com/v1/netlify-identity-widget.js'
    )
    document.head.appendChild(netlifyIdentityScript)

    netlifyIdentity.init({
      container: '#netlify-login',
    })
    const user = netlifyIdentity.currentUser()
    console.log(user)
    console.log('route', this.$route)
  },
}
</script>

<style>
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.layout {
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
