<template>
  <div>
    <UtilsFilterComponent disable-visualization disable-pagination>
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary">New Lab Order</BaseButton>
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
          @page-changed="pageChange($event)"
        >
          <template #info="{ data }">
            <button
              class="btn btn-primary"
              @click="showDetails(data.item.lab_panel_orders)"
            >
              showDetails
            </button>
          </template>
          <template #print="{ data }">
            <button class="btn btn-primary" @click="save_file(data.item)">
              Print
            </button>
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <DashboardModalShowLabOrderDetails :lab-order="labOrder" />
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      labOrder: [],
      fields: [
        {
          key: 'asn',
        },
        {
          key: 'ordered_datetime',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('DDD')
          },
        },
        {
          key: 'info',
        },
        {
          key: 'print',
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
        const data = await this.$api.laboratory.getPatient({
          patient_uhid: this.data.uhid,
          page,
        })
        console.log(data)
        this.items = data.results
        this.pages = data.total_pages
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },

    save_file(e) {
      this.$api.laboratory
        .downloadLabOrder(e.id)
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.download = `Lab Report_`
          link.href = objectURL
          this.downloading = false
          link.click()
        })
        .catch((err) => {
          console.log(err)
          this.downloading = false
        })
    },
    showDetails(labOrder) {
      this.labOrder = labOrder
      this.$bvModal.show('showDetails')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>