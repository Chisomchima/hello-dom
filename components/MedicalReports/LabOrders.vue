<template>
  <div class="p-3">
    <div v-for="(panel, index) in itemsToShow" :key="index">
      <!-- <pre>{{panel.panel}}</pre> -->
      <Accordion class="m-2">
        <AccordionTab>
          <template #header>
            <div class="w-100 d-flex justify-content-between">
              <div class="col-md-4">
                {{ panel.panel.name }}
              </div>
              <div class="d-flex align-items-center col-md-4">
                <div
                  style="
                    width: 1rem;
                    height: 1rem;
                    border-radius: 50%;
                    background: green;
                    border: 1px solid #727d71;
                  "
                  :style="`background: ${panel.panel.specimen_type.color}`"
                  class="first pointer mr-2"
                ></div>
                {{ panel.panel.specimen_type.name }}
              </div>
              <div class="col-md-4 text-capitalize">
                status:
                {{
                  panel.status === 'NEW'
                    ? 'Open'
                    : panel.status === 'fill result'
                    ? 'Reported'
                    : panel.status
                }}
              </div>
            </div>
          </template>
          <!-- <p class="my-2 text-capitalize text-14 text-info">
                        Status:
                        {{
                          panel.status === 'NEW'
                            ? 'Open'
                            : panel.status === 'fill result'
                            ? 'Reported'
                            : panel.status
                        }}
                      </p> -->

          <div class="mb-0 text-capitalize d-flex align-items-center text-14">
            <!-- <div class="text-14 text-info">
                          Specimen-type: {{ panel.panel.specimen_type.name }}
                        </div>

                        <div
                          style="
                            width: 1rem;
                            height: 1rem;
                            border-radius: 50%;
                            background: green;
                            border: 1px solid #727d71;
                          "
                          :style="`background: ${panel.panel.specimen_type.color}`"
                          class="first pointer ml-2"
                        ></div> -->
          </div>

          <div class="table_container table-responsive mt-2 pt-2">
            <TableComponent
              :paginate="false"
              :fields="nestedFields"
              :items="panel.panel.obv"
            >
              <template #reference_range="{ data: { item } }">
                <div v-for="(seen, index) in item.reference_range" :key="index">
                  <span>
                    {{ seen.name }}
                  </span>
                </div>
              </template>
              <template #value="{ data: { item } }">
                <div>
                  {{ item.value ? item.value : 'No Value recorded' }}
                </div>
              </template>
            </TableComponent>
          </div>
          <p class="my-2 text-capitalize text-14 text-info">
            Comments: {{ panel.panel.comments }}
          </p>
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>

