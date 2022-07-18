<template>
  <div class="card" :style="{ backgroundColor: backgroundColor }">
    <div class="custom-card-tabs mt-1">
      <ul id="pills-tab" class="nav" role="tablist">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="nav-item d-flex"
          role="presentation"
          @click="selectTab(index)"
        >
          <a     
            :class="[index === selectedIndex ? 'active' : '']"
            class="nav-link d-flex align-items-center"
            data-toggle="pill"
            href="#pills-attendance"
            role="tab"
            aria-controls="pills-attendance"
            aria-selected="true"
            >{{ tab.title }}
            
            </a
          >
        </li>
      </ul>
    </div>

    <div
      id="pills-tabContent"
      class="tab-content card-body"
      :style="{ padding: subTabs ? '0px' : '1.25rem' }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: '',
    },
    counts: {
      type: Array,
      default: [0 , 0]
    }
  },

  data() {
    return {
      selectedTab: 0,
      tabs: [],
      subTabs: false,
      array: [0, 0]
    }
  },
  mounted() {
    this.tabs = this.$children
    const urlTab = this.checkUrlForTab()
    this.selectTab(urlTab)
    
  },
  methods: {
    selectTab(tabIndex) {
      this.array = this.counts
      this.selectedIndex = tabIndex
      // loop over all the tabs
      this.tabs.forEach((control, index) => {
        control.active = index === tabIndex
        this.subTabs = control.tabs
        if (index === tabIndex) {
          // debugger
          this.$router.replace({
            // name: this.$route.name,
            // params: {
            //   ...this.$route.params
            // },
            query: {
              ...this.$route.query,
              tab: index,
            },
          })
        }
      })
      // console.log(this.tabs)
    },
    checkUrlForTab() {
      if (this.$route.query.tab) {
        return Number(this.$route.query.tab)
      }
      return 0
    },
  },
}
</script>

<style lang="scss" scoped></style>
