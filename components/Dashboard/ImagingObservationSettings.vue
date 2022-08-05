<template>
  <div>
    <UtilsFilterComponent @search-input="searchMe($event)" disable-visualization disable-pagination>
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="$bvModal.show('modal')"
          >Add Observation</BaseButton
        >
      </template>
      <template>
        <TableComponent @edit="edit($event)"
          @page-changed="pageChange($event, filter)"
          @delete="deleteItem($event)"
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
           :perPage="filter.size"
            :showBaseCount="trigger"
          :currentPage="currentPage"
           :totalRecords="totalRecords"
        >
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <DashboardModalAddImagingObservation
      @hide="editObj = {}"
      :edit-data="editObj"
      @refresh="refreshMe"
    />

    <DashboardModalDelete :editData="editObj"
      @refresh="refreshMe"/>
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  props: {},
  data() {
    return {
      editObj: {},
        filter: {
        size: 10,
        name: '',
      },
      pages: 1,
      currentPage: 1,
      totalRecords: 0,
      fields: [
        {
          key: 'name',
        },
        {
          key: 'modality.name',
          label: 'Modality',
        },
        {
          key: 'actions',
          label: '',
        },
      ],
    }
  },
  async mounted() {
    await this.pageChange()
  },
   computed: {
    trigger() {
      if (this.items.length != 0) {
        return true
      }
    },
  },
  methods: {
    searchMe(e){
      this.filter.name = e
      this.pageChange(this.currentPage, this.filter)
    },
    async pageChange(page = 1, e={ size: 10, name: '' }) {
      try {
        this.busy = true
        const data = await this.$api.imaging.getObservation({...e, page: page })
        this.items = data.results
        this.pages = data.total_pages
        this.totalRecords = data.total_count
        this.currentPage = data.current_page
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    edit(e) {
      this.editObj = { ...e , modality: e.modality.id}
      this.$bvModal.show('modal')
      console.log(e)
    },
    deleteItem(e){
      console.log(e)
      this.editObj = { ...e , modality: e.modality.id}
      this.$bvModal.show('deleteModal')
    },
    refreshMe() {
      this.pageChange(this.currentPage)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>