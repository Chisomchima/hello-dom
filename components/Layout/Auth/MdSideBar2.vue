<template>
  <div>
    <div
      v-if="isShowing"
      class="modal-overlay"
      :class="{ show: isShowing }"
      @click="isShowing = false"
    ></div>
    <div id="site-sidebar" class="site-sidebar">
      <div class="sidebar-items-wrapper">
        <template v-for="(item, index) in routes">
          <template v-if="!item.dropdown">
            <nuxt-link
              :key="index"
              :to="{
                name: item.pathName,
              }"
              class="nav-item"
            >
              <b-icon
                v-if="item.icon"
                class="nav-item-icon d-block customiconify"
                :icon="item.icon"
              ></b-icon>

              <div class="nav-item-text text-capitalize">
                {{ item.name }}
              </div>
            </nuxt-link>
          </template>
          <template v-else>
            <a
              :key="index"
              href="#"
              class="d-flex nav-item has-dropdown justify-content-between"
              :class="[item.isToggled ? 'active' : '']"
              @click="item.isToggled = !item.isToggled"
            >
              <b-icon
                v-if="item.icon"
                class="nav-item-icon d-block customiconify"
                :icon="item.icon"
                style="font-size: 16px"
              ></b-icon>

              <div class="nav-item-text w-100 text-capitalize">
                {{ item.name }}
              </div>

              <b-icon-chevron-up
                v-if="item.isToggled"
                style="width: 25px; height: 25px"
                class="nav-item-text"
              ></b-icon-chevron-up>
              <b-icon-chevron-down
                v-else
                style="width: 25px; height: 25px"
                class="nav-item-text"
              ></b-icon-chevron-down>
            </a>

            <div :key="index + 1" class="nav-dropdown">
              <template v-for="(child, index2) in item.dropdown">
                <nuxt-link
                  :key="index2"
                  :to="{
                    name: child.pathName,
                  }"
                  class="nav-dropdown-item"
                  style="padding: 0px !important"
                >
                  <div class="nav-item">
                    <b-icon
                      v-if="child.icon"
                      class="nav-item-icon d-block customiconify"
                      :icon="child.icon"
                      style="font-size: 16px"
                    ></b-icon>

                    <div class="nav-item-text w-100 text-capitalize">
                      {{ child.name }}
                    </div>
                  </div>
                </nuxt-link>
              </template>
            </div>
          </template>
        </template>
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
          icon: 'camera',
        },

        {
          pathName: 'dashboard-hr',
          name: 'patient',
          icon: 'archive',
          isToggled: false,

          dropdown: [
            {
              pathName: 'dashboard-patient',
              name: 'search patient',
              icon: 'people',
            },
            {
              pathName: 'dashboard-patient-add',
              name: 'register patient',
              icon: 'people',
            },
          ],
        },
        {
          pathName: 'dashboard-opd',
          name: 'OPD',
          icon: 'archive',
          isToggled: false,

          dropdown: [
            {
              pathName: 'dashboard-opd',
              name: 'Encounter Worklist',
            },
            // {
            //   pathName: 'dashboard-patient-add',
            //   name: 'register patient',
            // },
            // {
            //   pathName: 'sms-id-staff-pension-settings',
            //   name: 'Pension Settings',
            // },
            // {
            //   pathName: 'sms-id-staff-banks',
            //   name: 'Banks',
            // },
          ],
        },
        {
          pathName: 'dashboard-settings',
          name: 'Settings',
          icon: 'archive',
          isToggled: false,

          dropdown: [
            {
              pathName: 'dashboard-settings-laboratory',
              name: 'Laboratory Settings',
            },
            // {
            //   pathName: 'dashboard-patient-add',
            //   name: 'register patient',
            // },
            // {
            //   pathName: 'sms-id-staff-pension-settings',
            //   name: 'Pension Settings',
            // },
            // {
            //   pathName: 'sms-id-staff-banks',
            //   name: 'Banks',
            // },
          ],
        },
      ],
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