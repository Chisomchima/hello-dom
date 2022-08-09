<template>
  <div>
    <div>
      <UtilsFilterComponent
        @search-input="searchSchemes"
        @view-by="getSome($event)"
        :disableVisualization="true"
      >
        <template #besideFilterButton>
          <button @click="openModal" class="btn btn-outline-primary">
            Add Scheme
          </button>
        </template>

        <TableComponent
          @page-changed="getSchemes($event, filter)"
          :perPage="filter.size"
          :items="schemes"
          :pages="pages"
          :busy="busy"
          :fields="fields"
        >
        <template #type="{ data }">
            <span class="text-capitalize">{{data.item.type}}</span>
          </template>
          <template #edit="{ data }">
            <div @click="edit(data.item)" class="text-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="18"
                height="18"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585l1.594-1.58zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006v-1.589z"
                />
                <path
                  fill="currentColor"
                  d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"
                />
              </svg>
            </div>
          </template>
        </TableComponent>
      </UtilsFilterComponent>
      <div>
        <DashboardModalFinanceAddSchemeWithPayer
          :editData="modalData"
          :title="newTitle"
          @refresh="refreshMe"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TableCompFun from '~/mixins/TableCompFun'
import { debounce } from 'lodash'
export default {
  mixins: [TableCompFun],
  data() {
    return {
      schemes: [],
      modalData: {
        name: '',
        type: '',
        price_list: null,
        payer: null,
      },
      fetchBy: null,
      queryString: '',
      pages: 1,
      currentPage: 1,
      newTitle: '',
      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'type',
          label: 'Type',
          sortable: true,
        },
        {
          key: 'price_list.name',
          label: 'Pricelist',
          sortable: true,
        },
        {
          key: 'edit',
          label: '',
          sortable: false,
        },
      ],
      filter: {
        size: 10,
        name: '',
      },
    }
  },
  async mounted() {
    this.getSchemes()
  },
  watch: {
    'filter.fetchBy'() {
      if (this.filter.size !== 10) {
        this.getSchemes(this.currentPage, this.filter)
      }
    },
  },
  methods: {
    openModal() {
      this.$bvModal.show('addSchemewithpayer')
      this.newTitle = 'Add Scheme'
    },
    searchSchemes(e) {
      console.log(e)
      this.filter.name = e
      this.getSchemes(this.currentPage, this.filter)
    },
    getSome(e) {
      // console.log(e)
      this.filter.size = e
      this.getSchemes(this.currentPage, this.filter)
    },
    async getSchemes(page = 1, e = { size: 10, name: '' }) {
      this.busy = true
      this.filter = e

      this.currentPage = page
     
      try {
        let response = await this.$api.finance_settings.getPayerSchemes({
          ...e,
          page: page,
        })

        this.schemes = response.results
        this.pages = response.total_pages

        this.currentPage = response.current_page
        this.busy = false
      } catch {
        this.busy = false
      }
    },
    edit(e) {
      this.modalData = e
      this.newTitle = 'Edit Scheme'
      this.$bvModal.show('addSchemewithpayer')
    },
    refreshMe() {
      this.getSchemes(this.currentPage)
    },
  },
}
</script>

<style>
</style>