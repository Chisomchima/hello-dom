<template>
    <div>
        <UtilsFilterComponent disable-visualization disable-pagination @search-input="searchMe($event)">
            <template #besideFilterButton>
                <BaseButton class="btn-outline-primary" @click="openModal">Add Template</BaseButton>
            </template>
            <template>
                <TableComponent :fields="fields" :pages="pages" :items="items" :busy="busy" @delete="deleteItem"
                    @edit="edit($event)" @page-changed="pageChange($event, filter)">
                    <template #description="{ data }">
                        <div class="">
                            <span>{{ data.item.description }}</span>
                        </div>
                    </template>
                </TableComponent>
            </template>
        </UtilsFilterComponent>
        <SettingsTemplateModalNewTemplate :editObj="editObj" :modalTitle="modalTitle" @refresh="pageChange(1)" />
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
            },
            filters: {
                title: '',
                source: '',
                size: 10,
            },
            modalTitle: 'Add Template',
            fields: [
                {
                    key: 'created_at',
                    label: 'Date',
                },
                {
                    key: 'title',
                    label: 'Title',
                },
                {
                    key: 'description',
                    label: 'Description',
                },
                {
                    key: 'source',
                    label: 'Source',
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
            
            this.filters.title = e
            this.pageChange(1, this.filters)
        },
        async pageChange(page = 1, e = { title: '', size: 10 }) {
            try {
                this.busy = true
                const data = await this.$api.templates.getCoreTemplates({ page, ...e })
                console.log(data, 'dta')
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
            this.modalTitle = 'Create New Template'
            this.$bvModal.show('newTemplate')
        },
        edit(e) {
            console.log(e,'e')
            this.editObj = e
            this.modalTitle = 'Edit Template'
            this.$bvModal.show('newTemplate')
        },
        async deleteItem(item) {
            const result = await this.showConfirmMessageBox('Delete template ?')
            try {
                if (result) {
                   await this.$api.templates.deleteCoreTemplate(item.id)
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