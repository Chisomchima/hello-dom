<template>
  <div>
    <div class="modal-overlay" @click="hideCard()" v-show="isMobile"></div>
    <div class="cus">
      <div
        class="navbar px-3 px-lg-5 d-flex justify-content-between pr-5 pr-lg-0"
      >
        <div>
          <nuxt-link to="/">
            <img src="~/assets/img/logo-white.png" class="logo"
          /></nuxt-link>
        </div>
        <div class="d-flex align-items-center flex-wrap">
          <nav
            id="nav-bar-items"
            class="nav-items d-none d-lg-flex order-last order-lg-first"
          >
            <div class="nav-item">
              <nuxt-link to="/" class="px-4"> Home</nuxt-link>
            </div>

            <div class="nav-item">
              <nuxt-link to="/features/LMS" class="px-4"> Features</nuxt-link>
            </div>

            <!-- <div class="nav-item">
            <nuxt-link to="/" class="px-4"> Shop</nuxt-link>
          </div> -->
          </nav>
          <nuxt-link to="/auth/login" class="px-3 py-2 rounded-pill bg-primary">
            Login</nuxt-link
          >
          <nuxt-link to="/auth/signup" class="px-4"> SignUp</nuxt-link>
        </div>
      </div>
      <div class="d-lg-none relativecontainer">
        <div
          class="pointer d-lg-none ml-3 absolutecontainer"
          @click="openMobile()"
        >
          <span
            class="iconify"
            data-inline="false"
            data-icon="eva:menu-fill"
            style="font-size: 30px; line-height: 0; color: #fff"
          ></span>
        </div>
      </div>
      <div v-if="isMobile" class="d-lg-none d-block">
        <nav class="">
          <div class="nav-item py-3 lightborder-bottom mx-4">
            <nuxt-link to="/" class=""> Home</nuxt-link>
          </div>
          <div class="nav-item py-3 lightborder-bottom mx-4">
            <nuxt-link to="/features/LMS" class=""> Features</nuxt-link>
          </div>

          <!-- <div class="py-3 lightborder-bottom mx-4">
            <a v-b-toggle.collapse-1 variant="primary" href="#"
              >Features
              <span class="iconify" data-icon="ph:caret-down-bold"></span>
            </a>

            <b-collapse id="collapse-1" class="mt-2">
              <b-card class="p-0 m-0 submenu d-flex flex-column">
                <div class="py-1">
                  <b-icon icon="arrow-right-short" class="text-white"></b-icon>
                  <nuxt-link class="text-white" to="#">LMS</nuxt-link>
                </div>
                <div class="py-1">
                  <b-icon icon="arrow-right-short" class="text-white"></b-icon>
                  <nuxt-link class="text-white" to="#">SMS</nuxt-link>
                </div>
              </b-card>
            </b-collapse>
          </div> -->

          <!-- <div class="nav-item py-3 mx-4">
          <nuxt-link to="/" class=""> Shop</nuxt-link>
        </div> -->
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
    }
  },

  methods: {
    openMobile() {
      this.isMobile = !this.isMobile
    },
  },
}
</script>

<style scoped>
.site-nav .navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #171e40;
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
    display: block;
  }

  .relativecontainer {
    position: relative;
  }
  .absolutecontainer {
    position: absolute;
    top: -40px;
    right: 10px;
  }

  .lightborder-bottom {
    border-bottom: 0.2px solid rgb(155, 155, 155);
  }

  .submenu {
    filter: drop-shadow(0px 0px 9px rgba(0, 0, 0, 0.09));
    background-color: #1a234b;
    border-radius: 0;
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
.cus {
  background-color: #161e40;
}
a {
  color: white;
}
</style>
