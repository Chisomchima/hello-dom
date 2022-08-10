<template>
  <div>
    <ModalWrapper
      size="md"
      id="deletePanelModal"
      :title="title"
      @ok="deleteItem"
      submitTitle="Delete"
    >

    <div>
        <h5 class="text-center">Please confirm this action</h5>
        <p class="text-info text-14 text-center p-2">You are about to delete {{panel.identity}} panel</p>
    </div>
      
    </ModalWrapper>
  </div>
</template>

<script>
export default {
  data() {
    return {
        panel: {
            id: '',
            identity: ''
        }
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          let data = { ...newVal }
          this.panel.identity = data.identity
          this.panel.id = data.id
        }
      },
      immediate: true,
      deep: true,
    },
  },
  props: {
    editData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    title: {
      type: String,
      require: false,
      default: () => 'Delete Panel',
    },
  },
  mounted() {

  },

  methods: {
    async deleteItem() {
        try {
          const data = await this.$api.laboratory.deletePanel(
            this.panel.id
          )
          this.$emit('refresh')
          this.$bvModal.hide('deletePanelModal')
        } catch (error) {
          console.log(error)
        }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>