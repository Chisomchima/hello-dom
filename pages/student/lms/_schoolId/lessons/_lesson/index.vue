<template>
  <div class="card">
    <!-- <b-overlay v-if="$fetchState.pending" show="true" spinner-variant="primary">
      <div class="bg-white" style="height: 550px"></div>
    </b-overlay> -->
    <div class="card-body font-family_brown">
      <div class="p-xl-5 mx-xl-5">
        <div class="d-flex align-items-stretch flex-wrap flex-lg-nowrap">
          <div
            class="mr-3 mb-3 mb-md-0 w-100 rounded p-3"
            style="max-width: 219px"
            :style="{
              backgroundColor: lesson.class_subject.icon_data.icon_bg_color,
              color: lesson.class_subject.icon_data.icon_font_color,
            }"
          >
            <img
              class="object-fit-contain w-100"
              style="height: 122px"
              :src="lesson.class_subject.icon_data.icon"
            />
            <!-- <pre>{{ lesson.class_subject }}</pre> -->
          </div>
          <div class="flex-grow-1 d-flex flex-column justify-content-between">
            <div class="mb-3">
              <div class="fs-14 line-height-100p text-primary mb-2">
                {{ lesson.subject.name }}
              </div>
              <div class="fs-18 font-weight-bold line-height-150p text-dark">
                {{ lesson.name }}
              </div>
            </div>
            <div
              class="
                d-flex
                align-items-center
                flex-wrap
                fs-14
                text-dark
                line-height-100p
              "
            >
              <div class="pr-3 mb-2">Week 5</div>
              <div class="pr-3 mb-2 text-danger">
                {{
                  lesson.student_progress === 'not_started'
                    ? 'Not Started'
                    : lesson.student_progress === 'in_progress'
                    ? 'In Progress'
                    : 'Completed'
                }}
              </div>
              <div class="pr-3 mb-2">
                <span class="text-light">Posted on:</span>
                {{ formatData(lesson.available_date) }}
              </div>
            </div>
          </div>
        </div>

        <div class="info-card my-5">
          <div class="info-card-header">Description</div>
          <div class="info-card-body">
            <p class="text-muted">{{ lesson.description }}.</p>
          </div>
        </div>
        <div class="my-5 pt-5 pb-4 text-center">
          <button
            class="btn btn-primary-2 btn-primary py-3 px-3 mx-auto"
            @click="beginLesson()"
          >
            <span v-if="lesson.student_progress === 'completed'"> Retake </span>
            <span v-else-if="lesson.student_progress === 'in_progress'">
              Continue Lesson
            </span>
            <span v-else> Start Lesson </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  props: {
    lesson: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // lesson: {},
      lessonContent: [],
    }
  },
  computed: {},

  methods: {
    formatData(date) {
      return DateTime.fromISO(date).toFormat('yyyy LLL dd')
    },

    beginLesson() {
      const school = this.$store.getters['student/getSchoolByCode'](
        this.$route.params.schoolId
      )

      if (this.lesson.student_progress === 'not_started') {
        this.$axios
          .$post(
            `/lms/v2/school/${school.id}/lesson/${this.$route.params.lesson}/start/`,
            {
              academic_year_id: this.$store.state.student.currentAcademicYear,
            }
          )
          .then((res) => {
            this.$emit('updateLesson', res.data)
          })
      }

      if (this.lesson.lesson_contents.length > 0) {
        this.$router.push({
          name: 'student-lms-schoolId-lessons-lesson-start',
          params: {
            schoolId: this.$route.params.schoolId,
          },
          query: {
            content_index: '0',
            _name: `Lesson View`,
          },
        })
      }
    },
  },
}
</script>

<style scoped>
.info-card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.info-card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.info-card-body {
  flex: 1 1 auto;
  padding: 1.25rem;
}
</style>
