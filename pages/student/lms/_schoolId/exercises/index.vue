<template>
  <div>
    <!-- <h1>school dashboard {{ $route.params.schoolId }}</h1> -->
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">{{ currentRouteName }}</div>

      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <button
            class="
              btn btn-borderless-primary
              line-height-0
              d-flex
              align-items-center
              fs-14
              py-2
              px-3
            "
          >
            Filter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              focusable="false"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
              class="iconify ml-1"
              data-inline="false"
              data-icon="bi:filter"
              style="transform: rotate(360deg)"
            >
              <g fill="currentColor">
                <path
                  d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="custom-card-tabs mt-1">
        <ul id="pills-tab" class="nav" role="tablist">
          <li class="nav-item" role="presentation" @click="changeStatus('new')">
            <a
              id="pills-Not-Started-tab"
              class="nav-link active"
              data-toggle="pill"
              href="#pills-Not-Started"
              role="tab"
              aria-controls="pills-Not-Started"
              aria-selected="false"
              >Not Started</a
            >
          </li>
          <li
            class="nav-item"
            role="presentation"
            @click="changeStatus('submitted')"
          >
            <a
              id="pills-Submitted-tab"
              class="nav-link"
              data-toggle="pill"
              href="#pills-Submitted"
              role="tab"
              aria-controls="pills-Submitted"
              aria-selected="false"
              >Submitted</a
            >
          </li>
          <li
            class="nav-item"
            role="presentation"
            @click="changeStatus('graded')"
          >
            <a
              id="pills-Graded-tab"
              class="nav-link"
              data-toggle="pill"
              href="#pills-Graded"
              role="tab"
              aria-controls="pills-Graded"
              aria-selected="false"
              >Graded</a
            >
          </li>
          <li
            class="nav-item"
            role="presentation"
            @click="changeStatus('expired')"
          >
            <a
              id="pills-Graded-tab"
              class="nav-link"
              data-toggle="pill"
              href="#pills-Graded"
              role="tab"
              aria-controls="pills-Graded"
              aria-selected="false"
              >Overdue/Expired</a
            >
          </li>
          <li class="nav-item" role="presentation" @click="changeStatus('all')">
            <a
              id="pills-All-tab"
              class="nav-link"
              data-toggle="pill"
              href="#pills-All"
              role="tab"
              aria-controls="pills-All"
              aria-selected="true"
              >All</a
            >
          </li>
        </ul>
      </div>
      <div id="pills-tabContent" class="tab-content card-body">
        <div
          id="pills-All"
          class="tab-pane fade active show"
          role="tabpanel"
          aria-labelledby="pills-All-tab"
        >
          <div
            class="
              d-flex
              align-items-center
              justify-content-between
              flex-wrap
              mb-4
            "
          >
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
            <!-- <div class="d-flex align-items-center">
                            <div class="font-family_brown fs-14 text-black">
                                Sort by:
                            </div>
                            <div class="student-filter-input ml-2">
                                <select v-model="sortBy" class="form-control">
                                    <option value="asc">
                                        Newest to Oldest
                                    </option>
                                    <option value="dsc">
                                        Oldest to Newest
                                    </option>
                                </select>
                            </div>
                        </div> -->
          </div>
          <div v-if="exerciseTodisplay.length < 1">
            <UtilsEmptyState text="No Exercises" />
          </div>
          <div v-else class="row">
            <student-exercise-card
              v-for="(exercise, i) in exerciseTodisplay"
              :key="i"
              :image="exercise.subject_details.icon_data.icon"
              :color="exercise.subject_details.icon_data.icon_bg_color"
              :exercise="exercise"
            />
          </div>
        </div>
        <div
          id="pills-Not-Started"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="pills-Not-Started-tab"
        >
          <div
            class="
              d-flex
              align-items-center
              justify-content-between
              flex-wrap
              mb-4
            "
          >
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
            <!-- <div class="d-flex align-items-center">
              <div class="font-family_brown fs-14 text-black">Sort by:</div>
              <div class="student-filter-input ml-2">
                <select class="form-control" v-model="sortBy">
                  <option value="asc">Newest to Oldest</option>
                  <option value="dsc">Oldest to Newest</option>
                </select>
              </div>
            </div> -->
          </div>
          <div v-if="exerciseTodisplay.length < 1">
            <UtilsEmptyState text="No Exercises" />
          </div>
          <div v-else class="row">
            <student-exercise-card
              v-for="(exercise, i) in exerciseTodisplay"
              :key="i"
              :image="exercise.subject_details.icon_data.icon"
              :color="exercise.subject_details.icon_data.icon_bg_color"
              :exercise="exercise"
            />
          </div>
          <!-- <div
                        class="posts-page-empty position-relative top-0 left-0 py-5 my-5 text-center"
                        style="transform: none"
                    >
                        <div class="">
                            <img
                                src="~/assets/img/empty-posts.svg"
                                class="img-fluid"
                            />
                        </div>
                        <div class="font-family_brown fs-16 text-light mt-4">
                            <strong>You don't have any exercise</strong>
                        </div>
                    </div> -->
        </div>
        <div
          id="pills-Submitted"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="pills-Submitted-tab"
        >
          <div
            class="
              d-flex
              align-items-center
              justify-content-between
              flex-wrap
              mb-4
            "
          >
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
            <!-- <div class="d-flex align-items-center">
              <div class="font-family_brown fs-14 text-black">Sort by:</div>
              <div class="student-filter-input ml-2">
                <select class="form-control" v-model="sortBy">
                  <option value="asc">Newest to Oldest</option>
                  <option value="dsc">Oldest to Newest</option>
                </select>
              </div>
            </div> -->
          </div>
          <div v-if="exerciseTodisplay.length < 1">
            <UtilsEmptyState text="No Exercises" />
          </div>
          <div v-else class="row">
            <student-exercise-card
              v-for="(exercise, i) in exerciseTodisplay"
              :key="i"
              :image="exercise.subject_details.icon_data.icon"
              :color="exercise.subject_details.icon_data.icon_bg_color"
              :exercise="exercise"
            />
          </div>
        </div>
        <div
          id="pills-Graded"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="pills-Graded-tab"
        >
          <div
            class="
              d-flex
              align-items-center
              justify-content-between
              flex-wrap
              mb-4
            "
          >
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
            <!-- <div class="d-flex align-items-center">
              <div class="font-family_brown fs-14 text-black">Sort by:</div>
              <div class="student-filter-input ml-2">
                <select class="form-control" v-model="sortBy">
                  <option value="asc">Newest to Oldest</option>
                  <option value="dsc">Oldest to Newest</option>
                </select>
              </div>
            </div> -->
          </div>
          <div v-if="exerciseTodisplay.length < 1">
            <UtilsEmptyState text="No Exercises" />
          </div>
          <div v-else class="row">
            <student-exercise-card
              v-for="(exercise, i) in exerciseTodisplay"
              :key="i"
              :image="exercise.subject_details.icon_data.icon"
              :color="exercise.subject_details.icon_data.icon_bg_color"
              :exercise="exercise"
            />
          </div>
        </div>
      </div>
    </div>

    <b-pagination
      v-model="currentPage"
      :total-rows="totalPages"
      hide-goto-end-buttons
      :per-page="perPage"
      align="center"
      class="mt-3"
      size="sm"
      @change="changePage"
    ></b-pagination>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import studentExerciseCard from '~/components/student/studentExerciseCard'
