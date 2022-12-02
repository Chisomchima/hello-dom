<template>
    <ModalWrapper submit-title="Yes" cancelText="No" :stacking="false" title="Print prescription slip" id="printslip"
        @ok="ok()" @hide="$bvModal.hide('printslip')" size="md">
        <div>
            <h5 class="text-center">Please confirm this action</h5>
            <p class="text-info text-14 text-center p-2">
                Do you want to print the prescription slip ?
            </p>

        </div>

        <div class="d-flex justify-content-center">
            <div class="col-md-6 mb-5">
                <ValidationProviderWrapper name="Print format" :rules="['']">
                    <VSelect v-model="format" label="name" :options="['A4', 'P.O.S Slip']"></VSelect>
                </ValidationProviderWrapper>
            </div>
        </div>

        <div class="d-none">
            <PharmacyPrescriptionTemplate :prescription="prescription" :data="data" :printLayout="format_prop" />
        </div>
    </ModalWrapper>
</template>
  
<script>
import { DateTime } from 'luxon'
export default {
    props: {
        prescription: {
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
            format: 'A4',
            format_prop: false,
        }
    },
    watch: {
        format() {
            if (this.format === 'A4') {
                this.format_prop = false
            }
            else if (this.format === 'P.O.S Slip') {
                this.format_prop = true
            }
        }
    },
    computed: {
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
    methods: {
        async ok() {
            var mywindow = window.open('', 'PRINT', 'height=400,width=600')
            let text = document.getElementById('template').innerHTML
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