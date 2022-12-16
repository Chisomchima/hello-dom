<template>
    <div>
        <UtilsFilterComponent @search-input="searchMe($event)" disable-visualization disable-pagination>
            <template #besideFilterButton>
                <BaseButton class="btn-outline-primary" @click="openModal">Add Nursing service</BaseButton>
            </template>
            <template>
                <TableComponent :fields="fields"  :pages="pages" :items="items" :modalTitle="modalTitle" :busy="busy"
                    @edit="edit($event)" @delete="deleteItem" @page-changed="pageChange($event, filter)">
                    <template #description="{ data }">
                        <div class="">
                            <span>{{ data.item.description }}</span>
                        </div>
                    </template>
                </TableComponent>
            </template>
        </UtilsFilterComponent>
        <SettingsServicesModalAddServices :edit-data="editObj" @refresh="pageChange(1)" :modalTitle="modalTitle" />
    </div>
</template>
  
<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
    mixins: [TableFunc],
    props: {},
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
                    key: 'name',
                    label: 'Station',
                },
                {
                    key: 'cost_price',
                    label: 'Cost price',
                },
                {
                    key: 'bill_price',
                    label: 'Bills price',
                },
                {
                    key: 'description',
                    label: 'Description',
                },
                {
                    key: 'actions',
                    label: '',
                },

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
                const data = await this.$api.nursing.getServices({ page, ...e })
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
            this.modalTitle = 'Add service'
            this.$bvModal.show('addServices')
        },
        edit(e) {
            this.editObj = e
            this.modalTitle = 'Edit service'
            this.$bvModal.show('addServices')
        },
        async deleteItem(item) {
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