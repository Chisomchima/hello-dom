<template>
  <div>
    <BackwardNavigation />
    <h5>Service Centers</h5>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Lab Service Center">
        <keep-alive>
          <SettingsServiceCenters />
        </keep-alive>
      </UtilsCardTab>
      <UtilsCardTab title="Lab Unit">
        <keep-alive>
          <SettingsLabUnit />
        </keep-alive>
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>