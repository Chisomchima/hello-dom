<template>
  <div class="row mt-4">
    <div class="col-xl-8 order-last order-xl-first">
      <ValidationObserver ref="form">
        <div class="mb-2">
          <ValidationProviderWrapper name="Title" :rules="['required']">
            <div class="row">
              <div class="col">
                <BaseInput
                  v-model="lesson.name"
                  placeholder="Lesson Name"
                ></BaseInput>
              </div>
            </div>
          </ValidationProviderWrapper>
        </div>
        <div class="mb-2">
          <ValidationProviderWrapper name="Description" :rules="['required']">
            <textarea
              v-model="lesson.description"
              class="form-control"
              placeholder="Lesson Description"
            ></textarea>
            <small class="text-light"
              >Let students know a little about the lesson in 500 characters or
              less.</small
            >
          </ValidationProviderWrapper>
        </div>
        <div class="row">
          <div class="col-md-6 mb-2">
            <label class="form-control-label">Week</label>
            <VSelect v-model="lesson.week" label="week_name" :options="weeks" />
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper
              name="Available Date"
              :rules="['required']"
            >
              <v-date-picker
                v-model="lesson.available_date"
                mode="date"
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
        </div>
      </ValidationObserver>
      <!-- <div class="mb-2">
        <label class="form-control-label">Additional Classes</label>
        <select class="form-control w-100">
          <option>Select Classes</option>
        </select>
      </div> -->
    </div>
    <LmsLinkLessonModal />
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  props: {
    lessonDetail: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      lesson: {
        name: '',
        description: '',
        week: '',
        available_date: '',
      },
      weeks: [],
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
    }
  },
  watch: {
    lesson: {
      handler(newVal) {
        this.$emit('lesson:details', newVal)
      },
      deep: true,
    },
    'lesson.week': {
      handler(newValue) {
        if (newValue.week_start) {
          this.lesson.available_date = newValue.week_start
        }
      },
    },
    lessonDetail: {
      handler(newVal) {
        if (Object.values(newVal).length > 0) {
          this.lesson = newVal
          if (newVal.title) {
            this.lesson.name = newVal.title
          }
          const date = DateTime.fromISO(
            newVal.available_date.split(' ')[0]
          ).toISODate()
          this.lesson.available_date = date
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.getWeek()
  },
  methods: {
    async getWeek() {
      const { data } = await this.$axios.$get(
        `schools/v2/academic_year/${this.$store.state.school.currentAcademicYear.id}/weeks/`
      )
      this.weeks = data
    },
  },
}
</script>

<style lang="scss" scoped></style>
