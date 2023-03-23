<template>
  <ModalWrapper
    id="id"
    size="lg"
    title="Add New"
    :stacking="false"
    @ok="ok()"
    @show="getData()"
    @hide="clear()"
  >
    <ValidationObserver ref="form">
      <form>
        <div class="col-md-12 mb-2">
          <!-- <span>Move Type: <span>Receipt</span></span> -->
        </div>

        <div class="col-md-12 mb-2">
          <ValidationProviderWrapper name="Vendor*" :rules="['']">
            <VSelect
              v-model="dataObject.store"
              :options="stores"
              :reduce="(opt) => opt.id"
              label="name"
            >
            </VSelect>
          </ValidationProviderWrapper>
        </div>

        <div class="col-md-12 mb-2">
          <ValidationProviderWrapper name="Destination Location*" :rules="['']">
            <VSelect
              v-model="dataObject.store"
              :options="stores"
              :reduce="(opt) => opt.id"
              label="name"
            >
            </VSelect>
          </ValidationProviderWrapper>
        </div>

        <div v-if="!isReciept" class="col-md-12 mb-2">
          <ValidationProviderWrapper name="Source Location*" :rules="['']">
            <VSelect
              v-model="dataObject.store"
              :options="stores"
              :reduce="(opt) => opt.id"
              label="name"
            >
            </VSelect>
          </ValidationProviderWrapper>
        </div>
        <div class="col-md-12 mb-2">
          <ValidationProviderWrapper name="Scheduled Date" :rules="['']">
            <VSelect
              v-model="dataObject.store"
              :options="stores"
              :reduce="(opt) => opt.id"
              label="name"
            >
            </VSelect>
          </ValidationProviderWrapper>
        </div>
        <b-tabs content-class="mt-4">
          <b-tab title="Products" active>
            <div class="col-md-12 d-flex ml-0 text-primary text-14">
              <span class="point" @click="addDrug">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                  />
                </svg>
                Add Products
              </span>
            </div>

            <div
              v-for="(drug, index) in dataObject.details"
              :key="index"
              class="row p-1 mt-2 mx-2 border border-secondary rounded"
            >
              <div
                class="
                  col-md-12
                  d-flex
                  justify-content-end
                  ml-0
                  text-danger text-14
                "
              >
                <span class="point float" @click="deleteDrug(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"
                    />
                  </svg>
                </span>
              </div>
              <div class="col-md-6 mb-2">
                <ValidationProviderWrapper name="Product" :rules="['']">
                  <VSelect
                    v-model="drug.product"
                    :options="products"
                    label="name"
                    @option:selected="fetchGenericDrugs($event, index)"
                  >
                  </VSelect>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-6 mb-2">
                <ValidationProviderWrapper name="Quantity" :rules="[]">
                  <input
                    v-model="drug.dispense_quantity"
                    type="number"
                    class="form-control"
                  />
                </ValidationProviderWrapper>
              </div>
            </div>
            <div
              class="
                col-md-12
                d-flex
                justify-content-end
                ml-0
                text-primary text-14
                pt-2
              "
            >
              <span class="point" @click="addDrug">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                  />
                </svg>
                Add
              </span>
            </div>
          </b-tab>
          <b-tab title="Additional Info">
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper
                name="Additional Information"
                :rules="['']"
              >
                <div class="d-flex">
                  <textarea
                    readonly
                    :value="uhid"
                    type="text"
                    class="form-control"
                  />
                </div>
              </ValidationProviderWrapper>
            </div>
          </b-tab>
        </b-tabs>
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
    isReciept: {
      type: Boolean,
      default: true,
      require: false,
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
      tabs: [],
      age: {
        year: '',
        month: '',
        day: '',
      },
      formDate: {
        year: '',
        month: '',
        day: '',
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
        products: [],
        generic_drug: [],
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
      return !!this.age.year
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
  mounted() {
    this.tabs = this.$children
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
        } else {
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
          const newVal = structuredClone(res.results)
          this.products = newVal
        })
        .catch((err) => {
          console.log(err)
        })
    },

    fetchGenericDrugs(e, i) {
      this.$api.pharmacy
        .getGeneric({ size: 1500 })
        .then((res) => {
          this.generic_drug = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },

    findPatient() {
      this.$bvModal.show('findPatient')
    },
    productLogic() {
      const dose_multiplier = 2
      const frequency_multiplier = 2
      const duration_multiplier = 2
      const product_divider = 2

      const product =
        (dose_multiplier * frequency_multiplier * duration_multiplier) /
        product_divider
      const qty = Math.floor(product)
      console.log(qty)
    },
    async save() {
      if (
        this.dataObject.patient.date_of_birth == null ||
        this.dataObject.patient.date_of_birth == ''
      ) {
        this.dataObject.patient.age = this.formDate
      }
      try {
        const prescribeDetails = this.dataObject.details
        const direction = []
        const duration = []
        const product = []
        const generic_drug = []

        for (let x = 0; x < prescribeDetails.length; x++) {
          duration.push(prescribeDetails[x].duration.id)
          product.push(prescribeDetails[x].product.id)
          direction.push(prescribeDetails[x].direction.id)
          generic_drug.push(prescribeDetails[x].generic_drug.id)
        }

        //  console.log({direction}, {duration})
        const pocket = prescribeDetails

        for (let x = 0; x < prescribeDetails.length; x++) {
          pocket[x].direction = direction[x]
          pocket[x].duration = duration[x]
          pocket[x].product = product[x]
          pocket[x].generic_drug = generic_drug[x]
        }

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
      this.getGenericDrugs()
      this.getProducts()
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
        status: 'FULFILLED IN',
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
        day: '',
      }
      this.formDate = {
        year: '',
        month: '',
        day: '',
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
      this.$api.pharmacy
        .getStores({ size: 1500 })
        .then((res) => {
          this.stores = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    calcAge(e) {
      if (typeof e === 'string') {
        // **********calc year***********
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
