<template>
  <div class="container">
    <div class="card mt-4 mx-auto" style="max-width: 465px">
      <UtilsOverlay
        :show="showSuccessMessage"
        :message="successMessage"
        :message-type="messageType"
      >
        <div class="card-body p-4 p-sm-5">
          <div class="text-dark fs-20 line-height-100p mb-4">
            Change Password
          </div>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(submitForm)">
              <div class="form-group">
                <ValidationProviderWrapper
                  :name="'Current Password'"
                  :rules="['required']"
                  :label="'Current Password'"
                >
                  <BaseInput
                    v-model="form.old_password"
                    type="password"
                    placeholder="Current Password"
                  />
                </ValidationProviderWrapper>
              </div>
              <div class="form-group">
                <ValidationProviderWrapper
                  :name="'New Password'"
                  :rules="['required']"
                  :more-props="{ vid: 'confirmation' }"
                  :label="'New Password'"
                >
                  <BaseInput
                    v-model="form.new_password"
                    type="password"
                    placeholder="New Password"
                  />
                </ValidationProviderWrapper>
              </div>
              <div class="form-group">
                <ValidationProviderWrapper
                  :name="'Confirm New Password'"
                  :rules="['required', 'confirmed:confirmation']"
                  :label="'Confirm New Password'"
                >
                  <BaseInput
                    v-model="form.confirm_password"
                    type="password"
                    placeholder="New Password Confirmation"
                  />
                </ValidationProviderWrapper>
              </div>
              <div class="d-flex align-items-center justify-content-end mt-4">
                <div class="mr-2">
                  <button
                    @click.prevent="$router.go(-1)"
                    class="btn btn-light py-2 px-3"
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <BaseButton watch-request class="py-2 px-3"
                    >Change Password</BaseButton
                  >
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </UtilsOverlay>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'authWithoutTopbar',
  data() {
    return {
      showSuccessMessage: false,
      successMessage: '',
      messageType: '',
      form: {
        old_password: '',
        new_password: '',
        confirm_password: '',
      },
    }
  },
  methods: {
    async submitForm() {
      try {
        const data = await this.$axios.$patch('/util/reset/', this.form)
        this.messageType = 'success'
        this.showSuccessMessage = true
        this.successMessage = data.message

        setTimeout(() => {
          this.$router.push('/auth/profile/')
        }, 3000)
      } catch (e) {
        this.messageType = 'error'
        this.showSuccessMessage = true
        this.successMessage = e.response.data.message

        setTimeout(() => {
          this.showSuccessMessage = false
          this.successMessage = ''
        }, 3000)
      }
    },
  },
})
</script>

<style lang="scss" scoped></style>
