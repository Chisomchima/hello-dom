export default {
  data() {
    return {
      showCropper: false,
      studentId: '',
    }
  },
  methods: {
    showProfile(e) {
      console.log(e)
      const schoolCode = this.$store.state.administration.school.code

      console.log(e.id)
      this.$router.push({
        path: `/sms/${this.$route.params.id}/administration/student/${e.id}`,
        query: { _name: `${e.first_name} ${e.last_name}` },
      })
    },

    handleComminucation(e) {
      console.log(e)
    },
    handleCapture(e) {
      console.log(e)
    },
    handleUpload(e) {
      this.studentId = e.id
      this.showCropper = true

      console.log(e)
    },
    cancelImage() {
      this.showCropper = false
    },
    savedImage(e) {
      console.log(e)
      this.imagesArray = e.croppedFile
      console.log('version is', this.version)

      this.submitImage()

      this.showCropper = false
    },
    async submitImage() {
      // this.deleteImage()
      const fd = new FormData()
      fd.append('avatar', this.imagesArray)
      await this.$axios.put(
        `/slate-admin/admission/${this.studentId}/profile/`,
        fd
      )
    },
  },
}
