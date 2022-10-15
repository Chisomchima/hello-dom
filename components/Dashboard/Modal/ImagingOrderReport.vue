<template>
  <ModalWrapper
    id="imaging_order_report_id"
    submit-title="Report"
    size="lg"
    title="Report"
    @ok="save()"
    @hide="clear()"
  >
    <div>
      <div>
        <v-select
          class="style-chooser text-grey text-14"
          placeholder="Templates"
          :reduce="(opt) => opt.content"
          :options="templates"
          v-model="style"
          label="title"
        >
        </v-select>
      </div>
      <ValidationObserver ref="form">
        <form>
          <div class="row">
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Report" :rules="[]">
                <VueEditor v-model="dataObject.report" />
              </ValidationProviderWrapper>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
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
      style: null,
      templates: []
    }
  },
  async created(){
    const { results: templates } = await this.$api.templates.getTemplates({
      size: 1000,
      source: 'IMAGING'
    })
    this.templates = templates
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
    style(){
      this.dataObject.report = this.style
    }
  },
  methods: {
    async save() {
      try {
        const imagingId = this.data.id
        const data = await this.$api.imaging.patchObservationOrder(imagingId, {
          status: 'CAPTURED',
          report: this.dataObject.report,
        })
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
      this.style = null
      this.$emit('hide')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>