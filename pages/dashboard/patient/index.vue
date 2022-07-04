<template>
  <div>
    <div class="row">
      <div class="col-12 mb-3">
        <div class="d-flex justify-content-between">
          <div class="page-heading mb-4">Patient Records</div>
          <div>
            <BaseButton
              class="btn-primary btn-lg"
              @click="$router.push('/dashboard/patient/add')"
              >Create Patient</BaseButton
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 mb-4">
        <div class="card">
          <div class="card-body">
            <DashboardPatientFilters @filter="filter(1, $event)" />
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <UtilsFilterComponent
          disable-pagination
          :disable-visualization="true"
          search-placeholder="Search"
        >
          <TableComponent
            :fields="fields"
            :pages="pages"
            :items="items"
            :busy="busy"
            :dropdown-item="['order_lab', 'order_encounter', 'order_imaging']"
            @page-changed="filter($event, currentFilter)"
            @row-clicked="goToProfile($event)"
            @order_lab="goToLab($event)"
            @order_encounter="showEncounterModal($event)"
            @order_imaging="showImagingModal($event)"
          />
        </UtilsFilterComponent>
      </div>
    </div>
    <DashboardModalAddLabOrder :data="modalData" @refresh="pageChange()" />
    <DashboardModalAddEncounter :data="modalData" @refresh="pageChange()" />
    <DashboardModalAddPatientImagingOrder :data="modalData" @refresh="pageChange()" />
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun'

export default {
  mixins: [TableFunc],
  data() {
    return {
      genders: ['male', 'female'],
      modalData: {},
      busy: false,
      currentFilter: {},
      newCount: 0,
      nurseCount: 0,
      fields: [
        {
          key: 'uhid',
          label: 'UHID',
          // width: '20%',
        },
        {
          key: 'name',
          label: 'Name',
          formatter: (value, key, item) => {
            return (
              item.salutation +
              ' ' +
              item.firstname +
              ' ' +
              item.middlename +
              ' ' +
              item.lastname
            )
          },
        },
        {
          key: 'gender',
        },
        {
          key: 'date_of_birth',
        },
        {
          key: 'phone_number',
        },
        {
          label: '',
          key: 'dots',
        },
      ],
    }
  },
  methods: {
    async filter(page = 1, e) {
      this.currentFilter = e
      try {
        this.busy = true
        const data = await this.$api.patient.searchPatient({ ...e, page })
        this.items = data.results
        this.pages = data.total_pages
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    pageChange() {},
    goToProfile(e) {
      this.$router.push({
        name: 'dashboard-patient-uuid',
        params: {
          uuid: e.id,
        },
      })
    },
    goToLab(e) {
      this.modalData = e
      this.$bvModal.show('modal')
      console.log(e)
    },

    showEncounterModal(e) {
      this.modalData = e
      this.$bvModal.show('add_encounters')
    },

    showImagingModal(e){
      this.modalData =e;
      this.$bvModal.show('add_imaging');
    }
  },
}
</script>

<style lang="scss" scoped>
</style>