<template>
  <div>
    <DashboardFormGenerator
      ref="formGen"
      :form-config="formConfig"
    ></DashboardFormGenerator>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formConfig: [
        {
          key: 'relation_name',
          name: 'Relative Name',
          rules: [''],
          value: '',
          col:'col-md-6'
        },
        {
          key: 'relationship',
          name: 'Relationship',
          col:'col-md-6',
          rules: [''],
          value: '',
          options: [
            'Brother',
            'Brother-in-law',
            'Daughter',
            'Daughter-in-law',
            'Father',
            'Father-in-law',
            'Friend',
            'Grandfather',
            'Grandmother',
            'Husband',
            'Mother',
            'Mother-in-law',
            'Self',
            'Sister',
            'Sister-in-law',
            'Son',
            'Son-in-law',
            'Uncle',
            'Wife',
          ],
          type: 'select',
        },
        {
          key: 'relation_address',
          name: 'Address',
          rules: [''],
          value: '',
          col:'col-md-12',
          type:'textarea'
        },
         {
          key: 'relation_phone_num',
          name: 'Phone Number',
          rules: [''],
          value: '',
        },
        {
          key: 'relation_city',
          name: 'City',
          rules: [''],
          value: '',
        },
        {
          key: 'relation_country',
          name: 'Country',
          rules: [''],
          value: '',
        },
        {
          key: 'relation_postal_code',
          name: 'Postal Code',
          rules: [''],
          value: '',
        },
      ],
    }
  },
  methods: {
    async submit() {
      return await this.$refs.formGen.getData()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>