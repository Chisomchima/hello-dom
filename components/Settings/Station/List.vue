<template>
    <div>
        <UtilsFilterComponent @search-input="searchMe($event)" disable-visualization disable-pagination>
            <template #besideFilterButton>
                <BaseButton class="btn-outline-primary" @click="openModal">Add Nursing station</BaseButton>
            </template>
            <template>
                <TableComponent :fields="fields" :pages="pages" :items="items" :modalTitle="modalTitle" :busy="busy"
                    @edit="edit($event)" @delete="deleteItem" @page-changed="pageChange($event, filter)">
                    <template #description="{ data }">
                        <div class="">
                            <span>{{ data.item.description }}</span>
                        </div>
                    </template>
                </TableComponent>
            </template>
        </UtilsFilterComponent>
        <SettingsStationModalAddStation :edit-data="editObj" @refresh="pageChange(1)" :modalTitle="modalTitle" />
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
            modalTitle: 'Add Department',
            fields: [
                {
                    key: 'name',
                    label: 'Station',
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
                const data = await this.$api.nursing.getStation({ page, ...e })
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
            this.modalTitle = 'Add station'
            this.$bvModal.show('addStation')
        },
        edit(e) {
            this.editObj = e
            this.modalTitle = 'Edit station'
            this.$bvModal.show('addStation')
        },
        async deleteItem(item) {
            const result = await this.showConfirmMessageBox('Delete nursing station ?')
            try {
                if (result) {
                    let response = await this.$api.nursing.deleteStation(item.id)
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