<template>
  <div class="filter-wrapper">
    <div class="row">
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Date from</label>
          <input v-model="filters.date_after" type="date" name="" class="form-control" />
        </div>
      </div>

      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Date to</label>
          <input v-model="filters.date_before" type="date" name="" class="form-control" />
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <small class="text-grey text-12">Service Center</small>
        <v-select v-model="filters.service_center" class="text-grey text-14" placeholder="Service center"
          :options="service_centers" multiple taggable :reduce="(option) => option.id" label="name">
        </v-select>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <small class="text-grey text-12">Lab Unit</small>
        <v-select v-model="filters.lab_unit" class="text-grey text-14" placeholder="Lab unit" multiple taggable
          :options="lab_units" label="name" :reduce="(option) => option.id">
        </v-select>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <small class="text-grey text-12">Status</small>
        <v-select v-model="filters.status" class="text-grey text-14" placeholder="Status" :options="[
          { name: 'NEW', display: 'Take specimen' },
        
          { name: 'recieve specimen', display: 'Recieve specimen' },
          { name: 'fill result', display: 'Fill result' },
          { name: 'awaiting approval', display: 'Awaiting approval' },
        ]" :reduce="(option) => option.name" label="display"></v-select>
      </div>
    </div>

    <div class="row justify-content-between">
      <div class="mb-0 col-md-4">
        <label class="form-control-label">UHID/NAME</label>
        <div class="row">
          <div class="col-md-6">
            <VSelect v-model="filters.by" style="font-size: 15px" label="label" placeholder="By"
              :reduce="(option) => option.name" :options="parameter">
            </VSelect>
          </div>
          <div class="col-md-6">
            <input v-model="filters.entry" :type="type" class="form-control" />
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="row mt-4">
          <div class="col-6">
            <BaseButton class="w-100" @click="applyFilters(filters)">
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
        by: '',
        entry: '',
        service_center: [],
        lab_unit: [],
        status: '',
        date_before: '',
        date_after: '',
      },
      parameter: [
        { name: 'patient_name', label: 'Name' },
        { name: 'patient_uhid', label: 'UHID' },
        { name: 'approved_date_after', label: 'Approved date' },
      ],
      service_centers: [],
      lab_units: [],
    }
  },

  computed: {
    type(){
      if(this.filters.by === null || this.filters.by === '' || this.filters.by === 'patient_name' || this.filters.by === 'patient_uhid'){
        return 'text'
      } else{
        return 'date'
      }
    }
  },

  async created() {
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
        approved_date_after: '',
      }
    },

    applyFilters(newVal) {
      const newFilterObject = {
        ...newVal,
      }

      if (newVal.date_before && newVal.date_after) {
        if (newVal.by.length > 0) {
          const newFilterObject = {
            ...newVal,
            [newVal.by]: newVal.entry,
            worklist: true,
          }
          // console.log(newFilterObject)
          this.$emit('filter', newFilterObject)
        } else {
          this.$emit('filter', newVal)
        }
      } else {
        this.$toast({
          type: 'info',
          text: `Please select a date range`,
        })
      }
    },
  },
}
</script>

<style>

</style>