<template>
    <div class="filter-wrapper">
      <div class="row">
        <div class="col-md-4">
          <div class="mb-2">
            <label class="form-control-label">Departments</label>
            <VSelect
              v-model="filters.department"
              :multiple="true"
              :reduce="(opt) => opt.id"
              :options="departments"
              label="name"
            ></VSelect>
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-2">
            <label class="form-control-label">Clinics</label>
            <VSelect
              v-model="filters.clinic"
              label="name"
              :options="clinics"
              :reduce="(opt) => opt.id"
              :multiple="true"
            ></VSelect>
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-2">
            <label class="form-control-label">Provider</label>
            <VSelect
              v-model="filters.provider"
              label="first_name"
              :multiple="true"
              :reduce="(opt) => opt.id"
              :options="providers"
            >
              <template #option="{ first_name, last_name }">
                <span>{{ first_name }} {{ last_name }}</span>
              </template>
              <template #selected-option="{ first_name, last_name }">
                <span>{{ first_name }} {{ last_name }}</span>
              </template>
            </VSelect>
          </div>
        </div>
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
            <label class="form-control-label">Status </label>
            <VSelect
              v-model="filters.status"
              label="label"
              :reduce="(option) => option.value"
              :options="statuses"
            >
              <template #option="{ label }">
                <span
                  v-if="label === 'New'"
                  class="text-14 badge-warning rounded text-center p-1 text-white"
                  style="margin: 0"
                  >{{ label }} ({{ newCount }})</span
                >
                <span
                  v-else-if="label === 'Nurse Seen'"
                  class="text-14 badge-info rounded text-center p-1 text-white"
                >
                  {{ label }} ({{ nurseSeen }})
                </span>
                <span
                  v-else-if="label === 'Doctor Seen'"
                  class="text-14 badge-danger rounded text-center p-1 text-white"
                >
                  {{ label }}
                </span>
              </template>
              <template #selected-option="{ label }">
                <span
                  v-if="label === 'New'"
                  class="
                    text-14
                    badge-warning
                    rounded
                    text-center
                    px-1
                    text-white
                  "
                  style="margin: 0"
                  >{{ label }}</span
                >
                <span
                  v-else-if="label === 'Nurse Seen'"
                  class="text-14 badge-info rounded text-center px-1 text-white"
                >
                  {{ label }}
                </span>
                <span
                  v-else-if="label === 'Doctor Seen'"
                  class="text-14 badge-danger rounded text-center px-1 text-white"
                >
                  {{ label }}
                </span>
              </template>
            </VSelect>
          </div>
        </div>
      </div>
  
      <hr class="m-2" />
  
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
                  { name: 'encounter_id', label: 'Encounter ID' },
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
        genders: ['Male', 'Female'],
        statuses: [
          { label: 'Nurse Seen', value: 'NS' },
          { label: 'New', value: 'New' },
          { label: 'Doctor Seen', value: 'DS' },
        ],
        departments: [],
        clinics: [],
        providers: [],
        newCount: 0,
        nurseSeen: 0,
  
        filters: {
          by: '',
          entry: '',
          department: [],
          clinic: [],
          provider: [],
          status: '',
          encounter_id: '',
          date_before: '',
          date_after: '',
          worklist: true,
        },
      }
    },
    watch: {
      'filters.department': {
        handler: debounce(function () {
          this.filterFunc(this.filters)
        }, 500),
        deep: true,
      },
  
      'filters.provider': {
        handler: debounce(function () {
          this.filterFunc(this.filters)
        }, 500),
        deep: true,
      },
      'filters.clinic': {
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
      'filters.date_before': {
        handler: debounce(function () {
          this.filterFunc(this.filters)
        }, 500),
        deep: true,
      },
      'filters.date_after': {
        handler: debounce(function () {
          this.filterFunc(this.filters)
        }, 500),
        deep: true,
      },
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
      genders: {},
    },
    async created() {
      if (this.$route.query.filter) {
        this.filters = JSON.parse(this.$route.query.filter)
      }
      // this.applyFilter(this.filters)
      try {
        const providers = await this.$api.core.providers({
          size: 1000,
        })
        this.providers = providers
        const { results: clinics } = await this.$api.core.clinics({ size: 1000 })
        this.clinics = clinics
        const { results: departments } = await this.$api.facility.departments({
          size: 1000,
        })
        this.departments = departments
      } catch (error) {
        console.log(error)
      }
    },
    mounted() {
      this.$api.encounter.newEncountersCount().then((res) => {
        this.newCount = res.count
      })
      this.$api.encounter.nurseSeenCount().then((res) => {
        this.nurseSeen = res.count
      })
      let day = new Date().toISOString().split('T')[0]
      this.filters.date_before = day
      function getPreviousDay(date = new Date()) {
        const previous = new Date(date.getTime())
        previous.setDate(date.getDate() - 1)
        return previous.toISOString().split('T')[0]
      }
      this.filters.date_after = getPreviousDay()
    },
    methods: {
      clear() {
        this.filters = {
          by: '',
          entry: '',
          department: [],
          clinic: [],
          provider: [],
          status: '',
          encounter_id: '',
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