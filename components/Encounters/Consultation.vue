<template>
  <div>
    <!-- <UtilsBaseCardTab>
      <UtilsCardTab v-for="(tab, index) in tabs" :index="index" :title="tab">

        <div class="my-3" v-if="tab === 'Current'">
          <EncountersPreviousEncounter @newTab="newTab" />
        </div>

        <div class="my-3" v-if="tab === 'New'">
          <EncountersFile @newTab="newTab" />
        </div>
      </UtilsCardTab>
    </UtilsBaseCardTab> -->

    <TabView :activeIndex="active">
        <TabPanel v-for="(tab, index) in tabs" :index="index" :header="tab">
          <div class="my-3" v-if="tab === 'Current'">
          <EncountersPreviousEncounter @newTab="newTab" />
        </div>

        <div class="my-3" v-if="tab === 'New'">
          <EncountersFile @newTab="newTab" />
        </div>
        </TabPanel>
    </TabView>
  </div>
</template>

<script>
export default {
  props: {
    consultationData: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      tabs: ['Current',],
      active: 0
    };
  },
  watch: {

  },
  mounted() { },
  methods: {
    clearance() {
      this.$emit("clearance", true);
    },
    refresh() {
      this.$emit("refreshMe", true);
    },
    newTab() {
      if(this.tabs.length < 2){
        this.tabs.push('New')
        this.active = this.tabs.length - 1
      }
    }
  },
};
</script>

<style lang="scss">
.p-tabview .p-tabview-panels {
  background: #ffffff;
  padding: 0 1rem 1rem 1rem;
  border: 0 none;
  color: #495057;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.p-tabview-nav-content .p-tabview-nav-link .p-tabview-title{
  font-size: 14px !important;
}

</style>