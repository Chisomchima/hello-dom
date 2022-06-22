<template>
  <div class="col-xl-3 col-12 col-sm-6 col-lg-6 col-md-6 mb-4">
    <div
      class="
        card
        bg-white
        card-shadowed
        rounded
        overflow-hidden
        font-family_brown
        line-height-100p
        pointer
      "
      @click="handleCardClick(lesson)"
    >
      <div
        class="
          align-items-center
          d-flex
          justify-content-center
          position-relative
        "
        :style="`background-color: ${color}; height: 128px`"
      >
        <!-- :src="lesson.images[0]" -->
        <!-- <img src="" class="w-100 object-fit-cover" height="128" /> -->
        <!-- :src="lesson.images[1]" -->
        <img
          v-if="image"
          :src="image"
          class="object-fit-contain"
          height="70px"
        />

        <div
          class="
            position-absolute
            bottom-0
            right-0
            fs-12
            px-lg-2
            py-1
            bg-white
            text-dark
            opacity-90p
          "
        >
          {{ lesson.class_subject.name }}
        </div>
      </div>
      <div class="px-3 py-3">
        <div class="text-truncate fs-14 text-dark font-weight-bold mb-3">
          {{ lesson.name }}
        </div>
        <div class="fs-12 text-light">
          <div class="mb-4 text-truncate">
            {{ lesson.description }}
          </div>
          <div class="mb-1 d-flex align-items-end justify-content-between">
            <span
              :class="`text-capitalize ${
                lesson.student_progress === 'not_started'
                  ? 'dangerText'
                  : lesson.student_progress === 'in_progress'
                  ? 'warnText'
                  : 'successText'
              }`"
              >{{
                lesson.student_progress === 'not_started'
                  ? 'Not Started'
                  : lesson.student_progress === 'in_progress'
                  ? 'In Progress'
                  : 'Completed'
              }}</span
            >
            <span>{{ formatDate(lesson.available_date) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    lesson: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), 'dd/MM/yyyy')
    },
    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '') // eslint-disable-line
        .replace(/\-\-+/g, '-') // eslint-disable-line
        .replace(/^-+/, '')
        .replace(/-+$/, '')
    },

    handleCardClick(e) {
      console.log(e)
      //   :to="`/student/lms/${$route.params.schoolId}/lessons/${lesson.id}`"
      this.$router.push({
        name: 'student-lms-schoolId-lessons-lesson',
        params: { schoolId: this.$route.params.schoolId, lesson: e.id },
        query: { _name: `${e.name}` },
      })
    },
  },
}
</script>
