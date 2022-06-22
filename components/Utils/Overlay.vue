<template>
  <b-overlay variant="white" opacity="1" blur="0" :show="show">
    <slot></slot>
    <template #overlay>
      <div class="text-center">
        <b-icon
          v-if="messageType == 'success'"
          icon="check-circle"
          font-scale="3"
          variant="success"
        ></b-icon>
        <b-icon
          v-if="messageType == 'error'"
          icon="x-circle"
          font-scale="3"
          variant="danger"
        ></b-icon>

        <p>{{ message }}</p>
      </div>
    </template>
  </b-overlay>
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
