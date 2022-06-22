<template>
  <div class="mb-3">
    <div class="card rounded py-2">
      <section class="header">
        <strong>{{ data.title ? data.title : '' }}</strong>
        <span class="text-primary hover" @click="handleAdd">
          <strong>
            <span class="iconify" data-icon="ant-design:plus-outlined"></span>
          </strong>

          Add New Account
        </span>
      </section>
      <section v-if="data.content && data.content.length">
        <div
          v-for="(item, index) in data.content"
          :key="index"
          class="m-4 px-4 py-3 content row mb-1"
        >
          <div class="d-flex align-items-center text-secondary col-3">
            <div>
              <div>
                {{ item.name ? item.name : '' }}
              </div>
              <p class="lighter-secondary">
                {{ item.left ? item.left : '' }}
              </p>
            </div>
          </div>
          <div class="text-secondary col-7">
            {{ item.middle ? item.middle : '' }}
          </div>
          <div class="d-flex align-items-center justify-content-center col-2">
            <span class="iconify" data-icon="bi:pencil"></span>
          </div>
        </div>
      </section>

      <section
        v-else
        class="
          d-flex
          align-items-center
          justify-content-center
          text-secondary
          py-4
        "
      >
        You haven't added any accounts here yet
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    categories: {
      type: Array,
      default: () => [],
    },
    types: {
      type: Array,
      default: () => [],
    },
    accounts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },

  methods: {
    handleAdd() {
      this.$emit('add')
    },

    refresh() {
      this.$emit('refreshPage')
    },
  },
}
</script>

<style scoped>
.header {
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
}
.content {
  background-color: #f9f9fc;
}
.lighter-secondary {
  font-size: 0.8rem;
  color: #adb6bc;
}

label {
  font-size: 12px;
  color: rgb(122, 120, 120);
}
.style-chooser1 >>> .vs__search::placeholder,
.style-chooser1 >>> .vs__dropdown-toggle,
.style-chooser1 >>> .vs__dropdown-menu {
  background: #fbfdfe;
  color: #abb4bc;
}
</style>
