<template>
  <div>
    <UtilsFilterComponent
      :has-category=true
      disable-visualization
      disable-pagination
      :items = 'items'
      @search-input="searchMe($event)"
      @cat-search-input = "$event => searchCat($event)"
    >
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="openModal"
          >Add Product</BaseButton
        >
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :modal-title="modalTitle"
          :busy="busy"
          @page-changed="pageChange($event, filters)"
          @edit="edit($event)"
          @delete="deleteItem($event)"
        >
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <SettingsInventoryProductsAddProduct
      :edit-data="editObj"
      :modal-title="modalTitle"
      @refresh="pageChange(1)"
    />
    
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  props: {},
  data() {
    return {
      editObj: {
        name: '',
        multiplier: '',
      },
      filters: {
        name: '',
        size: 10,
        category: [],
      },
      modalTitle: 'Add Product',
      fields: [
        // {
        //   key: 'created_at',
        //   label: 'Date created'
        // },
        {
          key: 'code',
        },
        {
          key: 'name',
        },
        {
          key: 'category.name',
          label: 'Category',
        },
        {
          key: 'Quantity On Hand',
          label: 'quantity_on_hand',
        },
        {
          key: 'UoM',
        },
        {
          key: 'actions',
          label: '',
        },
      ],
      items: [
        {
          code: 'NHIS-36-00-27',
          name: 'Panadol',
          category: 'Cytotoxics And Adjuvants',
          quantity_on_hand: 2,
          uom: 'ml',
        },
       
      ]
    }
  },
  async mounted() {
    await this.pageChange(1)
  },
  methods: {
    searchMe(e) {
      this.filters.name = e
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {category, ...others} = this.filters
      this.pageChange(1, others)
    },
    searchCat(e) {
      this.filters.category = e
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {name, ...others} = this.filters
      this.pageChange(1, others)
    },
    async pageChange(page = 1, e = { name: '', category: [],size: 10 }) {
      try {
        this.busy = true
        const data = await this.$api.inventory.getProducts({ page, ...e })
        this.items = data.results
        this.pages = data.total_pages
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    openModal() {
      this.modalTitle = 'Add Product'
      this.$bvModal.show('addProduct')
    },
    edit(e) {
      this.editObj = e
      this.modalTitle = 'Edit Product'
      this.$bvModal.show('addProduct')
    },
    async deleteItem(item) {
      const result = await this.showConfirmMessageBox('Delete Product ?')
      try {
        if (result) {
          await this.$api.inventory.deleteProduct(item.id)
          this.$toast({
            type: 'success',
            text: `Deleted`,
          })
          this.pageChange(1, this.filters)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
