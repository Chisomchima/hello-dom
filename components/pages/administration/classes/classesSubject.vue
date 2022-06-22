<template>
  <div>
    <div
      class="
        mb-0
        d-flex
        mx-3
        justify-content-between
        border-bottom
        pb-4
        rounded-top
      "
    >
      <div>
        <!-- <span class="border p-1 my-auto" @click="view = false">
          <span class="iconify" data-icon="akar-icons:grid"></span>
        </span> -->
        <span class="border p-1" @click="view = true">
          <span
            class="iconify"
            data-icon="ant-design:unordered-list-outlined"
          ></span>
        </span>
      </div>

      <div>
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
              @input="slowSubjects"
            />
            <b-btn class="ml-3 btn-primary" @click="show_add_subject_modal">
              Add Subject
            </b-btn>
          </span>
        </span>
      </div>
    </div>
    <b-modal id="modal-delete-subject" title="Confirm Delete">
      <div class="modal-body">
        <div class="fs-18">
          Are you sure you want to delete this Subject ? You can always add it
          back. Click the 'No' button to cancel this action
        </div>
      </div>
      <template #modal-footer="{ cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->

        <div class="d-flex w-100 justify-content-between px-5">
          <div>
            <b-button
              size="sm"
              variant="light"
              class="px-5 text-secondary mr-2"
              @click="cancel()"
            >
              No
            </b-button>
          </div>
          <div>
            <b-button
              size="sm"
              variant="primary"
              class="px-5"
              @click="deleteSubject"
            >
              Yes
            </b-button>
          </div>
        </div>
        <!-- Button with custom close trigger value -->
      </template>
    </b-modal>
    <ModalWrapper
      id="modal-classes-add-subject"
      submit-title="Add"
      title="Add Subject"
      @ok="handleAddSubject"
    >
      <div class="modal-body">
        <div class="mb-3">
          <label class="text-grey font12 mb-0">Subject </label>
          <VSelect
            v-model="subject"
            class="style-chooser"
            :placeholder="
              differentGrades.length
                ? 'Type a Subject'
                : 'All Subjects are already in this class'
            "
            label="subject"
            :reduce="(option) => option.id"
            :options="differentGrades"
          ></VSelect>
        </div>
        <div class="mb-3">
          <label class="text-grey font12 mb-0">Lead teacher</label>
          <VSelect
            v-model="lead"
            class="style-chooser"
            placeholder="Type Teacher's name"
            label="name"
            :options="allTeachers"
            @input="addLeadTeacher"
          ></VSelect>
        </div>

        <div>
          <!---->
          <div v-for="(substitute, index) in substitueTeachers" :key="index">
            <div class="mb-3">
              <label class="text-grey font12 mb-0">Teacher</label>
              <div class="row">
                <div class="col-11">
                  <VSelect
                    v-model="substitute.id"
                    class="style-chooser"
                    placeholder="Type Teacher's name"
                    label="name"
                    :reduce="(option) => option.id"
                    :options="allTeachers"
                  ></VSelect>
                </div>
                <div
                  class="col-1 p-0 d-flex align-items-center text-danger"
                  @click="removeSubstitute(index)"
                >
                  <span
                    class="iconify"
                    data-icon="bi:trash"
                    data-width="24"
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-right my-3">
            <span
              class="text-primary"
              :style="{ cursor: 'pointer' }"
              @click="addSubstitue"
            >
              + Add substitute teachers
            </span>
          </div>
        </div>
      </div>
    </ModalWrapper>
    <ModalWrapper
      id="showDeleteSubjectModal"
      :stacking="true"
      :noFooter="true"
      title="Remove Teacher(s) from this subject"
    >
      <div class="mb-3">
        <label class="text-grey font12 mb-0"> Teachers: </label>
        <div
          v-for="(substitute, index) in deleteTeachersList"
          :key="index"
          class="maxi mb-2"
        >
          <v-select
            v-model="substitute.teacher_name"
            :reduce="(option) => option.teacher_id"
            disabled
            class="style-chooser"
            :placeholder="
              allTeachers.length
                ? 'Select a Teacher'
                : 'No Lead Teacher in this class'
            "
            label="teacher_name"
            :options="allTeachers"
          ></v-select>
          <div class="d-flex mt-2 justify-content-start border-bottom pb-3">
            <small
              class="text-danger"
              :style="{ cursor: 'pointer' }"
              @click="removeSubjectTeacher(substitute, index)"
            >
              <span class="iconify" data-icon="bi:trash"></span>
              Remove Teacher
            </small>
          </div>
        </div>
      </div>
    </ModalWrapper>

    <ModalWrapper
      id="areYouSure1"
      title="Remove Teacher from this subject"
      submitTitle="Delete"
      @ok="deleteStaff"
      :stacking="true"
    >
      <div>
        Are you sure you want to Delete
        <span class="text-danger">
          {{ deleteTeacher.teacher_name }}
        </span>
      </div>
    </ModalWrapper>
    <ModalWrapper
      id="subject-add-teacher"
      title="Add Teacher(s) to this subject"
      @ok="SubmitSubjectTeacher"
    >
      <!-- <div class="mb-3">
        <label class="text-grey font12 mb-0">Lead Teachessr: </label>
        <div class="maxi">
          <v-select
            v-model="currentSubject.lead_teacher"
            :reduce="(option) => option.id"
            class="style-chooser"
            :placeholder="
              allTeachers.length ? 'Select a Teacher' : 'No Lead Teacher in this class'
            "
            label="name"
            :options="allTeachers"
          ></v-select>
        </div>
      </div> -->
      <div class="mb-3">
        <label class="text-grey font12 mb-0"> Teachers </label>
        <div
          v-for="(substitute, index) in subjectTeachers"
          :key="index"
          class="maxi mb-2"
        >
          <v-select
            v-model="substitute.id"
            :reduce="(option) => option.id"
            class="style-chooser"
            :placeholder="
              allTeachers.length
                ? 'Select a Teacher'
                : 'No Lead Teacher in this class'
            "
            label="name"
            :options="allTeachers"
          ></v-select>
          <div class="d-flex mt-2 justify-content-start border-bottom pb-3">
            <small
              class="text-danger"
              :style="{ cursor: 'pointer' }"
              @click="removeSubjectSubstitute(index)"
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
            @click="addSubjectSubstitute"
          >
            <span class="iconify" data-icon="akar-icons:circle-plus"></span> Add
            Teacher
          </small>
        </div>
      </div>
    </ModalWrapper>
    <div class="mx-3">
      <div v-if="view" class="mt-2">
        <Table
          :items="allClassSubjects"
          :fields="fields"
          :allow-redirect="false"
          @add_teacher="showAddTeacherModal"
          @viewSubject="goToSubject"
          @remove_teacher="showDeleteSubjectModal"
          @delete_subject="removeSubject"
          @row-clicked="goToSubject"
        >
        </Table>
      </div>
      <div v-else>
        <div class="row mt-2">
          <template v-for="(subject, index) in allClassSubjects">
            <div
              :key="index"
              class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4"
              @click="goToSubject(subject)"
            >
              <div
                class="subject-card"
                :style="{
                  'background-color': subject.icon_data.icon_bg_color,
                  color: subject.icon_data.icon_font_color.includes('#')
                    ? subject.icon_data.icon_font_color
                    : 'black',
                  cursor: 'pointer',
                }"
              >
                <div class="subject-name mb-4">{{ subject.subject }}</div>
                <div
                  class="d-flex align-items-center justify-content-between mb-3"
                >
                  <div class="content-text pr-1">
                    Lessons: <strong>8</strong>
                  </div>
                  <div class="content-text">Exercises: <strong>23</strong></div>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <div class="content-text-small mb-1">Subject Teacher:</div>
                    <div class="content-text">{{ subject.lead_teacher }}</div>
                  </div>
                  <div class="fs-16">ENG101</div>
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
import axios from 'axios'
import { differenceBy, debounce } from 'lodash'

