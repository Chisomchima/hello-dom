<template>
  <div>
    <div class="mb-0 row mx-3 border-bottom pb-3 rounded-top">
      <div
        class="
          col-lg-4 col-md-3
          my-2 my-md-0
          d-flex
          align-items-center
          justify-content-end justify-content-md-start
          p-0
          align-content-center
        "
      >
        <span class="border p-1 my-auto" @click="grid">
          <span class="iconify" data-icon="akar-icons:grid"></span>
        </span>
        <span class="border p-1" @click="table">
          <span
            class="iconify"
            data-icon="ant-design:unordered-list-outlined"
          ></span>
        </span>
      </div>
      <div class="col-lg-8 col-md-9 my-2 my-md-0 p-0">
        <span class="search-flex">
          <span class="search justify-content-end mr-2 mb-2">
            <div class="d-flex">
              <div>
                <span _ngcontent-ptc-c281="" class="input-icon mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                    _ngcontent-ptc-c281=""
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
                  v-model="filter"
                  type="text"
                  placeholder="Search"
                  class="ng-valid ng-dirty ng-touched"
                  @input="slowStudent()"
                  @keyup.enter="getClassTeacher()"
                />
                <b-btn
                  class="ml-3 btn-primary btnfont"
                  @click="show_add_teacher"
                >
                  Add Teacher
                </b-btn>
              </div>
            </div>
          </span>
        </span>
      </div>
      <div v-if="showCropper">
        <image-cropper @saved="savedImage" @cancelled="cancelImage" />
      </div>
    </div>
    <ModalWrapper
      id="class-add-teacher"
      title="Add Teacher"
      @ok="handleAddSubmit"
    >
      <div v-for="(substitute, index) in substitueTeachers" :key="index">
        <div class="mb-3">
          <label class="text-grey font12 mb-0">Add Teacher </label>
          <div class="maxi">
            <v-select
              v-model="substitute.id"
              :reduce="(option) => option.id"
              class="style-chooser"
              :placeholder="
                allTeachers.length
                  ? 'Select a Teacher'
                  : 'No Teachers in this class'
              "
              label="name"
              :options="allTeachers"
            ></v-select>
          </div>
        </div>
        <div class="mb-3">
          <label class="text-grey font12 mb-0">Designation </label>

          <div class="maxi">
            {{ substitute.designation }}
            <v-select
              v-model="substitute.designation"
              class="style-chooser"
              placeholder="Select Designation"
              label="grade_name"
              :options="designation"
            ></v-select>
          </div>
        </div>
        <div
          v-if="index > 0"
          class="d-flex justify-content-start border-bottom pb-3"
        >
          <small
            class="text-danger"
            :style="{ cursor: 'pointer' }"
            @click="removeSubstitute(index)"
          >
            <span class="iconify" data-icon="bi:trash"></span>
            Remove Teacher
          </small>
        </div>
      </div>

      <div class="d-flex justify-content-start mt-3">
        <small
          class="text-primary"
          :style="{ cursor: 'pointer' }"
          @click="addTeacher"
        >
          <span class="iconify" data-icon="akar-icons:circle-plus"></span> Add
          Teacher
        </small>
      </div>
    </ModalWrapper>
    <div class="mt-3">
      <div v-if="view" class="bg-white">
        <Table
          :items="teachers"
          :fields="fields"
          :filter="filter"
          :allow-redirect="false"
          :show-pagination="false"
          @profile="showProfile"
          @push_communication="handleComminucation"
          @capture="handleCapture"
          @upload="handleUpload"
          @delete="showDeleteModal"
        >
          <template #triple_dots="{ data: { item } }">
            <div @click="showDeleteModal(item)">
              <span
                class="iconify text-danger"
                data-icon="fluent:delete-24-filled"
                data-width="20"
              ></span>
            </div>
          </template>
        </Table>
      </div>
      <div v-else>
        <div class="row">
          <template v-for="(teacher, index) in teachers">
            <div :key="index" class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4">
              <div class="classes-list-card px-4">
                <div class="dropdown">
                  <button
                    id="dropdownMenuButton"
                    class="btn btn-sm"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      focusable="false"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 16 16"
                      class="iconify"
                      data-inline="false"
                      data-icon="bi:three-dots-vertical"
                      style="transform: rotate(360deg)"
                    >
                      <g fill="currentColor">
                        <path
                          d="M9.5 13a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0z"
                        ></path>
                      </g>
                    </svg>
                  </button>
                  <div
                    class="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="#">View Profile</a>
                    <a class="dropdown-item" href="#">Push Communication</a>
                  </div>
                </div>

                <div class="user-image text-center mb-3">
                  <img
                    class="mx-auto"
                    :src="
                      teacher.avatar
                        ? teacher.avatar
                        : 'https://546458-1766807-raikfcquaxqncofqfm.stackpathdns.com/pub/media/wordpress/d5f1425700d7460bb2aa1e1e8e1b7e49.jpg'
                    "
                  />
                </div>
                <div class="subtitle-text mb-2">
                  {{ teacher.first_name ? teacher.first_name : '--' }}
                  {{ teacher.last_name ? teacher.last_name : '--' }}
                </div>

                <div v-show="teacher.designation" class="text-center mb-3">
                  <small class=""
                    >{{ teacher.designation ? teacher.designation : '--' }}
                  </small>
                </div>

                <div class="text-center mt-3">
                  <button class="btn btn-light">
                    <div class="d-flex align-items-center">
                      <div class="mr-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          focusable="false"
                          width="1em"
                          height="1em"
                          style="font-size: 20px; transform: rotate(360deg)"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 16 16"
                          class="iconify"
                          data-inline="false"
                          data-icon="fluent:mail-16-regular"
                        >
                          <g fill="none">
                            <path
                              d="M2 6.038V11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v1.038zM4 4h8a1 1 0 0 1 1 1v.74L8 8.432L3 5.74V5a1 1 0 0 1 1-1zM3 6.876L7.763 9.44a.5.5 0 0 0 .474 0L13 6.876V11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6.876z"
                              fill="currentColor"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <div @click="handleMessage(teacher)">Message</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <ModalWrapper
        title="Delete Teacher"
        variant="danger"
        submitTitle="Delete"
        @ok="handleDelete"
        id="delete-teacher"
      >
        Are you sure you want to delete this teacher from this class?
      </ModalWrapper>
    </div>
  </div>
