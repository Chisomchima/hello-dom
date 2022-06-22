<template>
  <div>
    <!-- <BackwardNavigation text="Report Card" /> -->

    {{ $route.params }}
    <UtilsCustomStudentCard
      :title="cardTitle"
      :data="data"
      :display-key="[
        'grade',
        'class',
        'form_teacher',
        'academic_year',
        'academic_period',
        'report_card_template_name',
      ]"
    >
    </UtilsCustomStudentCard>
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    const { data } = await $axios.$get(
      `schools/v3/report_card/batch/${route.params.report_card}/class_student/${route.params.student}/`
    )
    return {
      data,
    }
  },
}
</script>

<style lang="scss" scoped></style>
