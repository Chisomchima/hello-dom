<template>
  <div>
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
      </div>

      <b-table
        bordered
        responsive
        head-variant="light"
        hover
        show-empty
        :items="itemsToShow"
        :fields="fields"
      ></b-table>
      <div class="row"></div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'Dashboard',
  components: {},
  props: {
    parent: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
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
          label: 'Subject',
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
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    // this.$nuxt.$loading.start()
    const { data } = await this.$axios.get(
      `/lms/v2/class/${this.parent.class_id}/gradebook/alt/?academic_period=`
    )
    const items = data.data
      .map((item) => {
        return {
          name: item.name,
          class_subject: item.class_subject,
          period_name: item.period_name,
          score: `${item.score}/${item.max_obtainable_score}`,
          comment: item.comment,
        }
      })
      .filter((e) => {
        return e.class_subject === this.parent.subject_name
      })
    console.log(items)
    this.items = items
    this.itemsToShow = items
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
      // this.$nuxt.$loading.start()
    })
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
