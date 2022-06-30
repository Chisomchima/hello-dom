<template>
  <div>
    <UtilsFilterComponent disable-visualization disable-pagination>
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="$bvModal.show('modal')"
          >Lab Unit</BaseButton
        >
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
          @edit="edit($event)"
          @page-changed="pageChange(1)"
        >
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <DashboardModalAddImagingLabUnit
      @hide="editObj = {}"
      :edit-data="editObj"
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
      editObj: {},
      fields: [
        {
          key: 'name',
        },
        {
          key: 'order_no',
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
    async pageChange(page = 1) {
      try {
        this.busy = true
        const data = await this.$api.imaging.getLabUnit({ page })
        this.items = data.results
        this.pages = data.total_pages
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    edit(e) {
      this.editObj = e
      this.$bvModal.show('modal')
      console.log(e)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>