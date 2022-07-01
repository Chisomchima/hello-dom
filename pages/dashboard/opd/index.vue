<template>
  <div>
    <div class="row">
      <div class="col-12 mb-3">
        <div class="d-flex justify-content-between">
          <div class="page-heading mb-4">Encounter Work list</div>
          <div>
            <BaseButton class="btn-primary btn-lg" @click="$bvModal.show('Add-encounter')">New Encounter</BaseButton>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 mb-4">
        <div class="card">
          <div class="card-body">
            <DashboardEncounterFilters @filter="filter(1, $event)" />
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <UtilsFilterComponent
          disable-pagination
          :disable-visualization="true"
          search-placeholder="Search"
        >
          <TableComponent
            :fields="fields"
            :pages="pages"
            :items="items"
            :busy="busy"
            :dropdown-item="['nurse_vital']"
            @page-changed="filter($event, currentFilter)"
            @row-clicked="viewPatientData"
          />
        </UtilsFilterComponent>
      </div>
    </div>
    <DashboardModalNewEncounter @get-encounter="filter(1,{})" />
  </div>
</template>

<script>
import {DateTime} from 'luxon'
import TableFunc from '~/mixins/TableCompFun'
export default {
  mixins: [TableFunc],
  data() {
    return {
      busy: false,
      currentFilter: {},
      fields: [
        { key: 'encounter_id', label: 'Encounter ID', sortable: true },

        {
          key: 'encounter_datetime',
          label: 'Date',
          sortable: true,
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
          },
        },
        {
          key: 'clinic.Department.display_name',
          label: 'Department',
          sortable: true,
        },
        { key: 'clinic.name', label: 'Clinic', sortable: true },
        { key: 'patient.uhid', label: 'UHID', sortable: true },
        {
          key: 'provider',
          label: 'Provider Name',
          sortable: true,
          formatter: (val) => {
            if (val.first_name || val.last_name) {
              return val.first_name + ' ' + val.last_name
            }
            else {
              return ''
            }
          },
        },
        { key: 'encounter_type', label: 'Encounter Type', sortable: true },
        {
          key: 'patient',
          label: 'Patient',
          sortable: true,
          formatter: (val) => {
            return val.firstname + ' ' + val.lastname
          },
        },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'dots', label:'', sortable: false },
      ],
    }
  },
  methods: {
    async filter(page, e) {
      this.currentFilter = e
      try {
        this.busy = true
        const data = await this.$api.encounter.getEncounter({ ...e, page })
        this.items = data.results
        this.pages = data.total_pages
        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    viewPatientData(e) {
      this.$router.push(`/dashboard/opd/${e.id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>