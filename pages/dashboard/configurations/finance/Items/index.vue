<template>
  <div>
    <BackwardNavigation />
    <h5>Finance Configurations</h5>
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
        <TabView @tab-click="showMe" class="tabview-custom">
          <TabPanel class="dark-panel">
            <template #header>
              <span class="ml-2">All</span>
            </template>
            <div v-if="activeIndex === 0">
              <DashboardFinanceBillableItemsAll />
            </div>
          </TabPanel>
          <TabPanel class="dark-panel">
            <template #header>
              <span class="ml-2">Encounters</span>
            </template>
            <div v-if="activeIndex === 1">
              <DashboardFinanceBillableItemsEncounters />
            </div>
            
          </TabPanel>
          <TabPanel class="dark-panel">
            <template #header>
              <span class="ml-2">Imaging</span>
            </template>
            <div v-if="activeIndex === 2">
              <DashboardFinanceBillableItemsImaging />
            </div>
          </TabPanel>
          <TabPanel class="dark-panel">
            <template #header>
              <span class="ml-2">Laboratory</span>
            </template>
            <div v-if="activeIndex === 3">
              <DashboardFinanceBillableItemsLaboratory />
            </div>
          </TabPanel>
          <TabPanel class="dark-panel">
            <template #header>
              <span class="ml-2">Nursing</span>
            </template>
            <div v-if="activeIndex === 4">
              <DashboardFinanceBillableItemsNursing />
            </div>
          </TabPanel>
        </TabView>
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      activeIndex: 0
    }
  },

  methods: {
    showMe(e) {
      switch (e.index) {
        case 0:
          this.activeIndex = 0
          break;
        case 1:
          this.activeIndex = 1
          break;
        case 2:
          this.activeIndex = 2
          break;
        case 3:
          this.activeIndex = 3
          break;
        case 4:
          this.activeIndex = 4
          break;
        default:
          this.activeIndex = 0
      }
    },
  }
}
</script>

<style lang="scss">
.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: #ffffff;
  border-color: $COLOR_THREE !important;
  color: $COLOR_THREE;
  font-size: 14px;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  border: solid #dee2e6;
  border-width: 0 0 2px 0;
  border-color: transparent transparent #dee2e6 transparent;
  background: #ffffff;
  font-size: 14px;
  color: #6c757d;
  padding: 1rem;
  font-weight: 600;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  transition: box-shadow 0.2s;
  margin: 0 0 -2px 0;
}

.p-tabview .p-tabview-nav {
  background: #ffffff;
  border: 1px solid #dee2e6;
  /* border-width: 0 0 2px 0; */
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 0.1rem #fff;
}

li {
  cursor: pointer;
  border: 0.5px solid #fff;
}
</style>
