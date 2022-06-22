<template>
  <div class="timetable-table-container timetable-table-overflow">
    <div
      v-if="$fetchState.pending"
      class="d-flex text-center justify-content-center"
    >
      <b-spinner
        style="width: 3rem; height: 3rem"
        label="Large Spinner"
        variant="primary"
      ></b-spinner>
    </div>

    <table v-else class="table timetable-table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th v-for="(period, index) in periods" :key="index" scope="col">
            <div class="time-details">
              <div class="time-label mb-1">{{ period.name }}</div>
              <div class="time-period">
                {{ formatTime(period.time_start) }} -
                {{ formatTime(period.time_end) }}
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(day, index) in days" :key="index">
          <th class="tt-day text-capitalize" scope="row">
            <div class="d-flex flex-column text-center">
              <span class="my-2">{{ day }}</span>
              <template v-if="!readOnly">
                <button
                  class="btn btn-borderless-primary btn-primary py-2 px-3"
                  @click="
                    $bvModal.show('modal'), (modalTitle = day.toUpperCase())
                  "
                >
                  Add
                </button>
              </template>
            </div>
          </th>
          <td v-for="(period, index2) in periods" :key="index2">
            <template v-if="findPeriod(timeTable[day], period.id)">
              <div
                class="tt-course-card"
                :style="{
                  color: findPeriod(timeTable[day], period.id).subject_color,
                }"
              >
                <div>
                  {{ findPeriod(timeTable[day], period.id).subject_name }}
                </div>
                <div
                  class="
                    d-flex
                    alight-items-center
                    justify-content-between
                    mt-2
                  "
                >
                  <div
                    class="tt-course-code"
                    :style="{
                      backgroundColor: findPeriod(timeTable[day], period.id)
                        .subject_color,
                    }"
                  >
                    {{ findPeriod(timeTable[day], period.id).subject_code }}
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="tt-course-card">
                <div
                  class="
                    d-flex
                    alight-items-center
                    justify-content-between
                    mt-2
                  "
                ></div>
              </div>
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <ModalWrapper :title="modalTitle" @show="getData()" @ok="handleOk">
      <ValidationObserver ref="form">
        <form @submit.stop.prevent="handleSubmit">
          <div v-for="(input, index) in field" :key="index">
            <div class="d-flex justify-content-end">
              <button
                v-if="index > 0"
                class="btn btn-borderless-danger btn-primary py-2 px-3"
                @click.prevent.stop="removeItem(index)"
              >
                Remove Item
              </button>
            </div>

            <div class="form-group">
              <ValidationProviderWrapper
                :name="'Select Subject'"
                :rules="['required']"
                :label="'Select Subject'"
              >
                <VSelect
                  v-model="input.subject"
                  label="subject"
                  :options="subjects"
                ></VSelect>
              </ValidationProviderWrapper>
            </div>

            <div class="form-group">
              <ValidationProviderWrapper
                :name="'Select Period'"
                :rules="['required']"
                :label="'Select Period'"
              >
                <VSelect
                  v-model="input.period"
                  :options="periodData"
                  label="name"
                  multiple
                ></VSelect>
              </ValidationProviderWrapper>
            </div>
          </div>
        </form>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-borderless-primary btn-primary px-3 py-2"
            @click="addItem()"
          >
            Add Item
          </button>
        </div>
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      periodData: [],
      periods: [],
      timeTable: [],
      modalTitle: '',
      subjects: [],
      field: [
        {
          subject: '',
          period: '',
        },
      ],
      days: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
    }
  },
  async fetch() {
    const data = await this.$axios.$get(
      `./schools/v2/class/${this.$route.params.class}/timetable/`
    )

    this.periods = data.periods.sort((a, b) => {
      const A = DateTime.fromISO(a.time_start)
      const B = DateTime.fromISO(b.time_end)
      return A.toMillis() - B.toMillis()
    })
    this.timeTable = data.timetable
  },
  methods: {
    removeItem(index) {
      this.field.splice(index, 1)
    },

    addItem() {
      this.field.push({ subject: '', period: '' })
    },
    findPeriod(object, id) {
      return object.find((item) => item.periods[0] === id)
    },
    formatTime(time) {
      return DateTime.fromISO(time).toFormat('hh:mm a')
    },
    async getData() {
      const school = this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )
      const { data: subjects } = await this.$axios.$get(
        `./slate-admin/class/${this.$route.params.class}`
      )

      const { data } = await this.$axios.$get(
        `./slate-admin/school/${school.id}/timetable/periods/?page=1&paginate=false`
      )

      this.subjects = subjects.subjects
      this.periodData = data
      //   this.periods = data.periods;
    },

    handleOk(event) {
      event.preventDefault()
      this.handleSubmit()
    },
    async handleSubmit() {
      // const school = this.$store.getters['school/getSchoolByCode'](
      //   this.$route.params.id
      // )

      const obj = this.field.map((item) => ({
        class_subject_id: item.subject.id,
        periods: item.period.map((item) => item.id),
      }))
      // console.log(obj)

      try {
        await this.$axios.$post(
          `/schools/v2/class/${this.$route.params.class}/timetable/`,
          {
            timetable: {
              [this.modalTitle.toLowerCase()]: obj,
            },
          }
        )
        // this.$emit('refresh')
        await this.$fetch()

        this.$nextTick(() => {
          this.$bvModal.hide('modal')
        })
        this.field = [{ subject: '', period: '' }]
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
