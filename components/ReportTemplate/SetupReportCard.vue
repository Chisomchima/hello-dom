<template>
  <div>
    <ModalWrapper
      :title="title"
      @ok="handleOk"
      submitTitle="Save"
      @show="getData"
    >
      <ValidationObserver ref="form">
        <form class="w-100">
          <div class="row">
            <div class="col-12 mb-2">
              <ValidationProviderWrapper
                name="Report Card Name"
                :rules="['required']"
              >
                <BaseInput
                  v-model="reportSetup.name"
                  :placeholder="'Enter Report Card Name'"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-12 mb-2">
              <ValidationProviderWrapper
                name="Report Card Template"
                :rules="['required']"
              >
                <VSelect
                  v-model="reportSetup.card_template_id"
                  :options="card_templates"
                  :reduce="(options) => options.template_id"
                  label="name"
                  :loading="otherData"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-12 mb-2">
              <ValidationProviderWrapper
                name="Academic Year"
                :rules="['required']"
              >
                <VSelect
                  v-model="reportSetup.academic_year_id"
                  :options="academic_years"
                  :reduce="(options) => options.id"
                  label="name"
                  :loading="otherData"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-12 mb-2">
              <ValidationProviderWrapper
                name="Report Academic Period"
                :rules="['required']"
              >
                <VSelect
                  v-model="reportSetup.academic_period_id"
                  label="name"
                  :reduce="(options) => options.id"
                  :loading="otherData || loading"
                  :options="academic_periods"
                />
              </ValidationProviderWrapper>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    title: {
      type: String,
      default: 'Create Report Card ',
      required: true,
    },
  },
  data() {
    return {
      academic_years: [],
      card_templates: [],
      academic_periods: [],
      loading: false,
      otherData: false,

      reportSetup: {
        name: '',
        academic_year_id: '',
        academic_period_id: '',
        card_template_id: '',
      },
    }
  },
  watch: {
    async 'reportSetup.academic_year_id'(newVal) {
      this.loading = true
      try {
        const { data } = await this.$axios.$get(`./slate-admin/year/${newVal}/`)
        this.academic_periods = data.periods
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },

    reportSetup: {
      handler(newVal) {
        this.$emit('report-setup-input', newVal)
      },
      deep: true,
    },
  },
  mounted() {
    if (Object.values(this.fields).length > 0) {
      this.reportSetup = { ...this.fields }
    }
  },
  methods: {
    handleOk(e) {
      e.preventDefault()
      if (Object.values(this.fields).length <= 0) {
        this.submit()
      } else {
        console.log('update')
      }
    },
    async getData() {
      this.otherData = true
      try {
        const school = this.$store.getters['school/getSchoolByCode'](
          this.$route.params.id
        )

        const promises = [
          this.$axios.$get(
            `./slate-admin/school/${school.id}/year/?paginate=false`
          ),
          this.$axios.$get(
            `./slate-admin/class/${this.$route.params.class}/card_templates/`
          ),
        ]
        const data = await Promise.all(promises)
        this.academic_years = data[0].data
        this.card_templates = data[1].data
        this.otherData = false
      } catch (error) {
        this.otherData = false
        console.log(error)
      }
    },
    async submit() {
      try {
        if (!(await this.checkFormValidity())) {
          return
        }
        const { data } = await this.$axios.$post(
          `/schools/v2/class/${this.$route.params.class}/report_card/batch/`,
          this.reportSetup
        )
        this.$router.push({
          name: 'sms-id-lms-classes-class-report-card-batch',
          params: {
            batch: data.batch_id,
          },
          query: { _name: this.reportSetup.name },
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
