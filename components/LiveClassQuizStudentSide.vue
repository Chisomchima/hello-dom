<template>
  <div class="row">
    <div class="col-md-12 col-lg-12 col-xl-12">
      <div class="mb-3 font-family_brown fs-16 text-dark">
        <h4>{{ question }}</h4>
        <!-- <br /> -->
        <small>Select the correct option</small>
      </div>
      <div class="">
        <div
          v-for="(option, index) in compOptions"
          :key="index"
          class="d-flex align-items-center mb-2"
        >
          <label class="exercise-option-check">
            <input
              v-model="compOptions[index].isSelected"
              type="checkbox"
              name="customRadio"
              @click="setOption(index)"
            />
            <span class="checkmark"></span>
            <span class="text">{{ option.option }}</span>
          </label>
        </div>
      </div>
      <div class="d-flex flex-end justify-content-end">
        <BaseButton class="btn btn-lg" @click="submitAnswer()"
          >Submit Answer</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true,
      default: '',
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      onAnswer: false,
      compOptions: [],
    }
  },
  mounted() {
    this.compOptions = this.options.map((option) => ({
      option: option.option,
      isCorrect: option.isCorrect,
      isSelected: false,
    }))
  },
  methods: {
    setOption(index) {
      this.compOptions.forEach((option) => {
        option.isSelected = false
      })
      this.compOptions[index].isSelected = true
    },
    submitAnswer() {
      const index = this.compOptions.findIndex((option) => option.isSelected)
      if (index > -1) {
        this.$emit('answer', { index })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>