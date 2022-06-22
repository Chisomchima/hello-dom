<template>
  <div class="">
    <div class="">
      <div class="d-flex justify-content-between">
        <div class="mb-3">
          <p class="titletext mb-0">Classes</p>
        </div>
        <div>
          <b-btn class="bg-primary" @click="addClass"> Add Class</b-btn>
          <b-modal id="modal-2" title="Add Class">
            <div class="modal-body">
              <div class="form-group">
                <label>Class Name </label>
                <input
                  v-model="className"
                  type="text"
                  placeholder="Class Name"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
              <div class="form-group">
                <label>Class Code </label>
                <input
                  v-model="classCode"
                  type="text"
                  placeholder="Class code"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Class Location </label>
                    <input
                      v-model="classLocation"
                      type="text"
                      placeholder="Class location"
                      class="form-control ng-untouched ng-pristine ng-valid"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>Theme </label>

                    <div>
                      <VSwatches
                        v-model="classTheme"
                        show-fallback
                        fallback-input-type="color"
                        popover-x="left"
                      >
                      </VSwatches>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Academic Year </label>
                    <v-select
                      v-model="academicYear"
                      class="style-chooser"
                      placeholder="Academic Year"
                      :options="allYears"
                      label="name"
                    ></v-select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>Grade Level </label>

                    <v-select
                      v-model="gradeLevel"
                      class="style-chooser"
                      placeholder="Grade Level"
                      label="grade_name"
                      :options="allGrades"
                    ></v-select>
                  </div>
                </div>
              </div>
            </div>
            <template #modal-footer="{ cancel }">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button
                size="sm"
                variant="light"
                class="px-3 text-secondary mr-2"
                @click="cancel()"
              >
                Cancel
              </b-button>
              <b-button
                size="sm"
                variant="primary"
                class="px-4"
                @click="postClass"
              >
                Save
              </b-button>
              <!-- Button with custom close trigger value -->
            </template>
          </b-modal>
        </div>
      </div>
      <div>
        <div
          class="
            p-4
            mb-0
            bg-white
            d-flex
            justify-content-between
            align-items-center
            rounded-top
          "
        >
          <div class="mt-1">
            <!-- <span class="border p-1 my-auto" @click="grid">
              <span class="iconify" data-icon="akar-icons:grid"></span>
            </span> -->
            <span class="border p-1" @click="table">
              <span
                class="iconify"
                data-icon="ant-design:unordered-list-outlined"
              ></span>
            </span>
          </div>

          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center mr-5">
              <label class="fs-14 mr-3 mb-0">Filter by Academic Year</label>
              <v-select
                v-model="selectedYear"
                class="style-chooser"
                placeholder="Filter"
                label="name"
                :options="academicYearList"
                :reduce="(option) => option.name"
                @input="filteryear"
              >
              </v-select>
            </div>
            <div
              class="
                d-flex
                flex-wrap
                align-items-center
                justify-content-between
              "
            >
              <div>
                <div class="search-flex">
                  <div class="search mr-2 mb-2">
                    <span class="input-icon mx-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        focusable="false"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                        data-icon="bx:bx-search"
                        data-inline="false"
                        class="iconify"
                        style="transform: rotate(360deg)"
                      >
                        <path
                          d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396l1.414-1.414l-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8s3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6s-6-2.691-6-6s2.691-6 6-6z"
                          fill="currentColor"
                        ></path></svg
                    ></span>

                    <input
                      v-model="filterApi"
                      type="text"
                      placeholder="Search"
                      class="ng-valid ng-dirty ng-touched"
                      @input="debounceData()"
                    />
                  </div>

                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <b-form-checkbox-group v-model="filterOn" class="mx-3">
                      <b-form-checkbox class="dropdown-item droop" value="email"
                        >Email</b-form-checkbox
                      >
                      <b-form-checkbox value="house">House</b-form-checkbox>
                      <b-form-checkbox value="gender">Gender</b-form-checkbox>
                      <b-form-checkbox value="first_name"
                        >First Name</b-form-checkbox
                      >
                      <b-form-checkbox value="last_name"
                        >Last Name</b-form-checkbox
                      >
                    </b-form-checkbox-group>
                  </div>
                </div>
                <div
                  id="closeModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="closeModalLabel"
                  class="modal fade"
                  aria-hidden="true"
                  style="display: none"
                >
                  <div role="document" class="modal-dialog">
                    <div class="modal-content">
                      <div
                        class="
                          m-4
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                      >
                        <h5 id="closeModalLabel" class="modal-title">
                          Clear Filters
                        </h5>
                        <button
                          type="button"
                          data-dismiss="modal"
                          aria-label="Close"
                          class="close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div class="modal-body text-center">
                        This action will clear all previously selected filters
                        Do you want to proceed?
                      </div>
                      <div
                        class="m-4 text-center d-flex justify-content-around"
                      >
                        <button
                          type="button"
                          data-dismiss="modal"
                          class="btn btn-outline-blue"
                        >
                          No</button
                        ><button
                          type="button"
                          data-dismiss="modal"
                          class="btn btn-blue"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex flex-wrap">
                <div class="my-1 view-records-nav">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- table -->
      <div v-if="view" class="table_coin">
        <Table
          :items="classList"
          :fields="fields"
          :allow-redirect="false"
          :filter="filter"
          :is-busy="isBusy"
          :filter-on="filterOn"
          :pages="pages"
          @row-clicked="onRowClicked"
          @page-changed="changePage"
        />
        <!-- pagination -->
        <div class="d-flex justify-content-end my-3">
          <!-- <div _ngcontent-bjf-c284="" class="my-1 showing-nav mr-3 paginate">
            <span _ngcontent-bjf-c284="" class="mr-4">
              Page {{ page }} of {{ totalPages }}</span
            >
            <span @click="previousPage">
              <span class="iconify" data-icon="akar-icons:chevron-left"></span>
            </span>
            <span @click="nextPage">
              <span class="iconify" data-icon="akar-icons:chevron-right">
                </span
              >
            </span>
          </div> -->
        </div>
      </div>

      <div v-else class="row">
        <div
          v-for="(student, index) in students"
          :key="index"
          _ngcontent-ept-c294=""
          class="col-lg-3 col-md-4 col-sm-6 my-3 ng-star-inserted"
        >
          <div _ngcontent-ept-c294="" class="student-profile">
            <div
              _ngcontent-ept-c294=""
              class="d-flex align-items-center justify-content-between mb-4"
            >
              <div _ngcontent-ept-c294="" class="color"></div>
              <div _ngcontent-ept-c294="" class="profile-picture">
                <img
                  _ngcontent-ept-c294=""
                  alt=""
                  src="~/assets/img/male-young.jpeg"
                  class="ng-star-inserted img-fluid"
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
                      class="dropdown-item"
                      tabindex="0"
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
              :style="{ wordWrap: 'break-word' }"
            >
              <p _ngcontent-ept-c294="" class="name mb-1">
                {{ student.first_name }} {{ student.last_name }}
              </p>
              <p _ngcontent-ept-c294="" class="tex-secondary mb-1">SS 1</p>
              <button
                _ngcontent-ept-c294=""
                class="btn btn-darkblue"
                tabindex="0"
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
      </div>
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

  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'My custom description',
    },
  ],

  data() {
    return {
      academicYearList: [],
      selectedYear: '',
      view: true,
      classList: [],
      className: '',
      classCode: '',
      classTheme: '#A463BF',
      pages: 1,
      classLocation: '',
      classTheme: '',
      academicYear: '',
      gradeLevel: '',
      allGrades: [],
      allYears: [],
      isBusy: false,
      filter: '',
      filterApi: '',
      filterOn: [],
      showAll: false,
      page: 1,
      totalPages: null,
      showFilters: false,
      fields: [
        { key: 'name', sortable: true },
        { key: 'grade', sortable: true },
        { key: 'academic_year', sortable: true },
        { key: 'location', sortable: true },
        { key: 'student', sortable: true },
        { key: 'subjects', sortable: true },
        { key: 'form_teacher', sortable: true },

        { key: 'theme', sortable: false },
        // { key: 'three_dots', sortable: false },
      ],
    }
  },
  async fetch() {
    const schoolId = await this.$store.state.administration.school.id

    const classes = await this.$axios.get(
      `slate-admin/school/${schoolId}/class/?page=${this.page}&search=${this.filterApi}&academic_year_name=${this.selectedYear}`
    )

    const academicyeardata = await this.$axios.get(
      `slate-admin/school/${schoolId}/year`
    )

    this.academicYearList = academicyeardata.data.data

    console.log(classes.data)
    this.pages = classes.data.pages
    this.classList = classes.data.data.map((Aclass) => ({
      name: Aclass.name,
      grade: Aclass.level,
      academic_year: Aclass.academic_year,
      location: Aclass.hall,
      student: Aclass.students,
      subjects: Aclass.subjects,
      form_teacher: Aclass.form_teacher
        ? Aclass.form_teacher.teacher_name
        : null,
      theme: Aclass.color,
      id: Aclass.id,
    }))
    this.isBusy = false
  },

  watch: {
    page: {
      handler() {
        this.$nuxt.refresh()
      },
    },
  },

  methods: {
    filteryear() {
      this.$fetch()
    },
    async get_add_class_requirements() {
      const schoolId = await this.$store.state.administration.school.id

      const grades = await this.$axios.get(
        `/slate-admin/school/${schoolId}/grades/?paginate=false`
      )
      this.allGrades = grades.data.data
      console.log('grades', this.allGrades)

      const years = await this.$axios.get(
        `/slate-admin/school/${schoolId}/year/?paginate=false`
      )
      this.allYears = years.data.data
      console.log('years', this.allYears)
    },
    async addClass() {
      this.$bvModal.show('modal-2')
      await this.get_add_class_requirements()
    },
    async postClass() {
      try {
        const schoolId = await this.$store.state.administration.school.id

        const response = await this.$axios.post(
          `/slate-admin/school/${schoolId}/class/`,
          {
            code: this.classCode,
            color: this.classTheme,
            hall: this.classLocation,
            level: this.gradeLevel.id,
            name: this.className,
            year: this.academicYear.id,
          }
        )
        // console.log(response.data.data.id)
        this.$bvModal.hide('modal-2')
        const newClassId = response.data.data.id
        const schoolCode = this.$store.state.administration.school.code

        this.$router.push(
          `/sms/${schoolCode}/administration/classes/${newClassId}`
        )
      } catch (error) {
        console.log(error)
      }
    },
    onRowClicked(e) {
      console.log(e)
      const schoolCode = this.$store.state.administration.school.code
      this.$router.push({
        path: `/sms/${schoolCode}/administration/classes/${e.id}`,
        query: { _name: e.name },
      })
    },

    debounceData: debounce(async function () {
      await this.$nuxt.refresh()
    }, 1000),

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
      this.isBusy = true
      this.page = e
      console.log('rom parent', e)
    },
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    grid() {
      this.view = false
    },
    table() {
      this.view = true
    },
  },
}
</script>

