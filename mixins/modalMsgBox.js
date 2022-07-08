export default {
  methods: {
    async showDeleteMessageBox(text = 'Please confirm that you want to delete record.') {
      const result = await this.$bvModal.msgBoxConfirm(
      text,
        {
          title: 'Please Confirm',
          okVariant: 'danger',
          okTitle: 'Delete',
          cancelVariant: 'light',
          cancelTitle: 'Cancel',
          hideHeaderClose: false,
          centered: true,
        }
      )
      return result
    },

    async showConfirmMessageBox(text = 'Please confirm ') {
      const result = await this.$bvModal.msgBoxConfirm(text, {
        title: 'Please Confirm',
        okVariant: 'primary',
        okTitle: 'Confirm',
        cancelVariant: 'light',
        cancelTitle: 'Cancel',
        hideHeaderClose: false,
        centered: true,
      })
      return result
    },
  },
}
