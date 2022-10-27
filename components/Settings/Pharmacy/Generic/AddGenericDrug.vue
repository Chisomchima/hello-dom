<template>
  <ModalWrapper
    id="addGeneric"
    :title="modalTitle"
    @ok="ok()"
    @hide="clear()"
    :notScrollable="true"
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
            <ValidationProviderWrapper name="Category" :rules="['']">
              <v-select
                  class="style-chooser text-grey text-14"
                  placeholder="Options"
                  :options="category"
                  label="name"
                  v-model="dataObject.category"
                >
                </v-select>
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
      default: () => 'Add Category',
    },
  },
  data() {
    return {
      dataObject: {
        name: '',
        category: ''
      },
      title: '',
      category: [],
    }
  },
  async created() {
     const { results: category } = await this.$api.pharmacy.getCategories({
      size: 1000,
    })
    this.category = category
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject.id = newVal.id
          this.dataObject.name = newVal.name
          this.dataObject.category = newVal.category
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
        const data = await this.$api.pharmacy.createGeneric(this.dataObject)
        this.$emit('refresh')
        this.$bvModal.hide('addGeneric')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      try {
        const data = await this.$api.pharmacy.updateGeneric(
          this.dataObject,
          this.dataObject.id
        )
        this.$emit('refresh')
        this.$bvModal.hide('addGeneric')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        name: '',
        category: ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>