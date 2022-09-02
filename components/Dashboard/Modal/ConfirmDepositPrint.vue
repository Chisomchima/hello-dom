<template>
  <ModalWrapper
    submit-title="Yes"
    cancelText="No"
    title="Print deposit slip"
    id="printDepositSlip"
    @ok="ok()"
    @hide="$bvModal.hide('printDepositSlip')"
    size="md"
  >
    <div>
      <h5 class="text-center">Please confirm this action</h5>
      <p class="text-info text-14 text-center p-2">
        Do you want to print the deposit slip for this transaction ?
      </p>
      
    </div>

    <div class="d-none">
      <DashboardPrintOutReciept :reciept="reciept" :data="data" :printLayout="format_prop" />
    </div>
  </ModalWrapper>
</template>

<script>
import { DateTime } from 'luxon'
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
      format: 'A4',
      format_prop: false,
      payAmount: 0,
      calculations: 0,
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
    transactionDate() {
      if (this.reciept.created_at) {
        return DateTime.fromISO(this.reciept.created_at).toFormat(
          'yyyy-LL-dd T'
        )
      }
    },
    address() {
      return process.env.ADDRESS
    },
    companyName() {
      return process.env.COMPANY_NAME
    },
  },
  async mounted() {
    const data = await this.$api.finance_settings.getPaymentMethods({
      size: 1000,
    })
    this.paymentMethod = data.results
  },
  watch: {
    'reciept.payment_details'() {
      let calc = 0
      this.reciept.payment_details.map((el) => {
        let text = el.amount.toString()
        let num = parseFloat(text)
        calc += num
      })
      this.calculations = calc
    },
    format(){
      if(this.format === 'A4'){
        this.format_prop = false
      }
      else if(this.format === 'P.O.S Slip'){
        this.format_prop = true
      }
    }
  },
  methods: {
    async ok() {
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