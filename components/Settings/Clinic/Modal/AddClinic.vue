<template>
  <ModalWrapper id="addClinic" :title="modalTitle" @ok="ok()" @hide="clear()">
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Clinic" :rules="['required']">
              <!-- <input
                class="form-control"
                type="text
              /> -->
              <input
                v-model="dataObject.name"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Department" :rules="['required']">
              <v-select
                class="style-chooser text-grey text-14"
                placeholder="Department"
                :options="departments"
                v-model="dataObject.department"
                :reduce="(opt) => opt.id"
                label="name"
              >
              </v-select>
               </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Bill price" :rules="['required']">
              <!-- <input
                class="form-control"
                type="text
              /> -->
              <input
                v-model="dataObject.bill_price"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Cost price" :rules="['required']">
              <!-- <input
                class="form-control"
                type="text
              /> -->
              <input
                v-model="dataObject.cost_price"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2 d-flex align-items-center">
            <ValidationProviderWrapper name="" :rules="['required']">
              <b-form-checkbox size="lg" switch v-model="dataObject.is_active">
              </b-form-checkbox>
              <!-- <input
                v-model="dataObject.is_active"
                type="checkbox"
                class=""
                style="height: 0px; width: 30px"
              /> -->
            </ValidationProviderWrapper>
            <div class="text-14" v-if="dataObject.is_active">Active</div>
            <div class="text-14" v-else>Disabled</div>
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
      default: () => 'Add clinic',
    },
  },
  data() {
    return {
      dataObject: {
        bill_price: '',
        cost_price: '',
        department: 0,
        name: '',
        is_active: true,
      },
      title: '',
      departments: []
    }
  },
  async created() {
    const { results: departments } = await this.$api.facility.departments({
      size: 1000,
    })
    this.departments = departments
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject.id = newVal.id
          this.dataObject.bill_price = newVal.bill_price
          this.dataObject.cost_price = newVal.cost_price
          if(newVal.department){
            this.dataObject.department = newVal.department.id
          }
          this.dataObject.name = newVal.name
          this.dataObject.is_active = newVal.is_active
          // delete this.dataObject.bill_item_code
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
        const data = await this.$api.opd.createClinic(this.dataObject)
        this.$emit('refresh')
        this.$bvModal.hide('addClinic')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      try {
        const data = await this.$api.opd.editClinic(
          this.dataObject.id,
          this.dataObject
        )
        this.$emit('refresh')
        this.$bvModal.hide('addClinic')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        bill_price: '',
        cost_price: '',
        department: 0,
        name: '',
        is_active: true,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>