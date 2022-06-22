<template>
  <div class="row">
    <div class="col-md-12 col-lg-12 col-xl-12">
      <div class="mb-3 font-family_brown fs-16 text-dark">
        <h4>{{ question }}</h4>
        <small>Enter your answers</small>
      </div>
      <div class="">
        <div
          v-for="(entry, index) in Number(entries)"
          :key="index"
          class="d-flex align-items-center mb-2"
        >
          <label for="" class="mr-3">{{ index + 1 }}</label>
          <input
            v-model="answer[index]"
            type="text"
            class="form-control"
            style="max-width: 500px"
          />
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
    entries: {
      type: Number,
      required: true,
      default: 3,
    },
  },
  data() {
    return {
      answer: [],
    }
  },
  methods: {
    submitAnswer() {
      this.$emit('answer', { words: this.answer })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>