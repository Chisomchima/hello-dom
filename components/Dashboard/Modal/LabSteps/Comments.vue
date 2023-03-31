<template>
  <div>
    <ModalWrapper id="comments" size="md" title="Investigation Details" :submit-title="`Ok`" 
      :arrangement="false" :cancel-text="'Close'">
      <UtilsCollapse :title="'Comments'" :comments="audit_log" />
    </ModalWrapper>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
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
  data() {
    return {
      comments: '',
    }
  },
  computed: {
    recievedDate() {
      if (this.labOrderPanel.log.specimen_recieved_at) {
        return DateTime.fromISO(this.labOrderPanel.log.specimen_recieved_at).toFormat(
          'yyyy-LL-dd T'
        )
      }
    },
    takenDate() {
      if (this.labOrderPanel.log.specimen_taken_at) {
        return DateTime.fromISO(this.labOrderPanel.log.specimen_taken_at).toFormat(
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