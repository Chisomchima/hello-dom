<template>
  <div class="filter-wrapper">
     <div class="row mt-3">
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Date from</label>
          <input
            v-model="filters.dateTo"
            type="date"
            name=""
            class="form-control"
          />
        </div>
      </div>

      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Date to</label>
          <input
            v-model="filters.dateFrom"
            type="date"
            name=""
            class="form-control"
          />
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
    </div>
    <div class="row justify-content-between mb-3">
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

      <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-end">
        <BaseButton class="mr-1 w-50" @click="filterFunc(filters)">
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

export default {
  data() {
    return {
      departments: [],
      clinics: [],
      schemes: [],
      newCount: 0,
      nurseSeen: 0,

      filters: {
        by: '',
        entry: '',
        scheme: [],
        dateTo: '',
        dateFrom: '',
      },
    }
  },
  watch: {
    'filters.scheme': {
      handler: debounce(function () {
        this.filterFunc(this.filters)
      }, 500),
      deep: true,
    },
    'filters.dateTo': {
      handler: debounce(function () {
        this.filterFunc(this.filters)
      }, 500),
      deep: true,
    },
    'filters.dateFrom': {
      handler: debounce(function () {
        this.filterFunc(this.filters)  
      }, 500),
      deep: true,
    },
    // 'filters.entry': {
    //   handler: debounce(function () {
    //     this.filterFunc(this.filters)
    //   }, 500),
    //   deep: true,
    // },
    filters: {
      handler: debounce(function (newVal) {
        if (newVal.by.length > 0) {
          newFilterObject = {
            ...newVal,
            [newVal.by]: newVal.entry,
          }
          this.$emit('filter', newFilterObject)
        } else {
          this.$emit('filter', newVal)
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
    } catch (error) {
      console.log(error)
    }
  },
  mounted() {
  
  },
  methods: {
    clear() {
      this.filters = {
        by: '',
        entry: '',
        scheme: [],
        dateTo: '',
        dateFrom: '',
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
         this.$emit('filter', newFilterObject)
      } else {
        this.filterFunc(newVal)
        this.$emit('filter', newVal)
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