export default {
  data() {
    return {
      allClassSubjects: [],
      deleteTeacher: {},
      view: true,
      gradeId: '',
      currentSubject: {},
      filter: '',
      lead: [],
      subject: [],
      allTeachers: [],
      differentGrades: [],
      lead_teacher: {},
      teachers: [],
      subjectDelete: '',
      list: 1,
      subjectTeachers: [
        {
          designation: 'assistant',
          id: '',
        },
      ],
      substitueTeachers: [],
      allSubjects: [],

      fields: [
        { key: 'subject', sortable: true },
        { key: 'code', sortable: true },
        // { key: "lead_teacher", sortable: true },
        { key: 'substitute_teacher', label: 'Teachers', sortable: true },
        { key: 'lesson_count', label: 'Lessons', sortable: true },
        { key: 'excercises', sortable: true },
        { key: 'grade_books', label: 'Gradebook', sortable: true },

        { key: 'triple_dots', sortable: false },
      ],
    }
  },
  computed: {
    deleteTeachersList() {
      return this.currentSubject.all_teachers
    },
  },
  activated() {
    this.getall()
    // await this.$nuxt.refresh()
  },
  async mounted() {
    await this.getall()
  },

  methods: {
    async deleteStaff() {
      const submit = []
      submit.push({ id: this.deleteTeacher.teacher_id })
      try {
        await this.$axios.post(
          `/slate-admin/subject/${this.currentSubject.id}/remove/teacher/`,
          {
            subject_id: this.currentSubject.id,
            teachers: submit,
          }
        )
        this.$bvModal.hide('showDeleteSubjectModal')
        this.$bvModal.hide('areYouSure1')

        this.getall()
      } catch (error) {}
    },
    async removeSubjectTeacher(e, i) {
      this.deleteTeacher = e
      this.$bvModal.show('areYouSure1')
    },
    showDeleteSubjectModal(e) {
      this.currentSubject = e
      this.$bvModal.show('showDeleteSubjectModal')
    },
    goToSubject(e) {
      const schoolCode = this.$store.state.administration.school.code
      this.$router.push({
        path: `/sms/${schoolCode}/lms/subjects/${e.id}`,
        // path: `/sms//administration/configuration/grade/${this.gradeId}/subject/${e.subject_id}`,
        query: { _name: e.subject },
      })
    },

    slowSubjects: debounce(function () {
      this.getall()
    }, 500),
    async getall() {
      const classId = this.$route.params.class

      const { data } = await this.$axios.get(
        `/slate-admin/class/${classId}/?search=${this.filter}`
      )
      this.allClassSubjects = data.data.subjects.map((subject) => ({
        ...subject,
        lead_teacher: subject.teacher,
        excercises: subject.exercise_count,
        grade_books: subject.gradebook_count,
        substitute_teacher: subject.all_teachers,
        summ: { _showDetails: true },
        triple_dots: [
          { name: 'View Subject', event: 'viewSubject' },

          { name: 'Add Teacher', event: 'add_teacher' },
          { name: 'Remove Teacher', event: 'remove_teacher' },
          { name: 'Delete Subject', event: 'delete_subject' },
        ],
      }))
      this.gradeId = data.data.grade_level_id
    },
    addLeadTeacher(e) {
      this.lead_teacher = { id: e.id, designation: 'form_teacher' }
    },
    removeSubstitute(index) {
      this.substitueTeachers.splice(index, 1)
    },
    addSubjectSubstitute() {
      this.subjectTeachers.push({
        designation: 'assistant',
        id: '',
      })
    },
    removeSubjectSubstitute(e) {
      this.subjectTeachers.splice(e, 1)
    },
    async SubmitSubjectTeacher() {
      try {
        const { data } = await this.$axios.post(
          `/slate-admin/subject/${this.currentSubject.id}/add/teacher/`,
          {
            subject_id: this.currentSubject.id,
            teachers: this.subjectTeachers,
          }
        )
        this.subjectTeachers = []
        this.$bvModal.hide('subject-add-teacher')
        this.getall()
      } catch (error) {
        console.log(error)
      }
    },
    addSubstitue() {
      this.substitueTeachers.push({
        designation: 'assistant',
        id: '',
      })
    },
    async show_add_subject_modal() {
      this.getall()
      // await this.$nuxt.refresh()
      const schoolId = await this.$store.state.administration.school.id

      const teachers = this.$axios.get(`/quiz/v2/school/${schoolId}/markers/`)
      const subjects = this.$axios.get(
        `/slate-admin/school/${schoolId}/subjects/?grade__exact=${this.gradeId}&paginate=false`
      )
      this.$bvModal.show('modal-classes-add-subject')

      try {
        await axios.all([teachers, subjects]).then(
          axios.spread(
            function (res1, res2) {
              this.allTeachers = res1.data.staffs
              this.allSubjects = res2.data.data
            }.bind(this)
          )
        )

        const mappedClass = this.allClassSubjects.map((e) => ({
          id: e.id,
          subject: e.subject,
        }))
        const mappedGrades = this.allSubjects.map((e) => ({
          id: e.id,
          subject: e.name,
        }))
        this.differentGrades = differenceBy(
          mappedGrades,
          mappedClass,
          'subject'
        )
      } catch (error) {
        console.log(error)
      }
    },
    async handleAddSubject(e) {
      this.substitueTeachers.unshift(this.lead_teacher)
      const classId = this.$route.params.class
      try {
        await this.$axios.post(
          `/slate-admin/class/${classId}/add/subject/teacher/`,
          {
            class_id: classId,
            subject_id: this.subject,
            teachers: this.substitueTeachers,
          }
        )
        this.clearForm()
      } catch (error) {
        console.log(error)
      }
    },
    clearForm() {
      this.subject = ''
      this.lead = ''
      this.substitue = ''
      this.substitueTeachers = []
      this.getall()
      // this.$nuxt.refresh()
      this.$bvModal.hide('modal-classes-add-subject')
    },
    async showAddTeacherModal(e) {
      this.currentSubject = e

      const schoolId = await this.$store.state.administration.school.id
      this.$bvModal.show('subject-add-teacher')
      try {
        const { data } = await this.$axios.get(
          `/quiz/v2/school/${schoolId}/markers/`
        )
        this.allTeachers = data.staffs
      } catch (error) {
        console.log(error)
      }
    },
    removeSubject(e) {
      this.subjectDelete = e.id
      this.$bvModal.show('modal-delete-subject')
    },
    async deleteSubject() {
      try {
        await this.$axios.delete(
          `/slate-admin/class/subject/${this.subjectDelete}/`
        )
      } catch (error) {
        console.log(error)
      }
      this.$bvModal.hide('modal-delete-subject')
      this.getall()
      // this.$nuxt.refresh()
    },
  },
}
</script>

<style scoped></style>
