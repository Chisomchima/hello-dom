<template>
  <div>
     Hello World
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
          name: 'Address/Village *',
          rules: ['required'],
          value: '',
        },
        {
          name: 'Country *',
          rules: ['required'],
          value: '',
        },
        {
          name: 'City *',
          rules: ['required'],
          value: '',
        },
        {
          name: 'Postal Code *',
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