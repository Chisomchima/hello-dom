<template>
  <div class="filter-wrapper">
    <div class="row mt-3">
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Date from</label>
          <input
            type="date"
            class="form-control"
            :max="maxDate"
            v-model="filters.dateFrom"
          />
        </div>
       
      </div>
      <div class="col-md-4">
       
        <div class="mb-2 ml-2">
          <label class="form-control-label">Date to</label>
          <input
            type="date"
            class="form-control"
            :min="minDate"
            v-model="filters.dateTo"
          />
        </div>
      </div>
       <div class="mb-0 col-md-4">
        <label class="form-control-label">UHID/NAME</label>
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
        <div class="mb-2">
          <label class="form-control-label">Scheme</label>
          <VSelect
            v-model="filters.scheme"
            :multiple="true"
            :reduce="(opt) => opt.id"
            :options="schemes"
            label="name"
          ></VSelect>
        </div>
      </div>

      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Scheme type</label>
          <VSelect
            v-model="filters.scheme_type"
            :reduce="(opt) => opt.value"
            :options="[
              { label: 'Self', value: 'SELF' },
              { label: 'Insurance', value: 'INSURANCE' },
            ]"
            label="label"
          ></VSelect>
        </div>
      </div>

       <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Payer</label>
          <VSelect
            v-model="filters.payer"
            :multiple="true"
            :reduce="(opt) => opt.id"
            :options="payers"
            label="name"
          ></VSelect>
        </div>
      </div>
    </div>
    <div class="row justify-content-end mb-3">
     

     

      <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-end">
        <BaseButton class="mr-1 w-50" @click="applyFilter(filters)">
          Search
        </BaseButton>
        <BaseButton class="ml-1 w-50 btn-danger" @click="clear()">
          Clear
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { DateTime } from 'luxon'
export default {
  data() {
    return {
      departments: [],
      clinics: [],
      schemes: [],
      payers: [],
      newCount: 0,
      nurseSeen: 0,

      filters: {
        by: '',
        entry: '',
        dateFrom: '',
        dateTo: '',
        scheme: [],
        scheme_type: null,
        payer: null,
      },
    }
  },
  computed: {
    maxDate() {
      let today = new Date()
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
    minDate() {
      let today = new Date()
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
  },
  watch: {
    'filters.scheme': {
      handler: debounce(function () {
        this.applyFilter(this.filters)
      }, 500),
      deep: true,
    },
    'filters.scheme_type': {
      handler: debounce(function () {
        this.applyFilter(this.filters)
      }, 500),
      deep: true,
    },
    'filters.payer': {
      handler: debounce(function () {
        this.applyFilter(this.filters)
      }, 500),
      deep: true,
    },
    'filters.dateTo': {
      handler: debounce(function () {
        if(this.filters.dateFrom !== ''){
          this.applyFilter(this.filters)
        }
      }, 500),
      deep: true,
    },
    filters: {
      handler: debounce(function (newVal) {
        if( newVal.by){
          if (newVal.by.length > 0) {
          newFilterObject = {
            ...newVal,
            [newVal.by]: newVal.entry,
          }
          this.$emit('filter', newFilterObject)
        } else {
          this.$emit('filter', newVal)
        }
        }
      }, 500),
      deep: true,
      immediate: true,
    },
    genders: {},
  },
  async created() {
    if (this.$route.query.filter) {
      this.filters = JSON.parse(this.$route.query.filter)
    }
    this.applyFilter(this.filters)
    try {
      const schemes = await this.$api.finance_settings.getPayerSchemes({
        size: 1000,
      })
      this.schemes = schemes.results
      const payers = await this.$api.finance_settings.getPayers({
        size: 1000,
      })
      this.payers = payers.results
    } catch (error) {
      console.log(error)
    }
  },
  mounted() {},
  methods: {
    clear() {
      this.filters = {
        by: '',
        entry: '',
        scheme: [],
        payer: null,
        scheme_type: null,
      }
      this.applyFilter(this.filters)
    },
    applyFilter(newVal) {
     if (newVal) {
        if (newVal.by.length > 0) {
          const newFilterObject = {
            ...newVal,
            [newVal.by]: newVal.entry,
            worklist: true,
          }
          // console.log(newFilterObject)
          this.filterFunc(newFilterObject)
          this.$emit('filter', newFilterObject)
        } else {
          this.filterFunc(newVal)
          this.$emit('filter', newVal)
        }
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
  },
}
</script>

<style lang="scss" scoped>
</style>