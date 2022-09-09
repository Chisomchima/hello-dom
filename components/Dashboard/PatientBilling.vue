<template>
  <div>
    <div>
      <!-- <button @click="$bvModal.show('printInvoice?')" class="btn btn-outline-primary btn-sm">Print</button> -->
    </div>

    <UtilsFilterComponent
      @uncleared="getUnclearedBill"
      @cleared="getClearedBill"
      @all="getAllBills"
      @search-input="searchBills"
      @view-by="getSome($event)"
      :dropdownFilter="true"
      :dropDownOptions="['uncleared', 'cleared', 'all']"
      disable-visualization
    >
      <template #besidesViewBy>
        <div class="d-flex">
          <div class="col-md-6">
            <span class="text-12 text-grey">Date from:</span>
            <input
              type="date"
              class="form-control"
              :max="maxDate"
              v-model="filter.dateFrom"
            />
          </div>
          <div class="col-md-6">
            <span class="text-12 text-grey">Date to:</span>
            <input
              type="date"
              class="form-control"
              :min="minDate"
              v-model="filter.dateTo"
            />
          </div>
        </div>
      </template>

      <template>
        <TableComponent
          :fields="fields"
          :perPage="filter.size"
          :pages="pages"
          :items="items"
          :busy="busy"
          @page-changed="pageChange($event, filter)"
          :showBaseCount="trigger"
          :currentPage="currentPage"
          :totalRecords="totalRecords"
        >
          <template #clear="{ data }">
            <label class="exercise-option-check blue-check">
              <input
                type="checkbox"
                name="customRadio"
                @change="addToClear($event.target.checked, data.item)"
              />
              <span class="checkmark"></span>
            </label>
          </template>

          <template #is_reserved="{ data }">
            <span v-if="data.item.is_reserved" class="badge-warning p-1 rounded"
              >R</span
            >
          </template>
          <template #triple_actions="{ data }">
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                <b-icon icon="three-dots-vertical"></b-icon>
              </template>
              <template>
                <b-dropdown-item
                  v-if="data.item.is_reserved === true"
                  class="text-capitalize"
                  >Unreserve</b-dropdown-item
                >
                <b-dropdown-item
                  class="text-capitalize"
                  v-if="data.item.is_reserved === false"
                  >Reserve</b-dropdown-item
                >
                <b-dropdown-item class="text-capitalize"
                  >Transfer</b-dropdown-item
                >
              </template>
            </b-dropdown>
          </template>

          <template #cleared_status="{ data }">
            <span
              v-if="data.item.cleared_status === 'CLEARED'"
              class="badge-primary rounded p-1 text-14"
              >{{ data.item.cleared_status }}</span
            >
            <span
              v-if="data.item.cleared_status === 'UNCLEARED'"
              class="badge-warning rounded p-1 text-14"
              >{{ data.item.cleared_status }}</span
            >
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>

    <div class="row align-items-end px-3 pb-1">
      <div class="col-md-4">
        <h5 class="mb-1">Total: ₦ {{ numberWithCommas(total) }}</h5>
        <BaseButton
          class="btn-outline-primary btn-lg btn-block"
          @click="proceedToPayout"
          >Pay</BaseButton
        >
      </div>
      <div class="col-md-4">
        <BaseButton
          class="btn-outline-primary btn-lg btn-block"
          @click="proceedToPayout"
          >Authorize</BaseButton
        >
      </div>
    </div>
    <DashboardModalProcessBillModal
      :goods="unClearedBill"
      :total="total"
      :reserved="reserved"
      :nameData="data"
      :totalPaid="totalPaid"
      :showPayments="showPayments"
      @clear="setState"
      @ok="payment($event)"
      @removedItem="deleteGoods($event)"
    />
    <DashboardModalAuthorizeBillModal
      :nameData="data"
      :total="total"
      :goods="unClearedBill"
      @authCode="setAuthCode"
    />
    <DashboardModalConfirmInvoicePrint :data="data" :reciept="template" />
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { remove } from 'lodash'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
import { error } from 'highcharts'

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
      pages: 1,
      currentPage: 1,
      totalRecords: 0,
      template: {},
      items: [],
      fields: [
        {
          key: 'clear',
          label: '',
        },
        {
          key: 'transaction_date',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
          },
        },
        {
          key: 'description',
        },
        {
          key: 'bill_source',
        },
        {
          label: 'Bill to',
          key: 'billed_to.name',
        },
        {
          label: 'Bill type',
          key: 'billed_to_type',
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
        {
          key: 'is_reserved',
          label: '',
        },
        {
          key: 'triple_actions',
          label: '',
        },
      ],
      unClearedBill: [],
      authData: {
        bills: [],
        auth_code: '',
      },
      showPayments: false,
      filter: {
        size: 10,
        name: '',
        status: '',
        dateFrom: '',
        dateTo: '',
        is_invoiced: false,
      },
    }
  },

  watch: {
    'filter.dateFrom'() {
      this.pageChange(this.currentPage, this.filter)
    },
    'filter.dateTo'() {
      this.pageChange(this.currentPage, this.filter)
    },
  },

  computed: {
    total() {
      let total = 0
      this.unClearedBill.forEach((item) => {
        total += Number.parseFloat(item.selling_price)
      })
      return total
    },
    totalPaid() {
      let total = 0
      this.unClearedBill.forEach((item) => {
        if (!item.is_reserved) {
          total += Number.parseFloat(item.selling_price)
        }
      })
      return total
    },
    reserved() {
      let reserved = 0
      this.unClearedBill.forEach((item) => {
        if (item.is_reserved) {
          reserved += Number.parseFloat(item.selling_price)
        }
      })
      return reserved
    },

    maxDate() {
      let today = new Date()
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
    minDate() {
      let today = new Date()
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
    trigger() {
      if (this.items.length != 0) {
        return true
      }
    },
  },
  async mounted() {
    await this.pageChange()
  },
  methods: {
    getUnclearedBill() {
      this.filter.status = 'UNCLEARED'
      this.pageChange(1, this.filter)
    },
    getClearedBill() {
      this.filter.status = 'CLEARED'
      this.pageChange(1, this.filter)
    },
    getAllBills() {
      this.filter.status = ''
      this.pageChange(1, this.filter)
    },
    searchBills(e) {
      console.log(e)
      this.filter.name = e
      this.pageChange(this.currentPage, this.filter)
    },
    getSome(e) {
      this.filter.size = e
      this.pageChange(this.currentPage, this.filter)
    },
    async pageChange(
      page = 1,
      e = { size: 10, name: '', status: '', is_invoiced: false }
    ) {
      try {
        this.busy = true
        const data = await this.$api.finance.bills({
          patient: this.$route.params.uuid,
          page,
          ...e,
        })
        console.log(data)
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
    addToClear(e, item) {
      if (e) {
        if (item.cleared_status === 'CLEARED' && item.is_reserved == false) {
          this.$toast({
            type: 'info',
            text: 'Bill has already been cleared',
          })
        } else if(item.cleared_status === 'UNCLEARED' && item.is_reserved == false){
          this.unClearedBill.push(item)
        }
        else{
          this.$toast({
            type: 'info',
            text: `Reserved bill can't be invoiced`,
          })
        }
      } else {
        this.unClearedBill = remove(this.unClearedBill, (n) => {
          return n.id !== item.id
        })
      }
    },
    async unReserveBill(e) {
      let tempID = e.id
      let temp = e
      delete temp.id
      try {
        let response = await this.$api.finance.unReserveBill(temp, tempID)
        this.pageChange(this.currentPage, this.filter)
        this.$toast({
          type: 'success',
          text: 'Bill unreserved',
        })
      } catch (error) {
        console.log(error)
      }
    },
    async reserveBill(e) {
      let tempID = e.id
      let temp = e
      delete temp.id
      try {
        let response = await this.$api.finance.reserveBill(temp, tempID)
        this.pageChange(this.currentPage, this.filter)
        this.$toast({
          type: 'success',
          text: 'Bill unreserved',
        })
      } catch (error) {
        console.log(error)
      }
    },
    proceedToPayout() {
      let insurance = 0
      let self = 0

      this.unClearedBill.forEach((el) => {
        if (el.billed_to_type === 'INSURANCE' && el.is_auth_req === true) {
          insurance++
        } else {
          self++
        }
      })

      if (insurance != 0 && self != 0) {
        this.$toast({
          type: 'info',
          text: `Insurance bills can not be cleared with self paid bills`,
        })
      } else if (insurance != 0 && self == 0) {
        this.authorizeBill()
      } else if (insurance == 0 && self != 0) {
        let reserveFlag = 0
        this.unClearedBill.forEach((el) => {
          if (el.is_reserved && el.cleared_status === 'CLEARED') {
            reserveFlag++
          }
        })

        if (reserveFlag != this.unClearedBill.length) {
          this.showPayments = true
        }

        this.$bvModal.show('modal')
      } else {
        this.$toast({
          type: 'info',
          text: `No item in cart`,
        })
      }
    },
    authorizeBill() {
      if (this.unClearedBill.length > 0) {
        this.$bvModal.show('authorize')
      } else {
        this.$toast({
          type: 'info',
          text: `No item to authorize`,
        })
      }
    },
    deleteGoods(e) {
      this.unClearedBill = remove(this.unClearedBill, (n) => {
        return n.id !== e.id
      })
    },
    setState(e) {
      this.showPayments = e
    },
    setAuthCode(e) {
      this.authData.auth_code = e
      this.validateHMO()
    },
    async validateHMO() {
      let billID = []
      if (this.unClearedBill.length > 0) {
        billID = this.unClearedBill.map((item) => item.id)
      }
      this.authData.bills = billID
      try {
        let response = await this.$api.finance.auhtorizeHMO(this.authData)
        this.$nuxt.refresh()
        this.$bvModal.hide('authorize')
        this.pageChange(this.currentPage, this.filter)
        this.unClearedBill = []
        this.$toast({
          type: 'success',
          text: 'Validation successful',
        })
      } catch {}
    },
    async payment(info) {
      try {
        const patient = await this.$api.patient.getPatient(
          this.$route.params.uuid
        )
        let billID = []
        const unClearedList = this.unClearedBill.filter(
          (item) =>
            item.cleared_status === 'CLEARED' ||
            item.cleared_status === 'UNCLEARED'
        )
        if (unClearedList.length > 0) {
          billID = unClearedList.map((item) => item.id)
        }
        let response = await this.$api.finance.makePayment({
          bills: billID,
          patient: this.data.id,
          payments: info,
        })
        this.template = response
        this.$toast({
          type: 'success',
          text: 'Payment Successful',
        })
        this.$nuxt.refresh()
        this.$bvModal.hide('modal')
        this.$bvModal.show('printInvoice?')
        this.pageChange(this.currentPage, this.filter)
        this.unClearedBill = []
      } catch (error) {
        console.log(error)
      }
    },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 5rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}
</style>