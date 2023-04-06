<template>
  <div>
    <BackwardNavigation />
    <h5>Pricelist Items</h5>
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
        <UtilsCardTab title="Nursing">
          <keep-alive>
            <DashboardFinancePriceListNursing />
          </keep-alive>
        </UtilsCardTab>
        <UtilsCardTab title="Inventory">
          <keep-alive>
            <DashboardFinancePriceListInventory />
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
  data() {
    return {
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