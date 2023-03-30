<template>
  <ModalWrapper
    id="id"
    size="lg"
    title="View More Products"
    :stacking="false"
    @show="getData()"
    @hide="$bvModal.hide('id')"
  >
    <ValidationProviderWrapper name="Search" :rules="['']">
      <!-- <VSelect
                    v-model="product.product"
                    :options="products"
                    label="name"
                    @option:selected="fetchGenericDrugs($event, index)"
                  >
                  </VSelect> -->
      <input v-model="searchinput" type="text" name="" class="form-control" />
    </ValidationProviderWrapper>

    <div class="w-100 mt-3 bg-white px-3 shadow-sm p-2">
      <div v-for="(option, i) in products" :key="i" class="search-options">
        <div class="option w-100">
          {{ option.name }}
        </div>
      </div>
      <!-- <span class="view-more" @click="$bvModal.show('id')">view more</span> -->
      <b-pagination
        small
        v-model="page"
        :items="products"
        :total-rows="totalItems"
        :current-page="1"
        :per-page="20"
        @change="handlePageChange"
      ></b-pagination>
    </div>
    <div
      v-if="isLoading"
      class="d-flex align-items-center justify-content-center mt-3"
    >
    </div>
    <b-spinner
        style="width: 3rem; height: 3rem"
        label="Large Spinner"
        variant="primary"
      ></b-spinner>
  </ModalWrapper>
</template>

<script>
export default {
  props: {
    search: {
      required: true,
    },
    isReciept: {
      type: Boolean,
      default: true,
      require: false,
    },
    role: {
      require: false,
    },
    // products:{
    //   required: true,
    // },
    makeVisible: {
      required: true,
    },
    picked: {
      required: true,
    },
  },
  data() {
    return {
      searchinput:'',
      products: [],
      isLoading: false,
      page: 1,
      count: 0,
      totalItems: 0,
      pageSize: 20,
    }
  },
  async mounted() {
    await this.getData()
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        this.save()
      }
    },
    handlePageChange(value) {
      this.page = value
    },
    // pickProd(param) {
    //   this.search = param
    //   this.products = []
    //   this.makeVisible = false
    //   this.refetch = true
    //   this.$bvModal.hide('id')
    // },

    // pickProd(param, i) {
    // //   this.placholder.push(param)
    // this.search[i]= param

    //   console.log(this.search[i], this.products, 'search')
    //   this.picked=true
    // //   this.products = []
    //   this.makeVisible = false
    // //   this.refetch = true
    // },
    closeModal() {
      this.$bvModal.hide('id')
    },

    async getData() {
      this.isLoading = true
      try {
        const { results } = await this.$api.inventory.getProducts({
          search: this.search,
          size: this.pageSize,
          page: this.page,
        })
        this.totalItems = results.length
        console.log(results, 'results')
        this.products = results
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
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
</style>
