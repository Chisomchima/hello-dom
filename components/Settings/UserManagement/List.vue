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
          @row-clicked="edit($event)"
          @delete="deleteUser"
        >
          <template #description="{ data }">
            <div>
              <span>{{ data.item.description }}</span>
            </div>
          </template>
          <template #username="{ data }">
            <div>
              <span>{{ toLowerCaseFunc(data.item.username) }}</span>
            </div>
          </template>
          <template #last_login="{ data }">
            <div>
              <span>{{ dateFormatter(data.item.last_login) }}</span>
            </div>
          </template>
          <template #email="{ data }">
            <div class="d-flex align-items-center">
              <span class="mr-2">{{ data.item.email }}</span>
            </div>
          </template>
          <template #password_recover_date="{ data }">
            <div>
              <span
                v-if="data.item.password_recover_status"
                class="
                  text-info text-center
                  border border-info
                  rounded
                  text-10
                  px-1
                "
                >Password reset</span
              >
              <span v-else>
                {{ dateFormatter(data.item.password_recover_date) }}
              </span>
            </div>
          </template>

          <template #triple_actions="{ data }">
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <span class="d-none">{{ data.item.is_active }}</span>
              <template #button-content>
                <b-icon icon="three-dots-vertical"></b-icon>
              </template>
              <template>
                <b-dropdown-item
                  @click="resetPasswordByAdmin(data.item)"
                  class="text-capitalize"
                >
                  Reset password
                </b-dropdown-item>
                <b-dropdown-item
                  v-if="data.item.is_active"
                  @click="deactivate(data.item)"
                  class="text-capitalize"
                >
                  Deactivate user
                </b-dropdown-item>
                <b-dropdown-item
                  v-if="!data.item.is_active"
                  class="text-capitalize"
                  @click="activate(data.item)"
                >
                  Activate user
                </b-dropdown-item>
                <b-dropdown-item
                  class="text-capitalize"
                  @click="edit(data.item)"
                >
                  Edit user
                </b-dropdown-item>
                <b-dropdown-item
                  class="text-capitalize"
                  @click="deleteUser(data.item)"
                >
                  Delete user
                </b-dropdown-item>
              </template>
            </b-dropdown>
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <SettingsUserManagementModalAddUser
      @refresh="pageChange(1)"
      :modalTitle="modalTitle"
    />
    <SettingsUserManagementModalEditUser
      @refresh="pageChange(1)"
      :modalTitle="modalTitle"
      :edit-data="editObj"
    />
    <SettingsUserManagementModalCopyAuth :user="user" />
  </div>
</template>

<script>
import { DateTime } from 'luxon'
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
      user: {},
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
          key: 'last_login',
        },
        {
          key: 'password_recover_date',
          label: 'Password recovery',
        },
        {
          key: 'triple_actions',
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
    async resetPasswordByAdmin(user) {
      const result = await this.showConfirmMessageBox('Reset password ?')
      try {
        if (result) {
          let response = await this.$api.users.resetPassword(user.id)
          this.user = response
          if (response) {
            this.$bvModal.show('copyAuth')
            this.$toast({
              type: 'success',
              text: `Success`,
            })
          }
          this.pageChange(1, this.filters)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(user) {
      const result = await this.showConfirmMessageBox('Delete user ?')
      try {
        if (result) {
          let response = await this.$api.users.deleteUser(user.id)
          this.$toast({
            type: 'success',
            text: `User deleted`,
          })
          this.pageChange(1, this.filters)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deactivate(user) {
      const result = await this.showConfirmMessageBox('Deactivate user ?')
      try {
        if (result) {
          let response = await this.$api.users.deactivateUser(user.id)
          this.$toast({
            type: 'success',
            text: `User deactivated`,
          })
          this.pageChange(1, this.filters)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async activate(user) {
      const result = await this.showConfirmMessageBox('Activate user ?')
      try {
        if (result) {
          let response = await this.$api.users.activateUser(user.id)
          this.$toast({
            type: 'success',
            text: `User activated`,
          })
          this.pageChange(1, this.filters)
        }
      } catch (error) {
        console.log(error)
      }
    },

    openModal() {
      this.modalTitle = 'Add User'
      this.$bvModal.show('addUser')
    },
    edit(e) {
      this.editObj = e
      this.modalTitle = 'Edit User'
      this.$bvModal.show('editUser')
    },
    toLowerCaseFunc(e) {
        
         let x = e = e.toLowerCase()
        console.log(x)
        return x
    },
    dateFormatter(x) {
      if (x) {
        return DateTime.fromISO(x).toFormat('yyyy-LL-dd T')
      } else {
        return ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>