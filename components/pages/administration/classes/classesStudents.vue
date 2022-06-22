<template>
  <div>
    <div
      class="
        mb-0
        d-flex
        align-items-center
        justify-content-between
        mx-3
        border-bottom
        pb-3
        rounded-top
      "
    >
      <div>
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
      <div class="my-2 my-md-0 p-0">
        <span class="search-flex">
          <span class="search mr-2 mb-2">
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
              @keyup.enter="getClassStudent()"
            />

            <b-btn class="ml-3 btn-primary" @click="show_add_modal">
              Add Student
            </b-btn>
          </span>
        </span>
      </div>
    </div>
    <CameraComponent :demo="demo" @myevent="somefunction" />

    <div v-if="showCropper">
      <image-cropper @saved="savedImage" @cancelled="cancelImage" />
    </div>
    <ModalWrapper
      id="classes-add-student"
      title="Add Student"
      @ok="handleAddStudent"
    >
      <div class="mb-3">
        <label class="text-grey font12 mb-0">Add Student </label>
        <div class="maxi">
          <MultiSelect
            v-model="student_list"
            :options="students"
            option-value="id"
            option-label="name"
            :placeholder="
              students.length
                ? 'Select a student'
                : 'No student in this grade level'
            "
          />
        </div>
      </div>
    </ModalWrapper>

    <div class="mt-3">
      <div v-if="view" class="bg-white">
        <Table
          :items="allStudents"
          :fields="fields"
          :filter="filter"
          :show-pagination="false"
          @row-clicked="showProfile"
          @profile="showProfile"
          @push_communication="handleComminucation"
          @capture="handleCapture"
          @upload="handleUpload"
          @message="handleMessage"
        >
        </Table>
      </div>
      <div v-else>
        <div class="row">
          <template v-for="(student, index) in allStudents">
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
                    <div class="mx-3">View Profile</div>
                  </div>
                </div>

                <div class="user-image text-center mb-3">
                  <img
                    class="mx-auto"
                    :src="
                      student.avatar
                        ? student.avatar
                        : 'https://546458-1766807-raikfcquaxqncofqfm.stackpathdns.com/pub/media/wordpress/d5f1425700d7460bb2aa1e1e8e1b7e49.jpg'
                    "
                  />
                </div>
                <div class="subtitle-text mb-2">
                  {{ student.first_name ? student.first_name : '--' }}
                  {{ student.last_name ? student.last_name : '--' }}
                </div>

                <div class="text-center mb-3">
                  <span class="badge" :style="{ backgroundColor: '' }"
                    >{{ student.house ? student.house : '--' }}
                  </span>
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
                      <div>Message</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from 'primevue/multiselect'
import { debounce } from 'lodash'
import Table from '~/components/table.vue'
import tableMixin from '~/mixins/tableMixin'
import ImageCropper from '~/components/Utils/ImageCropper.vue'

export default {
  components: { Table, ImageCropper, MultiSelect },
  mixins: [tableMixin],
  data() {
    return {
      students: [],
      demo: false,
      studentId: '',
      showCropper: false,
      allStudents: [],
      student_list: [],
      filter: '',
      view: true,
      fields: [
        { key: 'first_name', sortable: true },
        { key: 'last_name', label: 'Surname', sortable: true },
        { key: 'admission_no', sortable: true },
        { key: 'gender', sortable: true },
        // { key: "DOB", sortable: true },
        // { key: 'house', sortable: true },
        { key: 'house_color', label: 'House', sortable: true },
        { key: 'triple_dots', sortable: false },
      ],
    }
  },
  activated() {
    this.getClassStudent()
  },
  methods: {
    async savedImage(image) {
      try {
        await this.$axios.$post(
          `/schools/v3/class/student/${this.studentId}/avatar/`,
          { avatar: image.croppedImageURI }
        )
        this.cancelImage()
        this.getClassStudent()
      } catch (e) {
        console.log(e)
      }
    },
    cancelImage() {
      this.showCropper = false
    },
    async somefunction(e) {
      try {
        await this.$axios.$post(
          `/schools/v3/class/student/${this.studentId}/avatar/`,
          { avatar: e }
        )
        this.getClassStudent()
      } catch (e) {
        console.log(e)
      } finally {
        this.toggleCamera()
      }

      console.log(e)
    },
    toggleCamera() {
      this.demo = !this.demo
    },
    handleCapture(e) {
      this.toggleCamera()
      this.studentId = e.class_student_id
    },
    handleUpload(e) {
      this.studentId = e.class_student_id

      this.showCropper = !this.showCropper
    },
    handleMessage() {
      console.log('coming soon')
    },
    slowStudent: debounce(function () {
      this.getClassStudent()
    }, 500),
    async getClassStudent() {
      try {
        const classId = this.$route.params.class
        const { data } = await this.$axios.get(
          `/slate-admin/class/${classId}/?search=${this.filter}`
        )
        this.allStudents = data.data.students.map((student) => ({
          DOB: student['d.o.b'],
          house_color: student.house,

          triple_dots: [
            { name: 'Admin Profile', event: 'profile' },
            // { name: 'Parent Communication', event: 'push_communication' },
            { name: 'Capture Image', event: 'capture' },
            { name: 'Upload Image', event: 'upload' },

            // { name: 'Message Student', event: 'message' },
          ],
          ...student,
        }))
      } catch (error) {}
    },
    grid() {
      this.view = false
    },
    table() {
      this.view = true
    },
    async show_add_modal() {
      const classId = this.$route.params.class
      this.$bvModal.show('classes-add-student')
      try {
        const {
          data: { data },
        } = await this.$axios.get(`/slate-admin/class/${classId}/students/add/`)

        this.students = data.students.map((student) => ({
          name: `${student.last_name} ${student.first_name}`,
          id: student.id,
        }))
        console.log(this.students)
      } catch (error) {}
    },
    async handleAddStudent() {
      const classId = this.$route.params.class
      try {
        await this.$axios.post(`slate-admin/class/${classId}/students/`, {
          class_id: classId,
          students: this.student_list,
        })
        this.getClassStudent()
        this.$bvModal.hide('classes-add-student')
        this.student_list = []
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.p-multiselect >>> .p-multiselect-label {
  width: 26rem;
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
