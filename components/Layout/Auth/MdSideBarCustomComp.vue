<template>
  <div>
    <sidebar-menu
      style="top: 60px"
      theme="white-theme"
      :collapsed="true"
      :menu="menu"
    />
    <!-- {
  header: true,
  title: 'Main Navigation',
  hiddenOnCollapse: true,
   } -->
  </div>
</template>

 

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
export default {
  components: {
    SidebarMenu,
  },
  computed: {
    menu() {
      const menus = this.$store.state.auth?.user?.menus
      return menus
    },
  },
  mounted() {
    console.log(this.menu, 'menu')
    if (this.menu !== 'undefined' && this.menu[0]?.title !== 'Dashboard') {
      this.$store.dispatch('auth/setupDashboard')
    }
  },
  data() {
    return {
      menus: [],
      isMobile: false,
      isShowing: false,
    }
  },
  created() {
    this.$nuxt.$on('openSidebar', () => {
      this.isMobile = !this.isMobile
      this.isShowing = !this.isShowing
    })
  },
}
</script>

<style scoped lang="scss">
.nav-item-icon {
  z-index: 999;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 900;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  background: rgba(0, 0, 0, 0.2);
}

.site-sidebar {
  z-index: 901 !important;
}

.bold {
  font-weight: 900;
}

.site-sidebar .nav-item .nav-item-icon {
  line-height: 0;
}
.site-sidebar .nav-item .nav-item-icon svg {
  height: 36px;
  width: 36px;
}
.site-sidebar .nav-item .nav-item-icon svg path {
  fill: #8f9aa3;
}

.site-sidebar.show .dontshow {
  display: none;
}

.nuxt-link-exact-active {
  background: rgba(16, 112, 183, 0.1) !important;
}
.nuxt-link-exact-active {
  background: rgba(16, 112, 183, 0.1) !important;
}
.nuxt-link-exact-active .nav-item-text {
  color: #0d6cbb !important;
}

.nuxt-link-exact-active .nav-item-icon {
  color: #0d6cbb !important;
}
.nuxt-link-exact-active .nav-item-text {
  color: #0d6cbb !important;
}

.nuxt-link-exact-active .nav-item-icon {
  color: #0d6cbb !important;
}

.nav-item {
  border-radius: 8px;
  position: relative;
}
.smaller-text {
  font-size: 14px;
  margin-left: 0.5rem;
}
.more-width {
  width: 80%;
}
.inline {
  display: inline !important;
}
</style>