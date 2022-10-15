<template>
  <div>
    <UtilsFilterComponent
      @search-input="searchMe($event)"
      disable-visualization
      disable-pagination
    >
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="openModal"
          >Add Template</BaseButton
        >
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :modalTitle="modalTitle"
          :busy="busy"
          @edit="edit"
          @delete="deleteTemplate"
        >
          <template #description="{ data }">
            <div>{{ data.item.description }}</div>
          </template>
          <!-- <template #content="{ data }">
           <div v-html="data.item.content" class="text-12"></div>
          </template> -->
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <SettingsImagingModalAddTemplate
      @refresh="pageChange(1)"
      :modalTitle="modalTitle"
      :edit-data="editObj"
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
        title: '',
        description: '',
        content: null,
        source: null,
      },
      filters: {
        name: '',
        size: 10,
      },
      modalTitle: 'Add Template',
      user: {},
      fields: [
        {
          key: 'title',
        },
        {
          key: 'description',
        },
        {
          key: 'created_at',
        },
        {
          key: 'created_by',
          formatter: (value) => {
            return value.first_name + ' ' + value.last_name
          },
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
        const data = await this.$api.templates.getTemplates({ page, ...e })
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
    async deleteTemplate(template) {
      const result = await this.showConfirmMessageBox('Delete template ?')
      try {
        if (result) {
          let response = await this.$api.templates.deleteTemplate(template.id)
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

    openModal() {
      this.modalTitle = 'Add Template'
      this.$bvModal.show('addImagingTemplate')
    },
    edit(e) {
      this.editObj = e
      this.modalTitle = 'Edit Template'
      this.$bvModal.show('addImagingTemplate')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>