<template>
  <div>
    <div>
      <UtilsFilterComponent
        @search-input="searchPricelist"
        @view-by="getSome($event)"
        :disableVisualization="true"
      >
        <template #besideFilterButton>
          <div class="d-flex align-items-center">
            <b-spinner
              style="width: 1.5rem; height: 1.5rem"
              class="mr-1"
              v-if="downloading"
              variant="primary"
              label="Spinning"
            ></b-spinner>
            <!-- <b-dropdown
              id="dropdown-1"
              right
              variant="outline-success"
              text="Actions"
              class="m-md-2"
            >
              <b-dropdown-item @click.prevent="upload"
                >Upload pricelist items</b-dropdown-item
              >
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click.prevent="save_file"
                >Download pricelist</b-dropdown-item
              >
            </b-dropdown> -->

            <div class="d-flex align-items-center">
              <div @click.prevent="save_file" class="mr-2 text-primary point">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M763.024 260C718.4 141.568 622.465 66.559 477.569 66.559c-184.384 0-313.392 136.912-324.479 315.536C64.178 410.527.002 501.215.002 603.935c0 125.744 98.848 231.968 215.823 231.968h28.448c17.664 0 32-14.32 32-32s-14.336-32-32-32h-28.448c-82.304 0-152.832-76.912-152.832-167.968c0-80.464 56.416-153.056 127.184-165.216l29.04-5.008l-2.592-29.344l-.24-.368c.016-155.872 102.607-273.44 261.184-273.44c127.104 0 198.513 62.624 231.553 169.44l6.832 22.032l23.072.497c118.864 2.496 223.088 98.944 223.088 218.784c0 109.056-72.272 230.592-181.713 230.592h-9.104c-17.664 0-32 14.32-32 32s14.336 32 32 32v-.096c160-4.224 252.24-157.088 252.24-294.496c-.032-147.728-115.792-265.743-260.512-281.312zM646.337 775.47c-8.944-9.344-23.407-9.345-32.335-.001l-70.384 77.648V530.973c0-17.664-14.336-32-32-32s-32 14.336-32 32v322.432l-68.112-75.935c-8.944-9.344-23.44-11.344-32.368-2l-8.065 4.416c-8.944 9.376-8.944 24.48 0 33.823l115.504 127.744c.16.16.193.368.336.528l8.096 8.464c4.496 4.689 10.368 7.01 16.288 6.977c5.872.032 11.776-2.288 16.225-6.977l8.095-8.464c.16-.16.24-.335.368-.528L654.417 811.71c8.945-9.344 8.945-20.447 0-29.823z"
                  />
                </svg>
              </div>
              <div @click.prevent="upload" class="text-primary point">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="m346.231 284.746l-90.192-90.192l-90.192 90.192l22.627 22.627l51.565-51.565V496h32V255.808l51.565 51.565l22.627-22.627z"
                  />
                  <path
                    fill="currentColor"
                    d="M400 161.453V160c0-79.4-64.6-144-144-144S112 80.6 112 160v2.491A122.285 122.285 0 0 0 49.206 195.2A109.4 109.4 0 0 0 16 273.619c0 31.119 12.788 60.762 36.01 83.469C74.7 379.275 105.338 392 136.07 392H200v-32h-63.93C89.154 360 48 319.635 48 273.619c0-42.268 35.64-77.916 81.137-81.155L144 191.405V160a112 112 0 0 1 224 0v32.04l15.8.2c46.472.588 80.2 34.813 80.2 81.379C464 322.057 428.346 360 382.83 360H312v32h70.83a109.749 109.749 0 0 0 81.14-35.454c20.655-22.207 32.03-51.657 32.03-82.927c0-58.437-40.284-104.227-96-112.166Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </template>
        <TableComponent
          @page-changed="getPriceListItems($event, filter)"
          :perPage="filter.size"
          :items="items"
          :pages="pages"
          :busy="busy"
          :fields="fields"
          @edit="editPricelistItem"
          :showBaseCount="trigger"
          :currentPage="currentPage"
          :totalRecords="totalRecords"
        >
          <template #type="{ data }">
            <span>{{ data.item.type }}</span>
          </template>
        </TableComponent>
      </UtilsFilterComponent>
      <div>
        <DashboardModalFinanceAddBulkPriceList
          @refresh="refreshMe"
          :title="newTitle"
        />
      </div>

      <div>
        <DashboardModalFinanceAddPriceListManually
          :title="newTitle"
          :editData="editData"
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
      items: [],
      downloading: false,
      fetchBy: null,
      editData: {},
      queryString: '',
      pages: 1,
      totalRecords: 0,
      currentPage: 1,
      newTitle: 'Edit pricelist',
      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'bill_item_code',
          label: 'Code',
          sortable: true,
        },
        {
          key: 'module',
          label: 'Module',
          sortable: true,
        },
        {
          key: 'selling_price',
          label: 'Selling price',
          sortable: true,
        },
        {
          key: 'is_capitated',
          label: 'Capitated',
          sortable: true,
        },
        {
          key: 'is_exclusive',
          label: 'Exclusive',
          sortable: true,
        },
        {
          key: 'is_auth_req',
          label: 'Require Auth',
          sortable: true,
        },
        {
          key: 'post_auth_allowed',
          label: 'Post Auth',
          sortable: true,
        },
        {
          key: 'actions',
          label: '',
          sortable: false,
        },
      ],
      filter: {
        size: 10,
        name: '',
        price_list: this.$route.params.id,
      },
    }
  },
  mounted() {
    this.getPriceListItems()
  },
  watch: {
    'filter.fetchBy'() {
      if (this.filter.size !== 10) {
        this.getPriceListItems(this.currentPage, this.filter)
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
    openModal() {
      this.$bvModal.show('addPriceListItem')
      this.newTitle = 'Add pricelist item'
    },
    upload() {
      this.$bvModal.show('addPriceListBulk')
    },
    gotoPricelistItem(e) {
      this.$router.push({
        name: 'dashboard-settings-finance-pricelist',
        params: {
          id: e.id,
        },
      })
    },
    editPricelistItem(e) {
     this.editData = e
      this.$bvModal.show('addPricelistManually')
    },
    searchPricelist(e) {
      console.log(e)
      this.filter.name = e
      this.getPriceListItems(this.currentPage, this.filter)
    },
    getSome(e) {
      // console.log(e)
      this.filter.size = e
      this.getPriceListItems(this.currentPage, this.filter)
    },
    async getPriceListItems(
      page = 1,
      e = { size: 10, name: '', price_list: this.$route.params.id }
    ) {
      this.filter = e

      this.currentPage = page
      try {
        let response = await this.$api.finance_settings.getPriceListItems({
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
      this.newTitle = 'Edit pricelist'
      this.$bvModal.show('addPriceListItem')
    },
    refreshMe() {
      this.getPriceListItems(this.currentPage)
    },

    async save_file() {
      this.downloading = true
      const response = await fetch(
        `${process.env.BASE_URL}finance/price_lists/${this.$route.params.id}/price_list_items/spreadsheet_download/`,
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