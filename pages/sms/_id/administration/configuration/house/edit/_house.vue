<template>
  <div>
    <!-- <BackwardNavigation
      text="House"
      link-name="sms-id-administration-configuration-house"
    /> -->
    <PageConfigurationsHouseAddEdit :edit-form="data" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    const { data } = await $axios.$get(
      `./slate-admin/house/${route.params.house}/`
    )
    return {
      data,
    }
    // console.log(data)
  },
}
</script>

<style scoped></style>
