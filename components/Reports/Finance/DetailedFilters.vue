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
                    <label class="form-control-label">Revenue Source</label>
                    <VSelect v-model="filters.bill_source" label="name" :options="sources" :multiple="true"
                        :reduce="(opt) => opt.val"></VSelect>
                </div>
            </div>
            <div class="col-md-4">
                <div class="mb-3">
                    <label class="form-control-label">Bill type</label>
                    <VSelect v-model="filters.billed_to_type" label="name" :options="billTypes" :multiple="true"
                        :reduce="(opt) => opt.val"></VSelect>
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
            sources: [
                { name: 'Encounter', val: 'Encounter' },
                { name: 'Imaging', val: 'Imaging' },
                { name: 'Inventory', val: 'Inventory' },
                { name: 'Laboratory', val: 'Laboratory' },
                { name: 'Nursing', val: 'Nursing' },
                { name: 'Pharmacy', val: 'Pharmacy' }
            ],
            billTypes: [
                { name: 'Corporate', val: 'CORPORATE' },
                { name: 'Insurance', val: 'INSURANCE' },
                { name: 'Self postpaid', val: 'SELF_POSTPAID' },
                { name: 'Self prepaid', val: 'SELF_PREPAID' },
            ],
            filters: {
                date_before: '',
                date_after: '',
                bill_source: '',
                billed_to_type: '',
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
                bill_source: '',
                billed_to_type: '',
            }
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