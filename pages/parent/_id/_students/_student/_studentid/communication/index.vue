<template>
  <div>
    <div v-if="!dontrender">
      <div class="table-container">
        <!-- <pre class="fs-10">{{ studentdata2 }}</pre> -->
        <div class="messenger-wrapper custom">
          <div class="left-side">
            <div class="top-bar">
              <div class="filter-wrapper flex-grow-1 mr-2">
                <div class="search-input student-filter-input">
                  <span
                    class="iconify icon"
                    data-inline="false"
                    data-icon="carbon:search"
                    style="color: #b8bec2"
                  ></span>
                  <input
                    v-model="search"
                    type="text"
                    class="form-control rounded-pill w-100"
                    placeholder="Search chats"
                    @input="searchChat"
                  />
                </div>
              </div>

              <!-- <div>
              <button class="btn btn-search-btn">
                <span
                  class="iconify"
                  data-icon="fa-solid:user-plus"
                  data-width="20"
                  data-height="20"
                ></span>
              </button>
            </div> -->
            </div>
            <div class="chats-list custom m-0 p-2" style="overflow-x: hidden">
              <div
                v-if="$fetchState.pending"
                class="d-flex justify-content-center mt-3"
              >
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
              </div>

              <div
                v-if="
                  !$fetchState.pending && Object.keys(studentData).length === 0
                "
              >
                <p class="text-center fs-14 text-primary mt-5">
                  No conversations yet. Don't be shy, say hi!
                </p>
              </div>
              <div
                v-for="(conversation, index) in studentData"
                :key="index"
                class="chat-list-item"
                @click="openchat(conversation.id)"
              >
                <div class="mr-3">
                  <img
                    class="avatar-img img-fluid"
                    src="~/assets/img/a-bus.png"
                  />
                </div>
                <div class="w-100">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="d-flex align-items-center mr-3">
                      <div>
                        <p class="fs-14 mb-0">{{ conversation.log_type }}</p>
                        <div class="fs-12 text-truncater mr-2 textnowrap">
                          {{
                            conversation.created_by
                              ? conversation.created_by.length > 18
                                ? conversation.created_by.slice(0, 18) + '...'
                                : conversation.created_by
                              : ''
                          }}
                        </div>
                        <p class="fs-14 mb-0 lighttext textnowrap">
                          {{
                            conversation.last_message
                              ? conversation.last_message.length > 18
                                ? conversation.last_message.slice(0, 18) + '...'
                                : conversation.last_message
                              : ''
                          }}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div
                        v-if="conversation.teacher_read"
                        class="
                          newspan
                          d-flex
                          align-items-center
                          justify-content-center
                        "
                      >
                        <span class="fs-10 text-center"> 1</span>

                        <span class="sr-only">unread messages</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PagesParentPreviewImage
            v-if="
              imageViewExpanded &&
              (fileToPass.format === '.png' ||
                fileToPass.format === '.jpg' ||
                fileToPass.format === '.jpeg' ||
                fileToPass.format === '.mp4' ||
                fileToPass.format === '.mkv' ||
                fileToPass.format === '.webm' ||
                fileToPass.format === '.mov')
            "
            @closeImagePreview="closeOther"
            :imageUrl="fileToPass.url"
            :fileformat="fileToPass.format"
            :onlyView="true"
            :messageToSend="messageToPass"
          />

          <div class="right-side ova size" style="overflow: hidden">
            <div class="">
              <div class="p-2 modal-backdropp bg-white">
                <div
                  class="d-flex justify-content-between px-4 mb-2 border-bottom"
                >
                  <div class="row">
                    <div class="mr-3">
                      <img
                        class="avatar-img img-fluid"
                        src="~/assets/img/a-bus.png"
                      />
                    </div>
                    <div class="">
                      <div
                        v-for="(name, index) in messages"
                        :key="index"
                        class="small text-truncater mr-2 text-secondary"
                      >
                        <p class="fs-14 mb-0">
                          {{ name.sender ? name.sender.name : '' }}
                        </p>

                        <div class="small text-truncater mr-2 text-secondary">
                          {{ name.topic ? name.topic : '' }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-secondary mt-2">
                    <div
                      v-for="(name, index) in messages"
                      :key="index"
                      class="small text-truncater mr-2 text-secondary"
                    >
                      <div
                        class="small text-truncater mr-2 text-secondary"
                      ></div>
                    </div>
                  </div>
                </div>

                <div class="lightbluebg chat-view-wrapper custom">
                  <div class="">
                    <div
                      v-if="!messages.length"
                      class="
                        d-flex
                        flex-column
                        align-items-center
                        justify-content-center
                        text-center
                      "
                    >
                      <div class="mb-4">
                        <img
                          class="img-fluid"
                          src="~/assets/img/empty-chats.svg"
                        />
                      </div>
                      <div
                        class="
                          font-family_brown
                          font-weight-bold
                          fs-16
                          line-height-100p
                          text-dark
                          mb-3
                        "
                      >
                        It’s nice to chat with someone. 😊
                      </div>
                      <div
                        class="
                          font-family_brown
                          fs-12
                          line-height-150p
                          text-light
                        "
                      >
                        Search for someone from the left menu<br />and start
                        your conversation
                      </div>
                    </div>
                  </div>

                  <div
                    v-for="(message, messageIndex) in messages"
                    :key="messageIndex"
                    class="mb-2"
                  >
                    <div
                      v-if="message.post || message.file"
                      class="d-flex lightbluebh px-md-3 px-2"
                      :class="`d-flex justify-content-${
                        message.entity === 'family' ? 'end' : 'start'
                      }`"
                    >
                      <div class="d-flex align-items-center mr-2 text-primary">
                        <span
                          style="transform: rotate(180deg)"
                          @click="replyMessage(message)"
                        >
                          <Icon
                            icon="bi:reply-fill"
                            data-rotate="180deg"
                            style="font-size: 15px"
                          />
                        </span>
                      </div>

                      <div>
                        <div class="bg-white rounded">
                          <small
                            class="text-primary font-weight-bold fs-10 p-1"
                            >{{ message.name }}</small
                          >
                          <div v-if="message.file">
                            <div
                              v-if="message.file[0]"
                              class="reply-box bg-white"
                              @click="openViewer(message, message.file[0])"
                            >
                              <div v-if="imageViewExpanded"></div>
                              <!-- <pre>{{ message.file }}</pre> -->

                              <div class="">
                                <div
                                  v-if="
                                    message.file[0].format == '.png' ||
                                    message.file[0].format == '.jpg' ||
                                    message.file[0].format == '.jpeg'
                                  "
                                  class="p-1"
                                  style="width: 200px"
                                >
                                  <img
                                    :src="message.file[0].url"
                                    style="width: 200px; height: 100px"
                                    class="img-fluid"
                                    alt=""
                                  />
                                </div>
                                <div
                                  v-if="
                                    message.file[0].format == '.pdf' ||
                                    message.file[0].format == '.docx' ||
                                    message.file[0].format == '.ppt'
                                  "
                                  class="bg-white rounded w-100 p-1"
                                >
                                  <a
                                    :href="message.file[0].url"
                                    target="_blank"
                                  >
                                    <span
                                      class="iconify"
                                      data-icon="ant-design:file-pdf-filled"
                                      data-width="20"
                                      data-height="20"
                                    ></span>
                                  </a>
                                </div>
                                <div
                                  v-if="
                                    message.file[0].format == '.mp4' ||
                                    message.file[0].format == '.webmb'
                                  "
                                  class="lightbluebg w-100 p-1"
                                >
                                  <video
                                    :src="message.file[0].url"
                                    style="width: 200px"
                                    class="img-fluid"
                                  ></video>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-if="message.post" class="py-1">
                            <div class="reply-box rounded bg-white p-1">
                              <p :style="{ fontSize: '0.7rem' }" class="m-0">
                                {{ message.post }}
                              </p>
                            </div>
                          </div>

                          <div class="px-1 fs-10" style="color: #94969e">
                            {{ convertDate(message.datetime) }}
                          </div>
                        </div>

                        <div
                          v-if="message.entity === 'family'"
                          class="d-flex justify-content-end text-primary"
                          :style="{ fontSize: '0.65rem' }"
                        >
                          Delivered
                        </div>
                      </div>

                      <div>
                        <div v-if="filetype !== 'file'">
                          <PagesParentImageViewer
                            v-if="imageExpanded && fileToPass.format !== '.pdf'"
                            :message="message"
                            :imageUrl="imageUrl"
                            :filetype="filetype"
                            :messageToSend="messageToSend"
                            :imageExpanded="false"
                            @closeImagePreview="closeImagePreview"
                            @sendImage="sendImage"
                          />
                        </div>
                        <!-- 
                      <pre>{{ filetype }}</pre>

                      <div v-if="filetype === 'file'">{{ imageUrl }}</div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="reply.id" class="p-2 reply-box-container bg-white">
                <div class="row ml-5">
                  <div class="col-10 rounded reply-box w-100 lightbluebg">
                    <small class="text-primary font-weight-bold m-0 p-0">
                      {{ reply.name }}
                    </small>
                    <!-- <div class="time font-weight-bold m-0 p-0">
                    {{ reply.thread_title }}
                  </div> -->

                    <div class="m-0 p-0 text-truncater">{{ reply.post }}</div>
                  </div>
                  <div
                    class="
                      col-2
                      d-flex
                      align-items-center
                      text-primary
                      cursorpointer
                    "
                    @click="reply = {}"
                  >
                    <span
                      class="iconify"
                      data-icon="iconoir:cancel"
                      data-width="20"
                      data-height="20"
                    ></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="relativecontainer">
              <div
                class="top-bar rel"
                :class="{ replied: Object.keys(reply).length !== 0 }"
              >
                <div class="chat-message-input-wrapper">
                  <div class="mr-2 row">
                    <button
                      style="z-index: 20"
                      :disabled="!messages.length"
                      class="btn pl-1"
                      @click="attachFile"
                    >
                      <Icon icon="zmdi:attachment-alt" class="mr-1" />
                    </button>

                    <div v-if="attachmentclicked" class="absolutecontainer">
                      <div>
                        <div
                          class="
                            bg-white
                            roundedpill
                            py-2
                            px-3
                            my-2
                            cursorpointer
                          "
                          @click="addFile('photo')"
                        >
                          <p class="fs-14 mb-0">Add Photos</p>
                        </div>
                        <div
                          class="
                            bg-white
                            roundedpill
                            py-2
                            px-3
                            my-2
                            cursorpointer
                          "
                          @click="addFile('video')"
                        >
                          <p class="fs-14 mb-0">Add Videos</p>
                        </div>
                        <div
                          class="
                            bg-white
                            roundedpill
                            py-2
                            px-3
                            my-2
                            cursorpointer
                          "
                          @click="addFile('document')"
                        >
                          <p class="fs-14 mb-0">Add Documents</p>
                        </div>
                      </div>

                      <input
                        ref="fileInputImage"
                        class="invisible"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        @change="previewImage('image')"
                      />
                      <input
                        ref="fileInputVideo"
                        class="invisible"
                        type="file"
                        accept="video/mp4,video/x-m4v,video/*"
                        @change="previewImage('video')"
                      />
                      <input
                        ref="fileInputDocument"
                        class="invisible"
                        type="file"
                        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                        @change="previewImage('file')"
                      />
                    </div>
                  </div>
                  <div class="mr-2">
                    <button
                      :disabled="!messages.length"
                      class="btn pl-1"
                      @click="showEmoji"
                    >
                      😊
                    </button>
                  </div>

                  <div class="chat-message-input ml-2">
                    <input
                      v-model="messageToSend.post"
                      :disabled="!messages.length"
                      class="form-control"
                      type="text"
                      placeholder="Start a message"
                      @keyup.enter="postMessage"
                    />
                    <button
                      class="btn"
                      :disabled="!messages.length"
                      @click="postMessage"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24 12C24 18.6271 18.6271 24 12 24C5.37288 24 1.90735e-06 18.6271 1.90735e-06 12C1.90735e-06 5.37288 5.37288 0 12 0C18.6271 0 24 5.37288 24 12ZM11.7317 6.72923C11.6457 6.81461 11.5772 6.91611 11.5304 7.02793C11.4835 7.13975 11.4592 7.25971 11.4587 7.38094C11.4582 7.50218 11.4816 7.62233 11.5276 7.73452C11.5735 7.84671 11.6411 7.94875 11.7265 8.03481L14.745 11.0769H7.03846C6.79365 11.0769 6.55886 11.1742 6.38575 11.3473C6.21264 11.5204 6.11539 11.7552 6.11539 12C6.11539 12.2448 6.21264 12.4796 6.38575 12.6527C6.55886 12.8258 6.79365 12.9231 7.03846 12.9231H14.745L11.7265 15.9652C11.6412 16.0513 11.5736 16.1535 11.5277 16.2657C11.4817 16.378 11.4584 16.4982 11.4589 16.6195C11.4594 16.7408 11.4839 16.8607 11.5308 16.9726C11.5777 17.0844 11.6462 17.186 11.7323 17.2713C11.8184 17.3567 11.9206 17.4243 12.0328 17.4702C12.1451 17.5162 12.2653 17.5395 12.3866 17.539C12.5079 17.5384 12.6279 17.514 12.7397 17.4671C12.8516 17.4202 12.9531 17.3517 13.0385 17.2656L17.6187 12.6502C17.7902 12.4773 17.8865 12.2436 17.8865 12C17.8865 11.7564 17.7902 11.5227 17.6187 11.3498L13.0385 6.73442C12.9531 6.64817 12.8515 6.57961 12.7396 6.53266C12.6276 6.48571 12.5075 6.46129 12.3862 6.46081C12.2648 6.46033 12.1445 6.48379 12.0322 6.52985C11.9199 6.5759 11.8178 6.64366 11.7317 6.72923Z"
                          fill="#1070B7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="showEmojiWrapper"
              class="emojicontainer"
              :class="{ replied: Object.keys(reply).length !== 0 }"
              :style="{ backgroundColor: '#F0F0F0' }"
            >
              <VEmojiPicker
                :style="{ width: '100%', height: 'auto' }"
                label-search="Search"
                lang="pt-BR"
                @select="onSelectEmoji"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <ComingSoon />
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { VEmojiPicker } from 'v-emoji-picker'
export default {
  components: {
    VEmojiPicker,
  },
  layout: 'parentdashboard',

  data() {
    return {
      attachmentclicked: false,
      studentData: {},
      studentData2: {},
      studentDataSearch: {},
      messages: {},
      dontrender: true,
      messageToSend: {
        post: '',
        file: [],
      },
      reply: {},
      recieverid: '',
      imageUrl: '',
      filetype: '',
      fileContent: {},
      imageExpanded: false,
      targetFiles: [],
      imageViewExpanded: false,
      showEmojiWrapper: false,
      messageToPass: {},
      fileToPass: {
        file_id: '',
        format: '',
        relative_url: '',
        url: '',
      },
      search: '',
    }
  },
  async fetch() {
    try {
      //

      //   https://stagingapi.slate.ng/communications/v3/class/student/<class_student_id>/parent/chats/

      const studentdata2 = await this.$axios.get(
        `communications/v3/class/student/${this.$route.params.studentid}/parent/chats/`
      )

      this.studentdata2 = studentdata2.data.data.results

      console.log(studentdata2.data.data.results)
      const studentdata = await this.$axios.get(
        `communications/v2/family/class/${this.$route.params.student}/admission/${this.$route.params.students}`
      )
      this.studentData = studentdata.data.data.data
      this.studentDataSearch = studentdata.data.data.data
    } catch (error) {
      console.log(error)
    }
  },

  computed: {
    getSchoolId() {
      const school = this.$store.getters['parent/getParentSchool'](
        this.$route.params.id
      )
      return school.id
    },
  },

  methods: {
    replyMessage(message) {
      this.reply = message
      console.log(message)
    },
    searchChat() {
      this.studentData = this.studentDataSearch.filter((word) =>
        word.created_by.toLowerCase().includes(this.search)
      )
    },
    closeImagePreview() {
      this.imageExpanded = false
    },
    async openchat(id) {
      const messages = await this.$axios.get(
        `communications/v2/family/comm/${id}/detail`
      )

      this.recieverid = id

      this.messages = messages.data.data.messages
    },

    openViewer(message, file) {
      console.log('OPENED')
      this.messageToPass = message

      this.fileToPass = {
        file_id: file.file_id,
        format: file.format,
        relative_url: file.relative_url,
        url: file.url,
      }

      this.imageViewExpanded = true
    },

    onSelectEmoji(emoji) {
      this.messageToSend.post += emoji.data
    },

    async postMessage() {
      try {
        await this.$axios.post(
          `communications/v2/family/comm/${this.recieverid}/detail/`,
          this.messageToSend
        )

        this.messageToSend.post = ''
        this.messageToSend.file = []

        this.openchat(this.recieverid)
        this.reply = {}
      } catch (e) {
        console.log(e)
      }
    },
    attachFile() {
      this.attachmentclicked = !this.attachmentclicked
    },
    addFile(type) {
      if (type === 'photo') {
        if (this.$refs.fileInputImage) {
          const uploadField = this.$refs.fileInputImage
          uploadField.click()
        }
      }
      if (type === 'video') {
        if (this.$refs.fileInputVideo) {
          const uploadField = this.$refs.fileInputVideo
          uploadField.click()
        }
      }
      if (type === 'document') {
        if (this.$refs.fileInputDocument) {
          const uploadField = this.$refs.fileInputDocument
          uploadField.click()
        }
      }
    },

    async sendImage() {
      console.log(this.targetFiles)

      try {
        const file = this.targetFiles
        const broadcastForm = new FormData()
        broadcastForm.append('name', file.name)
        broadcastForm.append('file', file)
        broadcastForm.append('type', file.type)
        const {
          data: { data },
        } = await this.$axios.post(
          `/communications/school/${this.getSchoolId}/resource/`,
          broadcastForm
        )

        this.messageToSend.file.push(data)

        this.postMessage()
        this.imageExpanded = false
      } catch (error) {
        console.error(error)
      }
    },
    closeOther() {
      this.imageViewExpanded = false
    },
    convertDate(value) {
      const newDate = DateTime.fromSQL(value).toFormat('t')
      const meridiem = DateTime.fromSQL(value).toFormat('a')
      return newDate + ' ' + meridiem
    },

    showEmoji() {
      this.showEmojiWrapper = !this.showEmojiWrapper
    },
    previewImage(type) {
      console.log('VIDEO CONTENT', event.target.files[0])
      try {
        this.imageExpanded = true
        this.imageUrl = URL.createObjectURL(event.target.files[0])
        this.filetype = type
        // console.log(event.target.files[0])
        console.log('OTHER CONTENT', event.target.files[0])
        this.targetFiles = event.target.files[0]

        this.fileContent = event.target.files[0]
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>
.personsname {
  font-family: Museo Sans;
  font-size: 12px;
  font-weight: 430;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
}

.chats-list.custom {
  width: 19rem;
}

.lighttext {
  color: #9295a6;
}

.lightbluebg {
  background: #eff6fb;
}
.roundedpill {
  border-radius: 20px;
  white-space: nowrap;
}
.relativecontainer {
  position: relative;
}
.absolutecontainer {
  position: absolute;
  bottom: -20px;

  width: 20%;
}

.top-bar.rel {
  position: absolute;
  bottom: -60px;
}
.top-bar.rel.replied {
  position: absolute;
  bottom: 10px;
}

.reply-box-container {
  position: relative;
  bottom: 70px;
  /* margin-bottom: 4.7rem !important; */
}

.right-side.ova.size {
  width: 68%;
  overflow: hidden;
  z-index: 3;
}

/* .left-side {
  height: 30vh !important;
} */

.emojicontainer {
  width: 100%;
  position: relative;
  /* top: -360px; */
  height: 40%;
  z-index: 1;
  bottom: 300px;
  overflow: scroll;
}
.emojicontainer.replied {
  bottom: 370px;
}

.newspan {
  font-family: Museo Sans;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: 0em;

  background: #1070b7;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

.messenger-wrapper.height {
  height: 100vh;
  overflow-y: hidden;
}

.actualimage {
  width: 50%;
}
/* 
.totalheight {
  height: 70vh;
} */

.graytext {
  color: #b8bec2;
}

.relativecontainer {
  position: relative;
}

@media (max-width: 768px) {
  .chats-list.custom {
    width: auto;
  }

  .right-side.ova.size {
    width: 100%;
    overflow: hidden;
    z-index: 3;
  }

  .messenger-wrapper.custom .left-side {
    width: 5rem;
  }

  .messenger-wrapper.custom .chat-view-wrapper {
    padding: 0;
  }

  .messenger-wrapper.custom .top-bar {
    padding: 0;
  }
}
</style>