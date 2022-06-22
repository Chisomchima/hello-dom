<template>
  <div>
    <UtilsFilterComponent
      disable-visualization
      disable-pagination
      @search-input="searchMethod"
    >
      <template #beforeActions>
        <div class="d-flex align-items-center">
          <div class="options-container mt-0">
            <span
              class="badge blue-badge my-1 p-2 ml-3"
              :class="{ active: tabName === 'not_started' }"
              @click="tabName = 'not_started'"
              >New</span
            >
            <span
              class="badge yellow-badge my-1 p-2 ml-3"
              :class="{ active: tabName === 'in_progress' }"
              @click="tabName = 'in_progress'"
            >
              In progress</span
            >
            <span
              class="badge green-badge my-1 p-2 ml-3"
              :class="{ active: tabName === 'completed' }"
              @click="tabName = 'completed'"
            >
              Completed</span
            >
            <span
              class="badge dark-badge p-2 my-1 ml-3"
              :class="{ active: tabName === 'all' }"
              @click="tabName = 'all'"
            >
              All</span
            >
          </div>
          <div class="font-family_brown ml-5 fs14 text-black sort-by">
            Sort by:
          </div>
          <div class="student-filter-input ml-2 sort-by">
            <select v-model="sortBy" class="form-control">
              <option value="asc">Newest to Oldest</option>
              <option value="dsc">Oldest to Newest</option>
            </select>
          </div>
        </div>
      </template>
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :fields="fields"
          :pages="pages"
          :items="itemsToShow"
          :per-page="perPage"
          :busy="busy"
          @page-changed="pageChanged($event)"
          @row-clicked="onRowClicked"
          @download="addToCache($event)"
        >
          <template #week="{ data: { item } }">
            <div>{{ item.academic_period }} - {{ item.week }}</div>
          </template>
          <template #myProgress="{ data }">
            <span
              v-if="data.item.myProgress === 'not_started'"
              class="text-danger"
              >Not Started
            </span>
            <span
              v-if="data.item.myProgress === 'in_progress'"
              class="text-warning"
              >In Progress</span
            >
            <span
              v-if="data.item.myProgress === 'completed'"
              class="text-success"
              >Completed</span
            >
          </template>
          <template #download="{ data }">
            <b-button
              v-if="!data.item.availableOffline"
              variant="light"
              size="sm"
              center
            >
              <b-icon
                icon="cloud-download"
                aria-label="download-offline"
                @click="addToCache(data.item)"
              ></b-icon>
            </b-button>

            <b-button v-else variant="success" size="sm" center>
              <b-icon
                icon="cloud-check-fill"
                aria-label="download-offline"
              ></b-icon>
            </b-button>
          </template>

          <template #liveClass="{ data }">
            <div
              v-if="Object.keys(data.item.liveClass).length > 0"
              class="d-flex my-1 justify-content-between"
              style="width: auto !important;"
              @click.stop="goToLiveSession(data.item.liveClass)"
            >
              <span
                class="
                  badge
                  fs-12
                  text-danger
                  alert-danger
                  font-weight-normal
                  border-danger
                  py-1
                "
                >on-going presentation
                <b-icon
                  icon="circle-fill"
                  animation="throb"
                  font-scale="1"
                ></b-icon>
              </span>
            </div>
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>

    <b-modal
      id="download-content"
      centered
      size="sm"
      title=""
      hide-footer
      hide-header
      no-close-on-backdrop
      no-close-on-esc
    >
      <div class="align-items-center d-flex flex-column m-auto text-center">
        <b-spinner label="Spinning"></b-spinner>
        <p class="text-muted mt-3">
          Downloading content for offline usage.please wait...
        </p>
      </div>
      <!-- Hello Small Modal! -->
    </b-modal>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
import modalMsgBox from '@/mixins/modalMsgBox'
import offlineStorage from '@/mixins/offlineStorageStundentSide'

