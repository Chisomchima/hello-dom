<template>
  <b-modal size="lg" id="viewPrescription" title="View Prescription" ref="modal" centered :no-stacking="false"
    :no-close-on-backdrop="true" :scrollable="false" ok-title="Save" @ok="save()" @show="getData()" @hide="cancel">
    <template #modal-header="{ close }">
      <slot name="header" :close="close">
        <h5 class="mb-0 mt-2">View Prescription</h5>
        <div class="d-flex align-items-center">
          <div>
            <span>
              <button @click="confirmPrescription" class="btn btn-outline-primary">Confirm</button>
              <span class="ml-2 mt-1">
                <b-spinner style="width: 1.2rem; height: 1.2rem" v-if="busy" variant="primary" label="grow">
                </b-spinner>
              </span>
            </span>
            <span class="mx-2 text-primary pointer">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20"
                preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                <path fill="currentColor"
                  d="M5 4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V5h.5A2.5 2.5 0 0 1 18 7.5v5a1.5 1.5 0 0 1-1.5 1.5H15v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 15.5V14H3.5A1.5 1.5 0 0 1 2 12.5v-5A2.5 2.5 0 0 1 4.5 5H5v-.5Zm9 0a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V5h8v-.5Zm-8 7v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5Z" />
              </svg>
            </span>
          </div>
          <span @click="close()" class="point">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 18L18 6m0 12L6 6" />
            </svg>
          </span>
        </div>
      </slot>
    </template>
    <template #modal-footer="{ cancel }">
      <div class=" w-100 d-flex px-5 justify-content-between">
        <div v-if="!present">
          <button size="sm" variant="light" class="px-5 btn btn-light text-secondary mr-2" @click="cancel()">
            Close
          </button>
        </div>
        <div v-if="present">
          <button @click="present = false" class="btn btn-secondary">
            Cancel
          </button>
        </div>
        <div v-if="!present">
          <button @click="editMode" class="btn btn-secondary">
            Edit
          </button>
        </div>
        <div v-if="present">
          <BaseButton class="px-5" @click="save">
            Save
          </BaseButton>
        </div>
      </div>
    </template>
    <ValidationObserver ref="form">

      <form>

        <div class="row">
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="UHID" :rules="['']">
              <div class="d-flex">
                <input :value="formatUHID(dataObject.patient)" readonly type="text" class="form-control" />
                <div class="ml-2 mt-1">
                  <b-spinner style="width: 1.7rem; height: 1.7rem" v-if="downloading" variant="primary" label="grow">
                  </b-spinner>

                </div>
              </div>
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Patient Name" :rules="['required']">
              <input :value="patientName(dataObject.patient)" type="text" class="form-control" readonly />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="D.O.B" :rules="['required']">
              <input :value="dob" type="text" class="form-control" readonly />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Gender" :rules="['required']">
              <input :value="gender" type="text" class="form-control" readonly />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Pharmacy*" :rules="['']">
              <VSelect v-model="editData.store" :options="stores" :reduce="(opt) => opt.id" label="name">
              </VSelect>
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Prescribing Physician" :rules="[]">
              <input :value="physician ? physician : ''" type="text" readonly class="form-control" />
            </ValidationProviderWrapper>
          </div>

          <div class="
              col-md-12
              d-flex
              align-items-center
              justify-content-between
              ml-0
              text-primary text-14
            ">
            <span class="point" @click="addDrug">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16">
                <path fill="currentColor"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
              Add
            </span>
          </div>


          <div v-if="present">
            <div v-for="(drug, index) in editData.details" :key="index"
              class="row p-1 mt-2 mx-2 border border-secondary rounded">
              <div class="
                shrink
                col-md-12
                d-flex
                justify-content-end
                ml-0
                text-primary text-14
              ">
                <span class="point text-danger" @click="deleteDrug(index)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" />
                  </svg>
                </span>
              </div>
              <div class="col-md-12 mb-2">
                <ValidationProviderWrapper name="Medication" :rules="['required']">
                  <VSelect v-model="drug.generic_drug" :options="generic_drug" :reduce="(opt) => opt.id" label="name">
                  </VSelect>
                </ValidationProviderWrapper>
              </div>
              <!-- <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="SIG" :rules="['']">
                <input
                  :value="sigFormatter(drug.direction, drug.duration)"
                  type="text"
                  class="form-control"
                />
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
                <ValidationProviderWrapper name="Direction" :rules="['required']">
                  <VSelect v-model="drug.direction" :options="directions" label="name">
                  </VSelect>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-6 mb-2">
                <ValidationProviderWrapper name="Duration" :rules="['required']">
                  <VSelect v-model="drug.duration" :options="durations" label="name">
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
              <div v-if="drug.product != null" class="col-md-12 mb-2">
                <div class="d-flex justify-content-end align-items-center">
                  <div class="col-md-6 text-14 text-info text-center">
                    Bottle(s)
                  </div>
                </div>
              </div>


              <!-- <div class="col-md-12">
              <hr />
            </div> -->
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Notes" :rules="['']">
                <textarea id="" v-model="editData.note" class="form-control" name="" cols="30" rows="2"></textarea>
              </ValidationProviderWrapper>
            </div>
          </div>
        </div>

      </form>

    </ValidationObserver>


    <div v-if="!present">
      <div class="text-14" v-for="(drug, index) in editData.details" :key="index">
        <div class="w-100 p-3 my-2 border border-secondary rounded">
          <div> Medication: {{ drug.generic_drug ? drug.generic_drug.name : '' }}</div>
          <div>Instruction: {{ instructionFormat(drug) }}</div>
          <div class="d-flex">
            <div class="col-md-6 px-0">
              <span>Brand: {{ drug.product ? drug.product.name : "" }}</span>
            </div>
            <div class="col-md-6 px-0">
              <span>Dispense quantity: {{ drug.dispense_quantity }}</span>
            </div>
          </div>
        </div>
        <div>
          <p class="text-16 text-decoration-underline"><u>Note</u></p>
          <div class="text-14 text-info">
            {{ editData.note }}
          </div>
        </div>
      </div>
    </div>


  </b-modal>
