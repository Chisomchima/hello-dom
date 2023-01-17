<template>
    <div>
        <UtilsFilterComponent @search-input="searchMe($event)" disable-visualization disable-pagination>
            <template #besideFilterButton>
                <BaseButton class="btn-outline-primary" @click="openModal">Add task</BaseButton>
            </template>
            <template>
                <TableComponent :fields="fields" :pages="pages" @row-clicked="editdialogue" :items="items"
                     :busy="busy" @edit="edit($event)"
                    @page-changed="pageChange($event, filter)">
                    <template #status="{ data }">
                        <div v-if="data.item.status === 'OPEN'" class="">
                            <span class="text-12 badge-danger rounded text-center p-1 text-white">OPEN</span>
                        </div>
                        <div v-if="data.item.status === 'SCHEDULED'" class="">
                            <span class="text-12 badge-warning rounded text-center p-1 text-white">SCHEDULED</span>
                        </div>
                        <div v-if="data.item.status === 'CLOSED'" class="">
                            <span class="text-12 badge-success rounded text-center p-1 text-white">DONE</span>
                        </div>
                    </template>
                    <template #type="{ data }">
                        <div class="">
                            <span>{{ data.item.type }}</span>
                        </div>
                    </template>
                    <template #triple_actions="{ data }">
                        <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                            <template #button-content>
                                <b-icon icon="three-dots-vertical"></b-icon>
                            </template>
                            <template>
                                <b-dropdown-item @click="closeTask(data.item)" v-if="data.item.status === 'SCHEDULED'" class="text-capitalize">
                                    Mark as done
                                </b-dropdown-item>
                                <b-dropdown-item @click="closeTask(data.item)" v-if="data.item.status === 'SCHEDULED'" class="text-capitalize">
                                    Cancel task
                                </b-dropdown-item>
                                <b-dropdown-item disabled v-if="data.item.status === 'CLOSED' || data.item.status === 'OPEN'" class="text-capitalize">
                                   <div> Mark as done</div>
                                </b-dropdown-item>
                                <b-dropdown-item disabled v-if="data.item.status === 'CLOSED' || data.item.status === 'OPEN'" class="text-capitalize">
                                    <div> Cancel task</div>
                                </b-dropdown-item>
                            </template>
                        </b-dropdown>
                    </template>
                </TableComponent>
            </template>
        </UtilsFilterComponent>
        <NursingModalAddNursingTask :data="data" :edit-data="editObj" :patient="patient" @refresh="pageChange(1)"
            :modalTitle="modalTitle" />
        <!-- <NursingTabsAddTasks :edit-data="editObj" :patient="patient" @refresh="pageChange(1)" :modalTitle="modalTitle" /> -->
        <NursingModalActionTask :data="data" :editData="editObj" :patient="patient" @refresh="pageChange(1)"
            :modalTitle="modalTitle" />
        <NursingModalCloseTask :data="data" :editData="editData" @refresh="pageChange(1)" />
        <NursingModalCancelTask :data="data" :editData="editData" @refresh="pageChange(1)" />
        <NursingModalViewTask :data="data" :editData="editObj" :patient="patient"
            />
    </div>
</template>
  
<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
    mixins: [TableFunc],
    props: {
        patient: {
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
            editData: {},
            editObj: {
                title: "",
                notes: "",
                type: 'IMMEDIATE',
                nursing_services: [],
                inventory: [
                    {
                        product: null,
                        store: null
                    }
                ],
                scheduled_at: ''
            },
            filters: {
                name: '',
                size: 10,
            },
            modalTitle: 'Add service',
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
                    key: 'created_by',
                    label: 'Created by',
                    sortable: true,
                    formatter: (val) => {
                        if (val !== null) {
                            return val.first_name + ' ' + val.last_name
                        }
                    },
                },
                {
                    key: 'notes',
                    label: 'Description',
                    sortable: true,
                },

                {
                    key: 'scheduled_at',
                    label: 'Scheduled date',
                    formatter: (value) => {
                        if (value !== null) {
                            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
                        }
                    },
                    sortable: true,
                },
                {
                    key: 'scheduled_by',
                    label: 'Scheduled by',
                    sortable: true,
                    formatter: (val) => {
                        if (val !== null) {
                            return val.first_name + ' ' + val.last_name
                        }
                    },
                },
                {
                    key: 'closed_at',
                    label: 'Close date',
                    formatter: (value) => {
                        if (value !== null) {
                            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
                        }
                    },
                    sortable: true,
                },
                {
                    key: 'closed_by',
                    label: 'Performed by',
                    sortable: true,
                    formatter: (val) => {
                        if (val !== null) {
                            return val.first_name + ' ' + val.last_name
                        }
                    },
                },
                { key: 'status', label: 'Status', sortable: true },
                { key: 'triple_actions', label: '', sortable: false },
            ],
        }
    },
    async mounted() {
        await this.pageChange(1)
    },
    methods: {
        searchMe(e) {
            this.filters.name = e
            this.pageChange(1, this.filters)
        },
        async pageChange(page = 1, e = { name: '', size: 10 }) {
            try {
                this.busy = true
                const data = await this.$api.nursing.getTaskSlug({ page, ...e }, this.$route.params.uid)
                this.items = data.results
                this.pages = data.total_pages
                this.busy = false
            } catch (error) {
                console.log(error)
            } finally {
                this.busy = false
            }
        },
        openModal() {
            this.modalTitle = 'Add Task'
            this.$bvModal.show('nurseTask')
        },
        editdialogue(e) {
            console.log(e)

            if (e.status === 'SCHEDULED') {
                this.editObj = e
                this.modalTitle = 'Edit Task'
                this.$bvModal.show('actionTask')
            }
            if (e.status === 'OPEN' || e.status === 'CLOSED' || e.status === 'DONE') {
                this.editObj = e
                this.modalTitle = 'View Task'
                this.$bvModal.show('viewTask')
            }
        },
        async closeTask(item) {
            this.editData = item
            console.log(item)
            this.$bvModal.show('closeTask')
        },
        async cancelTask(item) {
            this.editData = item
            this.$bvModal.show('cancelTask')
        },
    },
}
</script>
  
<style lang="scss" scoped>

</style>