<template>
  <b-modal
    id="Add-Report"
    ref="encounterModal"
    title="Add Medical Report"
    centered
    hide-footer
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
                  v-model="test"
                  v-debounce:1300ms.cancelonempty="searchPatient"
                  type="text"
                  placeholder="UHID"
                  class="form-control control ng-untouched ng-pristine ng-valid"
                />
                <div v-if="searchingPatient" class="mx-2">
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
                v-model="patientDetails"
                type="text"
                disabled
                placeholder="Patient Details"
                class="form-control ng-untouched ng-pristine ng-valid"
              />
            </div>
            <div class="mb-2 col-lg-6 pl-0 pr-2 col-md-6 col-sm-6">
              <small class="text-grey text-12">D.o.B</small>

              <input
                v-model="patientData.date_of_birth"
                type="text"
                disabled
                placeholder="D.O.B"
                class="form-control ng-untouched ng-pristine ng-valid"
              />
            </div>
            <div class="mb-2 col-lg-6 col-md-6 col-sm-6">
              <small class="text-grey text-12">Age (Y-M-D)</small>
              <div class="d-flex">
                <div v-if="fill" class="px-1">
                  <input
                    v-model="age.year"
                    type="text"
                    disabled
                    placeholder="Year"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div v-if="!fill" class="px-1">
                  <ValidationProviderWrapper name="" :rules="['required']">
                    <input
                      v-model="formDate.year"
                      type="number"
                      placeholder="Year"
                      class="form-control ng-untouched ng-pristine ng-valid"
                    />
                  </ValidationProviderWrapper>
                </div>
                <div v-if="fill" class="px-1">
                  <input
                    v-model="age.month"
                    type="text"
                    disabled
                    placeholder="Month"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div v-if="!fill" class="px-1">
                  <input
                    v-model="formDate.month"
                    type="number"
                    placeholder="Month"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div v-if="fill" class="px-1">
                  <input
                    v-model="age.day"
                    type="text"
                    disabled
                    placeholder="Day"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div v-if="!fill" class="px-1">
                  <input
                    v-model="formDate.day"
                    type="number"
                    placeholder="Day"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
              </div>
            </div>

            <div class="mb-2 col-lg-6 pr-2 pl-0 col-md-6 col-sm-6">
              <small class="text-grey text-12">Phone No.</small>

              <input
                v-model="patientData.phone_number"
                type="text"
                disabled
                placeholder="Phone No."
                class="form-control"
              />
            </div>

            <div class="mb-2 col-lg-6 px-0 col-md-6 col-sm-6">
              <label class="form-control-label">Gender</label>
              <input
                v-model="patientData.gender"
                type="text"
                disabled
                placeholder="Gender"
                class="form-control"
              />
            </div>

            <div class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12">
              <small class="text-grey text-12">Scheme*</small>
              <validation-provider v-slot="{ errors }" rules="required">
                <VSelect
                  v-model="encounterData.payment_scheme"
                  class="text-14 bg-light"
                  label="name"
                  :options="payment_schemes"
                  :reduce="(opt) => opt.payer_scheme.id"
                  :get-option-label="(op) => op.payer_scheme.name"
                >
                </VSelect>
                <span class="text-12" style="color: red">{{ errors[0] }}</span>
              </validation-provider>
            </div>

            <div class="mb-2 col-lg-12 pl-0 pr-2 col-md-12 col-sm-12">
              <label class="form-control-label">Service Center*</label>
              <validation-provider v-slot="{ errors }" rules="required">
                <VSelect
                  v-model="encounterData.service_center"
                  label="name"
                  class="text-14"
                  :options="servicCenters"
                >
                </VSelect>
                <span class="text-12" style="color: red">{{ errors[0] }}</span>
              </validation-provider>
            </div>

            <div class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12">
              <small class="text-grey text-12">Category*</small>
                <VSelect
                  v-model="package_category"
                  class="text-14"
                  label="name"
                  :options="categories"
                  :reduce="(opt) => opt.id"
                >
                </VSelect>
            </div>

            <div class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12">
              <small class="text-grey text-12">Medical Report*</small>
              <validation-provider v-slot="{ errors }" rules="required">
                <VSelect
                  v-model="encounterData.package"
                  class="text-14"
                  label="name"
                  :options="packages"
                  :reduce="(opt) => opt.id"
                >
                </VSelect>
                <span class="text-12" style="color: red">{{ errors[0] }}</span>
              </validation-provider>
            </div>
          </div>
        </div>

        <div class="my-3 d-flex justify-content-center">
          <button
            class="btn btn-light text-grey mr-5 text-14"
            style="height: 38px; width: 5rem; text-align: center"
            @click.prevent="closeModal"
          >
            Cancel
          </button>

          <BaseButton
            watch-request
            class="btn-primary"
            @click.prevent="CreateRecord"
            >Create Medical Record
          </BaseButton>
        </div>
        <div
          id="runValidation"
          ref="runValidation"
          type="button"
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
      servicCenters: [],
      patientDetails: 'Type UHID to search...',
      searchingPatient: false,
      providers: [],
      payment_schemes: [],
      departments: [],
      genders: [],
      package_category: '',
      categories: [],
      busy: false,
      dropdownItem: ['Nurse Vitals'],
      clinics: [],
      patientData: {},
      test: '',
      formDate: {
        year: '',
        month: '',
        day: '',
      },
      age: {
        year: '',
        month: '',
        day: '',
      },
      packages: [],
      encounterData: {
        //   clinic: null,
        //   provider: null,
        patient: {},
        //   encounter_type: null,
        service_center: '',
        payment_scheme: 0,
        package: 0,
      },
    }
  },
  computed: {
    fill() {
      return !!this.patientData.date_of_birth
    },
    schemes() {
      return this.data.payment_scheme
    },
  },
  async created() {
    this.providers = await this.$api.core.providers({ size: 1000 })
    const genders = await this.$api.core.gender({ size: 1000 })
    this.genders = genders.results

    const serviceCenter = await this.$api.medicalReport.getServiceCenters({
      size: 1000,
    })

    const getPackages = await this.$api.medicalReport.getMedicalRecords({
      size: 1000,
      package_category: this.package_category
    })
    this.packages = getPackages.results
    this.servicCenters = serviceCenter.results

    this.$api.medicalReport.getParents().then((res) => {
      this.categories = res.results
    })
    // for (const iterator of await clinics.results) {
    //   this.departments.push(iterator.Department)
    // }

    // this.getEncounters()
    // this.getNurseSeenCount()
    // this.getNewCount()
  },
  methods: {
    closeModal() {
      this.encounterData = {
        service_center: null,
        provider: null,
        patient: {},
        encounter_type: null,
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
      ;(this.formDate = {
        year: '',
        month: '',
        day: '',
      }),
        (this.patientDetails = 'Type UHID to search...')
      this.$bvModal.hide('Add-Report')
      this.patientData.gender = null
      this.patientData.date_of_birth = null
      this.patientData.phone_number = null
      this.service_center = null
    },
    async CreateRecord() {
      if (this.$refs.runValidation) {
        this.$refs.runValidation.click()
      }
      this.encounterData.patient = this.patientData
      if (!this.patientData.date_of_birth) {
        this.encounterData.patient.age = this.formDate
      } else {
        this.encounterData.patient.age = this.age
      }
      // if (this.encounterData.provider === null) {
      //   this.encounterData.provider = ''
      // }
      // if ( this.encounterData.service_center) {
      try {
        // this.isbusy = true;
        const response = await this.$api.medicalReport.createOrder(
          this.encounterData
        )
        if (response.encounter_id) {
          this.$bvModal.hide('Add-Report')
        }
        this.closeModal()
      } catch {
        // this.$toast.error(`Unable to create encounter`);
      } finally {
        this.$bvModal.hide('Add-Report')
        this.$emit('get-encounter')
        // this.isbusy = false;
      }
      // }
    },
    async searchPatient() {
      this.searchingPatient = true
      this.patientDetails = 'Searching...'
      try {
        const response = await this.$axios.$get(
          `patient/patients/?uhid=${this.test}`
        )

        const searched = response.results[0]
        if (response.results < 1) {
          this.patientData = {}
          this.patientDetails = 'No matching records...'
          ;(this.age.year = ''), (this.age.month = ''), (this.age.day = '')
          this.encounterData.patient = {}
        } else {
          console.log(searched, 'searched')
          this.patientDetails = searched.firstname + ' ' + searched.lastname
          this.patientData = searched
          this.payment_schemes = searched.payment_scheme
          this.calcAge(this.patientData.date_of_birth)
          this.patientData.age = this.age
          this.encounterData.patient = this.patientData
        }

        // this.calcAge(this.patientData.date_of_birth);
        this.searchingPatient = false
      } catch (error) {
        console.log(error)
        this.searchingPatient = false
      }
    },
    //   calcAge(e) {
    //     // **********calc year***********
    //     let presentDate = new Date().getFullYear()
    //     let yearOfBirth = e.substring(0, 4)
    //     let month = new Date().getMonth()
    //     let monthOfBirth = parseInt(e.substring(5, 7))

    //     let diff = presentDate - yearOfBirth
    //     let x = parseInt(diff)
    //     if (x === 0) {
    //       this.age.year = 0
    //       this.age.month = 0
    //     } else {
    //       this.age.year = x
    //     }

    //     if (monthOfBirth < month) {
    //       this.age.year
    //     } else {
    //       if (this.age.year === 0) {
    //         this.age.year
    //       } else {
    //         this.age.year--
    //       }
    //     }

    //     // **************calc month***********
    //     let tempMonth

    //     // tempMonth = monthOfBirth - month
    //     if (presentDate === yearOfBirth) {
    //       this.patient.age.month = 0
    //     } else {
    //       tempMonth = 12 - monthOfBirth
    //     }

    //     if (monthOfBirth <= month) {
    //       this.age.month = month - monthOfBirth
    //       // this.patient.age.month + 1;
    //     } else if (month + 1 === monthOfBirth) {
    //       this.age.month = 0
    //     } else {
    //       this.age.month = tempMonth + month
    //       // this.patient.age.month + 1;
    //     }

    //     // **************calc day**************
    //     let day = new Date().getDate()
    //     let dayOfBirth = e.substring(8, 10)
    //     // this.patient.age.day = new Date().getDate();

    //     if (day > dayOfBirth) {
    //       this.age.day = day - dayOfBirth
    //     } else if (day === dayOfBirth) {
    //       this.age.day = 0
    //     } else {
    //       this.age.day = day
    //     }

    //     // *********************************
    //   },
  },
}
</script>

<style lang="scss" scoped></style>
