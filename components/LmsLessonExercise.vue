<template>
  <div class="row mt-4">
    <div class="col-xl-6">
      <div class="mb-2">
        <ValidationProviderWrapper name="Exercise Name" :rules="['required']">
          <BaseInput
            v-model="dataField.name"
            placeholder="Exercise Name"
          ></BaseInput>
        </ValidationProviderWrapper>
      </div>
      <div class="mb-2">
        <ValidationProviderWrapper
          name="Exercise Description"
          :rules="['required']"
        >
          <textarea
            v-model="dataField.description"
            class="form-control"
            placeholder="Description"
          ></textarea>
          <small class="text-light"
            >Let students know a little about the lesson in 500 characters or
            less.</small
          >
        </ValidationProviderWrapper>
      </div>
    </div>
    <div class="col-12">
      <hr />
    </div>
    <div class="col-xl-6">
      <div class="row">
        <div class="col-md-6 mb-2">
          <ValidationProviderWrapper
            name="Durations(mins)"
            :rules="['required']"
          >
            <BaseInput
              v-model.number="dataField.duration"
              type="number"
            ></BaseInput>
          </ValidationProviderWrapper>
        </div>
        <div class="col-md-6 mb-2">
          <ValidationProviderWrapper
            name="Available Date"
            :rules="['required']"
            label="Available Date"
          >
            <v-date-picker
              v-model="dataField.available_date"
              mode="date"
              popover-align="center"
              popover-placement="bottom"
              :model-config="modelConfig"
              class=""
            >
              <template #default="{ inputValue, togglePopover }">
                <div class="d-flex">
                  <button
                    class="btn btn-borderless-primary btn-primary rounded-0"
                    @click="togglePopover()"
                  >
                    <b-icon
                      icon="calendar2-event-fill"
                      aria-label="Help"
                    ></b-icon>
                  </button>
                  <input
                    :value="inputValue"
                    class="form-control ng-valid ng-dirty ng-touched"
                  />
                </div>
              </template>
            </v-date-picker>
          </ValidationProviderWrapper>
        </div>
        <div class="col-md-6 mb-2">
          <ValidationProviderWrapper
            name="Due Date"
            :rules="['required']"
            label="Due Date"
          >
            <v-date-picker
              v-model="dataField.due_date"
              mode="date"
              popover-align="center"
              popover-placement="bottom"
              :model-config="modelConfig"
              class=""
            >
              <template #default="{ inputValue, togglePopover }">
                <div class="d-flex">
                  <button
                    class="btn btn-borderless-primary btn-primary rounded-0"
                    @click="togglePopover()"
                  >
                    <b-icon
                      icon="calendar2-event-fill"
                      aria-label="Help"
                    ></b-icon>
                  </button>
                  <input
                    :value="inputValue"
                    class="form-control ng-valid ng-dirty ng-touched"
                  />
                </div>
              </template>
            </v-date-picker>
          </ValidationProviderWrapper>
        </div>
        <div class="col-md-6 mb-2">
          <ValidationProviderWrapper name="Full Score" :rules="['required']">
            <BaseInput
              v-model.number="dataField.full_score"
              type="number"
            ></BaseInput>
          </ValidationProviderWrapper>
        </div>
        <div class="col-md-6 mb-2">
          <label class="form-control-label">Quiz Mode</label>
          <select v-model="dataField.quiz_mode" class="form-control w-100">
            <option value="examination">Examination</option>
            <option value="assessment">Assessment</option>
          </select>
        </div>
        <div class="col-md-6 mb-2">
          <label class="form-control-label">Quiz Type</label>
          <select v-model="dataField.quiz_type" class="form-control w-100">
            <option value="essay">Essay</option>
            <option value="QA">Question & Answer</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    exerciseDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD' // Uses 'iso' if missing
      },
      dataField: {
        available_date: '',
        description: '',
        due_date: '',
        duration: '',
        essay_item: {
          essay_sample_url: '',
          essay_description_item: '',
          file_name: ''
        },
        full_score: '',
        name: '',
        quiz_mode: '',
        quiz_type: '',
        sections: []
      }
    }
  },
  watch: {
    dataField: {
      handler(newVal) {
        this.$emit('exercise:details', newVal)
      },
      deep: true
    },
    exerciseDetail: {
      handler(newVal) {
        if (Object.values(newVal).length > 0) {
          this.dataField = newVal
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
