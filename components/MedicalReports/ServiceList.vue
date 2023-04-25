<template>
  <div>
    <UtilsFilterComponent
      disable-visualization
      disable-pagination
      @search-input="searchMe($event)"
    >
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="openModal"
          >Add Medical Report</BaseButton
        >
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :modal-title="modalTitle"
          :busy="busy"
          @edit="edit($event)"
          @delete="deleteItem"
          @row-clicked="onRowClicked($event)"
          @page-changed="pageChange($event, filter)"
        >
          <!-- <template #name="{ data }">
            <div class="name-cell">
              <span>{{ data.item.name}}</span>
            </div>
          </template> -->
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <MedicalReportsModalAddMedicalReport
      :edit-data="editObj"
      :modal-title="modalTitle"
      @refresh="pageChange(1)"
    />
    <MedicalReportsModalViewMedicalReport
     :details="details"
    />
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
      details: {},
      editObj: {
        // name: '',
        // description: '',
      },
      filters: {
        name: '',
        size: 10,
      },
      modalTitle: 'Add Medical Report',
      fields: [
        {
          key: 'bill_item_code',
          label: 'Bill Code',
          width: '60%',
        },
        {
          key: 'name',
          label: 'Name',
          thStyle: { width: "20%" },
        },
        {
          key: 'cost_price',
          label: 'Cost Price',
          formatter: (value) => {
            return value
              ? value.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'NGN',
                })
              : ''
          },
        },
        {
          key: 'bill_price',
          label: 'Selling Price',
          formatter: (value) => {
            return value
              ? value.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'NGN',
                })
              : ''
          },
        },
        // {
        //   key: 'created_at',
        //   formatter: (value) => {
        //     return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
        //   },
        //   label: 'Created At',
        // },
        // {
        //   key: 'created_by.email',
        //   label: 'Created by',
        // },
        {
          key: 'updated_at',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
          },
          label: 'Updated At',
        },
        {
          key: 'updated_by.email',
          label: 'Updated By',
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
        console.log('hey')
        const data = await this.$api.medicalReport.getMedicalRecords({ page, ...e })
        this.items = data.results
        console.log(this.items, 'items')
        this.pages = data.total_pages
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    openModal() {
      this.modalTitle = 'Add Medical Report'
      this.$bvModal.show('addMedicalReport')
    },
    edit(e) {
      this.editObj = e
      this.modalTitle = 'Edit Medical Report'
      this.$bvModal.show('addMedicalReport')
    },
    onRowClicked(e){
      console.log(e)
      this.details = e
    },
    async deleteItem(item) {
      const result = await this.showConfirmMessageBox(
        'Delete Medical Report ?'
      )
      try {
        if (result) {
        await this.$api.medicalReport.deleteMedicalRecord(item.id)
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
