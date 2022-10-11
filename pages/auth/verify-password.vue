<template>
  <div>
    <nuxt-child />
    <AuthModalVerifyPassword />
  </div>
</template>

<script>
export default {
  layout: 'auth2',
  mounted(){
    this.$bvModal.show('verifyPassword')
  }
}
</script>

<style lang="scss" scoped>
</style>