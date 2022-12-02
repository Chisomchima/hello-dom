<template>
    <div class="filter-wrapper">
      <div class="row">
         <div class="col-md-4">
          <div class="mb-2">
            <label class="form-control-label">Date from</label>
            <input
              v-model="filters.date_after"
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
              v-model="filters.date_before"
              type="date"
              name=""
              class="form-control"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-2">
            <label class="form-control-label">Revenue source</label>
            <VSelect
              v-model="filters.bill_source"
              label="name"
              :multiple="true"
              :reduce="(opt) => opt.val"
              :options="sources"
            />
          </div>
        </div>
        <!-- <div class="col-md-4">
          <div class="mb-2">
            <label class="form-control-label">Module</label>
            <VSelect
              v-model="filters.modality"
              label="name"
              :multiple="true"
              :reduce="(opt) => opt.id"
              :options="modalities"
            />
          </div>
        </div> -->
  
       <div class="col-md-12 d-flex justify-content-end px-0">
        <div class="col-2">
          <div class="mt-3">
            <BaseButton class="w-100" @click="applyFilter(filters)">
              Search
            </BaseButton>
          </div>
        </div>
        <div class="col-2">
          <div class="mt-3">
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
        sources: [
        {name: 'Encounters', val: 'ENCOUNTERS'}, 
        {name: 'Imaging', val: 'IMAGING'}, 
        {name: 'Inventory', val: 'INVENTORY'},
        {name: 'Laboratory', val: 'LABORATORY'},
        {name: 'Nursing', val: 'NURSING'},
        {name: 'Pharmacy', val: 'PHARMACY'}
    ],
        service_centers: [],
        modalities: [],
        filters: {
            bill_source: [],
          date_before: '',
          date_after: '',
        },
      }
    },
    created() {
      this.getServiceCenters()
      this.getModality()
    },
    methods: {
      clear() {
        this.filters = {
         service_center: [],
          modality: [],
          status: '',
          date_before: '',
          date_after: '',
        }
      },
       applyFilter(newVal) {
        const newFilterObject = {
            ...newVal,
          }
        if (newVal.date_before && newVal.date_after) {
          this.$emit('filter', newFilterObject)
        } else {
           this.$toast({
            type: 'info',
            text: `Please select a date range`,
          })
        }
      },
      async getServiceCenters() {
        try {
          const data = await this.$api.imaging.getServiceCenter({ size: 1000 })
          this.service_centers = data.results
        } catch (error) {
          console.log(error)
        }
      },
  
      async getModality() {
        try {
          const data = await this.$api.imaging.getLabUnit({ size: 1000 })
          this.modalities = data.results
        } catch (error) {
          console.log(error)
        }
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  </style>