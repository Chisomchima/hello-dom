<template>
  <div class="d-flex no-gutters" style="column-gap: 8px">
    <div class="col-xl-6">
      <input
        v-if="toInput && !readOnly"
        v-model="currentValue"
        type="text"
        class="form-control"
        :placeholder="`Enter ${label}`"
      />
      <span v-else>{{ currentValue }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      toInput: false
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
