<template>
  <div>
    <!-- <BackwardNavigation text="Grade" /> -->

    <UtilsHeaderCard
      :title="cardTitle"
      :data="data"
      :display-key="['name', 'number_of_subjects', 'number_of_categories']"
      @edit="$bvModal.show('edit-grade-level')"
      @delete="onHeaderDelete"
    >
    </UtilsHeaderCard>

    <UtilsBaseCardTab>
      <UtilsCardTab title="Subjects">
        <PageConfigurationsGradeSubjectTab :school="school">
        </PageConfigurationsGradeSubjectTab>
      </UtilsCardTab>
      <UtilsCardTab title="Category">
        <PageConfigurationsGradeCategoryTab :school="school">
        </PageConfigurationsGradeCategoryTab>
      </UtilsCardTab>
    </UtilsBaseCardTab>

    <PageConfigurationsGradeAddEditModal
      :id="'edit-grade-level'"
      title="Edit Grade Level"
      :field="data"
      @refresh="$nuxt.refresh()"
    />
  </div>
</template>

<script>
import modalMsgBox from '~/mixins/modalMsgBox'
export default {
  mixins: [modalMsgBox],
  async asyncData({ $axios, route, store }) {
    const school = store.getters['school/getSchoolByCode'](route.params.id)
    const { data } = await $axios.$get(
      `/slate-admin/grade/${route.params.grade}`
    )
    const number_of_categories = data.category_list.length
    let number_of_subjects = 0

    for (const key in data.categories) {
      number_of_subjects += data.categories[key].length
    }

    const newData = {
      number_of_categories,
      number_of_subjects,
      ...data,
    }

    return {
      data: newData,
      cardTitle: data.grade_name,
      school,
    }
  },
  data() {
    return {
      school: {
        id: '',
      },
      subjects: [],
    }
  },
  methods: {
    async onHeaderDelete() {
      const result = await this.showDeleteMessageBox()
      if (result) {
        try {
          await this.$axios.$delete(`slate-admin/grade/${this.data.id}/`)
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
