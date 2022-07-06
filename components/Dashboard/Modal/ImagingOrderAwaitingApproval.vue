<template>
  <ModalWrapper
    id="imaging_order_awaiting_approval"
    submit-title="Report"
    size="lg"
    title="Approve Report"
    @ok="save()"
    @hide="clear()"
  >
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Report" :rules="[]">
              <p v-if="editable" v-html="dataObject.report"></p>
              <VueEditor v-else v-model="dataObject.report" readonly />
            </ValidationProviderWrapper>
          </div>
        </div>
      </form>
    </ValidationObserver>

    <template #footer="{ cancel }">
      <div class="d-flex w-100 justify-content-between px-5">
        <div>
          <b-button
            size="sm"
            variant="light"
            class="px-5 text-secondary mr-2"
            @click="cancel()"
          >
            Cancel
          </b-button>
        </div>

        <div v-if="editable">
          <button class="btn btn-secondary px-5" @click="editable = !editable">
            Edit
          </button>
        </div>

        <div v-if="!editable">
          <BaseButton
            extra-class="'px-5  btn-info'"
            :class="'px-5  btn-info'"
            @click="save('AWAITING_APPROVAL')"
          >
            Save
          </BaseButton>
        </div>
        <div>
          <BaseButton class="px-5" @click="approve('APPROVED')">
            Approve
          </BaseButton>
        </div>
      </div>
    </template>
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
      editable: true,
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
    async save(status) {
      try {
        const imagingId = this.data.id
        const data = await this.$api.imaging.patchObservationOrder(imagingId, {
          status,
          report: this.dataObject.report,
        })
        this.$bvModal.hide('imaging_order_awaiting_approval')
        this.$emit('refresh')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    async approve(status) {
      try {
        const imagingId = this.data.id
        const data = await this.$api.imaging.patchObservationOrder(imagingId, {
          status,
          report: this.dataObject.report,
        })
        this.$bvModal.hide('imaging_order_awaiting_approval')
        this.$emit('refresh')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.editable = true
      this.dataObject = {
        report: '',
      }
      this.$emit('hide')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>