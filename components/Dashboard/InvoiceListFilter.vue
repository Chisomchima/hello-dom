<template>
  <div class="filter-wrapper">
    <div v-if="isrecipt" class="row">
      <div class="col-md-6">
        <div class="mb-2">
          <label class="form-control-label">Destination Location</label>
          <VSelect
            v-model="filters.destination"
            label="name"
            :options="destination_location"
            :reduce="(opt) => opt.id"
            :multiple="true"
          >
          </VSelect>
        </div>
      </div>
      <div class="col-md-6">
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
                v-if="label === 'Draft'"
                class="text-14 badge-warning rounded text-center p-1 text-white"
                style="margin: 0"
                >{{ label }}</span
              >
              <span
                v-if="label === 'Done'"
                class="text-14 badge-success rounded text-center p-1 text-white"
                style="margin: 0"
                >{{ label }}</span
              >
              
              <!-- <span
                v-else-if="label === 'Open'"
                class="text-14 badge-info rounded text-center p-1 text-white"
              >
                {{ label }}
              </span> -->
              <span
                v-else-if="label === 'Approved'"
                class="text-14 badge-primary rounded text-center p-1 text-white"
              >
                {{ label }}
              </span>
              <span
                v-else-if="label === 'Cancelled'"
                class="text-14 badge-danger rounded text-center p-1 text-white"
              >
                {{ label }}
              </span>
            </template>
            
          </VSelect>
        </div>
      </div>
      <div class="col-md-6">
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

      <div class="col-md-6">
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
    </div>
    <div v-else class="row">
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Destination Location</label>
          <VSelect
            v-model="filters.destination"
            label="name"
            :options="clinics"
            :reduce="(opt) => opt.id"
            :multiple="true"
          >
          </VSelect>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Source Location</label>
          <VSelect
            v-model="filters.source"
            label="name"
            :options="clinics"
            :reduce="(opt) => opt.id"
            :multiple="true"
          >
          </VSelect>
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
                v-if="label === 'Draft'"
                class="text-14 badge-warning rounded text-center p-1 text-white"
                style="margin: 0"
                >{{ label }}</span
              >
              <!-- ({{ newCount }}) -->
              <span
                v-if="label === 'Done'"
                class="text-14 badge-success rounded text-center p-1 text-white"
                style="margin: 0"
                >{{ label }}</span
              >
              <span
                v-else-if="label === 'Open'"
                class="text-14 badge-info rounded text-center p-1 text-white"
              >
                {{ label }}
              </span>
              <span
                v-else-if="label === 'Back Order'"
                class="text-14 badge-primary rounded text-center p-1 text-white"
              >
                {{ label }}
              </span>
              <span
                v-else-if="label === 'Cancelled'"
                class="text-14 badge-danger rounded text-center p-1 text-white"
              >
                {{ label }}
              </span>
            </template>
          </VSelect>
        </div>
      </div>
      <div class="col-md-6">
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

      <div class="col-md-6">
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
    </div>
    <hr class="m-2" />

    <div class="row justify-content-between">
      <div class="col-md-4">
        <div class="row mt-4">
          <div class="col-6">
            <BaseButton class="w-100" @click="applyFilter(filters)">
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
// import { debounce } from 'lodash'

export default {
  props: {
    isrecipt: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      parameter: [
        { name: 'patient_name', label: 'Name' },
        { name: 'patient_uhid', label: 'UHID' },
        { name: 'acknowledged_date_after', label: 'Acknowledged date' },
        { name: 'signed_date_after', label: 'Signed date' },
      ],
      statuses: [
        { label: 'Draft', value: 'DT' },
        { label: 'Cancelled', value: 'CN' },
        // { label: 'Open', value: 'OP' },
        { label: 'Approved', value: 'BO' },
        { label: 'Done', value: 'DN' },
      ],
      departments: [],
      clinics: [],
      destination_location: [],
      providers: [],
      newCount: 0,
      nurseSeen: 0,

      filters: {
        // by: '',
        // entry: '',
        // department: [],
        // clinic: [],
        // provider: [],
        destination_location: '',
        source_location:'',
        status: '',
        date_before: '',
        date_after: '',
      },
    }
  },
  computed: {
    type() {
      if (
        this.filters.by === null ||
        this.filters.by === '' ||
        this.filters.by === 'patient_name' ||
        this.filters.by === 'patient_uhid'
      ) {
        return 'text'
      } else {
        return 'date'
      }
    },
  },
  async created() {
    try {
      const providers = await this.$api.core.providers({
        size: 1000,
      })
      this.providers = providers
      const { results: clinics } = await this.$api.core.clinics({ size: 1000 })
      this.clinics = clinics
      console.log(providers)
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
    this.fetchStore()
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
        date_before: '',
        date_after: '',
      }
    },

    async fetchStore() {
      try {
        const data = await this.$api.inventory.getSourceVendor()
        console.log(data, 'store')
        this.destination_location = data.results
      } catch (err) {
        console.log(err)
      }
    },
    applyFilter(newVal) {
      if (newVal.date_before && newVal.date_after) {
        this.$emit('filter', newVal)
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

<style lang="scss" scoped></style>
