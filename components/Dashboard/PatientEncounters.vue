<template>
  <div>
    <UtilsFilterComponent disable-visualization disable-pagination>
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="$bvModal.show('modal')"
          >New Encounter</BaseButton
        >
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
          @page-changed="pageChange"
          @row-clicked="onRowClicked"
        >
          <template #status="{ data }">
            <span v-if="data.item.status === 'NS'" class="badge bg-info">{{
              data.item.status
            }}</span>
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <DashboardModalAddEncounter :data="data" @refresh="pageChange()" />
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
      required: true,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'encounter_datetime',
          label: 'Date&Time',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
          },
        },
        {
          key: 'encounter_id',
        },
        {
          key: 'encounter_type',
        },
        {
          key: 'clinic.Department.name',
          label: 'Department',
        },
        {
          key: 'clinic.name',
          label: 'Clinic',
        },
        {
          key: 'provider',
          formatter: (val) => {
            if (val.first_name || val.last_name) {
              return val.first_name + ' ' + val.last_name
            }
            else {
              return ''
            }
          },
        },
        
        {
          key: 'status',
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
        const data = await this.$api.encounter.getPatient(
          this.$route.params.uuid
        )
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
    onRowClicked(e) {
      this.$router.push({
        name: 'dashboard-opd-id',
        params: {
          id: e.id,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>