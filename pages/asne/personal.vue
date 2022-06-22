<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submitForm)">
        <div class="bg-white border-radius mb-5 p-4">
          <h4 class="mb-4">Personal Details</h4>

          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
              <ValidationProviderWrapper :rules="['required']">
                <small> Full Name </small
                ><input
                  type="text"
                  v-model="personal.full_name"
                  placeholder="Full Name*"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
              <ValidationProviderWrapper :rules="['required']">
                <small> Email </small
                ><input
                  required
                  v-model="personal.email"
                  type="email"
                  placeholder="Email*"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
              <ValidationProviderWrapper :rules="['required']">
                <small> Phone Number </small
                ><input
                  required
                  v-model="personal.phone_number"
                  type="number"
                  placeholder="Phone Number*"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </ValidationProviderWrapper>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary mr-3" :disabled="isLoading">
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span>Next </span>
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
      personal: {
        phone_number: '',
        full_name: '',
        email: '',
      },
    }
  },
  mounted() {
    try {
      const local = localStorage.getItem('asne_slate')
      if (local) {
        const stringed = JSON.parse(local)
        console.log('local storage', stringed)
        if (stringed.personal) {
          this.personal = stringed.personal
        }
      } else {
        console.log('nothinng stored')
      }
    } catch (error) {
      console.log(error)
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
        await localStorage.setItem(
          'asne_slate',
          JSON.stringify({ personal: this.personal })
        )
        const response = await axios.post(
          'https://raffle-draw.onrender.com/user/create',
          this.personal
        )
        const participantId = JSON.stringify(response.data.id)
        console.log('participants', participantId)
        localStorage.setItem('asne_slate_id', participantId)

        this.$router.push(`/asne/school`)
        await console.log('form')
      } catch (error) {
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
      }
    },
  },
}
</script>

<style scoped>
small {
  color: #8f9aa3;
}
</style>
