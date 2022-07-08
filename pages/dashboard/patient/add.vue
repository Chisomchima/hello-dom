<template>
  <div>
    <div class="row">
      <div class="col-12 mb-3">
        <div class="d-flex justify-content-between">
          <div class="page-heading mb-4">Patient Registration</div>
          <div>
            <BaseButton class="btn-primary" @click="submitButton()">Save</BaseButton>
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
        <DashboardPatientForm
          ref="patientForm"
          :current-position="currentStep"
          @input:data="log($event)"
        />
        <!-- <transition name="fade">
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
        </transition> -->
      </template>
    </DashboardStepWrapper>
  </div>
</template>

<script>
import { map } from 'lodash'
export default {
  data() {
    return {
      cPage: 0,
      nPage: 0,
      dataVal: {},
      stepOne: [],
      stepTwo: [],
      stepThree: [],
      stepFour: [],
    }
  },
  mounted() {},
  methods: {
    async checkPage({ _currentPage, nextPage }) {
      const data = await this.$refs.patientForm.checkFormValidity()
      if (data) {
        this.$refs.stepWrapper.goto(nextPage)
      }
    },

    async submitButton() {
      try {
        const customObj = this.formatData(this.dataVal)
        const res = await this.$api.patient.savePatient(customObj)
        this.$router.push({
          name: 'dashboard-patient-uuid',
          params: {
            uuid: res.id,
          },
        })
      } catch (error) {
        console.log(error)
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
          is_baby: dataObject.is_baby ? dataObject.is_baby : false,
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
          salutation: dataObject.salutation.salutations,
        }

        const response = await this.$api.patient.savePatient(customObj)
        this.$router.push({
          name: 'dashboard-patient-uuid',
          params: {
            uuid: response.id,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
    log(e) {
      this.dataVal[e.key] = e.value
      console.log(this.dataVal)
    },
    formatData(item) {
      const customObj = {
        ...item,
        is_baby: item.is_baby ? item.is_baby : false,
        gender: item.gender ? item.gender.gender : null,
        nationality: item.nationality ? item.nationality.country : null,
        religion: item.religion ? item.religion.religion : null,
        marital_status: item.marital_status
          ? item.marital_status.marital_status
          : null,
        state_id: item.state_of_origin ? item.state_of_origin : null,
        identity: {
          type: item.id_type ? item.id_type : null,
          number: item.id_number ? item.id_number : null,
          validity: item.id_validity ? item.id_validity : null,
        },
        home_address: {
          address: item.address ? item.address : null,
          city: item.address_city ? item.address_city : null,
          country: item.address_country ? item.address_country : null,
        },
        next_of_kin: {
          name: item.relation_name ? item.relation_name : null,
          relationship: item.relationship ? item.relationship : null,
          address: item.relation_address ? item.relation_address : null,
          city: item.relation_city ? item.relation_city : null,
          country: item.relation_country ? item.relation_country : null,
          postal_code: item.relation_postal_code
            ? item.relation_postal_code
            : null,

          phone_number: item.relation_phone_num
            ? item.relation_phone_num
            : null,

          // payment_scheme: dataObject
        },
        salutation: item.salutation.salutations,
      }

      return customObj

      return item
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