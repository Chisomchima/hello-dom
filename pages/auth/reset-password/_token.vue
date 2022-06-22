<template>
  <div class="d-flex flex-column w-50 mx-auto">
    <div class="row text-center my-3">
      <div class="col text-left">
        <h2 class="text-left font-family_brown font-weight-bold">
          Reset Password
        </h2>
      </div>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submitForm)">
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <ValidationProviderWrapper
                :name="'Password'"
                :rules="['required']"
                :more-props="{ vid: 'confirmation' }"
                :label="'Password'"
              >
               <BaseInput v-model="password" type="password" />
              </ValidationProviderWrapper>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <ValidationProviderWrapper
                :name="'Confirm Password'"
                :rules="['confirmed:confirmation']"
                :label="'Confirm Password'"
              >
               <BaseInput v-model="confirm_password" type="password" />
              </ValidationProviderWrapper>
            </div>
          </div>

          <div class="col-12">
            <div class="form-group">
              <BaseButton watch-request class="w-100 btn-lg"
                >Continue</BaseButton
              >
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
      password: '',
      confirm_password: ''
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.$axios.$put(
          `/api-auth/password/reset/confirm/?token=${this.$route.params.token}&password=${this.password}`
        )
        this.$router.push('/auth/login')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
