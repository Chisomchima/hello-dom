<template>
  <div @click="$emit('hide-attachmentOptions')">
    <!-- image previwer starts here -->
    <div v-if="showPreview" class="p-2 modal-backdropp">
      <div class="d-flex justify-content-between px-4 mb-2">
        <div class="row">
          <div class="mr-3">
            <img
              class="avatar-img img-fluid"
              :src="require(`~/assets/img/male-young.jpeg`)"
            />
          </div>
          <div>
            <div class="small text-truncater mr-2 text-secondary">
              {{ previewImaged.profile }}
            </div>
            <div class="small text-truncater mr-2 text-secondary">
              {{ previewImaged.time }}
            </div>
          </div>
        </div>
        <div class="text-secondary mt-2">
          <a id="a1" download="file1.png" @click="downloadPreviewImage">
            <Icon
              icon="fe:download"
              data-rotate="180deg"
              :style="{ fontSize: '1.5rem' }"
            />
          </a>
          <span
            @click="
              showPreview = false
              previewImaged = {
                profile: '',
                img: '',
              }
            "
          >
            <Icon
              icon="bi:x"
              data-rotate="180deg"
              :style="{ fontSize: '1.5rem' }"
            />
          </span>
        </div>
      </div>
      <div class="mx-5 mt-5 d-flex justify-content-center h-75">
        <img alt="" :src="previewImaged.img" class="img-fluid" width="60%" />
      </div>
    </div>

    <!-- chat messages starts here -->
    <div
      class="mb-2 px-4 mt-1 messages-container"
      :class="{ morePadding: moreSpace }"
    >
      <div v-for="(chat, index) in currentChat" :key="index">
        <div
          v-if="checkTimeDifference(index)"
          class="w-100 d-flex justify-content-center"
        >
          <span class="currentDate">
            {{ fullDate(chat.message.datetime) }}
          </span>
        </div>

        <div
          class="mt-1"
          :class="`d-flex justify-content-${
            chat.message.sender.name.includes(chattingWith.first_name)
              ? 'start'
              : 'end'
          }`"
        >
          <div class="chat-bubble">
            <div v-if="showSenderArrow(chat)" class="sender-reply-arrow"></div>
            <div
              v-if="showReceiverArrow(chat)"
              class="receiver-reply-arrow"
            ></div>

            <!-- reply starts here -->
            <div
              v-if="chat.message.reply_for"
              class="reply-box rounded p-1"
              :style="{
                fontSize: '0.5rem',
                backgroundColor: '#F4F6F8',
              }"
            >
              <p :style="{ fontSize: '0.7rem' }" class="m-0 text-primary">
                {{ chat.message.reply_for.reply_post_sender.name }}
              </p>

              <p :style="{ fontSize: '0.7rem' }" class="m-0">
                {{ chat.message.reply_for.reply_post }}
              </p>
            </div>
            <!-- file starts here -->
            <div
              class="card p-1 div-left"
              :style="{
                background:
                  chat.message.file.length &&
                  chat.message.file[0].format === '.mp3'
                    ? '#F0F7FB !important'
                    : chat.message.sender.name.includes(chattingWith.first_name)
                    ? '#2E5077'
                    : '#025C4B',
              }"
            >
              <div v-if="chat.message.file">
                <div v-if="chat.message.file.length">
                  <template v-if="chat.message.file[0].format === '.mp3'">
                    <audio src="" controls></audio>
                  </template>
                </div>
                <template v-if="chat.message.file.length">
                  <div
                    v-if="chat.message.file[0].type === 'image/jpeg'"
                    class="rounded bg-dark"
                    :style="{
                      'background-image':
                        'url(' + chat.message.file[0].url + ')',
                      height: '15rem',
                      'background-repeat': 'no-repeat, repeat',
                      'background-size': '100%',
                    }"
                    @click="previewImage(chat)"
                  ></div>
                </template>
              </div>
              <!-- messge starts here  -->
              <div class="chat-post">
                <div class="d-flex justify-content-end chat-post-options">
                  <div class="dropdown mr-1">
                    <span
                      class="dropdown-toggle no-arrow"
                      id="dropdownMenuOffset"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <Icon
                        class="m-o text-white"
                        style="font-size: 1.5rem; font-weight: 600"
                        icon="charm:chevron-down"
                      ></Icon>
                    </span>

                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuOffset"
                    >
                      <a
                        class="dropdown-item"
                        href="#"
                        @click="$emit('replyMessage', chat)"
                        >Reply</a
                      >
                    </div>
                  </div>
                  <!-- <b-dropdown
                  size="lg"
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                >
                  <template #button-content>
                    <Icon
                      class="bg-danger m-o"
                      icon="akar-icons:chevron-down"
                    ></Icon>
                  </template>
                  <b-dropdown-item href="#">Action</b-dropdown-item>
                  <b-dropdown-item href="#">Another action</b-dropdown-item>
                  <b-dropdown-item href="#"
                    >Something else here...</b-dropdown-item
                  >
                </b-dropdown> -->
                </div>
                <!--  <small class="text-primary font-weight-bold"> thread title</small> </small> -->
                <div
                  class="text-white messagePost"
                  :class="
                    chat.message.sender.name.includes(chattingWith.first_name)
                      ? 'leftmessagePost'
                      : 'rightmessagePost'
                  "
                >
                  {{ chat.message.post }}
                </div>
                <div class="d-flex justify-content-end align-items-center mt-0">
                  <!-- <span class="time mr-2"> {{ chat.message.sender.name }} </span> -->
                  <div class="time text-light mt-0">
                    {{ convertDate(chat.message.datetime) }}
                  </div>
                  <div
                    v-if="
                      !chat.message.sender.name.includes(
                        chattingWith.first_name
                      )
                    "
                    class="ml-1 text-light"
                  >
                    <Icon
                      v-if="chat.read"
                      icon="bi:check-all"
                      style="font-size: 1.3rem; color: #52bdea"
                      class="mb-0"
                    ></Icon>
                    <Icon
                      v-else
                      icon="bi:check"
                      style="font-size: 1.3rem"
                      class="mb-0"
                    ></Icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { method } from 'lodash'
import { DateTime } from 'luxon'

import axios from 'axios'
export default {
  props: {
    chattingWith: {
      type: Object,
      required: false,
      default: () => {},
    },
    currentChat: {
      type: Array,
      required: true,
    },
    moreSpace: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPreview: false,

      previewdImage: {},
      previewImaged: {
        profile: '',
        img: '',
        time: '',
      },
    }
  },
  computed: {},
  methods: {
    checkTimeDifference(index) {
      const loop = this.currentChat
      const prevObject = loop[index - 1]
      if (index === 0) {
        return true
        // show time tag for the first message
      } else if (prevObject) {
        const currentTime = this.fullDate(loop[index].message.datetime)
        const prevTime = this.fullDate(prevObject.message.datetime)
        if (currentTime === prevTime) {
          return false
        } else {
          return true
        }
      }
    },
    justTime(value) {
      if (value) {
        const newDate = DateTime.fromSQL(value).toFormat('t')
        return newDate
      } else {
        return ''
      }
    },
    convertDate(value) {
      const newDate = DateTime.fromSQL(value).toFormat('t')
      const meridiem = DateTime.fromSQL(value).toFormat('a')
      return newDate + ' ' + meridiem
    },
    fullDate(value) {
      const today = DateTime.now().toFormat('LLLL d, y')

      const newDate = DateTime.fromSQL(value).toFormat('LLLL d, y')
      if (today === newDate) {
        return 'Today'
      } else {
        return newDate
      }
    },
    previewImage(e) {
      this.showPreview = true
      console.log(e)
      this.previewImaged = {
        profile: e.message.file[0].file_name,
        gender: '',
        img: e.message.file[0].url,
        time: e.message.datetime ? e.message.datetime.slice(11, 16) : '',
      }
    },
    async downloadPreviewImage() {
      console.log(this.previewImaged.profile)
      try {
        const response = await this.$axios.get(this.previewImaged.img, {
          responseType: 'blob',
        })
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${this.previewImaged.profile.file[0].file_name}`
        link.click()
        URL.revokeObjectURL(link.href)
      } catch (error) {
        console.error(error)
      }
    },
    showSenderArrow(e) {
      // the name isnt the same with who your chatting with, it doesnt have a file and it isnt a reply to a message
      if (
        !e.message.sender.name.includes(this.chattingWith.first_name) &&
        e.message.file.length === 0 &&
        !e.message.reply_for
      ) {
        return true
      }
    },
    showReceiverArrow(e) {
      if (
        e.message.sender.name.includes(this.chattingWith.first_name) &&
        e.message.file.length === 0 &&
        !e.message.reply_for
      ) {
        return true
      }
    },
  },
}
</script>

