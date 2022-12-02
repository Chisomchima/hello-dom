<template>
  <div>
    <div class="row">
      <div class="col-12 mb-3">
        <div class="d-flex justify-content-between">
          <div class="page-heading mb-4">Prescription Worklist</div>
          <div>
            <BaseButton
              class="btn-primary btn-lg"
              @click="$bvModal.show('modal')"
              >New prescription</BaseButton
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 mb-4">
        <div class="card">
          <div class="card-body">
            <PharmacyMenuFilter @filter="filter(currentPage, $event)" />
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
            @row-clicked="viewPrescription"
            @page-changed="filter($event, currentFilter)"
            @cancel="cancelImaging($event)"
          >
          </TableComponent>
        </UtilsFilterComponent>
      </div>
    </div>
    <PharmacyAddPrescriptionWithPatient
      @refresh="filter(currentPage, currentFilter)"
    />

    <PharmacyShowPrescription
      :dataObject="modalData"
      @hide="modalData = {}"
      @refresh="filter(currentPage, currentFilter)"
    />
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun'
import FilterLogic from '~/mixins/routeFiltersMixin'
import modalMsgBox from '~/mixins/modalMsgBox'
export default {
  mixins: [TableFunc, FilterLogic, modalMsgBox],
  data() {
    return {
      modalData: {},
      busy: false,
      currentPage: 1,
      currentFilter: {},
      fields: [
        {
          key: 'created_at',
          label: 'Date',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
          },
          sortable: true,
        },
         { key: 'patient.uhid', label: 'UHID', sortable: true },
        {
          key: 'patient',
          label: 'Patient',
          sortable: true,
          formatter: (val) => {
            return (
              (val.salutation ? val.salutation : '') +
              ' ' +
              val.firstname +
              ' ' +
              val.lastname
            )
          },
        },
        {
          key: 'prc_id',
          label: 'PRC ID',
          sortable: true,
        },
        {
          key: 'prescribing_physician',
          label: 'Prescribing physician',
          sortable: true,
          formatter: (val) => {
            if (Object.keys(val).length > 0) {
              return val.first_name + ' ' + val.last_name
            }
            else{
              return ''
            }
          },
        },
       
        { key: 'store.name', label: 'Store', sortable: true },
         {
          key: 'created_by',
          label: 'Ordered by',
          formatter: (val, key, item) => {
            return val.first_name + ' ' +val.first_name
          },
          sortable: true,
        },
        // { key: 'status', label: 'Status', sortable: true },
        // { key: 'dots', label: '', sortable: false },
      ],
    }
  },
  // mounted() {
  //   this.filter(1, {})
  // },
  methods: {
    async filter(page, e) {
      this.currentFilter = e
      this.currentPage = page
      try {
        this.busy = true
        const data = await this.$api.pharmacy.getPrescriptions({
          ...e,
          page,
          worklist: true,
        })
        this.items = data.results
        this.pages = data.total_pages
        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },

    viewPrescription(e) {
      this.modalData = e
      this.$bvModal.show('viewPrescription')
    },

    async cancelImaging(e) {
      const result = await this.showDeleteMessageBox(
        'Do you want to cancel Imaging Order'
      )
      try {
        if (result) {
          await this.$api.imaging.patchObservationOrder(e.id, {
            status: 'CANCELLED',
          })
          this.filter(this.currentPage, this.currentFilter)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>