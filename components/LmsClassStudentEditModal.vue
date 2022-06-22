<template>
  <ModalWrapper :title="title" @ok="handleOk($event)">
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <ValidationProviderWrapper :name="'First Name'" :rules="['required']">
          <BaseInput
            v-model="fieldObj.first_name"
            placeholder="Please Enter First Name"
          ></BaseInput>
        </ValidationProviderWrapper>
      </div>
      <div class="form-group">
        <ValidationProviderWrapper :name="'Middle Name'" :rules="['required']">
          <BaseInput
            v-model="fieldObj.middle_name"
            placeholder="Please Enter Middle Name"
          ></BaseInput>
        </ValidationProviderWrapper>
      </div>

      <div class="form-group">
        <ValidationProviderWrapper :name="'Last Name'" :rules="['required']">
          <BaseInput
            v-model="fieldObj.last_name"
            placeholder="Please Enter Last Name"
          ></BaseInput>
        </ValidationProviderWrapper>
      </div>

      <div class="form-group">
        <ValidationProviderWrapper :name="'Phone number'" :rules="['required']">
          <BaseInput
            v-model="fieldObj.phone_number"
            placeholder="Please Enter Phone Number"
          ></BaseInput>
        </ValidationProviderWrapper>
      </div>
    </form>
  </ModalWrapper>
</template>

<script>
import AddEditFunction from '~/mixins/AddEditModal'
export default {
  mixins: [AddEditFunction],
  props: {
    classStudentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD'
        // Uses 'iso' if missing
      },

      fieldObj: {
        name: '',
        code: '',
        year_start: '',
        year_end: ''
      }
    }
  },
  methods: {
    handleOk(event) {
      event.preventDefault()
      if (Object.values(this.field).length <= 0) {
        // this.handleSubmit()
      } else {
        this.handleEdit()
      }
    },
    async handleSubmit() {
      const school = this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )

      try {
        await this.$axios.$post(
          `/slate-admin/school/${school.id}/year/`,
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
    },
    async handleEdit() {
      try {
        await this.$axios.$put(
          `/schools/v3/class/student/${this.classStudentId}/edit/`,
          this.fieldObj
        )
        this.$refs.form.reset()
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
