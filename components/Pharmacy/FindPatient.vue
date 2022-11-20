<template>
  <ModalWrapper
    size="md"
    id="findPatient"
    title="Find Patient"
    :arrangement="false"
    :stacking="false"
    :cancelText="'Close'"
  >
 
  </ModalWrapper>
</template>

<script>
import { debounce } from 'lodash'

export default {
  props: {
    dataObject: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    role: {
      require: false,
    },
  },
  data() {
    return {
      uhid: '',
      selected: [],
      present: false,
      downloading: false,
    }
  },
  watch: {
    uhid: debounce(async function (newVal) {
      this.downloading = true
      const results = await this.getPatientByUHID(newVal)
      if (results) {
        this.dataObject.patient = results
        this.downloading = false
      } else {
        this.dataObject.patient = {}
        this.downloading = false
      }
    }, 1000),
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        this.save()
      }
    },
   
    async getPatientByUHID(uhid) {
      try {
        if (uhid.length > 0) {
          const results = await this.$api.patient.getPatientByUHID(uhid)
          return results
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
textarea.form-control {
  min-height: 50px;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.float {
  position: relative;
  top: -10px;
  right: -25px;
}
.shrink {
  height: 2px;
}
</style>