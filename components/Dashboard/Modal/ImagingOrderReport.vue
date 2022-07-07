<template>
  <ModalWrapper
    id="imaging_order_report_id"
    submit-title="Report"
    size="lg"
    title="Capture Report"
    @ok="save()"
    @hide="clear()"
  >
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Report" :rules="[]">
              <!-- <textarea
                v-model="dataObject.comment"
                type="text"
                class="form-control"
              /> -->
              <VueEditor v-model="dataObject.report" />
            </ValidationProviderWrapper>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </ModalWrapper>
</template>

<script>
import modalMsgBox from '~/mixins/modalMsgBox'
export default {
  mixins: [modalMsgBox],
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      dataObject: {
        report: '',
      },
    }
  },
  watch: {
    data: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject.report = newVal.report
        }
      },
      deep: true,
    },
  },
  methods: {
    async save() {
      try {
        const imagingId = this.data.id;
        const data = await this.$api.imaging.patchObservationOrder(
          imagingId,
          { status: 'CAPTURED', report: this.dataObject.report }
        )
        const result = await this.showConfirmMessageBox(
          'Do you want to submit for approval'
        )
        if (result) {
          await this.$api.imaging.patchObservationOrder(imagingId, {
            status: 'AWAITING_APPROVAL',
          })

         this.$bvModal.hide('imaging_order_report_id')
        }
        this.$emit('refresh')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        comment: '',
      }
      this.$emit('hide')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>