<style scoped>
.morePadding {
  padding: 0 4rem 0 4rem !important;
}
.chat-bubble {
  position: relative;
}
.sender-reply-arrow {
  position: absolute;
  right: -0.7rem;
  width: 0;
  height: 0.1rem;
  border-style: solid;
  border-width: 15px 15px 0 0;
  border-color: #025c4b transparent transparent transparent;
}
.receiver-reply-arrow {
  position: absolute;
  left: -0.7rem;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 0;
  border-color: transparent #2e5077 transparent transparent;
}
.leftmessagePost {
  line-height: 0.3;
  margin-top: 0.5rem;
  margin-right: 3.5rem;
}
.rightmessagePost {
  line-height: 0.1;
  margin-top: 0.5rem;
  margin-right: 5rem;
}
/* .messages-container {
  height: 75vh !important;

  overflow: scroll;
} */
.currentDate {
  font-weight: 500;
  color: #6d7c85;
  background-color: #182229;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
.no-arrow::after {
  display: none;
}
.chat-post {
  position: relative;
}
.chat-post-options {
  position: absolute;
  top: -0.3rem;
  right: 0;
}
.chat-post .chat-post-options {
  visibility: hidden;
}
.chat-post:hover .chat-post-options {
  visibility: visible;
}

.avatar-img {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 1000px;
}
.reply-box-container {
  display: relative !important;
  bottom: 2rem;
}
.reply-box {
  border-left: 5px solid #1675b6;
}
.time {
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.01em;
  color: #8f9aa3;
}
.modal-backdropp {
  position: absolute;
  top: 6rem;
  bottom: 0;
  left: 3rem;
  right: 0;
  background-color: #111c22;
  z-index: 2;
  height: 80vh;
}
</style>
