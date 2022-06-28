<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'auth2',
  middleware:'authenticated'
}
</script>

<style lang="scss" scoped>
</style>