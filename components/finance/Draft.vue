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
         <template #triple_actions="{ data }">
        <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
          <template #button-content>
            <b-icon icon="three-dots-vertical"></b-icon>
          </template>
          <template>
            <b-dropdown-item
             v-if="data.item.balance !== '0.00'"
              class="text-capitalize"
              @click="openPaymentModal(data.item)"
              >Make payment</b-dropdown-item
            >
            <b-dropdown-item
              class="text-capitalize"
              @click="printInvoice(data.item)"
              >Print invoice</b-dropdown-item
            >
          </template>
        </b-dropdown>
      </template>
      <template #status="{ data }">
        <div class="text-capitalize">
          {{ data.item.status }}
        </div>
      </template>
    </TableComponent>

    <div>
      <FinanceModalInvoiceDetails
        :invoice="invoice"
        :layout="true"
        @refresh="getUpdates"
        @print="print"
      />
      <FinanceModalPayment :invoice="invoice" />
      <DashboardModalPrintInvoice :data="patientData" :reciept="template" />
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  //   mixins: [TableCompFun],
  data() {
    return {
      items: [],
      pages: 0,
      busy: true,
      currentPage: 1,
      totalRecords: 0,
      invoice: {},
      template: {},
      patientData: {},
      filter: {
        size: 50,
        name: '',
        scheme_type: null,
        scheme: [],
        payer: null,
        status: 'DRAFT',
      },
      fields: [
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
                sum += (y * value[x].quantity)
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
          key: 'triple_actions',
          label: '',
        },
      ],
    }
  },
  mounted() {},
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
      this.filter.status = 'DRAFT'
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

    printInvoice(e){
      this.patientData = e.patient
      this.template = e
      this.$bvModal.show('printInvoice')
    },

    print(invoice){
      this.patientData = invoice.patient
      this.template = invoice
      this.$bvModal.show('printInvoice')
    },

     openPaymentModal(e){
      this.invoice = e
      this.$bvModal.show('makePayment')
    },

    async getInvoices(
      page = 1,
      e = {
        size: 50,
        name: '',
        scheme_type: null,
        scheme: [],
        payer: null,
        status: 'DRAFT',
      }
    ) {
      this.filter = e
      this.busy = true
      console.log(e)
      try {
        let response = await this.$api.patient.getInvoices({
          ...e,
          page: page,
        })

        console.log(response.total_pages)
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