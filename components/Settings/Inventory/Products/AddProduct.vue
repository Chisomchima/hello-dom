<template>
  <ModalWrapper id="addProduct" :title="modalTitle" @ok="ok()" @hide="clear()">
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Name" :rules="['required']">
              <input v-model="dataObject.name" type="text" class="form-control" />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Generic drug" :rules="['']">
              <v-select class="style-chooser text-grey text-14" placeholder="Generic drug" :options="generic_drug"
                v-model="dataObject.generic_drug" :reduce="(opt) => opt.id" label="name">
              </v-select>
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Parent" :rules="['required']">
              <v-select class="style-chooser text-grey text-14" placeholder="Parent" :options="parents"
                v-model="dataObject.category" :reduce="(opt) => opt.id" label="name">
              </v-select>
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Divider" :rules="['required']">
              <input v-model="dataObject.divider" type="text" class="form-control" />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Unit of measure" :rules="['required']">
              <input v-model="dataObject.uom" type="text" class="form-control" />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Cost price" :rules="['']">
              <input v-model="dataObject.cost" type="text" class="form-control" />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Bill price" :rules="['']">
              <input v-model="dataObject.bill_price" type="text" class="form-control" />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Description" :rules="['']">
              <input v-model="dataObject.description" type="text" class="form-control" />
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
        category: null,
        generic_drug: null,
        bill_price: "",
        name: "",
        uom: "",
        cost: "",
        divider: "",
        description: "",
        is_drug: false
      },
      title: '',
      parents: [],
      generic_drug: []
    }
  },
  async created() {
    this.$api.pharmacy
      .getGeneric({ size: 2000 })
      .then((res) => {
        this.generic_drug = res.results
      })

    const { results } = await this.$api.inventory.getParents({ size: 1000 })
    this.parents = results
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject.id = newVal.id
          this.dataObject.name = newVal.name
          this.dataObject.description = newVal.description
          this.dataObject.category = newVal.category
          this.dataObject.generic_drug = newVal.generic_drug
          this.dataObject.bill_price = newVal.bill_price
          this.dataObject.uom = newVal.uom
          this.dataObject.cost = newVal.cost
          this.dataObject.divider = newVal.divider
          this.dataObject.is_drug = newVal.is_drug
        }
      },
      immediate: true,
      deep: true,
    },
    "dataObject.generic_drug": {
      handler(newVal) {
        if (newVal !== null) {
          this.dataObject.is_drug = true
        }
        else {
          this.dataObject.is_drug = false
        }
      }
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
        const data = await this.$api.inventory.createProduct(this.dataObject)
        this.$emit('refresh')
        this.$bvModal.hide('addProduct')
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      try {
        const data = await this.$api.inventory.editProduct(
          this.dataObject,
          this.dataObject.id
        )
        this.$emit('refresh')
        this.$bvModal.hide('addCategory')
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        category: null,
        generic_drug: null,
        bill_price: "",
        name: "",
        uom: "",
        cost: "",
        divider: "",
        description: "",
        is_drug: false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>