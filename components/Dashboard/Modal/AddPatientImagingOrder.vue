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
          <div class="col-md-12 mb-2">
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
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Email" :rules="[]">
              <input :value="email" type="text" class="form-control" readonly />
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
                  :noDrop="true"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="">
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
            </div>
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
    </ValidationObserver>
    <div>
      <DashboardModalImagingDiagnosis
        @page-changed="getICD10($event, searchParam)"
        @diagnosis="setDiagnosis"
        @searchParam="searchByString"
        :pages="pages"
        :index="role"
        :options="icdTernCollection"
        @refresh="getICD10(1, searchParam)"
        :consultationData="consultationData"
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
  },
  data() {
    return {
      uhid: '',
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
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        await this.save()
      }
    },
    async save() {
      let diagnosis = this.dataObject.diagnosis
      for(let x = 0; x < diagnosis.length; x++){
        delete diagnosis[x].selected
        delete diagnosis[x].confirmed
      }
      try {
        const data = await this.$api.imaging.saveOrder({
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
</style>