<template>
  <div class="page-back-navigation mb-3">
    <a
      href="#"
      @click.prevent="linkName === null ? $router.go(-1) : goToLink()"
    >
      <span class="pr-1">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8337 10H4.16699"
            stroke="#1070B7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0003 15.8334L4.16699 10L10.0003 4.16671"
            stroke="#1070B7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
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
