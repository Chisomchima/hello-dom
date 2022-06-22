<template>
  <div>
    <div class="row">
      <div
        v-for="(subject, subjectIndex) in subjects"
        :key="subjectIndex"
        style="cursor: pointer"
        class="col-xl-3 col-12 col-sm-6 col-lg-6 col-md-6 mb-4"
      >
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
          @click="handleCardClick(subject)"
        >
          <div
            class="
              align-items-center
              d-flex
              justify-content-center
              position-relative
            "
            :style="{
              'background-color': subject.class_subject_icon_data
                ? subject.class_subject_icon_data.icon_bg_color
                : '#A4C2F4',
              height: '128px',
            }"
          >
            <!-- :src="lesson.images[0]" -->
            <!-- <img src="" class="w-100 object-fit-cover" height="128" /> -->
            <!-- :src="lesson.images[1]" -->
            <img
              v-if="subject.class_subject_icon_data"
              :src="subject.class_subject_icon_data.icon"
              class="object-fit-contain"
              height="70px"
            />

            <div
              class="
                position-absolute
                bottom-0
                right-0
                px-lg-2
                py-1
                bg-white
                text-dark
                opacity-90p
              "
            >
              {{ subject.name }}
            </div>
          </div>
          <div key="" class="px-3 py-3">
            <div class="text-light">
              <div class="mb-2 text-truncate text-secondary font-weight-bold">
                Subject Code:
                <span class="text-dark font-weight-bold">
                  {{ subject.code }}</span
                >
              </div>
              <div class="mb-1 text-dark font-weight-bold">
                <span class="text-capitalize text-secondary">Teacher: </span>
                <span>
                  {{
                    subject.teachers[0]
                      ? subject.teachers[0].first_name +
                        ' ' +
                        subject.teachers[0].last_name
                      : ''
                  }}</span
                >
              </div>
            </div>
            <div
              class="text-truncate fs-14 text-dark font-weight-bold mb-3"
              :style="{
                lineHeight: '1rem',
              }"
            >
              <div class="d-flex my-0 justify-content-between">
                <span class="text-secondary">
                  Lessons:
                  <span class="font-weight-bold text-dark">
                    {{ subject.lessons }}
                  </span>
                </span>
                <span class="text-secondary">
                  Exercise:
                  <span class="text-dark">
                    {{ subject.exercises }}
                  </span>
                </span>
              </div>
              <div v-if="Object.keys(subject.live_class).length > 0" class="d-flex my-1 justify-content-between" @click.stop="goToLiveSession(subject.live_class)">
                <span
                  class="
                    badge
                    fs-12
                    text-danger
                    alert-danger
                    font-weight-normal
                    border-danger
                    py-1
                  "
                  >on-going presentation
                  <b-icon
                    icon="circle-fill"
                    animation="throb"
                    font-scale="2"
                  ></b-icon>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subjects: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    school() {
      return this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )
    },
  },
  methods: {
    handleCardClick(e) {
      this.$router.push({
        name: 'student-lms-schoolId-subjects-subject',
        params: { schoolId: this.$route.params.schoolId, subject: e.id },
        query: { _name: `${e.name}` },
      })
    },

    goToLiveSession(data){
      this.$router.push({
       name: 'student-lms-schoolId-lessons-live-lesson-live',
        params: {
          schoolId: this.$route.params.schoolId,
          lesson: data.lesson_id,
          live: data.live_class_id,
        },
      })
    }
  },
}
</script>

<style scoped>
* {
  font-size: 0.85rem !important;
}
</style>
