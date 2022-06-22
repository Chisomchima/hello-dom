<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submitForm)">
        <div class="bg-white border-radius mb-5 p-4">
          <h4 class="mb-4">Enter your raffle code</h4>

          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
              <ValidationProviderWrapper :rules="['required']">
                <small> Raffle Code </small
                ><input
                  type="text"
                  v-model="raffle_code"
                  placeholder="eg abc123"
                  class="form-control w-50"
                />
                <small class="custom-small">
                  <span
                    class="iconify text-primary"
                    data-icon="bi:info-circle"
                  ></span>
                  Please meet any of out staff to get your raffle code
                </small>
              </ValidationProviderWrapper>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <a target="_blank" href="https://instagram.com/slateafrica">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt=""
              class="instagram mr-3"
            />
            Follow us on Instagram
          </a>
          <button class="btn btn-primary mr-3" :disabled="isLoading">
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span>Submit </span>
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      isLoading: false,
      raffle_code: this.raffle_code,
    }
  },
  methods: {
    toast(toaster, append = false, variant = 'success', title, body) {
      this.counter++
      this.$bvToast.toast(body, {
        title,
        toaster,
        variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      })
    },
    async submitForm() {
      try {
        this.isLoading = true
        const participantId = JSON.parse(localStorage.getItem('asne_slate_id'))

        await axios.put(
          `https://raffle-draw.onrender.com/user/assign-code/${participantId}`,

          {
            code: this.raffle_code,
          }
        )
        this.$router.push(`/asne/confirmation`)
        await console.log('form')
      } catch (error) {
        console.log(error)
        const errorMessage = error.response.data.message
        console.log(errorMessage)
        this.toast(
          'b-toaster-bottom-center',
          true,
          'danger',
          'Error',
          errorMessage
        )
      } finally {
        this.isLoading = false
        console.log('d')
      }
    },
  },
}
</script>

<style scoped>
small {
  color: #8f9aa3;
}
.instagram {
  height: 2rem;
}
a {
  text-decoration: none;
  color: black;
}
</style>
