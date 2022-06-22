<template>
  <div class="d-flex flex-column w-50 mx-auto">
    <div class="row text-center my-3">
      <div class="col text-left">
        <h2 class="text-left font-family_brown font-weight-bold">
          Password Recovery
        </h2>
        <p>oops... let’s help you get your account back</p>
      </div>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submitForm)">
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <ValidationProviderWrapper
                :name="'email'"
                :rules="['required']"
                :label="'Email'"
              >
                <input
                  v-model="email"
                  class="form-control ng-untouched ng-pristine ng-valid"
                  placeholder="Email"
                  type="email"
                />
              </ValidationProviderWrapper>
            </div>
          </div>

          <div class="col-12">
            <div class="form-group">
              <BaseButton watch-request class="w-100 btn-lg">Continue</BaseButton>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'signup',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.$axios.$put(`/api-auth/password/reset/?email=${this.email}`)
        this.$toast({
          text: 'Check your email for a password reset link.',
          type: 'success'
        })
        this.$router.push('/auth/password-recovery')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