</template>

<script>
import { debounce } from 'lodash'

export default {
  props: {
    dataObject: {
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
      busy: false,
      generic_drug: [],
      doses: [],
      units: [],
      frequencies: [],
      durations: [],
      directions: [],
      routes: [],
      products: [],
      stores: [],
      editData: {
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
        note: '',
        prescribing_physician: '',
        store: null,
      },
    }
  },
  computed: {
    gender() {
      if (this.dataObject.patient) {
        return this.dataObject.patient.gender
      }
      return ''
    },

    dob() {
      if (this.dataObject.patient) {
        return this.dataObject.patient.date_of_birth
      }
      return ''
    },

    physician() {
      if (this.dataObject.prescribing_physician) {
        return (
          this.dataObject.prescribing_physician.first_name +
          ' ' +
          this.dataObject.prescribing_physician.last_name
        )
      }
      return ''
    },
  },
  watch: {
    uhid: debounce(async function (newVal) {
      this.downloading = true
      const results = await this.getPatientByUHID(newVal)
      if (results) {
        this.dataObject.patient = results
        this.downloading = false
      } else {
        this.dataObject.patient = {}
        this.downloading = false
      }
    }, 1000),
    dataObject() {
      this.editData.store = this.dataObject.store.id
      this.editData.patient = this.dataObject.patient
      this.editData.prescribing_physician = this.dataObject.prescribing_physician
      this.editData.details = this.dataObject.details
      if (this.dataObject.note !== null) {
        this.editData.note = this.dataObject.note
      }
    }
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        this.save()
      }
    },
    editMode() {
      this.present = true
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
    async confirmPrescription() {
      try {
        this.busy = true
        let response = await this.$api.pharmacy.confirmPrescription(
          this.dataObject.id
        )
        if (response) {
          this.$emit('refresh')
          this.$toast({
            type: 'success',
            message: 'Success'
          })
        }
        this.busy = false
      } catch {
        this.busy = false
      }
    },
    async save() {
      try {
        // let prescribeDetails = this.editData.details
        // let direction = []
        // let duration = []
        // let dose = []
        // let unit = []
        // let frequency = []
        // let Route = []
        // for (let x = 0; x < prescribeDetails.length; x++) {
        //   duration.push(prescribeDetails[x].duration.id)
        //   direction.push(prescribeDetails[x].direction.id)
        //   dose.push(prescribeDetails[x].dose.id)
        //   unit.push(prescribeDetails[x].unit.id)
        //   frequency.push(prescribeDetails[x].frequency.id)
        //   Route.push(prescribeDetails[x].route.id)
        // }

        // var pocket = prescribeDetails

        // for (let x = 0; x < prescribeDetails.length; x++) {
        //   pocket[x].direction = direction[x]
        //   pocket[x].duration = duration[x]
        //   pocket[x].dose = dose[x]
        //   pocket[x].unit = unit[x]
        //   pocket[x].frequency = frequency[x]
        //   pocket[x].route = Route[x]
        // }

        const data = await this.$api.pharmacy.updatePrescription(
          {
            store: this.editData.store,
            patient: this.dataObject.patient,
            source: this.dataObject.source,
            prescribing_physician: this.editData.prescribing_physician,
            note: this.editData.note,
            details: this.editData.details,
          },
          this.dataObject.id
        )
        this.$emit('refresh')
        this.$bvModal.hide('viewPrescription')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    instructionFormat(drug) {
      if (drug) {
        let string = (drug.dose !== null ? drug.dose.name : '') + " " + (drug.frequency !== null ? drug.frequency.name : "") + " " + (drug.direction !== null ? drug.direction.name : "") + " " + (drug.duration !== null ? drug.duration.name : "")
        return string
      }
    },
    sigFormatter(direction, duration) {
      if (direction && duration) {
        return direction.name + ' every ' + duration.name
      } else {
        return null
      }
    },
    patientName(patient) {
      if (patient) {
        return (
          patient.salutation + ' ' + patient.firstname + ' ' + patient.lastname
        )
      }
    },
    formatUHID(e) {
      if (e) {
        return e.uhid
      } else {
        return ''
      }
    },
    deleteDrug(e) {
      if (this.dataObject.details.length !== 1) {
        this.dataObject.details.splice(e, 1)
      }
    },
    cancel() {
      this.present = false
      this.$bvModal.hide('viewPrescription')
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
        .getStores({ size: 1000, is_pharmacy: true })
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

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active below version 2.1.8 */
  {
  transform: translateY(10px);
  opacity: 0;
}

.float {
  position: relative;
  top: -10px;
  right: -25px;
}
</style>