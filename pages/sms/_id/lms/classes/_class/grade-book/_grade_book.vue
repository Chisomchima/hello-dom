<template>
  <div>
    <!-- {{ $route.params }} -->
    <!-- <BackwardNavigation text="Class" /> -->

    <UtilsHeaderCard
      :title="data.name"
      :data="data"
      :display-key="[
        'max_obtainable_score',
        'percentage_total',
        'academic_year',
        'type',
      ]"
    >
    </UtilsHeaderCard>

    <!-- <pre>{{ data }}</pre> -->

    <UtilsBaseCardTab>
      <UtilsCardTab title="Students">
        <GradeBookTableForScore :scores="data.scores" />
      </UtilsCardTab>
      <UtilsCardTab title="Link To Report Card">
        <ReportTemplateLinkReportToGradeBook
          :templates="data.templates"
          @refresh="$nuxt.refresh()"
        />
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    const { data } = await $axios.$get(
      `./schools/v2/class/subject/${route.query.grade_book_subject}/gradebook/${route.params.grade_book}/`
    )

    return {
      data,
    }
  },
}
</script>

<style lang="scss" scoped></style>
