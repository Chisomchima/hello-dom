<template>
  <div class="">
    <div class="">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="">
          <p class="titletext mb-0">Students</p>
        </div>

        <div>
          <b-btn
            class="text-purple"
            @click="$router.push({ path: 'student/bulk-upload' })"
            >Bulk Upload</b-btn
          >
          <b-btn class="bg-primary" @click="addStudent"> Add Student</b-btn>
        </div>
      </div>
      <div v-show="showAll" class="btn_contain my-4">
        <div>
          <b-btn class="bg-dark text-white mr-3" @click="exportAll">
            Export
          </b-btn>
          <b-btn class="bg-primary text-white" @click="emailAll">
            Email Student Code</b-btn
          >
        </div>
      </div>
      <UtilsFilterComponent @search-input="slowStudent">
        <template #default="{ visualization }">
          <Table
            v-if="visualization === 'list'"
            :items="students"
            :fields="fields"
            :is-busy="isBusy"
            :filter="filter"
            :filter-on="filterOn"
            :pages="pages"
            :sort-direction="sortDirection"
            @single-row="showButton"
            @page-changed="getStudents"
            @edit="editStudent"
            @remove="removeStudent"
            @row-clicked="gotoStudent"
          >
            <template #three_dots_student="{ data }">
              <div @click="editStudent(data)" class="text-center">
                <VTooltip
                  placement="left"
                  :data-popper-shown="true"
                  :triggers="['hover']"
                  :skidding="0"
                  :arrow-padding="8"
                >
                  <div class="text-center">
                    <span class="iconify" data-icon="bi:pencil-square"></span>
                  </div>

                  <template #popper>
                    <div>Edit</div>
                  </template>
                </VTooltip>
              </div>
            </template>
          </Table>

          <div v-else class="row">
            <div
              v-for="(student, index) in students"
              :key="index"
              _ngcontent-ept-c294=""
              class="col-lg-3 col-md-4 col-sm-6 my-3 ng-star-inserted"
            >
              <div
                _ngcontent-ept-c294=""
                class="student-profile"
                style="height: 13rem"
              >
                <div
                  _ngcontent-ept-c294=""
                  class="d-flex align-items-center justify-content-between mb-1"
                >
                  <div _ngcontent-ept-c294="" class="color"></div>
                  <div _ngcontent-ept-c294="" class="profile-picture">
                    <img
                      _ngcontent-ept-c294=""
                      alt=""
                      :src="
                        student.avatar
                          ? student.avatar
                          : require(`~/assets/img/${
                              student.gender === 'male' ? 'male' : 'female'
                            }-young.jpeg`)
                      "
                      style="
                        width: 48px;
                        height: 48px;
                        min-width: 48px;
                        min-height: 48px;

                        object-fit: cover;
                        border-radius: 1000px;
                      "
                      class="avatar-img img-fluid"
                    />
                    <!---->
                  </div>
                  <div _ngcontent-ept-c294="" class="options">
                    <div _ngcontent-ept-c294="" class="dropdown hide-toggle">
                      <span
                        id="studentDropdown"
                        _ngcontent-ept-c294=""
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        class="dropdown-toggle"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          focusable="false"
                          width="0.27em"
                          height="1em"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 272 1024"
                          _ngcontent-ept-c294=""
                          data-icon="simple-line-icons:options-vertical"
                          data-inline="false"
                          class="iconify"
                          style="transform: rotate(360deg)"
                        >
                          <path
                            d="M5 896v-27q0-1 1-2l1-4q6-43 38-73.5t74-32.5q47-4 83 20.5t49 68.5q1 1 1.5 3t1 3.5t.5 3t.5 3.5t1 3.5t1 3.5t.5 3v27l-.5 2.5l-1.5 3.5q-6 39-32.5 67.5T157 1006q-3 1-8 2q-3 1-4 1h-29q-3-1-4-2q-39-6-66.5-32T9 911q-1-3-2.5-8T5 896zm252-768v27l-.5 2.5l-1.5 3.5q-6 43-38.5 73.5T142 267q-31 2-58-8.5T38 227t-28-50q0-3-5-22v-27q0-1 1-3l1-3Q21 45 97 20q4-1 11.5-3t8.5-2h28l1 1q3 1 4 1q39 6 67 32t37 65q1 4 3 13v1zm0 370v28l-1 2.5l-1 3.5q-7 43-39.5 73.5T141 638q-48 2-84.5-24T9 544q-1-6-4-18v-28l1-2.5l1-3.5q6-43 39-73.5t75-32.5q48-2 84.5 24t47.5 70q1 6 4 18z"
                            fill="currentColor"
                          ></path></svg
                      ></span>
                      <div
                        _ngcontent-ept-c294=""
                        aria-labelledby="studentDropdown"
                        class="dropdown-menu"
                      >
                        <div
                          _ngcontent-ept-c294=""
                          class="dropdown-item text-center"
                          tabindex="0"
                          @click="handleViewProfile(student)"
                        >
                          View Profile
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  _ngcontent-ept-c294=""
                  class="text-center"
                  :style="{ wordWrap: 'break-word', position: 'relative' }"
                >
                  <p _ngcontent-ept-c294="" class="text-truncater name mb-1">
                    {{ student.first_name }} {{ student.last_name }}
                  </p>
                  <p _ngcontent-ept-c294="" class="tex-secondary mb-1">
                    {{ student.school_class }}
                  </p>
                  <button
                    _ngcontent-ept-c294=""
                    class="btn btn-darkblue"
                    tabindex="0"
                    style="
                      position: absolute;
                      top: 4rem;
                      width: 80%;
                      margin: 0 auto;
                      left: 1rem;
                    "
                    @click="handleMessage(student)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      focusable="false"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                      _ngcontent-ept-c294=""
                      data-icon="bx:bx-envelope"
                      data-inline="false"
                      class="iconify mr-2"
                      style="transform: rotate(360deg)"
                    >
                      <path
                        d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223l-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044L20.002 18H4z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Message
                  </button>
                </div>
              </div>
            </div>
            <div class="w-100 pr-3 d-flex justify-content-end">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="right"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
        </template>
      </UtilsFilterComponent>
      <ModalWrapper
        id="delete-student"
        title="Delete Student"
        submitTitle="Delete"
        variant="danger"
        @ok="handleDeleteStudent"
      >
        Are you sure you want to delete this Student? this action is permanent.
        click 'cancel' to stop this action
      </ModalWrapper>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import Table from '~/components/table.vue'
