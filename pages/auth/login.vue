<template>
  <div class="d-flex flex-column width50 mx-auto">
    <div class="row text-center my-3">
      <div class="col text-left">
        <h2 class="text-left font-family_brown font-weight-bold">Sign in to SlateMD</h2>
        <!-- <span>Don't have account? <nuxt-link to="/auth/signup">Sign Up</nuxt-link></span> -->
      </div>
    </div>
    <ValidationObserver>
    <!-- <ValidationObserver v-slot="{ handleSubmit }"> -->
      <!-- <form class="googleresponsive" @submit.prevent="handleSubmit(submitForm)"> -->
      <form class="googleresponsive">
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <ValidationProviderWrapper
                :name="'Username'"
                :rules="['required']"
                :label="'Username'"
              >
                <input
                  v-model="username"
                  class="form-control ng-untouched ng-pristine ng-valid"
                  placeholder="Email"
                  type="email"
                />
              </ValidationProviderWrapper>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group" @keyup.enter="submitForm">
              <ValidationProviderWrapper
                :name="'Password'"
                :rules="['required']"
                :label="'Password'"
              >
                <BaseInput v-model="password" type="password" />
              </ValidationProviderWrapper>
              <!-- <div class="text-right">
                <span class="text-right click"
                  ><nuxt-link to="/auth/recover-password" class="text-dark mb-0 py-2"
                    >Forgot Password?</nuxt-link
                  ></span
                >
              </div> -->
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <BaseButton watch-request class="w-100 btn-lg" @click.prevent="$router.push('/dashboard')">Login</BaseButton>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
    <transition v-if="showPage" name="home">
      <AuthProcessModal ref="authProcessModal" />
    </transition>
  </div>

  <!-- </div> -->
</template>

<script>
import AuthMixins from "@/mixins/auth-mixins";
export default {
  mixins: [AuthMixins],
  layout: "signup",
  // middleware: "guest",
  data() {
    return {
      username: "",
      password: "",
      showPage: false,
    };
  },
  

  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch("auth/login", {
          username: this.username,
          password: this.password,
        });
        // this.$bvModal.show('process-modal')
        this.showPage = true;

        if (this.$refs.authProcessModal) {
          this.$refs.authProcessModal.setText("Authentication Successfull");
          this.$refs.authProcessModal.setText("Getting User Info...");
        }

        await this.setDataInStore();

        // the function below checks if users is a staff then
        // the gets the staff id and uses that to get th roles for each staff per school
        this.$refs.authProcessModal.setText("Getting User Roles and permission...");
        await this.setRolesInStore();

        this.$refs.authProcessModal.setText("Redirecting...");

        await this.redirect();

        // this.$router.push("/discovery");
      } catch (error) {
        console.log(error);
        // if (error.response.status === 403) {
        //   this.$router.push('/auth/verify-account')
        // }
      }
    },
    async getMenuData() {
      try {
        const result = await this.$axios.$get("/lms/menu");
        console.log("menu data ", result);
      } catch (error) {
        console.log(error);
      }
    },

    goBack() {
      this.$router.push("/");
    },
    store(school) {
      this.$store.dispatch("administration/putSchool", school);
    },
    async googleLogin(response) {
      try {
        const data = await this.$axios.$post("/api-auth/login/google/", {
          id_token: response.credential,
        });
        this.$store.commit("auth/SET_USER", data.data.user_details);
        this.$store.commit("auth/SET_TOKEN", data.data.token);
        // console.log(data)

        this.showPage = true;

        if (this.$refs.authProcessModal) {
          this.$refs.authProcessModal.setText("Authentication Successfull");
          this.$refs.authProcessModal.setText("Getting User Info...");
        }

        await this.setDataInStore();

        // the function below checks if users is a staff then
        // the gets the staff id and uses that to get th roles for each staff per school
        this.$refs.authProcessModal.setText("Getting User Roles and permission...");
        await this.setRolesInStore();

        this.$refs.authProcessModal.setText("Redirecting...");

        await this.redirect();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.font-bolded {
  font-weight: 900;
  font-family: avenir-bd;
  font-size: 45px !important;
}

.width50 {
  width: 50%;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

/* .slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
} */

.slide-fade-enter,
.slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}

.googleresponsive {
  width: 400px;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

@media screen and (max-width: 991px) {
  .width50 {
    width: 70%;
  }
  .googleresponsive {
    width: 100%;
  }
}
@media screen and (max-width: 582px) {
  .width50 {
    width: 90%;
  }
}
</style>