<script>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import { DateTime } from 'luxon'
import { debounce } from 'lodash'
export default {
  components: { Accordion, AccordionTab },
  props: {
    patientData: {
      type: String,
      default: {},
    },
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      text: '',
      assertion: '',
      manageInput: '',
      labOrderPanel: {
        panel: {},
        status: '',
        lab_order: '',
      },
      filter: {
        name: '',
        size: 10,
        service_center: [],
        lab_unit: [],
        dateFrom: '',
        dateTo: '',
      },
      formDate: {
        year: '',
        month: '',
        day: '',
      },
      options: [],
      placeholder: '',
      pages: 1,
      modalTitle: 'Order lab panel',
      commitPanel: {
        comments: '',
        obv: [],
      },
      orderPanels: {
        status: '',
        lab_order: '',
        panels: [],
      },
      provisionalEmail: '',
      cancelStatus: 'cancelled',
      showOptions: false,
      isbusy: false,
      isbusy2: false,
      busy: false,
      searchingPatient: false,
      clue: false,
      clue2: false,
      // page: 1,
      perpage: 12,
      enabled: false,
      searchParam: {
        status: 'NEW',
      },
      genders: [],
      clinics: [],
      providers: [],
      serviceCenters: [],
      labUnits: [],
      labPanels: [],
      mutatedPanels: [],
      downloading: false,
      currentPage: 1,
      itemsToShow: [],
      labOrderData: {
        patient: {},
        stat: false,
        service_center: null,
        lab_panels: [],
        comments: '',
      },
      age: {
        year: '',
        month: '',
        day: '',
      },
      patientDetails: 'Type UHID to search...',
      nestedFields: [
        { key: 'name', label: 'Observations', sortable: true },
        { key: 'uom', label: 'Unit', sortable: true },
        { key: 'value', label: 'Value', sortable: true },

        { key: 'reference_range', label: 'Reference Range', sortable: true },
      ],
      fields: [
        { key: 'panel.bill_item_code', label: 'Bill Code', sortable: true },
        { key: 'panel.name', label: 'Name', sortable: true },
        { key: 'asn', label: 'ASN No.', sortable: true },
        {
          key: 'panel.specimen_type.name',
          label: 'Specimen type',
          sortable: true,
        },
        { key: 'status', label: 'Status', sortable: true },
        // {
        //   key: 'ordered_by',
        //   label: 'Ordered By',
        //   sortable: true,
        // //   formatter: (val) => {
        // //     if (val.first_name || val.last_name) {
        // //       return val.first_name + ' ' + val.last_name
        // //     } else {
        // //       return ''
        // //     }
        // //   },
        // },
        // { key: 'panel', label: 'Specimen Type', sortable: true },
        // { key: 'details', label: 'Info', sortable: false },
        // { key: 'download', label: '', sortable: false },
      ],
      test: '',
    }
  },
  computed: {
    rows() {
      return this.itemsToShow.length
    },
    fill() {
      return !!this.age.year
    },
    maxDate() {
      let today = new Date()
      today = today.toISOString()
      const x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
    minDate() {
      let today = new Date()
      today = today.toISOString()
      const x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
  },
  mounted() {
    this.getLabOrders()
    this.serviceCenterOptions()
    this.labUnitOptions()
    // this.getPatientRecord();
  },
  watch: {
    'filter.lab_unit'() {
      if (this.filter.lab_unit !== null) {
        this.getLabOrders(1, this.filter)
      }
    },
    'filter.service_center'() {
      if (this.filter.service_center !== null) {
        this.getLabOrders(1, this.filter)
      }
    },
    // 'filter.dateFrom'() {
    //   this.getLabOrders(1, this.filter)
    // },
    'filter.dateTo'() {
      if (this.filter.dateFrom !== '') {
        this.getLabOrders(1, this.filter)
      }
    },
    'filter.name': {
      handler: debounce(function () {
        this.getLabOrders(1, this.filter)
      }, 1000),
      deep: true,
    },
    test() {
      const conv = 'hdjj'
      conv.toUpperCase()
    },
    'labOrderData.lab_panels': {
      handler() {
        console.log(this.labOrderData.lab_panels)
        this.mutatedPanels = []
        for (const iterator of this.labOrderData.lab_panels) {
          this.labPanels.filter((el) => {
            if (el.id === iterator) {
              this.mutatedPanels.push(el)
            }
          })
        }
      },
    },
  },
  methods: {
    enableButton() {
      this.enabled = !this.enabled
    },

    setOption(e) {
      this.placeholder = e
      if (e === 'Service center') {
        this.filter.by = 'service_center'
        this.serviceCenterOptions()
      }
      if (e === 'Lab unit') {
        this.filter.by = 'lab_unit'
        this.labUnitOptions()
      }
    },

    async serviceCenterOptions() {
      try {
        const { results } = await this.$api.core.serviceCenter({
          size: 1000,
        })
        this.filterSerice = results
      } catch (error) {
        console.log(error)
      }
    },
    async labUnitOptions() {
      try {
        const { results } = await this.$api.core.labUnits({
          size: 1000,
        })
        this.filterLabUnit = results
      } catch (error) {
        console.log(error)
      }
    },

    async mailReport(e) {
      try {
        this.downloading = true
        const response = await this.$axios.$get(
          `laboratory/lab_order/${e.id}/reports/mail/`
        )
        console.log(response)

        this.$toast({
          type: 'success',
          text: 'Mail sent',
        })
        this.downloading = false
      } catch {
        //   this.$toast({
        //     type: 'error',
        //     text: 'Mail not sent, please ensure that a mail address was provided',
        //   })
      } finally {
        this.downloading = false
      }
    },
    async save_file(e) {
      this.downloading = true
      const response = await fetch(
        `${process.env.BASE_URL}laboratory/lab_order/${e.id}/reports/download/`,
        {
          headers: {
            Authorization: `Token ${this.$store.state.auth.token}`,
          },
        }
      )
      console.log(response)
      if (response.status === 200) {
        const data = await response.blob()

        const objectURL = URL.createObjectURL(data)
        const link = document.createElement('a')
        link.download = `Lab Report_${e.asn})`
        link.href = objectURL
        this.downloading = false
        link.click()
      } else if (response.status === 403) {
        this.downloading = false
        this.$toast({
          type: 'info',
          text: `You don't have the permission to perform this action`,
        })
      } else {
        this.downloading = false
        this.$toast({
          type: 'error',
          text: `An error occured`,
        })
      }
    },

    resetModal() {
      this.test = ''
      this.patientDetails = ''
      this.age.year = ''
      this.age.month = ''
      this.age.day = ''
      this.labOrderData = {
        patient: {},
        stat: false,
        service_center: null,
        lab_panels: [],
        comments: '',
      }
    },

    newLabOrders() {
      this.$bvModal.show('Add-laborder')
      this.getServiceCenter()
      this.getLabPanels()
      this.patientFullName =
        this.patientData.firstname + ' ' + this.patientData.lastname
      if (
        this.patientData.date_of_birth !== null &&
        this.patientData.date_of_birth !== ''
      ) {
        this.calcAge(this.patientData.date_of_birth)
      }
      if (this.patientData.email) {
        this.provisionalEmail = this.patientData.email
      }
    },

    closeModal() {
      this.$bvModal.hide('Add-laborder')

      this.patientDetails = ''
      this.test = ''
      ;(this.labOrderData = {
        patient: {},
        stat: true,
        service_center: null,
        lab_panels: [],
        comments: '',
      }),
        (this.age.year = ''),
        (this.age.month = ''),
        (this.age.day = '')
    },

    async createLabOrder() {
      if (this.$refs.runValidation) {
        this.$refs.runValidation.click()
      }
      const obj = this.patientData
      if (!this.age.year) {
        obj.age = this.formDate
      } else {
        obj.age = this.age
      }
      this.patientData.email = this.provisionalEmail
      this.patientData = obj
      this.labOrderData.patient = this.patientData

      if (this.labOrderData.lab_panels && this.labOrderData.service_center) {
        try {
          this.isbusy = true
          const response = await this.$axios.$post(
            'laboratory/lab_order/',
            this.labOrderData
          )
          this.$toast({
            type: 'success',
            text: 'Lab order created',
          })
          this.getLabOrders()
          this.$nuxt.refresh()
          this.closeModal()
        } catch {
          this.$toast({
            type: 'error',
            text: 'Unable to create lab order',
          })
        } finally {
          // this.getEncounters();
          this.isbusy = false
        }
      }
    },

    async getLabOrders(
      page = 1,
      e = {
        size: 10,
        by: '',
        entry: '',
        dateFrom: '',
        dateTo: '',
      }
    ) {
      const newFilterObject = {
        ...e,
        page,
        patient_uhid: this.patientData.uhid,
      }
      try {
        if (this.currentPage != 1) {
          page = this.currentPage
        }
        this.busy = true

        // const response = await this.$api.laboratory.getLabOrder({
        //   ...newFilterObject,
        // })
        const response = await this.$api.medicalReport.getLabOrder(
          this.data.lab_order,
          {
            ...newFilterObject,
          }
        )
        this.pages = response.total_pages
        this.totalPages = response.total_pages
        this.currentPage = response.current_page
        this.itemsToShow = response.results

        // for (const iterator of response.results) {
        //   const name =
        //     iterator.patient.firstname + ' ' + iterator.patient.lastname
        //   const no_ = iterator.patient.phone_number
        //   const uhid = iterator.patient.uhid
        //   const time = iterator.ordered_datetime
        //   const y = new Date(time).toLocaleDateString()
        //   const z = new Date(time).toTimeString().substring(0, 5)
        //   const b = y + ', ' + z

        //   let labunit

        //   this.itemsToShow.push({
        //     patient_name: name,
        //     phone_number: no_,
        //     uhid,
        //     asn: iterator.asn,
        //     stat: iterator.stat,
        //     lab_panel_orders: iterator.lab_panel_orders,
        //     patient: iterator.patient,
        //     service_center: iterator.service_center,
        //     ordered_datetime: iterator.ordered_datetime,
        //     ordered_by: iterator.ordered_by,
        //     comments: iterator.comments,
        //     id: iterator.id,
        //   })
        // }
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    clearSearchParams() {
      this.searchParam.status = null
    },

    async getServiceCenter() {
      if (this.serviceCenters.length < 1) {
        try {
          this.clue = true
          const uri = `laboratory/service_center/?size=100`

          const response = await this.$axios.$get(uri)
          this.serviceCenters = response.results
          this.clue = false
        } catch (error) {
          console.log(error)
        } finally {
        }
      }
    },
    async getLabUnit() {
      if (this.labUnits.length < 1) {
        try {
          this.clue2 = true

          const uri = `laboratory/lab_unit/?size=100`

          const response = await this.$axios.$get(uri)

          this.labUnits = response.results
          this.clue2 = false
        } catch (error) {
          console.log(error)
        } finally {
          this.busy = false
        }
      }
    },

    async getLabPanels() {
      try {
        const uri = `/laboratory/lab_panel/?size=2000`

        const response = await this.$axios.$get(uri)

        this.labPanels = []
        const temp = []
        for (const iterator of response.results) {
          const time = iterator.created_at
          const y = new Date(time).toLocaleDateString()
          const z = new Date(time).toTimeString().substring(0, 5)
          const b = y + ', ' + z
          this.labPanels.push({
            name: iterator.name,
            // obv: iterator.obv,
            // created_at: b,
            // specimen_type: iterator.specimen_type,
            // lab_unit: iterator.lab_unit,
            // active: true,
            id: iterator.id,
          })
        }

        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
      }
    },

    calcAge(e) {
      // **********calc year***********
      if (e.date_of_birth !== null || e.date_of_birth !== '') {
        const presentDate = new Date().getFullYear()
        const yearOfBirth = e.substring(0, 4)
        const month = new Date().getMonth()
        const monthOfBirth = parseInt(e.substring(5, 7))

        const diff = presentDate - yearOfBirth
        const x = parseInt(diff)
        if (x === 0) {
          this.age.year = 0
          this.age.month = 0
        } else {
          this.age.year = x
        }

        if (monthOfBirth < month) {
          this.age.year
        } else if (this.age.year === 0) {
          this.age.year
        } else {
          this.age.year--
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
        const day = new Date().getDate()
        const dayOfBirth = e.substring(8, 10)
        // this.patient.age.day = new Date().getDate();

        if (day > dayOfBirth) {
          this.age.day = day - dayOfBirth
        } else if (day === dayOfBirth) {
          this.age.day = 0
        } else {
          this.age.day = day
        }
      }

      // *********************************
    },
  },
}
</script>

<style scoped>
.border_grey {
  border: 1px solid #414850;
  cursor: pointer;
  border-radius: 3px;
}

/* .width {
  width: 10rem;
  height: 38px;
} */

.border_grey:hover {
  background: #414850;
  color: #fff;
}

.control {
  text-transform: uppercase;
}
</style>
