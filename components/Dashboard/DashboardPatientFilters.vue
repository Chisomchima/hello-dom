<template>
  <div class="filter-wrapper">
    <div class="mb-2">
      <label class="form-control-label">UHID</label>
      <input
        v-model="filters.uhid"
        type="text"
        class="form-control"
      />
    </div>
    <div class="mb-2">
      <label class="form-control-label">First Name</label>
      <input
        v-model="filters.firstname"
        type="text"
        class="form-control"
      />
    </div>
    <div class="mb-2">
      <label class="form-control-label">Last Name</label>
      <input
        v-model="filters.lastname"
        type="text"
        class="form-control"
      />
    </div>
    <div class="mb-2">
      <label class="form-control-label">Phone number</label>
      <input
        v-model="filters.phone_number"
        type="text"
        class="form-control"
      />
    </div>
    <div class="mb-2">
      <label class="form-control-label">D.O.B</label>
      <input
        v-model="filters.dob"
        type="text"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label class="form-control-label">Gender</label>
      <VSelect
        v-model="filters.gender"
        label="Gender"
        :options="genders"
      ></VSelect>
    </div>

    <div class="mb-2">
      <div class="row">
        <!-- <div class="col-6">
          <BaseButton class="w-100"> Filter </BaseButton>
        </div> -->
        <div class="col-12">
          <BaseButton class="w-100 btn-danger" @click="clear()">
            Clear
          </BaseButton>
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
      filters: {
        uhid:'',
        firstname: '',
        lastname: '',
        dob: '',
        gender: '',
      },
    }
  },
  watch: {
    filters: {
      handler: debounce(function (newVal) {
        this.$emit('filter', newVal)
      }, 500),
      deep: true,
    },
    genders: {},
  },
  methods: {
    clear() {
      this.filters = {
        first_name: '',
        last_name: '',
        dob: '',
        gender: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>