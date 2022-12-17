<template>
  <div>
    <div class="row">
      <div class="col-12 mb-3">
        <div class="d-flex justify-content-between">
          <div class="page-heading mb-4">Nursing Worklist</div>
          <div>
            <BaseButton @click="$bvModal.show('createTask')" class="btn-primary btn-lg">New nursing order</BaseButton>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 mb-4">
        <div class="card">
          <div class="card-body">
            <NursingPersistentFilters @filter="filter(currentPage, $event)" />
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <UtilsFilterComponent disable-pagination :disable-visualization="true" search-placeholder="Search">
          <TableComponent @row-clicked="goToTask" :fields="fields" :pages="pages" :items="items" :busy="busy" :dropdown-item="['close_order', 'cancel_order']"
            @page-changed="filter($event, currentFilter)" @close_order="closeOrder" @cancel_order="cancelOrder"  @cancel="cancelImaging($event)">
            <template #status="{ data }">
              <div class="">
                <span>{{ data.item.status }}</span>
              </div>
            </template>
          </TableComponent>
        </UtilsFilterComponent>
      </div>
    </div>

    <NursingModalCreateTask @refresh="filter(currentPage, currentFilter)" />
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
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
          },
          sortable: true,
        },
        {
          key: 'order_id',
          label: 'Order ID',
          sortable: true,
        },

        { key: 'patient.uhid', label: 'UHID', sortable: true },
        {
          key: 'patient',
          label: 'Patient',
          sortable: true,
          formatter: (val) => {
            return (
              (val.salutation ? val.salutation : '') +
              ' ' +
              val.firstname +
              ' ' +
              val.lastname
            )
          },
        },
        {
          key: 'station.name',
          label: 'Station',
          sortable: true,
        },

        {
          key: 'created_by',
          label: 'Ordered by',
          formatter: (val, key, item) => {
            if (Object.keys(val).length > 0) {
              return val.first_name + ' ' + val.last_name
            }
            else {
              return ''
            }
          },
          sortable: true,
        },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'dots', label: '', sortable: false },
      ],
    }
  },
  // mounted() {
  //   this.filter(1, {})
  // },
  methods: {
    async filter(page, e) {
      this.currentFilter = e
      this.currentPage = page
      try {
        this.busy = true
        const data = await this.$api.nursing.getTask({
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

    goToTask(task) {
      this.$router.push({
        name: 'dashboard-nursing-orders-uid',
        params: {
          uid: task.id,
        },
      })
    },

    async closeOrder(e) {
      const result = await this.showConfirmMessageBox(
        'Do you want to close this nursing order', 'Close'
      )
      try {
        if (result) {
          await this.$api.nursing.closeNursingOrder(e.id)
          this.filter(this.currentPage, this.currentFilter)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async cancelOrder(e) {
      const result = await this.showConfirmMessageBox(
        'Do you want to cancel this nursing order', 'Cancel'
      )
      try {
        if (result) {
          await this.$api.nursing.cancelNursingOrder(e.id)
          this.filter(this.currentPage, this.currentFilter)
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