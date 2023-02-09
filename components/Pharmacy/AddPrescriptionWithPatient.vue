<template>
  <ModalWrapper size="lg" title="Add Prescription" @ok="ok()" @show="getData()" @hide="clear()" :stacking="false">
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="UHID" :rules="['']">
              <div class="d-flex">
                <input v-model="uhid" type="text" class="form-control" />
                <div class="ml-2 mt-1">
                  <b-spinner style="width: 1.7rem; height: 1.7rem" v-if="downloading" variant="primary" label="grow">
                  </b-spinner>
                  <div class="text-info icon" v-if="false">
                    <span @click="findPatient">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 16 16" class="point">
                        <g fill="currentColor">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path
                            d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Patient Name" :rules="['required']">
              <input :value="name" type="text" class="form-control" readonly />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="D.O.B" :rules="['']">
              <input :value="dob" type="text" class="form-control" readonly />
            </ValidationProviderWrapper>
          </div>

          <div class="mb-2 col-lg-6 col-md-6 col-sm-6">
            <small class="text-grey text-12">Age (Y-M-D)</small>
            <div class="d-flex">
              <div v-if="fill" class="px-1">
                <input type="text" disabled placeholder="Year" v-model="age.year"
                  class="form-control ng-untouched ng-pristine ng-valid" />
              </div>
              <div v-if="!fill" class="px-1">
                <input type="number" placeholder="Year" v-model="formDate.year"
                  class="form-control ng-untouched ng-pristine ng-valid" />
              </div>
              <div v-if="fill" class="px-1">
                <input type="text" disabled placeholder="Month" v-model="age.month"
                  class="form-control ng-untouched ng-pristine ng-valid" />
              </div>
              <div v-if="!fill" class="px-1">
                <input type="number" placeholder="Month" v-model="formDate.month"
                  class="form-control ng-untouched ng-pristine ng-valid" />
              </div>
              <div v-if="fill" class="px-1">
                <input type="text" disabled placeholder="Day" v-model="age.day"
                  class="form-control ng-untouched ng-pristine ng-valid" />
              </div>
              <div v-if="!fill" class="px-1">
                <input type="number" placeholder="Day" v-model="formDate.day"
                  class="form-control ng-untouched ng-pristine ng-valid" />
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Gender" :rules="['required']">
              <input :value="gender" type="text" class="form-control" readonly />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Email" :rules="[]">
              <input :value="email" type="text" class="form-control" readonly />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Pharmacy*" :rules="['']">
              <VSelect v-model="dataObject.store" :options="stores" :reduce="(opt) => opt.id" label="name">
              </VSelect>
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Prescribing Physician" :rules="[]">
              <input v-model="dataObject.prescribing_physician" type="text" class="form-control" />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 d-flex ml-0 text-primary text-14">
            <span class="point" @click="addDrug">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16">
                <path fill="currentColor"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
              Add
            </span>
          </div>

          <div v-for="(drug, index) in dataObject.details" :key="index"
            class="row p-1 mt-2 mx-2 border border-secondary rounded">
            <div class="
                col-md-12
                
                d-flex
                justify-content-end
                ml-0
                text-danger text-14
              ">
              <span class="point float" @click="deleteDrug(index)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" />
                </svg>
              </span>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Medication" :rules="['required']">
                <VSelect @option:selected="fetchOPtions($event, index)" @option:deselected="getGenericDrugs"
                  v-model="drug.generic_drug" :options="generic_drug" :reduce="(opt) => opt.id" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <!-- <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="SIG" :rules="['']">
                <input :value="sigFormatter(drug.direction, drug.duration)" type="text" class="form-control" />
              </ValidationProviderWrapper>
            </div> -->

            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Dose" :rules="['']">
                <VSelect v-model="drug.dose" :options="doses" :reduce="(opt) => opt.id" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Unit" :rules="['']">
                <VSelect v-model="drug.unit" :options="units" :reduce="(opt) => opt.id" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Frequency" :rules="['']">
                <VSelect v-model="drug.frequency" :options="frequencies" :reduce="(opt) => opt.id" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Duration" :rules="['required']">
                <VSelect v-model="drug.duration" :options="durations" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Direction" :rules="['required']">
                <VSelect v-model="drug.direction" :options="directions" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Route" :rules="['']">
                <VSelect v-model="drug.route" :options="routes" :reduce="(opt) => opt.id" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Product" :rules="['']">
                <VSelect v-model="drug.product" :options="products" :reduce="(opt) => opt.id" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Dispense quantity" :rules="[]">
                <input v-model="drug.dispense_quantity" type="number" class="form-control" />
              </ValidationProviderWrapper>
            </div>
            <div v-if="drug.product" class="col-md-12 mb-2">
              <div class="d-flex justify-content-end align-items-center">
                <div class="col-md-6 text-14 text-info text-center">
                  Bottle(s)
                </div>
              </div>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Notes" :rules="['']">
                <textarea id="" v-model="drug.note" class="form-control" name="" cols="30" rows="2"></textarea>
              </ValidationProviderWrapper>
            </div>
          </div>

          <div class="col-md-12 d-flex justify-content-end ml-0 text-primary text-14 pt-2">
            <span class="point" @click="addDrug">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16">
                <path fill="currentColor"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
              Add
            </span>
          </div>
        </div>
      </form>
    </ValidationObserver>

    <div>
      <PharmacyFindPatient />
    </div>
  </ModalWrapper>
