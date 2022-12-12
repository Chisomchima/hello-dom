<template>
    <div class="filter-wrapper">
      <div class="row">
        <div class="col-md-4">
          <div class="mb-2">
            <label class="form-control-label">Filter</label>
            <VSelect
              v-model="filters.service_center"
              label="name"
              :multiple="true"
              :reduce="(opt) => opt.id"
              :options="[]"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-2">
            <label class="form-control-label">Filter</label>
            <VSelect
              v-model="filters.modality"
              label="name"
              :multiple="true"
              :reduce="(opt) => opt.id"
              :options="[]"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-2">
            <label class="form-control-label">Filter</label>
            <VSelect
              v-model="filters.status"
              label="label"
              :reduce="(opt) => opt.val"
              :options="[]"
            />
          </div>
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
              <BaseButton class="w-100" @click="filterFunc(filters)">
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
        service_centers: [],
        modalities: [],
        filters: {
          by: '',
          entry: '',
          service_center: [],
          modality: [],
          status: '',
        },
      }
    },
    watch: {
      filters: {
        handler: debounce(function (newVal) {
          if (newVal.by.length > 0) {
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
      'filters.status': {
        handler: debounce(function () {
          this.filterFunc(this.filters)
        }, 500),
        deep: true,
      },
  
      'filters.modality': {
        handler: debounce(function () {
          this.filterFunc(this.filters)
        }, 500),
        deep: true,
      },
      'filters.service_center': {
        handler: debounce(function () {
          this.filterFunc(this.filters)
        }, 500),
        deep: true,
      },
  
      genders: {},
    },
    created() {
      if (this.$route.query.filter) {
        this.filters = JSON.parse(this.$route.query.filter)
      }
      this.applyFilter(this.filters)
    },
    methods: {
      clear() {
        this.filters = {
          by: '',
          entry: '',
          service_center: [],
          modality: [],
          status: '',
          asn: '',
          patient_uhid: '',
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
     
    },
  }
  </script>
  
  <style lang="scss" scoped>
  </style>