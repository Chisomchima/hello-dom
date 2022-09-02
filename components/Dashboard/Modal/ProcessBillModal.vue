<template>
  <ModalWrapper
    submit-title="Make Payment"
    title="Payment"
    @ok="ok()"
    @hide="clear()"
    size="lg"
  >
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
    </div>
    <div class="col-md-3 text-14 px-0">
        <span class="text-grey">Gender:</span> {{ nameData.gender }}
      </div>
    <!-- <div class="d-flex align-items-center">
      <div class="class-details-data_label">Scheme(s):</div>
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
    </div> -->
    <hr />
    <div>
      <TableComponent :items="goods" :paginate="false" :fields="fields">
        <template #delete="{ data }">
          <span class="text-danger" @click="removeItem(data.item)"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="22"
              height="22"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
              /></svg
          ></span>
        </template>
         <template #is_reserved="{ data }">
          <span v-if="data.item.is_reserved" class="badge-warning p-1 rounded">R</span>
        </template>
      </TableComponent>
    </div>
    <div class="p-2  text-14 d-flex justify-content-between">
      <p class="mb-0 text-info border p-2">
        Total: ₦ {{ total ? total.toLocaleString('en-US') : 0 }}
      </p>
      <p class="mb-0 text-warning border p-2">
        Reserved: ₦ {{ reserved ? reserved.toLocaleString('en-US') : 0 }}
      </p>
      <p class="mb-0 text-success border p-2">
        Amount paid: ₦ {{ payAmount ? payAmount.toLocaleString('en-US') : 0 }}
      </p>
      <p class="mb-0 text-danger border p-2">Balance: ₦ {{ balance ? balance.toLocaleString('en-US') : 0 }}</p>
    </div>
    <ValidationObserver ref="form">
      <form v-if="total != reserved">
        <div
          v-for="(item, index) in payments"
          :key="index"
          class="d-flex align-items-end"
        >
          <div class="row col-12 pr-0">
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper
                name="Payment method"
                :rules="['required']"
              >
                <VSelect
                  class="text-grey text-14"
                  label="name"
                  :options="paymentMethod"
                  :reduce="(option) => option.id"
                  v-model="item.payment_method"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Amount" :rules="['required']">
                <input
                  :value="item.amount"
                  type="text"
                  class="form-control"
                  @input="handleQtyInput($event.target.value, index)"
                />
              </ValidationProviderWrapper>
            </div>
          </div>
          <div class="text-primary point ml-2">
            <svg
              @click="removePaymentMethod(index, item)"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M7 11h10v2H7z" />
              <path
                fill="currentColor"
                d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8s8 3.589 8 8s-3.589 8-8 8z"
              />
            </svg>
          </div>
        </div>
        <div class="text-primary mt-3 ml-2">
          <svg
            class="point"
            @click="addPaymentMethod"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="24"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <g fill="currentColor">
              <path
                d="M8 5a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 8 5Z"
              />
              <path
                d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8Zm6-5a5 5 0 1 0 0 10A5 5 0 0 0 8 3Z"
              />
            </g>
          </svg>
        </div>
      </form>
    </ValidationObserver>
  </ModalWrapper>
</template>

<script>
export default {
  props: {
    editData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    nameData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    total: {
      type: Number,
      require: false,
      default: () => 0,
    },
    totalPaid: {
      type: Number,
      require: false,
      default: () => 0,
    },
    goods: {
      type: Array,
      require: false,
      default: () => [],
    },
    reserved: {
      type: Number,
      require: false,
      default: () => 0,
    }
  },
  data() {
    return {
      dataObject: {
        amount: '',
      },
      payAmount: 0,
      balance: 0,
      paymentMethod: [],
      payments: [
        {
          payment_method: null,
          amount: '',
        },
      ],
      fields: [
        
        {
          key: 'bill_source',
          label: 'Bill Source',
        },
        {
          key: 'description',
          label: 'Description',
        },

        {
          key: 'quantity',
          label: 'Qty',
        },
        {
          key: 'cost',
          label: 'Unit',
        },
        {
          key: 'selling_price',
          label: 'Total',
        },
        {
          key: 'delete',
          label: '',
        },
        {
          key: 'is_reserved',
          label: '',
          sortable: false
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
    payAmount(){
      this.balance = this.total - (this.payAmount + this.reserved)
    },
    total(){
      this.balance = this.total - (this.payAmount + this.reserved)
    }
  },
  async mounted() {
    this.balance = this.total
    console.log(
      new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(12)
    )
    const data = await this.$api.finance_settings.getPaymentMethods({
      size: 1000,
    })
    console.log('Im mounted', data.results)
    this.paymentMethod = data.results
  },
  
  methods: {
    ok() {
      let calc = 0
      const arr = this.payments
      console.log(arr)
      if(arr.length > 0 ){
        arr.map((el) => {
        calc += parseFloat(el.amount.replace(/,/g , ''))
      })
      }
      else if(arr.length === 0 && this.balance === 0){
        calc = 0
      }
      

      console.log('Payments', calc)
      console.log('due', this.totalPaid)

      if (calc > this.totalPaid) {
        this.$toast({
          type: 'info',
          text: `Payment can not be higher than total price`,
        })
      } else if(calc === this.totalPaid) {
        arr.map((el) => {
          el.amount.toString().replace(/,/g , '')
          el.amount = el.amount.toString().replace(/,/g , '')
      })

          this.$emit('ok', arr)
      }
      else if(calc < this.totalPaid){
         this.$toast({
          type: 'info',
          text: `Payment is less total amount`,
        })
      }
    },
    numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
},

    handleQtyInput(newValue, index) {
      if(newValue !== ''){
        this.payments[index].amount = this.numberWithCommas(parseFloat(newValue.replace(/,/g , '')))
      }
      else{
        this.payments[index].amount = ''
      }

      let calc = 0
      for(let x = 0; x < this.payments.length; x++){
      let cover = this.payments[x].amount
      cover.toString().replace(/\D/g, '')
      cover = parseFloat(cover.replace(/,/g , ''))
      calc += cover
      this.payAmount = calc
      }
      
    },
    addPaymentMethod() {
      this.payments.push({
        payment_method: null,
        amount: '',
      })
    },
    removePaymentMethod(e, item) {
      this.payments.splice(e, 1)
      console.log(item)
      let cover = item.amount
      cover.toString().replace(/,/g , '')
      cover = parseFloat(cover.replace(/,/g , ''))

      
      // console.log(this.payAmount)
  
      this.payAmount = this.payAmount - cover
    },

    removeItem(e) {
      this.$emit('removedItem', e)
    },

    clear() {
      this.payments = [
        {
          payment_method: null,
          amount: '',
        },
      ]
      this.balance = 0
      this.payAmount = 0
        this.$emit('hide')
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