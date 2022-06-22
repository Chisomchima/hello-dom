export default {
  data() {
    return {
      fieldObj: {},

      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD',
        // Uses 'iso' if missing
      },
      masks: {
        input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD', 'DD-MM-YY'],
      },
    }
  },
  methods: {
    resetForm() {
      this.fieldObj = {}
    },
  },
  props: {
    title: {
      type: String,
      default: 'Add Academic Year',
    },
    school: {
      type: Object,
      required: false,
    },
    field: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    field: {
      handler(newVal) {
        if (Object.values(newVal).length > 0) {
          this.fieldObj = { ...newVal }
        } else {
          this.resetForm()
        }
      },
      immediate: true,
      deep: true,
    },
  },
}
