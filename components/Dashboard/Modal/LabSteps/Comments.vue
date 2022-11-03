<template>
  <div>
    <ModalWrapper
      size="md"
      id="comments"
      title="Investigation Details"
      :submitTitle="`Ok`"
      @ok="cancelRequest()"
      :arrangement="false"
      :cancelText="'Close'"
    >
      <ValidationObserver ref="form">
        <form>
          <div class="container">

          <div class="text-16 text-info">
            <div v-if="labOrderPanel.audit_log">
            Specimen recieved by:
            <span>{{ labOrderPanel.audit_log.specimen_taken_by }}</span>
          </div>
          <div v-if="labOrderPanel.audit_log">
            Specimen recieved date:
            <span>{{ recievedDate }}</span>
          </div>
          <div v-if="labOrderPanel.audit_log">
            Specimen taken by:
            <span>{{ labOrderPanel.audit_log.specimen_recieved_by }}</span>
          </div>
          <div v-if="labOrderPanel.audit_log">
            Specimen taken date:
            <span>{{ takenDate }}</span>
          </div>
          </div>

            <div v-if="labOrderPanel.audit_log" class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12">
              <small class="text-grey text-14">Comment </small>
              <textarea
                v-model="labOrderPanel.audit_log.comments"
                cols="50"
                rows="5"
                placeholder="Type a comment..."
                class="
                  p-3
                  text-grey
                  form-control
                  ng-untouched ng-pristine ng-valid
                "
              ></textarea>
            </div>
          </div>
        </form>
      </ValidationObserver>
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
    async cancelRequest() {
      try {
        let response = await this.$axios.$patch(
          `laboratory/lab_panel_order/${this.labOrderPanel.id}/`,
          { status: 'CANCELLED', comments: this.comments }
        )
        this.$bvModal.hide('cancelRequest')
        this.$emit('refresh')
        this.$toast({
          type: 'success',
          text: `Order cancelled`,
        })
      } catch {
        this.$toast({
          type: 'error',
          text: `Unable to cancelled`,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>