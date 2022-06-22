<template>
  <div>
    <DashboardFormGenerator
      ref="formGen"
      :form-config="formConfig"
      @change="onChange($event)"
    ></DashboardFormGenerator>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formConfig: [
        {
          key: 'firstName',
          name: 'First Name',
          rules: ['required'],
          value: '',
        },
        {
          key: 'middlename',
          name: 'Middle Name',
          rules: ['required'],
          value: '',
        },
        {
          key: 'lastName',
          name: 'Last Name',
          rules: ['required'],
          value: '',
        },
        {
          key: 'date_of_birth',
          name: 'DOB',
          rules: ['required'],
          type: 'date',
          value: '',
        },
        {
          key: 'gender',
          name: 'Gender',
          rules: ['required'],
          type: 'select',
          select_label: 'gender',
          options: [],
          value: null,
        },
        {
          key: 'email',
          name: 'Email',
          rules: ['required'],
          value: '',
        },
        {
          key: 'phone_number',
          name: 'Phone Number',
          rules: ['required'],
          value: '',
        },
        {
          key: 'martial_status',
          name: 'Martial Status',
          rules: ['required'],
          type: 'select',
          select_label: 'marital_status',
          options: [],
          value: '',
        },
        {
          key: 'occupations',
          name: 'Occupation',
          rules: ['required'],
          value: '',
        },
        {
          key: 'religion',
          name: 'Religion',
          rules: ['required'],
          type: 'select',
          select_label: 'religion',
          options: [],
          value: '',
        },
        {
          key: 'nationality',
          select_label: 'country',
          name: 'Nationality',
          type: 'select',
          rules: ['required'],
          options: ['Christianity', 'Islam'],
          value: '',
        },
        {
          key: 'state_of_origin',
          name: 'State of Origin',
          rules: ['required'],
          type: 'select',
          select_label: 'state',
          options: [],
          value: '',
        },
        {
          key: 'lga',
          name: 'Lga',
          rules: ['required'],
          value: '',
        },
        {
          key: 'id_type',
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
          key: 'id_number',
          name: 'Identification Number',
          rules: ['required'],
          value: '',
        },
        {
          key: 'id_validity',
          name: 'ID Validity',
          rules: ['required'],
          type: 'date',
          value: '',
        },
      ],
    }
  },
  async created() {
    const { results } = await this.$api.core.country({ size: 1000 })
    this.$refs.formGen.setOptions('nationality', results)
    const { results: genders } = await this.$api.core.gender({ size: 1000 })
    this.$refs.formGen.setOptions('gender', genders)
    const { results: mStatus } = await this.$api.core.martialStatus({
      size: 1000,
    })
    this.$refs.formGen.setOptions('martial_status', mStatus)
    const { results: religion } = await this.$api.core.religion({ size: 1000 })
    this.$refs.formGen.setOptions('religion', religion)
  },
  methods: {
    async submit() {
      return await this.$refs.formGen.getData()
    },
    async onChange({ key, value }) {
      if (key === 'nationality') {
        const { results } = await this.$api.core.state({
          size: 1000,
          country: value.id,
        })
        this.$refs.formGen.setOptions('state_of_origin', results)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>