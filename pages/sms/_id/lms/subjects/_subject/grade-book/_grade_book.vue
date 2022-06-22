<template>
  <div>
    <!-- {{ $route.params }} -->
    <!-- <BackwardNavigation text="Subject" /> -->

    <UtilsHeaderCard
      :title="data.name"
      :data="data"
      :display-key="[
        'max_obtainable_score',
        'percentage_total',
        'academic_year',
        'type',
      ]"
      @delete="onDelete(data)"
      @edit="$bvModal.show('modal')"
    >
    </UtilsHeaderCard>
    <LmsAddEditGradeEntryModal
      title="Edit Grade Entry"
      :fields="data"
      @refresh="$nuxt.refresh()"
    />

    <UtilsBaseCardTab>
      <UtilsCardTab title="Students">
        <GradeBookTableForScore :scores="data.scores" />
      </UtilsCardTab>
      <UtilsCardTab title="Link To Report Card">
        <ReportTemplateLinkReportToGradeBook
          :templates="data.templates"
          :class-id="data.school_class_id"
          @refresh="$nuxt.refresh()"
        />
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
import modalMsgBox from '~/mixins/modalMsgBox'
export default {
  mixins: [modalMsgBox],
  async asyncData({ $axios, route }) {
    const { data } = await $axios.$get(
      `./schools/v2/class/subject/${route.params.subject}/gradebook/${route.params.grade_book}/`
    )
    return {
      data,
    }
  },
  methods: {
    async onDelete(data) {
      const result = await this.showDeleteMessageBox()
      if (result) {
        try {
          await this.$axios.$delete(`slate-admin/subject/${data.id}/`)
          this.$router.push({
            name: 'sms-id-administration-configuration-grade',
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
