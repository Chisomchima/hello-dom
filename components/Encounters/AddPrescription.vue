<template>
  <ModalWrapper
    size="lg"
    id="prescribe"
    title="Add Prescription"
    @ok="ok()"
    @show="getData()"
    @hide="clear()"
    :stacking="false"
  >
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="UHID" :rules="['']">
              <div class="d-flex">
                <input readonly :value="uhid" type="text" class="form-control" />
              </div>
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper
              name="Patient Name"
              :rules="['required']"
            >
              <input :value="name" type="text" class="form-control" readonly />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="D.O.B" :rules="['required']">
              <input :value="dob" type="text" class="form-control" readonly />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Gender" :rules="['required']">
              <input
                :value="gender"
                type="text"
                class="form-control"
                readonly
              />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Store" :rules="['']">
              <VSelect
                v-model="dataObject.store"
                :multiple="true"
                :options="stores"
                :reduce="(opt) => opt.id"
                label="name"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>

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
              Add
            </span>
          </div>

          <div
            v-for="(drug, index) in dataObject.details"
            :key="index"
            class="row p-1 mt-2 mx-2 border border-secondary rounded"
          >
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Generic drug" :rules="[]">
                <VSelect
                  v-model="drug.generic_drug"
                  :options="generic_drug"
                  :reduce="(opt) => opt.id"
                  label="name"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Product" :rules="[]">
                <VSelect
                  v-model="drug.product"
                  :options="products"
                  :reduce="(opt) => opt.id"
                  label="name"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Dose" :rules="[]">
                <VSelect
                  v-model="drug.dose"
                  :options="doses"
                  :reduce="(opt) => opt.id"
                  label="name"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Unit" :rules="[]">
                <VSelect
                  v-model="drug.unit"
                  :options="units"
                  :reduce="(opt) => opt.id"
                  label="name"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Frequency" :rules="[]">
                <VSelect
                  v-model="drug.frequency"
                  :options="frequencies"
                  :reduce="(opt) => opt.id"
                  label="name"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Direction" :rules="[]">
                <VSelect
                  v-model="drug.direction"
                  :options="directions"
                  :reduce="(opt) => opt.id"
                  label="name"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Duration" :rules="[]">
                <VSelect
                  v-model="drug.duration"
                  :options="durations"
                  :reduce="(opt) => opt.id"
                  label="name"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Route" :rules="[]">
                <VSelect
                  v-model="drug.route"
                  :options="routes"
                  :reduce="(opt) => opt.id"
                  label="name"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Dispense quantity" :rules="[]">
                <input
                  v-model="drug.dispense_quantity"
                  type="number"
                  readonly
                  class="form-control"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Notes" :rules="['']">
                <textarea
                  id=""
                  v-model="drug.note"
                  class="form-control"
                  name=""
                  cols="30"
                  rows="2"
                ></textarea>
              </ValidationProviderWrapper>
            </div>
            <div
              class="
                col-md-12
                d-flex
                justify-content-end
                ml-0
                text-primary text-14
              "
            >
              <span class="point" @click="deleteDrug(index)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1ZM8 11a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <!-- <div class="col-md-12">
              <hr />
            </div> -->
          </div>
        </div>
      </form>
    </ValidationObserver>
  </ModalWrapper>
</template>

<script>
import { debounce } from 'lodash'

export default {
  props: {
    patient: {
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
        source: null,
        store: null,
      },
    }
  },
  computed: {
    name() {
      if (Object.keys(this.patient).length > 0) {
        return (
          this.patient.salutation +
          ' ' +
          this.patient.firstname +
          ' ' +
          this.patient.lastname
        )
      }
      return ''
    },
    gender() {
      if (this.patient) {
        return this.patient.gender
      }
      return ''
    },

    dob() {
      if (this.patient) {
        return this.patient.date_of_birth
      }
      return ''
    },

    email() {
      if (this.patient) {
        return this.patient.email
      }
      return ''
    },
    uhid() {
      if (this.patient) {
        return this.patient.uhid
      }
      return ''
    },

  },
  watch: {
    // uhid: debounce(async function (newVal) {
    //   this.downloading = true
    //   const results = await this.getPatientByUHID(newVal)
    //   if (results) {
    //     this.dataObject.patient = results
    //     this.downloading = false
    //   } else {
    //     this.dataObject.patient = {}
    //     this.downloading = false
    //   }
    // }, 1000),
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        this.save()
      }
    },
    helloWorld(e) {
      this.present = e
    },
    productLogic(){
      let dose_multiplier = 2
      let frequency_multiplier = 2
      let duration_multiplier = 2
      let product_divider = 2

      let product = (dose_multiplier * frequency_multiplier * duration_multiplier) / product_divider
      let qty = Math.floor(product)
      console.log(qty)
    }, 
    async save() {
      try {
        const data = await this.$api.pharmacy.orderPrescription(this.dataObject)
        this.$emit('refresh')
        this.$bvModal.hide('modal')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    showModal() {
      if (!this.present) {
        this.$bvModal.show('diagnosisModal')
      } else {
        this.present = false
        this.$bvModal.hide('diagnosisModal')
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
            product: '',
            dose: null,
            unit: null,
            route: null,
            frequency: null,
            direction: null,
            duration: null,
            dispense_quantity: 1,
            status: '',
          },
        ],
        patient: {},
        source: null,
        store: null,
        note: '',
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
      this.productLogic
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
        .getGeneric({ size: 1000 })
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
        .getProducts({ size: 1000 })
        .then((res) => {
          this.products = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getStores() {
      this.$api.inventory
        .getStores({ size: 1000 })
        .then((res) => {
          this.stores = res.results
        })
        .catch((err) => {
          console.log(err)
        })
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
</style>