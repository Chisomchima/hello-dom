<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  layout: 'auth2',
  middleware: 'authenticated',
  watch: {
    '$route.path'() {
      this.$store.commit('auth/SET_PAGE_DISABLED', false)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>