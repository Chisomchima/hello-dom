<template>
  <div>
  <h5>Finance Settings</h5>
    <UtilsBaseCardTab>
         <UtilsCardTab title="Payers">
              <keep-alive>
                  <DashboardFinancePayers />
              </keep-alive>
          </UtilsCardTab>
        <UtilsCardTab title="Schemes">
              <keep-alive>
                  <DashboardFinanceSchemeTab />
              </keep-alive>
        </UtilsCardTab>
         <UtilsCardTab title="Pricelists">
              <keep-alive>
                  <DashboardFinancePriceList />
              </keep-alive>
          </UtilsCardTab>
         <UtilsCardTab title="Billable Items">
         <UtilsBaseCardTab>
          <UtilsSubCardTab title="All" >
           <DashboardFinanceBillableItemsAll />
          </UtilsSubCardTab>
          <UtilsSubCardTab title="Encounters" >
            <DashboardFinanceBillableItemsEncounters />
          </UtilsSubCardTab>
          <UtilsSubCardTab title="Imaging" >
            <DashboardFinanceBillableItemsImaging />
          </UtilsSubCardTab>
          <UtilsSubCardTab title="Laboratory" >
            <DashboardFinanceBillableItemsLaboratory />
          </UtilsSubCardTab>
          </UtilsBaseCardTab>
          </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {
    data() {
    return {
      data: null,
    }
  },
}
</script>

<style>

</style>