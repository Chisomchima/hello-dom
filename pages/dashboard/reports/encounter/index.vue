<template>
  <div>
    <div class="row">
      <div class="col-12 mb-2">
        <div class="d-flex justify-content-between align-items-center">
          <div class="page-heading mb-0">Encounter Reports</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 mb-4">
        <div class="card">
          <div class="card-body">
            <ReportsEncounterFilter @filter="filter(1, $event)" />
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <UtilsFilterComponent
          :disableSearch="true"
          disable-pagination
          :disable-visualization="true"
          search-placeholder="Search"
        >
          <template #besideFilterButton>
            <div class="d-flex align-items-center">
              <div class="mr-2 mt-1">
                <b-spinner
                  style="width: 1.7rem; height: 1.7rem"
                  v-if="downloading"
                  variant="primary"
                  label="Spinning"
                ></b-spinner>
              </div>
              <button @click="downloadEncReport" class="btn btn-primary">
                Download
              </button>
            </div>
          </template>
          <TableComponent
            :fields="fields"
            :pages="pages"
            :items="items"
            :busy="busy"
            @page-changed="filter($event, currentFilter)"
          >
          </TableComponent>
        </UtilsFilterComponent>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun'
import FilterLogic from '~/mixins/routeFiltersMixin'
export default {
  mixins: [TableFunc, FilterLogic],
  data() {
    return {
      currentFilter: {},
      downloading: false,
      fields: [
        {
          key: 'encounter_datetime',
          label: 'Date',
          sortable: true,
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
        },
        { key: 'encounter_id', label: 'Encounter ID', sortable: true },
        { key: 'patient.uhid', label: 'UHID', sortable: true },
        {
          key: 'patient',
          label: 'Patient',
          sortable: true,
          formatter: (val) => {
            return val.salutation + ' ' + val.firstname + ' ' + val.lastname
          },
        },
        {
          key: 'clinic.Department.display_name',
          label: 'Department',
          sortable: true,
        },
        { key: 'clinic.name', label: 'Clinic', sortable: true },
        {
          key: 'provider',
          label: 'Provider Name',
          sortable: true,
          formatter: (val) => {
            if (val.first_name || val.last_name) {
              return val.first_name + ' ' + val.last_name
            } else {
              return ''
            }
          },
        },
        { key: 'encounter_type', label: 'Encounter Type', sortable: true },

        { key: 'status', label: 'Status', sortable: true },
      ],
    }
  },
  methods: {
    async filter(page, e) {
      this.currentFilter = e
      try {
        // this.busy = true
        const data = await this.$api.reports.encounterReport({ ...e, page })
        this.items = data.results
        this.pages = data.total_pages

        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    async downloadEncReport() {
      this.downloading = true
      const response = await fetch(
        `${process.env.BASE_URL}encounters/reports/?department=${
          this.currentFilter.department
        }&clinic=${this.currentFilter.clinic}&provider=${
          this.currentFilter.provider
        }&status=${this.currentFilter.status}&encounter_id=${
          this.currentFilter.encounter_id
        }&to_excel=${true}&date_before=${
          this.currentFilter.date_before
        }&date_after=${this.currentFilter.date_after}`,
        {
          headers: {
            Authorization: `Token ${this.$store.state.auth.token}`,
          },
        }
      )
      if (response.status === 200) {
        const data = await response.blob()
        const objectURL = URL.createObjectURL(data)
        const link = document.createElement('a')
        link.download = `Encounter Report`
        link.href = objectURL
        this.downloading = false
        this.filter(1)
        link.click()
      } else if (response.status === 403) {
        this.downloading = false
        this.$toast({
          type: 'info',
          text: `You don't have the permission to perform this action`,
        })
      } else {
        this.downloading = false
        this.$toast({
          type: 'error',
          text: `An error occured`,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>