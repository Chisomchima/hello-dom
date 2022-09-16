<template>
  <div>
    <div class="modal-overlay" @click="hideCard()" v-show="isMobile"></div>
    <div class="cus fixed">
      <div class="navbar px-3 px-md-5">
        <div
          class="ml-4 ml-md-0 pl-2 pl-md-0 d-flex"
          style="cursor: pointer"
          @click="$router.push(`/`)"
        >
          <nuxt-link to="/">

           <b-avatar   class="rounded-circle"  src="@/assets/img/theme-image.jpeg"></b-avatar>
           <!-- <img
           width="50px"
            src="@/assets/img/theme-image.jpeg"
            class="rounded-circle"
            :alt="APP_NAME_LONG"
            srcset=""
          /> -->
            <span class="text-success ml-2">{{appName}}</span>
          </nuxt-link>
        </div>
        <div class="d-flex align-items-center flex-md-wrap">
          <!-- <nav
            id="nav-bar-items"
            class="nav-items d-none d-lg-flex order-last order-lg-first"
          >
            <div class="nav-item">
              <nuxt-link to="/" class="nav-item-link"> Home</nuxt-link>
            </div>

            <div class="dropdown account-dropdown">
              <a
                href="#"
                class="dropdown-toggle no-arrow nav-item-link"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click="toShow($event, studentArray.length > 0 ? true : false)"
                >Student
                <span
                  v-if="studentArray.length > 0"
                  class="iconify"
                  data-icon="ph:caret-down-bold"
                ></span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
                @click="resetBreadCrumbs"
              >
                <nuxt-link
                  v-for="(student, index) in studentArray"
                  :key="index"
                  class="dropdown-item"
                  :to="'/student/lms/' + student.code + '/subjects'"
                  >{{ student.name }}</nuxt-link
                >
              </div>
            </div>

            <div class="dropdown account-dropdown">
              <a
                href="#"
                class="dropdown-toggle no-arrow nav-item-link"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click="toShow($event, parentArray.length > 0 ? true : false)"
                >Parents
                <span
                  v-if="parentArray.length > 0"
                  class="iconify"
                  data-icon="ph:caret-down-bold"
                ></span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
              >
                <nuxt-link
                  v-for="(parentSchool, index) in parentArray"
                  :key="index"
                  class="dropdown-item"
                  :to="'/parent/' + parentSchool.code"
                  >{{ parentSchool.name }}</nuxt-link
                >
              </div>
            </div>
            <div class="dropdown account-dropdown">
              <a
                href="#"
                class="dropdown-toggle no-arrow nav-item-link"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click="toShow($event, schoolArray.length > 0 ? true : false)"
                >Schools
                <span
                  v-if="schoolArray.length > 0"
                  class="iconify"
                  data-icon="ph:caret-down-bold"
                ></span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right very_visible"
                aria-labelledby="dropdownMenuButton"
              >
                <span
                  v-for="(school, index) in schoolArray"
                  :key="index"
                  @click="store(school)"
                >
                  <nuxt-link
                    class="dropdown-item"
                    :to="'/sms/' + school.code + '/administration'"
                    >{{ school.name }}</nuxt-link
                  >
                </span>
              </div>
            </div>
          </nav> -->

          <div
            class="
              user-account-options
              d-flex
              align-items-center
              ml-lg-4 ml-5
              pr-lg-0
            "
            @click="mobileMenu"
          >
            <div class>
              <!-- <img
                class="account-image"
                :src="user.avatar ? user.avatar : fallbackAvatar"
              /> -->
              <b-avatar ></b-avatar>
              <!-- <img class="account-image" :src="require('')" /> -->
            </div>
            <div class="ml-2">
              <div v-if="user" class="account-name text-left">
                {{ user.first_name + '  ' + user.last_name }}
              </div>
              <div class="d-none d-md-block dropdown account-dropdown">
                <a
                  href="#"
                  class="dropdown-toggle smalltxt"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  >Accounts</a
                >
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuButton"
                >
                  <nuxt-link class="dropdown-item" to="/auth/profile/"
                    >My profile</nuxt-link
                  >
                  <b-btn
                    class="bg-danger ml-2 btn mt-1"
                    to="/auth/login"
                    @click="logout"
                    >Log out
                  </b-btn>
                </div>
              </div>
            </div>
          </div>
          <div class="ml-md-4 ml-3 d-block d-md-none">
            <svg
              class="svgsize"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0007 27.5C16.3757 27.5 17.5007 26.375 17.5007 25H12.5007C12.5007 25.663 12.7641 26.2989 13.2329 26.7678C13.7017 27.2366 14.3376 27.5 15.0007 27.5ZM22.5007 20V13.75C22.5007 9.9125 20.4507 6.7 16.8757 5.85V5C16.8757 3.9625 16.0382 3.125 15.0007 3.125C13.9632 3.125 13.1257 3.9625 13.1257 5V5.85C9.53817 6.7 7.50067 9.9 7.50067 13.75V20L5.88817 21.6125C5.10067 22.4 5.65067 23.75 6.76317 23.75H23.2257C24.3382 23.75 24.9007 22.4 24.1132 21.6125L22.5007 20Z"
                fill="white"
              />
              <circle cx="23" cy="9" r="4" fill="#1070B7" />
            </svg>
          </div>
        </div>
      </div>
      <div class="d-lg-none relativecontainer">
        <div
          class="pointer d-lg-none ml-3 fixedcontainer"
          @click="openMobile()"
        >
          <span class="pt-3 resizeicon">
            <span
              class="iconify"
              data-inline="false"
              data-icon="eva:menu-fill"
            ></span
          ></span>
        </div>
      </div>

      <div class="d-md-none">
        <div v-if="fullScreenMenu" class="display mobilecontainer">
          <div class="darkermob py-4 px-3">
            <div class="d-flex justify-content-end">
              <button class="btn closemob text-white m" @click="closemenu">
                X
              </button>
            </div>
            <div class="borderfulltop">
              <div>
                <h2 class="fs-16 mb-0">
                  Hello <span>{{ user.first_name }}</span>
                </h2>

                <div class="fs-18">Your Account</div>
              </div>
            </div>
          </div>

          <div class="innermobcontainer px-2">
            <nuxt-link class="fs-16 dropdown-item my-3" to="/auth/profile/"
              >My profile</nuxt-link
            >

            <div class="mt-4">
              <b-btn
                class="bg-danger ml-2 btn mt-1"
                to="/auth/login"
                @click="logout"
                >Log out
              </b-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- <div v-if="isMobile" class="d-lg-none d-block">
        <nav
          id="nav-bar-items"
          class="mt-5 nav-items d-flex flex-column order-last order-lg-first"
        >
          <div class="py-3 lightborder-bottom mx-4">
            <div class="w-100">
              <a variant="primary" class="text-white dropdownsize" href="#"
                >Students
              </a>
            </div>
            <div class="mt-2">
              <div class="px-3 py-2 m-0 submenu d-flex flex-column">
                <nuxt-link
                  v-for="(student, index) in studentArray"
                  :key="index"
                  class="text-white py-1 smalltxt d-block"
                  :to="'/student/lms/' + student.code + '/dashboard'"
                >
                  <b-icon icon="arrow-right-short" class="mx-2"></b-icon
                  >{{ student.name }}</nuxt-link
                >
              </div>
            </div>
          </div>

          <div class="py-3 lightborder-bottom mx-4">
            <div class="w-100">
              <a variant="primary" class="text-white dropdownsize" href="#"
                >Parents
              </a>
            </div>
            <div class="mt-2">
              <div class="px-3 py-2 m-0 submenu d-flex flex-column">
                <nuxt-link
                  v-for="(parentSchool, index) in parentArray"
                  :key="index"
                  class="text-white py-1 smalltxt d-block"
                  :to="'/parent/' + parentSchool.code"
                >
                  <b-icon icon="arrow-right-short" class="mx-2"></b-icon
                  >{{ parentSchool.name }}</nuxt-link
                >
              </div>
            </div>
          </div>
          <div class="py-3 lightborder-bottom mx-4">
            <div class="w-100">
              <a variant="primary" class="text-white dropdownsize" href="#"
                >Schools
              </a>
            </div>

            <div class="mt-2">
              <div class="py-2 submenu">
                <span
                  v-for="(school, index) in schoolArray"
                  :key="index"
                  @click="store(school)"
                >
                  <div class="px-3 m-0 d-flex flex-column">
                    <nuxt-link
                      class="text-white py-1 smalltxt d-block"
                      :to="'/sms/' + school.code + '/administration'"
                    >
                      <b-icon icon="arrow-right-short" class="mx-2"></b-icon>
                      {{ school.name }}</nuxt-link
                    >
                  </div>
                </span>
              </div>
            </div>
          </div>

          <div class="nav-item py-3 mx-4">
            <a href="#" class="nav-item-link text-white dropdownsize">Shop</a>
          </div>
        </nav>
      </div> -->
    </div>
    <!-- <div v-show="fullScreenMenu" class="closemobile" @click="closemenu()"></div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import breadcrumbMixin from '~/mixins/breadcrumb'

