<template>
  <ModalWrapper :id="id" not-scrollable :title="title" @ok="handleOk($event)">
    <ValidationObserver ref="form">
      <form @submit.stop.prevent="handleSubmit">
        <div class="form-group">
          <ValidationProviderWrapper
            :name="'Grade Level Name'"
            :rules="['required']"
            :label="'Grade Level Name'"
          >
            <BaseInput
              v-model="fieldObj.grade_name"
              :placeholder="'Enter name'"
            />
          </ValidationProviderWrapper>
        </div>
        <div class="form-group">
          <ValidationProviderWrapper
            :name="'Select 6-3-3 Mapping'"
            :rules="['required']"
            :label="'Select 6-3-3 Mapping'"
          >
            <VSelect
              v-model="fieldObj.name"
              class="bg-white"
              label="name"
              :options="mapping"
            ></VSelect>
          </ValidationProviderWrapper>
        </div>
      </form>
    </ValidationObserver>
  </ModalWrapper>
</template>

<script>
import AddEditFunction from '~/mixins/AddEditModal'
export default {
  mixins: [AddEditFunction],
  props: {
    id: {
      type: String,
      default: 'modal'
    }
  },
  data() {
    return {
      fieldObj: {
        grade_name: '',
        name: ''
      },
      mapping: [
        'Reception',
        'Nursery 1',
        'Nursery 2',
        'Nursery 3',
        'Primary 1',
        'Primary 2',
        'Primary 3',
        'Primary 4',
        'Primary 5',
        'Primary 6',
        'JSS 1',
        'JSS 2',
        'JSS 3',
        'SSS 1',
        'SSS 2',
        'SSS 3'
      ]
    }
  },
  methods: {
    resetForm() {
      this.fieldObj = {}
    },
    async checkFormValidity() {
      const result = await this.$refs.form.validate()
      return result
    },
    async handleOk(event) {
      event.preventDefault()
      if (Object.values(this.field).length <= 0) {
        await this.handleSubmit()
      } else {
        this.handleEdit()
      }
      // this.$bvModal.hide('add-grade')
    },
    async handleSubmit() {
      const result = await this.checkFormValidity()
      if (!result) {
        return
      }

      const school = this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )

      try {
        await this.$axios.$post(
          `./slate-admin/school/${school.id}/grades/`,
          this.fieldObj
        )

        this.resetForm()
        // await this.pageChange(1) // Hide the modal manually
        this.$emit('refresh')
        this.$nextTick(() => {
          this.$refs.form.reset()
          this.$bvModal.hide(this.id)
        })
        this.resetForm()
      } catch (error) {
        console.log(error)
      }

      // await this.$nuxt.refresh()
      // this.$bvModal.hide('add-grade')
    },
    async handleEdit() {
      try {
        await this.$axios.$put(
          `/slate-admin/grade/${this.fieldObj.id}/`,
          this.fieldObj
        )
        this.$emit('refresh')
        this.$nextTick(() => {
          this.$bvModal.hide(this.id)
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
