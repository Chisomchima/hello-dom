<template>
  <ModalWrapper
    submit-title="Yes"
    cancelText="No"
    title="Print payment slip"
    id="printInvoice?"
    @ok="ok()"
    @hide="$bvModal.hide('printInvoice?')"
    size="md"
  >
    <div>
      <h5 class="text-center">Please confirm this action</h5>
      <p class="text-info text-14 text-center p-2">
        Do you want to print the payment slip for this transaction ?
      </p>
    </div>
    <div class="d-none">
      <DashboardInvoiceTemplate :data="data" :reciept="reciept"/>
    </div>
  </ModalWrapper>
</template>

<script>
export default {
  props: {
    reciept: {
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
      calculations: 0,
      totalInvoice: 0,
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
    console.log(this.reciept)
  },
  watch: {
    'reciept.bill_lines'() {
      let calc = 0
      this.reciept.bill_lines.map((el) => {
        let text = el.selling_price.toString()
        let num = parseFloat(text)
        calc += num
      })
      this.totalInvoice = calc
    },
    'reciept.payment_lines'() {
      let calc = 0
      this.reciept.payment_lines.map((el) => {
        let text = el.total_amount.toString()
        let num = parseFloat(text)
        calc += num
      })
      this.calculations = calc
    },
  },
  methods: {
    ok() {
      var mywindow = window.open('', 'PRINT', 'height=400,width=600')
      let text = document.getElementById('text').innerHTML
      mywindow.document.write('</head><body >')
      mywindow.document.write(text)
      mywindow.document.write('</body></html>')

      mywindow.focus() // necessary for IE >= 10*/
      // mywindow.onload = function() { mywindow.print()};
      mywindow.print()
      mywindow.close()

      return true
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    handleQtyInput(newValue, index) {
      if (newValue != '') {
        this.deposit[index].amount = this.numberWithCommas(
          parseFloat(newValue.replace(/,/g, ''))
        )
      } else {
        this.deposit[index].amount = ''
      }
    },
    addPaymentMethod() {
      this.deposit.push({
        payment_method: null,
        amount: '',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.color {
  color: aqua;
}
.b-table-sticky-header,
.table-responsive,
[class*='table-responsive-'] {
  margin-bottom: 0rem;
}
</style>