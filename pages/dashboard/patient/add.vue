<template>
  <div>
    <div class="row">
      <div class="col-12 mb-3">
        <div class="d-flex justify-content-between">
          <div class="page-heading mb-4">Patient Registration</div>
          <div>
            <BaseButton class="btn-primary btn-lg" @click="submitButton()"
              >Save</BaseButton
            >
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
      @done="submitButton()"
    >
      <template #default="{ currentStep }">
        <DashboardPatientForm
          v-show="currentStep != 3"
          ref="patientForm"
          :current-position="currentStep"
          @input:data="log($event)"
        />

        <div v-show="currentStep === 3">
          <div class="mt-4 w-100">
            <div class="d-flex" v-for="(form, index) in dataVal.payment_scheme" :key="index">
              <div class="d-flex flex-wrap" style="width:98%">
                <div class="col-lg-3 col-md-3 mb-2">
                  <ValidationProviderWrapper name="Scheme" :rules="['']">
                    <VSelect
                      label="name"
                       class="text-14"
                      v-model="form.payer_scheme"
                      :options="payerSchemes"
                    ></VSelect>
                  </ValidationProviderWrapper>
                </div>
<!-- :disabled="(form.payer_scheme_id ? form.payer_scheme_id.type === 'SELF' : form.payer_scheme_id.type === 'INSURANCE') ? true : false" -->
                <div class="col-lg-3 col-md-3 mb-2">
                  <ValidationProviderWrapper name="Enrollee ID" :rules="['']">
                    <input
                      class="form-control"
                      :disabled="form.payer_scheme ? form.payer_scheme.type === 'SELF' : false"
                      v-model="form.enrollee_id"
                      type="text"
                    />
                  </ValidationProviderWrapper>
                </div>
                <div class="col-lg-3 col-md-3 mb-2">
                  <ValidationProviderWrapper name="Relationship" :rules="['']">
                    <VSelect
                      label="name"
                      class="text-14"
                      :disabled="form.payer_scheme ? form.payer_scheme.type === 'SELF' : false"
                      :options="[
                        'PRINCIPAL',
                        'DEPENDANT',
                      ],"
                      v-model="form.relationship"
                    ></VSelect>
                  </ValidationProviderWrapper>
                </div>
                <div class="col-lg-3 col-md-3 mb-2">
                  <ValidationProviderWrapper
                    name="Expiration date"
                    :rules="['']"
                  >
                    <input
                    :disabled="form.payer_scheme ? form.payer_scheme.type === 'SELF' : false"
                      class="form-control"
                      v-model="form.exp_date"
                      type="date"
                    />
                  </ValidationProviderWrapper>
                </div>
              </div>
              <span
                @click="remove(index)"
                class="
                  text-primary
                  mt-3
                  point
                  d-flex
                  align-items-center
                  justify-content-end
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="22"
                  height="22"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" d="M16 12H8" />
                    <circle cx="12" cy="12" r="10" />
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <span>
            <span
            class="text-primary ml-2 point d-flex align-items-center"
          >
            <svg
            @click="double"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="24"
              height="30"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
            >
              <g fill="currentColor">
                <path
                  d="M8 5a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 8 5Z"
                />
                <path
                  d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8Zm6-5a5 5 0 1 0 0 10A5 5 0 0 0 8 3Z"
                />
              </g></svg
            ><span class="text-12">Add</span></span
          >
          </span>
        </div>
      </template>
    </DashboardStepWrapper>
  </div>
</template>

<script>
// import { map } from 'lodash'
export default {
  data() {
    return {
      cPage: 0,
      nPage: 0,
      payerSchemes: [],
      dataVal: {
        payment_scheme: [
          {
            payer_scheme: null,
            enrollee_id: null,
            relationship: null,
            exp_date: null,
          },
        ],
      },
      stepOne: [],
      stepTwo: [],
      stepThree: [],
      stepFour: [],
    }
  },
  mounted() {
    this.$api.finance_settings.getPayerSchemes({ size: 1000 }).then((res) => {
      this.payerSchemes = res.results
    })
  },
  methods: {
    double() {
      this.dataVal.payment_scheme.push({
        payer_scheme: null,
        enrollee_id: null,
        relationship: null,
        exp_date: null,
      })
      console.log(this.dataVal.payment_scheme)
    },
    remove(e) {
      this.dataVal.payment_scheme.splice(e, 1)
    },
    async checkPage({ _currentPage, nextPage }) {
      const data = await this.$refs.patientForm.checkFormValidity()
      if (data) {
        this.$refs.stepWrapper.goto(nextPage)
      }
    },

    async submitButton() {
      try {
        const customObj = this.formatData(this.dataVal)
        console.log(customObj)
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
          middlename: dataObject.middlename ? dataObject.middlename : "",
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

          },
          
          salutation: dataObject.salutation ? dataObject.salutation : null, 
          arms_of_service: dataObject.arms_of_service ? dataObject.arms_of_service : null, 
          arms_no: dataObject.arms_no ? dataObject.arms_no : null, 
          payment_scheme: dataObject.payment_scheme[0].payer_scheme === null ? [] : dataObject.payment_scheme
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
      console.log(e)
      this.dataVal[e.key] = e.value
    },
    formatData(item) {
      const customObj = {
        ...item,
        is_baby: item.is_baby ? item.is_baby : false,
        gender: item.gender ? item.gender.gender : null,
        middlename: item.middlename ? item.middlename : "",
        occupation: item.occupation ? item.occupation : null,
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
        salutation: item.salutation ? item.salutation : null,
        arms_no: item.arms_no ? item.arms_no : null, 
        arms_of_service: item.arms_of_service ? item.arms_of_service : null,
        payment_scheme: item.payment_scheme[0].payer_scheme === null ? [] : item.payment_scheme
      }

      return customObj

      // return item
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