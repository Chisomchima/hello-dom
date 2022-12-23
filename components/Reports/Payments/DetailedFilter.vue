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
        </div>

        <hr class="mb-0" />
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
                        <input v-model="filters.entry" type="text" class="form-control" />
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
import { debounce } from 'lodash'

export default {
    data() {
        return {
            genders: ['Male', 'Female'],
            parameter: [
                { name: 'patient_name', label: 'Name' },
                { name: 'patient_uhid', label: 'UHID' },
            ],

            service_centers: [],
            modalities: [],
            filters: {
                by: '',
                entry: '',
                date_before: '',
                date_after: '',
            },
        }
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
                date_before: '',
                date_after: '',
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