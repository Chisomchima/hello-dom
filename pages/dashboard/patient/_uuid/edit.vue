<template>
  <div>
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
          ref="patientForm"
          :edit-form-data="data"
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
export default {
  async asyncData({ $api, route }) {
    try {
      const data = await $api.patient.getPatient(route.params.uuid)
      const obj = {
        ...data,
        id_type: data.identity.type,
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
        state_of_origin: data.state_id,
      }
      return {
        data: obj,
      }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      data: '',
      dataVal: {},
    }
  },
  methods: {
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
          item[key] = item.marital_status.marital_status
        }
        if (key === 'salutation') {
          item[key] = item.salutation.salutations
        }
         if(key === 'occupation'){
          item[key] = item.occupations.occupation
         }
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
        identity: {
          ...this.data.identity,
          type: item.id_type ? item.id_type : this.data.identity.type,
          number: item.id_number ? item.id_number : this.data.identity.number,
          validity: item.id_validity ? item.id_validity : this.data.identity.validity,
        },
        home_address: {
          ...this.data.home_address,
          address: item.address ? item.address : this.data.home_address.address,
          city: item.address_city ? item.address_city : this.data.home_address.city,
          country: item.address_country ? item.address_country : this.data.home_address.country,
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