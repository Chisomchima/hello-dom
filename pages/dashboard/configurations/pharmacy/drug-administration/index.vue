<template>
  <div>
    <BackwardNavigation />
    <div class="page-heading mb-4">Drug Admin Configurations</div>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Generic drug(s)">
        <SettingsPharmacyGenericList />
      </UtilsCardTab>
       <UtilsCardTab title="Categorie(s)">
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