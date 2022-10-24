<template>
  <div>
    <BackwardNavigation />
    <div class="page-heading mb-4">Pharmacy configurations</div>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Generic drugs">
        <!-- <SettingsDepartmentList /> -->
      </UtilsCardTab>
       <UtilsCardTab title="Categories">
        <!-- <SettingsPharmacyCategoryList /> -->
      </UtilsCardTab>
       <UtilsCardTab title="Directions">
        <SettingsPharmacyDirectionsList />
      </UtilsCardTab>
       <UtilsCardTab title="Doses">
        <SettingsPharmacyDosesList />
      </UtilsCardTab>
       <UtilsCardTab title="Duration">
        <!-- <SettingsClinicList /> -->
      </UtilsCardTab>
       <UtilsCardTab title="Frequencies">
        <!-- <SettingsClinicList /> -->
      </UtilsCardTab>
       <UtilsCardTab title="Routes">
        <!-- <SettingsClinicList /> -->
      </UtilsCardTab>
       <UtilsCardTab title="Units">
        <!-- <SettingsClinicList /> -->
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>