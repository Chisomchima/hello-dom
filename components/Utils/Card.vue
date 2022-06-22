<template>
  <UtilsOverlay :show="show" :message="message" :message-type="messageType">
    <template>
      <div
        class="card"
        style="box-shadow: 0px 16px 24px rgba(74, 136, 255, 0.05)"
      >
        <div class="card-body">
          <slot></slot>
        </div>
      </div>
    </template>
  </UtilsOverlay>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'Successful'
    },
    messageType: {
      type: String,
      default: 'success'
    }
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.zero-width {
  width: 0;
}
</style>
