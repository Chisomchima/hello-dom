<template>
  <ModalWrapper
    id="add_medical_report"
    size="lg"
    title="Add Medical Report Order"
    :stacking="false"
    @ok="ok()"
    @show="getData()"
    @hide="clear()"
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
                v-model="scheme"
                class="scheme"
                :options="schemes"
                :reduce="(op) => op.payer_scheme.id"
                :get-option-label="(op) => op.payer_scheme.name"
                label="name"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper
              name="Order Report"
              :rules="['required']"
            >
              <VSelect
                v-model="dataObject.package"
                :options="packages"
                :reduce="(opt) => opt.id"
                label="name"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>

          <!-- <div class="col-md-6 mb-2">
            <ValidationProviderWrapper
              name="Category"
              :rules="['required']"
            >
              <VSelect
                v-model="dataObject.category"
                :options="categories"
                :reduce="(opt) => opt.id"
                label="name"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div> -->

          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper
              name="Service Center"
              :rules="['required']"
            >
              <VSelect
                v-model="dataObject.service_center"
                :options="service_centers"
                :reduce="(opt) => opt.id"
                label="name"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>

          <!-- <div class="col-md-6 mb-2">
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
          </div> -->
        </div>
      </form>
      <!-- <div class="col-md-12 my-2">
        <span class="text-grey">Out of pocket Expenditure: </span>
        <span class="">NGN {{ counter }}</span>
      </div> -->
    </ValidationObserver>
    <div>
      <DashboardModalImagingDiagnosis
        :selected-diagnosis="selected"
        @page-changed="getICD10($event, searchParam)"
        @diagnosis="setDiagnosis"
        @refresh="getICD10(1, searchParam)"
        @change="helloWorld"
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
      packages: [],
      dataObject: {
        // img_obv: [],
        // diagnosis: [],
        // ordering_physician: '',
        // referral_facility: '',
        // comments: '',
        // service_center: null,
        // patient: {},
        // stat: false,
        payment_scheme:this.scheme,
        service_center: '',
        package: '',
        patient: {},
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
      return !!this.age.year
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
    // 'dataObject.img_obv': {
    //   async handler(newIds, oldIds) {
    //     const addedPanels = this.observations.filter(
    //       (panel) => newIds.includes(panel.id) && !oldIds.includes(panel.id)
    //     )
    //     const removedPanels = this.observations.filter(
    //       (panel) => oldIds.includes(panel.id) && !newIds.includes(panel.id)
    //     )

    //     for (const panel of addedPanels) {
    //       this.singleLabPanel = panel.bill_item_code
    //       const price = await this.getPrice()
    //       this.selectedLabPanel.push(panel)
    //       this.selectedLabPanelPrices.push(price)
    //       this.counter += price
    //       console.log(this.counter)
    //     }
    //     // Remove the prices of the removed panels from the selected prices array and the counter variable
    //     for (const panelId of removedPanels) {
    //       const priceIndex = this.selectedLabPanel.findIndex(
    //         (panel) => panel.bill_item_code === panelId.bill_item_code
    //       )
    //       if (priceIndex !== -1) {
    //         // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-expressions
    //         this.selectedLabPanel.splice(priceIndex, 1)[0]
    //         const price = this.selectedLabPanelPrices.splice(priceIndex, 1)[0]
    //         this.counter -= price
    //       }
    //     }
    //   },
    // },
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
    
      const obj = this.dataObject.patient
      if (!this.age.year) {
        obj.age = this.formDate
      } else {
        obj.age = this.age
      }
      try {
        const data = await this.$api.medicalReport.createOrder({
          payment_scheme: this.scheme,
          // img_obv: this.dataObject.img_obv,
          // diagnosis,
          // ordering_physician: this.dataObject.ordering_physician,
          // referral_facility: this.dataObject.referral_facility,
          // comments: this.dataObject.comments,
          service_center: this.dataObject.service_center,
          patient: this.dataObject.patient,
          package: this.dataObject.package,
        })
        this.$toast({
          type: 'success',
          text: 'Imaging Order Successful',
        })
        this.$emit('refresh')
        this.$bvModal.hide('add_medical_report')
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
      this.getPackages()
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
      this.$api.medicalReport
        .getServiceCenters({ size: 1000 })
        .then((res) => {
          this.service_centers = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getPackages() {
      this.$api.medicalReport
        .getMedicalRecords({ size: 1000 })
        .then((res) => {
          this.packages = res.results
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
