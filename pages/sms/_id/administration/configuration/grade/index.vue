<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Grade Level</div>
      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <BaseButton
            v-role="'admin'"
            class="py-2 px-3"
            @click="$bvModal.show('modal')"
            ><b-icon icon="calendar-plus"></b-icon> Add Grade Level</BaseButton
          >
        </div>
      </div>
    </div>

    <UtilsFilterComponent @search-input="pageChange(1, $event)">
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :fields="fields"
          perPage="999"
          :pages="pages"
          :items="items"
          :busy="busy"
          @page-changed="pageChange"
          @row-clicked="onRowClicked"
        />
        <div v-else class="row">
          <div
            v-for="(value, index) in items"
            :key="index"
            class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
          >
            <UtilsGridViewCard
              :data="value"
              :display-key="[
                'grade_name',
                'name',
                'number_of_subjects',
                'number_of_categories',
              ]"
            ></UtilsGridViewCard>
          </div>
        </div>
      </template>
    </UtilsFilterComponent>

    <PageConfigurationsGradeAddEditModal
      title="Add Grade"
      @refresh="pageChange(1)"
    />
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins

export default {
  mixins: [TableFunc],
  data() {
    return {
      school: {
        id: '',
      },
      // grade: {
      //   name: '',
      //   grade_name: ''
      // },
      fields: [
        // { key: 'check', sortable: false },
        { key: 'grade_name', sortable: true },
        { key: 'name', label: '6-3-3 Mapping', sortable: true },
        { key: 'number_of_subjects', sortable: true },
        { key: 'number_of_categories', sortable: true },
      ],
    }
  },
  async mounted() {
    this.school = this.$store.getters['school/getSchoolByCode'](
      this.$route.params.id
    )
    await this.pageChange(1)
  },
  methods: {
    async pageChange(page, search = '') {
      this.busy = true
      const data = await this.$axios.$get(
        `/slate-admin/school/${this.school.id}/grades/?paginate=false`
      )
      this.items = data.data
      this.pages = data.pages
      this.busy = false
    },
    onRowClicked(e) {
      console.log(e)
      this.$router.push({
        name: 'sms-id-administration-configuration-grade-grade',
        params: { grade: e.id, id: this.$route.params.id },
        query: { _name: `${e.name}` },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