import School from '~/mixins/school'

export default {
  components: { Table },
  mixins: [School],
  data() {
    return {
      currentPage: 1,
      pages: 1,
      view: true,
      filter: '',
      filterApi: '',
      filterOn: [],
      showAll: false,
      page: 1,
      allStudents: [],
      totalPages: null,
      pageFetch: [],
      isBusy: false,
      sortDirection: 'asc',
      students: [],
      showFilters: false,
      perPage: 8,
      yellow: { color: { let: 'dd' } },
      pageOptions: [10, 20, 25, 100],
      fields: [
        { key: 'check', sortable: false },
        { key: 'last_name', label: 'Surname', sortable: true },

        { key: 'first_name', sortable: true },
        { key: 'gender', sortable: true },
        { key: 'DOB', sortable: true },
        { key: 'email', sortable: true },
        { key: 'admission_number', sortable: true },

        { key: 'house_color', label: 'House', sortable: true },
        // { key: 'house_color', sortable: true },
        // { key: 'three_dots_student', label: '', sortable: false },
      ],

      items: [
        { check: '', age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { check: '', age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { check: '', age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { check: '', age: 38, first_name: 'Jami', last_name: 'Carney' },
        { check: '', age: 38, first_name: 'Jami', last_name: 'Carney' },
        { check: '', age: 38, first_name: 'Jami', last_name: 'Carney' },
        { check: '', age: 38, first_name: 'Jami', last_name: 'Carney' },
      ],
    }
  },
  computed: {
    totalRows() {
      return this.pages * this.perPage
    },
  },
  watch: {
    async currentPage() {
      await this.getStudents(this.currentPage)
    },
  },
  mounted() {
    this.getStudents(1)
  },
  methods: {
    handleViewProfile(e) {
      console.log('profile', e)
      const schoolCode = this.$store.state.administration.school.code

      this.$router.push(`/sms/${schoolCode}/administration/student/${e.id}`)
    },
    handleMessage(e) {
      this.$router.push({
        path: `/sms/${this.$route.params.id}/inbox`,
        query: { entity: e.id },
      })
    },
    gotoStudent(e) {
      const schoolCode = this.$store.state.administration.school.code

      console.log(e)
      this.$router.push({
        path: `/sms/${schoolCode}/administration/student/${e.id}`,
        query: { _name: `${e.first_name} ${e.last_name}` },
      })
    },
    exportAll() {
      const itemsFormatted = []
      this.allStudents.forEach((item) => {
        itemsFormatted.push({
          first_name: item.first_name.replace(/,/g, ''), // remove commas to avoid errors,
          last_name: item.last_name,
          email: item.email,
          gender: item.gender,
          house: item.house,
        })
      })

      // const csv = this.convertToCSV(newStudents)
      this.exportCSVFile(
        {
          first_name: 'First Name'.replace(/,/g, ''), // remove commas to avoid errors
          last_name: 'Last Name',
          email: 'Email',
          gender: 'Gender',
          house: 'House',
        },
        itemsFormatted,
        'All Students'
      )
    },
    convertToCSV(objArray) {
      const array =
        typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
      let str = ''

      for (let i = 0; i < array.length; i++) {
        let line = ''
        for (const index in array[i]) {
          if (line !== '') line += ','

          line += array[i][index]
        }

        str += line + '\r\n'
      }

      return str
    },
    exportCSVFile(headers, items, fileTitle) {
      if (headers) {
        items.unshift(headers)
      }

      // Convert Object to JSON
      const jsonObject = JSON.stringify(items)

      const csv = this.convertToCSV(jsonObject)

      const exportedFilenmae = fileTitle + '.csv' || 'export.csv'

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae)
      } else {
        const link = document.createElement('a')
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          const url = URL.createObjectURL(blob)
          link.setAttribute('href', url)
          link.setAttribute('download', exportedFilenmae)
          link.style.visibility = 'hidden'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }
    },

    async emailAll() {
      const slate_school_id = await this.$store.state.administration.school.id

      const entity_ids = []
      this.allStudents.forEach((student) => {
        entity_ids.push(student.id)
      })
      try {
        this.$axios.post(
          `/slate-admin/school/${slate_school_id}/send/activation_code/sms/bulk/?entity=student`,
          {
            entity: 'student',
            entity_ids,
          }
        )
      } catch (error) {}
      console.log('entity', entity_ids)
      console.log(this.allStudents)
    },
    editStudent(e) {
      console.log(e)
      this.$router.push(
        `/sms/${this.$route.params.id}/administration/student/${e.item.id}/edit`
      )
    },
    slowStudent: debounce(function (e) {
      this.filterApi = e

      this.getStudents()
    }, 100),

    previousPage() {
      if (this.page > 1) {
        this.page -= 1
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page += 1
      }
    },
    changePage(e) {
      this.page = e
      console.log('rom parent', e)
    },
    removeStudent(e) {
      this.$bvModal.show('delete-student')
      this.studentDelete = e.id
      console.log('remove', e)
    },
    async handleDeleteStudent() {
      console.log(this.studentDelete)
    },
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    async getStudents(page = 1) {
      this.isBusy = true
      const slate_school_id = this.$store.state.administration.school.id
      try {
        const { data, status } = await this.$axios.get(
          `/slate-admin/school/${slate_school_id}/student/?page=${page}&name=${this.filterApi}`
        )
        if (status === 200) {
          console.log('stuts', data)
          for (let input = 1; input <= data.pages; input++) {
            this.pageFetch.push(input)
          }
          this.pages = data.pages
          this.currentPage = data.page
          this.students = data.data.map((student) => {
            return {
              check: '',

              first_name: student.first_name,
              last_name: student.last_name,
              gender: student.gender,
              DOB: student['d.o.b'],
              email: student.email,
              admission_number: student.admission_number,

              house: student.house,
              house_color: student.house_color,
              id: student.id,
              threoo_dots: '',
              route: 'student',
              ...student,
            }
          })
          console.log('students', this.students)
          this.pages = data.pages
          this.isbusy = false
        }
      } catch (error) {
      } finally {
        this.isBusy = false
      }
    },
    grid() {
      this.view = false
    },
    table() {
      this.view = true
    },
    addStudent() {
      this.$router.push('student/add')
    },
    showButton(e) {
      this.allStudents = e
      if (this.allStudents.length) {
        this.showAll = true
      } else {
        this.showAll = false
      }
      console.log('payloade', e)
    },
  },
}
</script>

<style scoped>
.student-profile {
  background: #f5f6f7;
  border-radius: 10px;
  padding: 17px 24px;
}

.btn-darkblue {
  background: #171e40;
  color: #fff;
}

.dropdown-toggle::after {
  display: none !important;
}

.student-profile .profile-picture {
  width: 58px;
  height: 58px;
  border-radius: 20px !important;
}

.text-purple {
  background-color: #171e40;
}

.dropdown-menu {
  width: 50%;
}

.select- {
  width: 20%;
}

.droop {
  margin-left: 12px;
}

.search-flex[_ngcontent-ptc-c281] {
  display: flex;
}

.modal-dialog {
  z-index: 1050 !important;
}

.table_coin {
  /* padding: 0px 0px 0px 0px; */
  /* min-width: 900px; */
}

.btn_contain {
  min-height: 2.2rem;
}

.showing-nav.paginate {
  color: #b9b9b9;
  font-size: 14px;
}

/* .student-profile .color {
    width: 23px;
    height: 23px;
    border-radius: 50%;
} */
</style>
