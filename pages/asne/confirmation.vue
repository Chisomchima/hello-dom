<template>
  <main>
    <section class="d-flex px-3 mb-3 justify-content-between">
      <div class="">
        <img :src="require('~/assets/img/slatespinnerslogo.png')" alt="" />
      </div>
      <div class="images">
        <img :src="require('~/assets/img/asne_logo.webp')" />
      </div>
    </section>
    <div class="card rounded">
      <!-- <img
        class="custom-img"
        :src="require('~/assets/img/discoverySlides/balloon2.jpg')"
      /> -->

      <p class="p-4">
        You have succesfully registered for the raffle draw, the results will be
        announced on Saturday, May 21st.

        <br />
        Thank you for choosing Slate and goodluck!
      </p>
    </div>
    <div class="d-flex mt-3 align-items-center mt-0 pt-0">
      <a target="_blank" href="https://instagram.com/slateafrica">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
          alt=""
          class="instagram mr-3"
        />
      </a>

      Follow us on Instagram
    </div>
  </main>
</template>

<script>
export default {}
</script>

<style scoped>
img {
  height: 3rem;
}
.custom-img {
  height: 15rem;
  width: 100%;
}
.instagram {
  height: 2rem;
}
</style>
