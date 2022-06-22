<template>
  <div class="conatiner">
    <div class="d-flex align-items-center justify-content-end flex-wrap mb-3">
      <!-- <BackwardNavigation text="Subject" /> -->
      <div class="d-flex align-items-center justify-content-end mb-2">
        <div>
          <div class="dropdown">
            <button
              id="dropdownMenuButton"
              class="btn btn-primary py-2 px-3 dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Save
            </button>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              <a class="dropdown-item" href="#" @click.prevent="save_draft()"
                >Save as draft</a
              >
              <a class="dropdown-item" @click.prevent="publish()"
                >Save and Publish</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-white mb-3">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-xl-6 mb-3 mb-xl-0">
            <div class="wizard-steps">
              <div
                v-for="(menu, index) in menuItem"
                :key="index"
                class="step"
                :class="[Number($route.query.step) === index ? 'active' : '']"
              >
                <span>{{ index + 1 }}</span>
                {{ menu }}
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-5 col-md-5 col-sm-6 mb-3 mb-sm-0">
            <div class="fs-14 text-light">Subject:</div>
            <div class="fs-14 text-dark">
              {{ data.subject_name }}
            </div>
          </div>
          <div class="col-xl-3 col-lg-5 col-md-5 col-sm-6 mb-0">
            <div class="fs-14 text-light">Class:</div>
            <div class="fs-14 text-dark">{{ data.class_name }}</div>
          </div>
        </div>
        <hr class="my-3" />
        <transition name="fade">
          <LmsSetupLesson
            v-show="$route.query.step === '0'"
            @lesson:details="lesson = $event"
          />
        </transition>
        <transition name="fade">
          <LmsLessonContent
            v-show="$route.query.step === '1'"
            @content:details="content = $event"
          />
        </transition>
        <transition name="fade">
          <LmsLessonExercise
            v-show="$route.query.step === '2'"
            @exercise:details="exercise = $event"
          />
        </transition>

        <div class="mt-4 d-flex align-items-center justify-content-end">
          <button
            v-if="Number($route.query.step) >= 1"
            class="btn btn-outline-primary py-2 px-3 ml-3"
            @click="prev()"
          >
            Previous
          </button>
          <button
            v-if="Number($route.query.step) <= 1"
            class="btn btn-outline-primary py-2 px-3 ml-3"
            @click="next()"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMsgBox from '@/mixins/modalMsgBox'
export default {
  mixins: [modalMsgBox],
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
      menuItem: ['Setup Lesson', 'Lesson Content', 'Exercise'],
      lesson: {},
      content: [],
      exercise: {},
    }
  },
  mounted() {
    this.$router.replace({
      query: {
        step: 0,
      },
    })
  },
  methods: {
    next() {
      this.$router.push({
        query: { step: Number(this.$route.query.step) + 1 },
      })
    },
    prev() {
      this.$router.push({
        query: { step: Number(this.$route.query.step) - 1 },
      })
    },
    async prepare_data() {
      const result = await this.save_resources()
      const contentMaterial = []

      // debugger

      this.content.forEach((item, index) => {
        contentMaterial.push({
          title: item.dataField.title,
          description: item.dataField.description,
          url: result[index]?.data.url,
          text: item.dataField.text,
        })
      })

      const dataObj = {
        name: this.lesson.title,
        description: this.lesson.description,
        week: this.lesson.week.id,
        available_date: this.lesson.available_date,
        lesson_materials: contentMaterial,
        quiz_config: this.exercise,
      }
      return dataObj
    },
    async save_draft() {
      try {
        const dataObj = await this.prepare_data()
        const data = await this.$axios.$post(
          `schools/v3/class_subject/${this.$route.params.subject}/lesson/draft/`,
          dataObj
        )

        this.$router.push({
          name: 'sms-id-lms-subjects-subject-lesson-lesson',
          params: { lesson: data.lesson_plan_id },
        })
      } catch (error) {
        console.log(error)
      }
    },
    save_resources() {
      try {
        const school = this.$store.getters['school/getSchoolByCode'](
          this.$route.params.id
        )
        const notIncludeType = ['FreeText', 'YouTube', 'Vimeo']
        const contentFilePromises = []
        this.content.forEach((item) => {
          if (!notIncludeType.includes(item.type)) {
            contentFilePromises.push(
              this.$axios.$post(
                `./schools/v2/school/${school.id}/resource/`,
                item.file
              )
            )
          }
        })
        return Promise.all(contentFilePromises)
      } catch (error) {
        console.log(error)
      }
    },
    async publish() {
      const result = await this.showConfirmMessageBox(
        'Are you sure you want to publish this lesson?'
      )
      if (result) {
        const dataObj = await this.prepare_data()
        const data = await this.$axios.$post(
          `schools/v3/lesson/${this.$route.params.subject}/draft/publish/`,
          dataObj
        )
        this.$router.push({
          name: 'sms-id-lms-subjects-subject-lesson-lesson',
          params: { lesson: data.lesson_plan_id },
        })
      }
    },
  },
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
