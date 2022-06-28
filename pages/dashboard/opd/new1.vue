<template>
  <div>
    <div class="modal">
      <b-modal
        id="Add-encounter"
        title="Add Encounter"
        centered
        hide-footer
        ref="encounterModal"
        @hide="closeModal()"
      >
        <ValidationObserver v-slot="{ validate }">
          <form class="mx-3">
            <div class="mt-4">
              <div class="w-100 d-flex flex-wrap">
                <div class="mb-2 col-lg-6 pl-0 pr-2 col-md-6 col-sm-6 w-100">
                  <small class="text-grey text-12">UHID</small>
                  <div class="d-flex align-items-center">
                    <input
                      type="text"
                      placeholder="UHID"
                      class="
                        form-control
                        control
                        ng-untouched ng-pristine ng-valid
                      "
                      v-model="test"
                      v-debounce:1300ms.cancelonempty="searchPatient"
                    />
                    <div class="mx-2" v-if="searchingPatient">
                      <b-spinner
                        label="loading"
                        variant="primary"
                        type="grow"
                        style="width: 1.5rem; height: 1.5rem"
                        class="text-center"
                      >
                      </b-spinner>
                    </div>
                  </div>
                </div>
                <div class="mb-2 col-lg-6 px-0 col-md-6 col-sm-6">
                  <small class="text-grey text-12">Patient Details</small>

                  <input
                    type="text"
                    disabled
                    placeholder="Patient Details"
                    v-model="patientDetails"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div class="mb-2 col-lg-6 pl-0 pr-2 col-md-6 col-sm-6">
                  <small class="text-grey text-12">D.o.B</small>

                  <input
                    type="text"
                    disabled
                    placeholder="D.O.B"
                    v-model="patientData.date_of_birth"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div class="mb-2 col-lg-6 px-0 pl-0 col-md-6 col-sm-6">
                  <small class="text-grey text-12">Age (Y-M-D)</small>
                  <div class="d-flex">
                    <div class="px-1">
                      <input
                        type="text"
                        disabled
                        placeholder="Year"
                        v-model="age.year"
                        class="form-control ng-untouched ng-pristine ng-valid"
                      />
                    </div>
                    <div class="px-1">
                      <input
                        type="text"
                        disabled
                        placeholder="Month"
                        v-model="age.month"
                        class="form-control ng-untouched ng-pristine ng-valid"
                      />
                    </div>
                    <div class="px-1">
                      <input
                        type="text"
                        disabled
                        placeholder="Day"
                        v-model="age.day"
                        class="form-control ng-untouched ng-pristine ng-valid"
                      />
                    </div>
                  </div>
                </div>

                <div class="mb-2 col-lg-6 pr-2 pl-0 col-md-6 col-sm-6">
                  <small class="text-grey text-12">Phone No.</small>

                  <input
                    type="text"
                    disabled
                    v-model="patientData.phone_number"
                    placeholder="Phone No."
                    class="form-control"
                  />
                </div>

                <div class="mb-2 col-lg-6 px-0 col-md-6 col-sm-6">
                  <label class="form-control-label">Gender</label>
                  <input
                    type="text"
                    disabled
                    v-model="patientData.gender"
                    placeholder="Gender"
                    class="form-control"
                  />
                </div>

                <div class="mb-2 col-lg-6 pl-0 pr-2 col-md-6 col-sm-6">
                  <label class="form-control-label">Clinic *</label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <VSelect
                      label="name"
                      v-model="encounterData.clinic"
                      class="text-14"
                      :options="clinics"
                    >
                    </VSelect>
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>

                <div class="mb-2 col-lg-6 px-0 col-md-6 col-sm-6">
                  <small class="text-grey text-12">Encounter Type *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <VSelect
                      class="text-14"
                      label="name"
                      v-model="encounterData.encounter_type"
                      :options="['Walk in']"
                    >
                    </VSelect>
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>

                <div class="mb-2 col-lg-6 pl-0 pr-2 col-md-6 col-sm-6">
                  <label class="form-control-label">Provider</label>
                  <VSelect
                    class="text-14"
                    v-model="encounterData.provider"
                    label="providers"
                    :options="providers"
                  >
                    <template #option="{ first_name, last_name }">
                      <div>
                        {{ first_name + ' ' + last_name }}
                      </div>
                    </template>
                    <template #selected-option="{ first_name, last_name }">
                      <div>
                        {{ first_name + ' ' + last_name }}
                      </div>
                    </template>
                  </VSelect>
                </div>
              </div>
            </div>

            <div class="my-3 d-flex justify-content-center">
              <button
                @click.prevent="closeModal"
                class="btn btn-light text-grey mr-5 text-14"
                style="height: 38px; width: 5rem; text-align: center"
              >
                Cancel
              </button>

              <BaseButton
                watchRequest
                @click.prevent="startEncounter"
                class="btn-primary"
                >Create Encounter
              </BaseButton>
            </div>
            <div
              type="button"
              ref="runValidation"
              id="runValidation"
              @click="validate"
            ></div>
          </form>
        </ValidationObserver>
      </b-modal>
    </div>

    <div class="col-12 mb-3">
      <div class="d-flex justify-content-between">
        <h5>Encounter worklist</h5>
        <div>
          <BaseButton @click="newEncounter" class="btn-outline-primary"
            >New Encounter</BaseButton
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-3">
          <div class="card-body">
            <div class="filter-wrapper row">
              <div class="mb-2 col-md-4">
                <label class="form-control-label">Status </label>
                <VSelect
                  label="Gender"
                  v-model="filter.status"
                  @close="getEncounters((page = 1))"
                  :reduce="(option) => option.name"
                  :options="[
                    { label: 'New', name: 'New' },
                    { label: 'Nurse Seen', name: 'NS' },
                    { label: 'Doctor Seen', name: 'DS' },
                  ]"
                >
                  <template #option="{ label }">
                    <span
                      class="
                        text-14
                        badge-warning
                        rounded
                        text-center
                        p-1
                        text-white
                      "
                      v-if="label === 'New'"
                      style="margin: 0"
                      >{{ label }} ({{ newCount }})</span
                    >
                    <span
                      class="
                        text-14
                        badge-info
                        rounded
                        text-center
                        p-1
                        text-white
                      "
                      v-else-if="label === 'Nurse Seen'"
                    >
                      {{ label }} ({{ nurseSeen }})
                    </span>
                    <span
                      class="
                        text-14
                        badge-danger
                        rounded
                        text-center
                        p-1
                        text-white
                      "
                      v-else-if="label === 'Doctor Seen'"
                    >
                      {{ label }}
                    </span>
                  </template>
                  <template #selected-option="{ label }">
                    <span
                      class="
                        text-14
                        badge-warning
                        rounded
                        text-center
                        px-1
                        text-white
                      "
                      v-if="label === 'New'"
                      style="margin: 0"
                      >{{ label }}</span
                    >
                    <span
                      class="
                        text-14
                        badge-info
                        rounded
                        text-center
                        px-1
                        text-white
                      "
                      v-else-if="label === 'Nurse Seen'"
                    >
                      {{ label }}
                    </span>
                    <span
                      class="
                        text-14
                        badge-danger
                        rounded
                        text-center
                        px-1
                        text-white
                      "
                      v-else-if="label === 'Doctor Seen'"
                    >
                      {{ label }}
                    </span>
                  </template>
                </VSelect>
              </div>
              <div class="mb-2 col-md-4">
                <label class="form-control-label">UHID/NAME</label>
                <div class="w-100 d-flex">
                  <div class="w-50">
                    <VSelect
                      v-model="filter.by"
                      style="font-size: 15px"
                      label="label"
                      placeholder="By"
                      :reduce="(option) => option.name"
                      :options="[
                        { name: 'patient_name', label: 'Name' },
                        { name: 'patient_uhid', label: 'UHID' },
                      ]"
                    >
                    </VSelect>
                  </div>

                  <input
                    v-model="filter.entry"
                    type="text"
                    placeholder="context"
                    v-debounce:1300ms.cancelonempty="rareCase"
                    class="w-50 form-control"
                  />
                </div>
              </div>

              <div class="mb-2 col-md-4">
                <label class="form-control-label">Department</label>
                <VSelect
                  @close="getEncounters((page = 1))"
                  v-model="filter.department"
                  :reduce="(option) => option.id"
                  label="name"
                  :options="departments"
                >
                  <template #selected-option="{ name }">
                    <div>
                      {{ name }}
                    </div>
                  </template>
                </VSelect>
              </div>
              <div class="mb-2 col-md-4">
                <label class="form-control-label">Clinic</label>
                <VSelect
                  @close="getEncounters((page = 1))"
                  :reduce="(option) => option.id"
                  multiple
                  taggable
                  v-model="filter.clinic"
                  :options="clinics"
                  label="name"
                ></VSelect>
              </div>
              <div class="mb-2 col-md-4">
                <label class="form-control-label">Encounter ID</label>
                <input
                  v-model="filter.encounter_id"
                  type="text"
                  placeholder="Encounter ID"
                  v-debounce:1300ms.cancelonempty="rareCase"
                  class="form-control"
                />
              </div>

              <div class="mb-3 col-md-4">
                <label class="form-control-label">Provider</label>
                <VSelect
                  v-model="filter.provider"
                  :reduce="(option) => option.id"
                  @close="getEncounters((page = 1))"
                  label="providers"
                  :options="providers"
                >
                  <template #option="{ first_name, last_name }">
                    <div>
                      {{ first_name + ' ' + last_name }}
                    </div>
                  </template>
                  <template #selected-option="{ first_name, last_name }">
                    <div>
                      {{ first_name + ' ' + last_name }}
                    </div>
                  </template>
                </VSelect>
              </div>
              <div class="col-md-12">
                <div class="mb-2 row justify-content-end">
                  <!-- <div class="col-md-2">
                                        <BaseButton @click="getEncounters(page = 1)" class="w-100"> Filter
                                        </BaseButton>
                                    </div> -->
                  <div class="col-md-4 col-lg-4 col-sm-4">
                    <BaseButton @click="clearEntry" class="w-100 btn-danger">
                      Clear
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <UtilsFilterComponent
          disablePagination
          :disable-visualization="true"
          search-placeholder="Search"
        >
          <TableComponent
            :paginate="true"
            :busy="busy"
            :items="itemsToShow"
            :pages="pages"
            :perPage="perPage"
            :fields="fields"
            @page-changed="getEncounters($event)"
            @row-clicked="viewPatientData"
          >
            <template #action="{ data: { item } }">
              <b-dropdown
                variant="link"
                toggle-class="text-decoration-none text-center"
                no-caret
              >
                <div class="d-none">
                  {{ item }}
                </div>
                <template class="p-0 mx-auto text-center" #button-content>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      style="color: #000"
                      class="bi bi-three-dots-vertical"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                      />
                    </svg>
                  </div>
                </template>
                <template v-if="dropdownItem.length > 0">
                  <b-dropdown-item
                    v-for="(dropdown, index) in dropdownItem"
                    right
                    :key="index"
                    class="text-capitalize text-14"
                    @click="optionClicked(item, index)"
                    >{{ dropdown.split('_').join(' ') }}
                  </b-dropdown-item>
                </template>
              </b-dropdown>
            </template>
            <template #status="{ data }">
              <div class="text-center">
                <!-- {{ data.item.color }} -->
                <span
                  :class="data.item.color"
                  class="badge text-white px-2 py-1"
                  >{{ data.item.status }}</span
                >
              </div>
            </template>
          </TableComponent>
        </UtilsFilterComponent>
      </div>
    </div>
  </div>
