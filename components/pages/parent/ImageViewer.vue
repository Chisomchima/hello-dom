
<template>
  <div style="overflow-y: hidden" class="modal-backdropp">
    <div class="absolutecontainer">
      <div class="topimgbar px-5 py-2">
        <div class="d-flex justify-content-between py-2">
          <div>
            <p class="mb-1 fs-14 text-white">
              {{ message ? message.name : '' }}
            </p>
            <!-- <p class="mt-1 fs-14 graytext">
              {{
                message
                  ? message.datetime
                    ? message.datetime.slice(10, 16)
                    : ''
                  : ''
              }}
            </p> -->
          </div>

          <div>
            <span class="text-white" @click="$emit('closeImagePreview')">
              <span
                class="iconify"
                data-icon="bi:x"
                data-width="20"
                data-height="20"
              ></span>
            </span>
          </div>
        </div>
      </div>

      <div
        class="imagepreview d-flex align-items-center justify-content-center"
      >
        <!-- <pre class="text-white">{{ filetype }}</pre> -->
        <div>
          <div
            v-if="filetype === 'image'"
            class="d-flex justify-content-center"
          >
            <div
              style="width: 50%; height: 50%"
              class="d-flex justify-content-center"
            >
              <img
                :src="imageUrl"
                alt=""
                class="img-fluid actualimage text-center"
              />
            </div>
          </div>
          <div
            v-if="filetype === 'video'"
            class="d-flex justify-content-center"
          >
            <video
              :src="imageUrl"
              class="img-fluid text-center"
              controls
            ></video>
          </div>
          <div v-if="filetype === 'file'" class="d-flex justify-content-center">
            thid is fiole
          </div>
        </div>
      </div>

      <div class="topimgbarbottom px-5 py-2">
        <div class="d-flex justify-content-between py-2">
          <div>
            <p class="mb-1 fs-14 text-white">
              {{ messageToSend ? messageToSend.post : '' }}
            </p>
          </div>
          <div>
            <span class="text-white" @click="$emit('sendImage')">
              <span
                class="iconify"
                data-icon="fluent:send-28-filled"
                data-width="20"
                data-height="20"
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message', 'imageUrl', 'messageToSend', 'filetype'],

  data() {
    return {
      showOnlyImages: this.messageToSend ? this.messageToSend.file[0] : {},
    }
  },

  mounted() {
    console.log(this.messageToSend)
    console.log('VIEWER', this.showOnlyImages)
  },
}
</script>

<style scoped>
.relativecontainer {
  position: relative;
  width: 100%;
  height: 100%;
}
.absolutecontainer {
  position: absolute;
  z-index: 400;
  left: 320px;
  width: 100%;
  /* height: 80%; */
  top: 70px;
}

.totalpreview {
  background: #11222b;
  overflow-y: hidden !important;
  z-index: 400;
}

.imagepreview {
  /* position: absolute; */
  top: 4.4rem;
  bottom: 0;

  right: 0;
  background-color: #111c22;
  z-index: 2;
  width: 72%;
  height: 55vh;
}

.topimgbar {
  /* position: absolute; */
  top: 9%;

  height: 70px;
  width: 72%;
  background: #293439;
  z-index: 400;
}
.topimgbarbottom {
  /* position: absolute; */
  bottom: 8%;

  height: 40px;
  width: 72%;
  background: #293439;
  z-index: 400;
}

.actualimage {
  width: 50%;
}

.graytext {
  color: #b8bec2;
}

@media (max-width: 768px) {
  .imagepreview {
    width: 86%;
  }

  .topimgbar {
    width: 82% !important;
  }
  .topimgbarbottom {
    width: 82% !important;
  }
}
</style>