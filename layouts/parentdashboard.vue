<template>
  <div>
    <Transition name="slide-fade">
      <div v-show="$nuxt.isOffline" class="absolutebanner">
        <OfflineDefault />
      </div>
    </Transition>

    <Transition name="slide-fade">
      <div class="site-nav" :class="{ offline: $nuxt.isOffline }">
        <LayoutAuthParentSideBar />
        <LayoutAuthNavbar />
        <LayoutAuthParentTopbar @open-sidebar="openSide">
          <!-- <div
            style="cursor: pointer; color: #1070b7"
            class="mr-2"
            @click="$router.go(-1)"
          >
            <span
              class="iconify"
              data-icon="akar-icons:arrow-left"
              data-width="15"
              data-height="15"
            ></span>
          </div> -->
        </LayoutAuthParentTopbar>
      </div>
    </Transition>
    <div class="site-container blueborder">
      <div class="container-fluid ml-0 mt-2 pt-1">
        <!-- <breadcrumb /> -->
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // layout: 'default',
  data() {
    return {
      isMobile: true,
      isShowing: false,
    }
  },
  created() {
    this.$nuxt.$on('openSidebar', () => {
      this.isMobile = !this.isMobile
      this.isShowing = !this.isShowing
    })
  },
  methods: {
    openSide() {
      console.log('object')
      alert('hey')
      this.isMobile = !this.isMobile
    },
  },
}
</script>

<style lang="css" scoped>
.site-nav.offline {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  width: 100%;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  z-index: 999;
}

.blueborder {
  box-shadow: 0px 1px 0px 0px #e8e8ed;
  padding: 0.61rem !important;
  height: 100vh;
}

.absolutebanner {
  position: fixed;
  top: 0rem;
  /* top: -100px; */
  z-index: 1001;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

/* .slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
} */

.slide-fade-enter,
.slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.inboxContainer {
  width: 100%;
  padding: 0;
  margin-left: 0;
}
</style>
