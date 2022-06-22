<template>
  <div id="fullscreen-Id">
    <div class="presentation-header py-2 px-4">
      <div class="bg-grayish-blue text-light fs-14 border py-1 px-3">
        {{ lesson.class_subject.name }}
      </div>

      <div class="bg-grayish-blue fs-14 border py-1 px-3">
        {{ lesson.name }}
      </div>

      <!-- <div class="bg-grayish-blue fs-14 border py-1 px-3">
        {{ $socket.connected }}
      </div> -->
      <button
        class="btn btn-light d-flex align-items-center"
        @click="onChangeFullscreen()"
      >
        <span
          class="iconify fs-20 mr-2"
          data-inline="false"
          data-icon="fluent:whiteboard-24-regular"
        ></span>
        <span>{{ fullScreenText }}</span>
      </button>
    </div>

    <div
      class="presentation-body"
      :class="[currentContent.type === 'quiz' ? '' : 'disable-interaction']"
    >
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
                :scroll-to-top="contentData.viewer.top"
              ></WebViewer>
            </div>
            <div
              v-if="currentContent.type === 'video'"
              class="text-light disable-interaction"
              style="position: relative; height: 100%; width: 100%"
            >
              <div class="frontB d-flex flex-column">
                <h1>A video is currently Playing</h1>
                <p>please focus on instructors screen</p>
              </div>
              <div class="blurry">
                <video-player :src="currentContent.url" />
              </div>
            </div>
            <div
              v-if="currentContent.type === 'youtube_embed'"
              class="text-light disable-interaction"
              style="position: relative; height: 100%; width: 100%"
            >
              <div class="frontB d-flex flex-column">
                <h1>A video is currently Playing</h1>
                <p>please focus on instructors screen</p>
              </div>
              <div class="blurry">
                <LazyYoutube max-width="100%" :src="currentContent.url" />
              </div>
            </div>
            <div v-if="currentContent.type === 'quiz'">
              <template v-if="currentContent.quiz_type === 'objective'">
                <LiveClassQuizStudentSide
                  v-if="!submitted"
                  :question="currentContent.question"
                  :options="currentContent.options"
                  @answer="submitAnswer($event)"
                />
                <LiveClassQuizStudentObjView
                  v-else
                  :question="currentContent.question"
                  :data="quizResult"
                />
              </template>
              <template v-if="currentContent.quiz_type === 'word_cloud'">
                <LiveClassQuizStudentSideWordCloud
                  v-if="!submitted"
                  :question="currentContent.question"
                  :entries="currentContent.entries"
                  @answer="submitAnswer($event)"
                >
                </LiveClassQuizStudentSideWordCloud>
                <LiveClassQuizStudentWordCloudView
                  v-else
                  :question="currentContent.question"
                  :data="quizResult"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="presentation-footer py-2 px-4 flex-wrap">
      <div>
        <button
          class="btn btn-borderless-danger d-flex align-items-center"
          @click="$router.back()"
        >
          <span
            class="iconify fs-20 mr-2"
            data-inline="false"
            data-icon="eva:close-circle-outline"
          ></span>
          <span>Close Presentation</span>
        </button>
      </div>
    </div>
    <b-modal
      id="bv-modal-example"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      centered
      hide-footer
      hide-header
    >
      <div class="d-block text-center d-flex justify-content-center m-5">
        <span
          class="iconify fs-24 mr-2"
          data-inline="false"
          data-icon="bytesize:info"
        ></span>
        <h6 class="text-center">{{ modalText }}</h6>
      </div>
      <div>
        <div class="text-center">
          <BaseButton
            v-if="!presentationEnded"
            :disabled="disableButton"
            class="btn-lg btn-borderless-primary"
            @click="connectToSocket()"
            >Connect</BaseButton
          >

          <BaseButton
            v-else
            class="btn-lg btn-borderless-primary"
            @click="goBackToSubject()"
            >Go back to Subject</BaseButton
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import toggleFullscreen, {
  fullscreenChange,
  isFullscreen,
} from 'toggle-fullscreen'
import { io } from 'socket.io-client'
import SmoothScroll from 'smooth-scroll'
import { compact } from 'lodash'
import { storeLocallyForStudentLiveClass } from '@/utils/storage.worker'

const scroll = new SmoothScroll()

let socket = null

