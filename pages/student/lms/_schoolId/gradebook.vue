<template>
  <div>
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
    <div class="card class-wrapper">
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
              @keyup="searchGrade"
            />
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="font-family_brown fs14 text-black">Sort by:</div>
          <div class="student-filter-input ml-2">
            <select class="form-control">
              <option>Newest to Oldest</option>
              <option>Oldest to Newest</option>
            </select>
          </div>
        </div>
      </div>
      <b-table
        bordered
        responsive
        head-variant="light"
        hover
        :busy="$fetchState.pending"
        :items="itemsToShow"
        :fields="fields"
      >
        <template #table-busy>
            <b-skeleton-table
              :rows="5"
              :columns="4"
            ></b-skeleton-table>
        </template>
      </b-table>
      <div class="row"></div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import studentUtils from '@/mixins/studentUtils'
export default {
  name: 'Dashboard',
  mixins: [studentUtils],
  components: {},
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Assessments',
          sortable: true,
        },
        {
          key: 'class_subject',
          label: 'Subjects',
          sortable: true,
        },
        {
          key: 'period_name',
          label: 'Academic Period',
          sortable: true,
        },
        {
          key: 'score',
          sortable: false,
        },
        {
          key: 'comment',
          label: 'Teacher’s Comment',
          sortable: false,
        },
      ],
      itemsToShow: [],
      items: [],
      searchInput: '',
    }
  },
  async fetch() {
    // this.$nuxt.$loading.start()
    const { data } = await this.$axios.get(
      `/lms/v2/class/${this.studentDetails.class_id}/gradebook/alt/?academic_period=`
    )
    const items = data.data.map((item) => {
      return {
        name: item.name,
        class_subject: item.class_subject,
        period_name: item.period_name,
        score: `${item.score}/${item.max_obtainable_score}`,
        comment: item.comment,
      }
    })
    this.items = items
    this.itemsToShow = items
    console.log(data)
  },
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
  methods: {
    searchGrade: debounce(function () {
      let filteredItem = []
      const searchItemsName = this.items.filter((item) => {
        return item.name.toLowerCase().includes(this.searchInput.toLowerCase())
      })
      const searchItemsSubject = this.items.filter((item) => {
        return item.class_subject
          .toLowerCase()
          .includes(this.searchInput.toLowerCase())
      })
      filteredItem = [...searchItemsName, ...searchItemsSubject]
      this.itemsToShow = filteredItem
    }, 500),
  },
}
</script>
<style scoped>
.class-wrapper {
  padding: 35px 0;
}
.mb-40 {
  margin-bottom: 40px;
}
.table > :not(:first-child) {
  border-top: 1px solid #e7e8eb;
}
.table > thead,
.table > thead > tr,
.table > thead > tr > th {
  border: none;
  background: #f9fafb;
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
