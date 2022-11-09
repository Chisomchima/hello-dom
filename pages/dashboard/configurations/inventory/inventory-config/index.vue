<template>
  <div>
    <BackwardNavigation />
    <div class="page-heading mb-4">Inventory Configurations</div>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Products">
        <SettingsInventoryProductsList />
      </UtilsCardTab>
      <UtilsCardTab title="Store">
        <SettingsPharmacyUnitsList />
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>