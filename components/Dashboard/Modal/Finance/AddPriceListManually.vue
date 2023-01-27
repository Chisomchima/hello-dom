<template>
  <div>
    <ModalWrapper
      size="md"
      id="addPricelistManually"
      :title="title"
      @ok="ok()"
      @hide="clear()"
    >
      <ValidationObserver ref="form">
        <form>
          <div class="row">
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Co-Pay type" :rules="[]">
                <v-select
                  :options="['AMOUNT', 'PERCENTAGE']"
                  v-model="pricelist.co_pay.type"
                  class="style-chooser"
                ></v-select>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Co-Pay value" :rules="[]">
                <input
                  v-model="pricelist.co_pay.value"
                  class="form-control"
                  type="text"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper
                name="Selling price"
                :rules="['required']"
              >
                <input
                  v-model="pricelist.selling_price"
                  class="form-control"
                  type="text"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="d-flex flex-wrap w-100">
              <div class="col-md-3 mb-2">
                <ValidationProviderWrapper
                  name="Auth required"
                  :rules="['required']"
                >
                  <div class="w-100">
                    <input
                      v-model="pricelist.is_auth_req"
                      class="tickbox"
                      type="checkbox"
                    />
                  </div>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-3 mb-2">
                <ValidationProviderWrapper
                  name="Capitated"
                  :rules="['required']"
                >
                  <div class="w-100">
                    <input
                      v-model="pricelist.is_capitated"
                      class="tickbox"
                      type="checkbox"
                    />
                  </div>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-3 mb-2">
                <ValidationProviderWrapper
                  name="Exclusive"
                  :rules="['required']"
                >
                  <div class="w-100">
                    <input
                      v-model="pricelist.is_exclusive"
                      class="tickbox"
                      type="checkbox"
                    />
                  </div>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-3 mb-2">
                <ValidationProviderWrapper
                  name="Post auth"
                  :rules="['required']"
                >
                  <div class="w-100">
                    <input
                      v-model="pricelist.post_auth_allowed"
                      class="tickbox"
                      type="checkbox"
                    />
                  </div>
                </ValidationProviderWrapper>
              </div>
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
        co_pay: {
          type: '',
          value: '',
        },
        selling_price: '',
        is_auth_req: null,
        is_capitated: null,
        is_exclusive: null,
        post_auth_allowed: null,
      },
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          let data = { ...newVal }
          this.pricelist.id = data.id
          this.pricelist.co_pay.value = data.co_pay.value
          this.pricelist.co_pay.type = data.co_pay.type
          // this.pricelist.module = data.module
          this.pricelist.price_list = data.price_list
          this.pricelist.selling_price = data.selling_price
          this.pricelist.is_auth_req = data.is_auth_req
          this.pricelist.is_capitated = data.is_capitated
          this.pricelist.is_exclusive = data.is_exclusive
          this.pricelist.post_auth_allowed = data.post_auth_allowed
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
  async mounted() {},

  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.pricelist.id) {
          this.editpricelist()
        } else {
          this.addpricelist()
        }
      }
    },
    async addpricelist() {
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.addpricelist(
            this.pricelist
          )
          this.$emit('refresh')
          this.$bvModal.hide('addpricelistwithpayer')
        } catch (error) {
          console.log(error)
        }
      }
    },
    async editpricelist() {
      // delete this.pricelist.id
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.editPricelistItem(
            this.pricelist,
            this.pricelist.id
          )
          this.$emit('refresh')
          this.$bvModal.hide('addPricelistManually')
        } catch (error) {}
      }
    },
    clear() {
      this.pricelist = {
        co_pay: {
          type: '',
          value: '',
        },
        selling_price: '',
        is_auth_req: null,
        is_capitated: null,
        is_exclusive: null,
        post_auth_allowed: null,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tickbox {
  height: 25px;
  width: 25px;
}
</style>