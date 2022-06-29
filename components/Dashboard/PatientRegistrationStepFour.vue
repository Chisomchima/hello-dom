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
          key: 'Payer',
          name: 'payer',
          rules: [],
          value: '',
        },
        {
          key: 'sponsor',
          name: 'Relation',
          rules: [],
        },
        {
          key: 'network',
          name: 'Network',
          rules: [],
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