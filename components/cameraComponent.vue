<template>
  <div class="d-flex justify-content-center">
    <div v-if="showOptions" class="img-container row p-lg-4 p-3 rounded">
      <div class="col-8">
        <div class="d-flex justify-content-center">
          <div class="crop">
            <img ref="imageRef" :src="src" width="100%" class="img-fluid" />
            <div class="d-flex justify-content-center mb-0 mt-4">
              <b-button variant="primary" @click="uploadCropped">
                Upload</b-button
              >
              <b-button
                variant="primary"
                class="ml-2"
                active
                @click="retakeCropped"
              >
                Retake
              </b-button>
            </div>
            <button
              class="btn-danger btn closebtn shadow"
              @click="showOptions = !showOptions"
            >
              <span
                class="iconify"
                data-icon="bi:x"
                data-width="20"
                data-height="20"
              ></span>
            </button>
          </div>
        </div>
      </div>
      <div class="preview col-3 ml-lg-0">
        <img :src="croppedImage" width="100%" alt="" />
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <div
        v-if="isCameraOpen"
        v-show="!isLoading"
        class="camera-box forCamera p-lg-5 p-3 rounded"
        :class="{ flash: isShotPhoto }"
      >
        <div
          v-if="showSpinner"
          class="d-flex justify-content-center align-items-center"
        >
          <b-spinner
            variant="primary"
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>
        </div>
        <video
          v-show="!isPhotoTaken"
          ref="camera"
          :width="450"
          :height="337.5"
          autoplay
        ></video>

        <canvas
          v-show="isPhotoTaken"
          id="photoTaken"
          ref="canvas"
          class="d-none"
          :width="450"
          :height="337.5"
        ></canvas>
        <div
          v-if="showCaptureOptions"
          class="d-flex justify-content-center mt-3"
        >
          <b-button variant="primary" @click="takePhoto"> Capture</b-button>
          <b-button variant="danger" class="ml-2" @click="toggleCamera">
            Cancel</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
export default {
  props: {
    demo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showCaptureOptions: false,
      imgVersion: 0,
      showOptions: false,
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: '#',
      media: null,
      src: '',
      cropper: null,
      croppedImage: '',
      destination: {},
      image: {},
      showSpinner: false,
    }
  },
  watch: {
    // whenever question changes, this function will run

    demo() {
      this.toggleCamera()
    },
  },
  mounted() {
    setTimeout(() => {}, 1000)
  },
  methods: {
    // hideCamera() {
    //   try {
    //     console.log('IINNNERRR', this.$refs)
    //     const tracks = this.$refs.camera.srcObject.getTracks()

    //     console.log(tracks)
    //     tracks.forEach((track) => {
    //       track.stop()
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    toggleCamera(showOptions = true) {
      if (this.isCameraOpen) {
        this.isCameraOpen = false
        this.isPhotoTaken = false
        this.isShotPhoto = false
        this.showSpinner = false
        this.stopCameraStream()
      } else {
        this.isCameraOpen = true
        if (showOptions === true) {
          setTimeout(() => {
            this.showCaptureOptions = true
          }, 1000)
          this.createCameraElement()
        }
      }
    },

    createCameraElement() {
      this.isLoading = true

      const constraints = (window.constraints = {
        audio: false,
        video: true,
      })

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.isLoading = false
          this.$refs.camera.srcObject = stream
        })
        .catch((error) => {
          this.isLoading = false
          console.log(error)
        })
    },

    stopCameraStream() {
      this.isCameraOpen = false
      try {
        const stream = this.$refs.camera.srcObject
        const tracks = stream.getTracks()
        tracks.map((track) => track.stop())
      } catch (error) {
        console.log(error)
      }
    },

    takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true

        const FLASH_TIMEOUT = 50

        setTimeout(() => {
          this.isShotPhoto = false
        }, FLASH_TIMEOUT)
      }

      this.isPhotoTaken = !this.isPhotoTaken

      const context = this.$refs.canvas.getContext('2d')
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5)
      this.isCameraOpen = false
      this.cropImage()

      try {
        const tracks = this.$refs.camera.srcObject.getTracks()

        console.log(tracks)
        tracks.forEach((track) => {
          track.stop()
        })
      } catch (error) {
        console.log(error)
      }
    },
    uploadCropped() {
      if (this.cropper) {
        this.cropper.destroy()
      }

      this.showSpinner = true
      this.showCaptureOptions = false
      this.toggleCamera(false)
      this.$emit('myevent', this.croppedImage)
      this.$emit('photoTaken', this.croppedImage)

      setTimeout(() => {
        this.showOptions = false
        this.showSpinner = false
      }, 1000)
    },
    retakeCropped() {
      if (this.cropper) {
        this.cropper.destroy()
      }
      this.showOptions = false
      this.src = ''
      this.toggleCamera()
    },
    cropImage() {
      this.showOptions = true

      const canvas1 = this.$refs.canvas.toDataURL('image/jpeg')
      this.src = ''
      this.imgVersion = Math.random()

      this.src = canvas1
      console.log('current img', canvas1)
      this.toggleCamera()

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
      this.isCameraOpen = false
    },

    dataURLtoFile(dataurl, filename) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new File([u8arr], filename, { type: mime })
    },
  },
}
</script>

<style scoped>
.img-container {
  position: fixed;
  top: 9rem;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-35%, -50%);

  /* transform: translateX(-30%); */
}
.crop {
  height: auto;
  width: 450px;
}
.preview {
  height: 200px;
  width: 200px;
}
.forCamera {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1050;
}

.closebtn {
  position: absolute;
  top: -2px;
  right: 15px;
}
.web-camera-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 500px;
}

.web-camera-container .camera-button {
  margin-bottom: 2rem;
}

.web-camera-container .camera-box .camera-shutter {
  opacity: 0;
  width: 450px;
  height: 337.5px;
  background-color: #fff;
  position: absolute;
}

.web-camera-container .camera-box .camera-shutter.flash {
  opacity: 1;
}

.camera-shoot {
  margin: 1rem 0;
}

.camera-shoot button {
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;

  img {
    height: 35px;
    object-fit: cover;
  }
}

.camera-loading {
  overflow: hidden;
  height: 100%;
  position: fixed;
  top: 15rem;
  right: 25rem;
  width: 100%;
  min-height: 150px;
  margin: 3rem 0 0 -1.2rem;

  ul {
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 999999;
    margin: 0;
  }

  .loader-circle {
    display: block;
    height: 14px;
    margin: 0 auto;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    transform: translateX(-50%);
    position: absolute;
    width: 100%;
    padding: 0;

    li {
      display: block;
      float: left;
      width: 10px;
      height: 10px;
      line-height: 10px;
      padding: 0;
      position: relative;
      margin: 0 0 0 4px;
      background: #999;
      animation: preload 1s infinite;
      top: -50%;
      border-radius: 100%;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
}

@keyframes preload {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
