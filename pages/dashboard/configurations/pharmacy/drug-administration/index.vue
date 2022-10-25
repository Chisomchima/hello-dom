<template>
  <div>
    <BackwardNavigation />
    <div class="page-heading mb-4">Drug administration </div>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Generic drugs">
        <SettingsPharmacyGenericList />
      </UtilsCardTab>
       <UtilsCardTab title="Categories">
        <SettingsPharmacyCategoriesList />
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>