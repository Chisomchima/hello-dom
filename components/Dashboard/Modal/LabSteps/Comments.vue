<template>
  <div>
    <ModalWrapper size="md" id="comments" title="Investigation Details" :submitTitle="`Ok`" 
      :arrangement="false" :cancelText="'Close'">
      <UtilsCollapse :title="'Comments'" :comments="audit_log" />
    </ModalWrapper>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  data() {
    return {
      comments: '',
    }
  },
  props: {
    status: '',
    labOrderPanel: {
      type: Object,
      required: true,
    },
    audit_log: {
      required: true,
      default: () => ({})
    }
  },
  computed: {
    recievedDate() {
      if (this.labOrderPanel.audit_log.specimen_recieved_at) {
        return DateTime.fromISO(this.labOrderPanel.audit_log.specimen_recieved_at).toFormat(
          'yyyy-LL-dd T'
        )
      }
    },
    takenDate() {
      if (this.labOrderPanel.audit_log.specimen_taken_at) {
        return DateTime.fromISO(this.labOrderPanel.audit_log.specimen_taken_at).toFormat(
          'yyyy-LL-dd T'
        )
      }
    },
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>