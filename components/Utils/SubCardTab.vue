<template>
  <div v-if="active" ref="subCardTab">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      active: true,
    }
  },
  mounted() {
    console.log('tab mounted')
  },
}
</script>

<style lang="scss" scoped>
</style>