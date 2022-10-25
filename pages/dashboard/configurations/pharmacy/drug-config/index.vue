<template>
  <div>
    <BackwardNavigation />
    <div class="page-heading mb-4">Drug configurations</div>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Doses">
        <SettingsPharmacyDosesList />
      </UtilsCardTab>
      <UtilsCardTab title="Units">
        <SettingsPharmacyUnitsList />
      </UtilsCardTab>
      <UtilsCardTab title="Routes">
        <SettingsPharmacyRoutesList />
      </UtilsCardTab>
      <UtilsCardTab title="Frequencies">
        <SettingsPharmacyFrequenciesList />
      </UtilsCardTab>
      <UtilsCardTab title="Directions">
        <SettingsPharmacyDirectionsList />
      </UtilsCardTab>
      <UtilsCardTab title="Durations">
        <SettingsPharmacyDurationList />
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>