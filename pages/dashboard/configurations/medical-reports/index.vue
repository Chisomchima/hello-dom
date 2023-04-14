<template>
  <div>
    <BackwardNavigation />
    <div class="page-heading mb-4">Medical Reports</div>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Services">
        <MedicalReportsServiceList />
      </UtilsCardTab>
      <UtilsCardTab title="Category">
        <MedicalReportsSettingsCategory/>
      </UtilsCardTab>
      <UtilsCardTab title="Service Centers">
        <MedicalReportsSettingsServiceCenters />
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
