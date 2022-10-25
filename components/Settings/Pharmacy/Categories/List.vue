<template>
  <div>
    <UtilsFilterComponent
      @search-input="searchMe($event)"
      disable-visualization
      disable-pagination
    >
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="openModal"
          >Add Category</BaseButton
        >
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :modalTitle="modalTitle"
          :busy="busy"
          @edit="edit($event)"
        >
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <SettingsPharmacyCategoriesAddCategory
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
        parent: '',
      },
      payload: {
        name: '',
        description: '',
        display_name: '',
        is_active: true,
      },
      filters: {
        name: '',
        size: 10,
      },
      modalTitle: 'Add Category',
      fields: [
        {
          key: 'name',
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
        const data = await this.$api.pharmacy.getCategories({ page, ...e })
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
      this.modalTitle = 'Add Category'
      this.$bvModal.show('addCategory')
    },
    edit(e) {
      this.editObj = e
      this.modalTitle = 'Edit Category'
      this.$bvModal.show('addCategory')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>