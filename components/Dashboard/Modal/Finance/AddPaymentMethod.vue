<template>
  <div>
    <ModalWrapper
      size="md"
      id="addPaymentMethod"
      :title="title"
      @clearForm="clear()"
      @hide="clear()"
      @ok="ok"
    >
      <ValidationObserver ref="form">
        <form>
          <div class="row">
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Name" :rules="['required']">
                <input
                  v-model="paymentMethod.name"
                  class="form-control"
                  type="text"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Description" :rules="['']">
                <input
                  v-model="paymentMethod.description"
                  class="form-control"
                  type="text"
                />
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
  data() {
    return {
      paymentMethod: {
        name: '',
        description: '',
      },
      modalTitle: 'Add payment method',
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          let data = { ...newVal }
          // console.log(data)
          this.paymentMethod.name = data.name
          this.paymentMethod.description = data.description
          this.paymentMethod.id = data.id
        }
      },
      immediate: true,
      deep: true,
    },
  },
  props: {
    editData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    title: {
      type: String,
      require: false,
      default: () => 'Add payment method',
    },
  },
  mounted() {},

  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.paymentMethod.id) {
          this.editPaymentMethod()
        } else {
          this.addPaymentMethod()
        }
      }
    },
    async addPaymentMethod() {
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.addPaymentMethod(
            this.paymentMethod
          )
          this.$emit('refresh')
          this.$bvModal.hide('addPaymentMethod')
          // console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
    },
    async editPaymentMethod() {
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.editPaymentMethod(
            this.paymentMethod,
            this.paymentMethod.id
          )
          this.$emit('refresh')
          this.$bvModal.hide('addPaymentMethod')
        } catch (error) {}
      }
    },
    clear() {
      this.paymentMethod = {
        name: '',
        description: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>