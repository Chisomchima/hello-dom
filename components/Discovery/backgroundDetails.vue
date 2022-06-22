<template>
  <div id="balloon-container" class="balloncont" ref="ballooncontainer">
    <!-- <div v-for="balloon in numberofballoons" :key="balloon">
      <div class="balloon ballonstyle"></div>
    </div> -->

    <div class="absolute">
      <iframe src="https://embed.lottiefiles.com/animation/86157"></iframe>
    </div>

    <iframe
      src="https://embed.lottiefiles.com/animation/7393"
      class="balloonsframe else"
    ></iframe>
    <iframe
      src="https://embed.lottiefiles.com/animation/7393"
      class="sticktotop else"
    ></iframe>
    <iframe
      src="https://embed.lottiefiles.com/animation/7393"
      class="sticktotop else"
    ></iframe>
    <iframe
      src="https://embed.lottiefiles.com/animation/7393"
      class="sticktotop else"
    ></iframe>
    <iframe
      src="https://embed.lottiefiles.com/animation/7393"
      class="sticktotop else"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberofballoons: 50,
      balloonHtml: '',
      //   balloon: ''
    }
  },
}
</script>


<style scoped>
body {
  margin: 0;
}

iframe {
  border: 0;
}

.balloonsframe {
  position: relative;
  right: -100px;
}

iframe .else {
  width: 350px;
  height: 536px;
}

.sticktotop {
  top: -30px;
  position: absolute;
}

.absolute {
  position: relative;
  top: -20px;
  z-index: 23;
}

#balloon-container {
  height: 100vh;
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  position: absolute;
  flex-wrap: wrap;
  overflow: hidden;
}

.balloon {
  height: 125px;
  width: 105px;
  border-radius: 75% 75% 70% 70%;
  position: relative;
}

.ballonstyle {
  background-color: rgba(137, 196, 154, 0.7);
  color: rgba(220, 219, 200, 0.7);
  margin: 10px 0 0 20px;
  animation: float 4s ease-in infinite;
}

.balloon:before {
  content: '';
  height: 75px;
  width: 1px;
  padding: 1px;
  background-color: #fdfd96;
  display: block;
  position: absolute;
  top: 125px;
  left: 0;
  right: 0;
  margin: auto;
}

.balloon:after {
  content: '0';
  text-align: center;
  display: block;
  position: absolute;
  color: inherit;
  top: 120px;
  left: 0;
  right: 0;
  margin: auto;
}

@keyframes float {
  from {
    transform: translateY(100vh);
    opacity: 1;
  }
  to {
    transform: translateY(-300vh);
    opacity: 0;
  }
}
</style>