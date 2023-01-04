<template>
  <div>
    <BackwardNavigation />
    <div class="page-heading mb-4">OPD Configurations</div>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Departments">
        <SettingsDepartmentList />
      </UtilsCardTab>
       <UtilsCardTab title="Clinics">
        <SettingsClinicList />
      </UtilsCardTab>
       <UtilsCardTab title="Templates">
        <SettingsTemplateList />
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>