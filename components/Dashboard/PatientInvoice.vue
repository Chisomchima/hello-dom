<template>
  <div>
    <div>
      <UtilsFilterComponent
        @search-input="searchPayments"
        @view-by="getSome($event)"
        :disableVisualization="true"
      >
        <TableComponent
          @page-changed="getPayments($event, filter)"
          :perPage="filter.size"
          :items="items"
          :pages="pages"
          :busy="busy"
          :fields="[]"
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
          key: 'total_amount',
          label: 'Amount',
          sortable: true,
        },
        {
          key: 'payment_method.name',
          label: 'Payment method',
          sortable: true,
        },
        {
          key: 'payment_type',
          label: 'Payment type',
          sortable: true,
        },
      ],
      filter: {
        size: 10,
        name: '',
      },
    }
  },
  mounted() {
    // this.getPayments()
  },
  watch: {
    'filter.fetchBy'() {
      if (this.filter.size !== 10) {
        this.getPayments(this.currentPage, this.filter)
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