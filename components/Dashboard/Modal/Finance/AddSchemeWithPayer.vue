<template>
  <div>
    <ModalWrapper
      size="md"
      id="addSchemewithpayer"
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
                <input v-model="scheme.name" class="form-control" type="text" />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Type" :rules="['required']">
                <v-select
                  :options="['SELF', 'INSURANCE']"
                  v-model="scheme.type"
                  class="style-chooser"
                ></v-select>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Payer" :rules="['required']">
                <v-select
                  :options="payers"
                  label="name"
                  v-model="scheme.payer"
                  :reduce="(option) => option.id"
                  class="style-chooser"
                ></v-select>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Price List" :rules="['required']">
                 <v-select
                  :options="price_list"
                  label="name"
                  v-model="scheme.price_list"
                  :reduce="(option) => option.id"
                  class="style-chooser"
                ></v-select>
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
        price_list: [],
      scheme: {
        name: '',
        type: '',
        payer: null,
        price_list: null
      },
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          let data = {...newVal}
          console.log(data)
          this.scheme.name = data.name
          this.scheme.type = data.type
          this.scheme.price_list = data.price_list
          this.scheme.id = data.id
          this.scheme.payer = data.payer
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
      default: () => 'Add Scheme',
    },
  },
  async mounted() {
    let payers = await this.$api.finance_settings.getPayers({size: 10000})
    this.payers = payers.results
    let pricelist = await this.$api.finance_settings.getPriceList({size: 10000})
    this.price_list = pricelist.results
    console.log(this.price_list)
  },

  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.scheme.id) {
          this.editScheme()
        } else {
          this.addScheme()
        }
      }
    },
    async addScheme() {
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.addScheme(this.scheme)
          this.$emit('refresh')
          this.$bvModal.hide('addSchemewithpayer')

        } catch (error) {
          console.log(error)
        }
      }
    },
    async editScheme() {
      if(this.scheme.payer.id){
        this.scheme.payer = this.scheme.payer.id
      }
      else{
        this.scheme.payer
      }

      if(this.scheme.price_list.id){
        this.scheme.price_list = this.scheme.price_list.id
      }
      else{
        this.scheme.price_list
      }

      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.editScheme(
            this.scheme,
            this.scheme.id
          )
          this.$emit('refresh')
          this.$bvModal.hide('addSchemewithpayer')
        } catch (error) {}
      }
    },
    clear() {
      this.scheme = {
        name: '',
        type: '',
        payer: null,
        price_list: null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>