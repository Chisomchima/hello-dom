<template>
  <div>
    <UtilsHeaderCard
      :title="singleClass.name"
      :data="singleClass"
      :enable-action="true"
      :display-key="[
        'grade',
        'form_teacher',
        'class_code',
        'location',
        'academic_year',
      ]"
      :actions="['Promote_Students', 'Graduate_Students']"
      @edit="editClass"
      @delete="showDeleteModal"
      @Promote_Students="promoteStudents"
      @Graduate_Students="graduateStudents"
    >
    </UtilsHeaderCard>
    <b-modal id="modal-2" title="Edit Class">
      <div class="modal-body">
        <div class="form-group">
          <label>Class Name </label>
          <input
            v-model="singleClassToEdit.name"
            type="text"
            placeholder="Class Name"
            class="form-control ng-untouched ng-pristine ng-valid"
          />
        </div>
        <div class="form-group">
          <label>Class Code </label>
          <input
            v-model="singleClassToEdit.classCode"
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
                v-model="singleClassToEdit.location"
                type="text"
                placeholder="Class location"
                class="form-control ng-untouched ng-pristine ng-valid"
              />
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Class Theme </label>
              {{ singleClassToEdit.color }}
              <input
                v-model="singleClassToEdit.color"
                type="color"
                placeholder="Class theme"
                class="form-control ng-untouched ng-pristine ng-valid"
              />
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
          @click="handlePostRequest"
        >
          Save
        </b-button>
        <!-- Button with custom close trigger value -->
      </template>
    </b-modal>
    <b-modal id="modal-delete" title="Confirm Delete">
      <div _ngcontent-tbu-c302="" class="modal-body">
        <div>
          Are you sure you want to delete this Class ? click the 'No' button to
          cancel this action
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
              @click="deleteClass"
            >
              Yes
            </b-button>
          </div>
        </div>
        <!-- Button with custom close trigger value -->
      </template>
    </b-modal>

    <UtilsBaseCardTab>
      <UtilsCardTab
        v-for="(button, index) in buttons"
        :key="index"
        :title="button.name"
        @handleClick="switchComponent(button)"
      >
        <keep-alive>
          <component :is="currentTabComponent"></component>
        </keep-alive>
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
import School from '~/mixins/school'
import Persist from '~/mixins/persistComponent'
import ClassStudents from '~/components/pages/administration/classes/classesStudents.vue'
import ClassTeachers from '~/components/pages/administration/classes/classesTeachers.vue'
import ClassesGradebook from '~/components/pages/administration/classes/classesGradebook.vue'
import ClassesSubjects from '~/components/pages/administration/classes/classesSubject.vue'
import ClassesAttendance from '~/components/pages/administration/classes/classesAttendance.vue'
import ClassesClassBoard from '~/components/pages/administration/classes/classesClassBoard.vue'
import ClassesCommunications from '~/components/pages/administration/classes/classesCommunications.vue'
import ClassesLibrary from '~/components/pages/administration/classes/classesLibrary.vue'
import ClassesReportCard from '~/components/pages/administration/classes/classesReportCard.vue'
import ClassTimeTable from '~/components/ClassTimeTable.vue'

