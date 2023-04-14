<template>
  <div>
    <b-modal
      size="lg"
      id="viewMedicalReport"
      title="Medical Report details"
      ref="modal"
      centered
      :no-stacking="false"
      :no-close-on-backdrop="true"
      :scrollable="false"
    >
      <div class="row text-14 special">
        <div class="col-md-12">
          <p>BILL CODE: {{ details.bill_item_code }}</p>
        </div>
        <div class="col-md-12">
          <p>CREATED AT: {{ details.created_at }}</p>
        </div>
        <div class="col-md-12">
          <p>CREATED BY: {{ details.created_by }}</p>
        </div>
        <div class="col-md-12">
          <p>UPDATED AT: {{ details.updated_at }}</p>
        </div>
        <div class="col-md-12">
          <p>UPDATED BY: {{ details.updated_by }}</p>
        </div>
        <div class="col-md-12">
          <p>COST PRICE: {{ details.cost_price }}</p>
        </div>
        <div class="col-md-12">
          <p>BILL PRICE: {{ details.bill_price }}</p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  props: {
    details: {
      type: Object,
      require: false,
      default: () => ({}),
    },
  },
  // data() {
  //   return {
  //     uhid: '',
  //     selected: [],
  //     present: false,
  //     downloading: false,
  //     printing: false,
  //     busy: false,
  //     generic_drug: [],
  //     doses: [],
  //     units: [],
  //     frequencies: [],
  //     durations: [],
  //     directions: [],
  //     routes: [],
  //     products: [],
  //     stores: [],
  //     editData: {
  //       details: [
  //         {
  //           generic_drug: null,
  //           product: null,
  //           dose: null,
  //           unit: null,
  //           route: null,
  //           frequency: null,
  //           direction: null,
  //           duration: null,
  //           dispense_quantity: 1,
  //           status: 'FULFILLED IN',
  //           note: '',
  //         },
  //       ],
  //       patient: {},
  //       source: 'OPD',
  //       prescribing_physician: '',
  //       store: null,
  //     },
  //   }
  // },
  // computed: {
  //   gender() {
  //     if (this.dataObject.patient) {
  //       return this.dataObject.patient.gender
  //     }
  //     return ''
  //   },

  //   prescriptionDate(){
  //     return DateTime.fromISO(this.dataObject.created_at).toFormat('yyyy-LL-dd, T')
  //   },

  //   dob() {
  //     if (this.dataObject.patient) {
  //       return this.dataObject.patient.date_of_birth
  //     }
  //     return ''
  //   },

  //   physician() {
  //     if (Object.keys(this.editData.prescribing_physician).length > 0) {
  //       return (
  //         this.dataObject.prescribing_physician.first_name +
  //         ' ' +
  //         this.dataObject.prescribing_physician.last_name
  //       )
  //     }
  //     else {
  //       return 'nil'
  //     }

  //   },
  // },
  // watch: {
  //   uhid: debounce(async function (newVal) {
  //     this.downloading = true
  //     const results = await this.getPatientByUHID(newVal)
  //     if (results) {
  //       this.dataObject.patient = results
  //       this.downloading = false
  //     } else {
  //       this.dataObject.patient = {}
  //       this.downloading = false
  //     }
  //   }, 1000),
  //   dataObject() {
  //     this.editData.store = this.dataObject.store.id
  //     this.editData.created_at = this.dataObject.created_at
  //     this.editData.patient = this.dataObject.patient
  //     this.editData.prescribing_physician = this.dataObject.prescribing_physician
  //     this.editData.details = this.dataObject.details
  //   }
  // },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        this.save()
      }
    },
    editMode() {
      this.present = true
    },
    async confirm() {
      const result = await this.showConfirmMessageBox(
        'Do you want to confirm this prescription ?',
        'Yes'
      )
      if (result) {
        this.confirmPrescription()
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
        let string =
          (drug.dose !== null ? drug.dose.name : '') +
          ' ' +
          (drug.frequency !== null ? drug.frequency.name : '') +
          ' ' +
          (drug.direction !== null ? drug.direction.name : '') +
          ' ' +
          (drug.duration !== null ? drug.duration.name : '')
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
  transition: all 0.3s ease;
}

.special p {
  margin-bottom: 0.5rem;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
  .slide-fade-leave-to
  
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

.float {
  position: relative;
  top: -3px;
  right: -17px;
}
</style>
