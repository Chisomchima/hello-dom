<template>
    <div>
      <BackwardNavigation />
      <!-- <UtilsHeaderCardWithAvatar :showScheme="false" :title="`${data.salutation ? data.salutation : ''} ${data.firstname ? data.firstname : ''
      } ${data.lastname ? data.lastname : ''}`" :data="data" :enable-action="false" :display-key="[
      'uhid',
      'date_of_birth',
      'gender',
      'marital_status',
      'religion',
      'nationality',
      'phone_number',
    ]">
      </UtilsHeaderCardWithAvatar>
      <UtilsBaseCardTab>
      </UtilsBaseCardTab> -->

      {{data}}
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