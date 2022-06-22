<template>
  <div>{{ $route.params.id }}</div>
</template>

<script>
export default {
  layout: 'auth',
  created() {
    this.$router.push(`/sms/${this.$route.params.id}/administration/student`)
  },
}
</script>

<style lang="scss" scoped></style>
