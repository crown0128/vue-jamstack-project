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
export default {
  name: 'Layout',
  components: { Header },
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
