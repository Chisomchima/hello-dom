<template>
  <div>
    <div :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" id="text" class="ticket">
            <h2 :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="margin: 0rem; text-align: center; font-size: 16px;">{{companyName}}</h2>
            <h3 :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="margin-bottom: 0rem; padding: 0; text-align: center; font-size: 20px;">Reciept</h3>
            <b><p :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="margin-bottom: 0rem">{{address}}</p></b>
            <p :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="margin: .5rem 0; font-size: 16px">
                Transaction Date: {{transactionDate}}
                <br>
                Patient name: {{data.firstname + " " + data.middlename + " " + data.lastname}}
                <br>
                UHID:<span style="font-size: 13px">{{data.uhid}}</span>
                </p>

              <h3 :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="font-size: 1.2rem; margin: 0.3rem;">Payment(s)</h3>
            <table :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="border-collapse: collapse; text-align: center; font-size: 16px;">
                <thead>
                    <tr style="text-align: center; border-bottom: 1px solid black; height: 30px" >
                        <th>Date</th>
                        <th>Method</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody v-if="reciept.payment_details">
                    <tr v-for="(item, index) in reciept.payment_details" :key="index" style="text-align: center; border-bottom: 1px solid black; height: 30px; font-size: 16px;" >
                        <td :style="!printLayout ? {'border': '1px solid black', 'width' : '30%'} : {'width' : '35%'}">{{reciept.created_at ? convDate(reciept.created_at) : ''}}</td>
                        <td :style="!printLayout ? 'border: 1px solid black' : ''">{{item.payment_method ? item.payment_method.name : ''}}</td>
                        <td :style="!printLayout ? 'border: 1px solid black' : ''">{{(item.amount || item.total_amount) ? (item.amount.toLocaleString('en-US') || item.total_amount.toLocaleString('en-US')) : ''}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr style="text-align: center; border-bottom: 1px solid black; height: 30px; font-size: 16px;" >
                        <td :style="!printLayout ? {'border': '1px solid black', 'width' : '30%'} : {'width' : '35%'}">{{reciept.created_at ? convDate(reciept.created_at) : ''}}</td>
                        <td :style="!printLayout ? 'border: 1px solid black' : ''">{{reciept.payment_type ? reciept.payment_type : ''}}</td>
                        <td :style="!printLayout ? 'border: 1px solid black' : ''">{{reciept.total_amount ? (reciept.total_amount.toLocaleString('en-US')) : ''}}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="reciept">
             <p :style="printLayout ? {'width': '20rem'} : {'width': '48rem'}" style="text-align: end;">Total: {{ numberWithCommas(reciept.total_amount) }}</p>
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
    printLayout: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  computed: {
    transactionDate(){
      if(this.reciept.created_at){
        return DateTime.fromISO(this.reciept.created_at).toFormat('yyyy-LL-dd T')
      }
    },
    address(){
      return process.env.ADDRESS
    },
    companyName(){
      return process.env.COMPANY_NAME
    },
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