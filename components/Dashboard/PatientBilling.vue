<template>
  <div>
  <b-dropdown dropright no-caret id="dropdown-1" class="rounded-0">
  <template #button-content>
      <div class="col-md-2 text-14">Filter</div>
    </template>
    <b-dropdown-item @click="getUnclearedBill">Uncleared</b-dropdown-item>
    <b-dropdown-item @click="getClearedBill">Cleared</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item @click="getAllBills">All</b-dropdown-item>
  </b-dropdown>
    <UtilsFilterComponent
      @search-input="searchBills"
      @view-by="getSome($event)"
     disable-visualization>
      <div class="row align-items-center px-3 pb-1">
        <h5 class="mb-0">Total: ₦ {{ numberWithCommas(total) }}</h5>
      <div class="col-md-2">
        <BaseButton
          class="btn-outline-primary btn-lg btn-block"
          @click="proceedToPayout"
          >Pay</BaseButton
        >
      </div>
    </div>
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
        name: '',
        status: ''
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
    getUnclearedBill(){
      this.filter.status = 'UNCLEARED'
      this.pageChange(1, this.filter)
    },
    getClearedBill(){
      this.filter.status = 'CLEARED'
      this.pageChange(1, this.filter)
    },
    getAllBills(){
      this.filter.status = ''
      this.pageChange(1, this.filter)
    },
     searchBills(e) {
      console.log(e)
      this.filter.name = e
      this.pageChange(this.currentPage, this.filter)
    },
    getSome(e) {
      this.filter.size = e
      this.pageChange(this.currentPage, this.filter)
    },
    async pageChange(page = 1, e = { size: 10, name: '', status:'' }) {
      try {
        this.busy = true
        const data = await this.$api.finance.bills({
          patient: this.$route.params.uuid,
          page,
          ...e
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

<style lang="scss">
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 5rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
}
</style>