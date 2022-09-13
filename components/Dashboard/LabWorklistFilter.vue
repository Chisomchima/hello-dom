<template>
  <div class="filter-wrapper">
    <div class="row">
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
    </div>
    <hr class="mb-0" />
    <div class="row justify-content-between">
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
                { name: 'asn', label: 'ASN No.' },
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
      filters: {
        by: '',
        entry: '',
        service_center: [],
        lab_unit: [],
        status: '',
        asn: '',
        uhid: '',
        worklist: true,
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
    filters: {
      handler: debounce(function (newVal) {
        if (newVal) {
          const newFilterObject = {
            ...newVal,
            [newVal.by]: newVal.entry,
            worklist: true,
          }
          this.$emit('filter', newFilterObject)
        } else {
          this.$emit('filter', newVal)
        }
      }, 500),
      deep: true,
      immediate: true,
    },
  },
  async created() {
    if (this.$route.query.filter) {
      this.filters = JSON.parse(this.$route.query.filter)
    }
    this.applyFilters(this.filters)
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
        by: '',
        entry: '',
        service_center: [],
        lab_unit: [],
        status: '',
        asn: '',
        uhid: '',
      }
      this.applyFilters(this.filters)
    },

    applyFilters(newVal) {
      if (newVal.by.length > 0) {
        const newFilterObject = {
          ...newVal,
          status: newVal.status,
          [newVal.by]: newVal.entry,
          worklist: true,
        }
        // this.$emit('filters', newFilterObject)
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