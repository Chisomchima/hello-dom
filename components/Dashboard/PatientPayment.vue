<template>
  <div>
    <div>
      <UtilsFilterComponent
        @search-input="searchPayments"
        @view-by="getSome($event)"
        @dropdown="getByPaymentOptions"
        :searchPlaceholder="'Search by amount'"
        :disableVisualization="true"
        :disableSearch="true"
      >
        <template #beforeActions>
          <div class="mr-2">
            <button
              v-b-toggle.sidebar-backdrop4
              class="btn btn-sm btn-outline-secondary"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M96 197.333h320v32H96zm72 101.334h176v32H168zM216 400h80v32h-80zM48 96h416v32H48z"
                  />
                </svg>
              </span>
            </button>
            <b-sidebar
              id="sidebar-backdrop4"
              title="Sidebar with backdrop"
              :backdrop-variant="'dark'"
              backdrop
              shadow
              right
            >
              <div class="p-4">
                <div class="col-md-12">
                  <p class="text-14 mb-1 text-grey">Payment methods</p>
                </div>
                <div class="col-md-12 d-flex align-items-center mb-2 text-14">
                  <p
                    :class="
                      option.selected
                        ? 'text-info border border-info'
                        : 'text-secondary border'
                    "
                    @click="
                      getByPaymentOptions(option.id, option.selected, index)
                    "
                    class="point mb-0 p-2 mr-2 rounded-sm"
                    v-for="(option, index) in paymentOptions"
                    :key="index"
                  >
                    {{ option.name }}
                  </p>
                </div>
                <div class="">
                  <!-- <p class="mb-0 text-20">Date range</p> -->
                  <div class="col-md-12">
                    <span class="text-12 text-grey">Search</span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search"
                      v-model="filter.amount"
                    />
                  </div>
                </div>
                <div class="">
                  <!-- <p class="mb-0 text-20">Date range</p> -->
                  <div class="col-md-12">
                    <span class="text-12 text-grey">Date from:</span>
                    <input
                      type="date"
                      class="form-control"
                      :max="maxDate"
                      v-model="filter.dateFrom"
                    />
                  </div>
                  <div class="col-md-12">
                    <span class="text-12 text-grey">Date to:</span>
                    <input
                      type="date"
                      class="form-control"
                      :min="minDate"
                      v-model="filter.dateTo"
                    />
                  </div>
                </div>

                <!-- <div class="col-md-12">
                  <span class="text-12 text-grey">Service centers</span>
                  <VSelect
                    style="font-size: 13px"
                    label="name"
                    class=""
                    v-model="filter.service_center"
                    :placeholder="'Service centers'"
                    :reduce="(option) => option.id"
                    multiple
                    taggable
                    :options="filterSerice"
                  >
                  </VSelect>
                </div> -->
              </div>
            </b-sidebar>
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
            <button @click="printPaymentSlip(data.item)" class="btn">
              <svg
                class="text-success"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M5 4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V5h.5A2.5 2.5 0 0 1 18 7.5v5a1.5 1.5 0 0 1-1.5 1.5H15v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 15.5V14H3.5A1.5 1.5 0 0 1 2 12.5v-5A2.5 2.5 0 0 1 4.5 5H5v-.5ZM6 5h8v-.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V5Zm-1 8v-1.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V13h1.5a.5.5 0 0 0 .5-.5v-5A1.5 1.5 0 0 0 15.5 6h-11A1.5 1.5 0 0 0 3 7.5v5a.5.5 0 0 0 .5.5H5Zm1.5-2a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-7Z"
                />
              </svg>
            </button>
          </template>
        </TableComponent>
      </UtilsFilterComponent>
    </div>
    <DashboardModalPrintPaymentSlip :reciept="paymentData" :data="data" />
  </div>
</template>

<script>
import TableCompFun from '~/mixins/TableCompFun'
import { debounce } from 'lodash'
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
      paymentOptions: [],
      fields: [
        {
          label: 'Transaction date',
          key: 'created_at',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
          },
        },
        {
          key: 'cashier.name',
          label: 'Cashier',
          sortable: true,
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
        // {
        //   key: 'print',
        //   label: '',
        // },
      ],
      filter: {
        size: 10,
        amount: '',
        dateFrom: '',
        dateTo: '',
        payment_method: '',
        patient: this.data.id,
      },
    }
  },
  async mounted() {
    this.getPayments()
    let response = await this.$api.finance.paymentMethods({
      size: 1000,
    })

    let arr = response.results
    const formatted = arr.map((el) => ({
      ...el,
      selected: false,
    }))
    this.paymentOptions = formatted
  },
  props: {
    data: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    refresh: {
      type: Boolean,
      require: false,
      default: () => false,
    },
  },
  watch: {
    'filter.dateTo'() {
      if (this.filter.dateFrom !== '') {
        this.getPayments(1, this.filter)
      }
    },
    'filter.amount': {
      handler: debounce(function () {
        this.getPayments(1, this.filter)
      }, 1000),
      deep: true,
    },
    refresh() {
      this.getPayments(this.currentPage, this.filter)
    },
  },
  computed: {
    trigger() {
      console.log(this.items)
      if (this.items.length != 0) {
        return true
      } else return
    },
    maxDate() {
      let today = new Date()
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
    minDate() {
      let today = new Date()
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
  },
  methods: {
    printPaymentSlip(e) {
      console.log(e)
      this.$bvModal.show('printPaymentSlip')
      this.paymentData = e
    },
    getByPaymentOptions(e, selected, index) {
      let arr = this.paymentOptions
      for (let x = 0; x < arr.length; x++) {
        this.paymentOptions[x].selected = false
      }
      this.paymentOptions[index].selected = true
      this.filter.payment_method = e
      this.getPayments(this.currentPage, this.filter)
    },
    searchPayments(e) {
      this.filter.name = e
      this.getPayments(this.currentPage, this.filter)
    },
    getSome(e) {
      this.filter.size = e
      this.getPayments(this.currentPage, this.filter)
    },
    async getPayments(
      page = 1,
      e = {
        patient: this.data.id,
        size: 10,
        amount: '',
        dateFrom: '',
        dateTo: '',
        payment_method: '',
      }
    ) {
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