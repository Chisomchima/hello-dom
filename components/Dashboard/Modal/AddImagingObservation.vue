<template>
  <ModalWrapper
    title="Add Observation"
    @ok="ok()"
    @show="getData()"
    @hide="clear()"
  >
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Name" :rules="['required']">
              <input
                v-model="dataObject.name"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Image unit" :rules="['required']">
              <VSelect
                v-model="dataObject.modality"
                label="name"
                :reduce="(opt) => opt.id"
                :options="labUnits"
              ></VSelect>
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper
              name="Billing Price"
              :rules="[]"
            >
              <input
                v-model="dataObject.bill_price"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper
              name="Cost Price"
              :rules="[]"
            >
              <input
                v-model="dataObject.cost_price"
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
      labUnits: [],
      dataObject: {
        name: '',
        active: true,
        modality: 0,
        status: '',
        bill_price: '',
        cost_price: '',
      },
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject = newVal
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.dataObject.id) {
          this.edit()
        } else {
          this.save()
        }
      }
    },
    async save() {
      try {
        const data = await this.$api.imaging.saveObservation(this.dataObject)
        this.$emit('refresh')
        this.$bvModal.hide('modal')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      try {
        const data = await this.$api.imaging.editObservation(
          this.dataObject.id,
          this.dataObject
        )
        this.$emit('refresh')
        this.$bvModal.hide('modal')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        name: '',
      }
      this.$emit('hide')
    },
    async getData() {
      try {
        const { results } = await this.$api.imaging.getLabUnit({ size: 1000 })
        this.labUnits = results
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>