export default {
  async asyncData({ store, $axios, route }) {
    try {
      const school = store.getters['student/getSchoolByCode'](
        route.params.schoolId
      )
      debugger;
      const { data } = await $axios.$get(
        `lms/v2/school/${school.id}/${store.state.student.currentAcademicYear}/lesson/${route.params.lesson}`
      )
      // console.log(data);
      return {
        lesson: data,
      }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      presentationEnded: false,
      fullScreenText: 'Go Full Screen',
      modalText: 'Connect to join the lesson',
      disableButton: false,
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
      submitted: false,
      quizResult: [],
    }
  },
  computed: {
    contents() {
      return this.lesson.content
    },
    currentContent() {
      return this.contents[this.contentData.index]

      //   return this.contents[0]
    },
  },
  watch: {
    'contentData.outerScroll'(val) {
      if (val) {
        scroll.animateScroll(val.y)
      }
      //   scroll.animateScroll(val.y)
      // window.scrollTo(val.x, val.y)
    },
    submitted(val) {
      if (val) {
        socket.on('quiz:result', (data) => {
          this.quizResult = data
        })
      }
    },
    'contentData.index'() {
      this.submitted = false
      socket.removeListener('quiz:result', (data) => {
        this.quizResult = data
      })
    },
  },
  created() {
    socket = io(`${process.env.LIVE_CLASS_URL}/student`, {
      autoConnect: false,
      query: {
        lesson: this.$route.params.lesson,
        school: this.$store.state.student.classDetails.school.id,
        subject: this.$route.params.subject,
        live: this.$route.params.live,
      },
    })
  },
  mounted() {
    document.body.style.scrollBehavior = 'smooth'
    document.documentElement.style.overflow = 'hidden'
    this.$bvModal.show('bv-modal-example')
    this.modalText = 'Downloading lesson content, please wait...'
    // document.documentElement.style.overflow = 'hidden'
    this.disableButton = true
    const lessonContent = this.lesson.content.map((content) => {
      if (this.webViewerType.includes(content.type)) {
        return content.url
      }
      return null
    })

    storeLocallyForStudentLiveClass(compact(lessonContent)).then(() => {
      this.modalText = 'Click connect to join the lesson session'
      this.disableButton = false
    })

    this.$nextTick(() => {
      socket.on('connect', () => {
        this.$bvModal.hide('bv-modal-example')
        console.log(`connected to server ${socket.id}`)
        socket.emit('join:class', { liveID: this.$route.params.live })
      })
      socket.on('class:state', (data) => {
        if (Object.keys(data).length > 0) {
          this.contentData = data
        }
      })
    })

    fullscreenChange(() => {
      const isFullScreen = isFullscreen()
      if (!isFullScreen) {
        this.fullScreenText = 'Enter Full Screen'
        if (this.presentationEnded) {
          this.modalText = 'The lesson has ended'
        } else {
          this.modalText =
            'You have been disconnected for the lesson, click connect to rejoin lesson session'
        }
        socket.disconnect()
        this.$bvModal.show('bv-modal-example')
      } else {
        this.fullScreenText = 'Exit Full Screen'
        socket.connect()
        this.$bvModal.hide('bv-modal-example')
      }
    })

    socket.on('end:live-class', async () => {
      this.modalText = 'The lesson has ended'
      this.presentationEnded = true
      await this.onChangeFullscreen()
    })
  },
  beforeDestroy() {
    socket.disconnect()
    document.documentElement.style.overflow = 'auto'
  },
  methods: {
    async onChangeFullscreen() {
      const element = document.getElementById('fullscreen-Id')
      await toggleFullscreen(element)
    },

    submitAnswer(e) {
      socket.emit('send:quiz-data', e)
      this.submitted = true
    },

    connectToSocket() {
      socket.auth = {
        name: this.$store.state.student.studentProfile.name,
        id: this.$store.state.student.studentProfile.classes[0].id,
      }
      console.log(socket.auth)
      socket.connect()
      this.onChangeFullscreen()
    },

    goBackToSubject(){
      this.$router.push({
        name:"student-lms-schoolId-subjects",
        params:{
          schoolId:this.$route.params.schoolId
        }
      })
    }
  },
}
</script>

<style scoped>
body {
  scroll-behavior: smooth;
  overflow: hidden;
}
/* .stop-scrolling {
  height: 100%;
  overflow: hidden;
} */

.blurry {
  filter: blur(10px);
}

.frontB {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* (D1) CENTER */
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  z-index: 200;

  /* (D2) COSMETICS */
  color: #fff;
  font-size: xx-large;
  text-shadow: 2px 2px #545454;
}
</style>