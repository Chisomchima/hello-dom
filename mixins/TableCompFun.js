import { DateTime } from 'luxon'
export default {
  data() {
    return {
      busy: false,
      items: [],
      fields: [],
      pages: 1,
    }
  },
  methods: {
    dataTimeFormat(value) {
      console.trace(value)
      // const dt = DateTime.fromISO(value)
      // return dt.toLocaleString(DateTime.DATETIME_MED)
      return DateTime.fromISO(value).toFormat('ffff')
    },
    dataFormat(value) {
      return DateTime.fromISO(value).toFormat('DDD')
    },
  },
}
