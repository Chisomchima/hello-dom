<template>
  <ModalWrapper
    title="Invoice details"
    id="invoiceModal"
    :stacking="false"
    @ok="ok()"
    @hide="closeModal"
    size="xl"
  >
    <!-- <template #modal-header="{ close }">
      <div>
        <span class="d-none">{{close}}</span>
        <span
          v-if="invoice.status === 'PAID'"
          class="badge-success rounded p-1 text-white"
          >{{ invoice.status }}</span
        >
      </div>
    </template> -->

    <div v-if="invoice">
      <div class="row align-items-center text-14">
        <div v-if="invoice.patient" class="col-md-3">
          <span class="text-grey">UHID:</span>
          <span @click="goToProfile" class="hov point">{{
            invoice.patient.uhid
          }}</span>
        </div>

        <div v-if="invoice.patient" class="col-md-3">
          <span class="text-grey">Name:</span>
          <span class="hov point" @click="goToProfile">{{
            invoice.patient.salutation
              ? invoice.patient.salutation +
                ' ' +
                invoice.patient.firstname +
                ' ' +
                invoice.patient.lastname
              : invoice.patient.firstname + ' ' + invoice.patient.lastname
          }}</span>
        </div>
        <div v-if="invoice.patient" class="col-md-2 text-14">
          <span class="text-grey">Gender:</span> {{ invoice.patient.gender }}
        </div>
        <div
          class="d-flex align-items-center justify-content-end col-md-4 pl-4"
        >
          <div
            v-if="invoice.status ? true : false"
            class="d-flex justify-content-end"
          >
            <div class="mx-2">
              <b-dropdown
                v-if="editMode && invoice.status === 'DRAFT'"
                @click="saveAndConfirm"
                size="sm"
                :lazy="true"
                variant="primary"
                split-variant="outline-primary"
                split
                text="Save and Confirm"
              >
                <b-dropdown-item @click="ok()">
                  <span class="text-primary">Save as draft</span>
                </b-dropdown-item>
              </b-dropdown>
              <button
                v-if="!editMode && invoice.status === 'DRAFT'"
                @click="confirmInvoice"
                class="btn btn-primary btn-sm"
              >
                Confirm
              </button>
            </div>
          </div>
          <div v-if="layout" class="p-2 d-flex justify-content-end">
            <button
              v-if="!editMode && invoice.status === 'DRAFT'"
              @click="editBill"
              class="btn btn-primary btn-sm"
            >
              Edit
            </button>
            <button
              v-if="editMode"
              @click="editBill"
              class="btn btn-danger btn-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-md-3 d-flex align-items-center text-14">
          <span class="class-details-data_label mr-2">Scheme:</span>
          <span class="text-14 text-truncate">{{
            invoice.payer_scheme ? invoice.payer_scheme : 'nil'
          }}</span>
        </div>
        <div class="col-md-3 align-items-center">
          <span class="class-details-data_label mr-2">Scheme type:</span>
          <span class="text-14 text-truncate">{{
            invoice.scheme_type ? invoice.scheme_type : 'nil'
          }}</span>
        </div>
        <div class="col-md-3 align-items-center">
          <span class="class-details-data_label mr-2">Invoice ID:</span>
          <span class="text-14">{{
            invoice.inv_id ? invoice.inv_id : 'nil'
          }}</span>
        </div>
        <div class="col-md-5 align-items-center">
          <span class="class-details-data_label mr-2">Invoice Date:</span>
          <span class="text-14 text-truncate">{{
            invoice.confirmed_at ? dateFormatter(invoice.confirmed_at) : 'nil'
          }}</span>
        </div>
      </div>
      <hr />

      <div
        class="d-flex justify-content-between align-items-center mb-2 text-14"
        v-if="invoice"
      >
        <p class="mb-0">
          Total:
          {{ total ? numberWithCommas(total) : '0.00' }}
        </p>
        <p class="mb-0">
          Reserved:
          {{
            numberWithCommas(invoice.reserved_amount)
              ? numberWithCommas(invoice.reserved_amount)
              : '0.00'
          }}
        </p>
        <p class="mb-0">
          Paid amount: {{ numberWithCommas(invoice.paid_amount) }}
        </p>
        <p class="mb-0">Balance: {{ numberWithCommas(invoice.balance) }}</p>
        <div class="d-flex align-items-center">
          <div v-if="!editMode" class="mr-0">
            <svg
              @click="sendSignal"
              class="text-success mx-2 point"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M5 4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V5h.5A2.5 2.5 0 0 1 18 7.5v5a1.5 1.5 0 0 1-1.5 1.5H15v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 15.5V14H3.5A1.5 1.5 0 0 1 2 12.5v-5A2.5 2.5 0 0 1 4.5 5H5v-.5ZM6 5h8v-.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V5Zm-1 8v-1.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V13h1.5a.5.5 0 0 0 .5-.5v-5A1.5 1.5 0 0 0 15.5 6h-11A1.5 1.5 0 0 0 3 7.5v5a.5.5 0 0 0 .5.5H5Zm1.5-2a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-7Z"
              />
            </svg>
          </div>
          <div v-if="invoice.balance !== '0.00'">
            <button @click="makePayment" class="btn btn-outline-primary btn-sm">
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end mb-2" v-if="invoice.status">
      <span
        v-if="invoice.status === 'DRAFT'"
        class="badge-danger text-12 text-center rounded p-1 text-white"
        >{{ invoice.status }}</span
      >
      <span
        v-if="invoice.status === 'PAID'"
        class="badge-success text-12 text-center rounded p-1 text-white"
        >{{ invoice.status }}</span
      >
    </div>
    <TabView class="tabview-custom">
      <TabPanel class="dark-panel">
        <template #header>
          <span class="ml-2">Bill lines</span>
        </template>
        <div class="my-3" v-if="invoice">
          <TableComponent
            :items="bills"
            :fields="bill_fields"
            :paginate="false"
          >
            <template #is_reserved="{ data }">
              <span
                v-if="data.item.is_reserved"
                class="badge-warning p-1 rounded"
                >R</span
              >
            </template>
            <template #description="{ data }">
              <div v-if="editMode && !data.item.id">
                <input
                  v-model="data.item.description"
                  type="text"
                  name=""
                  class="form-control"
                />
              </div>
              <div v-if="!editMode && data.item._id">
                {{ data.item.description }}
              </div>
              <div v-if="editMode && data.item.id">
                {{ data.item.description }}
              </div>
            </template>
            <template #selling_price="{ data }">
              <div class="d-flex align-items-center" v-if="editMode">
                <input
                  v-model="data.item.selling_price"
                  type="text"
                  name=""
                  class="form-control"
                />
                <span
                  v-if="editMode && !data.item.id"
                  @click="removeBill(data.index)"
                  class="text-danger ml-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1ZM8 11a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <!-- <div v-if="editMode && data.item._id">
                {{ data.item.selling_price }}
              </div> -->
              <div v-else>
                {{ numberWithCommas(data.item.selling_price) }}
              </div>
            </template>
            <template #bill_source="{ data }">
              <div v-if="editMode && !data.item.id">
                <v-select
                  style="width: 10rem"
                  class="text-capitalize text-14"
                  placeholder="Bill lines"
                  label="label"
                  v-model="data.item.bill_source"
                  :reduce="(opt) => opt.value"
                  :options="[
                    { label: 'Imaging', value: 'IMAGING' },
                    { label: 'Laboratory', value: 'LABORATORY' },
                    { label: 'Encounters', value: 'ENCOUNTERS' },
                  ]"
                ></v-select>
              </div>
              <div v-if="editMode && data.item.id">
                {{ data.item.bill_source }}
              </div>
              <div v-if="!editMode && data.item._id">
                {{ data.item.bill_source }}
              </div>
            </template>
          </TableComponent>
        </div>
        <div>
          <span
            v-if="editMode"
            class="text-primary point text-14"
            @click="addNewBill"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1Zm1 15a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3Z"
                clip-rule="evenodd"
              />
            </svg>
            Add Bill</span
          >
        </div>
      </TabPanel>
      <TabPanel class="dark-panel">
        <template #header>
          <span class="ml-2">Payments lines</span>
        </template>
        <div v-if="invoice">
          <TableComponent
            :items="invoice.payment_lines"
            :fields="payment_fields"
            :paginate="false"
          >
          </TableComponent>
        </div>
      </TabPanel>
    </TabView>
    <template #footer="{ cancel }">
      <div v-if="true" class="d-flex justify-content-start">
        <span class="d-none">{{ cancel }}</span>
        <!-- <div>
          <b-button
            size="sm"
            variant="light"
            class="px-5 text-secondary mr-2"
            @click="close"
          >
            Cancel
          </b-button>
        </div> -->
      </div>
      <div v-if="false" class="d-flex w-100 justify-content-between px-5">
        <div class="w-50">
          <span class="d-none">{{ cancel }}</span>
          <b-button
            size="sm"
            variant="light"
            class="px-5 text-secondary mr-2"
            @click="editMode = false"
          >
            Cancel
          </b-button>
        </div>

        <div
          :class="editMode ? 'justify-content-between' : 'justify-content-end'"
          class="w-75 d-flex"
        >
          <div v-if="!editMode">
            <button
              class="btn btn-secondary px-5"
              @click="editMode = !editMode"
            >
              Edit
            </button>
          </div>

          <div v-if="editMode">
            <BaseButton
              extra-class="'px-5  btn-info'"
              :class="'px-5  btn-info'"
              @click="ok()"
            >
              Save
            </BaseButton>
          </div>
          <div>
            <BaseButton v-if="editMode" @click="saveAndConfirm" class="px-5">
              Confirm
            </BaseButton>
          </div>
        </div>
      </div>
    </template>
  </ModalWrapper>