</template>

<script>
// import calcAge from '~/mixins/calcAge'
export default {
  // mixins: [calcAge],
  data() {
    return {
      providers: [],
      departments: [],
      genders: [],
      busy: false,
      dropdownItem: ['Nurse Vitals'],
      clinics: [],
      searchingPatient: false,
      pages: 1,
      page: 1,
      perPage: 12,
      age: {
        year: '',
        month: '',
        day: '',
      },
      itemsToShow: [],
      test: '',
      patientDetails: '',
      fields: [
        { key: 'encounter_id', label: 'Encounter ID', sortable: true },

        { key: 'date', label: 'Date', sortable: true },
        { key: 'department', label: 'Department', sortable: true },
        { key: 'clinic', label: 'Clinic', sortable: true },
        { key: 'uhid', label: 'UHID', sortable: true },
        { key: 'name', label: 'Patient Name', sortable: true },
        { key: 'encounter_type', label: 'Encounter Type', sortable: true },
        { key: 'provider', label: 'Provider', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'action', label: '', sortable: false },
      ],
      filter: {
        by: '',
        entry: '',
        department: null,
        clinic: null,
        provider: null,
        status: '',
        encounter_id: '',
      },
      patientDetails: 'Type UHID to search...',
      patientData: {},
      encounterData: {
        clinic: null,
        status: '',
        time_log: {},
        nurseSeen: 0,
        newCount: 0,
        provider: null,
        patient: {},
        is_active: true,
        encounter_type: '',
        date_and_time: {
          time: '',
        },
      },
    }
  },
  async created() {
    this.providers = await this.$api.core.providers({ size: 1000 })
    let genders = await this.$api.core.gender({ size: 1000 })
    this.genders = genders.results

    let clinics = await this.$api.core.clinics({ size: 1000 })
    console.log(this.genders)
    this.clinics = clinics.results
    for (const iterator of await clinics.results) {
      this.departments.push(iterator.Department)
    }

    this.getEncounters()
    this.getNurseSeenCount()
    this.getNewCount()
  },
  watch: {
    filter: {
      handler() {
        this.getEncounters()
      },
      deep: true,
    },
  },

  methods: {
    async searchPatient() {
      this.searchingPatient = true
      this.patientDetails = 'Searching...'
      try {
        let response = await this.$axios.$get(
          `patient/patients/?uhid=${this.test}`
        )

        console.log(response)
        for (const iterator of response.results) {
          this.patientDetails =
            iterator.firstname + ' ' + iterator.lastname
              ? iterator.firstname + ' ' + iterator.lastname
              : 'No matching record'

          this.patientData = iterator
          this.calcAge(this.patientData.date_of_birth)
        }
        if (response.results < 1) {
          this.patientData = {}

          this.patientData = 'No matching records...'
          ;(this.age.year = ''), (this.age.month = ''), (this.age.day = '')
          this.encounterData.patient = {}
        }
        this.encounterData.patient = this.patientData
        // this.calcAge(this.patientData.date_of_birth);
        this.searchingPatient = false
      } catch (error) {
        console.log(error)
      }
    },

    async startEncounter() {
      if (this.$refs.runValidation) {
        this.$refs.runValidation.click()
      }
      this.encounterData.patient.age = this.age
      if (this.encounterData.provider === null) {
        this.encounterData.provider = ''
      }
      if (this.encounterData.encounter_type && this.encounterData.clinic) {
        try {
          // this.isbusy = true;
          let response = await this.$axios.$post(
            'encounters/encounter/',
            this.encounterData
          )
          if (response.encounter_id) {
            this.$bvModal.hide('Add-encounter')
          }
          this.closeModal()
        } catch {
          // this.$toast.error(`Unable to create encounter`);
        } finally {
          this.getEncounters()
          // this.isbusy = false;
        }
      }
    },
    async newEncounter() {
      this.$bvModal.show('Add-encounter')
      if (this.providers.length < 1) {
        this.providers = await this.$api.core.providers({ size: 1000 })
      }

      if (this.clinics.length < 1) {
        let clinics = await this.$api.core.clinics({ size: 1000 })
        this.clinics = clinics.results
        for (const iterator of await clinics.results) {
          this.departments.push(iterator.Department)
        }
      }
      this.patientDetails = 'Type UHID to search...'
    },
    closeModal() {
      this.encounterData = {
        clinic: {},
        status: '',
        time_log: {},

        provider: null,
        patient: {},
        is_active: true,
        encounter_type: '',
        date_and_time: {
          time: '',
        },
      }
      this.test = ''
      this.age.year = null
      this.age.month = null
      this.age.day = null
      this.age = {
        year: null,
        month: null,
        day: null,
      }
      this.$bvModal.hide('Add-encounter')
      this.patientData.gender = null
      this.patientData.date_of_birth = null
      this.patientData.phone_number = null
      this.clinic = null
      this.encounterData = {
        clinic: null,
        status: '',
        time_log: {},

        provider: null,
        patient: {},
        is_active: true,
        encounter_type: null,
        date_and_time: {
          time: '',
        },
      }
    },
    rareCase() {
      this.getEncounters(1)
    },
    async getNurseSeenCount() {
      try {
        let response = await this.$axios.$get(`encounters/ns/count/`)

        this.nurseSeen = response.count
      } catch {
      } finally {
      }
    },
    async getNewCount() {
      try {
        let response = await this.$axios.$get(`encounters/new/count/`)

        this.newCount = response.count
      } catch {
      } finally {
      }
    },
    async getEncounters(page = 1) {
      try {
        this.busy = true

        let uri = `encounters/encounter/?page=${page}&department=${
          this.filter.department ? this.filter.department : ''
        }&size=${this.perPage}&clinic=${
          this.filter.clinic ? this.filter.clinic : ''
        }&limit=12&${this.filter.by ? this.filter.by : ''}=${
          this.filter.entry ? this.filter.entry : ''
        }&provider=${this.filter.provider ? this.filter.provider : ''}&status=${
          this.filter.status ? this.filter.status : ''
        }&encounter_id=${
          this.filter.encounter_id ? this.filter.encounter_id : ''
        }`
        let response = await this.$axios.$get(uri)

        let temp = []
        this.item = response.results.length

        this.pages = response.total_pages
        this.itemsToShow = []
        for (const iterator of response.results) {
          let x = iterator.patient
          let time = iterator.encounter_datetime
          let y = new Date(time).toLocaleDateString()
          let z = new Date(time).toTimeString().substring(0, 5)
          let b = y + ', ' + z

          x = x.firstname + ' ' + x.lastname
          let badgeColor = ''
          if (iterator.status === 'New') {
            badgeColor = 'badge-warning'
          } else if (
            iterator.status === 'Nurse seen.' ||
            iterator.status === 'Nurse seen' ||
            iterator.status === 'NS'
          ) {
            badgeColor = 'badge-info'
          } else {
            badgeColor = 'unknown'
          }

          this.itemsToShow.push({
            name: x,
            encounter_type: iterator.encounter_type,
            encounter_id: iterator.encounter_id,
            date: b,
            provider: iterator.provider.first_name
              ? iterator.provider.first_name + ' ' + iterator.provider.last_name
              : '',
            clinic: iterator.clinic.name,
            department: iterator.clinic.Department
              ? iterator.clinic.Department.name
              : 'nil',
            patient: iterator.patient,
            id: iterator.id,
            uhid: iterator.patient.uhid,
            status: iterator.status ? iterator.status : 'New',
            color: badgeColor,
          })
        }
      } catch {
      } finally {
        this.isLoading = false
        this.busy = false
      }
    },
    clearEntry() {
      this.filter = {
        by: '',
        entry: '',
        department: null,
        clinic: null,
        provider: null,
        status: '',
      }
      // this.getEncounters()
    },
    viewPatientData(e) {
      console.log(e)
      this.$router.push(`/dashboard/opd/${e.id}`)
    },
    calcAge(e) {
      // **********calc year***********
      let presentDate = new Date().getFullYear()
      let yearOfBirth = e.substring(0, 4)

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
      } else {
        if (this.age.year === 0) {
          this.age.year
        } else {
          this.age.year--
        }
      }

      // **************calc month***********
      let tempMonth
      let month = new Date().getMonth()
      let monthOfBirth = parseInt(e.substring(5, 7))
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
    optionClicked(e, i) {
      if (i === 0) {
        this.$router.push(`/dashboard/opd/${e.id}`)
      }
    },
  },
}
</script>