<template>
  <div class="upload-doc-wrapper w-max-100 justify-content-between mb-3">
    <div class="d-flex align-items-center">
      <div class="icon-wrapper text-primary" @click="downloadFile(file)">
        <span
          class="iconify"
          data-icon="bx:download"
          data-width="20"
          data-height="20"
        ></span>
      </div>
      <div class="ml-3">
        <div class="doc-title text-truncate">{{ fileName }}</div>
        <div class="doc-size">{{ fileSize }}</div>
      </div>
    </div>
    <!-- <div class="text-primary  fs-14 pointer" @click="$emit('view')">
      <strong data-v-0956524a="">View</strong>
    </div> -->

    <div class="text-primary fs-14 pointer">
      <strong @click="viewFile(file)"
        ><a target="_blank" class="text-primary">View</a></strong
      >
      <strong class="ml-3" @click="downloadFile(file)">Download</strong>
    </div>

    <!-- view uploaded file modal -->
    <b-modal
      id="uploadedFileModal2"
      centered
      hide-header-close
      header-class="mt-n3 pt-5"
      hide-footer
      size="xl"
    >
      <template #modal-header="{ close }">
        <h6 class="submitExerciseClass">
          Viewing
          {{ String(fileToViewComputed.file_name).split('.')[0] }}
        </h6>
        <img
          src="~/assets/lessons/svg/closeIcon.svg"
          alt="close icon"
          class="pointer mr-4"
          @click="close()"
        />
      </template>
      <div class="text-center">
        <img
          v-if="
            [
              '.png',
              '.jpeg',
              '.jpg',
              '.gif',
              'png',
              'jpeg',
              'jpg',
              'gif',
            ].includes(fileToViewType)
          "
          style="max-width: 100%; height: auto"
          :src="fileToViewComputed.essay_sample_url"
          :alt="fileToViewComputed.file_name"
        />
        <WebViewer
          v-if="
            [
              '.pdf',
              '.xlsx',
              '.xls',
              '.pptx',
              'pdf',
              'xlsx',
              'xls',
              'pptx',
              'docx',
              '.docx',
            ].includes(fileToViewType)
          "
          :url="fileToViewComputed.essay_sample_url"
        />
        <audio v-if="['.mp3', 'mp3'].includes(fileToViewType)" controls>
          <source
            :src="fileToViewComputed.essay_sample_url"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
        <video
          v-if="['.mp4', 'mp4'].includes(fileToViewType)"
          width="500"
          height="340"
          controls
        >
          <source :src="fileToViewComputed.essay_sample_url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    file: {
      type: Object,
      default: () => {},
    },
    fileName: {
      type: String,
      default: '',
    },
    fileSize: {
      type: String,
      default: '570 kb',
    },
  },
  data() {
    return {
      fileToView: {},
    }
  },
  computed: {
    fileToViewComputed() {
      return this.fileToView
    },
    fileToViewType() {
      const filename = String(this.fileToView.file_name)
      console.log('file name', filename.split('.').pop())

      return filename.split('.').pop()
    },
  },
  methods: {
    viewFile(file) {
      console.log('TEACHER    PATHHHHHHH', file)
      this.fileToView = file

      this.$bvModal.show('uploadedFileModal2')
    },
    async downloadFile(file) {
      console.log(file)
      try {
        const response = await axios.get(file.essay_sample_url, {
          responseType: 'blob',
        })
        const filename = file.file_name.split('.')[0]
        const filetype = file.file_name.split('.').pop()
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${filename}.${filetype}`
        link.click()
        URL.revokeObjectURL(link.href)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
