<template>
  <div>
    <ModalWrapper
      id="takespecimen"
      size="md"
      :title="modalTitle"
      @clearForm="clear()"
      @hide="clear()"
      @ok="setStatusToSpecimenRecieved()"
      @close="clear()"
    >
      <ValidationObserver ref="form">
        <form>
          <div>
            <h4 class="text-info text-16 p-3">Please confirm this action</h4>

            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Comment" :rules="[]">
                <textarea
                  v-model="comments"
                  cols="20"
                  rows="5"
                  class="form-control"
                ></textarea>
              </ValidationProviderWrapper>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
// import { DateTime } from 'luxon'
export default {
  props: {
    status: '',
    id: '',
    modalTitle: '',
  },
  data() {
    return {
      comments: '',
      placeholder: 'Type a comment...',
    }
  },
  methods: {
    async setStatusToSpecimenRecieved() {
      try {
        const response = await this.$axios.$patch(
          `laboratory/lab_panel_order/${this.id}/`,
          { status: this.status, comments: this.comments }
        )
        this.$emit('refresh')
      } catch {
        this.$toast({
          type: 'error',
          text: 'Unable to change status',
        })
      }
    },
    clear() {
      this.comments = ''
      this.$bvModal.hide('takespecimen')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>