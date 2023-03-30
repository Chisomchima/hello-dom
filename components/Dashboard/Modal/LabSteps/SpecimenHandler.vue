<template>
  <div>
    <ModalWrapper
      id="takespecimen"
      :title="modalTitle"
      size="md"
      :no-stacking="false"
      :stacking="false"
      @hide="$bvModal.hide('takespecimen')"
      @ok="setStatusToSpecimenRecieved()"
    >
    
      <UtilsCollapse :title="'Comments'" :comments="audit_log" />
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
export default {
  // watch: {
  //     audit_log(newVal){
  //         console.log(newVal, 'newaudit')
  //     }
  // },
  props: {
    status: {
        type: String,
    },
    id: {
        type: Number,
        default:0,
    },
    modalTitle:{
        type: String,
        default:'',
    },
    audit_log: {
    //   required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      prevComment: '',
      comments: '',
      placeholder: 'Type a comment...',
      // changeId: true,
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
        // this.$bvModal.hide("takespecimen");
      } catch {
        this.$toast({
          type: 'error',
          text: 'Unable to change status',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
