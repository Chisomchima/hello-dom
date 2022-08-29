<template>
  <div>
    <div>
      <UtilsFilterComponent
        @search-input="searchPayments"
        @view-by="getSome($event)"
        :disableVisualization="true"
      >
      <template #besidesViewBy>
        <div class="d-flex justify-content-center">
          <div class="col-md-6">
            <span class="text-12 text-grey">Date from:</span>
            <input
              type="date"
              class="form-control"
              :max="maxDate"
              v-model="filter.dateFrom"
            />
          </div>
          <div class="col-md-6">
            <span class="text-12 text-grey">Date to:</span>
            <input
              type="date"
              class="form-control"
              :min="minDate"
              v-model="filter.dateTo"
            />
          </div>
        </div>
      </template>
        <TableComponent
          @page-changed="getPayments($event, filter)"
          :perPage="filter.size"
          :items="items"
          :pages="pages"
          :busy="busy"
          :fields="fields"
          :showBaseCount="trigger"
          :currentPage="currentPage"
          :totalRecords="totalRecords"
        >
        <template #print="{ data }">
          <span class="d-none">{{data}}</span>
            
          <button @click="printPaymentSlip(data.item)" class="btn"><svg class="text-success" xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5 4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V5h.5A2.5 2.5 0 0 1 18 7.5v5a1.5 1.5 0 0 1-1.5 1.5H15v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 15.5V14H3.5A1.5 1.5 0 0 1 2 12.5v-5A2.5 2.5 0 0 1 4.5 5H5v-.5ZM6 5h8v-.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V5Zm-1 8v-1.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V13h1.5a.5.5 0 0 0 .5-.5v-5A1.5 1.5 0 0 0 15.5 6h-11A1.5 1.5 0 0 0 3 7.5v5a.5.5 0 0 0 .5.5H5Zm1.5-2a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-7Z"/></svg></button>
          </template>
        </TableComponent>
      </UtilsFilterComponent>
    </div>
    <ConfirmDepositPrint :reciept="paymentData" :data="data"/>
  </div>
</template>

<script>
import TableCompFun from '~/mixins/TableCompFun'
import { DateTime } from 'luxon'
export default {
  mixins: [TableCompFun],
  data() {
    return {
      items: [],
      pages: 1,
      currentPage: 1,
      totalRecords: 0,
      paymentData: {},
      fields: [
        {
          label: 'Transaction date',
          key: 'created_at',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
          },
        },
        {
          key: 'payment_method.name',
          label: 'Payment method',
          sortable: true,
        },
        {
          key: 'total_amount',
          label: 'Amount',
          sortable: true,
        },
        {
          key: 'payment_type',
          label: 'Payment type',
          sortable: true,
        },
        {
          key: 'print',
          label: '',
        },
      ],
      filter: {
        size: 10,
        name: '',
        dateFrom: '',
        dateTo: ''
      },
    }
  },
  mounted() {
    this.getPayments()
  },
   props: {
    data: {
      type: Object,
      require: false,
      default: () => ({}),
    }
   },
  watch: {
   'filter.dateFrom'(){
      this.getPayments(this.currentPage, this.filter)
    },
    'filter.dateTo'(){
      this.getPayments(this.currentPage, this.filter)
    }
  },
  computed: {
    trigger() {
      if (this.items.length != 0) {
        return true
      }
    },
    maxDate(){
      let today = new Date
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
    minDate(){
      let today = new Date
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
  },
  methods: {
    printPaymentSlip(e){
      // this.$bvModal.show('printDepositSlip')
      this.paymentData = e
      console.log(e)
    },
    searchPayments(e) {
      console.log(e)
      this.filter.name = e
      this.getPayments(this.currentPage, this.filter)
    },
    getSome(e) {
      this.filter.size = e
      this.getPayments(this.currentPage, this.filter)
    },
    async getPayments(page = 1, e = { size: 10, name: '' }) {
      this.busy = true
      this.filter = e

      this.currentPage = page
      try {
        let response = await this.$api.patient.getPayments({
          ...e,
          page: page,
        })

        this.items = response.results
        this.pages = response.total_pages
         this.totalRecords = response.total_count
        this.currentPage = response.current_page
        this.busy = false
      } catch {
        this.busy = false
      }
    },
    refreshMe() {
      this.getPayments(this.currentPage)
    },
  },
}
</script>

<style>
</style>