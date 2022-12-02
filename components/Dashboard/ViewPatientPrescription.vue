<template>
    <b-modal @show="getData" size="lg" id="viewPatientPrescription" title="View Prescription" ref="modal" centered :no-stacking="false"
      :no-close-on-backdrop="true" :scrollable="false" ok-title="Save" @hide="cancel">
      <template #modal-header="{ close }">
        <slot name="header" :close="close">
          <h5 class="mb-0 mt-2">View Prescription</h5>
          <div class="d-flex align-items-center">
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
        <div class=" w-100 d-flex px-5 justify-content-center">
          <div>
            <button size="sm" variant="light" class="px-5 btn btn-light text-secondary mr-2" @click="cancel()">
              Close
            </button>
          </div>
        </div>
      </template>
      <div v-if="!present">
        <div class="row">
          <div class="col-md-4 mb-2">
              <ValidationProviderWrapper name="Patient Name" :rules="['required']">
                <input :value="patientName(editData.patient)" type="text" class="form-control" readonly />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-4 mb-2">
              <ValidationProviderWrapper name="D.O.B" :rules="['required']">
                <input :value="dob" type="text" class="form-control" readonly />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-4 mb-2">
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
        </div>
        <div class="text-14" v-for="(drug, index) in editData.details" :key="index">
          <p class="text-info text-16">Prescriptions</p>
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
            <div>
              <p class="text-16 mb-1 text-decoration-underline"><u>Note</u></p>
              <div class="text-14 text-info">
                {{ drug.note }}
              </div>
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
     
      dataObject() {
        this.editData.store = this.dataObject.store.id
        this.editData.patient = this.dataObject.patient
        this.editData.prescribing_physician = this.dataObject.prescribing_physician
        this.editData.details = this.dataObject.details
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
     
     
      async save() {
        try {
          const data = await this.$api.pharmacy.updatePrescription(
            {
              store: this.editData.store,
              patient: this.dataObject.patient,
              source: this.dataObject.source,
              prescribing_physician: this.editData.prescribing_physician,
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
        this.getStores()
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
    top: -3px;
    right: -17px;
  }
  </style>