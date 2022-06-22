<template>
  <LmsLessonPageWrapper
    :subject-name="data.subject_name"
    :class-name="data.class_name"
    @save:draft="draft"
    @save:publish="publish"
  >
    <transition name="fade">
      <LmsSetupLesson
        v-show="$route.query.step === '0'"
        ref="setupLesson"
        :lesson-detail="lessonLocal"
        @lesson:details="lesson = $event"
      />
    </transition>
    <transition name="fade">
      <LmsLessonContent
        v-show="$route.query.step === '1'"
        ref="lessonContent"
        :content-detail="contentLocal"
        @content:details="content = $event"
      />
    </transition>
    <transition name="fade">
      <LmsLessonExercise
        v-show="$route.query.step === '2'"
        :exercise-detail="exerciseLocal"
        @exercise:details="exercise = $event"
      />
    </transition>
  </LmsLessonPageWrapper>
</template>

<script>
import modalMsgBox from '@/mixins/modalMsgBox'
import AddEditLesson from '@/mixins/AddEditLessonMixin'
import formStorage from '~/mixins/formStorageWatch'
export default {
  mixins: [AddEditLesson, modalMsgBox, formStorage],
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
