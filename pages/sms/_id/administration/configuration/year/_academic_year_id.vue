<template>
  <div>
    <!-- <BackwardNavigation /> -->

    <UtilsHeaderCard
      :title="cardTitle"
      :data="data"
      :display-key="['code', 'year_start', 'year_end']"
      :actions="headerActions"
      @edit="$bvModal.show('modal')"
      @delete="deleteAcademicYear(data)"
      @activate_academic_Year="setAcademicYear()"
    >
    </UtilsHeaderCard>

    <UtilsBaseCardTab>
      <UtilsCardTab title="Academic Periods">
        <UtilsFilterComponent @search-input="periodFilter = $event">
          <template #besideFilterButton>
            <BaseButton v-role="'admin'" @click="$refs.periodModal.show()"
              >Add Period</BaseButton
            >
          </template>
          <template #default="{ visualization }">
            <TableComponent
              v-if="visualization === 'list'"
              :items="periods"
              :fields="periodFields"
              pages="1"
              :filter="periodFilter"
              @row-clicked="onRowClicked"
            />
            <div v-else class="row">
              <div
                v-for="(value, index) in periods"
                :key="index"
                class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
              >
                <UtilsGridViewCard
                  :data="value"
                  :display-key="['name', 'code', 'start_date', 'end_date']"
                ></UtilsGridViewCard>
              </div>
            </div>
          </template>
        </UtilsFilterComponent>
      </UtilsCardTab>
      <UtilsCardTab title="Classes">
        <UtilsFilterComponent
          disable-visualization
          @search-input="classesFilter = $event"
        >
          <template #besideFilterButton>
            <BaseButton @click="$refs.classModal.show()">Add Class</BaseButton>
          </template>
          <template #default="{ visualization }">
            <TableComponent
              v-if="visualization === 'list'"
              :items="classes"
              :fields="classesField"
              pages="1"
              :filter="classesFilter"
            />
            <div v-else class="row">
              <div
                v-for="(value, index) in classes"
                :key="index"
                class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
              >
                <UtilsGridViewCard
                  :data="value"
                  :display-key="['name', 'grade', 'students', 'subjects']"
                ></UtilsGridViewCard>
              </div>
            </div>
          </template>
        </UtilsFilterComponent>
      </UtilsCardTab>
    </UtilsBaseCardTab>

    <b-modal
      ref="periodModal"
      title="Add New Academic Periods"
      centered
      ok-only
      ok-title="Save"
      @ok="handleOk"
    >
      <form @submit.stop.prevent="handleSubmit">
        <div class="form-group">
          <ValidationProviderWrapper
            name="Name"
            :rules="['required']"
            label="Name"
          >
            <input
              v-model="period.name"
              class="form-control ng-untouched ng-pristine ng-valid"
              placeholder="Name"
              type="text"
            />
          </ValidationProviderWrapper>
        </div>
        <div class="form-group">
          <ValidationProviderWrapper
            name="Code"
            :rules="['required']"
            :label="'Code'"
          >
            <input
              v-model="period.code"
              class="form-control ng-untouched ng-pristine ng-valid"
              placeholder="Code"
              type="text"
            />
          </ValidationProviderWrapper>
        </div>

        <div class="form-group">
          <ValidationProviderWrapper
            :name="'Academic Period Start'"
            :rules="['required']"
            :label="'Academic Period Start'"
          >
            <v-date-picker
              v-model="period.date_start"
              mode="date"
              :model-config="modelConfig"
            >
              <template #default="{ inputValue, inputEvents }">
                <input
                  class="form-control ng-untouched ng-pristine ng-valid"
                  placeholder="Academic Period Start"
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
              v-model="period.date_end"
              mode="date"
              :model-config="modelConfig"
            >
              <template #default="{ inputValue, inputEvents }">
                <input
                  class="form-control ng-untouched ng-pristine ng-valid"
                  placeholder="Academic Period End"
                  type="text"
                  :value="inputValue"
                  v-on="inputEvents"
                />
              </template>
            </v-date-picker>
          </ValidationProviderWrapper>
        </div>
      </form>
    </b-modal>

    <b-modal
      ref="classModal"
      title="Add New Class"
      centered
      ok-only
      ok-title="Save"
      @ok="handleOkForClasses"
    >
      <form @submit.stop.prevent="handleSubmitForClasses">
        <div class="form-group">
          <ValidationProviderWrapper
            name="Class Name"
            :rules="['required']"
            label="Class Name"
          >
            <input
              v-model="AClass.name"
              class="form-control ng-untouched ng-pristine ng-valid"
              placeholder="Class Name"
              type="text"
            />
          </ValidationProviderWrapper>
        </div>
        <div class="form-group">
          <ValidationProviderWrapper
            name="Class Code"
            :rules="['required']"
            :label="'Class Code'"
          >
            <input
              v-model="AClass.code"
              class="form-control ng-untouched ng-pristine ng-valid"
              placeholder="Class Code"
              type="text"
            />
          </ValidationProviderWrapper>
        </div>

        <div class="form-group">
          <ValidationProviderWrapper
            :name="'Class Location'"
            :rules="['required']"
            :label="'Class Location'"
          >
            <input
              v-model="AClass.hall"
              class="form-control ng-untouched ng-pristine ng-valid"
              placeholder="Class Location"
              type="text"
            />
          </ValidationProviderWrapper>
        </div>
        <div class="form-group">
          <ValidationProviderWrapper
            :name="'Class Theme'"
            :rules="['required']"
            :label="'Class Theme'"
          >
            <div class="row">
              <div class="col">
                <VSwatches
                  v-model="AClass.color"
                  popover-x="right"
                  swatches="text-advanced"
                ></VSwatches>
              </div>
            </div>
          </ValidationProviderWrapper>
        </div>
        <div class="form-group">
          <ValidationProviderWrapper
            :name="'Grade Level'"
            :rules="['required']"
            :label="'Grade Level'"
          >
            <select
              v-model="AClass.level"
              class="form-control ng-untouched ng-pristine ng-valid"
              placeholder="Class Code"
            >
              <option
                v-for="(grade, index) in gradeLevels"
                :key="index"
                :value="grade.id"
              >
                {{ grade.name }}
              </option>
            </select>
          </ValidationProviderWrapper>
        </div>
      </form>
    </b-modal>
    <!-- {{ data }} -->
    <PageConfigurationsYearAddEditModal
      title="Edit Academic Year"
      :school="school"
      :field="data"
      @refresh="$nuxt.refresh()"
    />
  </div>