</template>

<script>
import MultiSelect from 'primevue/multiselect'
import Dropdown from 'primevue/dropdown'
import { debounce } from 'lodash'

import Table from '~/components/table.vue'
import tableMixin from '~/mixins/tableMixin'
import ImageCropper from '~/components/Utils/ImageCropper.vue'

export default {
  components: { Table, ImageCropper, MultiSelect, Dropdown },
  mixins: [tableMixin],
  data() {
    return {
      teachers: ['ddd'],
      allTeachers: [],
      teacher_list: [],
      filter: '',
      deleteTeacher: {},
      designation: ['Form Teacher', 'Assistant'],
      designation_list: [],
      view: true,
      substitueTeachers: [
        {
          designation: '',
          id: '',
        },
      ],
      fields: [
        { key: 'first_name', sortable: true },
        { key: 'last_name', label: 'Surname', sortable: true },
        { key: 'designation', sortable: true },

        { key: 'triple_dots', sortable: false },
      ],
    }
  },
  activated() {
    this.getClassTeacher()
  },
  methods: {
    handleMessage(e) {
      this.$router.push({
        path: `/sms/${this.$route.params.id}/inbox`,
        query: { entity: e.id },
      })
      console.log(e)
    },
    savedImage(e = 2) {
      console.log(e)
    },
    cancelImage() {},
    showDeleteModal(e) {
      this.deleteTeacher = e
      this.$bvModal.show('delete-teacher')
    },
    async handleDelete() {
      const e = this.deleteTeacher
      console.log(e)

      try {
        await this.$axios.post(
          `slate-admin/class/${this.$route.params.class}/remove/teacher/`,
          {
            teachers: [
              {
                teachers: e.id,

                id: e.id,
                designation: e.designation,
              },
            ],
          }
        )
        this.getClassTeacher()
        this.$bvModal.hide('delete-teacher')
      } catch (error) {
        console.log(error)
      }
    },
    slowStudent: debounce(function () {
      this.getClassTeacher()
    }, 500),

    removeSubstitute(index) {
      this.substitueTeachers.splice(index, 1)
    },
    addTeacher() {
      this.substitueTeachers.push({
        designation: '',
        id: '',
      })
    },
    async show_add_teacher() {
      const schoolId = await this.$store.state.administration.school.id

      this.$bvModal.show('class-add-teacher')
      try {
        const { data } = await this.$axios.get(
          `/quiz/v2/school/${schoolId}/markers/`
        )
        this.allTeachers = data.staffs
        console.log('all teachers', this.allTeachers)
      } catch (error) {
        console.log(error)
      }
    },
    async getClassTeacher() {
      try {
        const classId = this.$route.params.class
        const { data } = await this.$axios.get(
          `/slate-admin/class/${classId}/?search=${this.filter}`
        )
        this.teachers = data.data.teachers.map((teacher) => ({
          ...teacher,
          triple_dots: [{ name: 'Delete', event: 'delete' }],
        }))
        console.log(data.data.teachers)
      } catch (error) {}
    },
    grid() {
      this.view = false
    },
    table() {
      this.view = true
    },
    async handleAddSubmit() {
      const classId = this.$route.params.class

      try {
        await this.$axios.post(`/slate-admin/class/${classId}/add/teacher/`, {
          class_id: classId,
          teachers: this.substitueTeachers,
        })
        this.substitueTeachers = [
          {
            designation: '',
            id: '',
          },
        ]
        this.$bvModal.hide('class-add-teacher')
        this.getClassTeacher()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.p-multiselect >>> .p-multiselect-label {
  min-width: 20rem;
  max-width: 20rem;
}
.p-dropdown >>> .p-dropdown-label {
  min-width: 20rem;
  max-width: 20rem;
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

.search-flex .search[_ngcontent-ptc-c281] .input-icon[_ngcontent-ptc-c281] {
  color: #b4bec6;
}

.search-flex[_ngcontent-ptc-c281]
  .search[_ngcontent-ptc-c281]
  input[_ngcontent-ptc-c281] {
  background: white;
  border: none;
}
</style>
