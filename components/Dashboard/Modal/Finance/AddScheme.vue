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
                    <v-select :options="['Self']" v-model="scheme.type" class="style-chooser" ></v-select>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Payer" :rules="['']">
                <input
                  class="form-control"
                  v-model="scheme.payer"
                  type="number"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Price List" :rules="['']">
                <input
                  class="form-control"
                  v-model="scheme.price_list"
                  type="number"
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
      scheme: {
        name: '',
        type: '',
        price_list: 0,
        payer: 0,
      },
      edit: {
       name: '',
        type: '',
        price_list: null,
        payer: null,
      },
      modalTitle: 'Add Scheme',
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.scheme = newVal
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
  mounted() {},

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
        ~~this.scheme.price_list
        ~~this.scheme.payer
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.addScheme(this.scheme)
          this.$emit('refresh')
          this.$bvModal.hide('addPayer')
          // console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
    },
    async editPayer() {
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.editPayer(
            this.scheme,
            this.scheme.id
          )
          this.$emit('refresh')
          this.$bvModal.hide('addPayer')
        } catch (error) {}
      }
    },
    clear() {
      
       this.scheme = {
        name: '',
        type: '',
        price_list: 0,
        payer: 0,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>