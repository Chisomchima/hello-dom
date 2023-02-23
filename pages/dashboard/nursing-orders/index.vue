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

    <UtilsBaseCardTab>
      <UtilsCardTab title="Orders">
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
          <TableComponent @row-clicked="goToTask" :fields="fields" :pages="pages" :items="items" :busy="busy"
            :dropdown-item="['close_order', 'cancel_order']" @page-changed="filter($event, currentFilter)"
            @close_order="closeOrder" @cancel_order="cancelOrder">
            <template #status="{ data }">
              <div v-if="data.item.status === 'OPEN'" class="">
                <span class="text-12 badge-danger rounded text-center p-1 text-white">OPEN</span>
              </div>
              <div v-if="data.item.status === 'SCHEDULED'" class="">
                <span class="text-12 badge-warning rounded text-center p-1 text-white">SCHEDULED</span>
              </div>
              <div v-if="data.item.status === 'CLOSED'" class="">
                <span class="text-12 badge-success rounded text-center p-1 text-white">CLOSED</span>
              </div>
              <div v-if="data.item.status === 'CANCELLED'" class="">
                <span class="text-12 badge-secondary rounded text-center p-1 text-white">CANCELLED</span>
              </div>
            </template>
            <template #description="{ data }">
              <div>
                <span> {{ data.item.description }}</span>
              </div>
              
            </template>
          </TableComponent>
        </UtilsFilterComponent>
      </div>
    </div>
      </UtilsCardTab>
      <UtilsCardTab title="Tasks">
        <!-- <NursingTabsTasks /> -->

        <div class="p-3">
          <h3>Hello world</h3>
        </div>
      </UtilsCardTab>
    </UtilsBaseCardTab>

   

    <NursingModalCreateTask @refresh="filter(currentPage, currentFilter)" />
    <NursingModalCancelOrder @refresh="filter(currentPage, currentFilter)" :editData="editData" />
    <NursingModalCloseOrder @refresh="filter(currentPage, currentFilter)" :editData="editData" />
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
      editData: {},
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
        { key: 'description', label: 'Order', sortable: true },
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

    closeOrder(e) {
     this.editData = e
     this.$bvModal.show('closeOrder')
    },
    cancelOrder(e) {
      this.editData = e
      this.$bvModal.show('cancelOrder')
    },
  },
}
</script>
  
<style lang="scss" scoped>

</style>