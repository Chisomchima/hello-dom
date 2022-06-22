export default {
  methods: {
    async checkFormValidity() {
      const result = await this.$refs.form.validate()
      return result
    },
  },
}
