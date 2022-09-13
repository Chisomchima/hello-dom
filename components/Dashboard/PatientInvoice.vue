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
            <div class="col-md-5">
              <span class="text-12 text-grey">Date from:</span>
              <input
                type="date"
                class="form-control"
                :max="maxDate"
                v-model="filter.dateFrom"
              />
            </div>
            <div class="col-md-5">
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
          @page-changed="getInvoices($event, filter)"
          @row-clicked="viewInvoice($event)"
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
            <span class="d-none">{{ data }}</span>
            <button class="btn">
              <svg
                @click.prevent="printInvoice(data.item)"
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
    <div v-if="modalControl">
      <DashboardModalInvoiceDetails :nameData="data" :invoice="details" />
    </div>

    <DashboardModalPayOutstanding :invoice="details" />

    <DashboardModalPrintInvoice :data="data" :reciept="reciept" />
  </div>
</template>

<script>
import TableCompFun from '~/mixins/TableCompFun'
import { DateTime } from 'luxon'
export default {
  mixins: [TableCompFun],
  props: {
    data: {
      type: Object,
      require: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      items: [],
      pages: 1,
      currentPage: 1,
      totalRecords: 0,
      calculations: 0,
      totalInvoice: 0,
      reciept: {},
      invoice: null,
      details: {},
      modalControl: true,
      fields: [
        {
          key: 'confirmed_at',
          label: 'Date',
          formatter: (value) => {
            if (value != null) {
              return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
            } else {
              return ''
            }
          },
        },
        {
          key: 'inv_id',
          label: 'Invoice No.',
          sortable: true,
        },
        {
          key: 'payer_scheme.name',
          label: 'Scheme',
          formatter: (value) => {
            if (value != null) {
              if (Object.keys(value).length > 0) {
                return value
              } else {
                return ''
              }
            }
          },
          sortable: true,
        },
        {
          key: 'scheme_type',
          label: 'Scheme type',

          sortable: true,
        },
        {
          key: 'bill_lines',
          label: 'Total',
          formatter: (value) => {
            if (value != null && value.length > 0) {
              let sum = 0
              for (let x = 0; x < value.length; x++) {
                console.log(value[x].selling_price)
                let y = parseFloat(value[x].selling_price)
                sum += y
              }
              return sum
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
            } else {
              return ''
            }
          },
          sortable: true,
        },
        {
          key: 'paid_amount',
          label: 'Amount paid',
          sortable: true,
        },
        {
          key: 'balance',
          label: 'Balance',
          sortable: true,
        },
        {
          key: 'balance',
          label: 'Balance',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Status',
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
        dateTo: '',
        patient: this.data.id,
      },
    }
  },
  mounted() {
    this.getInvoices()
  },
  watch: {
    'filter.dateFrom'() {
      this.getInvoices(this.getInvoices, this.filter)
    },
    'filter.dateTo'() {
      this.getInvoices(this.getInvoices, this.filter)
    },
    'reciept.bill_lines'() {
      let calc = 0
      this.reciept.bill_lines.map((el) => {
        let text = el.selling_price.toString()
        let num = parseFloat(text)
        calc += num
      })
      this.totalInvoice = calc
    },
    'reciept.payment_lines'() {
      let calc = 0
      this.reciept.payment_lines.map((el) => {
        let text = el.total_amount.toString()
        let num = parseFloat(text)
        calc += num
      })
      this.calculations = calc
    },
  },
  computed: {
    trigger() {
      if (this.items.length != 0) {
        return true
      }
    },
    maxDate() {
      let today = new Date()
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd T')
      console.log(x)
      return x
    },
    minDate() {
      let today = new Date()
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd T')
      console.log(x)
      return x
    },
  },
  methods: {
    printInvoice(e) {
      this.reciept = e
      console.log(e)
      this.$bvModal.show('printInvoice')
    },
    viewInvoice(e) {
      this.modalControl = true
      this.details = e
      this.$bvModal.show('invoiceModal')
    },
    searchPayments(e) {
      console.log(e)
      this.filter.name = e
      this.getInvoices(this.currentPage, this.filter)
    },
    getSome(e) {
      this.filter.size = e
      this.getInvoices(this.currentPage, this.filter)
    },
    async getInvoices(
      page = 1,
      e = {
        patient: this.data.id,
        size: 10,
        name: '',
        dateFrom: '',
        dateTo: '',
      }
    ) {
      this.filter = e

      this.currentPage = page
      try {
        let response = await this.$api.patient.getInvoices({
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
      this.getInvoices(this.currentPage)
    },
  },
}
</script>

<style>
</style>