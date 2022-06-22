<template>
  <ModalWrapper :title="title" @ok="handleOk" @show="getPeriod">
    <ValidationObserver ref="form">
      <form>
        <div class="form-group">
          <ValidationProviderWrapper
            :name="'Grade Book Entry'"
            :rules="['required']"
          >
            <BaseInput v-model="gradeBook.name"></BaseInput>
          </ValidationProviderWrapper>
        </div>
        <div class="form-group">
          <ValidationProviderWrapper :name="'Entry Type'" :rules="['required']">
            <BaseInput v-model="gradeBook.type"></BaseInput>
          </ValidationProviderWrapper>
        </div>
        <div class="form-group">
          <ValidationProviderWrapper
            :name="'Obtainable Score'"
            :rules="['required']"
          >
            <BaseInput
              v-model="gradeBook.max_obtainable_score"
              type="number"
            ></BaseInput>
          </ValidationProviderWrapper>
        </div>

        <div class="form-group">
          <ValidationProviderWrapper
            :name="'Academic Period'"
            :rules="['required']"
          >
            <VSelect
              v-model="gradeBook.period"
              :options="periods"
              label="name"
            ></VSelect>
          </ValidationProviderWrapper>
        </div>
      </form>
    </ValidationObserver>
  </ModalWrapper>
</template>

<script>
export default {
  props: {
    fields: {
      type: [Array, Object],
      required: false,
      default: () => ({}),
    },
    title: {
      type: String,
      required: true,
      default: 'Add Grade Entry',
    },
  },
  data() {
    return {
      periods: [],
      gradeBook: {
        name: '',
        max_obtainable_score: '',
        period: '',
        type: '',
      },
    }
  },
  watch: {
    fields: {
      handler() {
        if (Object.values(this.fields).length > 0) {
          this.gradeBook = this.fields
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleOk(event) {
      event.preventDefault()
      if (Object.values(this.fields).length > 0) {
        this.handleEdit()
      } else {
        this.handleSubmit()
      }
    },
    async handleSubmit() {
      try {
        const { data } = await this.$axios.$get(
          `schools/v2/class/subject/${this.$route.params.subject}/students/`
        )
        const res = await this.$axios.$post(
          `schools/v2/class/subject/${this.$route.params.subject}/gradebook/`,
          {
            ...this.gradeBook,
            scores: data.scores,
            period_id: this.gradeBook.period.id,
          }
        )
        const breadcrumbName = this.gradeBook.name
        this.gradeBook = {}
        this.$refs.form.reset()
        this.$bvModal.hide('modal')
        this.$router.push({
          name: 'sms-id-lms-subjects-subject-grade-book-grade_book',
          params: {
            subject: this.$route.params.subject,
            grade_book: res.data.entry.id,
          },
          query: {
            _name: breadcrumbName,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
    async handleEdit() {
      try {
        const { data: score } = await this.$axios.$get(
          `schools/v2/class/subject/${this.$route.params.subject}/students/`
        )
        await this.$axios.$put(
          `./schools/v2/class/subject/${this.$route.params.subject}/gradebook/${this.$route.params.grade_book}/`,
          {
            ...this.gradeBook,
            scores: score.scores,
            // period_id: this.gradeBook.period.id
          }
        )
        this.gradeBook = {}
        this.$refs.form.reset()
        this.$bvModal.hide('modal')

        this.$emit('refresh')
      } catch (error) {
        console.log(error)
      }
    },
    async getPeriod() {
      const { data } = await this.$axios.$get(
        `./slate-admin/year/${this.$store.state.school.currentAcademicYear.id}/`
      )

      this.periods = [
        // { id: 'all', name: 'All Academic Periods' },
        ...data.periods,
      ]
    },
  },
}
</script>

<style lang="scss" scoped></style>
