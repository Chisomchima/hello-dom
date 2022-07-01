<template>
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
                  class="form-control control ng-untouched ng-pristine ng-valid"
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
                <span class="text-12" style="color: red">{{ errors[0] }}</span>
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
                <span class="text-12" style="color: red">{{ errors[0] }}</span>
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
</template>

<script>
export default {
  data() {
    return {
      patientDetails: 'Type UHID to search...',
      searchingPatient: false,
      providers: [],
      departments: [],
      genders: [],
      busy: false,
      dropdownItem: ['Nurse Vitals'],
      clinics: [],
      patientData: {},
      test: '',
      age: {
        year: '',
        month: '',
        day: '',
      },
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
  methods: {
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
          this.$emit('get-encounter')
          // this.isbusy = false;
        }
      }
    },
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
  },
  async created() {
    this.providers = await this.$api.core.providers({ size: 1000 })
    let genders = await this.$api.core.gender({ size: 1000 })
    this.genders = genders.results

    let clinics = await this.$api.core.clinics({ size: 1000 })
    console.log(this.genders)
    this.clinics = clinics.results
    // for (const iterator of await clinics.results) {
    //   this.departments.push(iterator.Department)
    // }

    // this.getEncounters()
    // this.getNurseSeenCount()
    // this.getNewCount()
  },
}
</script>

<style lang="scss" scoped>
</style>