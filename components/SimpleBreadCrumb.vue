<template>
  <div class="page-back-navigation mb-2 mr-2">
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

    <template v-for="(crumb, index) in crumbItems">
      <template v-if="index != crumbItems.length - 1">
        <a
          :key="index + 0"
          href="#"
          @click.prevent="toNamePath(crumb.routeObject)"
        >
          <span>{{ crumb.text }}</span>
        </a>
        <span :key="index + 2" class="mx-2"
          ><span
            class="iconify"
            data-inline="false"
            data-icon="fluent:chevron-right-16-filled"
            style="height: 15px; width: 15px; color: #8f9aa3"
          ></span
        ></span>
      </template>
      <span v-else :key="index + crumb">{{ crumb.text }}</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    crumbItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    toNamePath(routeObj) {
      this.$router.push(routeObj)
    }
  }
}
</script>

<style lang="scss" scoped></style>
