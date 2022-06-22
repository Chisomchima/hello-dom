<template>
  <b-sidebar
    id="sidebar-right"
    no-header
    right
    shadow
    @shown="$emit('shown')"
    @hidden="$emit('hidden')"
  >
    <template #default="{ hide }">
      <div class="d-flex flex-column h-100">
        <div
          class="bg-grayish-blue px-3 py-3"
          style="box-shadow: 0px 2px 4px rgba(150, 150, 187, 0.12)"
        >
          <div class="d-flex align-items-center justify-content-between">
            <div class="fs-14 line-height-100p text-dark font-weight-bold">
              {{ title }}
            </div>
            <div class="pointer line-height-0" @click="hide">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12"
                  stroke="#8F9AA3"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 4L12 12"
                  stroke="#8F9AA3"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="filters-container-content flex-grow-1 px-0 py-1">
          <slot />
        </div>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'no title passed',
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
