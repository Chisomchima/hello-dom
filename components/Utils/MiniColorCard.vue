<template>
  <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4" @click="$emit('click')">
    <!-- <a href="subject-details.html" style="text-decoration: none !important"> -->
    <!-- <div
      class="subject-card"
      :style="{
        backgroundColor: subject.icon_data.icon_bg_color,
        color: subject.icon_data.icon_font_color
      }"
    > -->
    <div
      class="subject-card"
      :style="{
        backgroundColor: bgColor,
        color: color,
      }"
    >
      <div class="subject-name mb-4">{{ name }}</div>
      <div
        v-if="showLessonCount"
        class="d-flex align-items-center justify-content-between mb-3"
      >
        <div class="content-text pr-1">
          Lessons: <strong>{{ lessonsCount }}</strong>
        </div>
        <div class="content-text">
          Exercises: <strong>{{ exerciseCount }}</strong>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-between my-2">
        <div>
          <div class="content-text-small mb-1">Subject Teacher:</div>
          <div class="content-text">{{ teacher }}</div>
        </div>
        <div>
          <div class="content-text-small mb-1">Class:</div>
          <div class="content-text">{{ schoolClass }}</div>
        </div>
        <div>
          <div class="content-text-small mb-1">Subject Code:</div>
          <div class="content-text">{{ code }}</div>
        </div>
      </div>

      <div
        v-if="others.length > 0"
        class="d-flex align-items-center justify-content-between my-2"
      >
        <template v-for="(other, index) in others">
          <div :key="index">
            <div class="content-text-small mb-1 text-capitalize">
              <slot name="others"> {{ other.split('_').join(' ') }}: </slot>
            </div>
            <div class="content-text">{{ subject[other] }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: 'black',
    },
    color: {
      type: String,
      default: 'white',
    },
    subject: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      default: '',
    },
    schoolClass: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      default: '',
    },
    lessonsCount: {
      type: Number,
      default: 0,
    },
    gradeBookCount: {
      type: [Number, String],
      default: 0,
    },
    exerciseCount: {
      type: [Number, String],
      default: 0,
    },
    showLessonCount: {
      type: Boolean,
      default: true,
    },
    others: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped></style>
