<template>
  <ModalWrapper
    size="lg"
    title="Add Imaging Order"
    @ok="ok()"
    @show="getData()"
    @hide="clear()"
    id="add_imaging"
    :stacking="false"
  >
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="UHID" :rules="['required']">
              <input
                v-model="dataObject.patient.uhid"
                readonly
                type="text"
                class="form-control"
              />
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
            <ValidationProviderWrapper name="D.O.B" :rules="['']">
              <input :value="dob" type="text" class="form-control" readonly />
            </ValidationProviderWrapper>
          </div>
          <div class="mb-2 col-lg-6 col-md-6 col-sm-6">
            <small class="text-grey text-12">Age (Y-M-D)</small>
            <div class="d-flex">
              <div v-if="fill" class="px-1">
                <input
                  type="text"
                  disabled
                  placeholder="Year"
                  v-model="age.year"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
              <div v-if="!fill" class="px-1">
                <ValidationProviderWrapper name="" :rules="['required']">
                  <input
                    type="number"
                    placeholder="Year"
                    v-model="formDate.year"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </ValidationProviderWrapper>
              </div>
              <div v-if="fill" class="px-1">
                <input
                  type="text"
                  disabled
                  placeholder="Month"
                  v-model="age.month"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
              <div v-if="!fill" class="px-1">
                <input
                  type="number"
                  placeholder="Month"
                  v-model="formDate.month"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
              <div v-if="fill" class="px-1">
                <input
                  type="text"
                  disabled
                  placeholder="Day"
                  v-model="age.day"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
              <div v-if="!fill" class="px-1">
                <input
                  type="number"
                  placeholder="Day"
                  v-model="formDate.day"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
            </div>
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
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Email" :rules="[]">
              <input :value="email" type="text" class="form-control" readonly />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Scheme" :rules="['']">
              <VSelect
              class="scheme"
                v-model="scheme"
                :options="schemes"
                :reduce="(op) => op.payer_scheme.id"
                :getOptionLabel="(op) => op.payer_scheme.name"
                label="name"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper
              name="Service Center"
              :rules="['required']"
            >
              <VSelect
                v-model="dataObject.service_center"
                :options="service_centers"
                label="name"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper
              name="Observations"
              :rules="['required']"
            >
              <VSelect
                v-model="dataObject.img_obv"
                :multiple="true"
                :options="observations"
                :reduce="(opt) => opt.id"
                label="name"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <div class="mb-1">
              <ValidationProviderWrapper name="Diagnosis" :rules="['']">
                <VSelect
                  v-model="dataObject.diagnosis"
                  label="case"
                  multiple
                  taggable
                  @open="showModal"
                  :noDrop="true"
                  :closeOnSelect="true"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <!-- <div class="">
                <span class="pointer text-primary ml-1 d-flex align-items-center">
                  <svg
                    @click="$bvModal.show('diagnosisModal')"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-plus-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"
                    />
                  </svg>
                  <span class="text-12 ml-2">Select diagnosis</span>
                </span>
              </div> -->
          </div>

          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Order Physician" :rules="[]">
              <input
                v-model="dataObject.ordering_physician"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Referral Facility" :rules="[]">
              <input
                v-model="dataObject.referral_facility"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="stat" :rules="[]">
              <input id="" v-model="dataObject.stat" type="checkbox" name="" />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Comments" :rules="['']">
              <textarea
                id=""
                v-model="dataObject.comments"
                class="form-control"
                name=""
                cols="30"
                rows="10"
              ></textarea>
            </ValidationProviderWrapper>
          </div>
        </div>
      </form>
       <div class="col-md-12 my-2">
          <span class="text-grey">Out of pocket Expenditure: </span>
          <span class="">NGN {{ counter }}</span>
        </div>
    </ValidationObserver>
    <div>
      <DashboardModalImagingDiagnosis
        @page-changed="getICD10($event, searchParam)"
        @diagnosis="setDiagnosis"
        @refresh="getICD10(1, searchParam)"
        @change="helloWorld"
        :selectedDiagnosis="selected"
      />
    </div>
  </ModalWrapper>
</template>

<script>
import { debounce } from 'lodash'

