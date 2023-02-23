<template>
  <div>
    <BackwardNavigation />
    <div class="page-heading mb-4">Drug Dispense Configurations</div>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Pharmacy">
        <SettingsPharmacyStoreList />
      </UtilsCardTab>
      <UtilsCardTab title="Dose(s)">
        <SettingsPharmacyDosesList />
      </UtilsCardTab>
      <UtilsCardTab title="Unit(s)">
        <SettingsPharmacyUnitsList />
      </UtilsCardTab>
      <UtilsCardTab title="Route(s)">
        <SettingsPharmacyRoutesList />
      </UtilsCardTab>
      <UtilsCardTab title="Frequencie(s)">
        <SettingsPharmacyFrequenciesList />
      </UtilsCardTab>
      <UtilsCardTab title="Direction(s)">
        <SettingsPharmacyDirectionsList />
      </UtilsCardTab>
      <UtilsCardTab title="Duration(s)">
        <SettingsPharmacyDurationList />
      </UtilsCardTab>
      <UtilsCardTab title="Template(s)">
        <SettingsPharmacyTemplatesList />
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>