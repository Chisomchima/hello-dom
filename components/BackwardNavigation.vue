<template>
  <div class="page-back-navigation mb-3">
    <a
      href="#"
      @click.prevent="linkName === null ? $router.go(-1) : goToLink()"
    >
      <b-icon icon="arrow-left" class="mr-2"></b-icon>
      <span>{{ text }}</span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: () => 'Back'
    },
    linkName: {
      type: String,
      required: false,
      default: () => null
    }
  },
  methods: {
    goToLink() {
      this.$router.push({
        name: this.linkName
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
