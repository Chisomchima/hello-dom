<template>
  <div id="fullscreen-Id">
    <div class="presentation-header py-2 px-4">
      <div class="bg-grayish-blue text-light fs-14 border py-1 px-3">
        {{ lesson.subject_name }}
      </div>

      <div class="bg-grayish-blue fs-14 border py-1 px-3">
        {{ lesson.name }}
      </div>
      <button
        class="btn btn-light d-flex align-items-center"
        @click="onChangeFullscreen()"
      >
        <span
          class="iconify fs-20 mr-2"
          data-inline="false"
          data-icon="fluent:whiteboard-24-regular"
        ></span>
        <span>Go Full Screen</span>
      </button>
    </div>

    <div class="presentation-body">
      <div class="container">
        <div class="card card-bordered mx-auto mb-5">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-5">
              <div
                class="text-dark font-family_brown font-weight-bold fs-20 pr-2"
              >
                {{ currentContent.title }}
              </div>
              <div class="text-primary fs-12 font-weight-bold text-capitalize">
                {{ currentContent.type }}
              </div>
            </div>

            <div
              v-if="currentContent.type === 'free_text'"
              class="text-light"
              v-html="currentContent.text"
            ></div>

            <div
              v-if="webViewerType.includes(currentContent.type)"
              class="text-light"
            >
              <WebViewer
                :url="currentContent.url"
                @scroll="emitViewerScrolling($event)"
              ></WebViewer>
            </div>
            <div v-if="currentContent.type === 'video'" class="text-light">
              <video-player :src="currentContent.url" />
            </div>
            <div
              v-if="currentContent.type === 'youtube_embed'"
              class="text-light"
            >
              <LazyYoutube max-width="100%" :src="currentContent.url" />
            </div>
            <div v-if="currentContent.type === 'quiz'">
              <template v-if="currentContent.quiz_type === 'objective'">
                <LiveClassQuizTeacherSide
                  ref="quizComp"
                  :question="currentContent.question"
                  :options="currentContent.options"
                />
              </template>
              <template v-if="currentContent.quiz_type === 'word_cloud'">
                <LiveClassQuizTeacherSideWordCloud
                  ref="wordCloudQuizComp"
                  :question="currentContent.question"
                >
                </LiveClassQuizTeacherSideWordCloud>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="presentation-footer py-2 px-4 flex-wrap">
      <div class="d-flex align-items-center flex-wrap">
        <div class="dropdownup">
          <button
            class="btn btn-outline-primary d-flex align-items-center mr-2"
            data-toggle="dropdown"
          >
            <span
              class="iconify fs-20 mr-2"
              data-inline="false"
              data-icon="akar-icons:file"
            ></span>
            <span>Lesson Content</span>
          </button>
          <div class="dropdown-menu presentation-dropdown-menu">
            <a
              v-for="(content, index) in contents"
              :key="index"
              class="dropdown-item"
              :class="[contentData.index === index ? 'active' : '']"
              href="#"
              @click="contentData.index = index"
            >
              <div class=""><span class="iconify icon fs-20 mr-2"></span></div>
              <div>
                <div class="fs-12 text-dark">{{ content.title }}</div>
                <div class="fs-12 text-light">{{ content.type }}</div>
              </div>
            </a>
          </div>
        </div>
        <div class="dropdownup">
          <button
            class="btn btn-outline-primary d-flex align-items-center mr-2"
            data-toggle="dropdown"
          >
            <span
              class="iconify fs-20 mr-2"
              data-inline="false"
              data-icon="noto:student-medium-dark-skin-tone"
            ></span>
            <span>Students ({{ students.length }})</span>
          </button>
          <div class="dropdown-menu presentation-dropdown-menu">
            <a
              v-for="(student, index) in students"
              :key="index"
              class="dropdown-item"
              href="#"
            >
              <div>
                <div class="fs-12 text-dark">{{ student.name }}</div>
              </div>
            </a>
          </div>
        </div>
        <button class="btn btn-light d-flex align-items-center mr-2">
          <span
            class="iconify fs-20 mr-2"
            data-inline="false"
            data-icon="fluent:whiteboard-24-regular"
          ></span>
          <span>Whiteboard</span>
        </button>
      </div>
      <div>
        <BaseButton
          watch-request
          class="btn btn-borderless-danger d-flex align-items-center"
          @click="close()"
        >
          <span
            class="iconify fs-20 mr-2"
            data-inline="false"
            data-icon="eva:close-circle-outline"
          ></span>
          <span>Close Presentation</span>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import toggleFullscreen, {
  fullscreenChange,
  isFullscreen,
} from 'toggle-fullscreen'

