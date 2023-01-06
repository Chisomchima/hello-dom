<template>
    <div>
        <UtilsFilterComponent @search-input="searchMe($event)" disable-visualization disable-pagination>
            <template #besideFilterButton>
                <BaseButton class="btn-outline-primary" @click="openModal">Add task</BaseButton>
            </template>
            <template>
                <TableComponent :fields="fields" :pages="pages" @row-clicked="editdialogue" :items="items" :dropdown-item="['close_task', 'cancel_task']" :busy="busy"
                    @edit="edit($event)" @close_task="closeTask" @page-changed="pageChange($event, filter)">
                    <template #status="{ data }">
                        <div v-if="data.item.status === 'OPEN'" class="">
                <span class="text-12 badge-info rounded text-center p-1 text-white">SCHEDULED</span>
              </div>
              <div v-if="data.item.status === 'SCHEDULED'" class="">
                <span class="text-12 badge-info rounded text-center p-1 text-white">SCHEDULED</span>
              </div>
              <div v-if="data.item.status === 'CLOSED'" class="">
                <span class="text-12 badge-danger rounded text-center p-1 text-white">DONE</span>
              </div>
                    </template>
                    <template #type="{ data }">
                        <div class="">
                            <span>{{ data.item.type }}</span>
                        </div>
                    </template>
                </TableComponent>
            </template>
        </UtilsFilterComponent>
        <NursingModalAddNursingTask :data="data" :edit-data="editObj" :patient="patient" @refresh="pageChange(1)" :modalTitle="modalTitle" />
        <!-- <NursingTabsAddTasks :edit-data="editObj" :patient="patient" @refresh="pageChange(1)" :modalTitle="modalTitle" /> -->
        <NursingModalActionTask :editData="editObj" :patient="patient" @refresh="pageChange(1)" :modalTitle="modalTitle" />
        <NursingModalCloseTask :editData="editData" @refresh="filter(currentPage, currentFilter)" />
        <NursingModalCancelTask :editData="editData" @refresh="filter(currentPage, currentFilter)" />
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
                    key: 'notes',
                    label: 'Description',
                    sortable: true,
                },
                
                {
                    key: 'scheduled_at',
                    label: 'Scheduled date',
                    formatter: (value) => {
                        return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
                    },
                    sortable: true,
                },
                {
                    key: 'closed_at',
                    label: 'Close date',
                    formatter: (value) => {
                        return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
                    },
                    sortable: true,
                },
                { key: 'status', label: 'Status', sortable: true },
                { key: 'dots', label: '', sortable: false },
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
            this.editObj = e
            this.modalTitle = 'Edit Task'
            this.$bvModal.show('actionTask')
        },
        async closeTask(item){
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