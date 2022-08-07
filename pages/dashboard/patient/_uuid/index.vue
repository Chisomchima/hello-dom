<template>
  <div>
    <BackwardNavigation />
    <UtilsHeaderCardWithAvatar
      :title="`${data.salutation} ${data.firstname} ${data.lastname}`"
      :data="data"
      :enable-action="true"
      :display-key="[
        'uhid',
        'date_of_birth',
        'gender',
        'marital_status',
        'religion',
        'nationality',
        'phone_number'
      ]"
      @edit="editRoute()"
      @payers="checkPayersDetails"
    >
    </UtilsHeaderCardWithAvatar>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Encounter">
        <keep-alive>
          <DashboardPatientEncounters :data="data" />
        </keep-alive>
      </UtilsCardTab>
      <UtilsCardTab title="Lab Order">
        <keep-alive>
          <div class="card-body">
            <EncountersLabOrders :patientData="data" />
          </div>
        </keep-alive>
      </UtilsCardTab>
      <UtilsCardTab title="Imaging">
        <DashboardPatientImaging :data="data" />
      </UtilsCardTab>
      <UtilsCardTab title="Appointment">
        <h5>Coming Soon</h5>
      </UtilsCardTab>
      <UtilsCardTab title="Finance" :tabs="tabs">
      <div class="d-flex justify-content-end pt-1">
        <div class=" text-14 text-grey text-right p-2">
          Deposit balance: 10,000   |
        </div>
        <div class=" text-14 text-grey text-right p-2">
          Reserve balance: 6,000
        </div>
      </div>
        <UtilsSubCardTab title="Billing">
          <DashboardPatientBilling :data="data" :init-active="true" />
        </UtilsSubCardTab>
        <UtilsSubCardTab title="Payments">
          <DashboardPatientPayment :data="data" :init-active="true" />
        </UtilsSubCardTab>
      </UtilsCardTab>
    </UtilsBaseCardTab>

    <DashboardModalPayerDetails :data="data.payment_scheme"/>
  </div>
</template>

<script>
export default {
  async asyncData({ $api, route }) {
    try {
      const data = await $api.patient.getPatient(route.params.uuid)
      return {
        data,
      }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      tabs: true,
      data: null,
    }
  },
  methods: {
    editRoute() {
      this.$router.push({
        name: 'dashboard-patient-uuid-edit',
        params: {
          uuid: this.data.id,
        },
      })
    },
    checkPayersDetails(){
      console.log('check')
      this.$bvModal.show('payerDetails')
    }
  },
}
</script>

<style lang="scss" scoped>
ul > li {
  padding: 5px;
}
</style>