<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Report Card</div>
      <div class="d-flex align-items-center mb-2 w-50">
        <div class="mr-2 w-100">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <!-- <div class="col"> -->
                <label class="form-control-label">Academic Year</label>
                <VSelect
                  v-model="academicYearSelected"
                  class="bg-white"
                  label="name"
                  :options="academicYearDropdown"
                ></VSelect>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label class="form-control-label">Academic Period</label>
                <VSelect
                  v-model="academicPeriodSelected"
                  class="bg-white"
                  label="name"
                  :options="academicPeriodDropdown"
                ></VSelect>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <UtilsFilterComponent>
      <template #default>
        <!-- <pre>{{ visualization }}</pre> -->
        <TableComponent
          :fields="fields"
          :items="items"
          :pages="pages"
          :busy="busy"
          class="custom-table"
          @page-changed="pageChange"
          @row-clicked="onRowClicked"
        ></TableComponent>
      </template>
    </UtilsFilterComponent>
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  async asyncData({ store, route, $axios }) {
    const school = store.getters['school/getSchoolByCode'](route.params.id)
    const { data } = await $axios.$get(
      `./slate-admin/school/${school.id}/year/?paginate=false`
    )

    // set current academic year as default
    const academicYearSelected = data.find((year) => year.current_academic_year)

    const { data: data2 } = await $axios.$get(
      `./slate-admin/year/${academicYearSelected.id}`
    )

    return {
      academicYearDropdown: data,
      academicYearSelected,
      academicPeriodDropdown: data2.periods,
      academicPeriodSelected: data2.periods[0],
      school,
    }
    // console.log(data)
  },
  data() {
    return {
      academicYearDropdown: ['a', 'b', 'c'],
      academicPeriodDropdown: [],
      academicYearSelected: {},
      academicPeriodSelected: {},

      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        { key: 'number_approved', label: 'Number Approved', sortable: true },
        { key: 'school_class', label: 'School Class', sortable: true },
      ],
    }
  },
  watch: {
    async academicYearSelected(newValue) {
      this.busy = true
      try {
        const { data } = await this.$axios.$get(
          `./slate-admin/year/${newValue.id}`
        )
        this.items = this.academicPeriodDropdown = data.periods
        this.academicPeriodSelected = data.periods[0]
      } catch (err) {
        console.log(err)
      }
      this.busy = false
    },
    async academicPeriodSelected(newValue) {
      this.busy = true
      try {
        const data = await this.getReportCardData(newValue.id)
        this.items = data.data
        this.pages = data.pages
        this.busy = false
      } catch (err) {
        console.log(err)
      }
      this.busy = false
    },
  },
  async mounted() {
    await this.pageChange(1)
  },
  methods: {
    onRowClicked(e) {
      this.$router.push({
        name: 'sms-id-administration-configuration-report-card-report_card',

        params: { report_card: e.id, id: this.$route.params.id },
      })
    },

    async getReportCardData(id, page = 1) {
      try {
        const data = await this.$axios.$get(
          `./slate-admin/period/${id}/report-card/batch/?page=${page}`
        )
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async pageChange(e) {
      this.busy = true
      const data = await this.getReportCardData(
        this.academicPeriodSelected.id,
        e
      )
      this.items = data.data
      this.pages = data.pages
      this.busy = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
