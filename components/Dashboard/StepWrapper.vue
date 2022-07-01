<template>
  <div class="card bg-white mb-3">
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-12 mb-3 mb-xl-0">
          <div class="wizard-steps">
            <template v-for="(step, index) in steps">
              <div
                :key="index"
                class="step"
                :class="[currentStep === index ? 'active' : '']"
              >
                <span>{{ index + 1 }}</span>
                {{ step }}
              </div>
            </template>
          </div>
        </div>
      </div>
      <hr class="my-3" />
      <slot :currentStep="currentStep"></slot>
      <div class="mt-4 d-flex align-items-center justify-content-end">
        <button
          v-if="Number(currentStep) >= 1"
          class="btn btn-outline-primary py-2 px-3 ml-3"
          @click="prev()"
        >
          Previous
        </button>
        <button
          v-if="
            Number(currentStep) >= 0 && Number(currentStep) < steps.length - 1
          "
          class="btn btn-outline-primary py-2 px-3 ml-3"
          @click="next()"
        >
          Next
        </button>
        <button
          v-if="Number(currentStep) === steps.length - 1"
          class="btn btn-outline-primary py-2 px-3 ml-3"
          @click="$emit('done')"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // steps: ['Setup Lesson', 'Lesson Content', 'Exercise'],
      currentStep: 0,
      prevStep: 0,
    }
  },
  watch: {
    currentStep(_newVal, oldVal) {
      this.prevStep = oldVal
    },
  },
  methods: {
    next() {
      const currentStep = this.currentStep + 1
      this.$emit('requestPageChange', {
        currentPage: this.currentStep,
        nextPage: currentStep,
      })
    },

    prev() {
      const currentStep = this.currentStep - 1
      this.$emit('requestPageChange', {
        currentPage: this.currentStep,
        nextPage: currentStep,
      })
    },
    goto(num) {
      this.currentStep = num
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>