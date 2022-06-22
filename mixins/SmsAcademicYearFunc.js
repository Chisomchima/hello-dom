import modalMsgBox from '~/mixins/modalMsgBox'
export default {
  mixins: [modalMsgBox],
  methods: {
    async deleteAcademicYear(data) {
      const result = await this.showDeleteMessageBox()
      if (result) {
        try {
          await this.$axios.$delete(`slate-admin/year/${data.id}/`)

          this.$router.push({
            name: 'sms-id-administration-configuration-year',
          })
          return true
        } catch (error) {
          console.log(error)
          return false
        }
      }
    },
  },
}
