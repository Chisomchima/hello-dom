<template>
  <ModalWrapper size="lg" id="prescribe" title="Add Prescription" @ok="ok()" @show="getData()" @hide="clear()"
    :stacking="false">
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2 d-flex align-items-center justify-content-end">
            <span class="text-16 text-info mr-2">Publicly available</span>
            <b-form-checkbox
                size="lg"
                switch
                v-model="dataObject.is_public"
              >
              </b-form-checkbox>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Title" :rules="['required']">
              <input v-model="dataObject.title" type="text" class="form-control" />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Description" :rules="['']">
                <textarea id="" v-model="dataObject.description" class="form-control" name="" cols="30" rows="2"></textarea>
              </ValidationProviderWrapper>
            </div>

          <div class="col-md-12 d-flex ml-0 text-primary text-14">
            <span class="point" @click="addDrug">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16">
                <path fill="currentColor"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
              Add
            </span>
          </div>

          <div v-for="(drug, index) in dataObject.details" :key="index"
            class="row p-1 mt-2 mx-2 border border-secondary rounded">
            <div class="
                col-md-12
               
                d-flex
                justify-content-end
                ml-0
                text-danger text-14
              ">
              <span class="point float" @click="deleteDrug(index)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" />
                </svg>
              </span>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Medication" :rules="['']">
                <VSelect v-model="drug.generic_drug" :options="generic_drug" :reduce="(opt) => opt.id" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <!-- <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="SIG" :rules="['']">
                <input :value="sigFormatter(drug.direction, drug.duration)" type="text" class="form-control" />
              </ValidationProviderWrapper>
            </div> -->

            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Dose" :rules="['']">
                <VSelect v-model="drug.dose" :options="doses" :reduce="(opt) => opt.id" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Unit" :rules="['']">
                <VSelect v-model="drug.unit" :options="units" :reduce="(opt) => opt.id" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Frequency" :rules="['']">
                <VSelect v-model="drug.frequency" :options="frequencies" :reduce="(opt) => opt.id" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-3 mb-2">
              <ValidationProviderWrapper name="Direction" :rules="['']">
                <VSelect v-model="drug.direction" :options="directions" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Duration" :rules="['']">
                <VSelect v-model="drug.duration" :options="durations" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Route" :rules="['']">
                <VSelect v-model="drug.route" :options="routes" :reduce="(opt) => opt.id" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Product" :rules="['']">
                <VSelect v-model="drug.product" :options="products" :reduce="(opt) => opt.id" label="name">
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-6 mb-2">
              <ValidationProviderWrapper name="Dispense quantity" :rules="[]">
                <input v-model="drug.dispense_quantity" type="number" class="form-control" />
              </ValidationProviderWrapper>
            </div>
            <div v-if="drug.product" class="col-md-12 mb-2">
              <div class="d-flex justify-content-end align-items-center">
                <div class="col-md-6 text-14 text-info text-center">
                  Bottle(s)
                </div>
              </div>
            </div>

            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Notes" :rules="['']">
                <textarea id="" v-model="dataObject.note" class="form-control" name="" cols="30" rows="2"></textarea>
              </ValidationProviderWrapper>
            </div>


          </div>

          <div class="col-md-12 d-flex justify-content-end ml-0 text-primary pt-2 text-14">
            <span class="point" @click="addDrug">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16">
                <path fill="currentColor"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
              Add
            </span>
          </div>


        </div>
      </form>
    </ValidationObserver>
  </ModalWrapper>
</template>
  
<script>
import { debounce } from 'lodash'

