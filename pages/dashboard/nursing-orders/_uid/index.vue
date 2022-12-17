<template>
    <div>
        <BackwardNavigation />
        <UtilsHeaderCardWithAvatar :showScheme="false" :title="`${data.patient.salutation ? data.patient.salutation : ''} ${data.patient.firstname ? data.patient.firstname : ''
      } ${data.patient.lastname ? data.patient.lastname : ''}`" :data="data.patient" :enable-action="false" :display-key="[
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
        <p class="text-14 mb-0 text-info">Instruction: {{data.description}}</p>
      </div>
        <UtilsBaseCardTab>
            <UtilsCardTab title="Tasks">
                <NursingTabsTasks :patient="data.patient" />
            </UtilsCardTab>
            <UtilsCardTab title="Tab 2">
                <!-- <NursingTabsTasks /> -->

                <div class="p-3">
                    <h3>Hello world</h3>
                </div>
            </UtilsCardTab>
        </UtilsBaseCardTab>

        <!-- <pre>
            {{ data }}
        </pre> -->
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