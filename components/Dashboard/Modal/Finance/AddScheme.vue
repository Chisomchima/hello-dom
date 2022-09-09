<template>
  <div>
    <ModalWrapper
      size="md"
      id="addScheme"
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
              <ValidationProviderWrapper name="Type" :rules="['']">
                <v-select
                  :options="['SELF', 'INSURANCE']"
                  v-model="scheme.type"
                  class="style-chooser"
                ></v-select>
              </ValidationProviderWrapper>
            </div>
            <!-- <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Payer" :rules="['']">
                <input
                  class="form-control"
                  v-model="scheme.payer"
                  type="number"
                />
              </ValidationProviderWrapper>
            </div> -->
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Price List" :rules="['']">
                <!-- <input
                  class="form-control"
                  v-model="scheme.price_list"
                  type="number"
                /> -->
                 <v-select
                  :options="pricelists"
                  v-model="scheme.price_list"
                  class="style-chooser"
                  label="name"
                  :reduce="(opt) => opt.id"
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
      scheme: {
        name: '',
        type: '',
        payer: null,
        price_list: null
      },
      editData: {
        name: '',
        type: '',
        payer: null,
        price_list: null
      },
      pricelists: []
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
         let data = {...newVal}
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
    let response = await this.$api.finance_settings.getPriceList({
      size: 10000
    })
    this.pricelists = response.results
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
      // this.scheme.price_list = ~~this.scheme.price_list
      this.scheme.payer = this.$route.params.id
      this.scheme.payer = ~~this.scheme.payer
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.addScheme(this.scheme)
          this.$emit('refresh')
          this.$bvModal.hide('addScheme')

        } catch (error) {
          console.log(error)
        }
      }
    },
    async editScheme() {
       this.scheme.payer = this.$route.params.id
      this.scheme.payer = ~~this.scheme.payer
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.editPayer(
            this.scheme,
            this.$route.params.id
          )
          this.$emit('refresh')
          this.$bvModal.hide('addScheme')
        } catch (error) {}
      }
    },
    clear() {
      this.scheme = {
        name: '',
        type: '',
        payer: null,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>