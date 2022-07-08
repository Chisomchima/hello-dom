<template>
  <div>
    <nuxt-child v-if="!$store.state.auth.disablePage" />
    <div v-else class="text-center m-auto mt-5">
     <h2 class="text-capitalize"> you don't have permission to view this page</h2>
      <p class="text-center paragraph-denied">
        You do not have permission to access this page. please contact your
        systems administrator.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth2',
  middleware: 'authenticated',
  computed: {
    pageDisabled() {
      return this.$store.state.auth.disablePage
    },
  },

  watch: {
    '$route.path'() {
      debugger
      this.$store.commit('auth/SET_PAGE_DISABLED', false)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>