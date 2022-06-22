<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Report Card</div>

      <!-- <div class="d-flex align-items-center mb-2">
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
            </div> -->
    </div>
    <div class="card class-wrapper">
      <!-- <div
                class="
                    d-flex
                    align-items-center
                    justify-content-between
                    mb-4
                    pl-3
                    pr-3
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
                <div class="d-flex align-items-center">
                    <div class="font-family_brown fs14 text-black">
                        Sort by:
                    </div>
                    <div class="student-filter-input ml-2">
                        <select class="form-control">
                            <option>Newest to Oldest</option>
                            <option>Oldest to Newest</option>
                        </select>
                    </div>
                </div>
            </div> -->
      <UtilsEmptyState v-if="itemsToShow.length < 1" text="No cards yet." />
      <div v-else>
        <div v-if="readItem" class="border rounded">
          <div class="d-flex justify-content-end">
            <b-button @click="readItem = false" class="bg-danger">
              <Icon icon="akar-icons:circle-x" />
            </b-button>
          </div>

          <WebViewer :url="reportCardFile"></WebViewer>
        </div>

        <Table :items="itemsToShow" :fields="fields">
          <template #action="{ data: { item } }">
            <span class="text-primary">
              <span class="mr-4" @click="downloadReportCard(item)">
                <Icon
                  icon="ic:outline-cloud-download"
                  style="font-size: 1.5rem"
                ></Icon>
              </span>
              <span class="" @click="previewReportCard(item)">
                <Icon
                  icon="ant-design:eye-filled"
                  style="font-size: 1.5rem"
                ></Icon>
              </span>
            </span>
          </template>
          <template #date_uploaded="{ data: { item } }">
            {{
              item.date_uploaded
                ? formatDate(item.date_uploaded)
                : 'Unavailable'
            }}
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import { debounce } from 'lodash'
import { format } from 'date-fns/esm'
// import classmatesCard from '~/components/student/classmatesCard'
export default {
  name: 'Dashboard',
  components: {
    // classmatesCard,
  },
  layout: 'authWithoutTopbar',
  data() {
    return {
      readItem: false,
      reportCardFile: '',
      fields: [
        {
          key: 'title',
          sortable: true,
        },
        {
          label: 'Acad Period',
          key: 'academic_period',
          sortable: true,
        },
        {
          label: 'Published Date',
          key: 'date_uploaded',
          sortable: true,
        },
        {
          label: 'Report Card Name',
          key: 'batch',
          sortable: true,
        },

        {
          label: '',
          key: 'action',
          sortable: false,
        },
      ],
      items: [],
      itemsToShow: [],
      searchInput: '',
    }
  },
  async fetch() {
    // `/lms/v3/school/${this.$store.state.student.classDetails.student_class.id}/reportcards/`

    const currentSchool = this.$store.state.student.discoveryData.filter(
      (e) => e.school_details.code === this.$route.params.schoolId
    )[0]
    console.log(currentSchool)
    this.$nuxt.$loading.start()
    const { data } = await this.$axios.get(
      `/lms/v3/school/${currentSchool.student_details.student_class_id}/reportcards/?page_size=999`
    )
    console.log(data)
    const items = data.data.results.map((item) => {
      return {
        title: item.school_class_name,
        school_class_name: item.school_class_name,
        academic_year: item.academic_year,
        academic_yearId: item.academic_year_id,
        id: item.id,
        academic_period: item.academic_period,
        academic_periodId: item.academic_period_id,
        date_uploaded: item.updated_at,
        batch: item.batch_name,
      }
    })
    this.items = items
    this.itemsToShow = items
    this.$nuxt.$loading.finish()
    console.log(data.data)
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
    async getReportCard(e) {
      const schoolAcronym = this.$route.params.schoolId
      const loggedInSchool = this.$store.state.student.discoveryData.filter(
        (e) => {
          return e.school_details.code === schoolAcronym
        }
      )
      const currentClassId = loggedInSchool[0].student_details.student_class_id

      try {
        const {
          data: {
            data: { results },
          },
        } = await this.$axios.get(
          `/lms/v3/school/${currentClassId}/reportcards/`
        )
        const reportCardThatYouClickedOn = results.filter((a) => {
          return a.id === e.id
        })
        return reportCardThatYouClickedOn[0]
      } catch (e) {
        console.error(e)
      }
    },
    async previewReportCard(e) {
      const file = await this.getReportCard(e)
      this.reportCardFile = file.file_url
      this.readItem = true
    },
    async downloadReportCard(e) {
      const file = await this.getReportCard(e)
      try {
        const response = await axios.get(file.file_url, {
          responseType: 'blob',
        })
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `Report card.pdf`
        link.click()
        URL.revokeObjectURL(link.href)
      } catch (e) {
        console.error(e)
      }
    },
    formatDate(date) {
      return format(new Date(date), 'dd/MM/yyyy')
    },
    searchExercise: debounce(function () {
      const searchItems = this.items.filter((item) => {
        return item.school_class_name
          .toLowerCase()
          .includes(this.searchInput.toLowerCase())
      })
      this.itemsToShow = searchItems
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
