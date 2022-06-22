<template>
  <div class="input-wrapper">
    <input
      ref="refis"
      class="invisible"
      type="file"
      :accept="accept"
      name="imagesArray"
      @change="handleUpload"
    />
  </div>
</template>

<script>
export default {
  props: {
    accept: {
      type: String,
      default: 'image/*',
    },
    refis: {
      type: String,
      default: 'file',
    },
  },
  mounted() {
    const ref = this.$refs.refis
    ref.click()
  },
  methods: {
    handleUpload(event) {
      const file = event.target.files[0]

      if (file) {
        this.$emit('file', file)

        const ref = this.$refs.refis
        ref.value = null
      }
    },
  },
}
</script>

<style scoped>
.input-wrapper {
  position: fixed;
}
</style>