</template>

<script lang="ts">
import mixin from '../mixin'
import modalMsgBox from '~/mixins/modalMsgBox'
import AcademicYearMixins from '~/mixins/SmsAcademicYearFunc'

export default mixin.extend({
  mixins: [mixin, modalMsgBox, AcademicYearMixins],
  async asyncData({ $axios, route, store }) {
    const school = store.getters['school/getSchoolByCode'](route.params.id)

    const { data } = await $axios.$get(
      `./slate-admin/year/${route.params.academic_year_id}/`
    )
    const GradeData = await $axios.$get(
      `/slate-admin/school/${school.id}/grades/`
    )
    return {
      headerActions: data.current_academic_year
        ? []
        : ['activate_academic_Year'],
      data,
      gradeLevels: GradeData.data,
      cardTitle: data.name,
      periods: data.periods,
      classes: data.classes,
      school,
    }
  },
  data() {
    return {
      data: {},
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
      cardTitle: '',
      gradeLevels: [],
      periods: [],
      periodFields: [
        { key: 'name', sortable: true },
        { key: 'code', sortable: true },
        { key: 'academic_year', sortable: true },
        { key: 'start_date', label: 'Period start', sortable: true },
        { key: 'end_date', label: 'Period end', sortable: true },
        // { key: 'status', sortable: true }
      ],
      classesField: [
        { key: 'name', sortable: true },
        { key: 'grade', sortable: true },
        { key: 'students', sortable: true },
        { key: 'subjects', sortable: true },
        { key: 'form_teacher', sortable: true },
      ],
      classes: [],

      period: {
        name: '',
        code: '',
        date_start: '',
        date_end: '',
      },
      AClass: {
        code: '',
        color: '',
        hall: '',
        level: '',
        name: '',
        year: '',
      },
      periodFilter: '',
      classesFilter: '',
    }
  },
  methods: {
    onRowClicked(e: any) {
      this.$router.push({
        name: 'sms-id-administration-configuration-period-academic_period_id',
        params: { academic_period_id: e.id, id: this.$route.params.id },
      })
    },
    handleOk(event: any) {
      event.preventDefault()
      this.handleSubmit()
    },
    handleOkForClasses(event: any) {
      event.preventDefault()
      this.handleSubmitForClasses()
    },
    async handleSubmit() {
      try {
        await this.$axios.$post(
          `/slate-admin/school/${this.school.id}/periods/`,
          {
            ...this.period,
            academic_year: this.$route.params.academic_year_id,
          }
        )

        await this.$nuxt.refresh()
        ;(this.$refs.periodModal as any).hide()
      } catch (e) {
        console.log(e)
      }
    },

    async handleSubmitForClasses() {
      try {
        await this.$axios.$post(
          `/slate-admin/school/${this.school.id}/class/`,
          {
            ...this.AClass,
            year: this.$route.params.academic_year_id,
          }
        )
        ;(this.$refs.classModal as any).hide()
        this.$nuxt.refresh()
      } catch (e) {
        console.log(e)
      }
    },

    async setAcademicYear() {
      const result = await this.showConfirmMessageBox(
        'Please Confirm you want set Academic Period'
      )
      if (result) {
        try {
          await this.$axios.$post(
            `slate-admin/year/${this.data.id}/set_current/`
          )
          this.$router.push({
            name: 'sms-id-administration-configuration-year',
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
})
</script>

<style lang="scss" scoped></style>
