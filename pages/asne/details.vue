<template>
  <div>
    <section class="d-flex px-3 mb-3 justify-content-between">
      <div class="">
        <img :src="require('~/assets/img/logo.png')" alt="" />
      </div>
      <div class="images">
        <img :src="require('~/assets/img/asne_logo.webp')" />
      </div>
    </section>
    <section class="card rounded ">
      <img class="custom_size" :src="require('~/assets/img/details_raffle.jpeg')" />
      <div class="px-3">
      
       <h4 class=" mb-0 mt-3 underline">22 Digital Classroom Raffle draw</h4>
      <h5 class="mt-2  text-secondary">Win a digital classroom setup for any school of your choice</h5>
      <ul class="text-secondary">
      <li>49 inch display</li>
      <li> Wireless projection</li>
      <li> Wireless network & setup</li>
      
      </ul>
      <p class="py-2 mt-0  text-secondary">
        This Raffle is open to parents, teachers, well wishers of the school that wish to
        win the digital classroom setup for their school.
     <br/>
        To participate, simply fill the registration form and follow us on Instagram
      </p>
      <div class="d-flex align-items-center mt-0 pt-0">
      <a
      target="_blank"
      
       href="https://instagram.com/slateafrica">
      
      
      <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="" class="instagram mr-3 ">
      
      </a>

      Follow us on Instagram
      </div>
      </div>
     
    </section>
<div class="d-flex justify-content-end">

   <b-button class="mt-3" variant="primary" @click="$router.push(`/asne/personal`)"
        >Start Registeration</b-button
      >
</div>
   
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
img {
  height: 3rem;
}
.custom_size {
  height: 15rem;
}
.instagram {
  height: 2rem;
}
</style>
