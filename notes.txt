<template>
  <div class=" container-fluid d-flex justify-content-center align-items-center bg-white w-100">
    <div class="mt-5">
      <div class="relativecontainer">
        <!-- <img src="~assets/img/networkerror.svg" alt="" class="img-fluid" /> -->
        <div v-if="error.statusCode === 404" class="text-center">
          <img src="~/assets/img/not-found.gif" alt="" class="img-fluid w-75" />
        </div>
        <div v-else class="text-center">
          <img src="/networkerror.svg" alt="" class="img-fluid w-75" />
        </div>
      </div>

      <div class="d-flex justify-content-center mt-5">
        <button @click="$router.go(-1)" class="btn btn-text py-2 px-3 goback mx-2">
          Go Back
        </button>

        <NuxtLink to="/" class="btn btn-text py-2 px-3 homepage mx-2">
          Go to Home Page</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout(context) {
    const word = "sms";
    const word2 = ['student','lms'];
    if (context.route.path.includes(word)) {
      return "auth";
    }
    if(word2.every(word => context.route.path.includes(word))) {
      return "student";
    } 
    return "default";
  },

  props: ["error"],
};
</script>

<style scoped>

.container-fluid {
 height: 100vh;
}
.relativecontainer {
  position: relative;
  width: 100%;
  height: 100%;
}

.goback {
  background: #dbeaf4;
  color: #1070b7;
}

.errortext {
  font-family: Brown;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}

.errorparagraph {
  font-family: Brown;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}

.absolutecontainer {
  position: absolute;
  bottom: 110px;
  left: 430px;
  width: 30%;
  /* padding-bottom: 30%; */
  /* margin: -24% 56%; */
}

@media (max-width: 773px) {
  .absolutecontainer {
    bottom: 90px;
    left: 420px;
  }
}

@media (max-width: 758px) {
  .absolutecontainer {
    left: 400px;
  }
}
@media (max-width: 722px) {
  .absolutecontainer {
    left: 375px;
  }
  .errortext {
    font-size: 18px;
  }
  .errorparagraph {
    font-size: 12px;
  }
}
@media (max-width: 710px) {
  .absolutecontainer {
    left: 363px;
    bottom: 80px;
    width: 20%;
  }
}
@media (max-width: 670px) {
  .absolutecontainer {
    left: 350px;
    bottom: 80px;
    width: 30%;
  }
}
</style>
