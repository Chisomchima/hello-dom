<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="name"
    :rules="rulesArr"
    v-bind="moreProps"
  >
    <label class="form-control-label">{{ label || name }}</label>
    <slot></slot>
    <span class="text-danger form-control-label font-weight-light">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "ValidationProviderWrapper",
  props: {
    name: {
      type: String,
      required: false,
    },
    moreProps: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    rules: {
      type: Array,
      required: true,
    },
  },
  computed: {
    rulesArr() {
      return this.rules.join("|");
    },
  },
  render(h) {
    return h("div", this.$slots.default);
  },
});
</script>
