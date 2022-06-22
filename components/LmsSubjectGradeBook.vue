<template>
  <div>
    <div class="justify-content-between align-items-center mx-0 my-2 py-1 row">
      <div class="col-4">
        <label class="form-control-label">Academic Period</label>
        <VSelect v-model="period" :options="periods" label="name"></VSelect>
      </div>
      <div class="col-4 text-right">
        <button
          class="btn btn-primary btn-borderless-primary"
          @click="$bvModal.show('modal')"
        >
          Add grade Entry
        </button>
      </div>
    </div>
    <GradeBookTable
      :table-data="tableData"
      :busy="tableBusy"
      @column-clicked="toRoute($event)"
    />
    <LmsAddEditGradeEntryModal />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tableData: {},
      tableBusy: true,
      periods: [{ id: 'all', name: 'All Academic Periods' }],
      period: {},
      gradeEntry: {
        entry: '',
        type: '',
        score: '',
      },
    }
  },
  watch: {
    async period(newVal) {
      if (newVal.id === 'all') {
        await this.getTableData('')
      } else {
        await this.getTableData(newVal.id)
      }
    },
  },
  async mounted() {
    await this.getPeriod()
    await this.getTableData('')
  },
  methods: {
    toRoute(event) {
      this.$router.push({
        name: 'sms-id-lms-subjects-subject-grade-book-grade_book',
        params: {
          subject: this.$route.params.subject,
          grade_book: event.id,
        },
        query: { _name: this.data.subject_name },
      })
    },
    async getTableData(period) {
      try {
        this.tableData = []
        this.tableBusy = true
        const { data } = await this.$axios.$get(
          `./schools/v2/class/subject/${this.$route.params.subject}/gradebook/?academic_period=${period}`
        )
        this.tableData = data
        this.tableBusy = false
      } catch (error) {
        console.log(error)
      }
    },
    async getPeriod() {
      const { data } = await this.$axios.$get(
        `./slate-admin/year/${this.$store.state.school.currentAcademicYear.id}/`
      )

      this.periods = [
        { id: 'all', name: 'All Academic Periods' },
        ...data.periods,
      ]
      if (this.periods.length > 0) {
        this.period = this.periods[0]
      }
      console.log(data)
    },
  },
}
</script>

<style lang="scss" scoped></style>
