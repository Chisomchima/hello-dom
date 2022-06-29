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
          key:'address',
          name: 'Address/Village',
          rules: [''],
          type:'textarea',
          value: '',
          col:'col-md-12'
        },
        {
          key:'address_city',
          name: 'City',
          rules: [''],
          value: '',
        },
        {
          key:'address_country',
          name: 'Country',
          rules: [''],
          value: '',
        },
        {
          key:'address_postal_code',
          name: 'Postal Code',
          rules: [''],
          type: 'input',
          value: '',
        },

        {
          key: 'occupations',
          name: 'Occupation',
          rules: [''],
          value: '',
        },
        {
          key: 'religion',
          name: 'Religion',
          rules: [''],
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
          rules: [''],
          options: ['Christianity', 'Islam'],
          value: '',
        },
        {
          key: 'state_of_origin',
          name: 'State of Origin',
          rules: [''],
          type: 'select',
          select_label: 'state',
          options: [],
          value: '',
        },
        {
          key: 'lga',
          name: 'LGA',
          rules: [''],
          value: '',
        },
      ],
    }
  },
  async created() {
    try {
      const { results } = await this.$api.core.country({ size: 1000 })
      this.$refs.formGen.setOptions('nationality', results)
     
      
      const { results: religion } = await this.$api.core.religion({
        size: 1000,
      })
      this.$refs.formGen.setOptions('religion', religion)
    } catch (error) {
      console.log(error)
    }
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