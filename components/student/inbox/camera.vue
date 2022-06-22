<template>
  <div class="adjust">
    <div>
      <div class="ml-3 mt-2">
        <span @click="cancel">
          <Icon icon="fa6-solid:x" style="font-size: 1.2rem" />
        </span>

        <span class="ml-2">Take Photo</span>
      </div>
    </div>
    <div v-if="showOptions" class="img-container d-flex justify-content-center">
      <div class="crop">
        <img ref="imageRef" :src="src" width="100%" class="img-fluid" />

        <div
          v-if="showOptions"
          class="
            img-caption
            row
            mt-5
            d-flex
            align-items-center
            items-center
            justify-content-center
          "
        >
          <div>
            <input
              v-model="caption"
              type="text"
              class="inputCaption"
              placeholder="Type a Caption"
            />
          </div>

          <VTooltip
            placement="top"
            class="ml-3"
            :data-popper-shown="true"
            :triggers="['hover']"
            :skidding="-10"
            :arrow-padding="8"
          >
            <b-button
              variant="primary"
              class="
                rounded-btn
                d-flex
                justify-content-center
                align-items-center
                text-white
                bg-primary
              "
              @click="uploadCropped"
            >
              <Icon icon="la:telegram-plane" :style="{ fontSize: '1.5rem' }" />
            </b-button>
            <template #popper>
              <div>Send Picture</div>
            </template>
          </VTooltip>

          <VTooltip
            placement="top"
            class="ml-3"
            :data-popper-shown="true"
            :triggers="['hover']"
            :skidding="-10"
            :arrow-padding="8"
          >
            <b-button
              variant="primary"
              class="
                rounded-btn
                d-flex
                justify-content-center
                align-items-center
                text-white
                bg-primary
              "
              @click="retakeCropped"
            >
              <Icon icon="charm:refresh" :style="{ fontSize: '1.5rem' }" />
            </b-button>
            <template #popper>
              <div>Retake Picture</div>
            </template>
          </VTooltip>
        </div>
      </div>
      <!-- <div class="preview col-3 ml-2">
        <img :src="croppedImage" width="100%" alt="" />
      </div> -->
    </div>

    <div
      v-if="isCameraOpen"
      v-show="!isLoading"
      class="camera-box forCamera"
      :class="{ flash: isShotPhoto }"
    >
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
      <div v-if="showCaptureOptions" class="d-flex justify-content-center">
        <VTooltip
          placement="right"
          :data-popper-shown="true"
          :triggers="['hover']"
          :skidding="-10"
          :arrow-padding="8"
        >
          <b-button
            variant="primary"
            class="
              rounded-btn
              d-flex
              justify-content-between
              text-white
              bg-primary
            "
            @click="takePhoto"
          >
            <Icon icon="bxs:camera" :style="{ fontSize: '3rem' }" />
          </b-button>
          <template #popper>
            <div>Take Photo</div>
          </template>
        </VTooltip>
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
      caption: '',
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
    }
  },
  watch: {
    // whenever question changes, this function will run
    demo() {
      this.toggleCamera()
    },
  },
  mounted() {
    setTimeout(() => {
      this.toggleCamera()
    }, 1000)
  },
  methods: {
    cancel() {
      if (this.isCameraOpen === true) {
        this.toggleCamera()
      }

      this.$emit('closeCamera')
    },
    toggleCamera(showOptions = true) {
      if (this.isCameraOpen) {
        this.isCameraOpen = false
        this.isPhotoTaken = false
        this.isShotPhoto = false
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
          alert('error')
        })
    },

    stopCameraStream() {
      try {
        const tracks = this.$refs.camera.srcObject.getTracks()

        tracks.forEach((track) => {
          track.stop()
        })
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
      this.cropImage()
    },
    uploadCropped() {
      if (this.cropper) {
        this.cropper.destroy()
      }
      this.showCaptureOptions = false
      this.showOptions = false
      this.toggleCamera(false)
      this.$emit('myevent', this.croppedImage, this.caption)
      this.$emit('photoTaken', this.croppedImage)
      this.$emit('closeCamera')
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
.inputCaption {
  background-color: #2a3942;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
.rounded-btn {
  display: block;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
}
.adjust {
  position: absolute;
  background: #101a20;
  color: white;
  height: calc(100%);

  width: 100%;
  z-index: 100;
}
.img-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1050;
}
.crop {
  height: 340px;
  width: 450px;
}
.preview {
  height: 200px;
  width: 200px;
}
.forCamera {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1050;
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
