<template>
  <div>
    <div class="d-flex align-items-center justify-content-end mb-2">
      <BaseButton
        watch-request
        class="btn btn-outline-primary d-flex align-items-center py-2 px-3"
        @click="toPresentationMode()"
      >
        <span
          class="iconify mr-2"
          data-inline="false"
          data-icon="si-glyph:slide-show"
        ></span>
        Presentation Mode
      </BaseButton>
    </div>

    <div>
      <div class="px-3 mb-4">
        <p class="font-weight-bold text-dark mb-1">Description</p>
        <p class="text-light fs-14 font-weight-normal">
          {{ data.description }}
        </p>
      </div>
      <Table
        :items="data.content"
        :fields="fields"
        :filter="filter"
        :show-pagination="false"
      >
        <template #format="{ data }">
          <Icon class="" :icon="formatType(data.item)" />
        </template>
        <template #relative_url="{ data }">
          <a href="#" @click="openViewer(data.item)" class="text-dark"
            ><span class="iconify" data-icon="bi:eye-fill"></span
          ></a>

          <!-- <pre>{{ data.item }}</pre> -->
        </template>
      </Table>

      <b-modal
        id="uploadedFileModal"
        centered
        hide-header-close
        header-class="mt-n3 pt-5"
        hide-footer
        size="lg"
      >
        <template #modal-header="{ close }">
          <!-- <h6 class="submitExerciseClass">
          Viewing
          {{ String(fileToView.file_name).split('.')[0] }}
        </h6> -->
          <img
            src="~/assets/lessons/svg/closeIcon.svg"
            alt="close icon"
            class="pointer mr-4"
            @click="close()"
          />
        </template>
        <div class="text-center">
          <!-- <img
            v-if="
              fileToView.includes('.png') ||
              fileToView.includes('.jpg') ||
              fileToView.includes('.jpeg') ||
              fileToView.includes('.gif')
            "
            style="max-width: 100%; height: auto"
            :src="fileToView"
            :alt="fileToView"
          /> -->

          <WebViewer
            v-if="
              [
                'images',
                'Images',
                'Image',
                'image',
                'slide_show',
                'documents',
                'spreadsheets',
                'spreadsheet',
                'articles',
                'pdf',
                'word_document',
                'powerpoint',
              ].includes(fileToView.type)
            "
            ref="webViewer"
            :style="{ height: onFullScreen ? '85vh' : '500px' }"
            :url="fileToView.url"
          />

          <video-player
            v-if="['video'].includes(fileToView.type)"
            :src="fileToView.url"
          />

          <LazyYoutube
            v-if="['youtube', 'youtube_embed'].includes(fileToView.type)"
            ref="youtubeLazyVideo"
            :src="fileToView.url"
            max-width="100%"
          />
          <div
            v-if="fileToView.type === 'free_text'"
            v-html="fileToView.text || fileToView.description"
          ></div>

          <!-- <WebViewer
            v-if="
              fileToView.includes('.pdf') ||
              fileToView.includes('.xlsx') ||
              fileToView.includes('.xls') ||
              fileToView.includes('.pptx') ||
              fileToView.includes('.docx')
            "
            :url="fileToView"
          /> -->
          <!-- <audio v-if="fileToView.includes('.mp3')" controls>
            <source :src="fileToView" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <video
            v-if="fileToView.includes('.mp4')"
            width="500"
            height="340"
            controls
          >
            <source :src="fileToView" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div v-else>
            <LazyYoutube
              ref="youtubeLazyVideo"
              :src="fileToView"
              max-width="100%"
            />
          
          </div> -->
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { LazyYoutube } from 'vue-lazytube'
import VideoPlayer from '@/components/VideoPlayer.vue'
export default {
  components: {
    LazyYoutube,
    VideoPlayer,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      currentClass: null,
      fields: [
        { key: 'title', sortable: true },
        { key: 'description', sortable: true },
        { key: 'format', sortable: true },
        { key: 'relative_url', label: 'View', sortable: true },

        // { key: 'relative_url', label: 'House', sortable: true },
        // { key: 'url', sortable: false },
      ],
      fileToView: '',
    }
  },
  methods: {
    formatType(type) {
      console.log(type)
      if (['free_text', '.txt'].includes(type.type)) {
        return 'ant-design:file-text-outlined'
      }
      if (['video', '.mp4'].includes(type.type)) {
        return 'vscode-icons:file-type-video'
      }
      if (['youtube', 'youtube_embed'].includes(type.type)) {
        return 'openmoji:youtube'
      }
      if (['images', 'image', 'Image', 'Images', '.png'].includes(type.type)) {
        return 'vscode-icons:file-type-image'
      }
      if (['spreadsheets', 'spreadsheet', '.xlsx'].includes(type.type)) {
        return 'vscode-icons:file-type-excel2'
      }
      if (['documents', 'word_document', '.docx'].includes(type.format)) {
        return 'vscode-icons:file-type-word'
      }
      if (['.pdf', 'articles'].includes(type.format)) {
        return 'ant-design:file-pdf-filled'
      }
      if (['slide_show', 'powerpoint', '.pptx'].includes(type.type)) {
        return 'vscode-icons:file-type-powerpoint2'
      }
    },

    async createLive() {
      try {
        const school = this.$store.getters['school/getSchoolByCode'](
          this.$route.params.id
        )
        const data = await this.$axios.$post(
          `${process.env.LIVE_CLASS_URL}/live-class/create/`,
          {
            lesson_id: this.$route.params.lesson,
            class_id: this.data.class_id,
            school_id: school.id,
            subject_id: this.$route.params.subject,
          }
        )

        await this.$axios.$post(
          `schools/v3/class_subject/${this.$route.params.subject}/live_class/`,
          {
            live_class: {
              ...data,
            },
          }
        )

        return data

        // this.$router.push({
        //   name: 'sms-id-lms-subjects-subject-lesson-lesson-live-live',
        //   params: {
        //     subject: this.$route.params.subject,
        //     lesson: this.$route.params.lesson,
        //     live: data.live_class_id,
        //   },
        // })
      } catch (error) {
        console.log(error)
      }
    },

    toPresentationMode2() {
      const routeData = this.$router.resolve({
        name: 'presentation-mode-lesson',
        params: { lesson: this.$route.params.lesson },
      })
      window.open(routeData.href, '_blank')

      // this.$router.push({
      //   name: 'presentation-mode-lesson',
      //   params: {
      //     lesson: this.$route.params.lesson
      //   }
      // })
    },

    async toPresentationMode() {
      try {
        const data = await this.createLive()
        this.$router.push({
          name: 'sms-id-lms-subjects-subject-lesson-lesson-live-live',
          params: {
            subject: this.$route.params.subject,
            lesson: this.$route.params.lesson,
            live: data.live_class_id,
          },
        })
      } catch (error) {
        console.log(error)
      }

      // this.$router.push({
      //   name: 'presentation-mode-lesson',
      //   params: {
      //     lesson: this.$route.params.lesson
      //   }
      // })
    },
    openViewer(file) {
      this.fileToView = file

      console.log('object', this.fileToView)

      this.$bvModal.show('uploadedFileModal')
    },
  },
}
</script>

<style scoped>
#presentation > .modal-dialog {
  height: 100% !important;
}
.modal-dialog {
  margin: 0px !important;
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 100% !important;
  }
}
</style>
