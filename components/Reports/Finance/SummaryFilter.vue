<template>
  <div class="filter-wrapper">
    <div class="row">
      <div class="col-md-6">
        <div class="mb-2">
          <label class="form-control-label">Date from</label>
          <input v-model="filters.date_after" type="date" name="" class="form-control" />
        </div>
      </div>

      <div class="col-md-6">
        <div class="mb-2">
          <label class="form-control-label">Date to</label>
          <input v-model="filters.date_before" type="date" name="" class="form-control" />
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Revenue Head</label>
          <VSelect v-model="filters.bill_source" label="name" :options="sources" :multiple="true"
            :reduce="(opt) => opt.val"></VSelect>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-3">
          <label class="form-control-label">Scheme type</label>
          <VSelect v-model="filters.billed_to_type" label="name" :options="billTypes" :reduce="(opt) => opt.val">
          </VSelect>
        </div>
      </div>

      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Scheme</label>
          <VSelect v-model="filters.scheme" label="name" :options="schemes" :reduce="(opt) => opt.id"></VSelect>
        </div>
      </div>

      <div class="col-md-12 d-flex justify-content-end">
        <div class="col-md-3 pr-0">
          <div class=" pt-2">
            <BaseButton class="w-100" @click="applyFilter(filters)">
              Search
            </BaseButton>
          </div>
        </div>
        <div class="col-md-3 pr-0">
          <div class=" pt-2">
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
      sources: [
        { name: 'Encounter', val: 'Encounter' },
        { name: 'Imaging', val: 'Imaging' },
        { name: 'Inventory', val: 'Inventory' },
        { name: 'Laboratory', val: 'Laboratory' },
        { name: 'Nursing', val: 'Nursing' },
        { name: 'Pharmacy', val: 'Pharmacy' }
      ],
      billTypes: [
        { name: 'Self postpaid', val: 'SELF_POSTPAID' },
        { name: 'Self prepaid', val: 'SELF_PREPAID' },
        { name: 'Corporate', val: 'CORPORATE' },
        { name: 'Insurance', val: 'INSURANCE' },
      ],
      schemeCategory: [],
      schemes: [],
      filters: {
        date_before: '',
        date_after: '',
        bill_source: '',
        scheme: '',
        billed_to_type: '',
        is_earned: true
      },
    }
  },
  mounted() {
  },
  watch: {
    'filters.billed_to_type'(newValue) {
      this.getScheme(newValue)
      console.log(newValue)
    }
  },
  methods: {
    clear() {
      this.filters = {
        date_before: '',
        date_after: '',
        bill_source: '',
        scheme: '',
        billed_to_type: '',
      }
    },
    getScheme(scheme) {
      this.$api.finance_settings
        .getPayerSchemes({ size: 1000, type: scheme })
        .then((res) => {
          this.schemes = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },

    applyFilter(newVal) {
      const newFilterObject = {
        ...newVal,
      }
      if (newVal.date_before && newVal.date_after) {
        this.$emit('filter', newFilterObject)
        console.log(newFilterObject)
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