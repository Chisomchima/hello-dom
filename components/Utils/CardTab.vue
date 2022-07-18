<template>
  <div v-if="active" class="" role="" aria-labelledby="pills-class-board-tab">
    <div v-if="tabs" class="border-bottom">
      <ul class="d-flex list-unstyled mb-0 mx-3">
        <li
          v-for="(subTab, index) in subTabs"
          :key="index"
          class="px-2 py-2 pointer text-muted"
          :class="[index === selectedIndex ? 'active border-bottom border-primary' : '']"
          @click="selectTab(index)"
        >
          {{ subTab.title }}
          <slot name="count"></slot>
        </li>
      </ul>
    </div>
    <slot>
      <h1>Hello Word</h1>
    </slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    tabs: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      subTabs: [],
      active: false,
      selectedIndex: 0,
    }
  },
  watch: {
    active: {
      handler(newVal:any) {
        if (this.tabs && (newVal === true)) {
          // this.selectedIndex = 0
          this.subTabs = this.$children
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.tabs) {
      this.subTabs = this.$children
      const urlTab = this.checkUrlForTab()
      this.selectTab(urlTab)
    }
  },
  methods: {
    selectTab(subTabIndex) {
      this.selectedIndex = subTabIndex
      // loop over all the tabs
      this.subTabs.forEach((control, index) => {
        control.active = index === subTabIndex
        if (index === subTabIndex) {
          // debugger
          this.$router.replace({
            // name: this.$route.name,
            // params: {
            //   ...this.$route.params
            // },
            query: {
              ...this.$route.query,
              subTab: index,
            },
          })
        }
      })
      // console.log(this.tabs)
    },
    checkUrlForTab() {
      if (this.$route.query.subTab) {
        return Number(this.$route.query.subTab)
      }
      return 0
    },
  },
})
</script>

<style scoped lang="scss">
.active {
  // background-color: $COLOR_THREE;
  color: $COLOR_THREE !important;
}
</style>
