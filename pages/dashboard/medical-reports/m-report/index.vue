<template>
  <div>
    <div class="row">
      <div class="col-12 mb-2">
        <div class="d-flex justify-content-between align-items-center">
          <div class="page-heading mb-0">Medical Reports</div>
          <div>
            <BaseButton
              class="btn-primary btn-lg"
              @click="$bvModal.show('Add-Report')"
              >New Medical Report</BaseButton
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb-4">
        <div class="card">
          <div class="card-body">
            <DashboardMedicalFilter @filter="filter(1, $event)" />
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
            :dropdown-item="['cancel']"
            @page-changed="filter($event, currentFilter)"
            @row-clicked="ViewData"
            @cancel="cancel($event)"
          >
          </TableComponent>
        </UtilsFilterComponent>
      </div>
    </div>
    <MedicalReportsModalNewReport @get-encounter="filter(1, {})" />
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun'
import FilterLogic from '~/mixins/routeFiltersMixin'
export default {
  mixins: [TableFunc, FilterLogic],
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'package.bill_item_code',
          label: 'Order Number',
          sortable: true,
        },
        {
          key: 'package.name',
          label: 'Medical Report',
          sortable: true,
        },
        {
          key: 'service_center.name',
          label: 'Service Center',
          sortable: true,
        },
        {
          key: 'package.category.name',
          label: 'Category',
          sortable: true,
        },
        {
          key: 'reported_by.email',
          label: 'Reported By',
          sortable: true,
        },
        { key: 'status', label: 'Status', sortable: true },
        {
          label: '',
          key: 'dots',
        },
      ],
      currentFilter: {},
      busy: false,
    }
  },
  async mounted() {
    await this.filter()
  },
  methods: {
    async filter(page, e) {
      console.log(e, 'evenett')
      if (e) {
        this.currentFilter = e
        this.busy = true
        try {
          console.log(this.currentFilter, 'event')
          const data = await this.$api.medicalReport.getOrder({ ...e, page })
          this.items = data.results
          this.pages = data.total_pages
          this.busy = false
        } catch (error) {
          this.busy = false
        } finally {
          this.busy = false
        }
      }
    },
    ViewData(e) {
      if (e.bill.cleared_status === 'CLEARED') {
        this.$router.push(`/dashboard/medical-reports/m-report/${e.id}/`)
      } else {
        this.$toast({
          type: 'info',
          text: 'Bill not cleared',
        })
      }
      // if (e.status === 'NS') {
      //   this.$router.push(`/dashboard/opd/${e.id}`)
      // }
      // else {
      //   this.$toast({
      //     type: 'warning',
      //     text: 'Nurses are yet to take vitals'
      //   });
      // }
    },
    async cancel(e) {
      try{
        await this.$api.medicalReport.cancelOrder(e.id, { id: e.id })
      } catch (err){
        console.log(err)
      }
      
    },
    // addVitals(e) {
    //   this.tempEncounterData = e
    //   this.$bvModal.show('addvital')
    // },
  },
}
</script>

<style lang="scss" scoped></style>
