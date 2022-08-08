<template>
  <div>
    <UtilsFilterComponent disable-visualization>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
          @page-changed="pageChange"
        >
          <template #status="{ data }">
            <span v-if="data.item.status === 'NS'" class="badge badge-info">{{
              data.item.status
            }}</span>
          </template>
          <template #clear="{ data }">
            <label class="exercise-option-check blue-check">
              <input
                type="checkbox"
                name="customRadio"
                @change="addToClear($event.target.checked, data.item)"
              />
              <span class="checkmark"></span>
              <!-- <span class="text">"dcdfv"</span> -->
            </label>
          </template>

          <template #cleared_status="{ data }">
            <span v-if="data.item.cleared_status === 'CLEARED'" class="badge badge-primary">{{
              data.item.cleared_status
            }}</span>
             <span v-if="data.item.cleared_status === 'UNCLEARED'" class="badge badge-warning">{{
              data.item.cleared_status
            }}</span>
          </template>
        </TableComponent>
        <DashboardModalProcessBillModal :goods="unClearedBill" :total="total" :nameData="data" @ok="payment($event)" @removedItem="deleteGoods($event)" />
        <DashboardModalPayerDetails/>
      </template>
    </UtilsFilterComponent>

    <div class="row p-4">
      <div class="col-md-12">
        <h3>Total: ₦ {{ numberWithCommas(total) }}</h3>
      </div>
      <div class="col-md-3">
        <BaseButton
          class="btn-outline-primary btn-lg btn-block"
          @click="$bvModal.show('modal')"
          >Pay</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { remove } from 'lodash'
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
      busy: false,
      items: [
      ],
      fields: [
        {
          key: 'clear',
          label: '',
        },
        {
          key: 'transaction_date',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
        },
        {
          key: 'bill_source',
        },
        {
          key: 'description',
        },
        {
          key: 'quantity',
        },

        {
          key: 'selling_price',
        },
        {
          key: 'cleared_status',
        },
      ],
      unClearedBill: [],
    }
  },
  computed: {
    total() {
      let total = 0
      this.unClearedBill.forEach((item) => {
        if(item.cleared_status === 'UNCLEARED'){
          total += Number.parseFloat(item.selling_price)
        }
        else{
        this.$toast({
        type: 'info',
        text: `Bill has already being cleared`,
      })
        }
      })
      return total
    },
  },
  async mounted() {
    await this.pageChange(1)
  },
  methods: {
    async pageChange(page = 1) {
      try {
        this.busy = true
        const data = await this.$api.finance.bills({
          patient: this.$route.params.uuid,
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
    addToClear(e, item) {
      console.log(e, item)
      if (e) {
        this.unClearedBill.push(item)
      } else {
        this.unClearedBill = remove(this.unClearedBill, (n) => {
          return n.id !== item.id
        })
      }
    },
    deleteGoods(e){
      if(e){
        this.unClearedBill.filter((el) => {
            if(el === e){
              this.unClearedBill.splice(e, 1)
            }
        })
      }
    },
    async payment(info) {
      try {
        const patient = await this.$api.patient.getPatient(this.$route.params.uuid);
        let billID = [];
        const unClearedList = this.unClearedBill.filter(
          (item) => item.cleared_status !== 'CLEARED'
        )
        if (unClearedList.length > 0) {
          billID = unClearedList.map((item) => item.id)
        }
        await this.$api.finance.makePayment({
          bills: billID,
          patient: this.data.id,
          payments: info,
        })
        this.$toast({
          type: 'success',
          text: 'Payment Successful',
        })
        this.$bvModal.hide('modal')
        this.pageChange(1)
        this.unClearedBill = []
      } catch (error) {
        console.log(error)
      }
    },

     numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
  },
}
</script>

<style lang="scss" scoped>
</style>