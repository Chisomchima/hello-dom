<template>
  <div>
    <ModalWrapper
      size="md"
      id="editBill"
      :title="title"
      @clearForm="clear()"
      @hide="clear()"
      @ok="ok"
    >
      <ValidationObserver ref="form">
        <form>
          <div class="row">
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Description" :rules="['']">
                <input
                  v-model="billable.description"
                  class="form-control"
                  type="text"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Selling Price" :rules="['']">
                <input
                  v-model="billable.selling_price"
                  class="form-control"
                  type="text"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Cost Price" :rules="['']">
                <input
                  v-model="billable.cost"
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
      payers: [],
      billable: {
        id: '',
        item_code: '',
        description: '',
        selling_price: null,
        cost: null,
      },
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          let data = { ...newVal }
          this.billable.item_code = data.item_code
          this.billable.description = data.description
          this.billable.selling_price = data.selling_price
          this.billable.id = data.id
          this.billable.cost = data.cost
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
      default: () => 'Edit Billable Item',
    },
  },
  async mounted() {
  },

  methods: {
    async ok() {
      this.editBillable()
    },
    async editBillable() {
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.editBillableItems(
            this.billable,
            this.billable.id
          )
          this.$emit('refresh')
        //   debugger
          this.$bvModal.hide('editBill')
        } catch (error) {}
      }
    },
    clear() {
      this.billable = {
        id: '',
        item_code: '',
        description: '',
        selling_price: null,
        cost: null,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>