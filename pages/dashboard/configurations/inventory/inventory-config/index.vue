<template>
  <div>
    <BackwardNavigation />
    <div class="page-heading mb-4">Inventory Configurations</div>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Products">
        <SettingsInventoryProductsList />
      </UtilsCardTab>
      <UtilsCardTab title="Store">
        <SettingsInventoryStoreList />
      </UtilsCardTab>
      <UtilsCardTab title="Category">
        <SettingsInventoryCategoryList />
      </UtilsCardTab>
    </UtilsBaseCardTab>

    <!-- 
    Description field changed to text-field =
    Place holder and change name to parse = 
    Name(is drug flag), dec, cost, selling, generic drug, uom, divider(conditional)
    Upload products with spreadsheet and download. =-

    On store modal
    type?? position on modal
    Type on list

    Drug dispense config(generig drug config)

    Date on lower right =
    Open Past record on new tab
    Search filters on tabs.

    Orders on patient search.
    -->
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>