export default Vue.extend({
  // mixins: [breadcrumbMixin],

  data() {
    return {
      APP_NAME_LONG:process.env.APP_NAME_LONG,
      isMobile: false,
      fallbackAvatar:
        'https://546458-1766807-raikfcquaxqncofqfm.stackpathdns.com/pub/media/wordpress/d5f1425700d7460bb2aa1e1e8e1b7e49.jpg',
      menuResponseData: {} as any,
      fullScreenMenu: false,
    }
  },
  computed: {
    user() {
      // debugger;
      return this.$store.state.auth.user
    },
    appName(){
      return process.env.APP_LONG_NAME
    },
    parentArray(): [] {
      if (this.$store.state.parent.student) {
        return this.$store.state.parent.student
      }
      return []
    },
    studentArray(): [] {
      // debugger;
      if (this.$store.state.student.schools) {
        return this.$store.state.student.schools
      }
      return []
    },
    schoolArray(): [] {
      if (this.$store.state.school.schools) {
        return this.$store.state.school.schools
      }
      return []
    },
  },
  async created() {},
  methods: {
    mobileMenu() {
      this.fullScreenMenu = !this.fullScreenMenu
    },
    closemenu() {
      this.fullScreenMenu = false
    },

    resetBreadCrumbs() {
      this.$store.dispatch('breadcrumbs/removeRoot')
      this.$store.dispatch('breadcrumbs/sliceRoutes')
    },
    hideCard() {
      this.isMobile = !this.isMobile
    },
    openMobile() {
      this.isMobile = !this.isMobile
    },

    none() {},
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/auth/login')
    },
    store(school: any) {
      this.$store.dispatch('administration/putSchool', school)
    },
    async getMenuData() {
      try {
        const result = await this.$axios.$get('/lms/menu')
        this.menuResponseData = result.data
      } catch (error) {
        console.log(error)
      }
    },
    toShow(event: any, state: Boolean) {
      if (!state) {
        event.stopPropagation()
      }
    },
  },
})
</script>