export default {
  mixins: [TableFunc, modalMsgBox, offlineStorage],
  props: {
    data: {
      type: Object,
      required: true,
    },
    liveClass: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      isSubmitted: false,
      isNotSubmitted: true,
      tabName: 'not_started',
      busy: false,
      sortBy: 'dsc',
      perPage: 12,
      pages: 0,

      search: '',

      fields: [
        // { key: 'sequence', sortable: true, label: 'Sequence No' },
        { key: 'name', sortable: true },
        { key: 'week', label: 'Academic period - Week', sortable: false },
        // { key: 'contents', sortable: false },
        // { key: 'description', sortable: true },
        {
          key: 'available_date',
          sortable: true,
          formatter: (value) => {
            return value.slice(0, 10)
            // return DateTime.fromSQL(value).toFormat('DDD')
          },
        },
        { key: 'myProgress', sortable: true },
        { key: 'download', label: 'Make Available Offline', sortable: false },
        { key: 'liveClass', label:'', sortable: false },
      ],
    }
  },
  async fetch() {
    this.busy = true
    this.offlineRecords = await this.$dexie.syncedLessonContent
      .filter(
        (item) =>
          item.school === this.$route.params.schoolId &&
          item.subject === this.$route.params.subject
      )
      .toArray()
    const school = this.$store.getters['student/getSchoolByCode'](
      this.$route.params.schoolId
    )
    try {
      this.busy = true

      const { data } = await this.$axios.$get(
        `/lms/v3/school/${school.id}/${this.data.class_id}/lessons/?subject_id=${this.$route.params.subject}&page_size=12&order=dsc&page=1&progress=${this.tabName}`
      )

      this.items = data.results.map((each) => ({
        id: each.id,
        available_date: each.available_date,
        week: each.school_week.name,
        academic_period: each.school_week.academic_period_name,
        myProgress: each.student_progress,
        name: each.name,
        contents: each.content.length,
        availableOffline: this.searchRecord(each.id),
        liveClass: this.checkLiveLesson(each),
      }))
      this.busy = false
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    itemsToShow() {
      if (this.search) {
        return this.items.filter((item) => {
          return this.search
            .toLowerCase()
            .split('')
            .every((v) => item.name.toLowerCase().includes(v))
        })
      } else {
        return this.items
      }
    },
  },

  watch: {
    sortBy() {
      this.$fetch()
    },
    tabName() {
      this.$fetch()
    },
  },
  methods: {
    searchMethod(e) {
      this.search = e
    },
    onRowClicked(e) {
      this.$router.push({
        name: 'student-lms-schoolId-lessons-lesson',
        params: {
          schoolId: this.$route.params.schoolId,
          lesson: e.id,
        },
        query: { _name: `${e.name}` },
      })
    },
    async pageChanged(page) {
       this.busy = true
      this.offlineRecords = await this.$dexie.syncedLessonContent
        .filter(
          (item) =>
            item.school === this.$route.params.schoolId &&
            item.subject === this.$route.params.subject
        )
        .toArray()
      const school = this.$store.getters['student/getSchoolByCode'](
        this.$route.params.schoolId
      )
      try {
        this.busy = true

        const { data } = await this.$axios.$get(
          `/lms/v3/school/${school.id}/${this.data.class_id}/lessons/?subject_id=${this.$route.params.subject}&page_size=12&order=dsc&page=${page}`
        )
        this.busy = false
        this.perPage = 12
        this.pages = data.total_pages

        this.items = data.results.map((each) => ({
          id: each.id,
          available_date: each.date_created,
          week: each.school_week.name,
          myProgress: each.student_progress,
          name: each.name,
          contents: each.content.length,
          availableOffline: this.searchRecord(each.id),
          liveClass: this.checkLiveLesson(each),
        }))
      } catch (error) {
        console.error(error)
      }
    },

    checkLiveLesson(e) {
      if (Object.keys(this.liveClass).length > 0) {
        if (this.liveClass.lesson_id === e.id) {
          return this.liveClass
        }
        return {}
      }
      return {}
    },

    goToLiveSession(data){
      console.log(data)
      this.$router.push({
       name: 'student-lms-schoolId-lessons-live-lesson-live',
        params: {
          schoolId: this.$route.params.schoolId,
          lesson: data.lesson_id,
          live: data.live_class_id,
        },
      })
    },
    //  bvModalEvent.preventDefault()
  },
}
</script>

<style scoped>
.moveDown {
  position: relative;
  top: 3.2rem;
  z-index: 100;
}
.active {
  /*color: black; */
  /* border-bottom: 1.5px solid #1170b7; */
  background: #d8dff9;
}
.badge {
  cursor: pointer;
}
/*
@media screen and (max-width: 1212px) {
  .sort-by {
    display: none;
  }
}
*/
</style>
