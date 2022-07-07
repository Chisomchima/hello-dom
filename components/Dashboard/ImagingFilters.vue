<template>
  <div class="filter-wrapper">
    <div class="row">
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Service Center</label>
          <VSelect
            v-model="filters.service_center"
            label="name"
             :multiple="true"
             :reduce="(opt) => opt.id"
            :options="service_centers"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Modality</label>
          <VSelect
            v-model="filters.modality"
            label="name"
            :multiple="true"
             :reduce="(opt) => opt.id"
            :options="modalities"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Status</label>
          <VSelect v-model="filters.status" :options="statuses" />
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">UHID</label>
          <input
            v-model="filters.patient_uhid"
            type="text"
            class="form-control"
          />
        </div>
      </div>

      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">ASN</label>
          <input v-model="filters.asn" type="text" class="form-control" />
        </div>
      </div>

      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Patient Name</label>
          <input
            v-model="filters.patient_name"
            type="text"
            class="form-control"
          />
        </div>
      </div>

      <div class="col-md-4">
        <div class="mb-2">
          <label class="form-control-label">Patient Phone Number</label>
          <input
            v-model="filters.patient_phone"
            type="text"
            class="form-control"
          />
        </div>
      </div>
    </div>

    <div class="mb-2">
      <div class="row">
        <div class="col-2 offset-md-8">
          <BaseButton class="w-100" @click="filterFunc(filters)">
            Filter
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
// import { debounce } from 'lodash'

export default {
  data() {
    return {
      genders: ['Male', 'Female'],
      statuses: ['NEW', 'CAPTURED', 'AWAITING APPROVAL'],
      service_centers: [],
      modalities: [],
      filters: {
        service_center: '',
        modality: [],
        status: '',
        asn: '',
        patient_uhid: '',
        patient_name: '',
        patient_phone: '',
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

    this.getServiceCenters()
    this.getModality()
  },
  methods: {
    clear() {
      this.filters =  {
        service_center: '',
        modality: '',
        status: '',
        asn: '',
        patient_uhid: '',
        patient_name: '',
        patient_phone: '',
      };
      this.filterFunc(this.filters)
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
    async getServiceCenters() {
      try {
        const data = await this.$api.imaging.getServiceCenter({ size: 1000 })
        this.service_centers = data.results
      } catch (error) {
        console.log(error)
      }
    },

    async getModality() {
      try {
        const data = await this.$api.imaging.getLabUnit({ size: 1000 })
        this.modalities = data.results
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>