</template>

<script>
import { debounce } from 'lodash'

export default {
  props: {
    editData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    role: {
      require: false,
    },
  },
  data() {
    return {
      uhid: '',
      selected: [],
      present: false,
      downloading: false,
      generic_drug: [],
      doses: [],
      units: [],
      frequencies: [],
      durations: [],
      directions: [],
      routes: [],
      products: [],
      stores: [],
      age: {
        year: '',
        month: '',
        day: '',
      },
      formDate: {
        year: '',
        month: '',
        day: ''
      },
      dataObject: {
        details: [
          {
            generic_drug: null,
            product: null,
            dose: null,
            unit: null,
            route: null,
            frequency: null,
            direction: null,
            duration: null,
            dispense_quantity: 1,
            status: 'FULFILLED IN',
            note: '',
          },
        ],
        patient: {},
        source: 'OPD',
        prescribing_physician: '',
        store: null,
      },
    }
  },
  computed: {
    name() {
      if (Object.keys(this.dataObject.patient).length > 0) {
        return (
          this.dataObject.patient.salutation +
          ' ' +
          this.dataObject.patient.firstname +
          ' ' +
          this.dataObject.patient.lastname
        )
      }
      return ''
    },
    gender() {
      if (this.dataObject.patient) {
        return this.dataObject.patient.gender
      }
      return ''
    },

    fill() {
      return this.age.year ? true : false
    },

    dob() {
      if (this.dataObject.patient) {
        return this.dataObject.patient.date_of_birth
      }
      return ''
    },

    email() {
      if (this.dataObject.patient) {
        return this.dataObject.patient.email
      }
      return ''
    },
  },
  watch: {
    uhid: debounce(async function (newVal) {
      this.downloading = true
      const results = await this.getPatientByUHID(newVal)
      if (results) {
        this.downloading = false
        this.dataObject.patient = results

        if (results.date_of_birth !== null || results.date_of_birth !== '') {
          this.calcAge(results.date_of_birth)
          this.dataObject.patient.age = this.age
        }
        else {
          this.dataObject.patient.age = {
            year: '',
            month: '',
            day: '',
          }
        }
      } else {
        this.dataObject.patient = {}
        this.downloading = false
      }
    }, 1000),
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        this.save()
      }
    },
    fetchOPtions(e, i) {
      this.$api.inventory
        .getProducts({ size: 1500, generic_drug: e.id })
        .then((res) => {
          this.products = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },

    findPatient() {
      this.$bvModal.show('findPatient')
    },
    productLogic() {
      let dose_multiplier = 2
      let frequency_multiplier = 2
      let duration_multiplier = 2
      let product_divider = 2

      let product =
        (dose_multiplier * frequency_multiplier * duration_multiplier) /
        product_divider
      let qty = Math.floor(product)
      console.log(qty)
    },
    async save() {
      if (this.dataObject.patient.date_of_birth == null || this.dataObject.patient.date_of_birth == '') {
        this.dataObject.patient.age = this.formDate
      }
      try {
        let prescribeDetails = this.dataObject.details
        let direction = []
        let duration = []
        for (let x = 0; x < prescribeDetails.length; x++) {
          duration.push(prescribeDetails[x].duration.id)
          direction.push(prescribeDetails[x].direction.id)
        }

        //  console.log({direction}, {duration})
        var pocket = prescribeDetails

        for (let x = 0; x < prescribeDetails.length; x++) {
          pocket[x].direction = direction[x]
          pocket[x].duration = duration[x]
        }
        console.log(pocket)

        const data = await this.$api.pharmacy.orderPrescription({
          store: this.dataObject.store,
          patient: this.dataObject.patient,
          source: this.dataObject.source,
          prescribing_physician: this.dataObject.prescribing_physician,
          note: this.dataObject.note,
          details: pocket,
        })
        this.$emit('refresh')
        this.$bvModal.hide('modal')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    sigFormatter(direction, duration) {
      if (direction && duration) {
        return direction.name + ' every ' + duration.name
      } else {
        return null
      }
    },
    deleteDrug(e) {
      if (this.dataObject.details.length !== 1) {
        this.dataObject.details.splice(e, 1)
      }
    },
    addDrug() {
      this.dataObject.details.push({
        generic_drug: null,
        product: '',
        dose: null,
        unit: null,
        route: null,
        frequency: null,
        direction: null,
        duration: null,
        dispense_quantity: 1,
        status: '',
      })
    },

    closeModal() {
      this.$bvModal.hide('diagnosisModal')
    },
    setDiagnosis(e) {
      this.$bvModal.hide('diagnosisModal')
      this.dataObject.diagnosis = e
    },
    clear() {
      this.dataObject = {
        details: [
          {
            generic_drug: null,
            product: null,
            dose: null,
            unit: null,
            route: null,
            frequency: null,
            direction: null,
            duration: null,
            dispense_quantity: 1,
            status: 'FULFILLED IN',
          },
        ],
        patient: {},
        source: 'OPD',
        prescribing_physician: '',
        store: null,
        note: '',
      }
      this.age = {
        year: '',
        month: '',
        day: ''
      }
      this.formDate = {
        year: '',
        month: '',
        day: ''
      }
      this.uhid = ''
      this.$emit('hide')
    },
    getData() {
      this.getGenericDrugs()
      this.getDoses()
      this.getUnits()
      this.getFrequencies()
      this.getDurations()
      this.getDirections()
      this.getRoutes()
      this.getProducts()
      this.getStores()
      this.productLogic()
      this.dataObject.prescribing_physician =
        this.$store.state.auth.user.first_name +
        ' ' +
        this.$store.state.auth.user.last_name
    },
    async getPatientByUHID(uhid) {
      try {
        if (uhid.length > 0) {
          const results = await this.$api.patient.getPatientByUHID(uhid)
          return results
        }
      } catch (error) {
        console.log(error)
      }
    },
    getGenericDrugs() {
      this.$api.pharmacy
        .getGeneric({ size: 1500 })
        .then((res) => {
          this.generic_drug = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getDoses() {
      this.$api.pharmacy
        .getDoses({ size: 1000 })
        .then((res) => {
          this.doses = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUnits() {
      this.$api.pharmacy
        .getUnits({ size: 1000 })
        .then((res) => {
          this.units = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getFrequencies() {
      this.$api.pharmacy
        .getFrequencies({ size: 1000 })
        .then((res) => {
          this.frequencies = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDurations() {
      this.$api.pharmacy
        .getDurations({ size: 1000 })
        .then((res) => {
          this.durations = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDirections() {
      this.$api.pharmacy
        .getDirections({ size: 1000 })
        .then((res) => {
          this.directions = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getRoutes() {
      this.$api.pharmacy
        .getRoutes({ size: 1000 })
        .then((res) => {
          this.routes = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProducts() {
      this.$api.inventory
        .getProducts({ size: 1500 })
        .then((res) => {
          this.products = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getStores() {
      this.$api.inventory
        .getStores({ size: 1000, is_pharmacy: true })
        .then((res) => {
          this.stores = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    calcAge(e) {
      if (typeof (e) == 'string') {
        // **********calc year***********
        let presentDate = new Date().getFullYear()
        let yearOfBirth = e.substring(0, 4)
        let month = new Date().getMonth()
        let monthOfBirth = parseInt(e.substring(5, 7))

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
      }
    },
  },
}
</script>

<style lang="scss" scoped>
textarea.form-control {
  min-height: 50px;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.float {
  position: relative;
  top: -3px;
  right: -17px;
}

.shrink {
  height: 2px;
}
</style>