<template>
  <div>
     <div :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" id="text" class="ticket">
        <h3 :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="margin: 0rem; text-align: center; padding-top: 1.4rem">{{companyName}}</h3>
        <p :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="margin-bottom: 0rem">{{address}}</p>
         <h3 :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="margin-bottom: 0rem; text-align: center">
          Invoice
        </h3>
        <p :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="margin-bottom: 1rem; font-size: 16px">
          Invoice Date: {{ transactionDate }}
          <br />
          Patient name:
          {{ data.firstname + ' ' + data.middlename + ' ' + data.lastname }}
          <br />
          UHID: <span>{{ data.uhid }}</span>
        </p>
        <table
        :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}"
          style="
            border-collapse: collapse;
            text-align: center;
          "
        >
          <thead>
            <tr style="text-align: center; border-bottom: 1px solid black">
            <th >Description</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody v-if="reciept.bill_lines">
            <tr
              v-for="(item, index) in reciept.bill_lines"
              :key="index"
              style="text-align: center; border-bottom: 1px solid black; height: 30px"
            >
            <td :style="!printLayout ? 'border: 1px solid black' : ''">{{ item.description }}</td>
              <td :style="!printLayout ? 'border: 1px solid black' : ''">{{ item.quantity }}</td>
              <td :style="!printLayout ? 'border: 1px solid black' : ''">{{ (item.selling_price / item.quantity) }}</td>
              <td :style="!printLayout ? 'border: 1px solid black' : ''">
                {{
                  item.selling_price.toLocaleString('en-US')
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <p :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="text-align: end;">
          Total: {{numberWithCommas(reciept.total_charge)}}
        </p>

        <h3 :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="font-size: 1.2rem; margin: 0.3rem;">
          Payment(s)
        </h3>
        <table
        :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}"
          style="
            border-collapse: collapse;
            text-align: center;
          "
        >
          <thead>
            <tr style="text-align: center; border-bottom: 1px solid black;">
            <th>Date</th>
              <th >Method</th>
              <th >Type</th>
              <th >Amount</th>
            </tr>
          </thead>
          <tbody v-if="reciept.payment_lines">
            <tr
              v-for="(item, index) in reciept.payment_lines"
              :key="index"
              style="text-align: center; border-bottom: 1px solid black; height: 30px"
            >
            <td :style="!printLayout ? 'border: 1px solid black' : ''">
                {{
                  item.created_at ? convDate(item.created_at) : ''
                }}
              </td>
              <td :style="!printLayout ? 'border: 1px solid black' : ''">
                {{ item.payment_method.name }}
              </td>
              <td :style="!printLayout ? 'border: 1px solid black' : ''">{{ item.payment_type }}</td>
              <td :style="!printLayout ? 'border: 1px solid black' : ''">
                {{
                  item.total_amount
                    ? item.total_amount.toLocaleString('en-US')
                    : ''
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <p :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="text-align: end;">
          Total: {{ numberWithCommas(reciept.total_charge) }}
        </p>
        <div :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="display: flex; justify-content: space-between">
            <p>Amount paid: {{numberWithCommas(reciept.paid_amount)}}</p>
            <p>Balance: {{numberWithCommas(reciept.balance)}}</p>
        </div>
      </div>
  </div>
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
  },
  computed: {
    transactionDate(){
      if(this.reciept.confirmed_at){
        return DateTime.fromISO(this.reciept.confirmed_at).toFormat('yyyy-LL-dd T')
      }
    },
    address(){
      return process.env.ADDRESS
    },
    companyName(){
      return process.env.COMPANY_NAME
    },
    printLayout(){
      return true
    }
  },
  methods: {
    numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  },
  convDate(x){
        return DateTime.fromISO(x).toFormat('yy-LL-dd T')
    },
  }
}
</script>

<style>

</style>