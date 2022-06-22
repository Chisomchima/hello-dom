<template>
  <header class="site-header">
    <div
      class="
        d-flex
        align-items-center
        flex-wrap
        justify-content-between
        container
      "
    >
      <div></div>
      <div class="pointer d-md-none" data-toggle-visibility="#site-nav">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.2"
            d="M19 0.5H5C2.23858 0.5 0 2.73858 0 5.5V19.5C0 22.2614 2.23858 24.5 5 24.5H19C21.7614 24.5 24 22.2614 24 19.5V5.5C24 2.73858 21.7614 0.5 19 0.5Z"
            fill="white"
          />
          <path
            d="M4.85001 6.5H19.15"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.85001 12.5H19.15"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.85001 18.5H19.15"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          /></svg
        >{}
      </div>
      <div class="py-2">
        <a href="/">
          <img
            src="~/assets/img/logo.png"
            class="logo d-none d-md-block"
            alt="Slate Logo"
          />
          <img
            src="~/assets/img/logo-white.png"
            class="logo d-md-none"
            alt="Slate Logo"
          />
        </a>
      </div>
      <div class="d-md-none font-weight-bold">
        <a href="#" class="text-white">LOGIN</a>
      </div>

      <div class="nav align-items-center d-none d-md-flex" id="site-nav">
        <div class="nav-item">
          <nuxt-link to="/" class="nav-link text-white">Home</nuxt-link>
        </div>
        <div class="nav-item has-submenu">
          <nuxt-link to="/courses" class="nav-link text-white">
            Courses
          </nuxt-link>
        </div>
        <div class="nav-item has-submenu">
          <NuxtLink to="/features/LMS" class="nav-link text-white"
            >Features
            <span class="iconify" data-icon="ph:caret-down-bold"></span>
          </NuxtLink>

          <div class="nav-submenu py-3 mt-0 mt-md-2" id="features-nav-item">
            <nuxt-link to="/features/LMS" class="nav-submenu-item p-2" href="#"
              >LMS</nuxt-link
            >
            <nuxt-link to="/features/SMS" class="nav-submenu-item p-2" href="#"
              >SMS</nuxt-link
            >
          </div>
        </div>
        <!-- <div class="nav-item"><a href="#" class="nav-link">Schools</a></div> -->
        <div class="nav-item ml-4 d-none d-md-block">
          <NuxtLink
            to="/auth/login"
            class="nav-link btn btn-primary signin-btn text-white rounded"
            >Login</NuxtLink
          >
        </div>
        <div class="nav-item d-none d-md-block">
          <NuxtLink to="/auth/signup" class="nav-link p-3 text-white">
            Sign Up</NuxtLink
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
* {
  font-family: avenir-rg;
}
.nuxt-link-active {
  color: #1070b7;
}
.nuxt-link-exact-active {
  color: #d8d8d8 !important;
  border-radius: 2rem;
  margin-left: 5px;
  font-size: larger !important;
  background-color: #0f70b7;
}
</style>
