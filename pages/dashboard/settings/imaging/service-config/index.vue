<template>
  <div>
    <BackwardNavigation />
    <div class="page-heading mb-4">Service Configuration</div>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Imaging Observation">
        <DashboardImagingObservationSettings />
      </UtilsCardTab>
      <UtilsCardTab title="Imaging Template">
        <SettingsImagingList />
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>