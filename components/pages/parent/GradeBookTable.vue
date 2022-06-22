<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      :bordered="true"
      head-variant="light"
      class="custom-table mycustom"
    ></b-table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {}
  },
}
</script>
