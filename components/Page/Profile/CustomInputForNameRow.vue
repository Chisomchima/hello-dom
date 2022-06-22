<template>
  <div class="col-4">
    <input
      v-if="toInput && !readOnly"
      v-model="currentValue"
      type="text"
      class="form-control"
      :placeholder="`Enter ${label}`"
    />
    <span v-else>{{ currentValue }}</span>
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
