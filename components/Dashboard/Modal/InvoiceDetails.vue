<template>
  <ModalWrapper
    title="Invoice details"
    :cancelText="'Close'"
    :stacking="false"
    id="invoiceModal"
    @ok="ok()"
    :arrangement="false"
    @hide="closeModal"
    size="lg"
  >
    <!-- <template #modal-header="{ close }">
      <div>
        <span
          v-if="invoice.status === 'PAID'"
          class="badge-success rounded p-1 text-white"
          >{{ invoice.status }}</span
        >
      </div>
    </template> -->
    <!-- <DashboardModalAuthorizeBillModal :nameData="data" /> -->
    <div class="row text-14">
      <div class="col-md-3">
        <span class="text-grey">UHID:</span> {{ nameData.uhid }}
      </div>

      <div class="col-md-6">
        <span class="text-grey">Name:</span>
        {{
          nameData.salutation +
          ' ' +
          nameData.firstname +
          ' ' +
          nameData.lastname
        }}
      </div>
      <div class="col-md-3 d-flex align-items-center justify-content-end">
        <div
          v-if="invoice.status ? true : false"
          class="d-flex justify-content-end align-items-center"
        >
          <div class="mx-2" v-if="invoice.status === 'DRAFT'">
            <BaseButton @click="confirmInvoice" class="btn-primary btn-sm"
              >Confirm</BaseButton
            >
          </div>
          <div v-if="invoice.status">
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
        </div>
      </div>
    </div>

    <div class="col-md-3 text-14 px-0">
      <span class="text-grey">Gender:</span> {{ nameData.gender }}
    </div>

    <div class="d-flex align-items-center">
      <div class="class-details-data_label">Scheme:</div>
      <ul
        v-if="nameData.payment_scheme.length > 0"
        class="d-flex w-100 px-0 mb-0"
      >
        <li
          style="list-style: none"
          v-for="(item, index) in nameData.payment_scheme"
          :key="index"
          class="px-2 text-14"
        >
          <span class="class-details-data_value text-truncate">
            | {{ item.payer_scheme.name }}
          </span>
          <span> ({{ item.payer_scheme.type }}) </span>
        </li>
      </ul>
      <div class="text-14 ml-2" v-else>Nil</div>
    </div>
    <hr />

    <div
      class="d-flex justify-content-between align-items-center mb-2"
      v-if="invoice"
    >
      <p class="mb-0">Total: {{ numberWithCommas(total) }}</p>
      <p class="mb-0">
        Paid amount: {{ numberWithCommas(invoice.paid_amount) }}
      </p>
      <p class="mb-0">Balance: {{ numberWithCommas(invoice.balance) }}</p>
      <div class="d-flex align-items-center">
        <div class="mr-0">
          <svg
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
        <div v-if="invoice.status !== 'PAID'">
          <button
            @click="$bvModal.show('invoiceBalance')"
            class="btn btn-outline-primary btn-sm"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>

    <div class="p-2 d-flex justify-content-end">
      <button v-if="!editMode" @click="editBill" class="btn btn-primary btn-sm">
        Edit
      </button>
      <button v-if="editMode" @click="editBill" class="btn btn-danger btn-sm">
        Cancel
      </button>
    </div>

    <TabView class="tabview-custom">
      <TabPanel class="dark-panel">
        <template #header>
          <span class="ml-2">Bill lines</span>
        </template>
        <div v-if="invoice">
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
  </ModalWrapper>
</template>

<script>
import { DateTime } from 'luxon'
export default {
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
  },
  data() {
    return {
      dataObject: {
        amount: '',
      },
       bills: [],
      payAmount: 0,
      balance: 0,
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
  watch: {
    payAmount() {
      this.balance = this.total - this.payAmount
    },
    total() {
      this.balance = this.total - this.payAmount
    },
   invoice() {
      let calc = 0
      this.invoice.bill_lines.forEach((el) => {
        calc += Number.parseFloat(el.selling_price)
      })
      this.total = calc
      let bills = this.invoice.bill_lines
      this.bills = bills
    },
  },
  //   async mounted() {

  //   },

  methods: {
    ok() {
      let calc = 0
      const arr = this.payments
      console.log(arr)
      arr.map((el) => {
        calc += parseFloat(el.amount.replace(/,/g, ''))
      })

      if (calc > this.total) {
        this.$toast({
          type: 'info',
          text: `Payment can not be higher than total price`,
        })
      } else if (calc === this.total) {
        arr.map((el) => {
          el.amount.toString().replace(/,/g, '')
          el.amount = el.amount.toString().replace(/,/g, '')
        })

        this.$emit('ok', arr)
      } else if (calc < this.total) {
        this.$toast({
          type: 'info',
          text: `Payment is less total amount`,
        })
      }
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
    closeModal() {
      this.$bvModal.hide('invoiceModal')
      for (let x = 0; x < this.bills.length; x++) {
        if (!this.bills[x].hasOwnProperty('_id')) {
          this.bills.splice(x)
        }
      }
      this.editMode = false
    },
    numberWithCommas(x) {
      if (x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
      }
    },
    authorizeBill() {
      this.$bvModal.show('authorize')
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
        this.payments[index].amount = this.numberWithCommas(
          parseFloat(newValue.replace(/,/g, ''))
        )
      } else {
        this.payments[index].amount = ''
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
  },
}
</script>

<style lang="scss" scoped>
.b-table-sticky-header,
.table-responsive,
[class*='table-responsive-'] {
  margin-bottom: 0rem;
}
</style>