export default {
  props: {
    role: {
      require: false,
    },
  },
  data() {
    return {
      present: false,
      generic_drug: [],
      doses: [],
      units: [],
      frequencies: [],
      durations: [],
      directions: [],
      routes: [],
      products: [],
      stores: [],
      dataObject: {
        details: [
          {
            generic_drug: null,
            product: null,
            dose: null,
            unit: null,
            route: null,
            frequency: null,
            direction: null,
            duration: null,
            dispense_quantity: 1,
            status: 'FULFILLED IN',
            note: ''
          },
        ],
        is_public: true,
        description: '',
        title: ''
      },
    }
  },
  computed: {
  },
  watch: {},
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        this.save()
      }
    },
    helloWorld(e) {
      this.present = e
    },
    productLogic() {
      let dose_multiplier = 2
      let frequency_multiplier = 2
      let duration_multiplier = 2
      let product_divider = 2

      let product =
        (dose_multiplier * frequency_multiplier * duration_multiplier) /
        product_divider
      let qty = Math.floor(product)
      console.log(qty)
    },
    async save() {
      try {
        let prescribeDetails = this.dataObject.details
        let direction = []
        let duration = []
        for (let x = 0; x < prescribeDetails.length; x++) {
          duration.push(prescribeDetails[x].duration.id)
          direction.push(prescribeDetails[x].direction.id)
        }

        //  console.log({direction}, {duration})
        var pocket = prescribeDetails

        for (let x = 0; x < prescribeDetails.length; x++) {
          pocket[x].direction = direction[x]
          pocket[x].duration = duration[x]
        }
        console.log(pocket)

        const data = await this.$api.templates.createTemplate({
          title: this.dataObject.title,
          description: this.dataObject.description,
          publicly_available: this.dataObject.publicly_available,
          source: this.dataObject.source,
          content: pocket,
        })
        this.$emit('refresh')
        this.$bvModal.hide('prescribe')
        this.$toast({
          type: 'success',
          text: 'Success',
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    deleteDrug(e) {
      if (this.dataObject.details.length !== 1) {
        this.dataObject.details.splice(e, 1)
      }
    },
    addDrug() {
      this.dataObject.details.push({
        generic_drug: null,
        product: '',
        dose: null,
        unit: null,
        route: null,
        frequency: null,
        direction: null,
        duration: null,
        dispense_quantity: 1,
        status: '',
      })
    },
    clear() {
      this.dataObject = {
        details: [
          {
            generic_drug: null,
            product: '',
            dose: null,
            unit: null,
            route: null,
            frequency: null,
            direction: null,
            duration: null,
            dispense_quantity: 1,
            status: 'FULFILLED IN',
            note: ''
          },
        ],
        publicly_available: true,
        description: '',
        title: ''
      }
      this.$emit('hide')
    },
    getData() {
      this.getGenericDrugs()
      this.getDoses()
      this.getUnits()
      this.getFrequencies()
      this.getDurations()
      this.getDirections()
      this.getRoutes()
      this.getProducts()
      this.getStores()
      this.productLogic()
      this.dataObject.prescribing_physician =
        this.$store.state.auth.user.first_name +
        ' ' +
        this.$store.state.auth.user.last_name
    },
    async getPatientByUHID(uhid) {
      try {
        if (uhid.length > 0) {
          const results = await this.$api.patient.getPatientByUHID(uhid)
          return results
        }
      } catch (error) {
        console.log(error)
      }
    },
    getGenericDrugs() {
      this.$api.pharmacy
        .getGeneric({ size: 1000 })
        .then((res) => {
          this.generic_drug = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getDoses() {
      this.$api.pharmacy
        .getDoses({ size: 1000 })
        .then((res) => {
          this.doses = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUnits() {
      this.$api.pharmacy
        .getUnits({ size: 1000 })
        .then((res) => {
          this.units = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getFrequencies() {
      this.$api.pharmacy
        .getFrequencies({ size: 1000 })
        .then((res) => {
          this.frequencies = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDurations() {
      this.$api.pharmacy
        .getDurations({ size: 1000 })
        .then((res) => {
          this.durations = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDirections() {
      this.$api.pharmacy
        .getDirections({ size: 1000 })
        .then((res) => {
          this.directions = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getRoutes() {
      this.$api.pharmacy
        .getRoutes({ size: 1000 })
        .then((res) => {
          this.routes = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProducts() {
      this.$api.inventory
        .getProducts({ size: 1000 })
        .then((res) => {
          this.products = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getStores() {
      this.$api.inventory
        .getStores({ size: 1000, is_pharmacy: true })
        .then((res) => {
          this.stores = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
  
<style lang="scss" scoped>
textarea.form-control {
  min-height: 50px;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.float {
  position: relative;
  top: -3px;
  right: -17px;
}
</style>