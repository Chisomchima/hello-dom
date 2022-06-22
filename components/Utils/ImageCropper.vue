<template>
  <div>
    <div v-if="showCropper" class="upload-img-container row">
      <div class="crop col-8">
        <img ref="imageRef" :src="fullImage" width="100%" class="img-fluid" />
        <div class="d-flex justify-content-center mt-2">
          <b-button variant="primary" @click="clickedSaved"> Upload</b-button>
          <b-button variant="primary" class="ml-2" active @click="cancelled">
            Cancel
          </b-button>

          <div
            v-if="showSpinner"
            class="
              d-flex
              justify-content-center
              align-items-center
              w-100
              h-100
              mb-3
              bg-white
            "
          >
            <b-spinner
              variant="primary"
              style="width: 3rem; height: 3rem"
              label="Large Spinner"
            ></b-spinner>
          </div>
        </div>
      </div>
      <div class="preview col-3 ml-2">
        <img :src="croppedImage" width="100%" alt="" />
      </div>
    </div>

    <input
      ref="fileInputCrop"
      class="invisible"
      type="file"
      accept="image/*"
      name="imagesArray"
      style="position: fixed"
      @change="onChange"
    />
  </div>
</template>

<script>
import Cropper from 'cropperjs'

export default {
  data() {
    return {
      fullImage: '',
      imageL: '',
      showCropper: false,
      cropper: null,
      croppedImage: '',
      showSpinner: false,
    }
  },
  mounted() {
    this.clickButton()
  },
  methods: {
    clickButton() {
      const inputFile = this.$refs.fileInputCrop
      inputFile.click()
    },
    onChange(event = null) {
      if (event) {
        const image = event.target.files[0]
        const reader = new FileReader()

        reader.readAsDataURL(image)
        reader.onload = function () {
          this.fullImage = reader.result
        }.bind(this)
        this.showCropper = true
        this.startCropping()
      }
    },
    startCropping() {
      setTimeout(() => {
        this.image = this.$refs.imageRef
        console.log('img', this.image)
        this.cropper = new Cropper(this.image, {
          zoomable: false,
          scalable: false,
          aspectRatio: 1,
          crop: () => {
            const canvas = this.cropper.getCroppedCanvas()
            this.croppedImage = canvas.toDataURL('image/png')
          },
        })
      }, 100)
      this.$refs.fileInputCrop.value = null
    },
    async clickedSaved() {
      const obj = { croppedFile: '', croppedImageURI: '' }
      this.showSpinner = true
      const blob = await (await fetch(this.croppedImage)).blob()
      obj.croppedFile = blob
      obj.croppedImageURI = this.croppedImage
      this.$emit('saved', obj)
      // this.showSpinner = false
    },
    cancelled() {
      this.$emit('cancelled')
    },
  },
}
</script>

<style>
@import '~/node_modules/vue-anka-cropper/dist/VueAnkaCropper.css';
.upload-img-container {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1050;
}
.crop {
  height: 335px;
  width: 450px;
}
.preview {
  height: 200px;
  width: 200px;
}
</style>
