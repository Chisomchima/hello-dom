<template>
  <div class="font-moseo">
    <div class="row">
      <div class="col-10">
        <div class="mb-3">
          <label class="form-control-label">Question</label>
          <textarea
            v-model="fieldObj.question"
            class="form-control form-control-sm"
            placeholder="Enter Question"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="mb-2">
      <label class="form-control-label">Options</label>
      <div class="fs-12 font-weight-bold text-dark">
        Highlight correct answer
      </div>
    </div>
    <div
      v-for="(option, index) in fieldObj.options"
      :key="index"
      class="row align-items-center mb-2"
    >
      <div class="col-md-10 col-11">
        <div class="d-flex align-items-center form-control py-0 h-auto">
          <div class="flex-grow-1 mr-2">
            <input
              v-model="fieldObj.options[index].option"
              type="text"
              placeholder="Option"
              class="form-control bg-white h-100 px-0 border-0 py-2 fs-14"
              style="box-shadow: none"
            />
          </div>
          <div>
            <label class="custom-checkbox">
              <input
                v-model="fieldObj.options[index].isCorrect"
                type="checkbox"
                @click="setCorrectOption(index)"
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="line-height-0 mr-3" @click="removeOption(index)">
        <span
          class="iconify text-danger pointer fs-18"
          data-icon="uil:trash-alt"
        ></span>
      </div>
    </div>

    <div class="row align-items-center mb-2">
      <div class="col-md-10 col-11">
        <div class="d-flex align-content-center justify-content-end">
          <div
            class="text-primary pointer d-flex align-content-center"
            @click="addOption()"
          >
            <div class="mr-1 line-height-0">
              <span
                class="iconify fs-18"
                data-icon="fluent:add-24-filled"
                style="font-size: 18px; color: #1070b7"
              ></span>
            </div>
            <strong class="fs-14">Add Option</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editField: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      fieldObj: {
        question: '',
        options: [
          {
            option: '',
            isCorrect: true,
          },
        ],
      },
    }
  },
  watch: {
    fieldObj: {
      handler(newVal) {
        this.$emit('data:fields', newVal)
      },
      deep: true,
    },
    editField: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.fieldObj = newVal
        }
      },
      immediate: true,
    },
  },
  methods: {
    addOption() {
      this.fieldObj.options.push({
        option: '',
        isCorrect: false,
      })
    },
    removeOption(index) {
      this.fieldObj.options.splice(index, 1)
    },
    setCorrectOption(index) {
      this.fieldObj.options.forEach((option) => {
        option.isCorrect = false
      })
      this.fieldObj.options[index].isCorrect = true
    },
  },
}
</script>

<style lang="scss" scoped>
</style>