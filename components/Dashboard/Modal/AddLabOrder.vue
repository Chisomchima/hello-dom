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
            <div class="col-md-6 mb-2">
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
              <ValidationProviderWrapper name="D.O.B" :rules="['']">
                <input
                  type="text"
                  class="form-control"
                  :value="currentData.date_of_birth"
                  readonly
                />
              </ValidationProviderWrapper>
            </div>

            <div class="mb-2 col-lg-6 col-md-6 col-sm-6">
              <small class="text-grey text-12">Age (Y-M-D)</small>
              <div class="d-flex">
                <div v-if="fill" class="px-1">
                  <input
                    v-model="age.year"
                    type="text"
                    disabled
                    placeholder="Year"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div v-if="!fill" class="px-1">
                  <ValidationProviderWrapper name="" :rules="['required']">
                    <input
                      v-model="formDate.year"
                      type="number"
                      placeholder="Year"
                      class="form-control ng-untouched ng-pristine ng-valid"
                    />
                  </ValidationProviderWrapper>
                </div>
                <div v-if="fill" class="px-1">
                  <input
                    v-model="age.month"
                    type="text"
                    disabled
                    placeholder="Month"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div v-if="!fill" class="px-1">
                  <input
                    v-model="formDate.month"
                    type="number"
                    placeholder="Month"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div v-if="fill" class="px-1">
                  <input
                    v-model="age.day"
                    type="text"
                    disabled
                    placeholder="Day"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div v-if="!fill" class="px-1">
                  <input
                    v-model="formDate.day"
                    type="number"
                    placeholder="Day"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
              </div>
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
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Scheme" :rules="['']">
                <VSelect
                  v-model="scheme"
                  class="scheme"
                  :reduce="(op) => op.payer_scheme.id"
                  label="name"
                  :get-option-label="(op) => op.payer_scheme.name"
                  :options="schemes"
                >
                </VSelect>
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
              <ValidationProviderWrapper name="Lab Panel" :rules="['required']">
                <VSelect
                  v-model="labPanel"
                  :reduce="(op) => op.id"
                  :multiple="true"
                  label="name"
                  :options="labPanels"
                >
                </VSelect>
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
        <div class="col-md-12 my-2">
          <span class="text-grey">Out of pocket Expenditure: </span>
          <span class="">NGN {{ counter }}</span>
        </div>
        <!-- <pre>{{ data }}</pre> -->
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
// import axios from '~/plugins/axios'
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    age: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      counter: 0,
      singleLabPanel: '',
      currentData: this.data,
      selectedLabPanelPrices: [],
      selectedLabPanel: [],
      serviceCenters: [],
      labPanels: [],
      scheme: '',
      encounterTypes: ['walk in'],
      serviceCenter: null,
      labPanel: [],
      encounterType: null,
      comments: '',
      stat: false,
      formDate: {
        year: '',
        month: '',
        day: '',
      },
    }
  },
  computed: {
    fill() {
      return !!this.age.year
    },
    schemes() {
      return this.data.payment_scheme
    },
  },
  watch: {
    data: {
      handler(newVal) {
        this.currentData = newVal
      },
      deep: true,
    },
    async labPanel(newIds, oldIds) {
      // eslint-disable-next-line array-callback-return
      const addedPanels = this.labPanels.filter(
        (panel) => newIds.includes(panel.id) && !oldIds.includes(panel.id)
      )
      const removedPanels = this.labPanels.filter(
        (panel) => oldIds.includes(panel.id) && !newIds.includes(panel.id)
      )

      for (const panel of addedPanels) {
        this.singleLabPanel = panel.bill_item_code
        const price = await this.getPrice()
        this.selectedLabPanel.push(panel)
        this.selectedLabPanelPrices.push(price)
        this.counter += price
        console.log(this.counter)
      }
      // Remove the prices of the removed panels from the selected prices array and the counter variable
      for (const panelId of removedPanels) {
      const priceIndex = this.selectedLabPanel.findIndex(panel => panel.bill_item_code === panelId.bill_item_code);
      if (priceIndex !== -1) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-expressions
        this.selectedLabPanel.splice(priceIndex, 1)[0];
        const price = this.selectedLabPanelPrices.splice(priceIndex, 1)[0];
        this.counter -= price;
      }
    }
    },
  },
  methods: {
    // removePanel(panelId) {
    //   // Remove the panel from the labPanelIds array
    //   const index = this.labPanelIds.indexOf(panelId)
    //   if (index !== -1) {
    //     this.labPanelIds.splice(index, 1)
    //   }

    //   // Remove the price of the panel from the selectedLabPanelPrices array and the counter variable
    //   const priceIndex = this.labPanels.findIndex(
    //     (panel) => panel.id === panelId
    //   )
    //   if (priceIndex !== -1) {
    //     const price = this.selectedLabPanelPrices.splice(priceIndex, 1)[0]
    //     this.counter -= price
    //   }
    // },
    async getPrice() {
      try {
        const res = await this.$api.laboratory.getPrice({
          itemCode: this.singleLabPanel,
          patientId: this.currentData.id,
        })
        return res.amount
      } catch (err) {
        console.log(err)
      }
    },
    async getData() {
      this.currentData = this.data
      try {
        const serviceCenters = await this.$api.laboratory.getServiceCenter({
          size: 1000,
        })
        this.serviceCenters = serviceCenters.results

        const labPanels = await this.$api.laboratory.getLabPanel({ size: 1000 })
        this.labPanels = labPanels.results
        // console.log(this.labPanels, 'labpanels')
      } catch (error) {
        console.log(error)
      }
    },
    async save() {
      if (await this.$refs.form.validate()) {
        const obj = this.currentData
        if (!this.age.year) {
          obj.age = this.formDate
        } else {
          obj.age = this.age
        }
        await this.$api.laboratory.saveLabOrder({
          service_center: this.serviceCenter,
          payment_scheme: this.scheme,
          lab_panels: this.labPanel,
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
      this.labPanel = ''
      this.serviceCenter = null
      this.encounterType = null
      this.comments = ''
      this.stat = false
      this.formDate = {
        year: '',
        month: '',
        day: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.scheme {
  background-color: #e9edf1;
}
</style>
