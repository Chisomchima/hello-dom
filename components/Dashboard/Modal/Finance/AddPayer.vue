<template>
  <div>
    <ModalWrapper
      size="md"
      id="addPayer"
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
                  v-model="payer.name"
                  class="form-control"
                  type="text"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper
                name="Address"
                :rules="['']"
              >
                <input
                  class="form-control"
                 v-model="payer.address"
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
      payer: {
        name: '',
        address: '',
      },
      edit:{
        name: '',
        address: '',
      },
      modalTitle:'Add Payer',
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.payer = newVal
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
      default: () => ('Add payer'),
    },
  },
  mounted(){
  },
  
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.payer.id) {
          this.editPayer()
        } else {
          this.addPayer()
        }
      }
    },
    async addPayer() {
      if (await this.$refs.form.validate()) {
        try {
        const data = await this.$api.finance_settings.addPayer(this.payer)
        this.$emit('refresh')
        this.$bvModal.hide('addPayer')
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
      }
    },
    async editPayer(){
        if (await this.$refs.form.validate()) {
        try {
        const data = await this.$api.finance_settings.editPayer(this.payer, this.payer.id)
        this.$emit('refresh')
        this.$bvModal.hide('addPayer')
       
      } catch (error) {
       
      }
      }
    },
    clear() {
      this.payer = {
        name: '',
        address: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>