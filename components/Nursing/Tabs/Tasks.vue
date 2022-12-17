<template>
    <div>
        <UtilsFilterComponent @search-input="searchMe($event)" disable-visualization disable-pagination>
            <template #besideFilterButton>
                <BaseButton class="btn-outline-primary" @click="openModal">Add task</BaseButton>
            </template>
            <template>
                <TableComponent :fields="fields" :pages="pages" :items="items" :dropdown-item="['close_task', 'cancel_task']" :busy="busy"
                    @edit="edit($event)" @close_task="closeTask" @page-changed="pageChange($event, filter)">
                    <template #status="{ data }">
                        <div class="">
                            <span>{{ data.item.status }}</span>
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
        <NursingModalAddNursingTask :edit-data="editObj" :patient="patient" @refresh="pageChange(1)" :modalTitle="modalTitle" />
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
    },
    data() {
        return {
            editObj: {
                name: "",
                description: ""
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
                    key: 'title',
                    label: 'Title',
                    sortable: true,
                },
                {
                    key: 'type',
                    label: 'Type',
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
        edit(e) {
            this.editObj = e
            this.modalTitle = 'Edit Task'
            this.$bvModal.show('nurseTask')
        },
        async closeTask(item){
            const result = await this.showConfirmMessageBox('Close nursing task ?', 'Close')
            try {
                if (result) {
                    let response = await this.$api.nursing.closeNursingTask(this.$route.params.uid, item.id)
                    this.$toast({
                        type: 'success',
                        text: `Task closed`,
                    })
                    this.pageChange(1, this.filters)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async cancelTask(item) {
            const result = await this.showConfirmMessageBox('Delete nursing service ?')
            try {
                if (result) {
                    let response = await this.$api.nursing.deleteServices(item.id)
                    this.$toast({
                        type: 'success',
                        text: `Deleted`,
                    })
                    this.pageChange(1, this.filters)
                }
            } catch (error) {
                console.log(error)
            }
        },
    },
}
</script>
  
<style lang="scss" scoped>

</style>