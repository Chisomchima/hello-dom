<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Academic Period</div>
      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <BaseButton class="py-2 px-3" @click="$bvModal.show('modal')"
            ><b-icon icon="calendar-plus"></b-icon> Add Academic
            Period</BaseButton
          >
          <!-- <BaseButton
            v-role="'admin'"
            class="py-2 px-3"
            @click="$bvModal.show('modal')"
            ><b-icon icon="calendar-plus"></b-icon> Add Academic
            Period</BaseButton
          > -->
        </div>
      </div>
    </div>

    <UtilsFilterComponent @search-input="pageChange(1, $event)">
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :fields="fields"
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
              :display-key="['name', 'code', 'date_start', 'date_end']"
            ></UtilsGridViewCard>
          </div>
        </div>
      </template>
    </UtilsFilterComponent>

    <PageConfigurationsPeriodAddEditModal
      title="Add Academic Period"
      :school="school"
      @refresh="$nuxt.refresh()"
      @success="onRowClicked($event)"
    />
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  data() {
    return {
      school: {},
      key: 'value',
      visualize: 'list',
      fields: [
        // { key: 'check', sortable: false },
        { key: 'name', sortable: false },
        { key: 'code', sortable: true },
        { key: 'academic_year', sortable: true },
        { key: 'date_start', label: 'Start Date', sortable: true },
        { key: 'date_end', label: 'End Date', sortable: true },
        // { key: 'active', label: 'status', sortable: true }
      ],
    }
  },
  mounted() {
    this.school = this.$store.getters['school/getSchoolByCode'](
      this.$route.params.id
    )
    this.pageChange(1)
  },
  methods: {
    onRowClicked(e) {
      console.log(e)
      this.$router.push({
        name: 'sms-id-administration-configuration-period-academic_period_id',
        params: { academic_period_id: e.id, id: this.$route.params.id },
        query: { _name: `${e.name}` },
      })
    },
    async pageChange(page, search = '') {
      this.busy = true
      const data = await this.$axios.$get(
        `/slate-admin/school/${this.school.id}/periods/?page=${page}&search=${search}&param=all`
      )

      this.items = data.data
      this.pages = data.pages
      this.busy = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
