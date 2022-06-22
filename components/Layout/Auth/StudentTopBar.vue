<template>
  <div>
    <div
      v-if="showStudentSideCard"
      class="modal-overlay"
      @click="hideCard()"
    ></div>
    <div class="site-topbar">
      <div class="d-flex align-items-center">
        <div class="pointer d-lg-none" @click="$nuxt.$emit('openSidebar')">
          <span
            class="iconify fs-28 text-light line-height-0"
            data-inline="false"
            data-icon="eva:menu-fill"
          ></span>
        </div>
        <div class="ml-3 ml-lg-0 d-md-block d-none">
          <h2 class="schoolname">{{ getSchoolName }}</h2>
        </div>
      </div>
      <div
        class="
          bg-primary
          text-white
          d-flex
          align-content-center
          h-100
          px-md-4 px-2
          overflow-auto
        "
        style="z-index: 999"
      >
        <div
          class="white-space-nowrap fs14 d-block text-truncate"
          style="
            z-index: 999;
            padding: 0.55rem 0;
            width: 265px;
            max-width: calc(100vw - 35px);
          "
          @click="showStudentSideCard = !showStudentSideCard"
        >
          <strong class="text-truncate pointer">{{
            !studentLoadingComplete ? 'Loading...' : getStudentName()
          }}</strong>
          <span
            class="pointer pl-2"
            data-toggle-visibility="#student-dropdown-container"
          >
            {{ !studentLoadingComplete ? '' : classDetails.student_class.name }}
            <span class="iconify" data-icon="akar-icons:chevron-down"></span
          ></span>
        </div>
      </div>

      <!-- Filter Container -->
      <div
        v-if="studentLoadingComplete"
        id="student-dropdown-container"
        :class="
          !showStudentSideCard
            ? 'student-dropdown-container removing'
            : 'student-dropdown-container '
        "
      >
        <!-- <div class="d-flex align-items-center justify-content-center mb-4">
        <div class="ac-year-dropdown-label mr-2">Academic year:</div>
        <div>
          <select class="ac-year-dropdown">
            <option>2020/2021</option>
          </select>
        </div>
      </div> -->

        <div class="teacher-details-wrapper mb-4">
          <div class="text-center">
            <img
              v-if="classDetails.class_teacher.avatar"
              class="teacher-img"
              width="20"
              height="20"
              :src="classDetails.class_teacher.avatar"
            />
            <img
              v-else
              src="~/assets/lessons/image/defaulUserImage.png"
              alt="teacher picture"
              width="20"
              height="20"
              class="teacher-img"
            />
          </div>
          <div class="details-container">
            <div class="name mb-2">
              {{ teacherFullName }}
            </div>
            <div class="position mb-1">Class teacher</div>
            <div class="class">{{ classDetails.student_class.name }}</div>
          </div>
        </div>

        <div v-if="studentLoadingComplete" class="mb-4">
          <div
            class="
              font-weight-bold
              font-family_brown
              text-dark
              fs-14
              line-height-150p
              mb-2
            "
          >
            School Calendar
          </div>
          <div class="calendar-wrapper">
            <div
              v-for="(item, i) in calender"
              :key="i"
              :class="
                isTodaysDate(item[0]) ? 'calendar-date active' : 'calendar-date'
              "
              @click="setCalendarDateSelected(item)"
            >
              <div class="day">{{ item[1].day_name }}</div>
              <div class="date mb-1">{{ item[1].day_value }}</div>
              <div
                v-if="item[1].events.length > 0"
                class="active-indicator"
              ></div>
              <div v-else class="active-indicator bg-transparent"></div>
            </div>
          </div>
        </div>

        <div v-if="timetable && timetable.length > 0" class="mb-4">
          <div class="tt-card py-3">
            <div class="tt-card-title px-3 pb-1">Timetable</div>
            <div class="tt-card-list">
              <div
                v-for="(item, i) in timetable"
                :key="i"
                class="tt-card-list-item"
              >
                <div
                  class="subject text-truncater d-flex align-items-center mr-2"
                >
                  <div
                    class="indicator mr-2"
                    :style="`background-color: ${item.subject_color}`"
                  ></div>
                  <div class="text-truncate">{{ item.subject_name }}</div>
                </div>
                <div
                  class="
                    time
                    d-flex
                    align-items-center
                    justify-content-end
                    flex-grow-1
                  "
                >
                  <!-- <div class="online-status mr-2">
                  <span
                    class="iconify icon mt-1 mr-1"
                    data-inline="false"
                    data-icon="fluent:live-24-filled"
                  ></span>
                  Online
                </div> -->
                  <div>{{ item.subject_start_time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="eventSelected" class="mb-4">
          <div class="tt-card py-3">
            <div
              class="
                d-flex
                align-items-center
                justify-content-between
                px-3
                pb-1
              "
            >
              <div class="tt-card-title">Events</div>
              <div
                v-if="eventSelected.hasOwnProperty('year')"
                class="tt-card-title-time"
              >
                <!-- Friday 22nd, May 2021 -->
                {{
                  formatDate(
                    `${eventSelected.year}-${eventSelected.month_value}-${eventSelected.day_value}`,
                    'EEEE do, LLL yyyy'
                  )
                }}
              </div>
            </div>
            <div class="tt-card-list">
              <div
                v-if="eventSelected.events.length < 1"
                class="tt-card-empty-text"
              >
                No events
              </div>
              <div v-else class="tt-card-empty-text">
                Please display events here
              </div>

              <!-- <div class="tt-card-list-item">
              <div
                class="subject text-truncater d-flex align-items-center mr-2"
              >
                <div
                  class="indicator mr-2"
                  style="background-color: #1070b7"
                ></div>
                <div class="text-truncate">
                  Speech and Prize Giving Day Ceremony
                </div>
              </div>
              <div
                class="
                  time
                  d-flex
                  align-items-center
                  justify-content-end
                  flex-grow-1
                "
              >
                <div>10:00 AM</div>
              </div>
            </div> -->
            </div>
            <div
              class="
                fs-12
                font-family_brown
                line-height-150p
                font-weight-bold
                px-3
                mt-2
                d-flex
                align-items-center
                justify-content-between
              "
            >
              <nuxt-link
                v-if="eventSelected.events.length > 0"
                class="text-primary"
                href="#"
                >see more events</nuxt-link
              >
              <!-- <nuxt-link class="text-primary" href="#">view calendar</nuxt-link> -->
            </div>
          </div>
        </div>
        <!-- <div class="mb-4">
        <div class="tt-card py-3">
          <div
            class="d-flex align-items-center justify-content-between px-3 pb-1"
          >
            <div class="tt-card-title">Events</div>
            <div class="tt-card-title-time">Friday 22nd, May 2021</div>
          </div>
          <div class="tt-card-empty-text">No events</div>
          <div
            class="
              fs-12
              font-family_brown
              line-height-150p
              font-weight-bold
              px-3
              mt-2
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <span></span>
            <a class="text-primary" href="#">view calendar</a>
          </div>
        </div>
      </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isToday } from 'date-fns'
import { format } from 'date-fns/esm'

export default {
  data() {
    return {
      showStudentSideCard: false,
      eventSelected: { events: [] },
      timetable: [],
    }
  },
  computed: {
    ...mapState('student', ['classDetails', 'studentLoadingComplete']),
    eventSelectedCompute() {
      return this.eventSelected
    },
    calender() {
      const data = Object.entries(this.classDetails.school_calendar.days)
      return data
    },
    teacherFullName() {
      return (
        this.classDetails.class_teacher.first_name +
        ' ' +
        this.classDetails.class_teacher.last_name
      )
    },
    getSchoolName() {
      const school = this.$store.getters['student/getSchoolByCode'](
        this.$route.params.schoolId
      )
      return school?.name
    },
  },
  watch: {
    studentLoadingComplete(v) {
      this.showStudentSideCard = false

      if (v) {
        const todayForCalender = format(new Date(), 'yyyy-MM-dd') // yyyy-MM-dd
        const todaysEvents =
          this.classDetails.school_calendar.days[todayForCalender]
        this.eventSelected = todaysEvents
        // console.log(todaysEvents)
        const today = format(new Date(), 'EEEE') // day (e.g friday)
        this.timetable =
          this.classDetails.student_class.timetable[today.toLowerCase()]
        console.log(today, this.timetable)
        // }
      }
    },
  },
  mounted() {
    this.showStudentSideCard = false // const todayForCalender = format(new Date(), 'yyyy-MM-dd') // yyyy-MM-dd
    // const todaysEvents =
    //   this.classDetails.school_calendar.days[todayForCalender]
    // this.eventSelected = todaysEvents
    // // console.log(todaysEvents)
    // const today = format(new Date(), 'EEEE') // day (e.g friday)
    // this.timetable =
    //   this.classDetails.student_class.timetable[today.toLowerCase()]
    // console.log(today, this.timetable)
  },
  methods: {
    hideCard() {
      this.showStudentSideCard = false
    },
    getStudentName() {
      return (
        this.$store.state.student.studentProfile.name.split(' ')[0] +
        ' ' +
        this.$store.state.student.studentProfile.name.split(' ')[1]
      )
    },
    setCalendarDateSelected(item) {
      this.eventSelected = item[1]
      const today = format(new Date(item[0]), 'EEEE')
      this.timetable =
        this.classDetails.student_class.timetable[today.toLowerCase()]
      // console.log(item)
    },
    isTodaysDate(date) {
      return isToday(new Date(date))
    },
    formatDate(date, type) {
      // console.log(date)
      return format(new Date(date), type)
    },
  },
}
</script>

<style scoped>
.schoolname {
  font-size: 16px;
  font-weight: 900;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 996;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  opacity: 0;
  background: none;
}

.fs14 {
  font-size: 14px;
}

@media (max-width: 768px) {
  .schoolname {
    font-size: 14px;
  }
  .fs14 {
    font-size: 12px;
  }
}
@media (max-width: 568px) {
  .schoolname {
    font-size: 12px;
  }
}
</style>
