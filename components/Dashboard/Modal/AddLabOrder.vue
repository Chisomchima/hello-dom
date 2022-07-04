<template>
  <div>
    <ModalWrapper
      size="lg"
      title="Add Lab Order"
      @show="getData()"
      @ok="save()"
      @hide="clear()"
    >
      <ValidationObserver ref="form">
        <form>
          <div class="row">
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="UHID" :rules="['required']">
                <input
                  :value="currentData.uhid"
                  class="form-control"
                  type="text"
                  readonly
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper
                name="Patient Name"
                :rules="['required']"
              >
                <input
                  class="form-control"
                  :value="`${currentData.salutation} ${currentData.firstname} ${currentData.lastname} `"
                  type="text"
                  readonly
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="D.O.B" :rules="['required']">
                <input
                  type="text"
                  class="form-control"
                  :value="currentData.date_of_birth"
                  readonly
                />
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Gender" :rules="['required']">
                <input
                  :value="currentData.gender"
                  class="form-control"
                  readonly
                />
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Email" :rules="['']">
                <input
                  v-model="currentData.email"
                  type="text"
                  class="form-control"
                />
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper
                name="Services Center"
                :rules="['required']"
              >
                <VSelect
                  v-model="serviceCenter"
                  :options="serviceCenters"
                  label="name"
                ></VSelect>
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Lap Panel" :rules="['required']">
                <VSelect
                  v-model="lapPanel"
                  :reduce="(op) => op.id"
                  :multiple="true"
                  label="name"
                  :options="lapPanels"
                ></VSelect>
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Stat" :rules="[]">
                <input id="" v-model="stat" type="checkbox" name="" />
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Comment" :rules="[]">
                <textarea
                  v-model="comments"
                  cols="30"
                  rows="10"
                  class="form-control"
                ></textarea>
              </ValidationProviderWrapper>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentData: this.data,
      serviceCenters: [],
      lapPanels: [],
      encounterTypes: ['walk in'],
      serviceCenter: null,
      lapPanel: [],
      encounterType: null,
      comments: '',
      stat: false,
    }
  },

  watch: {
    data: {
      handler(newVal) {
        this.currentData = newVal
      },
      deep: true,
    },
  },
  methods: {
    async getData() {
      this.currentData = this.data
      try {
        const serviceCenters = await this.$api.laboratory.getServiceCenter({
          size: 1000,
        })
        this.serviceCenters = serviceCenters.results

        const lapPanels = await this.$api.laboratory.getLabPanel({ size: 1000 })
        this.lapPanels = lapPanels.results
      } catch (error) {
        console.log(error)
      }
    },
    async save() {
      if (await this.$refs.form.validate()) {
        const data = await this.$api.laboratory.saveLabOrder({
          service_center: this.serviceCenter,
          lab_panels: this.lapPanel,
          patient: this.currentData,
          comments: this.comments,
          stat: this.stat,
        })
        this.$bvModal.hide('modal')
        this.$toast({
          type: 'success',
          text: 'Ordered Lab Successfully',
        })
        this.$emit('refresh')
      }
    },

    clear() {
      this.currentData = {}
      this.lapPanel = ''
      this.serviceCenter = null
      this.encounterType = null
      this.comments = ''
      this.stat = false
    },
  },
}
</script>

<style lang="scss" scoped>
</style>