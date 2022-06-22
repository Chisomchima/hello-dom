<template>
  <div>
    <div
      v-if="isShowing"
      class="modal-overlay"
      :class="{ show: isShowing }"
      @click="isShowing = false"
    ></div>
    <div id="site-sidebar font-brown" class="site-sidebar" :class="{ show: isShowing }">
      <div>
        <div class="sidebar-items-wrapper font-brown">
          <div v-if="isShowing" class="topbar-school-selector d-lg-none d-block">
            <p class="d-lg-flex align-items-lg-center my-3 bold fs-14">
              {{ $store.state.administration.school.name }}
            </p>
          </div>
          <template v-for="(item, index) in routes">
            <!-- <pre>{{ item.icon }}</pre> -->
            <!-- <pre>{{ "@custom:mdi:" + item.icon }}</pre>
            <Icon icon="@custom:mdi:home" /> -->
            <template v-if="!item.dropdown">
              <nuxt-link
                :key="index"
                :to="{ name: item.pathName, params: { id: $route.params.id } }"
                class="nav-item"
              >
                <!-- <Icon :icon="'@custom:mdi:' + item.icon" /> -->
                <Icon
                  v-if="item.icon"
                  class="nav-item-icon d-block customiconify"
                  :icon="item.icon"
                />
                <div class="nav-item-text text-capitalize" @click="resetBreadCrumbs">
                  <!-- <Icon
                    :icon="item.icon"
                    class="mr-3 nav-item-icon text-dark d-none d-lg-block customiconify"
                  /> -->

                  {{ item.name }}
                </div>
              </nuxt-link>
            </template>
            <template v-else>
              <div
                id="x"
                :key="index"
                ref="closeCollapse"
                v-b-toggle="`collapse-${index}`"
              >
                <!-- <p>Icon referenced by name: <Icon icon="bell" :inline="true" /></p> -->
                <nuxt-link
                  :key="index"
                  to="#"
                  class="nav-item smaller-text d-flex justify-content-between"
                >
                  <span class="more-width">
                    <Icon
                      v-if="item.icon"
                      class="mr-3 nav-item-icon d-lg-block d-none dontshow inline"
                      :icon="item.icon"
                    />
                    {{ item.name }}
                  </span>

                  <arrow :is-toggled="item.isToggled" />
                </nuxt-link>
              </div>

              <div v-if="item.dropdown.length != 0" :key="'sub' + index" class="hack">
                <b-collapse
                  v-for="(child, index2) in item.dropdown"
                  :id="`collapse-${index}`"
                  :key="'sub' + index2"
                  class="mt-2 mx-2"
                  @show="item.isToggled = true"
                  @hide="item.isToggled = false"
                >
                  <div @click.prevent="advet">
                    <nuxt-link
                      class="nav-item items ml-2 nav-item-text"
                      :to="{
                        name: child.pathName,
                        params: { id: $route.params.id },
                      }"
                    >
                      <div>
                        <Icon
                          v-if="child.icon"
                          class="mr-3 nav-item-icon d-lg-block d-none dontshow"
                          :icon="child.icon"
                        />
                      </div>
                      <div class="nav-item-text">
                        {{ child.name }}
                      </div></nuxt-link
                    >
                  </div>
                </b-collapse>
              </div>
              <!-- <nuxt-link
                :key="index"
                :to="{ name: item.pathName, params: { id: $route.params.id } }"
                class="nav-item active has-dropdown"
              >
                <Icon
                  v-if="item.icon"
                  class="mr-3 nav-item-icon"
                  :icon="item.icon"
                />
                <span class="nav-item-text text-capitalize">
                  {{ item.name }}
                </span>
              </nuxt-link>
              <div :key="index" class="nav-dropdown">
                <template v-for="(dropdown, index2) in item.dropdown">
                  <nuxt-link
                    :key="index2"
                    :to="{
                      name: dropdown.pathName,
                      params: { id: $route.params.id },
                    }"
                    class="nav-dropdown-item"
                  >
                    <Icon
                      v-if="dropdown.icon"
                      class="mr-3 nav-item-icon"
                      :icon="item.icon"
                    />
                    <span class="nav-item-text ml-1 text-capitalize">
                      {{ dropdown.name }}
                    </span>
                  </nuxt-link>
                </template>
              </div> -->
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { Routes, RouteSetupType } from "./SideBarRoutes";
import "./SideBarIcons";

export default Vue.extend({
  // mixins: [icons],

  data() {
    const routes: RouteSetupType[] = [];
    return {
      //  bellIcon: bellFill,
      isMobile: false,
      isShowing: false,
      routes,
    };
  },
  watch: {
    $route: {
      handler() {
        this.onRouteChange();
      },
      immediate: true,
    },

    "$route.query.fromPage": {
      handler(newVal) {
        if (newVal) {
          this.onRouteChange(newVal);
        }
      },
      immediate: true,
    },
  },

  created() {
    this.$nuxt.$on("openSidebar", () => {
      console.log("side bar event");
      this.isMobile = !this.isMobile;
      this.isShowing = !this.isShowing;
    });
  },
  methods: {
    advet() {
      console.log("hmmm");
    },
    resetBreadCrumbs() {
      this.$store.dispatch("breadcrumbs/removeRoot");

      this.$store.dispatch("breadcrumbs/sliceRoutes");
    },
    isShowingMethod() {
      this.isShowing = !this.isShowing;
    },
    onRouteChange(fullPath = null) {
      const spiltUrlToArray = fullPath || this.$route.fullPath.split("/");

      const RouteObj = Routes.find((item) =>
        item.keywords.every((keyword) => spiltUrlToArray.includes(keyword))
      );
      this.routes = RouteObj?.routes as [];
    },
  },
});
</script>

<style scoped>
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
.nuxt-link-active {
  background: rgba(16, 112, 183, 0.1) !important;
}
.nuxt-link-active .nav-item-text {
  color: #0d6cbb !important;
}

.nuxt-link-active .nav-item-icon {
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
