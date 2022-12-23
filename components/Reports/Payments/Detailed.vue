<template>
    <div>
        <div class="row">
            <div class="col-md-12 mb-4">
                <div class="card">
                    <div class="card-body">
                        <ReportsPaymentsDetailedFilter @filter="filter(1, $event)" />
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <UtilsFilterComponent :disableSearch="true" :disablePagination="false" :disable-visualization="true"
                    search-placeholder="Search">
                    <template v-if="items.length > 0" #besideFilterButton>
                        <div class="d-flex align-items-center">
                            <div class="mr-2 mt-1">
                                <b-spinner style="width: 1.7rem; height: 1.7rem" v-if="downloading" variant="primary"
                                    label="Spinning"></b-spinner>
                            </div>
                            <button @click="downloadFinanceReport" class="btn btn-sm btn-primary">
                                <span class="mr-2 pt-1">Download</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512">
                                    <path fill="white"
                                        d="M453.547 273.449H372.12v-40.714h81.427v40.714zm0 23.264H372.12v40.714h81.427v-40.714zm0-191.934H372.12v40.713h81.427V104.78zm0 63.978H372.12v40.713h81.427v-40.713zm0 191.934H372.12v40.714h81.427V360.69zm56.242 80.264c-2.326 12.098-16.867 12.388-26.58 12.796H302.326v52.345h-36.119L0 459.566V52.492L267.778 5.904h34.548v46.355h174.66c9.83.407 20.648-.291 29.197 5.583c5.991 8.608 5.41 19.543 5.817 29.43l-.233 302.791c-.29 16.925 1.57 34.2-1.978 50.892zm-296.51-91.256c-16.052-32.57-32.395-64.909-48.39-97.48c15.82-31.698 31.408-63.512 46.937-95.327c-13.203.64-26.406 1.454-39.55 2.385c-9.83 23.904-21.288 47.169-28.965 71.888c-7.154-23.323-16.634-45.774-25.3-68.515c-12.796.698-25.592 1.454-38.387 2.21c13.493 29.78 27.86 59.15 40.946 89.104c-15.413 29.081-29.837 58.57-44.785 87.825c12.737.523 25.475 1.047 38.212 1.221c9.074-23.148 20.357-45.424 28.267-69.038c7.096 25.359 19.135 48.798 29.023 73.051c14.017.99 27.976 1.862 41.993 2.676zM484.26 79.882H302.326v24.897h46.53v40.713h-46.53v23.265h46.53v40.713h-46.53v23.265h46.53v40.714h-46.53v23.264h46.53v40.714h-46.53v23.264h46.53v40.714h-46.53v26.897H484.26V79.882z" />
                                </svg>
                            </button>
                        </div>
                    </template>
                    <TableComponent :fields="fields" :pages="pages" :items="items" :busy="busy"
                        @page-changed="filter($event, currentFilter)">
                    </TableComponent>
                </UtilsFilterComponent>
            </div>
        </div>
    </div>
</template>
    
<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun'
export default {
    mixins: [TableFunc],
    data() {
        return {
            currentFilter: {},
            downloading: false,
            fields: [

                { key: 'created_at', label: 'Date', sortable: true },
                { key: 'created_by', label: 'Cashier', sortable: true },
                {
                    key: 'patient',
                    label: 'Patient',
                    sortable: true,
                    formatter: (val) => {
                        return val.salutation + ' ' + val.firstname + ' ' + val.lastname
                    },
                },
                { key: 'total_amount', label: 'Total amount', sortable: true },
                { key: 'payment_method', label: 'Payment method', sortable: true },
                { key: 'payment_type', label: 'Payment type', sortable: true },
            ],
        }
    },
    computed: {
        date() {
            const DATE = new Date().toISOString().split('T')[0]
            let reportdate = DATE
            return reportdate
        }
    },
    mounted() {
    },
    methods: {
        async filter(page, e) {
            this.currentFilter = e
            try {
                this.busy = true
                const data = await this.$api.reports.paymentsDetailedReport({ ...e, page })
                this.items = data
                // this.pages = data.total_pages

                this.busy = false
            } catch (error) {
                console.log(error)
            } finally {
                this.busy = false
            }
        },
        async downloadFinanceReport() {
            if (this.items.length > 0) {
                this.downloading = true
                let filter = this.currentFilter
                filter.to_excel = true

                //   if (filter.bill_source < 1) {
                //     delete filter.bill_source
                //   }
                let download_string = new URLSearchParams(filter).toString()
                const response = await fetch(
                    `${process.env.BASE_URL}finance/reports/payments/detailed?${download_string}`,
                    {
                        headers: {
                            Authorization: `Token ${this.$store.state.auth.token}`,
                        },
                    }
                )
                if (response.status === 200) {
                    const data = await response.blob()
                    console.log(data)
                    const objectURL = URL.createObjectURL(data)
                    const link = document.createElement('a')
                    link.download = `Payments Detailed Report - ${this.date}`
                    link.href = objectURL
                    this.downloading = false
                    // this.filter(1)
                    link.click()
                } else if (response.status === 403) {
                    this.downloading = false
                    this.$toast({
                        type: 'info',
                        text: `You don't have the permission to perform this action`,
                    })
                } else {
                    this.downloading = false
                    this.$toast({
                        type: 'error',
                        text: `An error occured`,
                    })
                }
            } else {
                this.$toast({
                    type: 'info',
                    text: `No report to download`,
                })
            }
        },
    },
}
</script>
    
<style lang="scss" scoped>

</style>