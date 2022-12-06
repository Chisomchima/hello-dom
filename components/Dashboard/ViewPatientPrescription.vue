<template>
  <b-modal @show="getData" size="lg" id="viewPatientPrescription" title="View Prescription" ref="modal" centered
    :no-stacking="false" :no-close-on-backdrop="true" :scrollable="false" ok-title="Save" @hide="cancel">
    <template #modal-header="{ close }">
      <slot name="header" :close="close">
        <h5 class="mb-0 mt-2">Prescription details</h5>
        <div class="d-flex align-items-center">
          <span @click="printPrescription" class="mx-2 text-primary pointer">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="22" height="24"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
              <path fill="currentColor"
                d="M5 4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V5h.5A2.5 2.5 0 0 1 18 7.5v5a1.5 1.5 0 0 1-1.5 1.5H15v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 15.5V14H3.5A1.5 1.5 0 0 1 2 12.5v-5A2.5 2.5 0 0 1 4.5 5H5v-.5Zm9 0a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V5h8v-.5Zm-8 7v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5Z" />
            </svg>
            <span class="ml-2 mt-2">
              <b-spinner style="width: 1.1rem; height: 1.1rem" v-if="printing" variant="primary" type="grow"
                label="grow">
              </b-spinner>
            </span>
          </span>
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
      <div class="row text-14 special">

        <div class="col-md-12">
          <p>UHID: {{ formatUHID(dataObject.patient) }}</p>
        </div>
        <div class="col-md-12">
          <p>Patient Name: {{ patientName(dataObject.patient) }}</p>
        </div>
        <div class="col-md-12">
          <p>DOB: {{ dob }}</p>
        </div>
        <div class="col-md-12">
          <p>Age:</p>
        </div>
        <div class="col-md-12">
          <p>Gender: {{ gender }}</p>
        </div>
        <div class="col-md-12">
          <hr class="mt-0">
        </div>
        <div class="col-md-6">
          <p>Prescription date: {{ prescriptionDate }} </p>
        </div>

        <div class="col-md-6">
          <p>Prescription ID: {{ dataObject.prc_id }}</p>
        </div>
        <div class="col-md-6">
          <p>Prescribing Physician: {{ physician }}</p>
        </div>
        <!-- <div class="col-md-4 mb-2">
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
        </div> -->

        <div class="col-md-12 mb-2">
          <ValidationProviderWrapper name="Pharmacy*" :rules="['']">
            <VSelect v-model="editData.store" :disabled="!present" :options="stores" :reduce="(opt) => opt.id" label="name">
            </VSelect>
          </ValidationProviderWrapper>
        </div>

        <!-- <div class="col-md-12 mb-2">
          <ValidationProviderWrapper name="Prescribing Physician" :rules="[]">
            <input :value="physician ? physician : ''" type="text" readonly class="form-control" />
          </ValidationProviderWrapper>
        </div> -->
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
import { DateTime } from 'luxon'
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
      printing: false,
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
    prescriptionDate(){
      return DateTime.fromISO(this.dataObject.created_at).toFormat('yyyy-LL-dd, T')
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

    async printPrescription() {
      this.printing = true
      const response = await fetch(
        `${process.env.BASE_URL}pharmacy/prescriptions/${this.dataObject.id}/download/`,
        {
          headers: {
            Authorization: `Token ${this.$store.state.auth.token}`,
          },
        }
      )
      if (response.status === 200) {
        const data = await response.blob()
        const objectURL = URL.createObjectURL(data)
        const link = document.createElement('a')
        link.download = `Prescription Report - ${this.editData.patient.uhid}`
        link.href = objectURL
        this.printing = false
        // this.filter(1)
        link.click()
      } else if (response.status === 403) {
        this.printing = false
        this.$toast({
          type: 'info',
          text: `You don't have the permission to perform this action`,
        })
      } else {
        this.printing = false
        this.$toast({
          type: 'error',
          text: `An error occured`,
        })
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

    getData() {
      this.getStores()
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

.special p {
  margin-bottom: .5rem;
}
</style>