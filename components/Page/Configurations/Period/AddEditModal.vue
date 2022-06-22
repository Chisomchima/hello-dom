<template>
  <ModalWrapper :title="title" @ok="handleOk($event)" @show="getAcademicYear()">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <ValidationProviderWrapper
          :name="'Name'"
          :rules="['required']"
          :label="'Name'"
        >
          <BaseInput v-model="fieldObj.name" placeholder="Name" />
        </ValidationProviderWrapper>
      </div>
      <div class="form-group">
        <ValidationProviderWrapper
          :name="'Code'"
          :rules="['required']"
          :label="'Code'"
        >
          <input
            v-model="fieldObj.code"
            class="form-control ng-untouched ng-pristine ng-valid"
            placeholder="Code"
            type="text"
          />
        </ValidationProviderWrapper>
      </div>

      <div class="form-group">
        <ValidationProviderWrapper
          :name="'Select Academic Year'"
          :rules="['required']"
          :label="'Select Academic Year'"
        >
          <VSelect
            v-model="fieldObj.academic_year"
            :options="academicYear"
            label="name"
          ></VSelect>
        </ValidationProviderWrapper>
      </div>
      <div class="form-group">
        <ValidationProviderWrapper
          :name="'Academic Period Start'"
          :rules="['required']"
          :label="'Academic Period Start'"
        >
          <v-date-picker
            v-model="fieldObj.date_start"
            mode="date"
            :model-config="modelConfig"
          >
            <template #default="{ inputValue, inputEvents }">
              <input
                class="form-control ng-untouched ng-pristine ng-valid"
                placeholder=""
                type="text"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </v-date-picker>
        </ValidationProviderWrapper>
      </div>
      <div class="form-group">
        <ValidationProviderWrapper
          :name="'Academic Period End'"
          :rules="['required']"
          :label="'Academic Period End'"
        >
          <v-date-picker
            v-model="fieldObj.date_end"
            mode="date"
            :model-config="modelConfig"
          >
            <template #default="{ inputValue, inputEvents }">
              <input
                class="form-control ng-untouched ng-pristine ng-valid"
                placeholder="Academic Year End"
                type="text"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </v-date-picker>
        </ValidationProviderWrapper>
      </div>
    </form>
  </ModalWrapper>
</template>

<script>
import AddEditFunction from '~/mixins/AddEditModal'
export default {
  mixins: [AddEditFunction],
  data() {
    return {
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD'
        // Uses 'iso' if missing
      },
      academicYear: [],

      fieldObj: {
        name: '',
        code: '',
        academic_year: '',
        date_start: '',
        date_end: ''
      }
    }
  },
  methods: {
    async getAcademicYear() {
      const { data } = await this.$axios.$get(
        `./slate-admin/school/${this.school.id}/year/?paginate=false`
      )
      console.log(data)
      this.academicYear = data
    },
    handleOk(event) {
      event.preventDefault()
      if (Object.values(this.field).length <= 0) {
        this.handleSubmit()
      } else {
        this.handleEdit()
      }
    },
    async handleSubmit() {
      const school = this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )

      try {
        const data = await this.$axios.$post(
          `/slate-admin/school/${school.id}/periods/`,
          {
            ...this.fieldObj,
            academic_year: this.fieldObj.academic_year.id
          }
        )
        this.$nextTick(() => {
          this.$bvModal.hide('modal')
        })
        this.$emit('success', data)
        this.resetForm()
      } catch (e) {
        console.log(e)
      }
    },
    async handleEdit() {
      try {
        await this.$axios.$put(
          `/slate-admin/period/${this.fieldObj.id}/`,
          this.fieldObj
        )
        this.$emit('refresh')
        this.$nextTick(() => {
          this.$bvModal.hide('modal')
        })
        this.resetForm()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
