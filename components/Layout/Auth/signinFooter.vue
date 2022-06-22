<template>
  <div class="auth-footer px-5">
    <div class="d-flex justify-content-between flex-wrap">
      <div class="d-flex">
        <!-- <span class="click mr-2">
          <nuxt-link to="/support" class="summ"> Support </nuxt-link> </span
        > -->

        <span class="click mx-2">
          <nuxt-link to="/privacy-policy"> Privacy Policy </nuxt-link> </span
        ><span class="click ml-2">
          <nuxt-link to="/terms"> Terms and Conditions </nuxt-link>
        </span>
      </div>
      <div>© 2022 Slate.ng, All Rights Reserved</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.auth-footer {
  color: #b8bcd5;
  font-size: 14px;
  height: 10%;
}
a {
  color: #c0c0c0;
}
</style>
