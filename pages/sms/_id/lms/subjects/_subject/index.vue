<template>
  <div>
    <!-- <BackwardNavigation text="Subject" link-name="sms-id-lms-subjects" /> -->
    <UtilsHeaderCardWithColor
      enable-image
      :color="data.icon_data.icon_font_color"
      :img-src="data.icon_data.icon"
      :img-src-base64="
        'data:image/svg+xml;base64,' + data.icon_data.icon_base_64
      "
      :bg-color="data.icon_data.icon_bg_color"
      :title="data.subject_name"
      :data="data"
      :display-key="[
        'class_name',
        'subject_code',
        'exercise_count',
        'gradebook_count',
        'lessons_count',
        'students_count',
      ]"
      @edit="$bvModal.show('media-modal')"
    ></UtilsHeaderCardWithColor>
    <UtilsBaseCardTab>
      <UtilsCardTab v-if="showLocalData" title="Drafted Lessons">
        <LmsSubjectLessonsLocalDraft />
      </UtilsCardTab>
      <UtilsCardTab title="Lessons">
        <LmsSubjectLessons />
      </UtilsCardTab>
      <UtilsCardTab title="Exercise">
        <LmsSubjectExercise
          :class-details="{
            classIid: data.class_id,
            className: data.class_name,
            subjectName: data.subject_name,
          }"
        />
      </UtilsCardTab>
      <UtilsCardTab title="Gradebook">
        <LmsSubjectGradeBook :data="data" />
      </UtilsCardTab>
      <UtilsCardTab title="Lesson Plan">
        <coming-soon />
      </UtilsCardTab>
      <UtilsCardTab title="Scheme of Work">
        <newSchemeOfWork
          page="lms"
          :data="data.scheme_of_work"
          @refresh="refreshPage"
        />
      </UtilsCardTab>
      <UtilsCardTab title="Students">
        <LmsSubjectStudents :students="data.students" />
      </UtilsCardTab>
      <UtilsCardTab title="Resources">
        <LmsSubjectResources :content="data" />
      </UtilsCardTab>
    </UtilsBaseCardTab>
    <lms-class-subject-edit-media-modal
      :subject="data"
      @refresh="$nuxt.refresh()"
    ></lms-class-subject-edit-media-modal>
  </div>
</template>

<script>
import { isEqual } from 'lodash'

export default {
  async asyncData({ $axios, route }) {
    const { data } = await $axios.$get(
      `schools/v2/lms/subject/${route.params.subject}/`
    )
    return {
      data,
    }
  },

  data() {
    return {
      showLocalData: false,
    }
  },

  created() {
    this.checkForData().then((data) => {
      Object.keys(data).length > 0
        ? (this.showLocalData = true)
        : (this.showLocalData = false)
    })
  },
  methods: {
    async refreshPage() {
      await this.$nuxt.refresh()
    },
    async checkForData() {
      return await this.$dexie.formData
        .filter((pageData) => {
          if (
            pageData.page === 'sms-id-lms-subjects-subject-lesson-add' &&
            isEqual(pageData.params, this.$route.params)
          ) {
            return pageData
          }
          return false
        })
        .first()
    },
  },
  // computed: {
  //   doesDataExitOnDb() {
  //     return
  //   },
  // },
}
</script>

<style lang="scss" scoped></style>
