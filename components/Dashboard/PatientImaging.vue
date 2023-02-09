<template>
  <div>
    <UtilsFilterComponent disable-pagination :disableSearch="true" :disable-visualization="true"
      search-placeholder="Search">
      <template #beforeActions>
        <div>
          <button v-b-toggle.sidebar-backdrop3 class="btn btn-sm btn-outline-secondary">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M96 197.333h320v32H96zm72 101.334h176v32H168zM216 400h80v32h-80zM48 96h416v32H48z" />
              </svg>
            </span>
          </button>
          <b-sidebar id="sidebar-backdrop3" title="Sidebar with backdrop" :backdrop-variant="'dark'" backdrop shadow
            right>
            <div class="p-4">
              <div class="">
                <!-- <p class="mb-0 text-20">Date range</p> -->
                <div class="col-md-12">
                  <span class="text-12 text-grey">Search</span>
                  <input type="text" class="form-control" placeholder="Search by name" v-model="filter.name" />
                </div>
              </div>
              <div class="">
                <!-- <p class="mb-0 text-20">Date range</p> -->
                <div class="col-md-12">
                  <span class="text-12 text-grey">Date from:</span>
                  <input type="date" class="form-control" :max="maxDate" v-model="filter.dateFrom" />
                </div>
                <div class="col-md-12">
                  <span class="text-12 text-grey">Date to:</span>
                  <input type="date" class="form-control" :min="minDate" v-model="filter.dateTo" />
                </div>
              </div>

              <div class="col-md-12">
                <span class="text-12 text-grey">Service centers</span>
                <VSelect style="font-size: 13px" label="name" class="" v-model="filter.service_center"
                  :placeholder="'Service centers'" :reduce="(option) => option.id" multiple taggable
                  :options="filterSerice">
                </VSelect>
              </div>
              <div class="col-md-12">
                <span class="text-12 text-grey">Modality</span>
                <VSelect style="font-size: 13px" label="name" class="" v-model="filter.modality"
                  :placeholder="'Lab unit'" :reduce="(option) => option.id" multiple taggable :options="filterModality">
                </VSelect>
              </div>
            </div>
          </b-sidebar>
        </div>
      </template>
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="openImagingModal">New Imaging</BaseButton>
      </template>
      <template>
        <TableComponent :fields="fields" :pages="pages" :items="items" :busy="busy"
          :dropdown-item="['print', 'email', 'cancel']" @cancel="cancelImaging($event)" @page-changed="pageChange">
          <template #status="{ data }">
            <template v-if="data.item.status === 'NEW'">
              <button :disabled="data.item.bill.cleared_status !== 'CLEARED'" class="btn btn-outline-primary btn-sm">
                Capture
              </button>
            </template>
            <template v-if="data.item.status === 'CAPTURED'">
              <button :disabled="data.item.bill.cleared_status !== 'CLEARED'" class="btn btn-outline-warning btn-sm">
                Report
              </button>
            </template>

            <template v-if="data.item.status === 'AWAITING_APPROVAL'">
              <button class="btn btn-sm btn-outline-info text-nowrap">
                AWAITING APPROVAL
              </button>
            </template>
          </template>
          <template #info="{ data }">
            <button class="btn btn-primary" @click="data.toggleDetails">
              Details
            </button>
          </template>
          <template #row-details="{ data }">
            <div class="card">
              <div class="card-body">
                <!-- <h5 class="">Card title</h5> -->
                <h6 class="card-subtitle mb-2 text-muted">
                  Reported by:
                  <span class="text-black">{{
                    formatName(data.item.reported_by)
                  }}</span>
                </h6>
                <h6 class="card-subtitle mb-2 text-muted">
                  Reported on:
                  <span class="text-black">{{
                    formatDate(data.item.reported_on)
                  }}</span>
                </h6>
                <h6 class="card-subtitle mb-2 text-muted">
                  Approved on:
                  <span class="text-black">{{
                    formatName(data.item.approved_by)
                  }}</span>
                </h6>
                <h6 class="card-subtitle mb-3 text-muted">
                  Approved by:
                  <span class="text-black">{{
                    formatDate(data.item.approved_on)
                  }}</span>
                </h6>
                <h6 class="card-subtitle mb-3 text-muted">Report:</h6>
                <p class="card-text" v-html="data.item.report">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <DashboardModalAddPatientImagingOrder :data="patient" :age="age" @refresh="pageChange()" />
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { debounce } from 'lodash'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
import modalMsgBox from '~/mixins/modalMsgBox'
export default {
  mixins: [TableFunc, modalMsgBox],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      filter: {
        size: 10,
        modality: [],
        service_center: [],
        dateFrom: '',
        dateTo: '',
      },
      age: {
        year: '',
        month: '',
        day: ''
      },
      patient: {},
      options: [],
      filterModality: [],
      filterSerice: [],
      placeholder: '',
      fields: [
        {
          key: 'img_order.ordered_datetime',
          label: 'Date',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
          },
          sortable: true,
        },
        {
          key: 'img_order.img_id',
          label: 'ASN',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },
        {
          key: 'img_order.service_center.name',
          label: 'Service Center',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },

        {
          key: 'img_order.patient.uhid',
          label: 'UHID',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },
        {
          key: 'patient',
          label: 'Patient',
          sortable: true,
          formatter: (val) => {
            return val.salutation + ' ' + val.firstname + ' ' + val.lastname
          },
        },
        { key: 'img_obv.name', label: 'Observation', sortable: true },
        {
          key: 'img_order',
          label: 'Order By',
          formatter: (val, key, item) => {
            return val.ordered_by.first_name + ' ' + val.ordered_by.first_name
          },
          sortable: true,
        },
        { key: 'info', label: 'Show Detail', sortable: true },
        { key: 'dots', label: '', sortable: false },
      ],
    }
  },
  async mounted() {
    await this.pageChange(1)
    this.getServiceCenter()
    this.getModality()
  },
  computed: {
    maxDate() {
      let today = new Date()
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
    minDate() {
      let today = new Date()
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
  },
  watch: {

    'filter.modality'() {
      if (this.filter.modality !== null) {
        this.pageChange(1, this.filter)
      }
    },
    'filter.service_center'() {
      if (this.filter.service_center !== null) {
        this.pageChange(1, this.filter)
      }
    },
    // 'filter.dateFrom'() {
    //   this.getLabOrders(1, this.filter)
    // },
    'filter.dateTo'() {
      if (this.filter.dateFrom !== '') {
        this.pageChange(1, this.filter)
      }
    },
    'filter.name': {
      handler: debounce(function () {
        this.pageChange(1, this.filter)
      }, 1000),
      deep: true,
    },
  },
  methods: {
    async pageChange(page = 1, e = {
      size: 10,
      by: '',
      entry: '',
      dateFrom: '',
      dateTo: '',
    }) {

      const newFilterObject = {
        ...e,
        [e.by]: e.entry,
        page: page,
        patient_uhid: this.data.uhid,
      }
      try {
        this.busy = true
        const data = await this.$api.imaging.getObservationOrder({
          ...newFilterObject
        })
        this.items = data.results
        this.pages = data.total_pages
        this.$nuxt.refresh()
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },

    setOption(e) {
      this.placeholder = e
      if (e === 'Service center') {
        this.filter.by = 'service_center'
        this.getServiceCenter()
      }
      if (e === 'Modality') {
        this.filter.by = 'modality'
        this.getModality()
      }
    },

    openImagingModal() {
      if(this.data.date_of_birth !== null && this.data.date_of_birth !== ''){
        this.calcAge(this.data.date_of_birth)
      }
      else {
        this.age = {
          year: '',
          month: '',
          day: '',
        }
      }
      this.patient = this.data
      this.$bvModal.show('add_imaging')
    },
    async getServiceCenter() {
      try {
        const { results } = await this.$api.imaging.getServiceCenter({
          size: 1000,
        })
        this.filterSerice = results
      } catch (error) {
        console.log(error)
      }
    },
    async getModality() {
      try {
        const { results } = await this.$api.imaging.getLabUnit({
          size: 1000,
        })
        this.filterModality = results
      } catch (error) {
        console.log(error)
      }
    },

    async cancelImaging(e) {
      const result = await this.showDeleteMessageBox(
        'Do you want to cancel Imaging Order'
      )
      if (result) {
        await this.$api.imaging.patchObservationOrder(e.id, {
          status: 'CANCELED',
        })
      }
    },

    formatName(obj) {
      if (Object.values(obj).length > 0) {
        return obj.first_name + ' ' + obj.last_name
      }
    },

    formatDate(value) {
      if (value) {
        return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
      }
      return ''
    },

     calcAge(e) {
      // **********calc year***********
      let presentDate = new Date().getFullYear()

      let yearOfBirth = e.substring(0, 4)
      let monthOfBirth = parseInt(e.substring(5, 7))
      let month = new Date().getMonth()

      let diff = presentDate - yearOfBirth
      let x = parseInt(diff)
      if (x === 0) {
        this.age.year = 0
        this.age.month = 0
      } else {
        this.age.year = x
      }

      if (monthOfBirth < month) {
        this.age.year
      }
      else if (monthOfBirth > month) {
        this.age.year++
      }
      else {
        if (this.age.year === 0) {
          this.age.year
        } else {
          this.age.year--
        }
      }

      // **************calc month***********
      let tempMonth
      // tempMonth = monthOfBirth - month
      if (presentDate === yearOfBirth) {
        this.patient.age.month = 0
      } else {
        tempMonth = 12 - monthOfBirth
      }

      if (monthOfBirth <= month) {
        this.age.month = month - monthOfBirth
        // this.patient.age.month + 1;
      } else if (month + 1 === monthOfBirth) {
        this.age.month = 0
      } else {
        this.age.month = tempMonth + month
        // this.patient.age.month + 1;
      }

      // **************calc day**************
      let day = new Date().getDate()
      let dayOfBirth = e.substring(8, 10)
      // this.patient.age.day = new Date().getDate();

      if (day > dayOfBirth) {
        this.age.day = day - dayOfBirth
      } else if (day === dayOfBirth) {
        this.age.day = 0
      } else {
        this.age.day = day
      }

      // *********************************
    },
  },
}
</script>

<style lang="scss" scoped>
.width {
  width: 10rem;
  height: 38px;
}
</style>