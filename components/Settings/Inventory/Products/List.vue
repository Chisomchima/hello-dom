<template>
  <div>
    <UtilsFilterComponent
      @search-input="searchMe($event)"
      disable-visualization
      disable-pagination
    >
      <template #besideFilterButton>
        <BaseButton
          class="btn-outline-primary"
          @click="openModal"
          >Add Product</BaseButton
        >
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :modalTitle="modalTitle"
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
      @refresh="pageChange(1)"
      :modalTitle="modalTitle"
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
      },
      modalTitle: 'Add Product',
      fields: [
        {
          key: 'created_at',
          label: 'Date created'
        },
        {
          key: 'code',
        },
        {
          key: 'name',
        },
        {
          key: 'category.name',
          label: 'Category'
        },
        {
          key: 'uom',
        },
        {
          key: 'actions',
          label: '',
        },
      ],
    }
  },
  async mounted() {
    await this.pageChange(1)
  },
  methods: {
    searchMe(e) {
      this.filters.name = e
      this.pageChange(1, this.filters)
    },
    async pageChange(page = 1, e = { name: '', size: 10 }) {
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
    openModal(){
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
          let response = await this.$api.inventory.deleteProduct(item.id)
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

<style lang="scss" scoped>
</style>