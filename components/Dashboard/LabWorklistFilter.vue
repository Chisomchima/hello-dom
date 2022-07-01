<template>
    <div class="filter-wrapper">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12">
                <small class="text-grey text-12">Service Center</small>
                <v-select class=" text-grey text-14" placeholder="Service center" :options="service_centers"
                    v-model="filters.service_center" multiple taggable :reduce="(option) => option.id" label="name">
                </v-select>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <small class="text-grey text-12">Lab Unit</small>
                <v-select class=" text-grey text-14" placeholder="Lab unit" multiple taggable v-model="filters.lab_unit"
                    :options="lab_units" label="name" :reduce="
                    (option) => option.id">
                </v-select>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <small class="text-grey text-12">Status</small>
                <v-select class=" text-grey text-14" placeholder="status" v-model="filters.status" :options="[
                    
                    { name: 'NEW', display: 'Take specimen' },
                
                    { name: 'recieve specimen', display: 'Recieve specimen' },
                    { name: 'fill result', display: 'Fill result' },
                    { name: 'awaiting approval', display: 'Awaiting approval' },
                    { name: 'approved', display: 'Approved' },
                    { name: 'cancelled', display: 'Cancelled' },
                ]" :reduce="(option) => option.name" label="display"></v-select>
            </div>


            <div class="col-lg-4 col-md-6 col-sm-12">
                <small class="text-grey text-12">Patient UHID</small>
                <input type="text" v-model="filters.uhid" placeholder="Patient"
                    class="form-control ng-untouched ng-pristine ng-valid" />
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <small class="text-grey text-12">ASN</small>
                <input type="text" v-model="filters.asn" placeholder="ASN"
                    class="form-control ng-untouched ng-pristine ng-valid" />
            </div>

            <div class="col-lg-4 col-md-6 col-sm-12 align-self-end">
                <BaseButton class="w-100 btn-danger" @click="clear()">
                    Clear
                </BaseButton>
            </div>

            <!-- <div class="
              col-lg-4 col-md-6 col-sm-12
              d-flex
              justify-content-center
              pt-3
              text-14
            ">
               
                <div class="col-4 align-self-end offset-md-8">
                    <BaseButton class="w-100 btn-danger" @click="clearSearchParams()">
                        Clear
                    </BaseButton>
                </div>
            </div> -->


        </div>
    </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
    data() {
        return {
            filters: {
                service_center: [],
                lab_unit: [],
                status: '',
                asn: '',
                uhid: ''
            },
            service_centers: [],
            lab_units: []
        }
    },
    watch: {
        filters: {
            handler: debounce(function (newVal) {
                let toggle = true
                const newFilterObject = { ...newVal, ['status']: newVal.status, ['worklist']:true}  
                this.$emit('filters', newFilterObject)
            }, 1000),
            deep: true,
            immediate: true
        },
    },
    async created() {
        try {
            const { results: service_centers } = await this.$api.core.serviceCenter({ size: 1000 })
            this.service_centers = service_centers
           
            const { results: labUnits } = await this.$api.core.labUnits({ size: 1000 })
            this.lab_units = labUnits
           
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        clear() {
            this.filters = {
                service_center: [],
                lab_unit: [],
                status: '',
                asn: '',
                uhid: ''
            }
        }
    }
}
</script>

<style>

</style>