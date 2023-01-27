<template>
    <div>
        <UtilsFilterComponent @search-input="searchMe($event)" disable-visualization disable-pagination>
            <template #besideFilterButton>
                <BaseButton class="btn-outline-primary" @click="openModal">Add Template</BaseButton>
            </template>
            <template>
                <TableComponent @delete="deleteItem" :fields="fields" :pages="pages" :items="items" :busy="busy"
                    @edit="edit($event)" @page-changed="pageChange($event, filter)">
                    <template #description="{ data }">
                        <div class="">
                            <span>{{ data.item.description }}</span>
                        </div>
                    </template>
                </TableComponent>
            </template>
        </UtilsFilterComponent>
        <SettingsTemplateModalAddTemplate :edit-data="editObj" @refresh="pageChange(1)" :modalTitle="modalTitle" />
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
                name: '',
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
                    key: 'is_private',
                    label: 'Private',
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
                const data = await this.$api.templates.getEncTemplates({ page, ...e })
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
            this.modalTitle = 'Add Template'
            this.$bvModal.show('addTemplate')
        },
        edit(e) {
            this.editObj = e
            this.modalTitle = 'Edit Template'
            this.$bvModal.show('addTemplate')
        },
        async deleteItem(item) {
            const result = await this.showConfirmMessageBox('Delete chart template ?')
            try {
                if (result) {
                    let response = await this.$api.templates.deleteEncTemplate(item.id)
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