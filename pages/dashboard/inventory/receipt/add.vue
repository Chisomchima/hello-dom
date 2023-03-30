<template>
  <div class="bg-white p-5 shadow-sm ">
    <ValidationObserver ref="form">
      <form>
        <div class="col-md-12 mb-2">
          <ValidationProviderWrapper name="Vendor" :rules="['']">
            <VSelect
              v-model="receiptData.vendor"
              :options="vendors"
              :reduce="(opt) => opt.id"
              label="name"
            >
            </VSelect>
          </ValidationProviderWrapper>
        </div>

        <div class="col-md-12 mb-2">
          <ValidationProviderWrapper name="Recieving Store*" :rules="['']">
            <VSelect
              v-model="receiptData.destination_location"
              :options="stores"
              :reduce="(opt) => opt.id"
              label="name"
            >
            </VSelect>
          </ValidationProviderWrapper>
        </div>

        <!-- <div v-if="!isReciept" class="col-md-12 mb-2">
          <ValidationProviderWrapper name="Source Location*" :rules="['']">
            <VSelect
              v-model="dataObject.store"
              :options="stores"
              :reduce="(opt) => opt.id"
              label="name"
            >
            </VSelect>
          </ValidationProviderWrapper>
        </div> -->
        <div class="col-md-12 mb-2">
          <ValidationProviderWrapper name="Scheduled Date" :rules="['']">
            <label class="form-control-label"> Scheduled Date</label>
            <input
              v-model="date"
              type="date"
              name="date"
              class="form-control"
            />
          </ValidationProviderWrapper>
        </div>

        <b-tabs content-class="mt-4">
          <b-tab title="Products" active>
            <div class="col-md-12 d-flex ml-0 text-primary text-14">
              <span class="point" @click="addProduct()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                  />
                </svg>
                Add Products
              </span>
            </div>

            <div
              v-for="(prod, index) in receiptData.products"
              :key="index"
              class="row p-1 mt-2 mx-2 border border-secondary rounded"
            >
              <div
                class="
                  col-md-12
                  d-flex
                  justify-content-end
                  ml-0
                  text-danger text-14
                "
              >
                <span class="point float" @click="deleteProduct(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"
                    />
                  </svg>
                </span>
              </div>

              <div class="col-md-6 mb-2">
                <ValidationProviderWrapper name="Product" :rules="['']">
                  <!-- <VSelect
                    v-model="product.product"
                    :options="products"
                    label="name"
                    @option:selected="fetchGenericDrugs($event, index)"
                  >
                  </VSelect> -->
                  <input
                    v-model="search[index]"
                    type="text"
                    name=""
                    class="form-control"
                  />
                </ValidationProviderWrapper>
                <div
                  v-if="makeVisible && !picked"
                  class="w-100 mt-3 bg-white px-3"
                >
                  <div class="clear mb-2">X</div>
                  <div
                    v-for="(option, i) in products"
                    :key="i"
                    class="search-options"
                  >
                    <div
                      class="option w-100"
                      @pick="pickNewProd(option.name, option.id, index)"
                      @click="pickProd(option.name, option.id, index)"
                    >
                      {{ option.name }}
                    </div>
                  </div>
                  <span class="view-more" @click="show()">view more</span>
                </div>
              </div>
              <div class="col-md-6 mb-2">
                <ValidationProviderWrapper name="Quantity" :rules="[]">
                  <input
                    v-model="product.quantity"
                    type="number"
                    class="form-control"
                  />
                </ValidationProviderWrapper>
              </div>
            </div>
            <div
              class="
                col-md-12
                d-flex
                justify-content-end
                ml-0
                text-primary text-14
                pt-2
              "
            >
              <span class="point" @click="addProduct()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                  />
                </svg>
                Add
              </span>
            </div>
          </b-tab>
          <b-tab title="Additional Info">
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper
                name="Additional Information"
                :rules="['']"
              >
                <div class="d-flex">
                  <textarea
                    readonly
                    value="value"
                    type="text"
                    class="form-control"
                  />
                </div>
              </ValidationProviderWrapper>
            </div>
          </b-tab>
        </b-tabs>
        <button class="btn btn-primary px-4 py-2 mt-4" type="button" @click="create">
          Create
        </button>
      </form>
    </ValidationObserver>

    <div>
      <DashboardModalAddReceipt
        :search="search"
        :makeVisible="makeVisible"
        :picked="picked"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  props: {
    editData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    isReciept: {
      type: Boolean,
      default: true,
      require: false,
    },
    role: {
      require: false,
    },
  },
  data() {
    return {
      date: '',
      searchId: '',
      search: [],
      refetch: false,
      placholder: [],
      makeVisible: false,
      picked: false,
      downloading: false,
      product: { product: this.search, quantity: 1 },
      products: [],
      stores: [],
      vendors: [],
      receiptData: {
        source_location: '',
        destination_location: '',
        vendor: null,
        products: [],
        type: 'RECEIPTS',
        schedule_date: this.date,
      },
    }
  },
  computed: {},
  async mounted() {
    this.tabs = this.$children
    await this.fetchVendors()
    await this.fetchStore()
    this.addProduct()
    this.debouncedFetch = debounce((newValue) => {
      console.log(newValue, 'newval')
      try {
        newValue.map(async (el) => {
          this.makeVisible = true
          const { results } = await this.$api.inventory.getProducts({
            search: el,
            size: 10,
          })
          console.log(results, 'results')
          this.picked = false
          this.products = results
        })
      } catch (err) {
        this.makeVisible = false
      }

      // call fetch API to get results
    }, 1000)
  },
  // eslint-disable-next-line vue/order-in-components
  watch: {
    search: {
      handler(...args) {
        // if (!this.refetch) {
        this.debouncedFetch(...args)
        this.refetch = true
        // }
      },
      deep: true,
    },
    date(newVal) {
      this.receiptData.schedule_date = newVal
    },
  },
  methods: {
    show() {
      this.$bvModal.show('id')
      this.makeVisible = false
    },
    addProduct() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.receiptData.products.push(this.product)
    },
    deleteProduct(e) {
      if (this.receiptData.products.length !== 1) {
        this.receiptData.products.splice(e, 1)
      }
    },
    async create(e) {
      e.preventDefault()
      console.log(this.receiptData, 'reciept')
      const { results } = await this.$api.inventory.createMove({
        ...this.receiptData,
      })
      console.log(results)
    },
    async fetchVendors() {
      try {
        const data = await this.$api.inventory.getVendors()
        this.vendors = data.results
        console.log(this.vendors, 'vendors')
      } catch (err) {
        console.log(err)
      }
    },
    pickProd(param, id, i) {
      //   this.placholder.push(param)
      this.search[i] = param
      this.receiptData.products[i].product = id
      console.log(this.search[i], this.products, 'search')
      this.picked = true
      //   this.products = []
      this.makeVisible = false
      //   this.refetch = true
    },
    pickNewProd(param, i) {
      //   this.placholder.push(param)
      this.search[i] = param

      console.log(this.search[i], this.products, 'search')
      this.picked = true
      //   this.products = []
      this.makeVisible = false
      //   this.refetch = true
    },
    async fetchStore() {
      try {
        const data = await this.$api.inventory.getStoresVendor()
        console.log(data, 'store')
        this.stores = data.results
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
textarea.form-control {
  min-height: 50px;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.float {
  position: relative;
  top: -3px;
  right: -17px;
}

.shrink {
  height: 2px;
}
.search-options {
  width: 100%;
  height: auto;
}

.option {
  color: grey;
}
.option:hover {
  cursor: pointer;
  background-color: rgb(227, 243, 238);
}
.view-more {
  color: rgb(102, 102, 203);
  margin-top: 20px;
  text-decoration: underline;
  cursor: pointer;
}
.clear {
  color: rgb(235, 219, 219);
}
</style>
