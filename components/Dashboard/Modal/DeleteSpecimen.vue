<template>
  <div>
    <ModalWrapper
      size="md"
      id="deleteSpecimenModal"
      :title="title"
      @ok="deleteItem"
      submitTitle="Delete"
    >

    <div>
        <h5 class="text-center">Please confirm this action</h5>
        <p class="text-info text-14 text-center p-2">You are about to delete {{specimen.name}} specimen</p>
    </div>
      
    </ModalWrapper>
  </div>
</template>

<script>
export default {
  data() {
    return {
        specimen: {
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
          this.specimen.name = data.name
          this.specimen.id = data.id
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
      default: () => 'Delete Specimen',
    },
  },
  mounted() {

  },

  methods: {
    async deleteItem() {
        try {
          const data = await this.$api.laboratory.deleteSpecimen(
            this.specimen.id
          )
          this.$emit('refresh')
          this.$bvModal.hide('deleteSpecimenModal')
        } catch (error) {
          console.log(error)
        }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>