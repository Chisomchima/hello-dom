<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Academic Year</div>
      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <BaseButton
            class="py-2 px-3"
            @click="$bvModal.show('modal'), setForSubmit()"
          >
            <b-icon icon="calendar-plus"></b-icon> Add Academic Year</BaseButton
          >
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
          @edit="onEdit($event)"
          @delete="onDelete($event)"
        />

        <div v-else class="row">
          <div
            v-for="(value, index) in items"
            :key="index"
            class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
          >
            <UtilsGridViewCard
              :data="value"
              :display-key="['name', 'code', 'year_start', 'year_end']"
            ></UtilsGridViewCard>
          </div>
        </div>
      </template>
    </UtilsFilterComponent>
    <!-- <PageConfigurationsYearAddEditModal :school="school" /> -->

    <PageConfigurationsYearAddEditModal
      :title="modalTitle"
      :school="school"
      :field="editData"
      @refresh="pageChange(1)"
    />
  </div>
</template>

<script>
// import mixin from '../mixin'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
// import { school } from '@/types/school'
import AcademicYearMixins from '~/mixins/SmsAcademicYearFunc'
export default {
  mixins: [TableFunc, AcademicYearMixins],
  data() {
    const school = {
      code: '',
      id: '',
      image: '',
      name: '',
    }
    return {
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
      school,
      data: [],
      sortDirection: 'asc',
      isBusy: false,
      perPage: 10,
      fields: [
        // { key: 'check', sortable: false },
        { key: 'name', sortable: true },
        { key: 'code', sortable: true },
        { key: 'year_start', label: 'Start Date', sortable: true },
        { key: 'year_end', label: 'End Date', sortable: true },
        { key: 'current_academic_year', label: 'Status', sortable: true },
        { key: 'actions', label: '' },
      ],
      editData: {},
      modalTitle: 'Add Academic Year',
    }
  },
  async mounted() {
    await this.pageChange(1)
  },
  methods: {
    onRowClicked(e) {
      console.log(e)
      this.$router.push({
        name: 'sms-id-administration-configuration-year-academic_year_id',
        params: { academic_year_id: e.id, id: this.$route.params.id },
        query: { _name: `${e.name}` },
      })
    },

    async pageChange(page, search = '') {
      this.busy = true
      // console.log(this.school.id)
      const school = this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )

      try {
        const data = await this.$axios.$get(
          `/slate-admin/school/${school.id}/year/?page=${page}&search=${search}&param=all`
        )
        this.items = data.data
        this.pages = data.pages
      } catch (error) {
        console.log(error)
      }
      this.busy = false
    },

    setForSubmit() {
      this.editData = {}
      this.modalTitle = 'Add Academic Year'
    },

    onEdit(e) {
      this.editData = e
      this.modalTitle = 'Edit Academic Year'
      this.$bvModal.show('modal')
    },
    async onDelete(e) {
      const result = await this.deleteAcademicYear(e)
      console.log(result)
      if (result) {
        this.pageChange(1)
      }
    },
  },
}
</script>

<style></style>
