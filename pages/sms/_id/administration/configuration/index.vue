<template>
  <div></div>
</template>

<script>
import School from '~/mixins/school'

export default {
  created() {
    this.$router.push(
      `/sms/${this.$route.params.id}/administration/configuration/year`
    )
  },
  mixins: [School],
}
</script>

<style></style>
