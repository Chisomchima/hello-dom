<template>
  <div v-if="active" class="" role="" aria-labelledby="pills-class-board-tab">
    <ul v-if="tabs" class="d-flex list-unstyled border-bottom">
      <li
        v-for="(subTab, index) in subTabs"
        :key="index"
        class="px-2 py-2 pointer text-muted"
        :class="[index === selectedIndex ? 'active' : '']"
        @click="selectTab(index)"
      >
        {{ subTab.title }}
      </li>
    </ul>

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
      handler(newVal) {
        if (this.tabs & (newVal === true)) {
          // this.selectedIndex = 0
          this.subTabs = this.$children
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.tabs) {
      const urlTab = this.checkUrlForTab()
      this.selectTab(urlTab)
    }

    // console.log(this.tabs)
    // // this.$nextTick(() => {
    // // console.log(this.tabs)
    // if (this.tabs) {
    //   this.subTabs = this.$children
    //   console.log(this.subTabs)
    // }
    // // })
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
  background-color: $COLOR_THREE;
  color: white !important;
}
</style>
