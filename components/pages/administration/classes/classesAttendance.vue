<template>
  <div>
    <div
      v-if="Object.values(week).length > 0"
      class="
        filter-wrapper
        d-flex
        flex-wrap
        align-items-center
        justify-content-between
      "
    >
      <div
        class="d-flex align-items-center justify-content-between flex-wrap mb-2"
      >
        <div class="mr-2">
          <select v-model="week" class="form-control">
            <option v-for="(item, index) in weeks" :key="index" :value="item">
              {{ item.week_name }}
            </option>
          </select>
        </div>
        <div class="d-flex align-items-center">
          <div class="mx-1 pointer" style="line-height: 0">
            <span
              class="iconify"
              data-inline="false"
              data-icon="fluent:chevron-left-16-filled"
              style="font-size: 20px"
            ></span>
          </div>
          <div class="mx-1 pointer" style="line-height: 0">
            <span
              class="iconify"
              data-inline="false"
              data-icon="fluent:chevron-right-16-filled"
              style="font-size: 20px"
            ></span>
          </div>
          <div class="ml-1">{{ formatDate(week.week_start) }}</div>
        </div>
      </div>
      <div
        class="
          d-flex
          align-items-center
          justify-content-between justify-content-md-end
          flex-wrap
          mb-2
        "
      >
        <div
          class="
            attendance-table-legend
            d-flex
            align-items-center
            flex-nowrap
            mr-3
          "
        >
          <div class="legend-icon legend-icon-present mr-2"></div>
          Present
        </div>
        <div
          class="
            attendance-table-legend
            d-flex
            align-items-center
            flex-nowrap
            mr-3
          "
        >
          <div class="legend-icon legend-icon-holiday mr-2"></div>
          Holiday
        </div>
        <div
          class="
            attendance-table-legend
            d-flex
            align-items-center
            flex-nowrap
            mr-3
          "
        >
          <div class="legend-icon legend-icon-absent mr-2"></div>
          Absent
        </div>
      </div>
    </div>
    <hr class="mt-1" />
    <div class="table-responsive">
      <table class="table attendance-table">
        <thead>
          <tr>
            <th scope="col" class="filter-wrapper pb-0 border-bottom-0">
              <div class="search-input">
                <span
                  class="iconify icon"
                  data-inline="false"
                  data-icon="carbon:search"
                ></span>
                <input
                  type="text"
                  class="form-control w-100"
                  placeholder="Search for student"
                />
              </div>
            </th>
            <th
              v-for="(day, index) in days"
              :key="index"
              scope="col"
              rowspan="2"
              class="attendance-col-head py-3 px-2"
            >
              <div class="day-txt mb-2">{{ day.day }}</div>
              <div class="mb-3">
                <div class="dropdown text-center">
                  <button
                    id="dropdownMenuButton"
                    class="btn btn-sm text-center mx-auto"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span class="date-txt">{{ day.date }}</span>
                    <span
                      class="iconify dropdown-icon"
                      data-icon="akar-icons:chevron-down"
                    ></span>
                  </button>
                  <div
                    class="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="switchPeriod(index)"
                      >Switch to {{ day.period ? 'Morning' : 'Afternoon' }}</a
                    >
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="setAll(index)"
                      >Set All Present</a
                    >
                    <a class="dropdown-item" href="#">Set All Absent</a>
                  </div>
                </div>
              </div>
              <div class="period-txt">
                {{ day.period ? 'Afternoon' : 'Morning' }}
              </div>
            </th>
          </tr>
          <tr>
            <th scope="col">Names</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="index">
            <td>
              <div class="student-name">
                <div class="mr-2">
                  <template v-if="student.avatar === null">
                    <img
                      v-if="student.gender === 'male'"
                      width="25px"
                      class="img-fluid rounded-circle"
                      src="~/assets/img/male-young.jpeg"
                    />

                    <img
                      v-else
                      width="25px"
                      class="img-fluid rounded-circle"
                      src="~/assets/img/female-young.jpeg"
                    />
                  </template>

                  <img v-else class="student-img" :src="student.avatar" />
                </div>
                <div>{{ student.first_name }} {{ student.last_name }}</div>
              </div>
            </td>
            <template v-for="(attend, index2) in attendance.days">
              <td :key="index2" class="attendance-col-data">
                <div class="attendance-status-wrapper">
                  <template
                    v-if="
                      getStudent(
                        attend.attendances[days[index2].period].students,
                        student.class_student_id
                      )
                    "
                  >
                    <div
                      v-if="
                        getStudent(
                          attend.attendances[days[index2].period].students,
                          student.class_student_id
                        ).status === 'present'
                      "
                      class="attendance-status attendance-status-present"
                    ></div>
                    <div
                      v-if="
                        getStudent(
                          attend.attendances[days[index2].period].students,
                          student.class_student_id
                        ).status === 'absent'
                      "
                      class="attendance-status attendance-status-absent"
                    ></div>
                    <div
                      v-if="
                        getStudent(
                          attend.attendances[days[index2].period].students,
                          student.class_student_id
                        ).status === 'holiday'
                      "
                      class="attendance-status attendance-status-holiday"
                    ></div>
                  </template>
                  <template v-else>
                    <div
                      class="attendance-status attendance-status-absent"
                    ></div>
                  </template>
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!busy" class="d-flex text-center justify-content-center">
      <b-spinner
        style="width: 3rem; height: 3rem"
        label="Large Spinner"
        variant="primary"
      ></b-spinner>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  data() {
    return {
      weeks: [],
      week: {},
      students: [],
      attendance: [],
      days: [],
      busy: false,
    }
  },
  watch: {
    async week(value) {
      // console.log(value)
      if (value) {
        await this.getAttendance(value.id)
      }
    },
  },
  async mounted() {
    await this.getWeeks()
    await this.getAttendance(this.week.id)
  },
  methods: {
    FormatHeader(data) {
      return data.map((item) => {
        const dt = DateTime.fromISO(item.date)
        dt.toFormat('yyyy')
        // console.log(data)
        return {
          period: 0,
          day: dt.toFormat('ccc'),
          date: dt.toFormat('dd'),
          data: dt,
        }
      })
    },
    formatDate(date) {
      const dt = DateTime.fromISO(date)
      return dt.toLocaleString(DateTime.DATE_MED)
    },
    getStudent(student, classStudentId) {
      return student.find((item) => item.class_student_id === classStudentId)
    },
    async getAttendance(weekId) {
      this.busy = true
      try {
        const { data } = await this.$axios.$get(
          `./schools/v2/class/${this.$route.params.class}/week/${weekId}/`
        )
        this.days = this.FormatHeader(data.attendance.days)
        this.students = data.students
        this.attendance = data.attendance
        this.busy = false
      } catch (error) {
        console.log(error)
      }
    },
    async getWeeks() {
      try {
        const { data } = await this.$axios.$get(
          `./schools/v2/academic_year/${this.$store.state.school.currentAcademicYear.id}/weeks/`
        )
        this.weeks = data
        this.week = data[0]
      } catch (error) {
        console.log(error)
      }
    },
    switchPeriod(index) {
      this.days[index].period = this.days[index].period ? 0 : 1
      const temp = this.students
      this.students = []
      this.students = temp
    },
    async setAll(index) {
      // let attendance = {

      // }
      try {
        await this.$axios.$post(
          `./schools/v2/class/${this.$route.params.class}/week/${this.week.id}/`
        )
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
