<template>
  <div>
    <UtilsBaseCardTab>
      <UtilsCardTab v-for="(tab, index) in tabs" :index="index" :title="tab">
        <!-- <EncountersExam/> -->
        <div class="d-flex justify-content-between m-3" v-if="tab === 'Current'">
          <h3>Current</h3>
          <button @click.prevent="newTab">Chart</button>
        </div>
        <h3 v-if="tab === 'New'">New</h3>
      </UtilsCardTab>
    </UtilsBaseCardTab>
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
      tabs: ['Current',]
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
    newTab(){
      this.tabs.push('New')
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
</style>