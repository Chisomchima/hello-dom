<template>
    <div>
        <BackwardNavigation />
        <UtilsHeaderCardWithAvatar :actions="['close_order', 'cancel_order']" @close_order="closeOrder" @cancel_order="cancelOrder" :patientContext="false"
            :showScheme="false" :title="`${data.patient.salutation ? data.patient.salutation : ''} ${data.patient.firstname ? data.patient.firstname : ''
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
            <h3 class="text-16 mb-2">Instruction</h3>
            <p class="text-14 mb-0 text-info">{{ data.description }}</p>
        </div>
        <UtilsBaseCardTab>
            <UtilsCardTab title="Tasks">
                <NursingTabsTasks :data="data" :patient="data.patient" />
            </UtilsCardTab>
            <UtilsCardTab title="Consumables">
                <!-- <NursingTabsTasks /> -->

                <div class="p-3">
                    <h3>Hello world</h3>
                </div>
            </UtilsCardTab>
        </UtilsBaseCardTab>

        <!-- <pre>
            {{ data }}
        </pre> -->
        <NursingModalCancelOrder :editData="data" @refresh="filter(currentPage, currentFilter)" />
        <NursingModalCloseOrder :editData="data" @refresh="filter(currentPage, currentFilter)" />
    </div>
</template>
  
<script>
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

    },
    methods: {
        closeOrder() {
            this.$bvModal.show('closeOrder')
        },
        cancelOrder(){
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