<template>
  <div>
    <UtilsFilterComponent
      @search-input="searchBills"
      @view-by="getSome($event)"
     disable-visualization>
      <template>
        <TableComponent
          :fields="fields"
          :perPage="filter.size"
          :pages="pages"
          :items="items"
          :busy="busy"
          @page-changed="pageChange($event, filter)"
          :showBaseCount="trigger"
          :currentPage="currentPage"
          :totalRecords="totalRecords"
        >
          <template #status="{ data }">
            <span v-if="data.item.status === 'NS'" class="badge badge-info">{{
              data.item.status
            }}</span>
          </template>
          <template #clear="{ data }">
            <label class="exercise-option-check blue-check">
              <input
                type="checkbox"
                name="customRadio"
                @change="addToClear($event.target.checked, data.item)"
              />
              <span class="checkmark"></span>
              <!-- <span class="text">"dcdfv"</span> -->
            </label>
          </template>

          <template #cleared_status="{ data }">
            <span v-if="data.item.cleared_status === 'CLEARED'" class=" badge-primary rounded p-1">{{
              data.item.cleared_status
            }}</span>
             <span v-if="data.item.cleared_status === 'UNCLEARED'" class=" badge-warning rounded p-1">{{
              data.item.cleared_status
            }}</span>
          </template>
        </TableComponent>
        <DashboardModalProcessBillModal :goods="unClearedBill" :total="total" :nameData="data" @ok="payment($event)" @removedItem="deleteGoods($event)" />
      </template>
    </UtilsFilterComponent>

    <div class="row p-4">
      <div class="col-md-12">
        <h3>Total: ₦ {{ numberWithCommas(total) }}</h3>
      </div>
      <div class="col-md-3">
        <BaseButton
          class="btn-outline-primary btn-lg btn-block"
          @click="proceedToPayout"
          >Pay</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { remove } from 'lodash'
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
      busy: false,
      pages: 1,
      currentPage: 1,
      totalRecords: 0,
      items: [
      ],
      fields: [
        {
          key: 'clear',
          label: '',
        },
        {
          key: 'transaction_date',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
        },
        {
          key: 'bill_source',
        },
        {
          key: 'description',
        },
        {
          key: 'quantity',
        },

        {
          key: 'selling_price',
        },
        {
          key: 'cleared_status',
        },
      ],
      unClearedBill: [],
      filter: {
        size: 10,
        name: ''
      },
    }
  },
  
  computed: {
    total() {
      let total = 0
      this.unClearedBill.forEach((item) => {
        if(item.cleared_status === 'UNCLEARED'){
          total += Number.parseFloat(item.selling_price)
        }
        else{
        this.$toast({
        type: 'info',
        text: `Bill has already being cleared`,
      })
        }
      })
      return total
    },

    trigger() {
      if (this.items.length != 0) {
        return true
      }
    },
  },
  async mounted() {
    await this.pageChange()
  },
  methods: {
     searchBills(e) {
      console.log(e)
      this.filter.name = e
      this.getPayments(this.currentPage, this.filter)
    },
    getSome(e) {
      this.filter.size = e
      this.getPayments(this.currentPage, this.filter)
    },
    async pageChange(page = 1, e = { size: 10, name: '' }) {
      try {
        this.busy = true
        const data = await this.$api.finance.bills({
          patient: this.$route.params.uuid,
          page,
        })
        console.log(data)
        this.items = data.results
        this.pages = data.total_pages
         this.totalRecords = data.total_count
        this.currentPage = data.current_page
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    addToClear(e, item) {
      console.log(e, item)
      if (e) {
        this.unClearedBill.push(item)
      } else {
        this.unClearedBill = remove(this.unClearedBill, (n) => {
          return n.id !== item.id
        })
      }
    },
    proceedToPayout(){
      if(this.total != 0){
        this.$bvModal.show('modal')
      }
      else{
        this.$toast({
          type: 'info',
          text: `No item in cart`,
        })
      }
    },
    deleteGoods(e){
       this.unClearedBill = remove(this.unClearedBill, (n) => {
          return n.id !== e.id 
        })

      // this.unClearedBill.splice(e, 1)
    },
    async payment(info) {
      try {
        const patient = await this.$api.patient.getPatient(this.$route.params.uuid);
        let billID = [];
        const unClearedList = this.unClearedBill.filter(
          (item) => item.cleared_status !== 'CLEARED'
        )
        if (unClearedList.length > 0) {
          billID = unClearedList.map((item) => item.id)
        }
        await this.$api.finance.makePayment({
          bills: billID,
          patient: this.data.id,
          payments: info,
        })
        this.$toast({
          type: 'success',
          text: 'Payment Successful',
        })
        this.$bvModal.hide('modal')
        this.pageChange(this.currentPage, this.filter)
        this.unClearedBill = []
      } catch (error) {
        console.log(error)
      }
    },

     numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
  },
}
</script>

<style lang="scss" scoped>
</style>