import { LazyYoutube } from 'vue-lazytube'
import { io } from 'socket.io-client'
import { debounce } from 'lodash'
import VideoPlayer from '@/components/VideoPlayer.vue'

let socket = null

// socket.on('connection', (socket) => {
//   console.log(socket.id) // x8WIv7-mJelg7on_ALbx
// })

// socket.on('connection', (socket) => {
//   console.log(socket.id) // x8WIv7-mJelg7on_ALbx
// })

export default {
  components: {
    VideoPlayer,
    LazyYoutube,
  },
  async asyncData({ $axios, route }) {
    const data = await $axios.$get(
      `/schools/v3/lesson/${route.params.lesson}/detail/`
    )
    return {
      lesson: data,
    }
  },
  data() {
    return {
      lesson: {},
      contentData: {
        index: 0,
        outerScroll: {
          x: 0,
          y: 0,
        },
        viewer: {
          top: 0,
        },
      },
      webViewerType: [
        'articles',
        'spreadsheet',
        'Images',
        'slide_show',
        'documents',
        // officials standard types
        'pdf',
        'spreadsheet',
        'image',
        'powerpoint',
        'word_document',
      ],
      students: [],
    }
  },
  computed: {
    contents() {
      return this.lesson.content
    },
    currentContent() {
      return this.contents[this.contentData.index]
    },
  },
  watch: {
    contentData: {
      handler(newValue) {
        socket.emit('class:state', newValue)
      },
      deep: true,
    },
  },
  beforeDestroy() {
    socket.disconnect()
  },
  mounted() {
    const school = this.$store.getters['school/getSchoolByCode'](
      this.$route.params.id
    )
    socket = io(`${process.env.LIVE_CLASS_URL}/teacher`, {
      autoConnect: false,
      query: {
        lesson: this.$route.params.lesson,
        school: school.id,
        live: this.$route.params.live,
        subject: this.$route.params.subject,
      },
    })
    // socket.connect()
    this.$nextTick(() => {
      if (socket.disconnected) {
        socket.connect()
      }

      socket.on('connect', () => {
        console.log(`connected to server ${socket.id}`)
        socket.emit('join:class', { liveID: this.$route.params.live })
      })

      socket.on('get:student', (data) => {
        socket.emit('get:student', data)
      })

      socket.on('student:list', (data) => {
        // console.log(data)
        // alert(JSON.stringify(data))
        this.students = data
      })
      socket.on('get:quiz-data', (data) => {
        this.$nextTick(() => {
          if (this.currentContent.type === 'quiz') {
            if (this.currentContent.quiz_type === 'objective') {
              this.$refs.quizComp.updateDataByIndex(data.index)
              socket.emit(
                'send:quiz-result',
                this.$refs.quizComp.chartOptions.series[0].data
              )
            }
            if (this.currentContent.quiz_type === 'word_cloud') {
              this.$refs.wordCloudQuizComp.updateWordCloud(data.words)
              console.log(
                this.$refs.wordCloudQuizComp.chartOptions.series[0].data
              )
              socket.emit(
                'send:quiz-result',
                this.$refs.wordCloudQuizComp.chartOptions.series[0].data
              )
            }
          }
        })
      })
    })

    window.addEventListener(
      'scroll',
      debounce(() => {
        this.contentData.outerScroll.y = window.scrollY
        this.contentData.outerScroll.x = window.scrollX
        // console.log(`Scrolling... ${scrollY}`)
      }, 500)
    )
    // setInterval(() => {
    //   // console.log('in time out')
    //   // this.$refs.quizComp.updateDataByIndex(1)
    //   console.log(this.$refs)
    // }, 3000)
  },
  methods: {
    async onChangeFullscreen() {
      const element = document.getElementById('fullscreen-Id')
      await toggleFullscreen(element)
    },
    emitViewerScrolling: debounce(function (val) {
      this.contentData.viewer.top = val
    }, 500),

    async close() {
      try {
        await this.$axios.$post(
          `/schools/v3/class_subject/${this.$route.params.subject}/live_class/`,
          {
            live_class: {},
          }
        )
        await this.$axios.$post(
          `${process.env.LIVE_CLASS_URL}/live-class/end-session/`,
          {
            live_class_id: this.$route.params.live,
          }
        )
       socket.emit('end:live-class');
        this.$router.back()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>