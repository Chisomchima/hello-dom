<template>
  <div>
    <UtilsFilterComponent
      @search-input="searchMe($event)"
      disable-visualization
      disable-pagination
    >
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="openModal"
          >Add User</BaseButton
        >
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :modalTitle="modalTitle"
          :busy="busy"
          @edit="edit($event)"
          @row-clicked="details"
        >
          <template #description="{ data }">
            <div class="">
              <span>{{ data.item.description }}</span>
            </div>
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <SettingsUserManagementModalAddUser
      :edit-data="editObj"
      @refresh="pageChange(1)"
      :modalTitle="modalTitle"
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
      editObj: {
        name: '',
        description: '',
        display_name: '',
        is_active: true,
      },
      payload: {
        name: '',
        description: '',
        display_name: '',
        is_active: true,
      },
      filters: {
        username: '',
        size: 10,
      },
      modalTitle: 'Add User',
      fields: [
        {
          key: 'first_name',
        },
        {
          key: 'last_name',
        },
        {
          key: 'username',
          label: 'Username',
        },
        {
          key: 'email',
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
    async pageChange(page = 1, e = { username: '', size: 10 }) {
      try {
        this.busy = true
        const data = await this.$api.users.getUsers({ page, ...e })
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
      this.modalTitle = 'Add User'
      this.$bvModal.show('addUser')
    },
    edit(e) {
      this.editObj = e
      this.modalTitle = 'Edit User'
      this.$bvModal.show('addUser')
    },
    details(e){
        console.log(e)
    }
  },
}
</script>

<style lang="scss" scoped>
</style>