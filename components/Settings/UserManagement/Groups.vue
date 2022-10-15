<template>
  <div>
    <UtilsFilterComponent @search-input="searchMe($event)" disable-visualization disable-pagination>
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="createGroup"
          >Add Group</BaseButton
        >
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
          @edit="edit($event)"
        >
        <template #description="{ data }">
            <div>
              <span>{{ data.item.description }}</span>
            </div>
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <SettingsUserManagementModalAddGroup
      @hide="editObj = {}"
      :edit-data="editObj"
      :modalTitle="modalTitle"
      @refresh="pageChange(1)"
    />
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  props: {},
  data() {
    return {
      editObj: {},
      modalTitle: '',
      fields: [
        {
          key: 'name',
        },
        {
          key: 'description',
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
    searchMe(e){

      this.pageChange(1, {name:e})
    },
    async pageChange(page = 1, e={}) {
      
      try {
        this.busy = true
        const data = await this.$api.users.getGroups({ page, ...e })
        this.items = data.results
        this.pages = data.total_pages
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    async deleteGroup(user) {
      const result = await this.showConfirmMessageBox('Delete group ?')
      try {
        if (result) {
          let response = await this.$api.users.deleteGroup(user.id)
          this.$toast({
            type: 'success',
            text: `Group deleted`,
          })
          this.pageChange(1, this.filters)
        }
      } catch (error) {
        console.log(error)
      }
    },
    createGroup(){
        this.modalTitle = 'Add Group'
        this.$bvModal.show('addGroup')
    },
    edit(e) {
      this.editObj = e
       this.modalTitle = 'Edit Group'
      this.$bvModal.show('addGroup')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>