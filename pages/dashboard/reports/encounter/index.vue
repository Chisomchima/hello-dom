<template>
  <div>
    <BackwardNavigation />
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
          :disablePagination="false"
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
              <button
              @click="downloadEncReport"
                class="btn btn-sm btn-outline-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M763.024 260C718.4 141.568 622.465 66.559 477.569 66.559c-184.384 0-313.392 136.912-324.479 315.536C64.178 410.527.002 501.215.002 603.935c0 125.744 98.848 231.968 215.823 231.968h28.448c17.664 0 32-14.32 32-32s-14.336-32-32-32h-28.448c-82.304 0-152.832-76.912-152.832-167.968c0-80.464 56.416-153.056 127.184-165.216l29.04-5.008l-2.592-29.344l-.24-.368c.016-155.872 102.607-273.44 261.184-273.44c127.104 0 198.513 62.624 231.553 169.44l6.832 22.032l23.072.497c118.864 2.496 223.088 98.944 223.088 218.784c0 109.056-72.272 230.592-181.713 230.592h-9.104c-17.664 0-32 14.32-32 32s14.336 32 32 32v-.096c160-4.224 252.24-157.088 252.24-294.496c-.032-147.728-115.792-265.743-260.512-281.312zM646.337 775.47c-8.944-9.344-23.407-9.345-32.335-.001l-70.384 77.648V530.973c0-17.664-14.336-32-32-32s-32 14.336-32 32v322.432l-68.112-75.935c-8.944-9.344-23.44-11.344-32.368-2l-8.065 4.416c-8.944 9.376-8.944 24.48 0 33.823l115.504 127.744c.16.16.193.368.336.528l8.096 8.464c4.496 4.689 10.368 7.01 16.288 6.977c5.872.032 11.776-2.288 16.225-6.977l8.095-8.464c.16-.16.24-.335.368-.528L654.417 811.71c8.945-9.344 8.945-20.447 0-29.823z"
                  />
                </svg>
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
export default {
  mixins: [TableFunc],
  data() {
    return {
      currentFilter: {
      },
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
        {
          key: 'acknowledged_by',
          label: 'Acknowleged by',
          sortable: true,
          formatter: (val) => {
            if (val.first_name || val.last_name) {
              return val.first_name + ' ' + val.last_name
            } else {
              return ''
            }
          },
        },
        {
          key: 'acknowledged_at',
          label: 'Date acknowledged',
          sortable: true,
        },
        {
          key: 'signed_date',
          label: 'Signed date',
          formatter: (value) => {
            if (value != null) {
              return DateTime.fromISO(value).toLocaleString(
                DateTime.DATETIME_SHORT
              )
            } else {
              return ''
            }
          },
          sortable: true,
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
        this.busy = true
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
      if(this.items.length > 0){
        this.downloading = true
        let filter = this.currentFilter
        filter.to_excel = true

        console.log(filter)

        if(filter.department.length < 1){
          delete filter.department
        }

        if(filter.clinic.length < 1){
          delete filter.clinic
        }
        if(filter.provider.length < 1){
          delete filter.provider
        }
        let download_string = new URLSearchParams(filter).toString()
      const response = await fetch(
        `${process.env.BASE_URL}encounters/reports/?${download_string}}`,
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
        // this.filter(1)
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
      }
      else{
        this.$toast({
          type: 'info',
          text: `No report to download`,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>