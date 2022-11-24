<template>
    <div>
        <UtilsFilterComponent disable-pagination :disableSearch="true" :disable-visualization="true"
            search-placeholder="Search">
            <!-- <template #beforeActions>
                <div>
                    <button v-b-toggle.sidebar-backdrop3 class="btn btn-sm btn-outline-secondary">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512">
                                <path fill="currentColor"
                                    d="M96 197.333h320v32H96zm72 101.334h176v32H168zM216 400h80v32h-80zM48 96h416v32H48z" />
                            </svg>
                        </span>
                    </button>
                    <b-sidebar id="sidebar-backdrop3" title="Sidebar with backdrop" :backdrop-variant="'dark'" backdrop
                        shadow right>
                        <div class="p-4">
                            <div class="">

                                <div class="col-md-12">
                                    <span class="text-12 text-grey">Search</span>
                                    <input type="text" class="form-control" placeholder="Search by name"
                                        v-model="filter.name" />
                                </div>
                            </div>
                            <div class="">
                                <div class="col-md-12">
                                    <span class="text-12 text-grey">Date from:</span>
                                    <input type="date" class="form-control" :max="maxDate" v-model="filter.dateFrom" />
                                </div>
                                <div class="col-md-12">
                                    <span class="text-12 text-grey">Date to:</span>
                                    <input type="date" class="form-control" :min="minDate" v-model="filter.dateTo" />
                                </div>
                            </div>

                            <div class="col-md-12">
                                <span class="text-12 text-grey">Service centers</span>
                                <VSelect style="font-size: 13px" label="name" class="" v-model="filter.service_center"
                                    :placeholder="'Service centers'" :reduce="(option) => option.id" multiple taggable
                                    :options="filterSerice">
                                </VSelect>
                            </div>
                            <div class="col-md-12">
                                <span class="text-12 text-grey">Modality</span>
                                <VSelect style="font-size: 13px" label="name" class="" v-model="filter.modality"
                                    :placeholder="'Lab unit'" :reduce="(option) => option.id" multiple taggable
                                    :options="filterModality">
                                </VSelect>
                            </div>
                        </div>
                    </b-sidebar>
                </div>
            </template> -->
            <template v-if="show" #besideFilterButton>
                <BaseButton @click="$bvModal.show('document')" class="btn-outline-primary">Add Document</BaseButton>
            </template>
            <template>
                <TableComponent :fields="fields" @row-clicked="viewDocument" :pages="pages" :items="items" :busy="busy" @page-changed="pageChange">
                </TableComponent>
            </template>
        </UtilsFilterComponent>

        <DashboardModalAddPatientDocument @refresh="pageChange(1, filter)" :patient="data" />
    </div>
</template>
  
<script>
import { DateTime } from 'luxon'
import { debounce } from 'lodash'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
import modalMsgBox from '~/mixins/modalMsgBox'
export default {
    mixins: [TableFunc, modalMsgBox],
    props: {
        data: {
            type: Object,
            required: true,
        },
        show: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data() {
        return {
            filter: {
                size: 10,
            },
            patient: {},
            options: [],
            items: [],
            filterModality: [],
            filterSerice: [],
            placeholder: '',
            fields: [
                {
                    key: 'created_at',
                    label: 'Date',
                    formatter: (value) => {
                        return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
                    },
                    sortable: true,
                },
                {
                    key: 'title',
                    label: 'Title',
                    sortable: true,
                },
                {
                    key: 'created_by',
                    label: 'Created by',
                    sortable: true,
                    formatter: (val) => {
                        return (
                            val.first_name +
                            ' ' +
                            val.last_name
                        )
                    },
                },
                // { key: 'status', label: 'Status', sortable: true },
                // { key: 'dots', label: '', sortable: false },
            ],
        }
    },
    async mounted() {
        await this.pageChange(1)
    },
    computed: {
        maxDate() {
            let today = new Date()
            today = today.toISOString()
            let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
            console.log(x)
            return x
        },
        minDate() {
            let today = new Date()
            today = today.toISOString()
            let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
            console.log(x)
            return x
        },
    },
    watch: {

        'filter.modality'() {
            if (this.filter.modality !== null) {
                this.pageChange(1, this.filter)
            }
        },
        'filter.service_center'() {
            if (this.filter.service_center !== null) {
                this.pageChange(1, this.filter)
            }
        },
        // 'filter.dateFrom'() {
        //   this.getLabOrders(1, this.filter)
        // },
        'filter.dateTo'() {
            if (this.filter.dateFrom !== '') {
                this.pageChange(1, this.filter)
            }
        },
        'filter.name': {
            handler: debounce(function () {
                this.pageChange(1, this.filter)
            }, 1000),
            deep: true,
        },
    },
    methods: {
        async pageChange(page = 1, e = {
            size: 10,
        }) {

            const newFilterObject = {
                ...e,
                page: page,
                patient: this.data.id,
            }
            this.currentFilter = e
            this.currentPage = page
            try {
                this.busy = true
                const data = await this.$api.files.getDocuments({
                    ...e,
                    page,
                    patient: this.data.id,
                })
                this.items = data.results
                this.pages = data.total_pages
                console.log(data)
            } catch (error) {
                console.log(error)
            } finally {
                this.busy = false
            }
        },
        viewDocument(e){
            let url = e.path
            let trimmed = url.substring(1)
            let baseURL = process.env.STATIC
            let a = baseURL + trimmed
            window.open(a)
        },

        async cancelImaging(e) {
            const result = await this.showDeleteMessageBox(
                'Do you want to cancel Imaging Order'
            )
            if (result) {
                await this.$api.imaging.patchObservationOrder(e.id, {
                    status: 'CANCELED',
                })
            }
        },

        formatName(obj) {
            if (Object.values(obj).length > 0) {
                return obj.first_name + ' ' + obj.last_name
            }
        },

        formatDate(value) {
            if (value) {
                return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
            }
            return ''
        },
    },
}
</script>
  
<style lang="scss" scoped>
.width {
    width: 10rem;
    height: 38px;
}
</style>