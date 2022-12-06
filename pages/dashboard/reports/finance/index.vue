<template>
    <div>
      <BackwardNavigation />
      <div class="page-heading mb-4">Finance Reports</div>
      <UtilsBaseCardTab>
        <UtilsCardTab title="Summary">
          <ReportsFinanceSummary />
        </UtilsCardTab>
         <UtilsCardTab title="Details">
          <ReportsFinanceDetailed />
        </UtilsCardTab>
      </UtilsBaseCardTab>
    </div>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style lang="scss" scoped>
  </style>