<template>
  <div>details</div>
</template>

<script>
export default {
  async fetch() {
    try {
      const { data } = await this.$axios.get(
        `/finances/schools/${this.loggedInStaff.school_details.id}/payment/methods/${this.$route.params.method}/`
      )

      console.log('data', data)
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    loggedInStaff() {
      return this.$store.getters['staff/getSchoolByCode'](this.$route.params.id)
    },
  },
}
</script>

<style lang="scss" scoped></style>
