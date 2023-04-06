<template>
  <div class="w-100 px-3 justify-content-center row">
    <div class="col-md-6">
      <!-- <pre>{{ prod }}</pre> -->
      <ValidationProviderWrapper name="Product" :rules="['']">
        <input v-model="search" type="text" class="form-control mb-s" />
      </ValidationProviderWrapper>
      <div v-if="isLoading">

      </div>
      <div v-if="makeVisible" class="w-100 mt-5 border box-wrap px-3">
        <div class="clear" @click="close()">X</div>
        <div v-for="(product, i) in products" :key="i" class="search-options">
          <div
            class="option w-100"
            @click="handleSelectedProduct(product.name, product.id)"
          >
            {{ product.name }}
          </div>
        </div>
        <span class="view-more" @click="$bvModal.show('id')">view more</span>
      </div>
    </div>
    <div class="col-md-6">
      <ValidationProviderWrapper name="Quantity" :rules="[]">
        <input v-model="quantity" type="number" class="form-control mb-2" />
      </ValidationProviderWrapper>
    </div>
    <div>
      <DashboardModalAddReceipt :search="search" :make-visible="makeVisible" @getId="setId($event)" />
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  // props: {
  //   isUpdate: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   prod: {
  //     type: Object,
  //     required: true
  //   }
  // },
  data() {
    return {
      search: '',
      isLoading: false,
      makeVisible: false,
      quantity: 0,
      products: [],
      singleProduct: { product: '', quantity: 0 },
    }
  },
  watch: {
    search(...args) {
      this.debouncedFetch(...args)
    },
    quantity(newVal) {
      this.singleProduct.quantity = Number(newVal)
      this.$emit('quantity', newVal)
    },
  },

  mounted() {
    this.debouncedFetch = debounce(async (newValue) => {
      this.isLoading = true
      try {
        this.makeVisible = true
        const { results } = await this.$api.inventory.getProducts({
          search: newValue,
          size: 10,
        })
        this.products = results
        this.isLoading =false
      } catch (err) {
        this.isLoading = false
        this.makeVisible = false
      }
    }, 1000)
  },
  methods: {
    handleSelectedProduct(param, id) {
      this.search = param
      this.$emit('prodId', id)
      this.makeVisible = false
    },
    close() {
      this.makeVisible = false
    },
    setId(e) {
      console.log(e)
      this.search = e.name
      this.makeVisible = false
      this.$emit('getId', e.id)
     this.$watch('foo', function(){
      console.log('unwatched')
     })
     
    },
  },
}
</script>

<style scoped>
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
.box-wrap {
  position: relative;
  padding-top: 50px;
}
.clear {
  color: white;
  cursor: pointer;
  background-color: rgb(227, 184, 184);
  height: 25px;
  width: 25px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
