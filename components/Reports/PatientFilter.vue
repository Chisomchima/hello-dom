<template>
  <div class="filter-wrapper">
    <div class="row">
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Date from</label>
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
          <label class="form-control-label">Date to</label>
          <input
            v-model="filters.date_after"
            type="date"
            name=""
            class="form-control"
          />
        </div>
      </div>
      <!-- <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">UHID</label>
          <input v-model="filters.uhid" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">First Name</label>
          <input v-model="filters.firstname" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Last Name</label>
          <input v-model="filters.lastname" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Phone number</label>
          <input
            v-model="filters.phone_number"
            type="text"
            class="form-control"
          />
        </div>
      </div> -->
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">D.O.B</label>
          <input v-model="filters.dob" type="date" class="form-control" />
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-3">
          <label class="form-control-label">Gender</label>
          <VSelect
            v-model="filters.gender"
            label="Gender"
            :options="genders"
          ></VSelect>
        </div>
      </div>

      <div class="col-md-8 d-flex justify-content-end">
        <div class="col-md-3 pr-0">
          <div class="mt-3 pt-2">
            <BaseButton class="w-100" @click="applyFilter(filters)">
              Search
            </BaseButton>
          </div>
        </div>
        <div class="col-md-3 pr-0">
          <div class="mt-3 pt-2">
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
      filters: {
        date_before: '',
        date_after: '',
        dob: '',
        gender: '',
      },
    }
  },
  created() {
   
  },
  methods: {
    clear() {
      this.filters = {
      date_before: '',
        date_after: '',
        dob: '',
        gender: '',
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
  },
}
</script>

<style lang="scss" scoped>
</style>