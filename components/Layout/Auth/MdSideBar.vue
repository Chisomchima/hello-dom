<template>
  <div>
    <div
      v-if="isShowing"
      class="modal-overlay"
      :class="{ show: isShowing }"
      @click="isShowing = false"
    ></div>
    <div
      id="site-sidebar font-brown"
      class="site-sidebar"
      :class="{ show: isShowing }"
    >
      <div
        id="site-sidebar font-brown"
        class="site-sidebar"
        :class="{ show: isShowing }"
      >
        <div>
          <div class="sidebar-items-wrapper font-brown">
            <div
              v-if="isShowing"
              class="topbar-school-selector d-lg-none d-block"
            ></div>
            <template v-for="(item, index) in routes">
              <!-- <pre>{{ item.icon }}</pre> -->
              <!-- <pre>{{ "@custom:mdi:" + item.icon }}</pre>
            <Icon icon="@custom:mdi:home" /> -->
              <template v-if="!item.dropdown">
                <nuxt-link
                  :key="index"
                  :to="{
                    name: item.pathName,
                  }"
                  class="nav-item"
                >
                  <!-- <Icon :icon="'@custom:mdi:' + item.icon" /> -->
                  <Icon
                    v-if="item.icon"
                    class="nav-item-icon d-block customiconify"
                    :icon="item.icon"
                  />
                  <div
                    class="nav-item-text text-capitalize"
                  >
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
                        class="
                          mr-3
                          nav-item-icon
                          d-lg-block d-none
                          dontshow
                          inline
                        "
                        :icon="item.icon"
                      />
                      <div class="nav-item-text">
                        {{ item.name }}
                      </div>
                    </span>

                    <arrow :is-toggled="item.isToggled" />
                  </nuxt-link>
                </div>

                <div
                  v-if="item.dropdown.length != 0"
                  :key="'sub' + index"
                  class="hack"
                >
                  <b-collapse
                    v-for="(child, index2) in item.dropdown"
                    :id="`collapse-${index}`"
                    :key="'sub' + index2"
                    class="mt-2 mx-2"
                    @show="item.isToggled = true"
                    @hide="item.isToggled = false"
                  >
                    <div>
                      <nuxt-link
                        class="nav-item items ml-2 nav-item-text"
                        :to="{
                          name: child.pathName,
                        }"
                      >
                        <div>
                          <Icon
                            v-if="child.icon"
                            class="
                              mr-3
                              nav-item-icon
                              d-lg-block d-none
                              dontshow
                            "
                            :icon="child.icon"
                          />
                        </div>
                        <div class="nav-item-text">
                          {{ child.name }}
                        </div>
                      </nuxt-link>
                    </div>
                  </b-collapse>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          pathName: 'dashboard',
          name: 'dashboard',
          icon: 'fluent:people-community-24-filled',
        },
        {
          pathName: 'dashboard-patient',
          name: 'patient',
          icon: 'la:file-contract',
        },
        {
          pathName: 'dashboard-hr',
          name: 'HR',
          icon: 'bi:gear-fill',
          isToggled: false,

          dropdown: [
            {
              pathName: 'dashboard-patient-add',
              name: 'register patient',
            },
            {
              pathName: 'sms-id-staff-pension-settings',
              name: 'Pension Settings',
            },
            {
              pathName: 'sms-id-staff-banks',
              name: 'Banks',
            },
          ],
        },
      ],
      isMobile: false,
      isShowing: false,
    }
  },
  created() {
    this.$nuxt.$on('openSidebar', () => {
      console.log('side bar event')
      this.isMobile = !this.isMobile
      this.isShowing = !this.isShowing
    })
  },
}
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