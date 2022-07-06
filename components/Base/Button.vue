<template>
  <button
    class="btn"
    :class="extraClass"
    :disabled="isLoading || disabled"
    @click="$emit('click', $event)"
  >
    <template v-if="watchRequest">
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
    watchRequest: {
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
  computed: {
    isLoading() {
      const store = this.$store as any
      return store.state.requestInProgress
    },
  },
})
</script>

<style lang="scss" scoped></style>
