<template>
  <div class="filter-wrapper">
     <div class="row justify-content-between p-2">
        <div class="mb-0 col-md-6">
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
        <BaseButton class="mr-1 w-50" @click="$emit('filter',(filters))">
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
export default {
  data() {
    return {
      genders: ['Male', 'Female'],
      statuses: ['NEW', 'CAPTURED', 'AWAITING_APPROVAL'],
      service_centers: [],
      modalities: [],
      filters: {
        by: '',
        entry: '',
        status: 'approved',
        asn: '',
        worklist: false,
      },
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    clear() {
      this.filters = {
        by: '',
        entry: '',
        status: 'approved',
        asn: '',
        worklist: false,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>