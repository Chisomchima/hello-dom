<template>
  <div>
    <UtilsHeaderCard
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
        'phone_number',
      ]"
    >
    </UtilsHeaderCard>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Encounter">
        <keep-alive>
          <DashboardPatientEncounters :data="data" />
        </keep-alive>
      </UtilsCardTab>
      <UtilsCardTab title="Lab Order">
        <keep-alive>
          <DashboardPatientLabOrder :data="data" />
        </keep-alive>
      </UtilsCardTab>
      <UtilsCardTab title="Appointment">
        <h5>Coming Soon</h5>
      </UtilsCardTab>
      <UtilsCardTab title="Bill Estimate">
        <h5>Coming Soon</h5>
      </UtilsCardTab>
    </UtilsBaseCardTab>
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
}
</script>

<style lang="scss" scoped>
</style>