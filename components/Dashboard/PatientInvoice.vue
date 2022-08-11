<template>
  <div>
    <div>
      <UtilsFilterComponent
        @search-input="searchPayments"
        @view-by="getSome($event)"
        :disableVisualization="true"
      >
        <TableComponent
          @page-changed="getInvoices($event, filter)"
          :perPage="filter.size"
          :items="items"
          :pages="pages"
          :busy="busy"
          :fields="fields"
          :showBaseCount="trigger"
          :currentPage="currentPage"
          :totalRecords="totalRecords"
        >
        </TableComponent>
      </UtilsFilterComponent>
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
      currentPage: 1,
      totalRecords: 0,
      fields: [
        {
          key: 'created_at',
          label: 'Transaction date',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
        },
        {
          key: 'paid_amount',
          label: 'Amount',
          sortable: true,
        },
        // {
        //   key: 'payment_method.name',
        //   label: 'Payment method',
        //   sortable: true,
        // },
        // {
        //   key: 'payment_type',
        //   label: 'Payment type',
        //   sortable: true,
        // },
      ],
      filter: {
        size: 10,
        name: '',
      },
    }
  },
  mounted() {
    this.getInvoices()
  },
  watch: {
    'filter.fetchBy'() {
      if (this.filter.size !== 10) {
        this.getInvoices(this.currentPage, this.filter)
      }
    },
  },
  computed: {
    trigger() {
      if (this.items.length != 0) {
        return true
      }
    },
  },
  methods: {
    searchPayments(e) {
      console.log(e)
      this.filter.name = e
      this.getInvoices(this.currentPage, this.filter)
    },
    getSome(e) {
      this.filter.size = e
      this.getInvoices(this.currentPage, this.filter)
    },
    async getInvoices(page = 1, e = { size: 10, name: '' }) {
      this.busy = true
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