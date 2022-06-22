<template>
  <div class="row mb-3">
    <div class="col-md-8 col-lg-12 col-xl-8">
      <div
        class="
          fs-14
          mb-3
          font-family_brown
          d-flex
          align-items-center
          justify-content-between
        "
      >
        <div class="text-light">
          QUESTION {{ questionNumber }} of {{ total }}
        </div>
        <div class="text-primary">
          {{ mark }} <span class="text-light">marks</span>
        </div>
      </div>
      <div
        class="
          mb-3
          font-family_brown
          fs-16
          text-dark text-black
          font-weight-bold
        "
      >
        {{ question }}
      </div>

      <slot></slot>
    </div>
    <div
      class="
        col-md-4 col-lg-12 col-xl-4
        mb-3 mb-md-0 mb-lg-3 mb-xl-0
        order-first order-md-last order-lg-first order-xl-last
      "
    >
      <!-- <div
                                    class="
                                        file-type-display
                                        py-3
                                        px-3
                                        text-center
                                        bg-white
                                    "
                                    style="max-width: 241px"
                                >
                                    <img
                                        src="~/assets/img/illustration-6.svg"
                                        class="img-fluid w-100"
                                    />
                                </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      default: '',
    },
    questionNumber: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    mark: {
      type: Number,
      default: 0,
    },
  },
}
</script>
