<template>
    <div>
      <BackwardNavigation />
      <div class="page-heading mb-4">Payments</div>
      <UtilsBaseCardTab>
        <UtilsCardTab title="Summary">
          <ReportsPaymentsSummary />
        </UtilsCardTab>
         <UtilsCardTab title="Details">
          <ReportsPaymentsDetailed />
        </UtilsCardTab>
      </UtilsBaseCardTab>
    </div>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style lang="scss" scoped>
  </style>