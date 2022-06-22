<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Subjects</div>
    </div>
    <div class="card class-wrapper p-4">
      <div
        class="d-flex align-items-center justify-content-between mb-4 pl-3 pr-3"
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
        <!--
        <div class="d-flex align-items-center">
          <div class="font-family_brown fs14 text-black">Sort by:</div>
          <div class="student-filter-input ml-2">
            <select class="form-control">
              <option>A</option>
              <option>Z</option>
            </select>
          </div>
        </div>
        -->
      </div>
      <UtilsEmptyState v-if="subjects.length < 1" text="No subjects yet." />

      <div v-else>
        <div v-if="$fetchState.pending" class="row">
          <div v-for="n in 6" :key="n" class="col-3 my-2">
            <b-skeleton-img></b-skeleton-img>
          </div>
        </div>

        <div v-else>
          <studentSubjectCard :subjects="itemsToShow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data() {
    return {
      subjects: [],
      searchInput: '',
    }
  },
  async fetch() {
    try {
      const {
        data: { results },
      } = await this.$axios.get(
        `lms/class/${this.studentProfile.classes[0].id}/subjects/details/?order_by=new`
      )

      // debugger;

      this.subjects = results
      console.log('response', this.subjects)
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    studentProfile() {
      return this.$store.state.student.studentProfile
    },
    itemsToShow() {
      return this.subjects.filter((items) => {
        return this.searchInput
          .toLowerCase()
          .split('')
          .every((v) => items.name.toLowerCase().includes(v))
      })
    },
  },
  methods: {
    searchExercise: debounce(function () {}, 500),
  },
}
</script>

<style lang="scss" scoped></style>
