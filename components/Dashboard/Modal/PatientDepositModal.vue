<template>
  <ModalWrapper
    submit-title="Make deposit"
    title="Make deposit"
    id="depositModal"
    @ok="ok()"
    @hide="clear()"
    size="md"
  >
    <ValidationObserver ref="form">
      <form>
        <div
          class=""
        >
          <div class="col-12">
            <div class="mb-2">
              <ValidationProviderWrapper
                name="Payment method"
                :rules="['required']"
              >
                <VSelect
                  class="text-grey text-14"
                  label="name"
                  :options="paymentMethod"
                  :reduce="(option) => option.id"
                  v-model="deposit.payment_method"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="mb-2">
              <ValidationProviderWrapper name="Amount" :rules="['required']">
                <input
                  v-model="deposit.amount"
                  type="text"
                  class="form-control"
                />
              </ValidationProviderWrapper>
            </div>
          </div>
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
    data: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    total: {
      type: Number,
      require: false,
      default: () => 0,
    },
    goods: {
      type: Array,
      require: false,
      default: () => [],
    },
  },
  data() {
    return {
      dataObject: {
        amount: '',
      },
      payAmount: 0,
      balance: 0,
      paymentMethod: [],
      deposit: [
        {
          payment_method: null,
          amount: '',
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
  async mounted() {
    const data = await this.$api.finance_settings.getPaymentMethods({
      size: 1000,
    })
    this.paymentMethod = data.results
  },
  watch: {
  },
  methods: {
    ok() {
      let calc = 0
      let arr = this.payments
      console.log(arr)
      arr.map((el) => {
        calc += parseFloat(el.amount.replace(/,/g , ''))
      })

      if (calc > this.total) {
        this.$toast({
          type: 'info',
          text: `Payment can not be higher than total price`,
        })
      } else if(calc === this.total) {
        arr.map((el) => {
          el.amount.toString().replace(/,/g , '')
          el.amount = el.amount.toString().replace(/,/g , '')
      })

          this.$emit('ok', arr)
      }
      else if(calc < this.total){
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
      if(newValue != ''){
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
    removePaymentMethod(e) {
      this.payments.splice(e, 1)
    },

    removeItem(e) {
      this.$emit('removedItem', e)
    },

    clear() {
      ;(this.payments = [
        {
          payment_method: null,
          amount: '',
        },
      ]),
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