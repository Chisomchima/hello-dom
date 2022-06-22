<template>
  <Transition name="fade">
    <div class="processpage d-flex align-items-center justify-content-center">
      <div class="center">
        <div class="d-flex align-items-center justify-content-center">
          <div class="pt-5 mt-5 mtcustom" style="width: 146px">
            <div class="slicer">
              <img
                src="~/assets/img/slatespinnerslogo.png"
                class="loadingimg"
                alt=""
              />
            </div>
          </div>
        </div>
        <p class="my-4 text-capitalize text-primary text-center fs-18">
          {{ text }}
        </p>
      </div>
    </div>
    <!-- <b-button v-b-modal.modal-multi-2>Open Second Modal</b-button> -->
  </Transition>
  <!-- <b-button v-b-modal.modal-multi-1>Open First Modal</b-button> -->
</template>

<script>
export default {
  data() {
    return {
      transition: false,
      text: 'Authentication successfull',
    }
  },
  mounted() {
    this.transition = true
  },
  methods: {
    setText(text) {
      this.text = text
    },
  },
}
</script>

<style scoped>
.processpage {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: -50%;

  background: #fff;
  z-index: 300;
}

.processpage .center {
  transform: translate(0, -50%);
}
/* .loadingimg {
  filter: grayscale(1);
  animation: toColor 4s infinite;
}
@keyframes toColor {
  0% {
    -webkit-filter: grayscale(0%);
    filter: grayscale(0%);
  }
  25% {
    -webkit-filter: grayscale(25%);
    filter: grayscale(25%);
  }
  50% {
    -webkit-filter: grayscale(50%);
    filter: grayscale(50%);
  }
  75% {
    -webkit-filter: grayscale(75%);
    filter: grayscale(75%);
  }
  100% {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
  }
} */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slicer {
  position: relative;
  width: 140px;
  height: auto;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 20px rgba(#000, 0.3);
  /* background-image: url(~/assets/img/slatespinnerslogo.png); */
}

.slicer::after {
  content: '';
  position: absolute;
  left: 0;
  width: 140px;
  height: 440px;
  background: white;
  mix-blend-mode: saturation;
  animation: in-out 6s ease-in-out infinite;
  border-right: 1px solid rgba(black, 0.5);
}
.slicer img {
  position: relative;
  width: 140px;
  height: auto;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 20px rgba(#000, 0.3);
  background-image: url(~/assets/img/slatespinnerslogo.png);
}

.slicer img::after {
  content: '';
  position: absolute;
  width: 140px;
  height: 440px;
  background: white;
  mix-blend-mode: saturation;
  animation: in-out 6s ease-in-out infinite;
  border-right: 1px solid rgba(black, 0.5);
}

@keyframes in-out {
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

@media screen and (max-width: 767px) {
  .processpage {
    left: 0%;
  }

  .mtcustom {
    margin-top: 100px;
  }
}
</style>

