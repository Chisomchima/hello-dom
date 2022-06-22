<template>
  <div class="adjust">
    <div class="ml-3 mt-2">
      <span @click="cancel">
        <Icon icon="fa6-solid:x" style="font-size: 1.2rem" />
      </span>

      <span class="d-flex justify-content-center">{{
        file ? file.name : ''
      }}</span>
      <span v-if="availablePreview" class="d-flex justify-content-center">
        {{ file ? formatSize(file.size) : '' }}
      </span>
    </div>
    <div class="d-flex justify-content-center flex-column h-90">
      <div class="d-flex justify-content-center align-items-center">
        <div class="preview-container">
          <WebViewer v-if="availablePreview" :url="image"></WebViewer>
          <div
            v-else
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <Icon
              icon="healthicons:i-documents-denied"
              style="font-size: 4rem"
            />
            <h3>No preview Available</h3>
            <p>
              {{ file ? formatSize(file.size) : '' }} -
              {{ file ? file.type : '' }}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-2 d-flex justify-content-center align-items-end">
        <VTooltip
          placement="top"
          class="ml-3"
          :data-popper-shown="true"
          :triggers="['hover']"
          :skidding="-10"
          :arrow-padding="8"
        >
          <b-button class="rounded-btn bg-success" @click="handleSend">
            <Icon icon="fe:paper-plane" style="font-size: 2rem" />
          </b-button>
          <template #popper>
            <div>Send Document</div>
          </template>
        </VTooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: File,
      default: null,
    },
  },
  data() {
    return {
      image:
        'https://slate-assets.s3.amazonaws.com/media/560aeb58-f3af-464a-8dab-9192ce4228ca/reportcard/doc_4a0c3360-b8e6-4f72-a83d-349a482bda09.pdf',
      availablePreview: true,
    }
  },
  mounted() {
    if (this.file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.image = e.target.result
      }
      reader.addEventListener('error', () => {
        this.availablePreview = false
        console.error(`Error occurred reading file`)
      })

      reader.addEventListener('load', () => {
        console.log(`File read successfully`)
      })

      reader.readAsDataURL(this.file)
    }
  },
  methods: {
    formatSize(x) {
      const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      let l = 0
      let n = parseInt(x, 10) || 0

      while (n >= 1024 && ++l) {
        n = n / 1024
      }

      return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]
    },
    handleSend() {
      this.$emit('send', this.file)
      setTimeout(() => {
        this.$emit('cancel')
      }, 1500)
    },
    cancel() {
      this.$emit('cancel')
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
.h-90 {
  height: 90%;
}
.preview-container {
  max-height: 30rem;
  overflow: auto;
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
  /* overflow: auto; */

  width: 100%;
  z-index: 100;
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
