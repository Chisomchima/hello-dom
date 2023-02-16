<template>
  <div>
    <ModalWrapper size="lg" title="Add Lab Order" @show="getData()" @ok="save()" @hide="clear()">
      <ValidationObserver ref="form">
        <form>
          <div class="row">
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="UHID" :rules="['required']">
                <input :value="currentData.uhid" class="form-control" type="text" readonly />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Patient Name" :rules="['required']">
                <input class="form-control"
                  :value="`${currentData.salutation} ${currentData.firstname} ${currentData.lastname} `" type="text"
                  readonly />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="D.O.B" :rules="['']">
                <input type="text" class="form-control" :value="currentData.date_of_birth" readonly />
              </ValidationProviderWrapper>
            </div>

            <div class="mb-2 col-lg-6 col-md-6 col-sm-6">
              <small class="text-grey text-12">Age (Y-M-D)</small>
              <div class="d-flex">
                <div v-if="fill" class="px-1">
                  <input type="text" disabled placeholder="Year" v-model="age.year"
                    class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div v-if="!fill" class="px-1">
                  <ValidationProviderWrapper name="" :rules="['required']">
                    <input type="number" placeholder="Year" v-model="formDate.year"
                      class="form-control ng-untouched ng-pristine ng-valid" />
                  </ValidationProviderWrapper>
                </div>
                <div v-if="fill" class="px-1">
                  <input type="text" disabled placeholder="Month" v-model="age.month"
                    class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div v-if="!fill" class="px-1">
                  <input type="number" placeholder="Month" v-model="formDate.month"
                    class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div v-if="fill" class="px-1">
                  <input type="text" disabled placeholder="Day" v-model="age.day"
                    class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div v-if="!fill" class="px-1">
                  <input type="number" placeholder="Day" v-model="formDate.day"
                    class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Gender" :rules="['required']">
                <input :value="currentData.gender" class="form-control" readonly />
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Email" :rules="['']">
                <input v-model="currentData.email" type="text" class="form-control" />
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Services Center" :rules="['required']">
                <VSelect v-model="serviceCenter" :options="serviceCenters" label="name"></VSelect>
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Lab Panel" :rules="['required']">
                <VSelect v-model="labPanel" :reduce="(op) => op.id" :multiple="true" label="name" :options="labPanels">
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
                <textarea v-model="comments" cols="30" rows="10" class="form-control"></textarea>
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
    age: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentData: this.data,
      serviceCenters: [],
      labPanels: [],
      encounterTypes: ['walk in'],
      serviceCenter: null,
      labPanel: [],
      encounterType: null,
      comments: '',
      stat: false,
      formDate: {
        year: '',
        month: '',
        day: ''
      },
    }
  },
  computed: {
    fill() {
      return this.age.year ? true : false
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

        const labPanels = await this.$api.laboratory.getLabPanel({ size: 1000 })
        this.labPanels = labPanels.results
      } catch (error) {
        console.log(error)
      }
    },
    async save() {
      if (await this.$refs.form.validate()) {
        let obj = this.currentData
        if (!this.age.year) {
          obj.age = this.formDate
        }
        else {
          obj.age = this.age
        }
        const data = await this.$api.laboratory.saveLabOrder({
          service_center: this.serviceCenter,
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
        day: ''
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>