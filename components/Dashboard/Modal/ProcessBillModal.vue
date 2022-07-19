<template>
  <ModalWrapper
    submit-title="Make Payment"
    title="Confirm Payment"
    @ok="ok()"
    @hide="clear()"
  >
  <div class="p-2">
    Total: {{total ? total.toLocaleString('en-US') : ''}}
  </div>
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
                :value="formattedQty"
                type="text"
                class="form-control"
                @input="handleQtyInput($event.target.value)"
              />
            </ValidationProviderWrapper>
          </div>
          <!-- <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Payment Method" :rules="['']">
             <VSelect
                class="text-grey text-14"
                placeholder="Type to search"
                label="name"
                
                :options="paymentMethod"
                :reduce="(option) => option"
                multiple
                taggable
              >
            </VSelect>
            </ValidationProviderWrapper>
          </div> -->
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
    nameData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    total: {
      type: Number,
      require: false,
      default: () => 0
    }
  },
  data() {
    return {
      dataObject: {
        amount: '',
      },
      paymentMethod: []
    }
  },
  computed: {
    formattedQty () {
      // Add the commas back to the string
      const qty = this.dataObject.amount + ""
      console.log(qty);
      return qty.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
  },
  async mounted(){
    const data = await this.$api.finance.paymentMethods({
      size: 1000, name: this.nameData.firstname
    })
    console.log('Im mounted', data.results)
    this.paymentMethod = data.results
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

    handleQtyInput (newValue) {
      // console.log(newValue.target.value);
      // Make sure the stored qty is not formatted
      this.dataObject.amount = newValue.toString().replace(/\D/g, "")
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
        amount: '',
      }
      this.$emit('hide')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>