<template>
  <div>
    <UtilsFilterComponent
      disable-visualization
      disable-pagination
      @search-input="searchMe($event)"
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
          :modal-title="modalTitle"
          :busy="busy"
          @page-changed="pageChange($event, filters)"
          @edit="edit($event)"
          @delete="deleteItem($event)"
        >
          <template #description="{ data }">
            <div class="">
              <span>{{ data.item.description }}</span>
            </div>
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <MedicalReportsAddCategory
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
        search: '',
        size: 10,
      },
      modalTitle: 'Add Category',
      fields: [
        {
          key: 'name',
        },
        {
          key: 'description',
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
      this.filters.search = e
      this.pageChange(1, this.filters)
    },
    async pageChange(page = 1, e = { search: '', size: 10 }) {
      try {
        this.busy = true
        const data = await this.$api.medicalReport.getParents({ page, ...e })
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
      this.modalTitle = 'Add Medical Record Category'
      this.$bvModal.show('addMedicalCategory')
    },
    edit(e) {
      this.editObj = e
      this.modalTitle = 'Edit Category'
      this.$bvModal.show('addMedicalCategory')
    },
    async deleteItem(item) {
      const result = await this.showConfirmMessageBox('Delete category ?')
      try {
        if (result) {
          await this.$api.medicalReport.deleteCategory(item.id)
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
