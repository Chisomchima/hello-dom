<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Houses</div>
      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <BaseButton v-role="'admin'" class="py-2 px-3" @click="goToRoute()"
            ><span class="iconify" data-icon="bi:house"></span> Add
            House</BaseButton
          >
        </div>
      </div>
    </div>

    <UtilsFilterComponent>
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
          @page-changed="pageChange"
          @row-clicked="onRowClicked"
        >
          <template #color="{ data }">
            <div
              class="rounded-circle"
              style="height: 25px; width: 25px"
              :style="{ backgroundColor: data.item.icon_data.icon_bg_color }"
            ></div>
          </template>
        </TableComponent>
        <div v-else class="row">
          <div
            v-for="(value, index) in items"
            :key="index"
            class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
          >
            <UtilsGridViewCard
              :data="value"
              :display-key="['name', 'name', 'males', 'females']"
            ></UtilsGridViewCard>
          </div>
        </div>
      </template>
    </UtilsFilterComponent>
  </div>
</template>

<script>
import mixin from '../mixin'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc, mixin],
  data() {
    return {
      house: {
        name: '',
        color: '#000000',
        coordinator: [],
      },
      coordinators: [],
      fields: [
        // { key: 'check', sortable: false }, { key: 'grade_name', sortable:true },
        { key: 'name', sortable: true },
        { key: 'staff_coordinator', label: 'Coordinator', sortable: true },
        { key: 'staffs', label: 'Staff', sortable: true },
        { key: 'color', label: 'color', sortable: true },
        { key: 'males', label: 'Male', sortable: true },
        { key: 'females', label: 'Female', sortable: true },
        { key: 'total', sortable: true },
      ],
    }
  },

  async mounted() {
    await this.pageChange(1)
  },
  methods: {
    async pageChange(page) {
      this.busy = true
      const school = this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )
      const data = await this.$axios.$get(
        `/slate-admin/school/${school.id}/houses/?page=${page}`
      )
      this.items = data.data
      this.pages = data.pages
      this.busy = false
    },
    onRowClicked(item) {
      console.log(item)
      this.$router.push({
        name: 'sms-id-administration-configuration-house-house',
        params: { house: item.id, id: this.$route.params.id },
        query: { _name: `${item.name}` },
      })
    },
    goToRoute() {
      this.$router.push({
        name: 'sms-id-administration-configuration-house-add',
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