import studentUtils from '@/mixins/studentUtils'

export default {
  name: 'Exercise',
  mixins: [studentUtils],
  components: {
    studentExerciseCard,
  },
  // layout: 'authWithoutTopbar',
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      perPage: 12,
      allExercises: [],
      exerciseTodisplay: [],
      type: 'new',
      sortBy: 'asc',
      searchInput: '',
    }
  },
  async fetch() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const data = await this.$axios.$get(
      `quiz/v3/${this.studentDetails.class_id}/student/quizzes/list/?status=${this.type}&page=${this.currentPage}&order=${this.sortBy}`
    )
    this.allExercises = data.data
    this.exerciseTodisplay = data.data
    this.currentPage = data.page === 0 ? 1 : data.page
    this.totalPages = data.pages * this.perPage
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
      //   this.$nuxt.$loading.start()
    })
  },
  computed: {
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
    sortBy() {
      this.$fetch()
    },
    currentPage() {
      this.$fetch()
    },
  },
  methods: {
    changePage(e) {
      this.currentPage = e
    },
    searchExercise: debounce(async function () {
      const data = await this.$axios.$get(
        `quiz/v3/${this.studentDetails.class_id}/student/quizzes/list/?status=${this.type}&name=${this.searchInput}`
      )
      this.allExercises = data.data
      this.exerciseTodisplay = data.data
      this.currentPage = data.page === 0 ? 1 : data.page
      this.totalPages = data.pages * this.perPage
      // this.exerciseTodisplay = searchItems
    }, 500),
    changeStatus(type) {
      this.currentPage = 1
      this.type = type
      this.$fetch()
    },
    filterExercises(status) {
      if (status !== 'all')
        return this.exercises.filter((exercise) => exercise.status === status)

      return this.exercises
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
  },
}
</script>
