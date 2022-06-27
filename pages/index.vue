<template>
  <div class="mt-3">
    <landing-page />
  </div>
</template>

<script lang="ts">
export default {

  layout: 'notLoggedin',
  middleware:'to_slatemd'
  // middleware: 'guest',
}
</script>
<style></style>
