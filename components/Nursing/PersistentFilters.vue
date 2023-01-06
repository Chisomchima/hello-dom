<template>
  <div class="filter-wrapper">
    <div class="row">
      <div class="col-md-3">
        <div class="mb-2">
          <label class="form-control-label">Date from:</label>
          <input type="date" class="form-control" v-model="filters.date_from" />
        </div>
      </div>
      <div class="col-md-3">
        <div class="mb-2">
          <label class="form-control-label">Date to:</label>
          <input type="date" class="form-control" v-model="filters.date_to" />
        </div>
      </div>
      <div class="col-md-3">
        <div class="mb-2">
          <label class="form-control-label">Status</label>
          <VSelect v-model="filters.status" label="label" :reduce="(opt) => opt.val" :options="statuses" />
        </div>
      </div>
      <div class="col-md-3">
        <div class="mb-2">
          <label class="form-control-label">Nursing Station</label>
          <VSelect v-model="filters.nursing_station" label="name" :reduce="(opt) => opt.id" :multiple="true" :options="stations" />
        </div>
      </div>
    </div>

    <hr class="mb-0" />
    <div class="row justify-content-between">
      <div class="mb-0 col-md-4">
        <label class="form-control-label">UHID/NAME</label>
        <div class="row">
          <div class="col-md-6">
            <VSelect v-model="filters.by" style="font-size: 15px" label="label" placeholder="By"
              :reduce="(option) => option.name" :options="[
                { name: 'patient_name', label: 'Name' },
                { name: 'patient_uhid', label: 'UHID' },
              ]">
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
      stations: [],
      statuses: [
        { label: 'New', val: 'OPEN' },
        { label: 'Scheduled', val: 'SCHEDULED' },
        { label: 'Closed', val: 'CLOSED' },
      ],
      service_centers: [],
      modalities: [],
      filters: {
        by: '',
        entry: '',
        date_from: '',
        date_to: '',
        status: '',
        nursing_station: []
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
    'filters.nursing_station': {
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
    this.getStations()
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

    getStations() {
      this.$api.nursing
        .getStation({ size: 1000 })
        .then((res) => {
          this.stations = res.results
        })
        .catch((err) => {
          console.log(err)
        })
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