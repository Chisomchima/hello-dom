<template>
  <div id="viewer" class="card">
    <!-- <b-overlay
      v-if="$fetchState.pending"
      spinner-variant="primary"
      show="true"
      rounded="sm"
    >
      <div class="bg-white" style="height: 550px"></div>
    </b-overlay> -->
    <template>
      <div class="card-header d-flex justify-content-between">
        <h4 class="text-muted font-weight-bold">
          {{ currentContent.title }}
        </h4>
        <div class="d-flex justify-content-around align-items-center">
          <button
            class="btn btn-primary mx-4"
            @click="fullScreenFunc('viewer')"
          >
            <b-icon icon="arrows-fullscreen"></b-icon> {{ fullScreenText }}
          </button>
          <Icon
            class="mr-lg-3 fa-2x nav-item-icon d-md-block"
            :icon="formatType(currentContent.type)"
          />
        </div>
      </div>
      <div
        class="card-body font-family_brown"
        :style="{ height: onFullScreen ? '100vh' : '550px' }"
        style="overflow-y: auto"
      >
        <WebViewer
          v-if="
            [
              'images',
              'image',
              'slide_show',
              'documents',
              'spreadsheets',
              'spreadsheet',
              'articles',
              'pdf',
              'word_document',
              'powerpoint',
            ].includes(currentContent.type)
          "
          ref="webViewer"
          :style="{ height: onFullScreen ? '85vh' : '500px' }"
          :url="currentContent.url"
        />

        <video-player
          v-if="['video'].includes(currentContent.type)"
          :src="currentContent.url"
        />

        <LazyYoutube
          v-if="['youtube', 'youtube_embed'].includes(currentContent.type)"
          ref="youtubeLazyVideo"
          :src="currentContent.url"
          max-width="100%"
        />
        <div
          v-if="currentContent.type === 'free_text'"
          v-html="currentContent.text || currentContent.description"
        ></div>

        <div class="footer d-flex bg-white justify-content-between border-top">
          <div>
            <button
              v-show="Number($route.query.content_index) >= 1"
              :disabled="!Number($route.query.content_index) >= 1"
              class="btn btn-lg btn-borderless-primary rounded-0"
              @click="prev()"
            >
              <b-icon icon="chevron-left" />
              Previous
            </button>
          </div>

          <template
            v-if="
              Number($route.query.content_index) <= lesson.content.length - 2
            "
          >
            <button
              class="
                btn btn-lg
                font-family_brown
                btn-borderless-primary
                rounded-0
              "
              @click="next()"
            >
              Next
              <b-icon icon="chevron-right" />
            </button>
          </template>
          <template v-else>
            <button
              class="
                btn btn-lg
                font-family_brown
                btn-borderless-primary
                rounded-0
              "
              @click="finish()"
            >
              Finish
            </button>
          </template>
        </div>
      </div>
    </template>
    <b-modal
      id="lessonCompleteModal"
      centered
      no-stacking
      hide-footer
      hide-header
    >
      <div class="text-center mt-n0 mb-4">
        <img
          class="mx-auto"
          src="~/assets/lessons/svg/lessonComplete.svg"
          alt="Lesson complete icon"
        />
      </div>
      <div class="d-block text-center">
        <p>You have successfully completed this lesson 🎉</p>
      </div>
      <div class="text-center mt-4 mb-3">
        <button
          class="btn btn-lg btn-borderless-primary font-family_brown"
          @click="
            $router.push(`/student/lms/${$route.params.schoolId}/subjects`)
          "
        >
          Back to Subjects
        </button>
        <button
          class="btn btn-lg btn-borderless-primary font-family_brown"
          @click="reviewCurrentLesson()"
        >
          Review Current Lesson
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { LazyYoutube } from 'vue-lazytube'
import fullscreen from '@/mixins/fullscreen'
import VideoPlayer from '@/components/VideoPlayer.vue'
export default {
  components: {
    LazyYoutube,
    VideoPlayer,
  },
  mixins: [fullscreen],
  props: {
    lesson: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      lessonContent: {},
      // lesson: {},
    }
  },

  // async fetch() {
  //   const school = this.$store.getters['student/getSchoolByCode'](
  //     this.$route.params.schoolId
  //   )

  //   const { data } = await this.$axios.$get(
  //     `lms/v2/school/${school.id}/${this.$store.state.student.currentAcademicYear}/lesson/${this.$route.params.lesson}`
  //   )

  //   this.lesson = data
  //   this.lessonContent = data.lesson_contents
  // },

  computed: {
    currentContent() {
      return this.lesson.content[Number(this.$route.query.content_index)]
    },
  },

  watch: {
    '$route.query.content_index'(_newVal, oldVal) {
      this.setItemAsCompleted(oldVal)
    },
  },

  methods: {
    formatType(type) {
      console.log(type)
      if (['free_text', 'articles'].includes(type)) {
        return 'ant-design:file-text-outlined'
      }
      if (['video'].includes(type)) {
        return 'vscode-icons:file-type-video'
      }
      if (['youtube', 'youtube_embed'].includes(type)) {
        return 'openmoji:youtube'
      }
      if (['images', 'image'].includes(type)) {
        return 'vscode-icons:file-type-image'
      }
      if (['spreadsheets', 'spreadsheet'].includes(type)) {
        return 'vscode-icons:file-type-excel2'
      }
      if (['documents', 'word_document'].includes(type)) {
        return 'vscode-icons:file-type-word'
      }
      if (['pdf'].includes(type)) {
        return 'ant-design:file-pdf-filled'
      }
      if (['slide_show', 'powerpoint'].includes(type)) {
        return 'vscode-icons:file-type-powerpoint2'
      }
    },
    next() {
      this.$router.replace({
        query: {
          ...this.$route.query,
          content_index: Number(this.$route.query.content_index) + 1,
        },
      })
    },

    prev() {
      this.$router.replace({
        query: {
          ...this.$route.query,
          content_index: Number(this.$route.query.content_index) - 1,
        },
      })
    },

    reviewCurrentLesson() {
      this.$bvModal.hide('lessonCompleteModal')
      this.$router.replace({
        query: {
          content_index: 0,
        },
      })
    },
    setItemAsCompleted(index) {
      const school = this.$store.getters['student/getSchoolByCode'](
        this.$route.params.schoolId
      )
      this.$axios
        .$post(
          `lms/v2/school/${school.id}/lesson/${this.$route.params.lesson}/content/completed/${index}/`,
          {
            academic_year_id: this.$store.state.student.currentAcademicYear,
          }
        )
        .then((res) => {
          this.$emit('updateLesson', res.data)
        })
    },
    finish() {
      this.setItemAsCompleted(this.$route.query.content_index)
      if (this.onFullScreen) {
        this.fullScreenFunc('viewer')
      }
      this.$bvModal.show('lessonCompleteModal')
    },
  },
}
</script>

<style scoped>
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
