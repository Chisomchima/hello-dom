<template>
  <div>
    <!-- <div class="text-primary biggerText d-flex align-items-center">
      <span @click="$router.go(-1)">
        <span
          class="iconify text-dark biggerText"
          data-icon="akar-icons:arrow-left"
        ></span>
      </span>
      <span class="ml-3 pointer" @click="$router.go(-1)">
        {{ current.class ? current.class : '' }}
      </span>
      <span
        class="mx-2 iconify text-dark biggerText"
        data-icon="ic:twotone-greater-than"
      ></span>

      Graduate Students
    </div> -->
    <div class="d-flex justify-content-between">
      <div class="w-50">
        <p class="text-secondary">
          Select the students to be graduated and confirm your decision.
        </p>
      </div>
      <div v-if="nextYearStudents.length">
        <b-button variant="outline-primary" size="lg" @click="handleReset"
          >Reset</b-button
        >
        <b-button
          variant="primary"
          size="lg"
          :disabled="isLoading"
          class="ml-2"
          @click="handlePromote"
        >
          <span v-if="isLoading">
            <b-spinner variant="light" label="Spinning"></b-spinner>
          </span>
          <span v-else> Confirm Graduation </span>
        </b-button>
      </div>
    </div>
    <div class="action-container">
      <div class="action bg-white">
        <div class="action-content form-group">
          <div class="row">
            <div class="col">
              <label for="grade_level" class="text-secondary"
                >Current Grade Level</label
              >
              <input
                v-model="current.grade"
                type="text"
                disabled
                class="form-control"
                placeholder="Grade"
                name="grade_level"
              />
            </div>
            <div class="col">
              <label for="grade_level" class="text-secondary"
                >Current Class</label
              >
              <input
                v-model="current.class"
                type="text"
                disabled
                class="form-control"
                placeholder="Class"
                name="grade_level"
              />
            </div>
          </div>
          <div class="mt-3 p-2">
            <div class="checkbox-container">
              <b-form-group>
                <template #label>
                  <div class="title-checkbox px-2 py-1 m-0">
                    <b-form-checkbox
                      v-model="allSelected"
                      class=""
                      :indeterminate="indeterminate"
                      aria-describedby="flavours"
                      aria-controls="flavours"
                      @change="toggleAll"
                    >
                      <span class="text-secondary"> Student list</span>
                    </b-form-checkbox>
                  </div>
                </template>
                <template #default="{ ariaDescribedby }">
                  <div v-if="$fetchState.pending" class="text-center">
                    <b-spinner variant="primary" label="Spinning"></b-spinner>
                  </div>
                  <div v-else-if="$fetchState.error" class="text-center">
                    An error occurred :(
                  </div>
                  <div v-else class="contain">
                    <b-form-checkbox-group
                      id="flavors"
                      v-model="selected"
                      :aria-describedby="ariaDescribedby"
                      name="flavors"
                      class=""
                      aria-label="Individual flavours"
                      stacked
                    >
                      <div class="checkbox-options-container">
                        <div
                          v-for="(flavour, index) in currentStudents"
                          :key="index"
                          class="checkbox-option px-2 py-1"
                        >
                          <b-form-checkbox
                            :value="flavour.id"
                            :disabled="
                              flavour.promotion === 'Promoted' ||
                              flavour.promotion === 'Graduated'
                            "
                            >{{ flavour.name }}</b-form-checkbox
                          >
                        </div>
                      </div>
                    </b-form-checkbox-group>
                  </div>
                  <div
                    v-if="!$fetchState.pending && currentStudents.length === 0"
                    class="text-secondary px-2"
                  >
                    No students in this class
                  </div>
                </template>
              </b-form-group>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center text-center align-items-center">
        <div class="d-flex flex-column justify-content-center">
          <div
            class="arrow-container mb-2"
            :class="{ 'arrow-container-active': rightActive }"
            @click="moveStudent('right')"
          >
            <Icon class="arrow" icon="bi:chevron-double-right" />
          </div>
          <div class="text-secondary arrow-text">
            Move <br />
            Students
          </div>
          <div
            class="mt-2 arrow-container"
            :class="{ 'arrow-container-active': leftActive }"
            @click="moveStudent('left')"
          >
            <Icon class="arrow" icon="bi:chevron-double-left" />
          </div>
        </div>
      </div>
      <div class="action bg-white">
        <div class="action-content form-group">
          <p>Graduated List</p>

          <div class="mt-3 p-2">
            <div class="checkbox-container">
              <b-form-group>
                <template #label>
                  <div class="title-checkbox px-2 py-1 m-0">
                    <b-form-checkbox
                      v-model="allSelectedNext"
                      class=""
                      :indeterminate="indeterminateNext"
                      aria-describedby="flavours"
                      aria-controls="flavours"
                      @change="toggleAllNext"
                    >
                      <span class="text-secondary"> Student list</span>
                    </b-form-checkbox>
                  </div>
                </template>

                <template
                  v-if="nextYearStudents.length"
                  #default="{ ariaDescribedby }"
                >
                  <div class="contain">
                    <b-form-checkbox-group
                      id="flavors"
                      v-model="selectedNext"
                      :aria-describedby="ariaDescribedby"
                      name="flavors"
                      class=""
                      aria-label="Individual flavours"
                      stacked
                    >
                      <div class="checkbox-options-container">
                        <div
                          v-for="(flavour, index) in nextYearStudents"
                          :key="index"
                          class="checkbox-option px-2 py-1"
                        >
                          <b-form-checkbox :value="flavour.id">{{
                            flavour.name
                          }}</b-form-checkbox>
                        </div>
                      </div>
                    </b-form-checkbox-group>
                  </div>
                </template>
                <template v-else>
                  <div class="text-secondary px-2">No Selected Student</div>
                </template>
              </b-form-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { difference } from 'lodash'
export default {
  data() {
    return {
      isLoading: false,
      counter: 0,
      current: {
        class: '',
        grade: '',
      },

      rightActive: false,
      leftActive: false,
      nextYearStudents: [],
      currentStudents: [],
      selected: [],
      selectedNext: [],
      allSelected: false,
      allSelectedNext: false,
      indeterminate: false,
      indeterminateNext: false,
    }
  },
  async fetch() {
    this.clearFields()
    const {
      data: { data },
    } = await this.$axios.get(`/slate-admin/class/${this.$route.params.class}/`)
    this.current.grade = data.grade
    this.current.class = data.name
    const graduateStudent = await this.$axios.get(
      `/schools/v3/class/${this.$route.params.class}/graduate/`
    )
    const studentList = graduateStudent.data.data
    console.log('grade', studentList)
    const currentStudentList = studentList.students.map((student) => {
      return {
        id: student.id,
        name: student.first_name + ' ' + student.last_name,
        promotion: student.promotion,
      }
    })
    this.currentStudents = currentStudentList
  },
  watch: {
    selected(newValue, oldValue) {
      // Handle changes in individual  checkboxes
      if (newValue.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newValue.length === this.currentStudents.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
        this.indeterminate = true
        this.allSelected = false
      }
    },
    selectedNext(newValue, oldValue) {
      // Handle changes in individual  checkboxes
      if (newValue.length === 0) {
        this.indeterminateNext = false
        this.allSelectedNext = false
      } else if (newValue.length === this.nextYearStudents.length) {
        this.indeterminateNext = false
        this.allSelectedNext = true
      } else {
        this.indeterminateNext = true
        this.allSelectedNext = false
      }
    },
  },
  methods: {
    clearFields() {
      this.selected = []
      this.selectedNext = []
      this.currentStudents = []
      this.nextYearStudents = []
    },
    toast(toaster, append = false, variant = 'success', title, body) {
      this.counter++
      this.$bvToast.toast(body, {
        title,
        toaster,
        variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      })
    },
    toggleAll(checked) {
      console.log(this.selected, checked)
      this.selected = checked
        ? this.currentStudents.map((e) => e.id).slice()
        : []
    },
    toggleAllNext(checked) {
      console.log(this.selectedNext, checked)
      this.selectedNext = checked
        ? this.nextYearStudents.map((e) => e.id).slice()
        : []
    },
    moveCurrentStudentToNext() {
      const toBeMoved = this.selected.map((current) => {
        return this.currentStudents.find((e) => e.id === current)
      })

      this.nextYearStudents = this.nextYearStudents.concat(toBeMoved)
      const diff = difference(this.currentStudents, this.nextYearStudents)
      this.currentStudents = diff
      this.selected = []
      this.rightActive = true
      this.leftActive = false
    },

    moveNextStudentToCurrent() {
      const toBeMoved = this.selectedNext.map((current) => {
        return this.nextYearStudents.find((e) => e.id === current)
      })

      this.currentStudents = this.currentStudents.concat(toBeMoved)

      this.selectedNext.forEach((element) => {
        const id = this.nextYearStudents.findIndex((e) => e.id === element)
        this.nextYearStudents.splice(id, 1)
      })

      this.selectedNext = []
      this.rightActive = false
      this.leftActive = true
    },

    moveStudent(e) {
      if (e === 'right') {
        if (this.selected.length === 0) {
          this.toast(
            'b-toaster-bottom-center',
            true,
            'danger',
            "You can't move students",
            'Please select atleast 1 student'
          )
        } else {
          this.moveCurrentStudentToNext()
        }
      } else if (e === 'left') {
        if (this.selectedNext.length === 0) {
          this.toast(
            'b-toaster-bottom-center',
            true,
            'danger',
            "You can't move students",
            'Please select atleast 1 student to be Graduated'
          )
        } else {
          this.moveNextStudentToCurrent()
          // this.currentStudents = this.selectedNext
        }
      }
    },
    handleReset() {
      this.$fetch()
    },

    async handlePromote() {
      const StudentIds = this.nextYearStudents.map((student) => student.id)
      try {
        this.isLoading = true

        await this.$axios.post(
          `/schools/v3/class/${this.$route.params.class}/graduate/`,
          {
            class_students: StudentIds,
          }
        )
        this.toast(
          'b-toaster-bottom-center',
          true,
          'success',
          'Graduation',
          'Successful'
        )
        this.$fetch()
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped>
.contain {
  max-height: 20rem;
  overflow-y: auto;
}
.checkbox-options-container {
  position: relative;
  top: -0.5em;
}
.checkbox-option {
  border-top: 1px solid #e7e8eb;
  border-bottom: 1px solid#e7e8eb;
}
.checkbox-container {
  border: 2px solid #e7e8eb;
  border-radius: 0.5em;
}
.title-checkbox {
  background: #ececf0;
  border-bottom: 2px solid #e7e8eb;
}
.arrow-text {
  line-height: 1;
}
.arrow-container {
  cursor: pointer;
  background: #e2e4e7;
  color: #979ba5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
}
.arrow-container:hover {
  background: #c0c3c9;
}
.arrow-container-active {
  color: #1070b7;
  background: #d7e2eb;
}
.arrow {
  font-size: 2rem;
}
.biggerText {
  font-size: 1.5rem;
}
.pointer {
  cursor: pointer;
  font-size: 1.5rem;
}
.action-container {
  display: grid;
  grid-template-columns: 10fr 2fr 10fr;
  gap: 0.5rem;
}
.action {
  border-radius: 0.5rem;
  border: 2px solid #e7e8eb;
  padding: 0.8rem;
  height: 33rem;
  overflow-y: hidden;
  overflow-x: hidden;
}
.action-content {
  min-height: 100%;
}
</style>
