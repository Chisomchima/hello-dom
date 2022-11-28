<template>
  <div class="filter-wrapper">
    <div class="row">
      <div class="col-md-4">
        <span class="text-12 text-grey">Date from:</span>
        <input type="date" class="form-control" v-model="filters.date_from" />
      </div>
      <div class="col-md-4">
        <span class="text-12 text-grey">Date to:</span>
        <input type="date" class="form-control" v-model="filters.date_to" />
      </div>
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Store</label>
          <VSelect
            v-model="filters.store"
            label="name"
            :reduce="(opt) => opt.id"
            :options="stores"
          />
        </div>
      </div>
    </div>

    <hr class="mb-0" />
    <div class="row justify-content-between">
      <div class="mb-0 col-md-4">
        <label class="form-control-label">UHID/NAME/Prescribing physician</label>
        <div class="row">
          <div class="col-md-6">
            <VSelect
              v-model="filters.by"
              style="font-size: 15px"
              label="label"
              placeholder="By"
              :reduce="(option) => option.name"
              :options="[
                { name: 'patient_name', label: 'Name' },
                { name: 'patient_uhid', label: 'UHID' },
                { name: 'prescribing_physician', label: 'Prescribing physician' },
              ]"
            >
            </VSelect>
          </div>
          <div class="col-md-6">
            <input v-model="filters.entry" type="text" class="form-control" />
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="row mt-4">
          <div class="col-6">
            <BaseButton class="w-100" @click="applyFilter(filters)">
              Search
            </BaseButton>
          </div>
          <div class="col-6">
            <BaseButton class="w-100 btn-danger" @click="clear()">
              Clear
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data() {
    return {
      genders: ['Male', 'Female'],
      statuses: [
        { label: 'New', val: 'NEW' },
        { label: 'Captured', val: 'CAPTURED' },
        { label: 'Awaiting approval', val: 'AWAITING_APPROVAL' },
      ],
      genericDrugs: [],
      stores: [],
      filters: {
        date_from: '',
        date_to: '',
        store: null,
        by: [],
        entry: '',
        status: 'NEW'
      },
    }
  },
    watch: {
      filters: {
        handler: debounce(function (newVal) {
          this.applyFilter(this.filters)
          // this.$emit('filter', newVal)
        }, 500),
        deep: true,
        immediate: true,
      },

      'filters.by': {
        handler: debounce(function () {
          if (newVal.by.length > 0) {
            const newFilterObject = {
              ...newVal,
              [newVal.by]: newVal.entry,
              worklist: true,
            }
            this.applyFilter(newFilterObject)
            // this.$emit('filter', newFilterObject)
          } else {
            // this.$emit('filter', newVal)
            this.applyFilter(this.filters)
          }
        }, 500),
        deep: true,
      },

      genders: {},
    },
  created() {
    // if (this.$route.query.filter) {
    //   this.filters = JSON.parse(this.$route.query.filter)
    // }
    // this.applyFilter(this.filters)
    this.getGenericDrugs()
    this.getStores()
  },
  methods: {
    clear() {
      this.filters = {
        dateFrom: '',
        dateTo: '',
        store: [],
        by: [],
        entry: '',
      }
      this.applyFilter(this.filters)
    },

    applyFilter(newVal) {
      if (newVal.by.length > 0) {
        const newFilterObject = {
          ...newVal,
          [newVal.by]: newVal.entry,
          worklist: true,
        }
        // console.log(newFilterObject)
        this.filterFunc(newFilterObject)
      } else {
        this.filterFunc(newVal)
      }
    },

    filterFunc(newVal) {
      this.$router.push({
        name: this.$router.name,
        query: {
          ...this.$router.query,
          filter: JSON.stringify(newVal),
        },
      })

    },
    async getGenericDrugs() {
      try {
        const data = await this.$api.pharmacy.getGeneric({ size: 1000 })
        this.genericDrugs = data.results
      } catch (error) {
        console.log(error)
      }
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
</style>