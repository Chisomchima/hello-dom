<template>
  <div>
    <BackwardNavigation />
    <div>
      <UtilsHeaderCard
        :enable-action="true"
        :title="data.name"
        :display-key="['description']"
        :data="data"
      ></UtilsHeaderCard>
      <UtilsBaseCardTab>
        <UtilsCardTab title="All">
          <keep-alive>
            <DashboardFinancePriceListAll />
          </keep-alive>
        </UtilsCardTab>
        <UtilsCardTab title="Encounters">
          <keep-alive>
            <DashboardFinancePriceListEncounters />
          </keep-alive>
        </UtilsCardTab>
        <UtilsCardTab title="Laboratory">
          <keep-alive>
            <DashboardFinancePriceListLaboratory />
          </keep-alive>
        </UtilsCardTab>
        <UtilsCardTab title="Imaging">
          <keep-alive>
            <DashboardFinancePriceListImaging />
          </keep-alive>
        </UtilsCardTab>
      </UtilsBaseCardTab>
    </div>
  </div>
</template>

<script>
import TableCompFun from '~/mixins/TableCompFun'
export default {
  mixins: [TableCompFun],
  data() {
    return {
    }
  },
  async asyncData({ $api, route }) {
    try {
      const data = await $api.finance_settings.viewPricelist(route.params.id)
      return {
        data,
      }
    } catch (error) {
      console.log(error)
    }
  },
  watch: {
  },
  methods: {
  },
}
</script>

<style>
</style>