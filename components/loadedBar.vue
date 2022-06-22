<template>
  <div class="align-item-center align-items-center d-flex justify-content-center vh-100">
    <div class="position-relative">
      <svg
        class="spinner"
        width="125px"
        height="125px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="path"
          fill="none"
          stroke-width="4"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>

      <span
        style="top: 15px; right: 45px; font-size: 4rem"
        class="position-absolute text-primary"
      >
        S
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
  }),
};
</script>
<style scoped>
.spinner {
  -webkit-animation: rotator 1.4s linear infinite;
  animation: rotator 1.4s linear infinite;
}

@-webkit-keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
.path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  -webkit-animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
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
