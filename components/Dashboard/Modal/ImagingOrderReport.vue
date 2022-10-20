<template>
  <ModalWrapper
    id="imaging_order_report_id"
    submit-title="Save"
    size="lg"
    title="Report"
    @ok="save()"
    @hide="clear()"
  >
    <div>
         <div class="d-flex justify-content-between">
            <div class="col-md-7 text-14">
              <div v-if="data.patient" class="col-md-12 px-0 text-16">
                <span class="text-grey">Name:</span>
                <span class="hov point">{{
                  data.patient.salutation
                    ? data.patient.salutation +
                      ' ' +
                      data.patient.firstname +
                      ' ' +
                      data.patient.lastname
                    : data.patient.firstname + ' ' + data.patient.lastname
                }}</span>
              </div>
              <div v-if="data.patient" class="col-md-12 px-0">
                <span class="text-grey">UHID:</span>
                <span class="hov point">{{ data.patient.uhid }}</span>
              </div>
              <div v-if="data.patient" class="col-md-12 px-0 text-14">
                <span class="text-grey">Gender:</span> {{ data.patient.gender }}
              </div>
            </div>
            <div class="col-md-5 text-14">
              <div>
                <div v-if="data.img_obv" class="col-md-12 px-0 ">
                  <span class="text-grey">Modality:</span>
                  <span class="hov point">{{
                    data.img_obv ? data.img_obv.modality.name : 'nil'
                  }}</span>
                </div>
                <div v-if="data.img_obv" class="col-md-12 px-0 ">
                  <span class="text-grey">Observation:</span>
                  <span class="hov point">{{
                    data.img_obv ? data.img_obv.name : 'nil'
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <hr>
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