<style scoped lang="scss">
html {
  overflow-x: hidden;
}

.svgsize {
  width: 30px;
  height: 30px;
}

.closemobile {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 996;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  opacity: 1;
  background: RGBA(0, 0, 0, 0.23);
}

.dropdownsize {
  font-size: 12px;
}

.resizeicon {
  font-size: 25px;
  line-height: 0;
  color: #fff;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  opacity: 0;
  background: none;
}

/* .borderfulltop {
  border-top: 7px solid #171e40;
} */

.darkermob {
  background: $COLOR_ONE;
}

.mobilecontainer {
  position: fixed;
  top: 40px;
  right: 0px;
  z-index: 1050;

  /* display: none; */
  width: 60%;
  height: 150vh;
  background: #f6f7ff;
  /* background: #171e40; */
  color: #fff;
  overflow: hidden;
  outline: 0;
  transition: -webkit-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
  -webkit-transform: translate(0, -50px);
  transform: translate(0, -50px);
}

.innermobcontainer {
  color: $COLOR_ONE;
}

.mobilecontainer {
  width: 60%;
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

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* overflow-x: hidden; */
  width: 100%;
  z-index: 1001;
}
.site-nav .navbar {
  background: $COLOR_ONE;
  height: var(--navbar-height);
  width: 100%;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  z-index: 999;
}

@media screen and (max-width: 991px) {
  .navbar {
    height: auto;
  }

  .logo {
    height: 26px;
  }
  .relativecontainer {
    position: relative;
  }
  .fixedcontainer {
    position: fixed;
    top: 15px;
    left: 0px;
    z-index: 1000;
  }

  .lightborder-bottom {
    border-bottom: 0.2px solid rgb(155, 155, 155);
  }

  .submenu {
    filter: drop-shadow(0px 0px 9px rgba(0, 0, 0, 0.09));
    background-color: $COLOR_TWO;
    border-radius: 0;
  }
  .cus {
    background-color: $COLOR_TWO;
    /* padding-top: 10rem; */
    z-index: 1000;
  }
}

/* @media screen and (max-width: 991px) {
  .fixedcontainer {
    right: 10px;
  }
} */
@media screen and (max-width: 698px) {
  .logo {
    height: 20px;
  }

  .svgsize {
    width: 25px;
    height: 25px;
  }
}
@media screen and (max-width: 408px) {
  .site-nav .navbar {
    flex-wrap: nowrap;
  }
  .account-name {
    font-size: 10px;
  }

  .logo {
    height: 15px;
  }
  .smalltxt,
  .dropdown-item {
    font-size: 10px;
  }
}
@media screen and (max-width: 575px) {
  .fixedcontainer {
    position: fixed;
    top: 10px;
  }
}

.dropdown-item {
  padding: 0.25rem 0.75rem;
  border-bottom: 0.5px solid #e7e8eb;
}
.dropdown-toggle {
  color: white;
}
.no-arrow {
  text-decoration: none;
}
.no-arrow::after {
  display: none;
}
.dropdown-menu {
  overflow: auto;
}
.very_visible {
  z-index: 1000;
}
</style>
