<template>
  <div>
    <main class="main-section bg-gray">
      <section class="page-heading-extranet page-heading-style-2 landing-image">
        <div
          class="container position-relative z-index-1"
          style="padding-bottom: 4rem"
        >
          <p
            class="text-white text-left ptcustom"
            style="cursor: pointer"
            @click="$router.go(-1)"
          >
            <span class="iconify" data-icon="eva:arrow-back-fill"></span>
            Back
          </p>

          <div class="pt-md-5">
            <div class="title-text mb-2 mb-sm-3 text-white pt-5 text-center">
              Interested in Slate.ng or <br />
              want to refer a school?
            </div>
            <div class="subtitle-text mb-3 mb-sm-5 text-white">
              Please call 018880097 OR send an email to info@slate.ng OR fill
              out the form below.
            </div>
          </div>
        </div>
      </section>

      <section class="container py-5">
        <div v-if="demoRequestedSuccessfully" class="card demo-success-card">
          <div
            class="
              bg-white
              rounded
              p-5
              d-flex
              justify-content-center
              align-items-center
            "
          >
            <div class="d-flex justify-content-center align-items-center">
              <div class="text-success text-center">
                <span
                  class="iconify"
                  data-icon="clarity:success-standard-solid"
                  data-width="60"
                  data-height="60"
                ></span>

                <h3 class="fs-20 text-center text-success mt-3">
                  Your request has been sent successfully. We will contact you
                  to schedule a demo.
                </h3>

                <NuxtLink
                  to="/"
                  class="btn btn-text py-2 px-3 homepage mx-2 mt-5"
                >
                  Go to Home Page</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
        <div v-else class="card demo-form-card">
          <div class="card-body">
            <form class="row" @submit.prevent="submitRequest">
              <div class="col-md-6 mb-3">
                <label class="form-control-label text-white"
                  >What Best Describes You ? *</label
                >

                <select class="form-control">
                  <option value="parent">Parent</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="just checking slate out">
                    Just Checking Slate Out
                  </option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-control-label text-white"
                  >Institution
                </label>
                <input
                  v-model="institution"
                  type="text"
                  class="form-control"
                  placeholder="Enter the name of your institution"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-control-label text-white"
                  >First name *</label
                >
                <input
                  v-model="first_name"
                  type="text"
                  class="form-control"
                  placeholder="First name"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-control-label text-white">Last name *</label>
                <input
                  v-model="last_name"
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-control-label text-white"
                  >Email Address *</label
                >
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  placeholder="Enter your email address"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-control-label text-white"
                  >Phone number *</label
                >
                <input
                  v-model="phone_number"
                  type="number"
                  class="form-control"
                  placeholder="Enter your phone number"
                />
              </div>
              <div class="col-md-6 mb-3">
                <!-- <pre>{{ countryList }}</pre> -->
                <label class="form-control-label text-white">Country </label>
                <v-select
                  v-model="selectedCountry"
                  class="style-chooser form-control custom"
                  placeholder="Country"
                  label="name"
                  :options="countryList"
                  @input="changeState"
                >
                </v-select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-control-label text-white">State </label>
                <v-select
                  v-model="selectedState"
                  class="style-chooser form-control custom"
                  placeholder="State"
                  label="name"
                  :options="stateList"
                >
                </v-select>
              </div>
              <div class="col-md-12 mb-3">
                <div>
                  <label class="form-control-label text-white"
                    >Your message
                  </label>
                  <textarea
                    v-model="comment"
                    class="form-control"
                    placeholder="Enter your message here"
                  ></textarea>
                </div>
              </div>
              <div class="col-md-12 pt-4">
                <div class="d-flex justify-content-end">
                  <button
                    class="btn btn-outline-light py-2"
                    :disabled="demoIsRequesting"
                  >
                    <span v-if="demoIsRequesting" class="mr-1">
                      <b-spinner small></b-spinner
                    ></span>
                    Request Demo
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  layout: 'notLoggedin',

  data() {
    return {
      selectedState: '',
      selectedCountry: '',
      first_name: '',
      last_name: '',
      institution: '',
      email: '',
      phone_number: '',
      comment: '',
      describe_yourself: '',
      verified: '',
      status: '',
      hear_about_us: 'nil',
      active: '',
      countryList: [],
      stateList: [],
      newState: [],
      demoIsRequesting: false,
      response: '',
      demoRequestedSuccessfully: false,
    }
  },

  mounted() {
    this.getCountries()
  },
  methods: {
    async getCountries() {
      try {
        const response = await this.$axios.$get('/util/v2/countries/')
        const filtered = Object.keys(response)
        this.countryList.push(
          ...filtered.filter((element) => element !== 'message')
        )
      } catch (e) {
        console.log(e)
      }
    },
    async changeState() {
      if (this.selectedCountry === 'Nigeria') {
        const response = await this.$axios.$get('/util/v2/countries/')
        response.Nigeria.forEach((element) => {
          this.stateList.push(element.state_name)
        })
      } else {
        this.stateList = []
      }
    },

    async submitRequest() {
      this.demoIsRequesting = true
      try {
        if (this.selectedState !== 'Federal Capital Territory') {
          this.selectedState = this.selectedState.substring(
            0,
            this.selectedState.length - 6
          )
        }

        this.response = await this.$axios.$post('util/v2/demorequest/', {
          state: this.selectedState ? this.selectedState : 'NoState',
          first_name: this.first_name,
          last_name: this.first_name,
          institution: this.institution
            ? this.institution
            : 'No Institution Chosen',
          email: this.email,
          phone_number: this.phone_number,
          location: this.selectedCountry ? this.selectedCountry : 'NoCountry',
          comment: this.comment,
          describe_yourself: this.describe_yourself,
          how_did_you_hear_about_us: this.hear_about_us,
        })

        console.log('res', this.response)

        this.demoIsRequesting = false
        this.$toast({
          type: 'success',
          text: 'Message Sent Successfully',
        })

        this.demoRequestedSuccessfully = true
      } catch (error) {
        console.log()
        this.$toast({
          type: 'error',
          text: `${error.response.data.data}`,
        })
        this.demoIsRequesting = false
        this.demoRequestedSuccessfully = false
      }
    },
  },
}
</script>

<style scoped>
.landing-image {
  background-image: url('~/assets/img/page-header-4.png');
}

.form-control.custom {
  background: #fff !important;
  padding: 0 !important;
}

#vs1__combobox {
  padding: 0 !important;
}

.ptcustom {
  padding-top: 150px;
}

@media (max-width: 767px) {
  .ptcustom {
    padding-top: 50px;
  }
}

.demo-success-card {
  background: #fff;
  box-shadow: 0px 24px 48px rgba(2, 18, 30, 0.12);
  border-radius: 12px;

  width: 100%;
  max-width: 1000px;

  margin: -6rem auto 2rem;
}
</style>
