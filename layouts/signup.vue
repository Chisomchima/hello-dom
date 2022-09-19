<template>
  <div class="container-fluid">
    <div class="row vh-100">
      <div class="col-md-4 bg-slate-primary px-4 text-white d-none d-md-block">
        <div class="w-100 d-flex align-self-center">
          <img
            width="100%"
            src="@/assets/img/theme-image.jpeg"
            class="rounded-circle"
            alt=""
            style="margin-top: 130px; height: 400px; width: 400px"
            srcset=""
          />
        </div>

        <h1 class="text-center text-18 text-white mt-4">{{appName}}</h1>
      </div>
      <div class="col-md-8">
        <div class="d-flex flex-column justify-content-around vh-100">
          <nuxt></nuxt>
        </div>
        <div class="auth-footer mx-auto px-md-5 px-3 bottom width75">
          <div class="d-flex justify-content-between flex-wrap w-100">
            <div class="d-flex flex-wrap">
              <!-- <span class="click mr-2">
                <nuxt-link to="/support" class="summ auth-footer">
                  Support
                </nuxt-link> </span
              > -->

              <span class="click mx-2">
                <nuxt-link to="#" class="auth-footer">
                  Privacy Policy
                </nuxt-link> </span
              ><span class="click ml-2">
                <nuxt-link to="#" class="auth-footer">
                  Terms and Conditions
                </nuxt-link>
              </span>
            </div>
            <div class="auth-footer">
              © {{ new Date().getFullYear() }}, Powered by V3C Technology, All
              Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  // layout: 'signup',
  data() {
    return {
      slate_account_benefit: [
        'Access to courses',
        'Shop for educational material',
        'Learn at your pace',
        'Search for schools with reviews',
      ],
      amazing_feature: [
        'Join your school lms',
        'Pay all educational fees on slate',
        'Access tutors for learning',
        'Download engaging material',
      ],
    }
  },
  methods: {},
  computed:{
    appName(){
      return process.env.APP_NAME
    }
  }
})
</script>

<style scoped>
.top {
  position: absolute;
  top: 0;
}

.auth-footer {
  color: #b8bcd5;
  font-size: 14px;
}

/* .width75 {
  width: 75%;
} */

@media screen and (max-width: 708px) {
  .auth-footer {
    font-size: 12px;
  }
  .width75 {
    width: 100%;
  }
}
a {
  /* color: #c0c0c0; */
}

.bottom {
  position: relative;
  bottom: 40px;
}
</style>
