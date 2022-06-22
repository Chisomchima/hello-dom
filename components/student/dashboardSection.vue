<template>
  <div style="margin-bottom: 48px">
    <div class="section-title">
      <div style="margin-bottom: 12px" class="d-flex align-items-center">
        <div
          class="pointer"
          @click="
            $router.push(`/student/lms/${$route.params.schoolId}/${titlelink}`)
          "
        >
          <slot name="section-title">{{ title }}</slot>
        </div>
        <div class="d-flex ml-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 2L8 6L4 10"
              stroke="#1070B7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      v-if="empty"
      style="
        height: 250px;
        background: #ffffff;
        border: 1px solid #d9e9f6;
        border-radius: 8px;
      "
      class="d-flex justify-content-center align-items-center flex-column"
    >
      <p style="font-size: 16px; color: #8b9eb0; margin: 0">
        You have completed all your {{ category }} 🎉
      </p>
      <button
        class="text-capitalize"
        style="
          margin-top: 24px;
          background: #ffffff;
          border: 1px solid #e5e7ef;
          box-sizing: border-box;
          box-shadow: 0px 4px 8px rgba(16, 112, 183, 0.05);
          border-radius: 5px;
          font-size: 14px;
          color: #8b9eb0;
          padding: 14px 20px;
        "
        @click="
          $router.push(
            `/student/lms/${$store.state.administration.school.code}/${category}`
          )
        "
      >
        Previous {{ category }}
      </button>
    </div>
    <div v-else style="position: relative">
      <div class="scroll-shadow">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            filter="url(#filter0_d_3130_52875)"
            @click="scrollItems(elementclasstoscroll)"
          >
            <path
              d="M9 22.5L16.5 15L9 7.5L10.5 4.5L21 15L10.5 25.5L9 22.5Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_3130_52875"
              x="-5"
              y="-9.5"
              width="40"
              height="49"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="7" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_3130_52875"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_3130_52875"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div class="intro defaultScrollClass" style="overflow-x: scroll">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Notice Board',
    },
    titlelink: {
      type: String,
      default: 'notice-board',
    },
    empty: {
      type: Boolean,
      default: false,
    },
    elementclasstoscroll: {
      type: String,
      default: 'defaultScrollClass',
    },
    category: {
      type: String,
      default: 'lessons',
    },
  },
  methods: {
    scrollItems(element) {
      const myElement = this.$el.querySelector(`.${element}`)
      myElement.scrollLeft += 100
    },
  },
}
</script>

<style scoped>
.dashboard-section {
  margin-bottom: 48px;
}
.section-title {
  font-size: 16px;
  color: #8b9eb0;
}
.scroll-shadow {
  position: absolute;
  width: 120px;
  height: 100%;
  right: 0;
  background: linear-gradient(
    273.06deg,
    rgba(32, 37, 58, 0.3) 2.72%,
    rgba(32, 37, 58, 0) 78.36%
  );
  display: flex;
  align-items: center;
  z-index: 2;
}
.scroll-shadow > svg {
  position: absolute;
  right: 12px;
}
.intro::-webkit-scrollbar {
  display: none;
}
.intro *::-webkit-scrollbar {
  display: none;
}
</style>
