<template>
    <div>
      <BackwardNavigation />
      <div class="page-heading mb-4">Nursing Configurations</div>
      <UtilsBaseCardTab>
        <UtilsCardTab title="Nursing Stations">
          <SettingsStationList />
        </UtilsCardTab>
         <UtilsCardTab title="Nursing Services">
          <SettingsServicesList />
        </UtilsCardTab>
      </UtilsBaseCardTab>
    </div>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style lang="scss" scoped>
  </style>