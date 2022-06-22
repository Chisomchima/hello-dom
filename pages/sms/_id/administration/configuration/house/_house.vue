<template>
  <div>
    <!--  <BackwardNavigation /> -->

    <UtilsHeaderCardWithColor
      enable-image
      :title="cardTitle"
      :data="data"
      :color="data.icon_data ? data.icon_data.icon_font_color : '#ffffff'"
      :bg-color="data.icon_data ? data.icon_data.icon_bg_color : ''"
      :img-src="data.icon_data ? data.icon_data.icon : ''"
      :display-key="['males', 'females', 'total', 'coordinators', 'staffs']"
      @edit="onEdit(data.id)"
    >
    </UtilsHeaderCardWithColor>

    <UtilsBaseCardTab>
      <UtilsCardTab title="Staff Members">
        <UtilsFilterComponent @search-input="searchStaff = $event">
          <template #besideFilterButton>
            <BaseButton @click="$bvModal.show('modal-staff')"
              >Add Staff</BaseButton
            >
          </template>
          <template #default="{ visualization }">
            <TableComponent
              v-if="visualization === 'list'"
              :items="staffs"
              :fields="staffField"
              :filter="searchStaff"
              :pages="1"
            />
            <div v-else class="row">
              <div
                v-for="(value, index) in staffs"
                :key="index"
                class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
              >
                <UtilsGridViewCard
                  :data="value"
                  :display-key="[
                    'first_name',
                    'email',
                    'phone_number',
                    'gender',
                  ]"
                ></UtilsGridViewCard>
              </div>
            </div>
          </template>
        </UtilsFilterComponent>
      </UtilsCardTab>
      <UtilsCardTab title="Student Members">
        <UtilsFilterComponent @search-input="searchStudent = $event">
          <template #besideFilterButton>
            <BaseButton @click="$bvModal.show('modal-student')"
              >Add Student</BaseButton
            >
          </template>
          <template #default="{ visualization }">
            <TableComponent
              v-if="visualization === 'list'"
              :items="students"
              :fields="studentField"
              :filter="searchStudent"
              :pages="1"
            />
            <div v-else class="row">
              <div
                v-for="(value, index) in students"
                :key="index"
                class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
              >
                <UtilsGridViewCard
                  :data="value"
                  :display-key="['first_name', 'last_name', 'gender', 'grade']"
                ></UtilsGridViewCard>
              </div>
            </div>
          </template>
        </UtilsFilterComponent>
      </UtilsCardTab>
    </UtilsBaseCardTab>

    <ModalWrapper
      :id="'modal-student'"
      title="Add Student"
      @show="getStudents"
      @ok="handleOkForStudent"
    >
      <ValidationObserver ref="form">
        <form @submit.prevent="handleSubmitForStudent">
          <div class="form-group">
            <ValidationProviderWrapper
              :name="'Select Students'"
              :rules="['required']"
              :label="'Select Students'"
            >
              <VSelect
                v-model="student"
                label="first_name"
                :loading="loadingStudents"
                multiple
                :options="studentsDropdown"
              >
                <template #option="data">
                  <span>{{ data.first_name }} {{ data.last_name }}</span>
                </template>
              </VSelect>
            </ValidationProviderWrapper>
          </div>
        </form>
      </ValidationObserver>
    </ModalWrapper>

    <ModalWrapper
      :id="'modal-staff'"
      title="Add Staff"
      @show="getCoordinators"
      @ok="handleOk"
    >
      <form @submit.stop.prevent="handleSubmit" class="addHeight">
        <div class="form-group">
          <ValidationProviderWrapper
            :name="'Select Staff'"
            :rules="['required']"
            :label="'Select Staff'"
          >
            <VSelect
              v-model="student"
              label="name"
              :loading="loadingCoordinators"
              :reduce="(option) => option.id"
              multiple
              :options="coordinators"
            />
          </ValidationProviderWrapper>
        </div>
      </form>
    </ModalWrapper>
  </div>
</template>

<script lang="ts">
import mixin from '../mixin'
export default mixin.extend({
  mixins: [mixin],
  async asyncData({ route, $axios }) {
    // const school = store.getters['school/getSchoolByCode'](route.params.id)
    const { data } = await $axios.$get(
      `./slate-admin/house/${route.params.house}/`
    )

    return {
      data,
      staffs: data.house_staffs,
      students: data.house_students,
      cardTitle: data.name,
      //   weeks: weeks.data
    }
  },

  data() {
    return {
      staff: {
        id: '',
        coordinator: [],
      },
      textTest: '',
      student: [],
      loadingStudents: false,
      studentsDropdown: [],
      loadingCoordinators: false,
      coordinators: [],
      cardTitle: 'Academic Period',
      staffField: [
        {
          key: 'first_name',
          label: 'First Name',
          sortable: true,
        },
        {
          key: 'last_name',
          label: 'Last Name',
          sortable: true,
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
        },
        {
          key: 'phone_number',
          label: 'Phone Number',
          sortable: true,
        },
        {
          key: 'designation',
          label: 'Designation',
          sortable: true,
        },
      ],
      studentField: [
        {
          key: 'first_name',
          label: 'First Name',
          sortable: true,
        },
        {
          key: 'last_name',
          label: 'Last Name',
          sortable: true,
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
        },
        {
          key: 'gender',
          sortable: true,
        },
        {
          key: 'grade',
          sortable: true,
        },
      ],
      searchStudent: '',
      searchStaff: '',
    }
  },
  methods: {
    handleOk(event: any) {
      event.preventDefault()
      this.handleSubmit()
    },
    async handleSubmit() {
      console.log('route', 'student', this.student)
      try {
        const coordinatorID = this.staff.coordinator.map(
          (coordinator: any) => coordinator.id
        )

        await this.$axios.$put(
          `/slate-admin/house/${this.$route.params.house}/staffs/`,
          {
            coordinators: this.student,
            id: this.$route.params.house,
            // coordinators: coordinatorID,
            // ...this.staff,
          }
        )

        this.staff = {
          id: '',
          coordinator: [],
        }
        this.$bvModal.hide('modal-staff')
        this.student = []
        await this.$nuxt.refresh()
      } catch (e) {
        console.log(e)
      }
    },
    async deleteWeek(id: string) {
      await this.$axios.$delete(`./slate-admin/week/${id}/detail/`)
    },

    async getCoordinators() {
      this.loadingCoordinators = true

      const { staffs } = await this.$axios.$get(
        `quiz/v2/school/${this.school.id}/markers/`
      )
      this.loadingCoordinators = false
      this.coordinators = staffs
    },

    async getStudents() {
      this.loadingStudents = true

      const { data } = await this.$axios.$get(
        `slate-admin/house/${this.$route.params.house}/students/add/`
      )
      this.loadingStudents = false
      this.studentsDropdown = data
    },

    handleOkForStudent(event: any) {
      event.preventDefault()
      this.handleSubmitForStudent()
    },

    async handleSubmitForStudent() {
      try {
        const studentIDs = this.student.map((item: any) => item.id)
        await this.$axios.$post(
          `/slate-admin/house/${this.$route.params.house}/students/`,
          {
            students: studentIDs,
          }
        )
        await this.$nuxt.refresh()
        this.$bvModal.hide('modal-student')
        this.student = []
        this.$refs.form.reset()
      } catch (e) {
        console.log(e)
      }
    },

    onEdit(route: any) {
      this.$router.push({
        name: 'sms-id-administration-configuration-house-edit-house',
        params: {
          house: route,
        },
      })
    },
  },
})
</script>

<style scoped>
.addHeight {
  height: 8rem;
}
</style>
