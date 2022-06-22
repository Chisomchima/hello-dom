<template>
  <div>
    <div v-if="!image" class="mt-5">
      <div class="file-uploader mx-auto">
        <div>
          <span
            class="iconify"
            data-icon="ant-design:cloud-upload-outlined"
            style="color: #979797; font-size: 35px"
          ></span>
        </div>
        <div class="upload-text">
          <!-- Drag and drop or -->
          <label class="label mb-0"
            >Choose a file
            <input
              ref="fileInput"
              type="file"
              class="d-none"
              :accept="accepts.join(',')"
              @change.prevent="onSelectFile()"
          /></label>
          to upload your material.
        </div>
        <div class="instruction-text">Max. file size 10MB</div>
      </div>
    </div>
    <div v-else class="mt-5">
      <div class="file-uploader mx-auto">
        <div class="uploaded-content py-4 px-4">
          <div class="icon-btn" @click="removeImage()">
            <span class="iconify icon" data-icon="topcoat:cancel"></span>
          </div>
          <div class="uploaded-label text-truncate flex-grow-1 px-3">
            {{ image.name }}
          </div>
          <div class="icon-btn">
            <b-icon
              v-show="!uploading"
              icon="cloud-upload"
              :variant="fileObject ? 'success' : ''"
            ></b-icon>
            <b-spinner
              v-show="uploading"
              small
              variant="primary"
              label="Spinning"
            ></b-spinner>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    accepts: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'file',
    },
    fileData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      image: null,
      sourceTokenToCancelRequest: null,
      promise: '',
      requestPromise: null,
      uploading: false,
      fileObject: null,
    }
  },
  watch: {
    fileData: {
      handler(newVal) {
        if (newVal && newVal.url) {
          this.image = {}
          this.image.name =
            newVal.url.split('/')[newVal.url.split('/').length - 1]
          this.fileObject = newVal
        }
      },
      immediate: false,
    },
  },
  mounted() {
    // const input = this.$refs.fileInput
    // const files = input.files
    // console.log(files[0])
    // const promise = new Promise()
    // console.trace(promise)
    // promise.resolve('files[0]')
    // console.log(promise)
  },
  methods: {
    removeImage() {
      this.image = null
      this.requestPromise = null
      // this.fileObject = null,
      if (this.sourceTokenToCancelRequest) {
        this.sourceTokenToCancelRequest.cancel(
          'Operation canceled by the user.'
        )
      }
    },
    chooseImage() {
      this.$refs.fileInput.click()
    },
    onSelectFile() {
      try {
        const input = this.$refs.fileInput
        const files = input.files
        if (files && files[0]) {
          this.image = files[0]

          const formData = new FormData()
          formData.append('file', this.image)
          formData.append('type', 'image')

          const school = this.$store.getters['school/getSchoolByCode'](
            this.$route.params.id
          )

          this.uploading = true // show spinner
          this.$emit('uploading', true)
          this.sourceTokenToCancelRequest = this.$axios.CancelToken.source()

          this.requestPromise = this.$axios
            .$post(`./schools/v2/school/${school.id}/resource/`, formData, {
              cancelToken: this.sourceTokenToCancelRequest.token,
            })
            .then((res) => {
              this.sourceTokenToCancelRequest = null
              this.uploading = false
              this.fileObject = res.data
              this.$emit('uploading', false)
              this.$emit('file-input', res.data)
            })
            .catch((err) => {
              return err
            })
        }
      } catch (error) {
        console.log(error)
        this.$toast({
          type: 'error',
          text: error.message,
        })
        this.$toast({
          type: 'error',
          text: `error uploading resource ${this.image.name}`,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
