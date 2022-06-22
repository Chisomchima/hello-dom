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
      <label class="form-control-label"
        >Entries per participant
        <b-icon
          v-tooltip="
            'How many entries (typical word or phrase) each participant can submit'
          "
          icon="info-circle"
        ></b-icon
      ></label>
      <div class="row">
        <div class="col-2">
          <div class="d-flex">
            <input
              v-model.number="fieldObj.entries"
              v-tooltip="'Enter your username'"
              min="0"
              max="10"
              type="number"
              class="form-control ng-valid ng-dirty ng-touched"
            />
            <!---->
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
        entries: 1,
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
  methods: {},
}
</script>

<style  scoped>
</style>