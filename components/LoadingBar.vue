<template>
  <div v-if="loading" class="fullwidth">
    <div class="overlay"></div>

    <div class="centeredcontent">
      <div class="loadingimage centeredcontent bounceimage">
        <div class="d-flex flex-column">
          <img
            class="img-fluid"
            src="~assets/img/slatespinnerslogo.png"
            alt="slider"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      if (this.$store.state.loader.routerLoadingEnable === true) {
        this.loading = true
      }
      // this.loading = true;
    },
    finish() {
      this.loading = false
      this.$store.commit('loader/setRouterLoadingEnable', true)
      // this.loading = false;
    },
  },
}
</script>
<style scoped>
.overlay {
  background-color: RGBA(255, 255, 255, 0.75);
  /* backdrop-filter: blur(0.5px); */
  /* filter: blur(20px); */
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0px;
  opacity: 0.7;
}

.centeredcontent {
  width: 100vw;
  height: 60vh;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.loadingimage img {
  width: 80px;
  height: 80px;
  /* Black shadow with 10px blur */
  /* filter: drop-shadow(6px 16px 14px black); */

  /* position: relative; */
  /* left: 780px;
  bottom: -300px; */
}

.loadingimage img::before {
  content: '';
  background: radial-gradient(50% 50%, #000 0%, transparent 100%);
  height: 50px;
  position: absolute;
  bottom: -20px;
  width: 50px;
}

.ball-shadow {
  -webkit-animation-direction: alternate;
  -webkit-animation-duration: 1s;
  -webkit-animation-name: grow;
  -webkit-animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-duration: 1s;
  animation-name: grow;
  animation-iteration-count: infinite;
}

@-webkit-keyframes grow {
  from {
    bottom: 0;
    margin-left: -100px;
    height: 50px;
    opacity: 1;
    width: 200px;
  }

  to {
    bottom: -15px;
    margin-left: -150px;
    height: 80px;
    opacity: 0.4;
    width: 300px;
  }
}

@keyframes grow {
  from {
    bottom: 0;
    margin-left: -100px;
    height: 50px;
    width: 200px;
  }

  to {
    bottom: 20px;
    margin-left: 0;
    height: 10px;
    width: 15px;
  }
}

/* @-webkit-keyframes bounce {
  from {
    bottom: 20px;
  }

  to {
    bottom: 100%;
  }
}

@keyframes bounce {
  from {
    bottom: 20px;
  }

  to {
    bottom: 100%;
  }
} */

.fullwidth {
  position: absolute;
  z-index: 999;
}

.spinner {
  -webkit-animation: rotator 1.4s linear infinite;
  animation: rotator 4s linear infinite;
}

.bounceimage {
  -webkit-animation: bounce 2s linear infinite;
  animation: bounce 2s linear infinite;
}

.flip {
  backface-visibility: visible !important;
  animation: flip 2s ease infinite;
}

@keyframes flip {
  0% {
    transform: perspective(400px) rotateY(0);
    animation-timing-function: ease-out;
  }
  40% {
    transform: perspective(400px) translateZ(150px) rotateY(170deg);
    animation-timing-function: ease-out;
  }
  50% {
    transform: perspective(400px) translateZ(150px) rotateY(190deg) scale(1);
    animation-timing-function: ease-in;
  }
  80% {
    transform: perspective(400px) rotateY(360deg) scale(0.95);
    animation-timing-function: ease-in;
  }
  100% {
    transform: perspective(400px) scale(1);
    animation-timing-function: ease-in;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

@-webkit-keyframes rotator {
  0% {
    transform: translateY(9deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  -webkit-animation: dash 1.4s ease-in-out infinite,
    colors 5.6s ease-in-out infinite;
  animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
}

@-webkit-keyframes colors {
  0% {
    stroke: #f5fbff;
  }
  25% {
    stroke: #5197ca;
  }
  50% {
    stroke: #4285f4;
  }
  75% {
    stroke: #4285f4;
  }
  100% {
    stroke: #171e40;
  }
}

@keyframes colors {
  0% {
    stroke: #f5fbff;
  }
  25% {
    stroke: #5197ca;
  }
  50% {
    stroke: #4285f4;
  }
  75% {
    stroke: #4285f4;
  }
  100% {
    stroke: #171e40;
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}
/* @keyframes dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
} */
</style>
