<template>
  <div>
     <div class="row">
      <div class="col-12 mb-3">
        <div class="d-flex justify-content-between">
          <div class="page-heading mb-4">Patient Registration</div>
          <div>
            <BaseButton class="btn-primary" @click="submit()">Save</BaseButton>
          </div>
        </div>
      </div>
    </div>

    <DashboardStepWrapper
      ref="stepWrapper"
      :steps="[
        'Personal Detail',
        'Demographics',
        'Next of Kin',
        'Payer Information',
      ]"
      @requestPageChange="checkPage($event)"
      @done="submit()"
    >
      <template #default="{ currentStep }">
        <transition name="fade">
          <DashboardPatientRegistrationStepOne
            v-show="currentStep === 0"
            ref="stepOne"
          />
        </transition>
        <transition name="fade">
          <DashboardPatientRegistrationStepTwo
            v-show="currentStep === 1"
            ref="stepTwo"
          />
        </transition>
        <transition name="fade">
          <DashboardPatientRegistrationStepThree
            v-show="currentStep === 2"
            ref="stepThree"
          />
        </transition>
        <transition name="fade">
          <DashboardPatientRegistrationStepFour
            v-show="currentStep === 3"
            ref="stepFour"
          />
        </transition>
      </template>
    </DashboardStepWrapper>
  </div>
</template>

<script>
import { map } from 'lodash'
export default {
  data() {
    return {
      stepOne: [],
      stepTwo: [],
      stepThree: [],
      stepFour: [],
    }
  },
  mounted() {},
  methods: {
    async checkPage({ currentPage, nextPage }) {
      // console.log(currentPage,nextPage)
      if (currentPage === 0) {
        const data = await this.$refs.stepOne.submit()

        const results = map(data, function (value) {
          return { [value.key]: value.value }
        })

        this.stepOne = results
        // console.log(this.stepOne)
        if (data !== undefined) {
          this.$refs.stepWrapper.goto(nextPage)
          return
        }
        // console.log(this.stepOne)
      }
      if (currentPage === 1) {
        const data = await this.$refs.stepTwo.submit()

        const results = map(data, function (value) {
          return { [value.key]: value.value }
        })
        this.stepTwo = results
        if (data !== undefined) {
          this.$refs.stepWrapper.goto(nextPage)
          return
        }
      }
      if (currentPage === 2) {
        const data = await this.$refs.stepThree.submit()

        const results = map(data, function (value) {
          return { [value.key]: value.value }
        })
        this.stepThree = results
        if (data !== undefined) {
          this.$refs.stepWrapper.goto(nextPage)
          return
        }
      }
      if (currentPage === 3) {
        const data = await this.$refs.stepFour.submit()

        const results = map(data, function (value) {
          return { [value.key]: value.value }
        })
        this.stepFour = results
        if (data !== undefined) {
          this.$refs.stepWrapper.goto(nextPage)
        }
      }
    },

    async submit() {
      try {
        const dataValue = [
          ...this.stepOne,
          ...this.stepTwo,
          ...this.stepThree,
          ...this.stepFour,
        ]

        const dataObject = {}

        dataValue.forEach((item) => {
          for (const [key, value] of Object.entries(item)) {
            dataObject[key] = value
          }
        })

        console.log(dataObject)

        const customObj = {
          ...dataObject,
          gender: dataObject.gender ? dataObject.gender.gender : null,
          nationality: dataObject.nationality
            ? dataObject.nationality.country
            : null,
          religion: dataObject.religion ? dataObject.religion.religion : null,
          marital_status: dataObject.marital_status
            ? dataObject.marital_status.marital_status
            : null,
          state_id: dataObject.state_of_origin
            ? dataObject.state_of_origin
            : null,
          identity: {
            type: dataObject.id_type ? dataObject.id_type : null,
            number: dataObject.id_number ? dataObject.id_number : null,
            validity: dataObject.id_validity ? dataObject.id_validity : null,
          },
          home_address: {
            address: dataObject.address ? dataObject.address : null,
            city: dataObject.address_city ? dataObject.address_city : null,
            country: dataObject.address_country
              ? dataObject.address_country
              : null,
          },
          next_of_kin: {
            name: dataObject.relation_name ? dataObject.relation_name : null,
            relationship: dataObject.relationship
              ? dataObject.relationship
              : null,
            address: dataObject.relation_address
              ? dataObject.relation_address
              : null,
            city: dataObject.relation_city ? dataObject.relation_city : null,
            country: dataObject.relation_country
              ? dataObject.relation_country
              : null,
            postal_code: dataObject.relation_postal_code
              ? dataObject.relation_postal_code
              : null,

            phone_number: dataObject.relation_phone_num
              ? dataObject.relation_phone_num
              : null,

            // payment_scheme: dataObject
          },
          salutation:dataObject.salutation.salutations
        }

       const response = await this.$api.patient.savePatient(customObj)
        this.$router.push({
          name:'dashboard-patient-uuid',
          params:{
            uuid:response.id
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>