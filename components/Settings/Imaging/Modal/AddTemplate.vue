<template>
  <ModalWrapper
    id="addImagingTemplate"
    :title="title"
    @ok="ok()"
    @hide="clear()"
  >
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Title" :rules="['required']">
              <input
                v-model="dataObject.title"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>

           <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Description" :rules="['required']">
              <input
                v-model="dataObject.description"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>

 <!-- { label: 'Laboratory', value: 'LABORATORY' },
                  { label: 'Encounters', value: 'ENCOUNTERS' }, -->
           <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Report" :rules="[]">
              <VueEditor v-model="dataObject.content" />
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
      default: () => 'Add clinic',
    },
  },
  data() {
    return {
      dataObject: {
        title: '',
        description: '',
        content: null,
        source: 'IMAGING',
      },
      title: '',
      departments: [],
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
          this.dataObject.title = newVal.title
          this.dataObject.description = newVal.description
          this.dataObject.content = newVal.content
          this.dataObject.source = newVal.source
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
        const data = await this.$api.templates.createTemplate(this.dataObject)
        this.$emit('refresh')
        this.$bvModal.hide('addImagingTemplate')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      try {
        const data = await this.$api.templates.updateTemplate(
          this.dataObject.id,
          this.dataObject
        )
        this.$emit('refresh')
        this.$bvModal.hide('addImagingTemplate')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        title: '',
        description: '',
        content: null,
        source: null,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>