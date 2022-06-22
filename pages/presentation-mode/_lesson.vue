<template>
  <div id="presentation">
    <!-- <pre>{{ data }}</pre> -->
    <div class="presentation-header py-2 px-4">
      <div class="bg-grayish-blue text-light fs-14 border py-1 px-3">
        {{ data.class }}
      </div>
      <div class="bg-grayish-blue text-light fs-14 border py-1 px-3">
        {{ data.name }}
      </div>

      <button
        class="btn btn-light d-flex align-items-center"
        @click="fullScreenFunc()"
      >
        <span
          class="iconify fs-20 mr-2"
          data-inline="false"
          data-icon="fluent:whiteboard-24-regular"
        ></span>
        <span>{{ fullScreenText }}</span>
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
                {{ selectedContent.title }}
              </div>
              <div class="text-primary fs-12 font-weight-bold text-capitalize">
                {{ selectedContent.type }}
              </div>
            </div>

            <div
              v-if="selectedContent.type === 'free_text'"
              class="text-light"
              v-html="selectedContent.text"
            ></div>

            <div
              v-if="webViewerType.includes(selectedContent.type)"
              class="text-light"
            >
              <WebViewer :url="selectedContent.url"></WebViewer>
            </div>
            <div v-if="selectedContent.type === 'video'" class="text-light">
              <video-player :src="selectedContent.url" />
            </div>
            <div
              v-if="selectedContent.type === 'youtube_embed'"
              class="text-light"
            >
              <LazyYoutube :src="selectedContent.url" />
            </div>
          </div>
        </div>
        <div
          v-if="data.exercise"
          class="card card-bordered mx-auto mb-5"
          style="max-width: 800px"
        >
          <div class="card-body font-family_brown">
            <div class="d-flex align-items-stretch flex-wrap flex-lg-nowrap">
              <div class="mr-3 mb-3 mb-md-0 w-100" style="max-width: 219px">
                <img
                  class="object-fit-cover w-100 rounded"
                  style="height: 122px"
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                />
              </div>
              <div
                class="flex-grow-1 d-flex flex-column justify-content-between"
              >
                <div class="mb-3">
                  <div class="fs-14 line-height-100p text-primary mb-2">
                    General Studies
                  </div>
                  <div
                    class="fs-18 font-weight-bold line-height-150p text-dark"
                  >
                    {{ data.exercise.name }}
                  </div>
                </div>
                <div
                  class="
                    d-flex
                    align-items-center
                    flex-wrap
                    fs-14
                    text-dark
                    line-height-100p
                  "
                >
                  <div class="pr-3 mb-2">Week 5</div>
                  <div class="pr-3 mb-2 text-danger">Not started</div>
                  <div class="pr-3 mb-2">
                    <span class="text-light">Posted on:</span>
                    {{ data.exercise.available_date }}
                  </div>
                  <div class="text-primary mb-2">
                    {{ data.exercise.quiz_mode }}
                  </div>
                </div>
              </div>
            </div>

            <div
              class="
                d-flex
                flex-wrap
                align-items-start
                justify-content-center
                bg-grayish-variant-2
                border
                rounded-lg
                mt-4
              "
            >
              <div class="text-center px-4 my-3">
                <div class="fs-12 font-weight-bold line-height-150p text-light">
                  Quiz Type
                </div>
                <div class="fs-14 text-dark">{{ data.exercise.quiz_type }}</div>
              </div>
              <div class="text-center px-4 my-3">
                <div class="fs-12 font-weight-bold line-height-150p text-light">
                  No of Questions
                </div>
                <div class="fs-14 text-dark">1</div>
              </div>
              <div class="text-center px-4 my-3">
                <div class="fs-12 font-weight-bold line-height-150p text-light">
                  Duration
                </div>
                <div class="fs-14 text-dark">
                  {{ data.exercise.duration }} minutes
                </div>
              </div>
              <div class="text-center px-4 my-3">
                <div class="fs-12 font-weight-bold line-height-150p text-light">
                  Obtainable Score
                </div>
                <div class="fs-14 text-dark">
                  {{ data.exercise.full_score }} marks
                </div>
              </div>
              <div class="text-center px-4 my-3">
                <div class="fs-12 font-weight-bold line-height-150p text-light">
                  Due Date
                </div>
                <div class="fs-14 text-dark">{{ data.exercise.due_date }}</div>
              </div>
            </div>

            <div
              class="fs-14 text-light line-height-150p text-center mx-auto mt-4"
              style="max-width: 489px"
            >
              {{ data.exercise.description }}
            </div>

            <div class="my-5 pt-5 pb-4 text-center">
              <button class="btn btn-primary-2 btn-primary py-3 px-3 mx-auto">
                Start Exercise
              </button>
              <button class="btn btn-danger py-3 px-3 mx-auto">
                Stop Exercise
              </button>
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
              v-for="(lesson, index) in data.content"
              :key="index"
              class="dropdown-item"
              href="#"
              :class="[contentIndex == index ? 'active' : '']"
              @click="selectContent(lesson, index)"
            >
              <div class="">
                <span
                  class="iconify icon fs-20 mr-2"
                  data-inline="false"
                  data-icon="bi:play-circle-fill"
                ></span>
              </div>
              <!-- <div v-else class="">
                  <span class="iconify icon fs-20 mr-2"></span>
                </div> -->

              <div>
                <div class="fs-12 text-dark text-capitalize">
                  {{ lesson.title }}
                </div>
                <div class="fs-12 text-light text-capitalize">
                  {{ lesson.type }}
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="dropdownup">
          <button
            class="btn btn-light d-flex align-items-center mr-2"
            data-toggle="dropdown"
          >
            <span
              class="iconify fs-20 mr-2"
              data-inline="false"
              data-icon="akar-icons:file"
            ></span>
            <span>Exercise</span>
          </button>
          <div class="dropdown-menu presentation-dropdown-menu">
            <a class="dropdown-item" href="#">
              <div class=""><span class="iconify icon fs-20 mr-2"></span></div>
              <div>
                <div class="fs-12 text-dark">Human Body Analogy</div>
                <div class="fs-12 text-light">Classwork</div>
                <div class="mt-1">
                  <button class="btn btn-outline-danger btn-sm">
                    Stop Exercise
                  </button>
                </div>
              </div>
            </a>
            <a class="dropdown-item active" href="#">
              <div class="">
                <span
                  class="iconify icon fs-20 mr-2"
                  data-inline="false"
                  data-icon="bi:play-circle-fill"
                ></span>
              </div>
              <div>
                <div class="fs-12 text-dark">Human Body Analogy</div>
                <div class="fs-12 text-light">Homework</div>
              </div>
            </a>
            <a class="dropdown-item" href="#">
              <div class=""><span class="iconify icon fs-20 mr-2"></span></div>
              <div>
                <div class="fs-12 text-dark">Human Body Analogy</div>
                <div class="fs-12 text-light">Classwork</div>
                <div class="mt-1">
                  <button class="btn btn-outline-primary btn-sm">
                    Start Exercise
                  </button>
                </div>
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
        <button
          class="btn btn-borderless-danger d-flex align-items-center"
          @click="$router.go(-1)"
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
  </div>
