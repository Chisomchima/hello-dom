<template>
  <div class="container mx-auto">
    <div class="row">
      <div class="col-12 text-center my-3">
        <b-icon icon="envelope-open" scale="2"></b-icon>
      </div>
      <div class="col-12 text-center">
        <h3>Check Your Email for Password recovery Link!</h3>
      </div>
      <div class="col-12 text-center">
        <p>We’ve sent a Password recovery Link your email</p>
        <!-- <p>
          <span
            ><a href="#">{{ $store.state.auth.userSigningUp }}</a></span
          >
        </p> -->
        <p>Click the link provided to activate your account</p>
        <!-- <p>Did not receive the activation email? Check your spam folder</p> -->
        <!-- <p>or</p> -->
        <!-- <p>
          <BaseButton watch-request class="btn-slate-lg" @click="resendEmail()">
            Resend Email Verification</BaseButton
          >
        </p> -->
        <!-- <p>
          Already activate your account
          <span><nuxt-link to="/auth/login">Log in</nuxt-link></span>
        </p> -->
        <!-- <p>
          If you don’t recieve the activation email.
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
  data() {
    return {
      testing: ''
    }
  },
  methods: {
    // async resendEmail(): Promise<void> {
    //   await this.$axios.$put(
    //     `/api-auth/signup/resend/?email=${this.$store.state.auth.userSigningUp}`
    //   )
    //   this.$toast({
    //     type: 'info',
    //     text: 'Verification Mail is Sent'
    //   })
    // }
  }
})
</script>

<style lang="scss" scoped></style>
