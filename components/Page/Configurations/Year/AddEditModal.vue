<template>
  <ModalWrapper not-scrollable :title="title" @ok="handleOk($event)">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <ValidationProviderWrapper
          :name="'Name'"
          :rules="['required']"
          :label="'Name'"
        >
          <input
            v-model="fieldObj.name"
            class="form-control ng-untouched ng-pristine ng-valid"
            placeholder="Name"
            type="text"
          />
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
          :name="'Academic Year Start'"
          :rules="['required']"
          :label="'Academic Year Start'"
        >
          <div>
            <Calendar
              v-model="fieldObj.year_start"
              date-format="dd/mm/yy"
              :show-icon="true"
            />
          </div>
        </ValidationProviderWrapper>
      </div>
      <div class="form-group">
        <ValidationProviderWrapper
          :name="'Academic Year End'"
          :rules="['required']"
          :label="'Academic Year End'"
        >
          <div>
            <Calendar
              v-model="fieldObj.year_end"
              date-format="dd/mm/yy"
              :show-icon="true"
            />
          </div>
        </ValidationProviderWrapper>
      </div>
    </form>
  </ModalWrapper>
</template>

<script>
import Calendar from 'primevue/calendar'
import { DateTime } from 'luxon'
import AddEditFunction from '~/mixins/AddEditModal'

export default {
  components: {
    Calendar,
  },
  mixins: [AddEditFunction],
  data() {
    return {
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD',
        // Uses 'iso' if missing
      },

      fieldObj: {
        name: '',
        code: '',
        year_start: '',
        year_end: '',
      },
    }
  },
  methods: {
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

      const yearStartDate = DateTime.fromFormat(
        this.fieldObj.year_start,
        'dd/mm/yy'
      ).toFormat('yyyy-mm-dd')

      const yearEndDate = DateTime.fromFormat(
        this.fieldObj.year_end,
        'dd/mm/yy'
      ).toFormat('yyyy-mm-dd')

      this.fieldObj.year_start = yearStartDate
      this.fieldObj.year_end = yearEndDate

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
      const yearStartDate = DateTime.fromFormat(
        this.fieldObj.year_start,
        'dd/mm/yy'
      ).toFormat('yyyy-mm-dd')

      const yearEndDate = DateTime.fromFormat(
        this.fieldObj.year_end,
        'dd/mm/yy'
      ).toFormat('yyyy-mm-dd')

      this.fieldObj.year_start = yearStartDate
      this.fieldObj.year_end = yearEndDate

      try {
        await this.$axios.$put(
          `/slate-admin/year/${this.fieldObj.id}/`,
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
  },
}
</script>

<style lang="scss" scoped></style>
