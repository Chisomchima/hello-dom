<template>
  <div>
    <div class="row">
      <div class="col-12 mb-3">
        <div class="d-flex justify-content-between">
          <div class="page-heading mb-4">Prescriptions</div>
          <div>
            <BaseButton
              class="btn-primary btn-lg"
              @click="$bvModal.show('modal')"
              >New prescription</BaseButton
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
            @cancel="cancelImaging($event)"
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
    <div>
      <DashboardModalImagingDiagnosis
        @page-changed="getICD10($event, searchParam)"
        @refresh="getICD10(1, searchParam)"
      />
    </div>
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
import modalMsgBox from '~/mixins/modalMsgBox'
export default {
  mixins: [TableFunc, FilterLogic, modalMsgBox],
  data() {
    return {
      modalData: {},
      busy: false,
      currentPage: 1,
      currentFilter: {},
      fields: [
        {
          key: 'created_at',
          label: 'Date',
          sortable: true,
        },
        {
          key: 'created_by',
          label: 'Ordered by',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },
        {
          key: 'prc_id',
          label: 'PRC ID',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },

        {
          key: 'source',
          label: 'Source',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },
        {
          key: 'prescribing_physician',
          label: 'Prescribing physician',
          sortable: true,
          formatter: (val) => {
            return (val.salutation ? val.salutation : '') + ' ' + val.firstname + ' ' + val.lastname
          },
        },
        { key: 'store', label: 'Observation', sortable: true },
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
        const data = await this.$api.imaging.getObservationOrder({
          ...e,
          page,
          worklist: true,
        })
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

    async cancelImaging(e) {
      const result = await this.showDeleteMessageBox(
        'Do you want to cancel Imaging Order'
      )
      try {
        if (result) {
          await this.$api.imaging.patchObservationOrder(e.id, {
            status: 'CANCELLED',
          })
          this.filter(this.currentPage,this.currentFilter);
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>