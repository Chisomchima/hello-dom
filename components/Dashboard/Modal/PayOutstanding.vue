<template>
  <ModalWrapper
    submit-title="Make Payment"
     :stacking="false"
    title="Confirm Payment"
    id="invoiceBalance"
    @ok="ok()"
    @hide="clear()"
    size="lg"
  >
    <div class="p-2  text-14 d-flex justify-content-between">
      <p class="mb-0 text-info border p-2">
        Total: ₦ {{ total ? total.toLocaleString('en-US') : 0 }}
      </p>
      <p class="mb-0 text-success border p-2">
        Amount to pay: ₦ {{ payAmount ? payAmount.toLocaleString('en-US') : 0 }}
      </p>
      <p class="mb-0 text-danger border p-2">Balance: ₦ {{ balance ? balance.toLocaleString('en-US') : 0 }}</p>
    </div>
    <ValidationObserver ref="form">
      <form>
        <div
          v-for="(item, index) in invoices"
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
    // total: {
    //   type: Number,
    //   require: false,
    //   default: () => 0,
    // },
    invoice: {
      type: Object,
      require: false,
      default: () => {},
    },
  },
  data() {
    return {
      payAmount: 0,
      balance: 0,
      total: null,
      paymentMethod: [],
      invoices: [
        {
          payment_method: null,
          amount: '',
        },
      ],
    }
  },
  computed: {
    
  },
  watch: {
    payAmount(){
      this.balance = this.total - this.payAmount
    },
    total(){
      this.balance = this.total - this.payAmount
    }
  },
  async mounted() {
    if(this.invoice){
      console.log(this.invoice)
        this.balance = this.invoice.balance
    }
    const data = await this.$api.finance_settings.getPaymentMethods({
      size: 1000,
    })
    this.paymentMethod = data.results
  },
  
  methods: {
    async ok() {
      let calc = 0
      const arr = this.invoices
      console.log(arr)
      arr.map((el) => {
        calc += parseFloat(el.amount.replace(/,/g , ''))
      })

      if (calc > this.invoices.balance) {
        this.$toast({
          type: 'info',
          text: `Payment can not be higher than total price`,
        })
      } else if(calc === this.invoices.balance) {
        arr.map((el) => {
          el.amount.toString().replace(/,/g , '')
          el.amount = el.amount.toString().replace(/,/g , '')
      })

          this.$emit('ok', arr)
          // let response = await this.$api.patient.payOutstanding(
          //   this.invoice.id, 
          // )
      }
      else if(calc < this.invoices.balance){
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
        this.invoices[index].amount = this.numberWithCommas(parseFloat(newValue.replace(/,/g , '')))
      }
      else{
        this.invoices[index].amount = ''
      }

      let calc = 0
      for(let x = 0; x < this.invoices.length; x++){
      let cover = this.invoices[x].amount
      cover.toString().replace(/\D/g, '')
      cover = parseFloat(cover.replace(/,/g , ''))
      calc += cover
      this.payAmount = calc
      }
      
    },
    addPaymentMethod() {
      this.invoices.push({
        payment_method: null,
        amount: '',
      })
    },
    removePaymentMethod(e, item) {
      this.invoices.splice(e, 1)
      console.log(item)
      let cover = item.amount
      cover.toString().replace(/,/g , '')
      cover = parseFloat(cover.replace(/,/g , ''))
  
      this.payAmount = this.payAmount - cover
    },

    removeItem(e) {
      this.$emit('removedItem', e)
    },

    clear() {
      this.invoices = [
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