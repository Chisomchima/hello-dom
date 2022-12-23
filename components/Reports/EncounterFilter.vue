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
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Departments</label>
          <VSelect v-model="filters.department" :multiple="true" :reduce="(opt) => opt.id" :options="departments"
            label="name"></VSelect>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Clinics</label>
          <VSelect v-model="filters.clinic" label="name" :options="clinics" :reduce="(opt) => opt.id" :multiple="true">
          </VSelect>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Provider</label>
          <VSelect v-model="filters.provider" label="first_name" :multiple="true" :reduce="(opt) => opt.id"
            :options="providers">
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
          <label class="form-control-label">Status </label>
          <VSelect v-model="filters.status" label="label" :reduce="(option) => option.value" :options="statuses">
            <template #option="{ label }">
              <span v-if="label === 'New'" class="text-14 badge-warning rounded text-center p-1 text-white"
                style="margin: 0">{{ label }} ({{ newCount }})</span>
              <span v-else-if="label === 'Nurse Seen'" class="text-14 badge-info rounded text-center p-1 text-white">
                {{ label }} ({{ nurseSeen }})
              </span>
              <span v-else-if="label === 'Doctor Seen'" class="text-14 badge-danger rounded text-center p-1 text-white">
                {{ label }}
              </span>
            </template>
            <template #selected-option="{ label }">
              <span v-if="label === 'New'" class="
                  text-14
                  badge-warning
                  rounded
                  text-center
                  px-1
                  text-white
                " style="margin: 0">{{ label }}</span>
              <span v-else-if="label === 'Nurse Seen'" class="text-14 badge-info rounded text-center px-1 text-white">
                {{ label }}
              </span>
              <span v-else-if="label === 'Doctor Seen'"
                class="text-14 badge-danger rounded text-center px-1 text-white">
                {{ label }}
              </span>
            </template>
          </VSelect>
        </div>
      </div>
    </div>

    <!-- <hr class="m-2" /> -->

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
  data() {
    return {
      genders: ['Male', 'Female'],
      parameter: [
        { name: 'patient_name', label: 'Name' },
        { name: 'patient_uhid', label: 'UHID' },
        { name: 'acknowledged_date_after', label: 'Acknowledged date' },
        { name: 'signed_date_after', label: 'Signed date' },
      ],
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
        date_before: '',
        date_after: '',
      },
    }
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
  computed: {
    type(){
      if(this.filters.by === null || this.filters.by === '' || this.filters.by === 'patient_name' || this.filters.by === 'patient_uhid'){
        return 'text'
      } else{
        return 'date'
      }
    }
  },
  mounted() {
    this.$api.encounter.newEncountersCount().then((res) => {
      this.newCount = res.count
    })
    this.$api.encounter.nurseSeenCount().then((res) => {
      this.nurseSeen = res.count
    })
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
    applyFilter(newVal) {
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

<style lang="scss" scoped>

</style>