<template>
  <div class="d-flex flex-column width50 mx-auto">
    <div class="row text-center my-3">
      <div class="col text-left">
        <h2 class="text-left font-family_brown font-weight-bold">Sign in</h2>
      </div>
    </div>
    <ValidationObserver>
      <form class="googleresponsive">
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <ValidationProviderWrapper :name="'Username'" :rules="['required']" :label="'Username'">
                <input v-model="username" class="form-control ng-untouched ng-pristine ng-valid" placeholder="Username"
                  type="text" />
              </ValidationProviderWrapper>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group" @keyup.enter="submitForm">
              <ValidationProviderWrapper :name="'Password'" :rules="['required']" :label="'Password'">
                <BaseInput v-model="password" type="password" />
              </ValidationProviderWrapper>

            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <BaseCustomButton :isLoading="loading" class="w-100 btn-lg" @click.prevent="submitForm">Login</BaseCustomButton>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
    <!-- <transition v-if="showPage" name="home">
      <AuthProcessModal ref="authProcessModal" />
    </transition> -->
  </div>

  <!-- </div> -->
</template>

<script>
export default {
  layout: "signup",
  // middleware: "guest",
  data() {
    return {
      username: "",
      password: "",
      showPage: false,
      loading: false,
    };
  },

  mounted(){
     this.$store.commit('toggleRequestInProgress', false)
  },
  

  methods: {
    async submitForm() {
     if(this.username !== '' && this.password !== ''){
      this.loading = true
       try {
        let response = await this.$store.dispatch("auth/login", {
          username: this.username,
          password: this.password,
        });
        if(response.token != null){
          this.$router.push("/dashboard");
          this.$store.dispatch('auth/setupDashboard')
        }
        else{
          this.$store.dispatch('auth/setupDashboard')
          this.$router.push("/auth/verify-password");
        }
        this.loading = false
      } catch (error) {
        console.log(error);
      }
      finally{
        this.loading = false
      }
     }
    },

    goBack() {
      this.$router.push("/");
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
