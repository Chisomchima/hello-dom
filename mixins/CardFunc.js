import { pick } from 'lodash'
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    enableAction: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    displayKey: {
      type: Array,
      required: false,
    },
  },
  computed: {
    filterData() {
      return pick(this.data, this.displayKey)
    },
  },
}
