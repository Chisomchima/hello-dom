<template>
  <div>
    <div>
      <b-modal id="Add-laborder" ref="orderModal" size="lg" title="Add Lab Order" centered hide-footer
        :no-close-on-backdrop="true" @hide="closeModal()">
        <ValidationObserver v-slot="{ validate }">
          <form class="mx-3">
            <div class="mt-4">
              <div class="w-100 d-flex flex-wrap">
                <div class="mb-2 col-lg-6 pl-0 pr-2 col-md-6 col-sm-6 w-100">
                  <small class="text-grey text-12">UHID</small>
                  <div class="d-flex align-items-center">
                    <input v-model="patientData.uhid" type="text" placeholder="UHID" class="
                          form-control
                          control
                          ng-untouched ng-pristine ng-valid
                        " />

                    <div v-if="searchingPatient" class="mx-2">
                      <b-spinner label="loading" variant="primary" type="grow" style="width: 1.5rem; height: 1.5rem"
                        class="text-center">
                      </b-spinner>
                    </div>
                  </div>
                </div>
                <div class="mb-2 col-lg-6 px-0 col-md-6 col-sm-6">
                  <small class="text-grey text-12">Patient Details</small>
                  <input v-model="patientFullName" type="text" disabled placeholder="Patient Details"
                    class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="mb-2 col-lg-6 pl-0 pr-2 col-md-6 col-sm-6">
                  <small class="text-grey text-12">D.o.B</small>

                  <input v-model="patientData.date_of_birth" type="text" disabled placeholder="D.O.B"
                    class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="mb-2 col-lg-6 col-md-6 col-sm-6">
                  <small class="text-grey text-12">Age (Y-M-D)</small>
                  <div class="d-flex">
                    <div v-if="fill" class="px-1">
                      <input v-model="age.year" type="text" disabled placeholder="Year"
                        class="form-control ng-untouched ng-pristine ng-valid" />
                    </div>
                    <div v-if="!fill" class="px-1">
                      <ValidationProviderWrapper name="" :rules="['required']">
                        <input v-model="formDate.year" type="number" placeholder="Year"
                          class="form-control ng-untouched ng-pristine ng-valid" />
                      </ValidationProviderWrapper>
                    </div>
                    <div v-if="fill" class="px-1">
                      <input v-model="age.month" type="text" disabled placeholder="Month"
                        class="form-control ng-untouched ng-pristine ng-valid" />
                    </div>
                    <div v-if="!fill" class="px-1">
                      <input v-model="formDate.month" type="number" placeholder="Month"
                        class="form-control ng-untouched ng-pristine ng-valid" />
                    </div>
                    <div v-if="fill" class="px-1">
                      <input v-model="age.day" type="text" disabled placeholder="Day"
                        class="form-control ng-untouched ng-pristine ng-valid" />
                    </div>
                    <div v-if="!fill" class="px-1">
                      <input v-model="formDate.day" type="number" placeholder="Day"
                        class="form-control ng-untouched ng-pristine ng-valid" />
                    </div>
                  </div>
                </div>

                <div class="mb-2 col-lg-6 pr-2 pl-0 col-md-6 col-sm-6">
                  <small class="text-grey text-12">Email</small>
                  <validation-provider v-slot="{ errors }" :rules="'email'">
                    <input v-model="provisionalEmail" type="text" placeholder="Recipient Email"
                      class="form-control ng-untouched ng-pristine ng-valid" />
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>

                <div class="mb-2 col-lg-6 px-0 col-md-6 col-sm-6">
                  <small class="text-grey text-12">Gender</small>
                  <input v-model="patientData.gender" type="text" disabled placeholder="Phone No."
                    class="form-control ng-untouched ng-pristine ng-valid" />
                </div>

                <div class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12">
                  <small class="text-grey text-12">Sevice Center</small>
                  <validation-provider v-slot="{ errors }" rules="required">
                    <v-select v-model="labOrderData.service_center" class="style-chooser text-grey text-14"
                      placeholder="Service centers" :options="serviceCenters" label="name"></v-select>
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>

                <div class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12">
                  <small class="text-grey text-12">Lab Panels</small>
                  <validation-provider v-slot="{ errors }" rules="required">
                    <v-select v-model="labOrderData.lab_panels" class="style-chooser text-grey text-14" placeholder="Lab Panels"
                      :options="labPanels" :reduce="(name) => name.id" taggable multiple label="name">
                    </v-select>
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>

                <div class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12 text-14">
                  <span class="text-grey"> stat</span>
                  <input v-model="labOrderData.stat" type="checkbox" placeholder="Phone No."
                    class="ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12">
                  <small class="text-grey text-12">Comment </small>
                  <textarea v-model="labOrderData.comments" cols="50" rows="5" placeholder="Type a comment..." class="
                        p-3
                        text-grey
                        form-control
                        ng-untouched ng-pristine ng-valid
                      "></textarea>
                </div>
              </div>
            </div>

            <div class="my-3 d-flex justify-content-center">
              <button class="btn btn-light text-grey mr-5 text-14" style="height: 38px; width: 5rem; text-align: center"
                @click.prevent="closeModal">
                Cancel
              </button>

              <BaseButton class="btn-primary" @click.prevent="createLabOrder">Order
              </BaseButton>
            </div>
            <div id="runValidation" ref="runValidation" type="button" @click="validate"></div>
          </form>
        </ValidationObserver>
      </b-modal>
    </div>
    <UtilsFilterComponent disable-pagination :disable-search="true" :disable-visualization="true"
      search-placeholder="Search">
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="newLabOrders">New Lab Order</BaseButton>
      </template>

      <template #beforeActions>
        <div>
          <button v-b-toggle.sidebar-backdrop class="btn btn-sm btn-outline-secondary">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M96 197.333h320v32H96zm72 101.334h176v32H168zM216 400h80v32h-80zM48 96h416v32H48z" />
              </svg>
            </span>
          </button>
          <b-sidebar id="sidebar-backdrop" title="Sidebar with backdrop" :backdrop-variant="'dark'" backdrop shadow right>
            <div class="p-4">
              <div class="">
                <!-- <p class="mb-0 text-20">Date range</p> -->
                <div class="col-md-12">
                  <span class="text-12 text-grey">Search</span>
                  <input v-model="filter.name" type="text" class="form-control" placeholder="Search by name" />
                </div>
              </div>
              <div class="">
                <!-- <p class="mb-0 text-20">Date range</p> -->
                <div class="col-md-12">
                  <span class="text-12 text-grey">Date from:</span>
                  <input v-model="filter.dateFrom" type="date" class="form-control" :max="maxDate" />
                </div>
                <div class="col-md-12">
                  <span class="text-12 text-grey">Date to:</span>
                  <input v-model="filter.dateTo" type="date" class="form-control" :min="minDate" />
                </div>
              </div>

              <div class="col-md-12">
                <span class="text-12 text-grey">Service centers</span>
                <VSelect v-model="filter.service_center" style="font-size: 13px" label="name" class="width"
                  :placeholder="'Service centers'" :reduce="(option) => option.id" multiple taggable
                  :options="filterSerice">
                </VSelect>
              </div>
              <div class="col-md-12">
                <span class="text-12 text-grey">Lab unit</span>
                <VSelect v-model="filter.lab_unit" style="font-size: 13px" label="name" class="width"
                  :placeholder="'Lab unit'" :reduce="(option) => option.id" multiple taggable :options="filterLabUnit">
                </VSelect>
              </div>
            </div>
          </b-sidebar>
        </div>
      </template>
      <b-overlay variant="light" spinner-variant="primary" spinner-type="grow" :show="downloading" rounded="sm">
        <table-component :paginate="true" :busy="busy" :pages="pages" :items="itemsToShow" :current-page="currentPage"
          :fields="fields" @page-changed="getLabOrders($event)">
          <!-- <template #actions="{ data }">
                <pre>{{ data }}</pre>
                <button
                  class="btn btn-info"
                  size="sm"
                  @click="data.toggleDetails"
                >
                  Details
                </button>
              </template> -->
          <template #download="{ data }">
            <!-- <pre class="d-none">{{ data }}</pre> -->
            <!-- <span
                @click="save_file(data.item)"
                class="text-center text-capitalize text-12 text-info pointer"
              >
                <span v-if="false">
                  <b-spinner
                    label="loading"
                    variant="primary"
                    type="grow"
                    style="width: 1.5rem; height: 1.5rem"
                    class="text-center"
                  >
                  </b-spinner>
                </span>
                <span v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="24"
                    height="24"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M5 4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V5h.5A2.5 2.5 0 0 1 18 7.5v5a1.5 1.5 0 0 1-1.5 1.5H15v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 15.5V14H3.5A1.5 1.5 0 0 1 2 12.5v-5A2.5 2.5 0 0 1 4.5 5H5v-.5Zm9 0a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V5h8v-.5Zm-8 7v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5Z"
                    />
                  </svg>
                </span>
              </span> -->

            <div class="d-flex">
              <span style="width: 1rem" class="text-center text-12 text-info pointer mx-3">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20"
                  height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" @click="save_file(data.item)">
                  <path fill="currentColor"
                    d="M5 4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V5h.5A2.5 2.5 0 0 1 18 7.5v5a1.5 1.5 0 0 1-1.5 1.5H15v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 15.5V14H3.5A1.5 1.5 0 0 1 2 12.5v-5A2.5 2.5 0 0 1 4.5 5H5v-.5Zm9 0a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V5h8v-.5Zm-8 7v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5Z" />
                </svg>
              </span>

              <span style="width: 1rem" class="text-success text-center mx-3" @click="mailReport(data.item)">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20"
                  preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
                  <path fill="currentColor"
                    d="M33.68 15.26H32v11.45l-7.36-7.36l-1.41 1.41L30.46 28H5.66l7-7.24l-1.44-1.39L4 26.84V9.52l12.43 12.37a2 2 0 0 0 2.82 0l6.66-6.63h-2.83l-5.24 5.21L5.31 8h14.75l1.15-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V15.24Z"
                    class="clr-i-outline--alerted clr-i-outline-path-1--alerted" />
                  <path fill="currentColor"
                    d="m26.85 1l-5.72 9.91a1.28 1.28 0 0 0 1.1 1.91h11.45a1.28 1.28 0 0 0 1.1-1.91L29.06 1a1.28 1.28 0 0 0-2.21 0Z"
                    class="
                        clr-i-outline--alerted
                        clr-i-outline-path-2--alerted
                        clr-i-alert
                      " />
                  <path fill="none" d="M0 0h36v36H0z" />
                </svg>
              </span>
            </div>
          </template>
          <template #row-details="{ data }">
            <b-card v-if="data.item.lab_panel_orders.length > 0">
              <div v-for="(panel, index) in data.item.lab_panel_orders" :key="index">
                <!-- <pre>{{panel.panel}}</pre> -->
                <Accordion>
                  <AccordionTab>
                    <template #header>
                      <div class="w-100 d-flex justify-content-between">
                        <div class="col-md-4">
                          {{ panel.panel.name }}
                        </div>
                        <div class="d-flex align-items-center  col-md-4">


                          <div style="
                                width: 1rem;
                                height: 1rem;
                                border-radius: 50%;
                                background: green;
                                border: 1px solid #727d71;
                              " :style="`background: ${panel.panel.specimen_type.color}`" class="first pointer mr-2">
                          </div>
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

                    <div class="
                          mb-0
                          text-capitalize
                          d-flex
                          align-items-center
                          text-14
                        ">
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
                      <TableComponent :paginate="false" :fields="nestedFields" :items="panel.panel.obv">
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
            </b-card>
          </template>
        </table-component>
      </b-overlay>
    </UtilsFilterComponent>
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
        day: ''
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
      if (this.patientData.date_of_birth !== null && this.patientData.date_of_birth !== '') {
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
        ; (this.labOrderData = {
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
      }
      else {
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
        const response = await this.$api.medicalReport.getLabOrder(this.data.lab_order
        ,{
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