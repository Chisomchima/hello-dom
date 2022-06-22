<template>
  <div>
    <div class="site-topbar">
      <div class="d-flex align-items-lg-center">
        <div
          class="pointer d-lg-none"
          v-if="!fullScreenMenu"
          @click="$nuxt.$emit('openSidebar')"
        >
          <span
            class="iconify fs-28 text-light line-height-0"
            data-inline="false"
            data-icon="eva:menu-fill"
          ></span>
        </div>
        <div class="topbar-school-selector d-lg-block d-none">
          <p class="d-lg-flex align-items-lg-center mb-0">
            {{ $store.state.administration.school.name }}
            <!-- <option>Marriot College</option> -->
          </p>
        </div>
      </div>
      <div class="topbar-items-wrapper d-flex">
        <div
          v-for="(routes, index) in routesDropdown"
          :key="index"
          @click="resetBreadCrumbs"
        >
          <nuxt-link
            class="nav-item"
            :to="`/sms/${$route.params.id}/${routes.path}`"
            >{{ routes.name }}</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import breadcrumbMixin from '~/mixins/breadcrumb'

export default Vue.extend({
  // mixins: [breadcrumbMixin],

  data() {
    return {
      routesDropdown: [
        { name: 'Dashboard', path: 'dashboard' },
        { name: 'Inbox', path: 'inbox' },
        { name: 'Administration', path: 'administration/student' },
        { name: 'HR', path: 'staff/employee' },
        { name: 'LMS', path: 'lms' },
        { name: 'Finance', path: 'finance' },
        { name: 'Communications', path: 'communications' },
        { name: 'Page Builder', path: 'page-builder' },
        { name: 'Settings', path: 'settings' },
      ],

      fullScreenMenu: false,
    }
  },

  mounted() {},

  methods: {
    resetBreadCrumbs() {
      this.$store.dispatch('breadcrumbs/removeRoot')
      this.$store.dispatch('breadcrumbs/sliceRoutes')
    },
    something() {
      alert()
    },
    mobileMenu() {
      this.fullScreenMenu = !this.fullScreenMenu
    },
    closemenu() {
      this.fullScreenMenu = false
    },
  },
})
</script>

<style scoped>
a {
  padding: 10px 7px 7px 7px;
  margin-right: 5px;
  color: black;
  min-height: var(--topbar-height);
}
.nuxt-link-active {
  background-color: #dbe9f4;
}

.relativecontainer {
  position: relative;
}

.absolutecontainer {
  position: absolute;
}

.openexplore {
  float: right;
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background-size: 10% 10%;
}

.nav__toggle {
  display: block;
  float: right;
  cursor: pointer;
  font-size: 12px;
  transition: 0.3 ease;
}

.closemob {
  transition: 0.3 ease;
}

.nav__toggle:hover {
  color: #171e40;
  transition: 0.3s ease;
}

.borderfulltop {
  border-top: 7px solid #171e40;
}

.mobilecontainer {
  position: fixed;
  top: 60px;
  right: 0px;
  z-index: 1050;
  /* display: none; */
  width: 50%;
  height: 100%;
  background: #171e40;
  color: #fff;
  overflow: hidden;
  outline: 0;
  transition: -webkit-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
  -webkit-transform: translate(0, -50px);
  transform: translate(0, -50px);
}

.mobilecontainer {
  width: 40%;
}

.mobilecontainer .mobilemenu {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  padding: 20px;
  margin: 0px;
  transition: 0.3s ease;
}

.display {
  display: block;
  animation: showMenuItems 0.6s ease;
  animation-fill-mode: both;
}

.display:nth-child(1) {
  animation-delay: 0.1s;
}
.display:nth-child(2) {
  animation-delay: 0.2s;
}
.display:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes showMenuItems {
  0% {
    opacity: 0;
    transform: translate3d(40px, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@media screen and (max-width: 724px) {
  /* .pointer {
    margin-top: 25px;
  } */

  .topbar-school-selector {
    /* margin-top: 25px; */
    width: 100%;
    height: fit-content;
  }
  .topbar-school-selector p {
    font-size: 14px;
  }
}

@media screen and (max-width: 991px) {
  .nuxt-link-active {
    color: #171e40 !important;
  }

  .site-topbar {
  }
}
@media screen and (max-width: 600px) {
  .mobilecontainer {
    width: 50%;
  }
}
@media screen and (max-width: 443px) {
  .mobilecontainer {
    width: 60%;
  }
}
</style>
