<template>
  <b-td>
    <textarea
      v-model="localValue"
      name=""
      :disabled="!disable"
      class="form-control text-left"
      cols="20"
      rows="2"
    >
    </textarea>
  </b-td>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    disable: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      localValue: this.value,
      toggle: false,
    }
  },
  watch: {
    localValue(val) {
      this.$emit('change', val)
    },
  },
}
</script>

<style lang="scss" scoped></style>
