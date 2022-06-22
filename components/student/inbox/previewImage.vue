<template>
  <div class="adjust">
    <div class="">
      <div class="mt-1">
        <span @click="closeComponent">
          <Icon
            icon="bi:x"
            data-rotate="180deg"
            :style="{ fontSize: '2rem' }"
          />
        </span>
      </div>

      <div class="img-container">
        <div class="img-box">
          <img
            ref="imageRef"
            :src="fullImage"
            class="img-fluid"
            width="100%"
            alt=""
          />
        </div>
        <div
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'

export default {
  props: {
    image: {
      type: File,
      default: null,
    },
  },
  data() {
    return {
      imageTag: '',
      cropper: null,
      caption: '',
      fullImage: '',
      croppedImage: '',
    }
  },

  mounted() {
    if (this.image) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.fullImage = e.target.result
      }
      reader.addEventListener('error', () => {
        console.error(`Error occurred reading file`)
      })

      reader.addEventListener('load', () => {
        console.log(`File read successfully`)
      })

      reader.readAsDataURL(this.image)
    }

    setTimeout(() => {
      this.imageTag = this.$refs.imageRef
      console.log('img', this.image)
      this.cropper = new Cropper(this.imageTag, {
        zoomable: false,
        scalable: false,
        aspectRatio: 1,
        crop: () => {
          const canvas = this.cropper.getCroppedCanvas()
          this.croppedImage = canvas.toDataURL('image/png')
        },
      })
    }, 500)
    // if (this.image) {
    //   const reader = new FileReader()

    //   await reader.readAsDataURL(this.image)
    //   reader.onload = function () {
    //     this.fullImage = reader.result
    //   }.bind(this)
    // }
  },

  methods: {
    uploadCropped() {
      if (this.cropper) {
        this.cropper.destroy()
      }

      this.$emit('send', this.croppedImage)
      // this.$emit('send', this.croppedImage, this.caption)
      this.$emit('close')
    },
    closeComponent() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.img-box {
  height: 340px;
  width: 450px;
}
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
.my-editor {
  height: 600px;
  width: 600px;
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
  padding: 2rem;
  width: 80%;
  height: 100%;
  margin-left: auto;
  margin-top: auto;
  margin-right: auto;
}
</style>
