<template>
    <div>
      <UtilsFilterComponent @search-input="searchMe($event)" disable-visualization disable-pagination>
        <template #besideFilterButton>
          <BaseButton class="btn-outline-primary" @click="openModal">Add Store</BaseButton>
        </template>
        <template>
          <TableComponent @page-changed="pageChange($event, filters)" :fields="fields" :pages="pages" :items="items" :modalTitle="modalTitle" :busy="busy"
            @edit="edit($event)" @delete="deleteItem($event)">
            <template #description="{ data }">
              <div class="">
                <span>{{ data.item.description }}</span>
              </div>
            </template>
            <template #type="{ data }">
              <div class="">
                <span>{{ data.item.type }}</span>
              </div>
            </template>
          </TableComponent>
        </template>
      </UtilsFilterComponent>
      <MedicalReportsAddServiceCenter :edit-data="editObj" @refresh="pageChange(1)" :modalTitle="modalTitle" />
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
            key: 'created_at',
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
          const data = await this.$api.medicalReport.getServiceCenters({ page, ...e })
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
        this.modalTitle = 'Add Service Center'
        this.$bvModal.show('addServiceCenter')
      },
      edit(e) {
        this.editObj = e
        this.modalTitle = 'Edit Store'
        this.$bvModal.show('addServiceCenter')
      },
      async deleteItem(item) {
        const result = await this.showConfirmMessageBox('Delete store ?')
        try {
          if (result) {
            await this.$api.medicalReport.deleteServiceCenter(item.id)
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