</template>

<script>
import { LazyYoutube } from 'vue-lazytube'
import VideoPlayer from '@/components/VideoPlayer.vue'

export default {
  components: {
    VideoPlayer,
    LazyYoutube
  },
  async asyncData({ $axios, route }) {
    try {
      const data = await $axios.$get(
        `/schools/v3/lesson/${route.params.lesson}/detail/`
      )
      return { data }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      selectedContent: '',
      contentIndex: 0,
      fullScreenText: 'Go Full Screen',
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
      ]
    }
  },
  mounted() {
    this.initContent()
  },
  methods: {
    fullScreenFunc() {
      if (this.IsFullScreenCurrently()) {
        this.GoOutFullscreen()
        this.fullScreenText = 'Go Full Screen'
      } else {
        this.GoInFullscreen(document.getElementById('presentation'))
        this.fullScreenText = 'Exit Full Screen'
      }
    },

    GoInFullscreen(element) {
      if (element.requestFullscreen) element.requestFullscreen()
      else if (element.mozRequestFullScreen) element.mozRequestFullScreen()
      else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen()
      else if (element.msRequestFullscreen) element.msRequestFullscreen()
    },
    GoOutFullscreen() {
      if (document.exitFullscreen) document.exitFullscreen()
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
      else if (document.msExitFullscreen) document.msExitFullscreen()
    },
    IsFullScreenCurrently() {
      // eslint-disable-next-line camelcase
      const full_screen_element =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        null

      // If no element is in full-screen
      // eslint-disable-next-line camelcase
      if (full_screen_element === null) return false
      else return true
    },
    exitFullscreen() {
      if (this.IsFullScreenCurrently()) {
        this.GoOutFullscreen()
        this.fullScreenText = 'Go Full Screen'
      }
    },
    selectContent(content, index) {
      this.selectedContent = {}

      this.$nextTick(() => {
        this.selectedContent = content
        this.contentIndex = index
      })
    },
    initContent() {
      this.contentIndex = 0
      this.selectedContent = this.data.content[this.contentIndex]
    }
  }
}
</script>

<style scoped>
body {
  margin: 0px;
  height: 100%;
}
#presentation {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>
