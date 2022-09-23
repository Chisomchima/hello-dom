<template>
  <div>
    <BackwardNavigation />
    <div class="row">
      <div class="col-12 mb-3">
        <div class="d-flex justify-content-between">
          <div class="page-heading mb-4">Edit Patient</div>
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
          :edit-form-data="data"
          :current-position="currentStep"
          @input:data="log($event)"
        />

        <div v-show="currentStep === 3">
          <div class="mt-4 w-100">
            <div
              class="d-flex"
              v-for="(form, index) in data.payment_scheme"
              :key="index"
            >
              <div class="d-flex flex-wrap" style="width: 98%">
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
                      :disabled="
                        form.payer_scheme
                          ? form.payer_scheme.type === 'SELF'
                          : false
                      "
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
                      :disabled="
                        form.payer_scheme
                          ? form.payer_scheme.type === 'SELF'
                          : false
                      "
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
                      :disabled="
                        form.payer_scheme
                          ? form.payer_scheme.type === 'SELF'
                          : false
                      "
                      class="form-control"
                      v-model="form.exp_date"
                      :min="getDate"
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
            <span class="text-primary ml-2 point d-flex align-items-center">
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
export default {
  async asyncData({ $api, route }) {
    try {
      const data = await $api.patient.getPatient(route.params.uuid)
      const obj = {
        ...data,
        id_type: data.identity.type,
        middlename: data.middlename,
        id_number: data.identity.number,
        id_validity: data.identity.validity,
        address: data.home_address.address,
        address_city: data.home_address.city,
        address_country: data.home_address.country,
        relation_name: data.next_of_kin.name,
        relationship: data.next_of_kin.relationship,
        relation_address: data.next_of_kin.address,
        relation_city: data.next_of_kin.city,
        relation_country: data.next_of_kin.country,
        relation_postal_code: data.next_of_kin.postal_code,
        relation_phone_num: data.next_of_kin.phone_number,
        salutation: data.salutation,
        service_arm_no: data.service_arm_no,
        service_arm: data.service_arm,
        payment_scheme: data.payment_scheme
          ? data.payment_scheme
          : [
              {
                payer_scheme: null,
                enrollee_id: null,
                relationship: null,
                exp_date: null,
              },
            ],
      }
      return {
        data: obj,
      }
    } catch (error) {
      console.log(error)
    }
  },
  mounted() {
    this.$api.finance_settings.getPayerSchemes({ size: 1000 }).then((res) => {
      this.payerSchemes = res.results
    })
    // this.getDate
  },
  data() {
    return {
      data: '',
      getDate: '',
      dataVal: {},
    }
  },
  methods: {
    double() {
      this.data.payment_scheme.push({
        payer_scheme: null,
        enrollee_id: null,
        relationship: null,
        exp_date: null,
      })
      console.log(this.data.payment_scheme)
    },
    remove(e) {
      this.data.payment_scheme.splice(e, 1)
    },
    async checkPage({ _currentPage, nextPage }) {
      const data = await this.$refs.patientForm.checkFormValidity()
      if (data) {
        this.$refs.stepWrapper.goto(nextPage)
      }
    },
    formatData(item) {
      for (const key in item) {
        if (key === 'gender') {
          item[key] = item.gender.gender
        }
        if (key === 'nationality') {
          item[key] = item.nationality.country
        }

        if (key === 'religion') {
          item[key] = item.religion.religion
        }

        if (key === 'marital_status') {
          item[key] = item.marital_status
        }
        if (key === 'salutation') {
          item[key] = item.salutation
        }
        if (key === 'occupation') {
          item[key] = item.occupation
        }
        if (key === 'service_arm') {
          item[key] = item.name
        }
        //  else{
        //   item[key] = item
        //  }
      }

      const customObj = {
        ...this.data,
        ...item,
        next_of_kin: {
          name: item.relation_name
            ? item.relation_name
            : this.data.next_of_kin.name,
          relationship: item.relationship
            ? item.relationship
            : this.data.next_of_kin.relationship,
          address: item.relation_address
            ? item.relation_address
            : this.data.next_of_kin.address,
          city: item.relation_city
            ? item.relation_city
            : this.data.next_of_kin.city,
          country: item.relation_country
            ? item.relation_country
            : this.data.next_of_kin.country,
          postal_code: item.relation_postal_code
            ? item.relation_postal_code
            : this.data.next_of_kin.postal_code,

          phone_number: item.relation_phone_num
            ? item.relation_phone_num
            : this.data.next_of_kin.phone_number,
        },
        salutation: item.salutation
          ? item.salutation.salutations
          : this.data.salutation,
        service_arm_no: item.service_arm_no
          ? item.service_arm_no
          : this.data.service_arm_no,
        service_arm: item.service_arm
          ? item.service_arm
          : this.data.service_arm,
        identity: {
          ...this.data.identity,
          type: item.id_type ? item.id_type : this.data.identity.type,
          number: item.id_number ? item.id_number : this.data.identity.number,
          validity: item.id_validity
            ? item.id_validity
            : this.data.identity.validity,
        },

        home_address: {
          ...this.data.home_address,
          address: item.address ? item.address : this.data.home_address.address,
          city: item.address_city
            ? item.address_city
            : this.data.home_address.city,
          country: item.address_country
            ? item.address_country
            : this.data.home_address.country,
        },
      }

      return customObj
    },

    async submitButton() {
      try {
        const customObj = this.formatData(this.dataVal)
        const res = await this.$api.patient.editPatient(
          this.$route.params.uuid,
          customObj
        )
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
    log(e) {
      this.dataVal[e.key] = e.value
    },
  },
}
</script>

<style lang="scss" scoped>
</style>