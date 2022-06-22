<template>
  <ModalWrapper id="week-modal" :title="title" not-scrollable @ok="handleOk($event)">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <ValidationProviderWrapper
          name="Week Name"
          :rules="['required']"
          label="Week Name"
        >
          <input
            v-model="fieldObj.name"
            class="form-control ng-untouched ng-pristine ng-valid"
            placeholder="Week Name"
            type="text"
          />
        </ValidationProviderWrapper>
      </div>
      <div class="form-group">
        <ValidationProviderWrapper
          :name="'Week Start'"
          :rules="['required']"
          :label="'Week Start'"
        >
          <v-date-picker
            v-model="fieldObj.week_start"
            mode="date"
            :model-config="modelConfig"
          >
            <template #default="{ inputValue, inputEvents }">
              <input
                class="form-control ng-untouched ng-pristine ng-valid"
                placeholder="Week Start"
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
          :name="'Week End'"
          :rules="['required']"
          :label="'Week End'"
        >
          <v-date-picker
            v-model="fieldObj.week_end"
            mode="date"
            :model-config="modelConfig"
          >
            <template #default="{ inputValue, inputEvents }">
              <input
                class="form-control ng-untouched ng-pristine ng-valid"
                placeholder="Week End"
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
      fieldObj: {
        name: '',
        week_start: '',
        week_end: '',
        code: '',
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
      try {
        await this.$axios.$post(
          `/slate-admin/period/${this.$route.params.academic_period_id}/week/`,
          {
            weeks: [
              {
                ...this.fieldObj,
              },
            ],
          }
        )

        this.$nextTick(() => {
          this.$bvModal.hide('week-modal')
        })
        this.$emit('refresh')
        this.resetForm()
      } catch (e) {
        console.log(e)
      }
    },
    async handleEdit() {
      
      // debugger
      try {
        await this.$axios.$put(
          `/slate-admin/period/${this.fieldObj.id}/`,
          this.fieldObj
        )
        this.$emit('refresh')
        this.$nextTick(() => {
          this.$bvModal.hide('week-modal')
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
