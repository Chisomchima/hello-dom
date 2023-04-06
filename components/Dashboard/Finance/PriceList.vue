<template>
  <div>
    <div>
      <UtilsFilterComponent
        :disable-visualization="true"
        @search-input="searchPricelist"
        @view-by="getSome($event)"
      >
        <template #besideFilterButton>
          <button class="btn btn-outline-primary" @click="openModal">
            Add Pricelist
          </button>
        </template>

        <TableComponent
          :per-page="filter.size"
          :items="items"
          :pages="pages"
          :busy="busy"
          :fields="fields"
          :show-base-count="trigger"
          :current-page="currentPage"
          :total-records="totalRecords"
          @row-clicked="gotoPricelistItem($event)"
          @page-changed="getPriceList($event, filter)"
        >
          <template #description="{ data }">
            <div class="text-capitalize">
              {{ data.item.description }}
            </div>
          </template>
          <template #edit="{ data }">
            <button class="text-start btn" @click.prevent="edit(data.item)">
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
            </button>
          </template>
        </TableComponent>
      </UtilsFilterComponent>
      <div>
        <DashboardModalFinanceAddPriceList
          :edit-data="modalData"
          :title="newTitle"
          @refresh="refreshMe"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { debounce } from 'lodash'
import TableCompFun from '~/mixins/TableCompFun'
export default {
  mixins: [TableCompFun],
  data() {
    return {
      items: [],
      modalData: {
        name: '',
        address: '',
      },
      fetchBy: null,
      queryString: '',
      pages: 1,
      currentPage: 1,
      totalRecords: 0,
      newTitle: '',
      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'description',
          label: 'Description',
          sortable: true,
        },
        {
          key: 'updated_at',
          label: 'Last Modified',
          sortable: true,
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
        },
        {
          key: 'updated_by.username',
          label: 'Last Modified By',
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
  computed: {
    trigger() {
      if (this.items.length != 0) {
        return true
      }
    },
  },
  watch: {
    'filter.fetchBy'() {
      if (this.filter.size !== 10) {
        this.getPriceList(this.currentPage, this.filter)
      }
    },
  },
  mounted() {
    this.getPriceList()
  },
  methods: {
    openModal() {
      this.$bvModal.show('addPriceList')
      this.newTitle = 'Add pricelist'
    },
    gotoPricelistItem(e) {
      this.$router.push({
        name: 'dashboard-configurations-finance-pricelist-id',
        params: {
          id: e.id,
        },
      })
    },
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
      this.busy = true
      this.filter = e

      this.currentPage = page
      try {
        const response = await this.$api.finance_settings.getPriceList({
          ...e,
          page,
        })

        this.items = response.results
        console.log(this.items, 'pricelist')
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
      this.newTitle = 'Edit pricelist'
      this.$bvModal.show('addPriceList')
    },
    refreshMe() {
      this.getPriceList(this.currentPage)
    },

    //  upload(){
    //   this.$bvModal.show('addPriceList')
    //     // this.$refs.file.click()
    // },

    async save_file(e) {
      this.downloading = true
      const response = await fetch(
        `${process.env.BASE_URL}laboratory/lab_panel_order/${e.id}/reports/download`,
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
        link.download = `Lab Report_${e.asn})`
        link.href = objectURL
        this.downloading = false
        this.getLabOrders(1)
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