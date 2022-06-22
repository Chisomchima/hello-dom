<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submitForm)">
        <div class="bg-white border-radius mb-5 p-4">
          <h4 class="mb-4">School Details</h4>

          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
              <ValidationProviderWrapper :rules="['required']">
                <small> Name of School </small
                ><input
                  v-model="school.state_name"
                  type="text"
                  placeholder="First Name*"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 mb-3"></div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      school: {
        type_of_school: '',
        state_name: '',
      },
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
          'asne_slate_school',
          JSON.stringify({ school: this.school })
        )
        const participantId = JSON.parse(localStorage.getItem('asne_slate_id'))
        await axios.put(
          `https://raffle-draw.onrender.com/user/update/${participantId}`,
          this.school
        )

        this.$router.push(`/asne/code`)
        await console.log('form')
      } catch (error) {
        console.log(error)
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
