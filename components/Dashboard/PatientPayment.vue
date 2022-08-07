<template>
  <div>
    <div>
      <UtilsFilterComponent
        @search-input="searchPricelist"
        @view-by="getSome($event)"
        :disableVisualization="true"
      >
        <TableComponent
          @page-changed="getPriceList($event, filter)"
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
          key: 'amount',
          label: 'Amount',
          sortable: true,
        },
        {
          key: 'payment_method',
          label: 'Payment method',
          sortable: true,
        },
        {
          key: 'payment_type',
          label: 'Payment type',
          sortable: true,
        },
        {
          key: 'transaction_date',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
        },
      ],
      filter: {
        size: 10,
        name: '',
      },
    }
  },
  mounted() {
    // this.getPriceList()
  },
  watch: {
    'filter.fetchBy'() {
      if (this.filter.size !== 10) {
        this.getPriceList(this.currentPage, this.filter)
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
    searchPricelist(e) {
      console.log(e)
      this.filter.name = e
      this.getPriceList(this.currentPage, this.filter)
    },
    getSome(e) {
      this.filter.size = e
      this.getPriceList(this.currentPage, this.filter)
    },
    async getPriceList(page = 1, e = { size: 10, name: '' }) {
      this.filter = e

      this.currentPage = page
      try {
        let response = await this.$api.finance_settings.getPriceList({
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
      this.getPriceList(this.currentPage)
    },
  },
}
</script>

<style>
</style>