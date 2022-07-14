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
          placeholder="status"
          :options="[
            { name: 'NEW', display: 'Take specimen' },

            { name: 'recieve specimen', display: 'Recieve specimen' },
            { name: 'fill result', display: 'Fill result' },
            { name: 'awaiting approval', display: 'Awaiting approval' },
            { name: 'approved', display: 'Approved' },
            { name: 'cancelled', display: 'Cancelled' },
          ]"
          :reduce="(option) => option.name"
          label="display"
        ></v-select>
      </div>

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
          Filter
        </BaseButton>
        <BaseButton class="ml-1 w-50 btn-danger" @click="clear()">
          Clear
        </BaseButton>

      </div>
    </div>
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
        uhid: '',
        worklist: true,
      },
      service_centers: [],
      lab_units: [],
    }
  },
  watch: {
    filters: {
      handler: debounce(function (newVal) {
        const toggle = true
        const newFilterObject = {
          ...newVal,
          'status': newVal.status,
          'worklist': true,
        }
        this.$emit('filters', newFilterObject)
      }, 1000),
      deep: true,
      immediate: true,
    },
  },
  async created() {
     if (this.$route.query.filter) {
      this.filters = JSON.parse(this.$route.query.filter)
    }
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
        uhid: '',
      }
      // this.applyFilters(this.filters);
       this.filterFunc(this.filters)
    },

    // applyFilters(newVal) {
    //   const newFilterObject = {
    //     ...newVal,
    //     'status': newVal.status,
        
    //     'patient_uhid': newVal.uhid
    //   }
    //   this.$emit('filters', newFilterObject)
    // },
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