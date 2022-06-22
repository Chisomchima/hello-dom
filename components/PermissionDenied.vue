<template>
  <div class="container bg-white p-5">
    <div class="d-flex justify-content-center">
      <div>
        <div class="d-flex flex-column flex-sm-row justify-content-center">
          <img
            src="~/assets/img/clip-sign-up.svg"
            alt="permission denied image"
            class="img-fluid"
          />
        </div>
        <h2 class="text-center header-denied">Permission Denied</h2>
        <p class="text-center paragraph-denied">
          You do not have permission to access this page. please contact your
          school administrator.
        </p>

        <div class="d-flex justify-content-center">
          <button @click="$router.go(-1)" class="btn btn-text goback mx-2">
            Go Back
          </button>
          <NuxtLink to="/" class="btn btn-text homepage mx-2">
            Go to Home Page</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.header-denied {
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -1px;
  color: #1070b7;
}

.paragraph-denied {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  color: #797b86;
}

.btn-text {
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
}

.goback {
  background: #dbeaf4;
  color: #1070b7;
}
.homepage {
  background: #1070b7;
  color: #fff;
}
</style>

