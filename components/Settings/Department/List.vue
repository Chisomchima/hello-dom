<template>
  <div>
    <UtilsFilterComponent
      @search-input="searchMe($event)"
      disable-visualization
      disable-pagination
    >
      <template #besideFilterButton>
        <BaseButton
          class="btn-outline-primary"
          @click="openModal"
          >Add Department</BaseButton
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
        >
          <template #description="{ data }">
            <div class="">
              <span>{{ data.item.description }}</span>
            </div>
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <SettingsDepartmentModalAddDepartment
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
        name: '',
        size: 10,
      },
      modalTitle: 'Add Department',
      fields: [
        {
          key: 'name',
        },
        {
          key: 'display_name',
        },
        {
          key: 'description',
        },
        // {
        //   key: 'dial',
        //   label: '',
        // },

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
        const data = await this.$api.opd.getDepartments({ page, ...e })
        this.items = data.results
        this.pages = data.total_pages
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    openModal(){
        this.modalTitle = 'Add department'
        this.$bvModal.show('addDepartment')
    },
    edit(e) {
      this.editObj = e
      this.modalTitle = 'Edit department'
      this.$bvModal.show('addDepartment')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>