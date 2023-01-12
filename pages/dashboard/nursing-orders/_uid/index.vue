<template>
    <div>
        <BackwardNavigation />
        <UtilsHeaderCardWithAvatar :nursingActions="true" :enableAction="false" @closeOrder="closeOrder"
            @cancelOrder="cancelOrder" :patientContext="false" :showScheme="false" :title="`${data.patient.salutation ? data.patient.salutation : ''} ${data.patient.firstname ? data.patient.firstname : ''
            } ${data.patient.lastname ? data.patient.lastname : ''}`" :data="data.patient" :enable-action="true"
            :display-key="[
                'uhid',
                'date_of_birth',
                'gender',
                'marital_status',
                'religion',
                'nationality',
                'phone_number',
            ]">
        </UtilsHeaderCardWithAvatar>

        <div class="bg-white my-3 p-3">
            <p class="text-16 text-grey mb-1">Instruction</p>
            <div class="text-14">
                {{ data.description }}
            </div>
            <div class="row px-3">
                <div class="col-md-4 text-14 text-grey p-0">
                    <span>Ordered by: </span><span>{{ createdBy }}</span>
                </div>
                <div class="col-md-3 text-14 text-grey p-0">
                    <span>Date ordered: </span><span>{{ dateCreated }}</span>
                </div>
            </div>
        </div>
        <UtilsBaseCardTab>
            <UtilsCardTab title="Tasks">
                <NursingTabsTasks :data="data" :patient="data.patient" />
            </UtilsCardTab>
            <UtilsCardTab title="Consumables">
                <!-- <NursingTabsTasks /> -->

                <div class="p-3">
                    <h3 class="p-5 text-center">Coming soon</h3>
                </div>
            </UtilsCardTab>
        </UtilsBaseCardTab>

        <NursingModalCancelOrder :editData="data" @refresh="filter(currentPage, currentFilter)" />
        <NursingModalCloseOrder :editData="data" @refresh="filter(currentPage, currentFilter)" />
    </div>
</template>
  
<script>
import { DateTime } from 'luxon'
export default {
    async asyncData({ $api, route }) {
        try {
            const data = await $api.nursing.getSpecificTask(route.params.uid)
            return {
                data,
            }
        } catch (error) {
            console.log(error)
        }
    },
    data() {
        return {
            tabs: true,
            data: null,
            refresh: false,
            template: {},
        }
    },
    computed: {
        dateCreated() {
            let x = DateTime.fromISO(this.data.created_at).toFormat('yyyy-LL-dd')
            return x
        },
        createdBy(){
            if(Object.keys(this.data.created_by).length > 0)
                return this.data.created_by.first_name + " " + this.data.created_by.last_name
            else
                return ''
        },
    },
    methods: {
        closeOrder() {
            this.$bvModal.show('closeOrder')
        },
        cancelOrder() {
            this.$bvModal.show('cancelOrder')
        }
    },
}
</script>
  
<style lang="scss" scoped>
ul>li {
    padding: 5px;
}
</style>
  
<style lang="scss">

</style>