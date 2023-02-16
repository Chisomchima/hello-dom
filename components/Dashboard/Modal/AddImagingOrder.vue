<template>
  <ModalWrapper size="lg" title="Add Imaging Order" @ok="ok()" @show="getData()" @hide="clear()" :stacking="false">
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="UHID" :rules="['']">
              <input v-model="uhid" type="text" class="form-control" />
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
                <ValidationProviderWrapper name="" :rules="['required']">
                  <input type="number" placeholder="Year" v-model="formDate.year"
                    class="form-control ng-untouched ng-pristine ng-valid" />
                </ValidationProviderWrapper>
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

          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Service Center" :rules="['required']">
              <VSelect v-model="dataObject.service_center" :options="service_centers" label="name">
              </VSelect>
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Scan" :rules="['required']">
              <VSelect v-model="dataObject.img_obv" :multiple="true" :options="observations" :reduce="(opt) => opt.id"
                label="name">
              </VSelect>
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <div class="mb-1">
              <ValidationProviderWrapper name="Diagnosis" :rules="['']">
                <VSelect v-model="dataObject.diagnosis" label="case" multiple taggable @open="showModal"
                  :closeOnSelect="true" :noDrop="true">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
          </div>

          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Order Physician" :rules="[]">
              <input v-model="dataObject.ordering_physician" type="text" class="form-control" />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper name="Referral Facility" :rules="[]">
              <input v-model="dataObject.referral_facility" type="text" class="form-control" />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="stat" :rules="[]">
              <input id="" v-model="dataObject.stat" type="checkbox" name="" />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Comments" :rules="['']">
              <textarea id="" v-model="dataObject.comments" class="form-control" name="" cols="30" rows="10"></textarea>
            </ValidationProviderWrapper>
          </div>
        </div>
      </form>
    </ValidationObserver>

    <div>
      <DashboardModalImagingDiagnosis @page-changed="getICD10($event, searchParam)" @refresh="getICD10(1, searchParam)"
        @diagnosis="setDiagnosis" @change="helloWorld" :selectedDiagnosis="selected" />
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
      service_centers: [],
      observations: [],
      formDate: {
        year: '',
        month: '',
        day: ''
      },
      age: {
        year: '',
        month: '',
        day: '',
      },

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
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject = newVal
        }
      },
      immediate: true,
      deep: true,
    },
    'dataObject.diagnosis': {
      handler(newVal) {
        this.selected = newVal
      }
    },

    uhid: debounce(async function (newVal) {
      const results = await this.getPatientByUHID(newVal)
      if (results) {

        this.dataObject.patient = results

        if (results.date_of_birth !== null || results.date_of_birth !== '') {
          this.calcAge(results.date_of_birth)
          this.dataObject.patient.age = this.age
          // this.fill = false
        }
        else {
          // this.fill = true
          this.dataObject.patient.age = {
            year: '',
            month: '',
            day: '',
          }
        }
      } else {
        this.dataObject.patient = {}
      }
    }, 500),
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.dataObject.id) {
          this.edit()
        } else {
          this.save()
        }
      }
    },
    helloWorld(e) {
      this.present = e
    },
    async save() {
      if (this.dataObject.patient.date_of_birth == null || this.dataObject.patient.date_of_birth == '') {
        this.dataObject.patient.age = this.formDate
      }
      let diagnosis = this.dataObject.diagnosis
      for (let x = 0; x < diagnosis.length; x++) {
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
      }
      else {
        this.present = false
        this.$bvModal.hide('diagnosisModal')
      }
    },
    closeModal() {
      this.$bvModal.hide('diagnosisModal')
    },
    async edit() {
      try {
        const data = await this.$api.imaging.editLabUnit(
          this.dataObject.id,
          this.dataObject
        )
        this.$emit('refresh')
        this.$bvModal.hide('modal')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    setDiagnosis(e) {
      this.$bvModal.hide('diagnosisModal')
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
      this.uhid = ''
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
      this.$emit('hide')
    },
    getData() {
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

<style lang="scss" scoped></style>