<style scoped>
.search-flex[_ngcontent-ptc-c281] {
  display: flex;
}

.titletext {
  font-size: 30px;
}

@media screen and (max-width: 800px) {
  .titletext {
    font-size: 16px !important;
  }
}
.search-flex .search {
  position: relative;
  display: flex;
  align-items: center;
  /* min-width: 322px; */
  max-width: 100%;
  min-height: 36px;
  background: white;
  box-shadow: 0px 2px 10px rgba(169, 181, 192, 0.2);
  border-radius: 6px;
}

.search-flex .dropdown {
  color: #b4bec6;
  font-size: 14px;
  background: white;
  box-shadow: 0px 2px 10px rgba(169, 181, 192, 0.2);
  border-radius: 6px;
}

.search-flex .search[_ngcontent-ptc-c281] .input-icon[_ngcontent-ptc-c281] {
  color: #b4bec6;
}

.search-flex[_ngcontent-ptc-c281]
  .search[_ngcontent-ptc-c281]
  .filter-holder[_ngcontent-ptc-c281] {
  background: #e0e0e0;
  border-radius: 3px;
  color: #828282;
  font-size: 12px;
  min-width: 79px;
  height: 21px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.search-flex[_ngcontent-ptc-c281]
  .search[_ngcontent-ptc-c281]
  input[_ngcontent-ptc-c281] {
  background: white;
  border: none;
}

.search-flex[_ngcontent-ptc-c281] .dropdown[_ngcontent-ptc-c281] {
  color: #b4bec6;
  font-size: 14px;
  background: white;
  box-shadow: 0px 2px 10px rgba(169, 181, 192, 0.2);
  border-radius: 6px;
}
</style>
