<template>
  <div>
    <ModalWrapper
      size="md"
      id="deleteModal"
      :title="title"
      @ok="deleteItem"
      submitTitle="Delete"
    >

    <div>
        <h5 class="text-center">Please confirm this action</h5>
        <p class="text-info text-14 text-center">You are about to delete {{imaging.name}} observation</p>
    </div>
      
    </ModalWrapper>
  </div>
</template>

<script>
export default {
  data() {
    return {
        imaging: {
            id: '',
            name: ''
        }
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          let data = { ...newVal }
          this.imaging.name = data.name
          this.imaging.id = data.id
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
      default: () => 'Delete item',
    },
  },
  mounted() {

  },

  methods: {
    async deleteItem() {
        try {
          const data = await this.$api.imaging.deleteObv(
            this.imaging.id
          )
          this.$emit('refresh')
          this.$bvModal.hide('deleteModal')
        } catch (error) {
          console.log(error)
        }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>