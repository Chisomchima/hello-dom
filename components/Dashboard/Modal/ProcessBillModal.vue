<template>
  <ModalWrapper submit-title="Make Payment" title="Confirm Payment" @ok="ok()" @hide="clear()">
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Amount" :rules="['required']">
              <!-- <input
                class="form-control"
                type="text
              /> -->
              <input
                v-model="dataObject.amount"
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
    editData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      dataObject: {
        amount: '',
      },
    }
  },
  watch: {
    // editData: {
    //   handler(newVal) {
    //     if (Object.keys(newVal).length > 0) {
    //       this.dataObject = newVal
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  methods: {
     ok() {
      this.$emit('ok',this.dataObject.amount)
    },
    // async save() {
    //   try {
    //     const data = await this.$api.imaging.saveServiceCenter(this.dataObject)
    //     this.$emit('refresh')
    //     this.$bvModal.hide('modal')
    //     console.log(data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    // async edit() {
    //   try {
    //     const data = await this.$api.imaging.editServiceCenter(
    //       this.dataObject.id,
    //       this.dataObject
    //     )
    //     this.$emit('refresh')
    //     this.$bvModal.hide('modal')
    //     console.log(data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },

    clear() {
      this.dataObject = {
        name: '',
      }
      this.$emit('hide')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>