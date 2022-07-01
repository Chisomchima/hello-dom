<template>
  <div>
    <div class="row">
      <div class="col-12 mb-3">
        <div class="d-flex justify-content-between">
          <div class="page-heading mb-4">Imaging Work List</div>
          <div>
            <BaseButton
              class="btn-primary btn-lg"
              @click="$bvModal.show('modal')"
              >New imaging Order</BaseButton
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- <div class="col-md-12 mb-4">
        <div class="card">
          <div class="card-body">
            <DashboardEncounterFilters @filter="filter(1, $event)" />
          </div>
        </div>
      </div> -->
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
            @page-changed="filter($event, currentFilter)"
          />
        </UtilsFilterComponent>
      </div>
    </div>
    <DashboardModalAddImagingOrder @get-encounter="filter(1, {})" />
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun'
export default {
  mixins: [TableFunc],
  data() {
    return {
      busy: false,
      currentFilter: {},
      fields: [
        { key: 'img_obv.name', label: 'Observation', sortable: true },
        { key: 'patient.uhid', label: 'UHID', sortable: true },
        {
          key: 'img_order',
          label: 'Order By',
          formatter: (val, key, item) => {
            return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          },
          sortable: true,
        },
        {
          key: 'patient',
          label: 'Patient',
          sortable: true,
          formatter: (val) => {
            return val.firstname + ' ' + val.lastname
          },
        },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'dots', label: '', sortable: false },
      ],
    }
  },
  mounted() {
    this.filter(1, {})
  },
  methods: {
    async filter(page, e) {
      this.currentFilter = e
      try {
        this.busy = true
        const data = await this.$api.imaging.getObservationOrder({ ...e, page })
        this.items = data.results
        this.pages = data.total_pages
        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>