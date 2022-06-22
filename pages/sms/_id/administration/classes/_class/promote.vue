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

      Promote Students
    </div> -->
    <div class="d-flex justify-content-between">
      <div class="w-50">
        <p class="text-secondary">
          Select the students to be promoted, pick the new class or grade in the
          new academic year and confirm your decision
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
          <span v-else> Confirm Promotion </span>
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
                          >
                            {{ flavour.name }}</b-form-checkbox
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
        <ValidationObserver v-slot="{ validate }">
          <div
            id="runValidate"
            ref="runValidate"
            type="button"
            @click="validate"
          ></div>
          <div class="action-content form-group">
            <div class="row">
              <div class="col">
                <label class="text-secondary"> New Academic Year * </label>
                <ValidationProviderWrapper :rules="['required']">
                  <VSelect
                    v-model="selectedYear"
                    :options="academicYears"
                    :reduce="(e) => e.id"
                    label="name"
                    @input="getclass"
                  ></VSelect>
                </ValidationProviderWrapper>
              </div>
              <div class="col">
                <label class="text-secondary"> New Grade * </label>
                <ValidationProviderWrapper :rules="['required']">
                  <VSelect
                    v-model="selectedGrade"
                    :options="grades"
                    :reduce="(e) => e.id"
                    label="name"
                    @input="getclass"
                  ></VSelect>
                </ValidationProviderWrapper>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <label class="text-secondary"> New Class </label>
                <ValidationProviderWrapper :rules="['required']">
                  <VSelect
                    v-model="selectedClass"
                    :reduce="(e) => e.id"
                    :options="AllClasses"
                    label="name"
                  ></VSelect>
                </ValidationProviderWrapper>
              </div>
            </div>
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
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import promoteMixin from '~/mixins/promotion'
export default {
  mixins: [promoteMixin],
  data() {
    return {
      currentStudents: [],
      AllClasses: '',
      selectedClass: '',
      selectedYear: '',
      academicYears: '',
      grades: [],
      selectedGrade: '',
    }
  },
  async fetch() {
    this.clearFields()

    try {
      const endpoints = [
        `/slate-admin/class/${this.$route.params.class}/`,
        `/schools/v3/class/${this.$route.params.class}/academic_years/promote/`,
        // `/slate-admin/school/${this.loggedInStaff.school_details.id}/year/?page=1`,
        `/slate-admin/school/${this.loggedInStaff.school_details.id}/grades/?paginate=false`,
        `/schools/v3/class/${this.$route.params.class}/promote/`,
      ]

      const [classData, AcademicYears, grades, promote] = await Promise.all(
        endpoints.map((endpoint) => this.$axios.get(endpoint))
      )

      if (classData.data) {
        const data = classData.data.data
        this.current.grade = data.grade
        this.current.class = data.name
      }
      if (AcademicYears.data) {
        const data = AcademicYears.data.data
        this.academicYears = data
      }
      if (grades.data) {
        const data = grades.data.data
        this.grades = data
      }
      if (promote.data) {
        const data = promote.data.data

        const currentStudentList = data.students.map((student) => {
          return {
            id: student.id,
            name: student.first_name + ' ' + student.last_name,
            promotion: student.promotion,
          }
        })

        this.currentStudents = currentStudentList
      }
    } catch (error) {
      console.log(error)
    }
  },

  methods: {
    async getclass() {
      this.selectedClass = ''
      try {
        const {
          data: { data },
        } = await this.$axios.get(
          `/schools/v3/class/${this.$route.params.class}/promotion/classes/?grade_level=${this.selectedGrade}&academic_year=${this.selectedYear}`
          // `/slate-admin/school/${this.loggedInStaff.school_details.id}/class/?page=1&page_size=999&grade_id=${this.selectedGrade}&academic_year_name=&academic_year_id=${this.selectedYear}`
        )
        console.log('class', data)

        this.AllClasses = data
      } catch (error) {
        console.error('tag', '')
      }
    },

    async handlePromote() {
      if (this.$refs.runValidate) {
        this.$refs.runValidate.click()
      }
      const StudentIds = this.nextYearStudents.map((student) => student.id)
      if (this.selectedYear && this.selectedGrade && this.selectedClass) {
        try {
          this.isLoading = true

          await this.$axios.post(
            `/schools/v3/class/${this.$route.params.class}/promote/`,
            {
              academic_year: this.selectedYear,
              grade_level: this.selectedGrade,
              school_class: this.selectedClass,
              class_students: StudentIds,
            }
          )
          this.toast(
            'b-toaster-bottom-center',
            true,
            'success',
            'Promotion',
            'Successful'
          )
          this.$fetch()
        } catch (error) {
          console.error(error)
        } finally {
          this.isLoading = false
        }
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
