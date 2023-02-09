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
                            <div class="col-md-12">
                                <span class="text-12 text-grey">Document types</span>
                                <VSelect style="font-size: 13px" label="name" class="" v-model="filter.document_type"
                                    :placeholder="'Document types'" :reduce="(option) => option.id" multiple taggable
                                    :options="fileTypes">
                                </VSelect>
                            </div>
    
                            <div class="">
                                <div class="col-md-12">
                                    <span class="text-12 text-grey">Date from:</span>
                                    <input type="date" class="form-control" :max="maxDate" v-model="filter.date_from" />
                                </div>
                                <div class="col-md-12">
                                    <span class="text-12 text-grey">Date to:</span>
                                    <input type="date" class="form-control" :min="minDate" v-model="filter.date_to" />
                                </div>
                            </div>

                           
                        </div>
                    </b-sidebar>
                </div>
            </template> -->
            <template v-if="show" #besideFilterButton>
                <BaseButton @click="createNursingOrder" class="btn-outline-primary">Add Nursing Order
                </BaseButton>
            </template>
            <template>
                <TableComponent @row-clicked="viewDocument" :fields="fields" :pages="pages" :items="items" :busy="busy"
                    @edit="edit($event)" @page-changed="pageChange($event, filter)">
                    <template #status="{ data }">
                        <div v-if="data.item.status === 'OPEN'" class="">
                            <span class="text-12 badge-danger rounded text-center p-1 text-white">OPEN</span>
                        </div>
                        <div v-if="data.item.status === 'SCHEDULED'" class="">
                            <span class="text-12 badge-warning rounded text-center p-1 text-white">SCHEDULED</span>
                        </div>
                        <div v-if="data.item.status === 'CLOSED'" class="">
                            <span class="text-12 badge-success rounded text-center p-1 text-white">CLOSED</span>
                        </div>
                    </template>
                    <template #description="{ data }">
                        <div class="">
                            <span>{{ data.item.description }}</span>
                        </div>

                    </template>
                </TableComponent>
            </template>
        </UtilsFilterComponent>

        <DashboardModalAddNursingTask :age="age" @refresh="pageChange(1, filter)" :patient="data" />
        <div v-show="viewModal">
            <DashboardModalViewPatientTask :data="taskLine" @hide="viewModal = false" :editData="taskLine"
                @refresh="pageChange(1, filter)" :patient="data" />
        </div>

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
                document_type: '',
                date_from: '',
                date_to: ''
            },
            editData: {},
            taskLine: {

            },
            age: {
                year: '',
                month: '',
                day: ''
            },
            viewModal: false,
            patient: {},
            options: [],
            fileTypes: [],
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
                    key: 'order_id',
                    label: 'Order ID',
                    sortable: true,
                },
                {
                    key: 'station.name',
                    label: 'Station',
                    sortable: true,
                },
                {
                    key: 'description',
                    label: 'Service',
                    sortable: true,
                },

                {
                    key: 'created_by',
                    label: 'Ordered by',
                    formatter: (val, key, item) => {
                        if (Object.keys(val).length > 0) {
                            return val.first_name + ' ' + val.last_name
                        }
                        else {
                            return ''
                        }
                    },
                    sortable: true,
                },
                { key: 'status', label: 'Status', sortable: true },
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
        'filter.document_type'() {
            if (this.filter.document_type !== null) {
                this.pageChange(1, this.filter)
            }
        },
        'filter.date_from'() {
            if (this.filter.dateFrom !== '') {
                this.pageChange(1, this.filter)
            }
        },
        'filter.date_to'() {
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
                const data = await this.$api.nursing.getTask({
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

        createNursingOrder() {
            this.$bvModal.show('nurseTask')
            this.calcAge(this.data.date_of_birth)
        },
        viewDocument(e) {
            this.taskLine = e
            this.viewModal = true
            this.$bvModal.show('viewpatientTask')
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
        calcAge(e) {
            if (typeof (e) == 'string') {
                // **********calc year***********
                let presentDate = new Date().getFullYear()
                let yearOfBirth = e.substring(0, 4)
                let month = new Date().getMonth()
                let monthOfBirth = parseInt(e.substring(5, 7))

                let diff = presentDate - yearOfBirth
                let x = parseInt(diff)
                if (x === 0) {
                    this.age.year = 0
                    this.age.month = 0
                } else {
                    this.age.year = x
                }

                if (monthOfBirth < month) {
                    this.age.year
                } else {
                    if (this.age.year === 0) {
                        this.age.year
                    } else {
                        this.age.year--
                    }
                }

                // **************calc month***********
                let tempMonth

                // tempMonth = monthOfBirth - month
                if (presentDate === yearOfBirth) {
                    // this.patient.age.month = 0
                } else {
                    tempMonth = 12 - monthOfBirth
                }

                if (monthOfBirth <= month) {
                    this.age.month = month - monthOfBirth
                    // this.patient.age.month + 1;
                } else if (month + 1 === monthOfBirth) {
                    this.age.month = 0
                } else {
                    this.age.month = tempMonth + month
                    // this.patient.age.month + 1;
                }

                // **************calc day**************
                let day = new Date().getDate()
                let dayOfBirth = e.substring(8, 10)
                // this.patient.age.day = new Date().getDate();

                if (day > dayOfBirth) {
                    this.age.day = day - dayOfBirth
                } else if (day === dayOfBirth) {
                    this.age.day = 0
                } else {
                    this.age.day = day
                }

                // *********************************
            }
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