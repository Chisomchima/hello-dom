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
      <div class="col-md-12 mb-4">
        <div class="card">
          <div class="card-body">
            <DashboardImagingFilters @filter="filter(currentPage, $event)" />
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
            @page-changed="filter($event, currentFilter)"
          >
            <template #status="{ data }">
              <template v-if="data.item.status === 'NEW'">
                <button
                  :disabled="data.item.bill.cleared_status !== 'CLEARED'"
                  class="btn btn-outline-primary btn-sm"
                  @click="captureImaging(data.item)"
                >
                  Capture
                </button>
              </template>
              <template v-if="data.item.status === 'CAPTURED'">
                <button
                  :disabled="data.item.bill.cleared_status !== 'CLEARED'"
                  class="btn btn-outline-warning btn-sm"
                  @click="captureReport(data.item)"
                >
                  Report
                </button>
              </template>

              <template v-if="data.item.status === 'AWAITING_APPROVAL'">
                <button
                  class="btn btn-sm btn-outline-info text-nowrap"
                  @click="awaitApproval(data.item)"
                >
                  AWAITING APPROVAL
                </button>
              </template>
            </template>
          </TableComponent>
        </UtilsFilterComponent>
      </div>
    </div>
    <DashboardModalAddImagingOrder
      @refresh="filter(currentPage, currentFilter)"
    />
    <DashboardModalImagingOrderCapture
      :data="modalData"
      @hide="modalData = {}"
      @refresh="filter(currentPage, currentFilter)"
    />
    <DashboardModalImagingOrderReport
      :data="modalData"
      @hide="modalData = {}"
      @refresh="filter(currentPage, currentFilter)"
    />

    <DashboardModalImagingOrderAwaitingApproval
      :data="modalData"
      @hide="modalData = {}"
      @refresh="filter(currentPage, currentFilter)"
    />
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
      modalData: {},
      busy: false,
      currentPage: 1,
      currentFilter: {},
      fields: [
        {
          key: 'img_order.ordered_datetime',
          label: 'Date',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
          sortable: true,
        },
        {
          key: 'img_order.img_id',
          label: 'ASN',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },
        {
          key: 'img_order.service_center.name',
          label: 'Service Center',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },

        {
          key: 'img_order.patient.uhid',
          label: 'UHID',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },
        {
          key: 'patient',
          label: 'Patient',
          sortable: true,
          formatter: (val) => {
            return val.salutation + ' ' + val.firstname + ' ' + val.lastname
          },
        },
        { key: 'img_obv.name', label: 'Observation', sortable: true },
        {
          key: 'img_order',
          label: 'Order By',
          formatter: (val, key, item) => {
            return val.ordered_by.first_name + ' ' + val.ordered_by.first_name
          },
          sortable: true,
        },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'dots', label: '', sortable: false },
      ],
    }
  },
  // mounted() {
  //   // this.filter(1, {})
  // },
  methods: {
    async filter(page, e) {
      this.currentFilter = e
      this.currentPage = page
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

    captureImaging(e) {
      this.modalData = e
      this.$bvModal.show('imaging_order_capture_id')
    },
    captureReport(e) {
      this.modalData = e
      this.$bvModal.show('imaging_order_report_id')
    },

    awaitApproval(e) {
      this.modalData = e
      this.$bvModal.show('imaging_order_awaiting_approval')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>