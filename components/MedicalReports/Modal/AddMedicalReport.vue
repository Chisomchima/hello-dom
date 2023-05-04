<template>
  <ModalWrapper
    id="addMedicalReport"
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
            <ValidationProviderWrapper name="Category" :rules="['required']">
              <VSelect
                v-model="dataObject.category"
                :multiple="false"
                :reduce="(opt) => opt.id"
                :options="categories"
                label="name"
              ></VSelect>
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Lab Panels" :rules="['required']">
              <v-select
                v-model="dataObject.lab_panels"
                :multiple="true"
                :reduce="(opt) => opt.id"
                :options="labPanels"
                label="name"
              >
              </v-select>
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper
              name="Imaging Observation"
              :rules="['required']"
            >
              <VSelect
                v-model="dataObject.imaging_obvs"
                :multiple="true"
                :reduce="(opt) => opt.id"
                :options="Observations"
                label="name"
              ></VSelect>
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Cost Price" :rules="['required']">
              <input
                v-model="dataObject.cost_price"
                type="number"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper
              name="Selling Price"
              :rules="['required']"
            >
              <input
                v-model="dataObject.bill_price"
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
      default: () => 'Add station',
    },
  },
  data() {
    return {
      dataObject: {
        name: '',
        lab_panels: [],
        imaging_obvs: [],
        bill_price: '',
        cost_price: '',
        category: '',
      },
      title: '',
      Observations: [],
      labPanels: [],
      categories: [],
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        console.log(newVal, 'newVal')
        if (Object.keys(newVal).length > 0) {
          this.dataObject = newVal
          // this.dataObject.name = newVal.name
        }
      },
      immediate: true,
      deep: true,
    },
    modalTitle() {
      this.title = this.modalTitle
    },
  },
  async created() {
    const { results } = await this.$api.medicalReport.getImaging({
      size: 1000,
    })
    const labPanel = await this.$api.medicalReport.getLabPanel()
    const categories = await this.$api.medicalReport.getParents({
      size: 1000,
    })
    this.labPanels = labPanel.results
    this.categories = categories.results
    this.Observations = results
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
        console.log('hello')
        const data = await this.$api.medicalReport.createMedicalRecord(
          this.dataObject
        )
        this.$emit('refresh')
        this.$bvModal.hide('addMedicalReport')
        console.log(data, 'create')
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      console.log(this.dataObject, 'id')
      // const imgObv = this.dataObject.imaging_obvs.map((el) => el.id)
      // const labpanels = this.dataObject.lab_panels.map((el) => el.id)
      // const categories = this.dataObject.category.id
      // const { category, ...others } = this.dataObject
      try {
        if (this.dataObject.id) {
          // console.log({
          //   // imaging_obvs: imgObv,
          //   // lab_panels: labpanels,
          //   category: categories,
          //   ...others,
          // }, 'chisom')
          await this.$api.medicalReport.editMedicalRecord(
            this.dataObject.id,
            this.dataObject
            // {
            //   // imaging_obvs: imgObv,
            //   // lab_panels: labpanels,
            //   category: categories,
            //   ...others,
            // }
          )
        }
        this.$emit('refresh')
        this.$bvModal.hide('addMedicalReport')
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {}
    },
  },
}
</script>

<style lang="scss" scoped></style>
