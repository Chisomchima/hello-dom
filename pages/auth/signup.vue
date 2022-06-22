<template>
  <div class="d-flex flex-column width50 mx-auto">
    <div class="row text-center my-3">
      <div class="col text-left">
        <h2 class="text-left font-family_brown font-weight-bold">
          Create Account
        </h2>
        Already have account?
        <nuxt-link to="/auth/login"> <span>Log in</span></nuxt-link>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div id="buttonDiv"></div>
      </div>
    </div>
    <div class="row my-3">
      <!-- <div class="col"> -->
      <hr size="7" width="40%" align="left" color="green" />
      or
      <hr size="7" width="40%" align="right" color="green" />
      <!-- </div> -->
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submitForm)">
        <div class="row">
          <div class="col-md-6 col-12">
            <div class="form-group">
              <ValidationProviderWrapper
                :name="'First Name'"
                :rules="['required']"
                :label="'First Name'"
              >
                <input
                  v-model="form.first_name"
                  class="form-control ng-untouched ng-pristine ng-valid"
                  placeholder="First Name"
                  type="text"
                />
              </ValidationProviderWrapper>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="form-group">
              <ValidationProviderWrapper
                :name="'Last Name'"
                :rules="['required']"
                :label="'Last Name'"
              >
                <input
                  v-model="form.last_name"
                  class="form-control ng-untouched ng-pristine ng-valid"
                  placeholder="Last Name"
                  type="text"
                />
              </ValidationProviderWrapper>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <ValidationProviderWrapper
                :name="'Email'"
                :rules="['required', 'email']"
                :label="'Email Address'"
              >
                <input
                  v-model="form.email"
                  class="form-control ng-valid ng-dirty ng-touched"
                  placeholder="example@email.com"
                  type="email"
                />
              </ValidationProviderWrapper>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <ValidationProviderWrapper
                :name="'Password'"
                :rules="['required']"
                :more-props="{ vid: 'confirmation' }"
                :label="'Password'"
              >
                <BaseInput v-model="form.password" type="password" />
              </ValidationProviderWrapper>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <BaseButton watch-request class="w-100 btn-lg"
                >Sign up</BaseButton
              >
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
    <transition v-if="showPage" name="home">
      <AuthProcessModal ref="authProcessModal" />
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import * as jose from 'jose'
import AuthMixins from '@/mixins/auth-mixins'
export default Vue.extend({
  mixins: [AuthMixins],
  layout: 'signup',
  data() {
    return {
      showPage:false,
      form: {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
        gender: '',
        date_of_birth: '',
        phone_number: '',
        terms: false,
      },
    }
  },
   mounted() {
      this.$nextTick(() => {
        google.accounts.id.initialize({
          client_id: process.env.GOOGLE_CLIENT_ID,
          callback: this.googleLogin,
        })
        google.accounts.id.renderButton(
          document.getElementById('buttonDiv'),
          {
            theme: 'outline',
            size: 'large',
            width: '400px',
            text: 'signup_with',
          } // customization attributes
        )
        google.accounts.id.prompt() // also display the One Tap dialog
      })
    },
  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch('auth/signUp', this.form)
        this.$store.commit('auth/SET_SIGNUP_USER', this.form.email)
        this.$router.push('/auth/verify-account')
      } catch (error) {
        console.log(error)
      }
    },
    async googleLogin(res) {
     const profile =  jose.decodeJwt(res.credential)
      try {
        const localProfileObj = {
          email: profile.email,
          first_name: profile.given_name,
          full_name: profile.name,
          id_token: res.credential,
          last_name: profile.family_name,
        }
        const data = await this.$axios.$post(
          '/api-auth/signup/google/',
          localProfileObj
        )

        this.$store.commit('auth/SET_USER', data.data.user_details)
        this.$store.commit('auth/SET_TOKEN', data.data.token)
        // console.log(data)

        this.showPage = true

        if (this.$refs.authProcessModal) {
          this.$refs.authProcessModal.setText('Authentication Successfull')
          this.$refs.authProcessModal.setText('Getting User Info...')
        }

        await this.setDataInStore()

        // the function below checks if users is a staff then
        // the gets the staff id and uses that to get th roles for each staff per school
        this.$refs.authProcessModal.setText(
          'Getting User Roles and permission...'
        )
        await this.setRolesInStore()

        this.$refs.authProcessModal.setText('Redirecting...')

        await this.redirect()
      } catch (error) {
        console.log(error)
      }
    },
  },
})
</script>

<style scoped>
.width50 {
  width: 50%;
}

@media screen and (max-width: 991px) {
  .width50 {
    width: 70%;
  }
}
@media screen and (max-width: 582px) {
  .width50 {
    width: 90%;
  }
}
</style>
