<template>
  <ModalWrapper id="imaging_order_capture_id" submit-title="Capture" title="Capture Imaging" @ok="save()" @hide="clear()">
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Comment" :rules="[]">
              <textarea
                v-model="dataObject.comment"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </ModalWrapper>
</template>

<script>
export default {
  props: {
    data:{
      type:Object,
      required:true,
      default:() => {}
    }
  },
  data() {
    return {
      dataObject: {
        comment: '',
      },
    }
  },
  watch: {
  },
  methods: {
    async save() {
      try {
        const data = await this.$api.imaging.patchObservationOrder(this.data.id,{status:'CAPTURED', comment:this.dataObject})
        this.$emit('refresh')
        this.$bvModal.hide('imaging_order_capture_id')
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