<template>
  <div>
    <div class="site-nav space">
      <LayoutAuthNavbar />
    </div>

    <Nuxt />
    <div class="w-100" style="backgroundcolor: #6880df">
      <signin-footer />
    </div>
  </div>
</template>

<script>
import signinFooter from "~/components/Layout/Auth/signinFooter.vue";
export default {
  components: { signinFooter },
};
</script>

<style scoped>
.space {
  margin-top: 3.6rem;
}
.bottom {
  position: fixed;
  bottom: 0;
}
</style>
