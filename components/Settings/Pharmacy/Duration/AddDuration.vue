<template>
  <ModalWrapper
    id="addDurations"
    :title="modalTitle"
    @ok="ok()"
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
            <ValidationProviderWrapper name="Multiplier" :rules="['required']">
              <input
                v-model="dataObject.multiplier"
                type="number"
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
    modalTitle: {
      type: String,
      require: false,
      default: () => 'Add Duration',
    },
  },
  data() {
    return {
      dataObject: {
        name: '',
        multiplier: ''
      },
      title: '',
      departments: [],
    }
  },
  async created() {
    
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject.id = newVal.id
          this.dataObject.name = newVal.name
          this.dataObject.multiplier = newVal.multiplier
        }
      },
      immediate: true,
      deep: true,
    },
    modalTitle() {
      this.title = this.modalTitle
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
        const data = await this.$api.pharmacy.createDurations(this.dataObject)
        this.$emit('refresh')
        this.$bvModal.hide('addDurations')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      try {
        const data = await this.$api.pharmacy.updateDurations(
          this.dataObject,
          this.dataObject.id
        )
        this.$emit('refresh')
        this.$bvModal.hide('addDurations')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        name: '',
        multiplier: ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>