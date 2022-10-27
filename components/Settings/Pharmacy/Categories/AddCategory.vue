<template>
  <ModalWrapper
    id="addCategory"
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
            <ValidationProviderWrapper name="Parent" :rules="['']">
              <v-select
                  class="style-chooser text-grey text-14"
                  placeholder="Options"
                  :options="parents"
                  label="name"
                  v-model="dataObject.parent"
                  :reduce="opt => opt.id"
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
        parent: ''
      },
      title: '',
      parents: [],
    }
  },
  async created() {
     const { results: parents } = await this.$api.pharmacy.getCategories({
      size: 1000,
    })
    this.parents = parents
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject.id = newVal.id
          this.dataObject.name = newVal.name
          this.dataObject.parent = newVal.parent
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
        const data = await this.$api.pharmacy.createCategories(this.dataObject)
        this.$emit('refresh')
        this.$bvModal.hide('addCategory')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      try {
        const data = await this.$api.pharmacy.updateCategories(
          this.dataObject,
          this.dataObject.id
        )
        this.$emit('refresh')
        this.$bvModal.hide('addCategory')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        name: '',
        parent: ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>