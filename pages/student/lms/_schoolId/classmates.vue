<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">My Classmates</div>

      <div class="d-flex align-items-center mb-2"></div>
    </div>
    <div class="card class-wrapper">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div class="filter-wrapper mr-2">
          <div class="search-input student-filter-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              focusable="false"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
              class="iconify icon"
              data-inline="false"
              data-icon="carbon:search"
              style="transform: rotate(360deg)"
            >
              <path
                d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9z"
                fill="currentColor"
              ></path>
            </svg>
            <input
              v-model="searchInput"
              type="text"
              class="form-control rounded-pill w-100"
              placeholder="Search"
              @keyup="searchExercise"
            />
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="font-family_brown fs14 text-black">Sort by:</div>
          <div class="student-filter-input ml-2">
            <select v-model="orderBy" class="form-control">
              <option value="new">A to Z</option>
              <option value="old">Z to A</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <template v-if="!$fetchState.pending">
          <UtilsStudentGridView
            v-for="(value, index) in classmatesToDisplay"
            :key="index"
            :hambugmenu="false"
            :data="{
              house_color: value.house.color,
              house: value.house.name,
              first_name: value.profile.first_name,
              last_name: value.profile.last_name,
              gender: value.profile.gender,
              admission_id: value.admission_id,
            }"
            :image="value.student_image"
            :display-key="['first_name', 'last_name', 'gender', 'house']"
            @message="handleMessage"
          ></UtilsStudentGridView>
        </template>
        <template v-else>
          <div v-for="n in 6" :key="n" class="col-md-4 my-2">
            <b-skeleton-img class="rounded"></b-skeleton-img>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import studentUtils from '@/mixins/studentUtils'

// import classmatesCard from '~/components/student/classmatesCard'
export default {
  name: 'Dashboard',
  components: {
    // classmatesCard,
  },
  mixins: [studentUtils],
  data() {
    return {
      orderBy: 'new',
      classmates: [],
      classmatesToDisplay: [],
      searchInput: '',
    }
  },
  async fetch() {
    // this.$nuxt.$loading.start()
    const { data } = await this.$axios.get(
      `/lms/class/${this.studentDetails.class_id}/class_mates/?order_by=${this.orderBy}`
    )

    this.classmates = data.data.student
    this.classmatesToDisplay = data.data.student
    this.$nuxt.$loading.finish()
    // this.$nuxt.$loading.start()
  },
  // layout: 'authWithoutTopbar',
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    currentRouteName() {
      const nameArray = this.$route.name.split('-')
      return (
        this.$route.name
          .split('-')
          [nameArray.length - 1].charAt(0)
          .toUpperCase() +
        this.$route.name.split('-')[nameArray.length - 1].slice(1)
      )
    },
  },
  watch: {
    orderBy() {
      this.$fetch()
    },
  },
  methods: {
    handleMessage(e) {
      this.$router.push({
        path: `/student/lms/${this.$route.params.schoolId}/inbox`,
        query: { student: e },
      })
    },
    searchExercise: debounce(function () {
      const searchItems = this.classmates.filter((item) => {
        return item.student_name
          .toLowerCase()
          .includes(this.searchInput.toLowerCase())
      })
      this.classmatesToDisplay = searchItems
    }, 500),
  },
}
</script>
<style scoped>
.class-wrapper {
  padding: 35px 40px;
}
.mb-40 {
  margin-bottom: 40px;
}

.fs14 {
  font-size: 14px;
}

@media (max-width: 768px) {
  .fs14 {
    font-size: 12px;
  }

  .student-filter-input .form-control,
  .student-filter-input.form-control {
    font-size: 12px;
  }
}
</style>
