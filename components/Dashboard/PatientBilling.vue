<template>
  <div>
    <UtilsFilterComponent disable-visualization>
      <!-- <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="$bvModal.show('modal')"
          >New Encounter</BaseButton
        >
      </template> -->
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
            <span v-if="data.item.status === 'NS'" class="badge badge-info">{{
              data.item.status
            }}</span>
          </template>
          <template #clear="{ data }">
             <label
              class="exercise-option-check blue-check"
            >
              <input type="checkbox" name="customRadio" @change="addToClear($event.target.checked)"/>
              <span class="checkmark"></span>
              <!-- <span class="text">"dcdfv"</span> -->
            </label>

          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>

    <div class="row">
        <div class="col-md-12 align-self-end text-right">
            <BaseButton>Pay</BaseButton>
        </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  props: {
    // data: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      busy: false,
      items: [
        {
          id: 0,
          bill_item_code: 'string',
          cost_price: '-5453069.',
          selling_price: '-15510',
          cleared_status: 'CLEARED',
          quantity: 2147483647,
          bill_source: 'string',
          billed_to_type: 'SELF',
          co_pay: '8683292.8',
          service_center: 'string',
          description: 'string',
          is_service_rendered: true,
          is_invoiced: true,
          is_capitated: true,
          auth_code: 'string',
          transaction_date: '2022-06-30T14:00:59.059Z',
          billed_to: 0,
        },
      ],
      fields: [
        {
          key: 'clear',
        },
        {
          key: 'bill_item_code',
        },
        {
          key: 'cost_price',
        },
        {
          key: 'selling_price',
        },
        {
          key: 'quantity',
        },
        {
          key: 'bill_source',
        },
        {
          key: 'service_center',
        },
        {
          key: 'billed_to_type',
        },
        {
          key: 'cleared_status',
        },
      ],
    }
  },
  async mounted() {
    // await this.pageChange(1)
  },
  methods: {
    async pageChange(page = 1) {
      try {
        this.busy = true
        const data = await this.$api.finance.bills()
        console.log(data)
        this.items = data.results
        this.pages = data.total.pages
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
    addToClear(e){
        console.log(e);
    }
  },
}
</script>

<style lang="scss" scoped>
</style>