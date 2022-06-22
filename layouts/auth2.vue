<template>
  <div>
    <div class="site-nav">
      <LayoutAuthMdSideBar2 />
      <LayoutAuthNavbar />
      <!-- <LayoutAuthTopbar /> -->
    </div>
    <div class="site-container">
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
    return {
      options: [],
      inboxPage: false,

      offlineimg: '',
      offlineHeader: '',
      offlineText: '',
    }
  },
  watch: {
    $route: {
      handler({ name }) {
        if (name === 'sms-id-inbox') {
          this.inboxPage = true
          console.log('inbos')
        } else {
          this.inboxPage = false
        }
      },
      immediate: true,
    },
  },

  methods: {
    setProps(e) {
      this.options = e
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

.offlinewrapper {
  /* margin-top: 150px;
  height: 90vh; */
  /* margin-bottom: 150px; */
}
.inboxContainer {
  width: 100%;
  padding: 0;
  margin-left: 0;
}
</style>