export default {
  components: {
    ClassStudents,
    ClassTeachers,
    ClassesGradebook,
    ClassesSubjects,
    ClassesAttendance,
    ClassesClassBoard,
    ClassesCommunications,
    ClassesLibrary,
    ClassesReportCard,
  },
  mixins: [School, Persist],
  async asyncData({ route, $axios, store }) {
    const schoolId = await store.state.administration.school.id

    const response = await $axios.$get(
      `/slate-admin/class/${route.params.class}/`
    )

    const response2 = await $axios.$get(
      `/slate-admin/school/${schoolId}/class/`
    )
    const newKeys = { location: 'location' }
    function renameKeys(obj, newKeys) {
      const keyValues = Object.keys(obj).map((key) => {
        const newKey = newKeys[key] || key
        return { [newKey]: obj[key] }
      })
      return Object.assign({}, ...keyValues)
    }
    const singleClass = renameKeys(response.data, newKeys)

    const cardTitle = singleClass.grade

    return {
      cardTitle,
      singleClass,
    }
  },
  data() {
    return {
      allYears: [],
      allGrades: [],
      changeComponent: true,
      singleClass: {},

      buttons: [
        {
          name: 'Teachers',
          isActive: true,
          component: 'ClassTeachers',
          page: 'administrationClasses',
        },
        {
          name: 'Students',
          isActive: false,
          component: 'ClassStudents',
          page: 'administrationClasses',
        },

        {
          name: 'Subjects',
          isActive: false,
          component: 'ClassesSubjects',
          page: 'administrationClasses',
        },

        {
          name: 'Gradebook',
          isActive: false,
          component: 'ClassesGradebook',
          page: 'administrationClasses',
        },
        {
          name: 'Attendance',
          isActive: false,
          component: 'ClassesAttendance',
          page: 'administrationClasses',
        },
        {
          name: 'Timetable',
          isActive: false,
          component: 'ClassTimeTable',
          page: 'administrationClasses',
        },
        {
          name: 'Class Board',
          isActive: false,
          component: 'ClassesClassBoard',
          page: 'administrationClasses',
        },
        {
          name: 'Parent Communications',
          isActive: false,
          component: 'ClassesCommunications',
          page: 'administrationClasses',
        },
        {
          name: 'Class Library',
          isActive: false,
          component: 'ClassesLibrary',
          page: 'administrationClasses',
        },
        {
          name: 'Report Card',
          isActive: false,
          component: 'ClassesReportCard',
          page: 'administrationClasses',
        },
      ],
    }
  },

  computed: {
    singleClassToEdit() {
      return this.singleClass
    },
    currentTabComponent() {
      const tab = this.$route.query
      if (tab.tab) {
        const watcher = parseInt(tab.tab)

        const button = this.buttons.find((obj, index) => {
          return index === watcher
        })

        return button.component
        // return 'ClassesReportCard'
      } else return 'ClassTeachers'
    },
  },
  watch: {
    changeComponent: {
      handler() {},
      immediate: true,
    },
    // '$route.query.tab': {
    //   handler(e) {
    //     const watcher = parseInt(e)
    //     const button = this.buttons.find((e, index) => {
    //       return index === watcher
    //     })
    //     this.currentTabComponent = button.component
    //     console.log('tab', e, button, this.currentTabComponent)
    //   },
    //   immediate: true,
    // },
  },

  methods: {
    switchComponent(e) {
      alert()
      console.log(e)
    },
    promoteStudents() {
      this.$router.push(`${this.$route.params.class}/promote`)
    },
    graduateStudents() {
      this.$router.push(`${this.$route.params.class}/graduate`)
    },
    async get_add_class_requirements() {
      const schoolId = await this.$store.state.administration.school.id

      const grades = await this.$axios.get(
        `/slate-admin/school/${schoolId}/grades/?paginate=false`
      )
      this.allGrades = grades.data.data

      const years = await this.$axios.get(
        `/slate-admin/school/${schoolId}/year/?paginate=false`
      )
      this.allYears = years.data.data
    },
    editClass() {
      this.$bvModal.show('modal-2')
      this.get_add_class_requirements()
    },
    showDeleteModal() {
      this.$bvModal.show('modal-delete')
    },
    deleteClass() {
      const classId = this.$route.params.class

      try {
        this.$axios.delete(`slate-admin/class/${classId}/`)
        this.goBack()
      } catch (error) {}
    },
    async handlePostRequest() {
      const classId = this.$route.params.class

      try {
        const response = await this.$axios.put(
          `slate-admin/class/${classId}/`,
          {
            code: this.singleClassToEdit.classCode,
            color: this.singleClassToEdit.color,
            hall: this.singleClassToEdit.location,
            name: this.singleClassToEdit.name,
            form_teacher: 'mr jan',
          }
        )
        this.$bvModal.hide('modal-2')
        await this.$nuxt.refresh()
      } catch (e) {
        console.log(e)
      }
    },
    async refresh() {
      await this.$nuxt.refresh()
    },
    goBack() {
      const schoolCode = this.$store.state.administration.school.code

      this.$router.push(`/sms/${schoolCode}/administration/classes`)
    },
  },
}
</script>

<style scoped>
.profile_container {
  display: grid;
  grid-template-columns: 3fr 3fr 5fr 1fr;
  gap: 5px;
}
.hover:hover {
  cursor: pointer;
}
</style>
