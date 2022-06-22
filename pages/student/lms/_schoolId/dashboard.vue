<template>
  <div class="dashboard-section">
    <div>
      <h1 class="welcome-title">
         Welcome back 👋🏽,
        {{ $store.state.student.studentProfile.name.split(' ')[0] }}
      </h1>

      <dashboard-section>
        <dashboard-overview :gender="studentData"
      />
      </dashboard-section>
      <dashboard-section
        v-if="lessons.length > 0"
        title="Lessons"
        titlelink="lessons"
        elementclasstoscroll="lessonsScrollClass"
      >
        <div
          class="row flex-nowrap lessonsScrollClass"
          style="overflow-x: scroll"
        >
          <student-lesson-card
            v-for="(item, i) in lessons"
            :key="i"
            :image="item.class_subject.icon_data.icon"
            :color="item.class_subject.icon_data.icon_bg_color"
            :lesson="item"
          />
        </div>
      </dashboard-section>
      <dashboard-section
        v-if="exercise.length > 0"
        title="Exercises"
        :empty="false"
        category="exercises"
        titlelink="exercises"
        elementclasstoscroll="exerciseToScroll"
      >
        <div
          class="row flex-nowrap exerciseToScroll"
          style="overflow-x: scroll"
        >
          <student-exercise-card
            v-for="(item, i) in exercise"
            :key="i"
            :image="item.subject.icon_data.icon"
            :color="item.subject.icon_data.icon_bg_color"
            :exercise="item"
          />
        </div>
      </dashboard-section>
    </div>
  </div>
</template>

<script>
import dashboardSection from '~/components/student/dashboardSection'
import dashboardOverview from '~/components/student/dashboardOverview'
import studentLessonCard from '~/components/student/studentLessonCard'
import studentExerciseCard from '~/components/student/studentExerciseCard'
export default {
  name: 'Dashboard',
  components: {
    dashboardSection,
    dashboardOverview,
    studentLessonCard,
    studentExerciseCard,
  },
  // layout: 'authWithoutTopbar',
  data() {
    return {
      exercise: [],
      lessons: [],
      studentData: '',
    }
  },
  async fetch() {
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    // })
    const school = this.$store.getters['student/getSchoolByCode'](
      this.$route.params.schoolId
    )

    // get current academic year details
    const { data } = await this.$axios.$get(`lms/school/${school.id}/profile/`)

    console.log('current academin', data)
    this.$store.commit(
      'student/SET_CURRENT_ACADEMIC_YEAR',
      data.classes[0].academic_year_id
    )
    this.$store.commit('student/SET_STUDENT_PROFILE_DETAILS', data)

    const exercises = await this.$axios.get(
      `/lms/v2/school/${school.id}/dashboard/exercises/${this.$store.state.student.currentAcademicYear}/`
    )
    const lessons = await this.$axios.get(
      `/lms/v2/school/${school.id}/dashboard/lessons/${this.$store.state.student.currentAcademicYear}/`
    )
    // const recommendations = await this.$axios.get(
    //   `/lms/v2/school/${school.id}/dashboard/recommendations/${this.$store.state.student.currentAcademicYear}/`
    // )
    this.exercise = exercises.data.data
    this.lessons = lessons.data.data

    this.$nextTick(() => {
      // this.$nuxt.$loading.start()
      this.$nuxt.$loading.finish()
    })
    // console.log(exercises.data, lessons.data, recommendations.data)

    // this.$axios
    //   .$get(
    //     `lms/v2/school/${school.id}/dashboard/general_data/${data.classes[0].academic_year_id}/`
    //   )
    //   .then((res) => {
    //     // console.log("new bright response", res);
    //     this.studentData = res.data.student_bio.gender
    //     this.$store.commit('student/SET_STUDENT_CLASS_DETAILS', res.data)
    //   })
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  watch: {
    '$route.params.schoolId': {
      handler() {
        this.$fetch()
      },
    },
  },
  methods: {},
}
</script>

<style scoped>
.welcome-title {
  font-weight: bold;
  font-size: 32px;
  color: #5b738b;
  margin-bottom: 36px;
}
</style>
