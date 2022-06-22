<template>
  <LmsLessonPageWrapper
    :subject-name="subject.subject_name"
    :class-name="subject.class_name"
    @save:draft="draft"
    @save:publish="publish"
  >
    <transition name="fade">
      <LmsSetupLesson
        v-show="$route.query.step === '0'"
        :lesson-detail="lessonDetails"
        @lesson:details="lesson = $event"
      />
    </transition>
    <transition name="fade">
      <LmsLessonContent
        v-show="$route.query.step === '1'"
        ref="lessonContent"
        :content-detail="contentDetails"
        @content:details="content = $event"
      />
    </transition>
    <transition name="fade">
      <LmsLessonExercise
        v-show="$route.query.step === '2'"
        :exercise-detail="exerciseDetails"
        @exercise:details="exercise = $event"
      />
    </transition>
  </LmsLessonPageWrapper>
</template>

<script>
import modalMsgBox from '@/mixins/modalMsgBox'
import AddEditLesson from '@/mixins/AddEditLessonMixin'
export default {
  mixins: [AddEditLesson, modalMsgBox],
  async asyncData({ $axios, route }) {
    const { data: subject } = await $axios.$get(
      `schools/v2/lms/subject/${route.params.subject}/`
    )
    const data = await $axios.$get(
      `./schools/v3/lesson/${route.params.lesson}/detail/`
    )
    return {
      data,
      subject,
      lessonDetails: {
        title: data.name,
        description: data.description,
        week: data.week,
        available_date: data.available_date
      },
      contentDetails: data.content,
      exerciseDetails: data.quiz_data
    }
  },
  methods: {
    async draft() {
      try {
        this.$nuxt.$loading.start()
        const result = await this.checkContentIsDoneUploading()
        if (result) {
          const dataObj = this.prepare_data()
          const data = await this.$axios.$put(
            `schools/v3/lesson/${this.$route.params.lesson}/draft/update/`,
            dataObj
          )
          this.$router.push({
            name: 'sms-id-lms-subjects-subject-lesson-lesson',
            params: {
              lesson: data.lesson_plan_id
            }
          })
          this.$nuxt.$loading.finish()
        }
      } catch (error) {
        this.$toast({ type: 'error', text: error.message })
        this.$nuxt.$loading.finish()
      }
    },
    async publish() {
      try {
        const msgResponse = await this.showConfirmMessageBox(
          'Are you sure you want to publish this lesson?'
        )
        this.$nuxt.$loading.start()
        if (msgResponse) {
          const result = await this.checkContentIsDoneUploading()
          
          if (result) {
            const dataObj = await this.prepare_data()
            const data = await this.$axios.$put(
              `schools/v3/lesson/${this.$route.params.lesson}/draft/publish/`,
              dataObj
            )
            this.$nuxt.$loading.finish()
            this.$router.push({
              name: 'sms-id-lms-subjects-subject-lesson-lesson',
              params: { lesson: data.lesson_plan_id },
            })
          }
        }
      } catch (error) {
        this.$toast({ type: 'error', text: error.message })
        this.$nuxt.$loading.finish()
      }
    },
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
