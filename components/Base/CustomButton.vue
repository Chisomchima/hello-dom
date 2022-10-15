<template>
  <button
    class="btn"
    :class="extraClass"
    :disabled="isLoading || disabled"
    @click="$emit('click', $event)"
  >
    <template v-if="isLoading">
      <span
        v-if="isLoading"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    </template>
    <slot>A Button</slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    extraClass: {
      type: String,
      default: 'btn-primary',
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
})
</script>

<style lang="scss" scoped></style>
