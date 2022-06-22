<template>
  <div class="table-responsive">
    <b-skeleton-table
      v-if="busy"
      :rows="5"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"
    ></b-skeleton-table>
    <template v-else>
      <table
        v-if="theData.students.length > 0"
        class="table gradebook-table border-bottom-0"
      >
        <thead>
          <tr>
            <th
              scope="col"
              colspan="2"
              class="filter-wrapper pb-0 border-bottom-0"
              style="width: 40%"
            >
              <div class="search-input">
                <span
                  class="iconify icon"
                  data-inline="false"
                  data-icon="carbon:search"
                ></span>
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control w-100"
                  placeholder="Search for student"
                />
              </div>
            </th>
            <th
              v-for="(entry, index) in theData.entries"
              :key="index"
              scope="col"
              rowspan="2"
              class="grade-col-head text-nowrap"
              draggable="true"
              @drop="onDrop($event, entry)"
              @dragstart="startDrag($event, entry)"
              @dragover.prevent
              @dragenter.prevent
              @click="$emit('column-clicked', entry)"
            >
              <div class="px-1 py-1">
                <svg
                  class="pointer"
                  width="8"
                  height="13"
                  viewBox="0 0 8 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                  <rect y="5" width="3" height="3" rx="1" fill="#B7CCDC" />
                  <rect y="10" width="3" height="3" rx="1" fill="#B7CCDC" />
                  <rect x="4.5" width="3" height="3" rx="1" fill="#B7CCDC" />
                  <rect
                    x="4.5"
                    y="5"
                    width="3"
                    height="3"
                    rx="1"
                    fill="#B7CCDC"
                  />
                  <rect
                    x="4.5"
                    y="10"
                    width="3"
                    height="3"
                    rx="1"
                    fill="#B7CCDC"
                  />
                </svg>
              </div>
              <div class="px-3 pb-3">
                <div class="title-text mb-2">{{ entry.name }}</div>
                <div class="score-text mb-2">
                  Score:
                  <span class="score-highlight">{{
                    entry.max_obtainable_score
                  }}</span>
                </div>
                <div class="period-text mb-1">{{ entry.academic_period }}</div>
                <div class="period-text">
                  {{ formatDate(entry.create_date.split(' ')[0]) }}
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th
              scope="col"
              class="sortable text-nowrap"
              style="width: 40%"
              @click="sortData('last_name', sortType['last_name'])"
            >
              <span class="sort-arrows">Surname</span>
            </th>
            <th
              scope="col"
              class="sortable text-nowrap"
              style="width: 40%"
              @click="sortData('first_name', sortType['first_name'])"
            >
              <span class="sort-arrows">First Name</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="index">
            <td>{{ student.last_name }}</td>
            <td>{{ student.first_name }}</td>
            <template v-for="(entry, index2) in theData.entries">
              <td :key="index2" class="grade-col-data">
                {{
                  getScores(entry.scores, student.class_student_id)
                    ? getScores(entry.scores, student.class_student_id).score
                    : '-'
                }}
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      <div v-else class="row">
        <div class="col text-center text-capitalize text-gray m-2 p-3 bg-light">
          No record to show
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  props: {
    tableData: {
      type: [Object, Array],
      default: () => [],
      required: true
    },
    busy: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      theData: {
        students: []
      },
      searchQuery: '',
      sortType: {
        last_name: true,
        first_name: true
      }
    }
  },
  // async fetch() {
  //   const { data } = await this.$axios.$get(
  //     `./schools/v2/class/subject/${this.$route.query.grade_book_subject}/gradebook/?academic_period=`
  //   )
  //   this.tableData = data
  //   // console.log(data)
  // },
  computed: {
    students() {
      if (this.searchQuery) {
        return this.theData.students.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every(
              (v) =>
                item.first_name.toLowerCase().includes(v) ||
                item.last_name.toLowerCase().includes(v)
            )
        })
      } else {
        return this.theData.students
      }
    }
  },
  watch: {
    tableData: {
      handler(newValue) {
        this.theData = newValue
      },
      deep: true
    }
  },
  methods: {
    getScores(scores, classId) {
      return scores.find((item) => item.class_student_id === classId)
      //   console.log(found)
    },
    formatDate(date) {
      const dt = DateTime.fromISO(date)
      return dt.toLocaleString(DateTime.DATE_FULL)
    },
    onDrop(e, newEntry) {
      const entry = e.dataTransfer.getData('text')
      const newEntryIndex = this.theData.entries.findIndex(
        (item) => item.id === newEntry.id
      )
      const oldEntryIndex = Number(entry)
      const dataEntry = this.theData
      // Swap item in array
      const temp = dataEntry.entries[oldEntryIndex]
      dataEntry.entries[oldEntryIndex] = dataEntry.entries[newEntryIndex]
      dataEntry.entries[newEntryIndex] = temp
      this.theData = []
      this.theData = dataEntry
    },
    startDrag(evt, entry) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      const index = this.theData.entries.findIndex(
        (item) => item.id === entry.id
      )
      evt.dataTransfer.setData('text/plain', index)
    },
    sortData(key, sortType) {
      const data = this.theData
      const sortedStudent = this.theData.students.sort((a, b) => {
        if (sortType) {
          if (a[key] > b[key]) {
            return -1
          }
          if (a[key] < b[key]) {
            return 1
          }
        } else {
          if (a[key] < b[key]) {
            return -1
          }
          if (a[key] > b[key]) {
            return 1
          }
        }

        return 0
      })
      this.sortType[key] = !this.sortType[key]

      data.students = sortedStudent
      this.theData = data
    }
    // toRoute(entry) {
    //   this.$router.push({
    //     name: 'sms-id-lms-classes-class-grade-book-grade_book',
    //     params: {
    //       grade_book: entry.id
    //     },
    //     query: {
    //       grade_book_subject: this.$route.query.grade_book_subject,
    //       grade_book_subject_name: this.$route.query.grade_book_subject_name
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>
.stick-column {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  background: #ffff !important;
  z-index: 9;
}
</style>
