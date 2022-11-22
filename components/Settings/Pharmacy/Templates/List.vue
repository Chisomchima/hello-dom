<template>
  <div>
    <UtilsFilterComponent @search-input="searchMe($event)" disable-visualization disable-pagination>
      <template #besideFilterButton>
        <BaseButton @click="$bvModal.show('prescribe')" class="btn-outline-primary">Add Template</BaseButton>
      </template>
      <template>
        <TableComponent :fields="fields" :pages="pages" :items="items" :busy="busy"
          @edit="edit($event)" @delete="deleteItem($event)">
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <SettingsPharmacyTemplatesAddTemplate @refresh="pageChange(1)"/>
    <SettingsPharmacyTemplatesEditTemplate :editData="editObj" @refresh="pageChange(1)"/>
  </div>
</template>
  
<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  props: {},
  data() {
    return {
      editObj: {
      },
      filters: {
        name: '',
        size: 10,
      },
      modalTitle: 'Add Template Prescription',
      fields: [
        {
          key: 'created_at',
          label: 'Date',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
          },
          sortable: true,
        },
        {
          key: 'created_by',
          label: 'Created by',
          sortable: true,
          formatter: (val) => {
            if (Object.keys(val).length > 0) {
              return val.first_name + ' ' + val.last_name
            }
            else {
              return ''
            }
          },
        },
        {
          key: 'title',
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
      this.filters.name = e
      this.pageChange(1, this.filters)
    },
    async pageChange(page = 1, e = { name: '', size: 10 }) {
      try {
        this.busy = true
        const data = await this.$api.templates.getTemplates({ page, ...e })
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
      console.log(e)
      this.editObj = e
      this.$bvModal.show('editPrescription')
    },
    async deleteItem(item) {
      const result = await this.showConfirmMessageBox('Delete prescription template ?')
      try {
        if (result) {
          let response = await this.$api.templates.deleteTemplate(item.id)
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