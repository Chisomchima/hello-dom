<template>
  <div>
    <div>
      <div class="feel d-flex justify-content-end">
        <div>
          <div class="fix">
            <div class="text-primary">
              <span class="point" @click="newTab">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 16 16">
                  <path fill="currentColor"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TabView :activeIndex="active">
      <TabPanel v-for="(tab, index) in tabs" :index="index">
        <template #header>
          <div class="" v-if="tab === 'Notes'">
            <span class="ml-2 text-14 p-tabview-title">{{ tab }}</span>
          </div>
          <div :id="`tooltip-target-${index}`" class="fold" v-else>
            <span class=" ml-2 text-14 p-tabview-title">{{ tab }}</span>
          </div>
        </template>
        <b-tooltip variant="info" :delay="{ show: 600, hide: 50 }" :placement="'top'" :target="`tooltip-target-${index}`" triggers="hover">
            <span @click="removeTab(index)" class="red point">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
              </svg>
            </span>
          </b-tooltip>
        <div class="my-3" v-show="tab === 'Notes'">
          <EncountersPreviousEncounter />
        </div>

        <div class="my-3" v-show="tab !== 'Notes'">
          <EncountersFile />
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
      tabs: ['Notes'],
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
      this.tabs.push('New')
      this.active = this.tabs.length - 1
    },
    removeTab(index) {
      this.active = index - 1
      this.tabs.splice(index, 1)
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

.p-tabview-nav-content .p-tabview-nav-link .p-tabview-title {
  font-size: 14px !important;
}

.feel {
  height: 0;
  z-index: 10;
}

.fix {
  position: relative;
  z-index: 100;
  top: 13px;
}

.lift {
  z-index: 999;
  position: relative;
  left: 18px;
}

.fold {
  text-overflow: ellipsis;
  min-width: 50px;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
}
.red{
  color: rgb(192, 21, 21)
}
</style>