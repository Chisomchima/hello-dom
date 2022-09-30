<template>
  <div>
    <div>
      <FinanceDraftFilters @filter="getSome($event)" />
    </div>
    <TableComponent
      :fields="fields"
      :perPage="filter.size"
      :pages="pages"
      :items="items"
      :busy="busy"
      @page-changed="getInvoices($event, filter)"
      :showBaseCount="trigger"
      :currentPage="currentPage"
      :totalRecords="totalRecords"
      @row-clicked="openModal($event)"
    >
      <template #status="{ data }">
        <div class="text-capitalize">
          {{ data.item.status }}
        </div>
      </template>
    </TableComponent>

    <div>
      <FinanceModalInvoiceDetails :invoice="invoice" @refresh="getUpdates" />
    </div>
  </div>
</template>

<script>
// import TableCompFun from '~/mixins/TableCompFun'
import { DateTime } from 'luxon'
export default {
  //   mixins: [TableCompFun],
  data() {
    return {
      items: [],
      pages: 1,
      busy: true,
      currentPage: 1,
      totalRecords: 0,
      invoice: {},
      filter: {
        size: 10,
        name: '',
        dateFrom: '',
        dateTo: '',
        status: 'OPEN',
      },
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
          key: 'patient.uhid',
          label: 'UHID',
          sortable: true,
        },
        {
          key: 'patient',
          label: 'Patient',
          formatter: (value) => {
            if (value != null) {
              return value.firstname + ' ' + value.lastname
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
                let y = parseFloat(value[x].selling_price)
                sum += y * value[x].quantity
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
          key: 'print',
          label: '',
        },
      ],
    }
  },
  mounted() {
    // this.getInvoices(1, this.filter)
  },
  computed: {
    trigger() {
      if (this.items.length != 0) {
        return true
      }
    },
  },
  methods: {
    getSome(e) {
      this.filter = e
      this.filter.status = 'OPEN'
      this.getInvoices(1, this.filter)
    },
    openModal(e) {
      console.log(e)
      this.invoice = e
      this.$bvModal.show('invoiceModal')
    },
    getUpdates() {
      this.getInvoices(this.currentPage, this.filter)
    },
    async getInvoices(
      page = 1,
      e = {
        size: 10,
        name: '',
        dateFrom: '',
        dateTo: '',
        status: 'OPEN',
      }
    ) {
      this.filter = e
      this.busy = true
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
  },
}
</script>

<style>
</style>