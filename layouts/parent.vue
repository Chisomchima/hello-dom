<template>
  <div>
    <Transition name="slide-fade">
      <div v-show="$nuxt.isOffline" class="absolutebanner">
        <OfflineDefault />
      </div>
    </Transition>

    <Transition name="slide-fade">
      <div class="site-nav" :class="{ offline: $nuxt.isOffline }">
        <LayoutAuthNavbar />
        <LayoutAuthParentTopbar />
      </div>
    </Transition>
    <div class="parentcontainer">
      <div class="container-fluid">
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
    return {}
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
</style>
