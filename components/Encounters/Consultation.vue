<template>
  <div>
    <div>
      <div class="feel d-flex justify-content-end">

        <div>
          <div class="fix">
            <div class="text-primary">
              <span v-if="!showOptions" class="point text-end" @click="startChart">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 16 16">
                  <path fill="currentColor"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
              </span>
              <span v-else class="point text-end" @click="startChart">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                  <path fill="currentColor"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                </svg>
              </span>
            </div>

            <div v-if="showOptions" class="options">
              <v-select :dropdownShouldOpen="(noDrop, open) => {
                return noDrop ? true : open;
              }" style="height: 35px" v-model="template" class="style-chooser text-grey text-14"
                placeholder="Templates" :options="presets" @option:selected="setTab" @search="(search, loading) => {
                  searchTemplates(search, loading)
                }" label="title">
              </v-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TabView :activeIndex="active">
      <TabPanel v-for="(tab, index) in tabs" :index="index">
        <template #header>
          <div class="" v-if="tab.label === 'Notes'">
            <span class="ml-2 text-14 p-tabview-title">{{ tab.label }}</span>
          </div>
          <div :id="`tooltip-target-${index}`" class="fold" v-else>
            <span class=" ml-2 text-14 p-tabview-title">{{ tab.label }}</span>
          </div>
        </template>
        <b-tooltip variant="light" :delay="{ show: 300, hide: 50 }" :placement="'righttop'"
          :target="`tooltip-target-${index}`" triggers="hover">
          <span @click="removeTab(index)" class="red point">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24">
              <path fill="currentColor" d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
            </svg>
          </span>
        </b-tooltip>
        <div @click="showOptions = false" class="my-3" v-show="tab.label === 'Notes'">
          <EncountersPreviousEncounter @reset="fetchRecord = false" :fetchRecord="fetchRecord"
            :consultationData="consultationData" />
        </div>

        <div @click="showOptions = false" class="my-3" v-show="tab.label !== 'Notes'">
          <EncountersFile @routeTopage="gotoPageOne" :consultationData="consultationData" :data="tab.data" />
        </div>
      </TabPanel>
    </TabView>


  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  props: {
    consultationData: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      tabs: [{
        label: 'Notes',
        data: {}
      }],
      active: 0,
      template: null,
      fetchRecord: false,
      selected: false,
      showOptions: false,
      presets: [],
      filter: {
        size: 1000,
        title: '',
        clinic: ''
      }
    };
  },
  computed: {
    content() {
      return this.template
    },
    clinicID() {
      return this.consultationData.clinic.id
    }
  },
  methods: {
    async startChart() {
      this.showOptions = !this.showOptions
      if (this.showOptions == true) {
        // this.filter.clinic = this.clinicID
        let response = await this.$api.templates.getEncTemplates(this.filter)
        this.presets = response.results
      }
    },
    searchTemplates: debounce(async function (search, loading) {
      loading(true)
      this.filter.title = search
      if(search === ''){
        // this.filter.clinic = this.clinicID
      }
      else{
        this.filter.clinic = ''
      }
      let response = await this.$api.templates.getEncTemplates(this.filter)
      this.presets = response.results
      return loading(false)
    }, 1000),
    clearance() {
      this.$emit("clearance", true);
    },
    refresh() {
      this.$emit("refreshMe", true);
    },
    setTab(e) {
      this.tabs.push({
        label: e.title,
        data: e
      })
      this.showOptions = false,
        this.template = null
      this.active = this.tabs.length - 1
    },
    gotoPageOne() {
      if (this.active === this.tabs.length - 1) {
        console.log('Pass')
        this.active = 0
        this.fetchRecord = true
      }

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
  right: 0px;
  top: 13px;
  width: 20px
}

.options {
  position: relative;
  z-index: 105;
  top: 22px;
  right: 220px;
  width: 15rem;
  background-color: #ffffff;
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

.red {
  color: rgb(192, 21, 21)
}
</style>