export default {
  props: {
    data: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    age: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      counter: 0,
      singleLabPanel: '',
      selectedLabPanelPrices: [],
      selectedLabPanel: [],
      scheme: '',
      uhid: '',
      selected: [],
      present: false,
      service_centers: [],
      observations: [],
      dataObject: {
        img_obv: [],
        diagnosis: [],
        ordering_physician: '',
        referral_facility: '',
        comments: '',
        service_center: null,
        patient: {},
        stat: false,
      },
      formDate: {
        year: '',
        month: '',
        day: '',
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
    schemes() {
      return this.data.payment_scheme
    },
    fill() {
      return this.age.year ? true : false
    },
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

    email() {
      if (this.dataObject.patient) {
        return this.dataObject.patient.email
      }
      return ''
    },
  },
  watch: {
    data: {
      handler(newVal) {
        this.dataObject.patient = newVal
      },
      deep: true,
    },
    'dataObject.diagnosis': {
      handler(newVal) {
        this.selected = newVal
      },
    },
    'dataObject.img_obv': {
      async handler(newIds, oldIds) {
       const addedPanels = this.observations.filter(
        (panel) => newIds.includes(panel.id) && !oldIds.includes(panel.id)
      )
      const removedPanels = this.observations.filter(
        (panel) => oldIds.includes(panel.id) && !newIds.includes(panel.id)
      )

      for (const panel of addedPanels) {
        this.singleLabPanel = panel.bill_item_code
        const price = await this.getPrice()
        this.selectedLabPanel.push(panel)
        this.selectedLabPanelPrices.push(price)
        this.counter += price
        console.log(this.counter)
      }
      // Remove the prices of the removed panels from the selected prices array and the counter variable
      for (const panelId of removedPanels) {
        const priceIndex = this.selectedLabPanel.findIndex(
          (panel) => panel.bill_item_code === panelId.bill_item_code
        )
        if (priceIndex !== -1) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-expressions
          this.selectedLabPanel.splice(priceIndex, 1)[0]
          const price = this.selectedLabPanelPrices.splice(priceIndex, 1)[0]
          this.counter -= price
        }
      }
      },
    }
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        await this.save()
      }
    },
     async getPrice() {
      try {
        const res = await this.$api.laboratory.getPrice({
          itemCode: this.singleLabPanel,
          patientId: this.dataObject.patient.id,
        })
        return res.amount
      } catch (err) {
        console.log(err)
      }
    },
    helloWorld(e) {
      this.present = e
    },
    showModal() {
      if (!this.present) {
        this.$bvModal.show('diagnosisModal')
      } else {
        this.present = false
        this.$bvModal.hide('diagnosisModal')
      }
    },
    async save() {
      let diagnosis = this.dataObject.diagnosis
      for (let x = 0; x < diagnosis.length; x++) {
        delete diagnosis[x].selected
        delete diagnosis[x].confirmed
      }

      let obj = this.dataObject.patient
      if (!this.age.year) {
        obj.age = this.formDate
      } else {
        obj.age = this.age
      }
      try {
        const data = await this.$api.imaging.saveOrder({
          payment_scheme: this.scheme,
          img_obv: this.dataObject.img_obv,
          diagnosis: diagnosis,
          ordering_physician: this.dataObject.ordering_physician,
          referral_facility: this.dataObject.referral_facility,
          comments: this.dataObject.comments,
          service_center: this.dataObject.service_center,
          patient: this.dataObject.patient,
          stat: this.dataObject.stat,
        })
        this.$toast({
          type: 'success',
          text: 'Imaging Order Successful',
        })
        this.$emit('refresh')
        this.$bvModal.hide('add_imaging')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    setDiagnosis(e) {
      this.dataObject.diagnosis = e
    },

    clear() {
      this.dataObject = {
        img_obv: [],
        diagnosis: [],
        ordering_physician: '',
        referral_facility: '',
        comments: '',
        service_center: null,
        patient: {},
        stat: false,
      }
      this.formDate = {
        year: '',
        month: '',
        day: '',
      }
      this.$emit('hide')
    },
    getData() {
      this.dataObject.patient = this.data
      this.getServiceCenter()
      this.getObservation()
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
    getServiceCenter() {
      this.$api.imaging
        .getServiceCenter({ size: 1000 })
        .then((res) => {
          this.service_centers = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getObservation() {
      this.$api.imaging
        .getObservation({ size: 1000 })
        .then((res) => {
          this.observations = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.scheme {
  background-color: #e9edf1;
}
</style>
