<template>
  <div class="d-flex align-items-center justify-content-center bg-white p-3">
    <div class="container">
      <div class="d-flex justify-content-center align-items-center">
        <img
          src="~assets/img/comingsoon.svg"
          alt="coming soon"
          class="img-fluid comingsoonimg"
        />
      </div>
      <div class="content">
        <h1 class="text-center fs-24 header-denied">Coming soon.</h1>
        <p class="fs-16 text-center paragraph-denied">
          We're really excited for you to see our new features!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.comingsoonimg {
  width: 300px;
  height: 300px;
}

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
</style>