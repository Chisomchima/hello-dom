<template>
  <div class="filter-wrapper">
    <div class="row justify-content-between p-2">
        <div class="mb-0 col-md-6">
        <label class="form-control-label">UHID/NAME</label>
        <div class="row">
          <div class="col-md-6">
            <VSelect
              v-model="filterObj.by"
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
            <input v-model="filterObj.entry" type="text" class="form-control" />
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-end">
        <BaseButton class="mr-1 w-50" @click="$emit('filter',(filterObj))">
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
import FilterLogic from '~/mixins/routeFiltersMixin'
export default {
    mixins: [FilterLogic],
  data() {
    return {
      filterObj: {
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
  async created() {
    
  },
  mounted() {   
  },
  methods: {
    clear() {
      this.filterObj = {
        by: '',
        entry: '',
        asn: ''
      }
      this.$emit('filter',(filters))
    },
  },
}
</script>

<style lang="scss" scoped>
</style>