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
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M11.5 4C8.851 4 6.739 6.38 7.027 9a1.01 1.01 0 0 1-.758 1.09A3.002 3.002 0 0 0 7 16h1a1 1 0 1 1 0 2H7a5 5 0 0 1-2-9.584a6.5 6.5 0 0 1 12.586-2.204A6.002 6.002 0 0 1 16 18a1 1 0 1 1 0-2a4 4 0 0 0 .655-7.947a1.01 1.01 0 0 1-.81-.732A4.502 4.502 0 0 0 11.5 4Zm1.5 8.416l1.293 1.292a1 1 0 0 0 1.414-1.416l-2.824-2.819a1.25 1.25 0 0 0-1.766 0l-2.824 2.82a1 1 0 0 0 1.414 1.415L11 12.416V21a1 1 0 1 0 2 0v-8.584Z"
                    />
                  </g>
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
          <template #edit="{ data }">
            <button @click.prevent="edit(data.item)" class="text-start btn">
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
        <DashboardModalFinanceAddBulkPriceList
          @refresh="refreshMe"
          :title="newTitle"
          :editData="modalData"
        />
      </div>

      <div>
        <DashboardModalFinanceAddPriceListManually
          :title="newTitle"
          :editData="editData"
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
      items: [],
      modalData: {
        name: '',
        address: '',
      },
      downloading: false,
      priceListItem: {
        co_pay: {
          type: '',
          value: '',
        },
        bill_item_code: '',
        selling_price: '',
        is_auth_req: null,
        is_capitated: null,
        module: '',
        is_exclusive: null,
        post_auth_allowed: null,
      },
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
        module: 'LABORATORY',
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

    editPricelistItem(e) {
     this.editData = e
      this.$bvModal.show('addPricelistManually')
    },

    searchPricelist(e) {
      this.filter.name = e
      this.getPriceListItems(this.currentPage, this.filter)
    },
    getSome(e) {
      this.filter.size = e
      this.getPriceListItems(this.currentPage, this.filter)
    },
    async getPriceListItems(
      page = 1,
      e = { size: 10, name: '', module: 'LABORATORY', price_list: this.$route.params.id, }
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
        `${process.env.BASE_URL}finance/price_lists/${this.$route.params.id}/price_list_items/spreadsheet_download/?module=LABORATORY`,
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