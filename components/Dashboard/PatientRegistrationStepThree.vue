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
          name: 'First Name',
          rules: ['required'],
          value: '',
        },
        {
          name: 'Middle Name',
          rules: ['required'],
          value: '',
        },
        {
          name: 'Last Name',
          rules: ['required'],
          value: '',
        },
        {
          name: 'DOB',
          rules: ['required'],
          type: 'date',
          value: '',
        },
        {
          name: 'Gender',
          rules: ['required'],
          type: 'select',
          options: ['Male', 'Female'],
          value: null,
        },
        {
          name: 'Phone Number',
          rules: ['required'],
          value: '',
        },
        {
          name: 'Martial Status',
          rules: ['required'],
          value: '',
        },
        {
          name: 'Occupation',
          rules: ['required'],
          value: '',
        },
        {
          name: 'Religion',
          rules: ['required'],
          type: 'select',
          options: ['Christianity', 'Islam'],
          value: '',
        },
        {
          name: 'Nationality',
          rules: ['required'],
          value: '',
        },
        {
          name: 'State of Origin',
          rules: ['required'],
          value: '',
        },
        {
          name: 'Lga',
          rules: ['required'],
          value: '',
        },
        {
          name: 'Identification Type',
          rules: ['required'],
          type: 'select',
          options: [
            'Service No',
            'Driving License',
            'Employee Id',
            'Passport, Visa No',
          ],
          value: null,
        },
        {
          name: 'Identification Number',
          rules: ['required'],
          value: '',
        },
        {
          name: 'ID Validity',
          rules: ['required'],
          type: 'date',
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