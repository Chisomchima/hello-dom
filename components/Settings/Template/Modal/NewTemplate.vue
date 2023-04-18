<template>
  <ModalWrapper
    id="newTemplate"
    size="lg"
    :title="modalTitle"
    :stacking="false"
    @ok="ok()"
    @hide="clear()"
  >
    <ValidationObserver ref="form">
      <form>
        <div class="row mx-5">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Template Title" :rules="[]">
              <input
                v-model="dataObject.title"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Description" :rules="[]">
              <input
                v-model="dataObject.description"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Source" :rules="['required']">
              <VSelect
                v-model="dataObject.source"
                :options="sources"
                :reduce="(opt) => opt.name"
                label="label"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Content" :rules="[]">
              <textarea
                v-model="dataObject.content"
                rows="3"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
        </div>
      </form>
    </ValidationObserver>
    <div>
      <DashboardModalImagingDiagnosis
        :selected-diagnosis="selected"
        @page-changed="getICD10($event, searchParam)"
        @diagnosis="setDiagnosis"
        @refresh="getICD10(1, searchParam)"
        @change="helloWorld"
      />
    </div>
  </ModalWrapper>
</template>

<script>
export default {
  props: {
    modalTitle: {
      type: String,
      require: true,
      default: '',
    },
    editObj: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sources: [
        { name: 'Encounter', label: 'Encounter' },
        { name: 'Finance', label: 'Finance' },
        { name: 'Imaging', label: 'Imaging' },
        { name: 'Inventory', label: 'Inventory' },
        { name: 'Laboratory', label: 'Laboratory' },
        { name: 'Messaging', label: 'Messaging' },
        { name: 'Nursing', label: 'Nursing' },
        { name: 'Pharmacy', label: 'Pharmacy' },
        { name: 'Medical-Package', label: 'Medical Package' },
      ],
      dataObject: {
        title: this.editObj.title || '',
        description: this.editObj.description || '',
        content: this.editObj.content || '',
        source: this.editObj.source || '',
      },
    }
  },
  mounted() {
    console.log(this.editObj, 'this.editObj')
    this.dataObject.title = this.editObj.title
    this.dataObject.description = this.editObj.description
    this.dataObject.content = this.editObj.content
    this.dataObject.source = this.editObj.source
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        await this.save()
      }
    },
    async getPrice() {
      try {
        const res = await this.$api.laboratory.getPrice({
          itemCode: this.singleLabPanel,
          patientId: this.dataObject.patient.id,
        })
        return res.amount
      } catch (err) {
        console.log(err)
      }
    },
    async save() {
      try {
        if (Object.keys(this.editObj).length > 0) {
          await this.$api.templates.updateCoreTemplate(
            this.editObj.id,
            {
              title: this.dataObject.title,
              description: this.dataObject.description,
              content: this.dataObject.content,
              source: this.dataObject.source,
            }
          )
          this.$toast({
            type: 'success',
            text: 'Edited Successfully',
          })
          this.$emit('refresh')
          this.$bvModal.hide('newTemplate')
        } else if (this.modalTitle === 'Create New Template') {
          await this.$api.templates.createCoreTemplate({
            title: this.dataObject.title,
            description: this.dataObject.description,
            content: this.dataObject.content,
            source: this.dataObject.source,
          })
          this.$toast({
            type: 'success',
            text: 'Template Creation Successful',
          })
          this.$emit('refresh')
          this.$bvModal.hide('newTemplate')
        }
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        title: '',
        description: '',
        content: '',
        source: '',
      }
      this.$emit('hide')
    },
  },
}
</script>

<style lang="scss" scoped>
.scheme {
  background-color: #e9edf1;
}
</style>
