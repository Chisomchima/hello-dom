<template>
  <div class="d-flex justify-content-end ml-2 colorO">
    <h1>{{isToggle}}</h1>
    <b-icon-chevron-down v-if="isToggle"></b-icon-chevron-down>
    <b-icon-chevron-up v-else></b-icon-chevron-up>
  </div>
</template>

<script>
export default {
  props: {
    isToggled: {
      default: false,
    },
  },
}
</script>

<style scoped>
.down {
  transform: rotate(0deg);
}
.up {
  transform: rotate(-90deg);
}
.colorO {
  color: #65696c;
}
</style>
