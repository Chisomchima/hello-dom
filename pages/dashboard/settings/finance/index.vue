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
                    <DashboardFinanceSchemes />
                </keep-alive>
          </UtilsCardTab>
         <UtilsCardTab title="Price Lists">
                <keep-alive>
                    <DashboardFinancePriceList />
                </keep-alive>
          </UtilsCardTab>
         <UtilsCardTab title="Billable Items">
                <keep-alive>
                    <DashboardFinanceBillableItems />
                </keep-alive>
          </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>