<template>
  <div>
    <UtilsFilterComponent disable-visualization disable-pagination>
      <template #besideFilterButton>
        <BaseButton
          class="btn-outline-primary"
          @click="$bvModal.show('add_imaging')"
          >New Imaging</BaseButton
        >
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
          @page-changed="pageChange"
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
      </template>
    </UtilsFilterComponent>
    <DashboardModalAddPatientImagingOrder
      :data="data"
      @refresh="pageChange()"
    />
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
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
  async mounted() {
    await this.pageChange(1)
  },
  methods: {
    async pageChange(page = 1) {
      try {
        this.busy = true
        const data = await this.$api.imaging.getObservationOrder({
          patient_uhid: this.data.uhid,
          page,
        })
        this.items = data.results
        this.pages = data.total_pages
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    onRowClicked(e) {
      this.$router.push({
        name: 'dashboard-opd-id',
        params: {
          id: e.id,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>