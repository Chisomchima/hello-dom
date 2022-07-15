<template>
  <div class="filter-wrapper">
    <div class="row">
      <div class="col-md-4">
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
      </div>
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
    </div>

    <div class="mb-2">
      <div class="row">
        <div class="col-2 offset-md-8">
          <BaseButton class="w-100" @click="filterFunc(filters)">
            Search
          </BaseButton>
        </div>
        <div class="col-2 align-self-end">
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
        uhid: '',
        firstname: '',
        lastname: '',
        dob: '',
        gender: '',
      },
    }
  },
  watch: {
    // filters: {
    //   handler: debounce(function (newVal) {
    //    // this.$emit('filter', newVal)
    //    this.$router.replace({
    //     name:this.$router.name,
    //     query:{
    //       ...this.$router.query,
    //       filter:JSON.stringify(newVal)
    //     }
    //    });
    //   }, 500),
    //   deep: true,
    // },
    // "$route.query.filter"(newVal){
    //   console.log(JSON.parse(newVal));
    // },
    genders: {},
  },
  created() {
    if (this.$route.query.filter) {
      this.filters = JSON.parse(this.$route.query.filter)
    }
  },
  methods: {
    clear() {
      this.filters = {
        first_name: '',
        last_name: '',
        dob: '',
        gender: '',
      }
      this.filterFunc(this.filters)
    },

    filterFunc(newVal) {
      this.$router.push({
        query: {
          ...this.$route.query,
          filter: JSON.stringify(newVal),
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>