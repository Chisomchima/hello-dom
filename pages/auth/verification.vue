<template>
  <div class="container mx-auto">
    <div class="row">
      <div class="col-12 text-center my-3">
        <b-icon icon="envelope-open" scale="2"></b-icon>
      </div>
      <div class="col-12 text-center">
        <h3>Verification Successful</h3>
      </div>
      <div class="col-12 text-center">
        <p>Your email has been Successfully verified</p>

        <!-- <p>
          <BaseButton watch-request class="btn-slate-lg" @click="resendEmail()">
            Click to go to login Pahe</BaseButton
          >
        </p> -->
        <p>
          Click here to go to
          <span><nuxt-link to="/auth/login">Login</nuxt-link></span> page
        </p>
        <!-- <p>
          If you didn’t recieve the activation email.
          <span><nuxt-link to="/auth/login">Contact us</nuxt-link></span>
        </p> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'signup',
  async asyncData({ $axios, route }) {
    try {
      await $axios.$put(`/api-auth/signup/verify/?token=${route.query.token}`)
      // redirect('/auth/login')
    } catch (error) {
      // redirect('/auth/login')
      console.log(error)
    }
  },
})
</script>

<style lang="scss" scoped></style>
