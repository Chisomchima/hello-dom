<template>
  <div>
    <div>
      <UtilsFilterComponent
        @search-input="searchSchemes"
        @view-by="getSome($event)"
        :disableVisualization="true"
        :searchPlaceholder="placeholder"
      >
        <template #besideFilterButton>
          <b-dropdown
            id="dropdown-1"
            right
            variant="outline-success"
            text="Actions"
            class="m-md-2"
          >
            <b-dropdown-item @click="upload"
              >Upload billable item sheet</b-dropdown-item
            >
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>Download billable item sheet</b-dropdown-item>
            <!-- <b-dropdown-item @click.prevent="downloadTemplate">Download pricelist template</b-dropdown-item> -->
          </b-dropdown>
        </template>
        <TableComponent
          @page-changed="getBillableItems($event, filter)"
          :perPage="filter.size"
          :items="items"
          :pages="pages"
          :busy="busy"
          :fields="fields"
          :showBaseCount="trigger"
          :currentPage="currentPage"
          :totalRecords="totalRecords"
        >
          <template #type="{ data }">
            <span class="text-capitalize">{{ data.item.type }}</span>
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
        <DashboardModalFinanceEditItems
          :editData="modalData"
          :title="newTitle"
          @refresh="refreshMe"
        />
      </div>

      <div class="input-field">
        <input type="file" accept=".xlsx, .xls," ref="file" />
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
      items: [],
      placeholder: 'Search by description',
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
      totalRecords: 0,
      newTitle: '',
      fields: [
        {
          key: 'item_code',
          label: 'Code',
          sortable: true,
        },
        {
          key: 'module',
          label: 'Module',
          sortable: true,
        },
        {
          key: 'description',
          label: 'Description',
          sortable: true,
        },
        {
          key: 'selling_price',
          label: 'Selling Price',
          sortable: true,
          formatter: (value) => {
            return value ? value.toLocaleString('en-US') : ''
          },
        },
        {
          key: 'cost',
          label: 'Cost Price',
          sortable: true,
          formatter: (value) => {
            return value
              ? value.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'NGN',
                })
              : ''
          },
        },
        {
          key: 'edit',
          label: '',
          sortable: false,
        },
      ],
      filter: {
        size: 10,
        module: 'ENCOUNTERS',
        desciption: '',
      },
    }
  },
  async mounted() {
    this.getBillableItems()
  },
  watch: {
    'filter.fetchBy'() {
      if (this.filter.size !== 10) {
        this.getBillableItems(this.currentPage, this.filter)
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
    searchSchemes(e) {
      this.filter.desciption = e
      this.getBillableItems(this.currentPage, this.filter)
    },
    getSome(e) {
      this.filter.size = e
      this.getBillableItems(this.currentPage, this.filter)
    },
    async getBillableItems(page = 1, e = { size: 10, module: 'ENCOUNTERS' }) {
      this.busy = true
      this.filter = e

      this.currentPage = page

      try {
        let response = await this.$api.finance_settings.getBillableItems({
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
    edit(e) {
      this.modalData = e
      this.newTitle = 'Edit Billable Item'
      this.$bvModal.show('editBill')
    },
    refreshMe() {
      this.getBillableItems(this.currentPage)
    },
    upload() {
      console.log('ghjdj')
      this.$refs.file.click()
    },
         async downloadTemplate() {
      this.downloading = true
      const response = await fetch(
        `${process.env.BASE_URL}finance/billable_items/price_lists/spreadsheet_template/`,
        {
          headers: {
            Authorization: `Token ${this.$store.state.auth.token}`,
          },
        }
      )
      console.log(response)
      if (response.status === 200) {
        const data = await response.blob()

        const objectURL = URL.createObjectURL(data)
        const link = document.createElement('a')
        link.download = `Template`
        link.href = objectURL
        this.downloading = false
        link.click()
      } else if (response.status === 403) {
        this.downloading = false
        this.$toast({
          type: 'info',
          text: `You don't have the permission to perform this action`,
        })
      } else {
        this.downloading = false
        this.$toast({
          type: 'error',
          text: `An error occured`,
        })
      }
    },
  },
}
</script>

<style>
</style>