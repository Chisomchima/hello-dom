<template>
  <div class="filter-wrapper">
    <div class="row">
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Date from</label>
          <input
            v-model="filters.approved_date_before"
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
            v-model="filters.approved_date_after"
            type="date"
            name=""
            class="form-control"
          />
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <small class="text-grey text-12">Service Center</small>
        <v-select
          v-model="filters.service_center"
          class="text-grey text-14"
          placeholder="Service center"
          :options="service_centers"
          multiple
          taggable
          :reduce="(option) => option.id"
          label="name"
        >
        </v-select>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <small class="text-grey text-12">Lab Unit</small>
        <v-select
          v-model="filters.lab_unit"
          class="text-grey text-14"
          placeholder="Lab unit"
          multiple
          taggable
          :options="lab_units"
          label="name"
          :reduce="(option) => option.id"
        >
        </v-select>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <small class="text-grey text-12">Status</small>
        <v-select
          v-model="filters.status"
          class="text-grey text-14"
          placeholder="Status"
          :options="[
            { name: 'NEW', display: 'Take specimen' },

            { name: 'recieve specimen', display: 'Recieve specimen' },
            { name: 'fill result', display: 'Fill result' },
            { name: 'awaiting approval', display: 'Awaiting approval' },
          ]"
          :reduce="(option) => option.name"
          label="display"
        ></v-select>
      </div>
      <div class="col-2">
        <div class="mt-3 pt-1">
          <BaseButton class="w-100" @click="applyFilters(filters)">
            Filter
          </BaseButton>
        </div>
      </div>
      <div class="col-2">
        <div class="mt-3 pt-1">
          <BaseButton class="w-100 btn-danger" @click="clear()">
            Clear
          </BaseButton>
        </div>
      </div>
    </div>
    <!-- <hr> -->
    <!-- <div class="row">
      <div class="col-lg-4 col-md-6 col-sm-12">
        <small class="text-grey text-12">Patient UHID</small>
        <input
          v-model="filters.uhid"
          type="text"
          placeholder="Patient"
          class="form-control ng-untouched ng-pristine ng-valid"
        />
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <small class="text-grey text-12">ASN</small>
        <input
          v-model="filters.asn"
          type="text"
          placeholder="ASN"
          class="form-control ng-untouched ng-pristine ng-valid"
        />
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-end">
        
          <BaseButton class="mr-1 w-50" @click="filterFunc(filters)">
          Search
        </BaseButton>
        <BaseButton class="ml-1 w-50 btn-danger" @click="clear()">
          Clear
        </BaseButton>

      </div>
    </div> -->
    <!-- <div class="row">
      <div class="col-2 offset-md-8">
        <BaseButton class="w-100" @click="applyFilters(filters)">
          Filter
        </BaseButton>
      </div>
      <div class="col-2 align-self-end">
        <BaseButton class="w-100 btn-danger" @click="clear()">
          Clear
        </BaseButton>
      </div>
    </div> -->
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  data() {
    return {
      filters: {
        service_center: [],
        lab_unit: [],
        status: '',
        asn: '',
        approved_date_before: '',
        approved_date_after: ''
      },
      service_centers: [],
      lab_units: [],
    }
  },
  watch: {
    'filters.service_center': {
      handler: debounce(function () {
        this.filterFunc(this.filters)
      }, 500),
      deep: true,
    },
    'filters.lab_unit': {
      handler: debounce(function () {
        this.filterFunc(this.filters)
      }, 500),
      deep: true,
    },
    'filters.status': {
      handler: debounce(function () {
        this.filterFunc(this.filters)
      }, 500),
      deep: true,
    },
    'filters.approved_date_before': {
      handler: debounce(function () {
        this.filterFunc(this.filters)
      }, 500),
      deep: true,
    },
    'filters.approved_date_after': {
      handler: debounce(function () {
        this.filterFunc(this.filters)
      }, 500),
      deep: true,
    },
  },
  async created() {
    if (this.$route.query.filter) {
      this.filters = JSON.parse(this.$route.query.filter)
    }
    this.filterFunc(this.filters)
    try {
      const { results: service_centers } = await this.$api.core.serviceCenter({
        size: 1000,
      })
      this.service_centers = service_centers

      const { results: labUnits } = await this.$api.core.labUnits({
        size: 1000,
      })
      this.lab_units = labUnits
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    clear() {
      this.filters = {
        service_center: [],
        lab_unit: [],
        status: '',
        asn: '',
        approved_date_before: '',
        approved_date_after: ''
      }
      this.applyFilters(this.filters);
    },

    applyFilters(newVal) {
       if (newVal) {
        const newFilterObject = {
          ...newVal,
        }
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
  },
}
</script>

<style>
</style>