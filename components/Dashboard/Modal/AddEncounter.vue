<template>
  <div>
    <ModalWrapper
      id="add_encounters"
      size="lg"
      title="Add Encounter"
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
                  :value="data.uhid"
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
                  :value="`${data.salutation} ${data.firstname} ${data.lastname} `"
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
                  :value="data.date_of_birth"
                  readonly
                />
              </ValidationProviderWrapper>
            </div>
            <div class="mb-2 col-lg-6 col-md-6 col-sm-6">
              <small class="text-grey text-12">Age (Y-M-D)</small>
              <div class="d-flex">
                <div v-if="fill" class="px-1">
                  <input
                    type="text"
                    disabled
                    placeholder="Year"
                    v-model="age.year"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div v-if="!fill" class="px-1">
                  <ValidationProviderWrapper name="" :rules="['required']">
                    <input
                      type="number"
                      placeholder="Year"
                      v-model="formDate.year"
                      class="form-control ng-untouched ng-pristine ng-valid"
                    />
                  </ValidationProviderWrapper>
                </div>
                <div v-if="fill" class="px-1">
                  <input
                    type="text"
                    disabled
                    placeholder="Month"
                    v-model="age.month"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div v-if="!fill" class="px-1">
                  <input
                    type="number"
                    placeholder="Month"
                    v-model="formDate.month"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div v-if="fill" class="px-1">
                  <input
                    type="text"
                    disabled
                    placeholder="Day"
                    v-model="age.day"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
                <div v-if="!fill" class="px-1">
                  <input
                    type="number"
                    placeholder="Day"
                    v-model="formDate.day"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Phone Number" :rules="['']">
                <input
                  type="text"
                  class="form-control"
                  :value="data.phone_number"
                  readonly
                />
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Gender" :rules="['required']">
                <input :value="data.gender" class="form-control" readonly />
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Scheme" :rules="['']">
                <VSelect
                  class="scheme"
                  v-model="scheme"
                  :options="schemes"
                  label="name"
                  :reduce="(op) => op.payer_scheme.id"
                  :getOptionLabel="(op) => op.payer_scheme.name"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Clinic" :rules="['required']">
                <VSelect
                  v-model="clinic"
                  :options="clinics"
                  label="name"
                ></VSelect>
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Encounter Type" :rules="['']">
                <VSelect
                  v-model="encounterType"
                  :options="encounterTypes"
                ></VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Provider" :rules="['']">
                <VSelect
                  v-model="provider"
                  :options="providers"
                  label="first_name"
                >
                  <template #option="data">
                    <span>{{ data.first_name }} {{ data.last_name }}</span>
                  </template>
                  <template #selected-option="data">
                    <span>{{ data.first_name }} {{ data.last_name }}</span>
                  </template>
                </VSelect>
              </ValidationProviderWrapper>
            </div>
          </div>
        </form>
        <div class="col-md-12 my-2">
          <span class="text-grey">Out of pocket Expenditure: </span>
          <span class="">NGN {{ counter }}</span>
        </div>
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
// import calcAge from '~/mixins/calcAge'
export default {
  // mixins: [calcAge],
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
      selectedLabPanelPrices: [],
      selectedLabPanel: [],
      scheme: '',
      clinics: [],
      providers: [],
      encounterTypes: ['walk in'],
      provider: null,
      clinic: [],
      formDate: {
        year: '',
        month: '',
        day: '',
      },
      encounterType: null,
    }
  },
  watch: {
    async clinic(newIds, oldIds) {
      if (newIds !== null) {
        const addedPanels = this.clinics.filter(
          (panel) => newIds?.id == panel.id && oldIds?.id != panel.id
        )

        for (const panel of addedPanels) {
          this.singleLabPanel = panel.bill_item_code
          const price = await this.getPrice()
          this.selectedLabPanel.push(panel)
          this.selectedLabPanelPrices.push(price)
          this.counter = price
          console.log(this.counter)
        }
      } else {
        this.counter = 0
      }
    },
  },
  beforeMount() {
    // this.formDate = structuredClone(this.age)
  },
  beforeUpdate() {
    // this.formDate = structuredClone(this.age)
  },
  computed: {
    fill() {
      return this.age.year ? true : false
    },
    schemes() {
      return this.data.payment_scheme
    },
  },
  methods: {
    async getData() {
      try {
        const clinic = await this.$api.encounter.getClinic({ size: 1000 })
        this.clinics = clinic.results

        const provider = await this.$api.encounter.getProvider({ size: 1000 })
        this.providers = provider
      } catch (error) {
        console.log(error)
      }
    },
    async getPrice() {
      try {
        const res = await this.$api.laboratory.getPrice({
          itemCode: this.singleLabPanel,
          patientId: this.data.id,
        })
        return res.amount
      } catch (err) {
        console.log(err)
      }
    },
    async save() {
      try {
        if (await this.$refs.form.validate()) {
          let obj = this.data
          if (!this.age.year) {
            obj.age = this.formDate
          } else {
            obj.age = this.age
          }
          await this.$api.encounter.saveEncounter({
            payment_scheme: this.scheme,
            clinic: this.clinic,
            provider: this.provider ? this.provider : {},
            encounter_type: this.encounterType,
            patient: obj,
          })
          this.$bvModal.hide('add_encounters')
          this.$toast({
            type: 'success',
            text: 'Ordered Encounter Successfully',
          })
          this.$emit('refresh')
        }
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.provider = null
      this.clinic = null
      this.encounterType = null
      this.$emit('reset_age')
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
