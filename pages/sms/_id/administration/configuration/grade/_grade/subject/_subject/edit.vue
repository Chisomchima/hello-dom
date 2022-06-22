<template>
  <div>
    <BackwardNavigation
      text="Grade"
      link-name="sms-id-administration-configuration-grade"
    />
    <PageConfigurationsSubjectAddSubject :edit-fields="data" />
  </div>
</template>

<script>
export default {
  async asyncData({ route, $axios, error }) {
    // error({ statusCode: 401, message: 'Errror Guy' })

    try {
      const { data } = await $axios.$get(
        `./slate-admin/subject/${route.params.subject}`
      )
      return { data }
    } catch (e) {
      error({ statusCode: e.response.status, message: e.response.data.message })
    }
  }
}
</script>

<style lang="scss" scoped></style>
