<template>
  <ModalWrapper
    submit-title="Make Payment"
    title="Confirm Payment"
    @ok="ok()"
    @hide="clear()"
    size="lg"
  >
    <div class="row text-14">
      <div class="col-md-3">
        <span class="text-grey">UHID:</span> {{ nameData.uhid }}
      </div>
      <div class="col-md-3">
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
     <div class="d-flex align-items-center">
      <div class="class-details-data_label">Scheme(s):</div>
        <ul v-if="nameData.payment_scheme.length > 0" class="d-flex w-100 px-0 mb-0">
          <li style="list-style: none" v-for="(item, index) in nameData.payment_scheme" :key="index" class="px-2 text-14">
          <span class="class-details-data_value text-truncate">
            {{ item.payer_scheme.name
            }}
          </span>
          <span>
            ({{item.payer_scheme.type}}) |
          </span>
          </li>
      </ul>
      <div class="text-14 ml-2" v-else>Nil</div>
      </div>
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
      </TableComponent>
    </div>
    <div class="p-2 text-info">
      Total: {{ total ? total.toLocaleString('en-US') : '' }}
    </div>
    <ValidationObserver ref="form">
      <form>
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
                  v-model="item.amount"
                  type="text"
                  class="form-control"
                  @input="handleQtyInput($event.target.value, index)"
                />
              </ValidationProviderWrapper>
            </div>
          </div>
          <div class="text-primary point ml-2">
           <svg @click="removePaymentMethod(index)" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M7 11h10v2H7z"/><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8s8 3.589 8 8s-3.589 8-8 8z"/></svg>
          </div>
        </div>
        <div class="text-primary ml-2">
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
      paymentMethod: [],
      payments: [
        {
          payment_method: null,
          amount: '',
        },
      ],
      fields: [
        // {
        //   key: 'bill_item_code',
        //   label: 'Code',
        // },
        {
          key: 'bill_source',
          label: 'Bill Source',
        },
        {
          key: 'billed_to_type',
          label: 'Payment type',
        },

        {
          key: 'quantity',
          label: 'Qty',
        },
        {
          key: 'selling_price',
          label: 'Total',
        },
        {
          key: 'delete',
          label: '',
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
    console.log('Im mounted', data.results)
    this.paymentMethod = data.results
  },
  watch: {},
  methods: {
    ok() {
      let calc = 0
      this.payments.map((el) => {
        calc += parseInt(el.amount)
      })

      console.log(this.payments)

      if(calc > this.total){
        this.$toast({
        type: 'info',
        text: `Payment can not be higher than total price`,
      })
      }
      else{
        this.$emit('ok', this.payments)
      }
    },

    handleQtyInput(newValue, index) {
      const qty = this.payments[index].amount + ''
      qty.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.payments[index].amount = qty
      this.dataObject.amount = newValue.toString().replace(/\D/g, '')
    },
    addPaymentMethod() {
      this.payments.push({
        payment_method: null,
        amount: '',
      })
    },
    removePaymentMethod(e){
      this.payments.splice(e, 1)
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
      ],
      this.$emit('hide')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>