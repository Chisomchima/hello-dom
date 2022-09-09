<template>
  <div>
    <ModalWrapper
      size="md"
      id="addPriceList"
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
                  v-model="pricelist.name"
                  class="form-control"
                  type="text"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Description" :rules="['']">
                <input
                  v-model="pricelist.description"
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
      pricelist: {
        name: '',
        description: '',
      },
      modalTitle: 'Add pricelist',
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          let data = { ...newVal }
          // console.log(data)
          this.pricelist.name = data.name
          this.pricelist.description = data.description
          this.pricelist.id = data.id
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
      default: () => 'Add pricelist',
    },
  },
  mounted() {},

  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.pricelist.id) {
          this.editPriceList()
        } else {
          this.addPriceList()
        }
      }
    },
    async addPriceList() {
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.addPriceList(
            this.pricelist
          )
          this.$emit('refresh')
          this.$router.push({
        name: 'dashboard-settings-finance-pricelist-id',
        params: {
          id: data.id,
        }})
          this.$bvModal.hide('addPriceList')
          // console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
    },
    async editPriceList() {
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.editPriceList(
            this.pricelist,
            this.pricelist.id
          )
          this.$emit('refresh')
          this.$bvModal.hide('addPriceList')
        } catch (error) {}
      }
    },
    clear() {
      this.pricelist = {
        name: '',
        description: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>