</template>

<script>
import SplitButton from 'primevue/splitbutton'
import { DateTime } from 'luxon'
export default {
  components: {
    SplitButton,
  },
  props: {
    nameData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    invoice: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    data: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    orientation: {
      type: Boolean,
      require: false,
      default: () => false,
    },
    layout: {
      type: Boolean,
      require: false,
      default: () => false,
    },
  },
  data() {
    return {
      dataObject: {
        amount: '',
      },
      editable: false,
      default: [],
      bills: [],
      payAmount: 0,
      balance: 0,
      total: 0,
      totalBills: 0,
      paymentMethod: [],
      editMode: false,
      payments: [
        {
          payment_method: null,
          amount: '',
        },
      ],
      bill_fields: [
        {
          key: 'is_reserved',
          label: '',
        },
        {
          key: 'transaction_date',
          label: 'Date',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
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
          key: 'total',
        },
      ],
      payment_fields: [
        {
          label: 'Date',
          key: 'created_at',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
          },
        },
        {
          key: 'total_amount',
          label: 'Amount',
          sortable: true,
        },
        {
          key: 'payment_method.name',
          label: 'Payment method',
          sortable: true,
        },
        {
          key: 'payment_type',
          label: 'Payment type',
          sortable: true,
        },
      ],
    }
  },
  computed: {
    formattedQty() {
      // Add the commas back to the string
      const qty = this.dataObject.amount + ''
      console.log(qty)
      return qty.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
  created() {
    let a = 5
    let c = 7
    let b = a++ + ++c + a + ++a + --c
    console.log(b)
  },
  watch: {
    payAmount() {
      this.balance = this.total - this.payAmount
    },
    total() {
      this.balance = this.total - this.payAmount
    },
    invoice() {
      let calc = 0
      if (this.invoice.bill_lines) {
        let bills = this.invoice.bill_lines
        this.bills = bills
        this.invoice.bill_lines.forEach((el) => {
          calc += Number.parseFloat(el.selling_price)
        })
      }
      this.total = calc
    },
  },
  methods: {
    async ok() {
      try {
        let response = await this.$api.finance.editBillLine(
          this.bills,
          this.invoice.id
        )
        // if (response) {
        //   this.$bvModal.hide('invoiceModal')
        // }
        this.$toast({
          type: 'success',
          text: `Changes saved`,
        })
        this.editMode = false
        this.$emit('refresh')
      } catch (error) {
        console.log(error)
      }
    },
    addNewBill() {
      let time = new Date().toISOString()
      this.bills.push({
        quantity: 1,
        bill_source: null,
        description: '',
        selling_price: '0.00',
        billed_to_type: 'SELF',
        transaction_date: time,
      })
    },
    editBill() {
      this.editMode = !this.editMode
      if (!this.editMode) {
        for (let x = 0; x < this.bills.length; x++) {
          if (!this.bills[x].hasOwnProperty('_id')) {
            this.bills.splice(x)
          }
        }
      }
    },
    removeBill(index) {
      this.bills.splice(index, 1)
      console.log(index)
    },
    numberWithCommas(x) {
      if (x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
      }
    },
    dateFormatter(x) {
      return DateTime.fromISO(x).toFormat('yyyy-LL-dd T')
    },
    authorizeBill() {
      this.$bvModal.show('authorize')
    },
    makePayment() {
      this.$bvModal.show('makePayment')
    },
    async saveAndConfirm() {
      let response = await this.$api.finance.editBillLine(
        this.bills,
        this.invoice.id
      )
    
      if (this.invoice.balance === '0.00') {
        let response = await this.$api.finance.confirmInvoice(this.invoice.id)
        if (response) {
          this.$bvModal.hide('invoiceModal')
        }
        this.$toast({
          type: 'success',
          text: `Confirmed`,
        })
        this.$emit('refresh')
      } else {
        this.makePayment()
      }
    },

    async confirmInvoice() {
      const result = await this.showConfirmMessageBox('Confirm invoice ?')
      try {
        if (result) {
          let response = await this.$api.finance.confirmInvoice(this.invoice.id)
          if (response) {
            this.$bvModal.hide('invoiceModal')
          }
          this.$toast({
            type: 'success',
            text: `Confirmed`,
          })
          this.$emit('refresh')
        }
      } catch (error) {
        console.log(error)
      }
    },

    handleQtyInput(newValue, index) {
      if (newValue !== '') {
        this.bills[index].selling_price = this.numberWithCommas(
          parseFloat(newValue.replace(/,/g, ''))
        )
      } else {
        this.bills[index].selling_price = ''
      }

      let calc = 0
      for (let x = 0; x < this.payments.length; x++) {
        let cover = this.payments[x].amount
        cover.toString().replace(/\D/g, '')
        cover = parseFloat(cover.replace(/,/g, ''))
        calc += cover
        this.payAmount = calc
      }
    },
    closeModal() {
      this.$bvModal.hide('invoiceModal')
      for (let x = 0; x < this.bills.length; x++) {
        if (!this.bills[x].hasOwnProperty('_id')) {
          this.bills.splice(x)
        }
      }
      this.editMode = false
    },
    close() {
      this.$bvModal.hide('invoiceModal')
    },
    sendSignal() {
      this.$emit('print', this.invoice)
    },
    goToProfile() {
      if (this.invoice.patient) {
        this.$router.push({
          name: 'dashboard-patient-uuid',
          params: {
            uuid: this.invoice.patient.id,
          },
          query: {
            tab: 4,
          },
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.b-table-sticky-header,
.table-responsive,
[class*='table-responsive-'] {
  margin-bottom: 0rem;
}
.hov:hover {
  color: $COLOR_THREE;
}
.p-splitbutton {
  color: $COLOR_THREE;
  font-size: 14px;
}
</style>