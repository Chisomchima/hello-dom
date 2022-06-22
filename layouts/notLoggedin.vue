<template>
  <div>
    <div v-if="$store.getters['auth/isLoggedIn']" class="site-nav">
      <LayoutAuthNavbar />
    </div>
    <no-auth-navbar v-else />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import noAuthNavbar from '~/components/Layout/Auth/noAuthNavbar.vue'
export default {
  components: { noAuthNavbar },
}
</script>

<style lang="scss" scoped></style>
