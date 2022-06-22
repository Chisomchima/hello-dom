<template>
  <!-- <div class="">
    <studentInboxFileAttachment
      v-if="showImageEditor"
      :accept="fileAttachmentAccept"
      @file="handleFileAttachment"
    />
    <div class="table-container">
      <div class="messenger-wrapper">
        <div class="left-side">
          <div
            class="
              chat-header
              d-flex
              justify-content-between
              align-items-center
              px-3
            "
          >
            <div
              class="filter-wrapper flex-grow-1 mr-2"
              style="background-color: white !important"
            >
              <div
                v-if="!showStudentConversations && !conversationSpinner"
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  text-dark
                  mb-2
                  py-2
                  pl-3
                "
                @click="showConversations"
              >
                <div>
                  <span
                    class="roundIconContainer text-dark"
                    style="cursor: pointer"
                    @click="showConversations"
                  >
                  </span>
                  <span class="mt-2" style="cursor: pointer">
                    Start a new conversation</span
                  >
                </div>

                <div
                  v-if="!conversationSpinner"
                  class="roundIconContainer"
                  @click="showConversations"
                >
                  <Icon
                    class="icon"
                    icon="mdi:chat-plus"
                    style="font-size: 30px"
                  ></Icon>
                </div>
              </div>
              <div v-if="showSearch" class="d-flex justify-content-between">
                <div class="search-input w-100 student-filter-input">
                  <Icon
                    class="icon"
                    icon="carbon:search"
                    style="color: #b8bec2"
                  ></Icon>

                  <input
                    v-model="searchConversation"
                    type="text"
                    class="form-control rounded-pill w-100"
                    placeholder="Search chats or contacts"
                  />
                </div>
                <div
                  v-if="!conversationSpinner"
                  class="roundIconContainer"
                  @click="showConversations"
                >
                  <Icon
                    class="icon"
                    icon="mdi:chat-minus"
                    style="font-size: 30px"
                  ></Icon>
                </div>
              </div>
            </div>
          </div>

          <div class="override">
            <div
              v-if="conversationSpinner"
              class="text-primary d-flex px-2 my-2"
            >
              <b-spinner variant="primary" label="Spinning"></b-spinner>
              <span class="ml-2"> Getting Contacts... </span>
            </div>
            <div
              v-if="!conversationSpinner && !showStudentConversations"
              class="px-2"
            >
              <studentInboxChatSideMenu
                :show-active-conversations="true"
                :conversations-to-show="activeConversations"
                @selectConversation="selectConversation"
              />
            </div>
            <div v-if="showStudentConversations" class="chats-list">
              <div
                v-if="
                  searchingConversations && filteredConversations.length === 0
                "
                class="w-100"
              >
                <span class="text-primary ml-2"> searching... </span>
                <p class="w-100">Check your spelling</p>
              </div>
              <studentInboxChatSideMenu
                :conversations-to-show="filteredConversations"
                @selectConversation="selectConversation"
              />
            </div>
          </div>
        </div>
        <div class="right-side ova">
          <div
            v-if="singleConversation.gender"
            class="top-bar"
            :style="{
              'background-color': singleConversation.gender
                ? 'white !important'
                : '#F0F7FB !important',
            }"
          >
            <div class="d-flex align-items-center bg-white">
              <div class="mr-3">
                <img
                  class="avatar-img"
                  :src="
                    singleConversation.image
                      ? singleConversation.image
                      : require(`~/assets/img/${
                          singleConversation.gender === 'male'
                            ? 'male'
                            : 'female'
                        }-young.jpeg`)
                  "
                />
              </div>
              <div class="chat-name">
                {{
                  singleConversation.staff_name
                    ? singleConversation.staff_name
                    : singleConversation.student_name
                }}
              </div>
            </div>
          </div>
          <studentInboxCamera
            v-if="showInboxCamera"
            :demo="demo"
            @myevent="somefunction"
            @closeCamera="
              showInboxCamera = false
              showAttachmentOptions = false
            "
          />
          <studentInboxDocAttachment
            v-if="showDocumentAttachment"
            :file="fileAttachment"
            @send="submitDocumentAttachment"
            @cancel="
              showDocumentAttachment = false
              showAttachmentOptions = false
            "
          />
          <studentInboxPreviewImage
            v-if="showImagePreview"
            :image="selectedImage"
            @send="submitDocumentAttachment"
            @close="
              showImagePreview = false
              showAttachmentOptions = false
            "
          />

          <div id="chatView" class="chat-view-wrapper">
            <div
              v-if="!showMessages"
              class="
                d-flex
                flex-column
                align-items-center
                justify-content-center
                text-center
              "
            >
              <div class="mb-4">
                <img class="img-fluid" src="~/assets/img/empty-chats.svg" />
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
                <div v-if="!showSingleConversationSpinner">
                  It’s Nice to chat with someone. 😊
                </div>
                <div v-else class="text-primary">
                  <div class="text-primary">Loading Conversation</div>
                  <div
                    class="m-2 ml-5 spinner-border text-primary m-0"
                    role="status"
                  >
                    <span class="sr-only mt-2"></span>
                  </div>
                </div>
              </div>

              <div
                v-if="!showSingleConversationSpinner"
                class="font-family_brown fs-12 line-height-150p text-light"
              >
                Search for someone from the left menu<br />and start your
                conversation
              </div>
            </div>
            <div v-else-if="showMessages">
              <studentInboxChatBox
                more-space
                :chatting-with="singleConversation"
                :current-chat="currentChat"
                @replyMessage="handleReplyMessage"
                @previewImage="handlePreviewImage"
                @hide-attachmentOptions="showAttachmentOptions = false"
              />
            </div>
          </div>
          <div
            class="px-2"
            :style="{ backgroundColor: '#F0F0F0', maxHeight: '10rem' }"
          >
            <VEmojiPicker
              v-show="showDialog"
              :style="{ width: '100%', height: 'auto' }"
              label-search="Search"
              lang="pt-BR"
              @select="onSelectEmoji"
            />
          </div>
          <div
            v-if="showMessages"
            :style="{
              postion: 'relative',
              backgroundColor: '#F0F0F0',
            }"
          >
            <div
              v-if="reply.id"
              class="ml-5 p-1 pl-59 reply-box-container"
              :style="{
                position: '',
                bottom: '5rem',
                right: '35%',
              }"
            >
              <div class="row">
                <div
                  class="col-10 rounded reply-box w-100"
                  :style="{ backgroundColor: '#F0F7FC' }"
                >
                  <small class="text-primary font-weight-bold m-0 p-0">
                    {{ reply.message.sender.name }}
                  </small>

                  <div class="m-0 p-0 text-truncater">
                    {{ reply.message.post }}
                  </div>
                </div>
                <div
                  class="col-2 d-flex align-items-center text-danger"
                  :style="{
                    cursor: 'pointer',
                    fontSize: '3rem',
                  }"
                  @click="reply = {}"
                >
                  <Icon
                    icon="bi:x"
                    data-rotate="180deg"
                    :style="{ fontSize: '3rem' }"
                  />
                </div>
              </div>
            </div>
            <div class="row m-0" :style="{ backgroundColor: '#F0F0F0' }">
              <div v-if="messageFiles.length" class="pl-5 mt-2">
                <div
                  v-for="(file, fileIndex) in messageFiles"
                  :key="fileIndex"
                  class="btn btn-light text-light bg-white p-0 mr-2"
                >
                  <span class="iconify" data-icon="feather:file"></span>
                  <span class="" :style="{ fontSize: '0.7rem' }">{{
                    file.file_name
                  }}</span>
                  <span class="" @click="deleteMessageFile(file, fileIndex)">
                    <span
                      class="iconify fs-16 pointer text-danger"
                      data-icon="ci:off-outline-close"
                    ></span>
                  </span>
                </div>
              </div>
              <div
                v-if="messageFileSpinner"
                class="m-2 ml-5 spinner-border text-primary m-0"
                role="status"
              >
                <span class="sr-only mt-2"></span>
              </div>
            </div>

            <div
              class="chat-message-input-wrapper"
              :style="{ backgroundColor: '#F0F0F0' }"
            >
              <div v-show="showDialog" class="mr-2 row">
                <button
                  class="btn mr-2 pl-1 text-danger"
                  @click="showDialog = false"
                >
                  <Icon icon="bi:x" style="font-size: 2rem" class="mr-1" />
                </button>
              </div>
              <div class="mr-2 row attach-container">
                <div
                  v-if="showAttachmentOptions"
                  class="d-flex flex-column attach"
                >
                  <div
                    v-for="(option, optionIndex) in attachmentOptions"
                    :key="optionIndex"
                  >
                    <VTooltip
                      placement="right"
                      theme="info-custom"
                      :data-popper-shown="true"
                      :triggers="['hover']"
                      :skidding="-10"
                      :arrow-padding="8"
                    >
                      <button
                        class="btn text-white pl-1 mt-2"
                        :class="option.backgroundColor"
                        @click="attachFile(option.action)"
                      >
                        <Icon :icon="option.icon" class="mr-1" />
                      </button>
                      <template #popper>
                        <div>{{ option.tooltip }}</div>
                      </template>
                    </VTooltip>
                  </div>
                </div>
                <button class="btn pl-1" @click="showattachFile">
                  <Icon icon="zmdi:attachment-alt" class="mr-1" />
                </button>
              </div>
              <div class="mr-2">
                <button class="btn" @click="toogleDialogEmoji">😊</button>
              </div>

              <div class="chat-message-input ml-2">
                <input
                  v-model="input"
                  class="form-control"
                  :disabled="!showMessages"
                  type="text"
                  placeholder="Start a message"
                  @keyup.enter="sendMessage"
                />
                <button class="btn" @click="sendMessage">
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
              <div v-if="showAudio" class="audio-container">
                <audio ref="player"></audio>

                <av-media
                  type="frequ"
                  :media="media"
                  line-color="#1170B7"
                  frequ-direction="mo"
                  :frequ-lnum="60"
                />
              </div>
              <div v-if="showaudioComponent">
                <audio :src="audiofile" controls></audio>
              </div>
              <div v-if="showaudioComponent" class="text-danger">
                <button class="btn text-danger bg-white" @click="closeAudio">
                  <Icon icon="akar-icons:circle-x" />
                </button>
              </div>
              <div v-if="showaudioComponent">
                <button class="btn" @click="sendaudioInbox">
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
              <div v-if="!showAudio" class="ml-2">
                <button class="btn" @click="startAudio">
                  <span
                    class="iconify icon"
                    data-inline="false"
                    data-icon="ic:baseline-keyboard-voice"
                  ></span>
                </button>
              </div>
              <div v-if="showAudio">
                <button class="btn pl-1 text-danger ml-1" @click="stopAudio">
                  <Icon
                    icon="bi:stop-circle"
                    class="mr-1"
                    style="font-size: 2rem"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <input
      ref="fileInput2"
      class="invisible"
      type="file"
      name="imagesArray"
      @change="onChange2"
    />
  </div> -->
  <div>
    <coming-soon />
  </div>
</template>

<script>
import axios from 'axios'

import { DateTime } from 'luxon'
import MultiSelect from 'primevue/multiselect'
import { VEmojiPicker } from 'v-emoji-picker'
import { io } from 'socket.io-client'
import audio from '~/mixins/audio.js'
import inboxMixin from '~/mixins/inbox.js'

export default {
  components: {
    MultiSelect,
    VEmojiPicker,
  },
  mixins: [audio, inboxMixin],
  async beforeRouteLeave(to, from, next) {
    this.newConnection.offAny()
    await this.newConnection.removeAllListeners(this.listener)
    next()
  },
  data() {
    return {
      showInboxCamera: false,

      fileAttachment: {},

      showDocumentAttachment: false,

      allStudents: [],
      demo: false,

      fileAttachmentAccept: '',
      showImagePreview: false,
      selectedImage: {
        name: 'sss',
        img: 'https://i.pinimg.com/750x/0a/3b/75/0a3b75c2fb9a7648504cd751d18a3eab.jpg',
      },
      showImageEditor: false,
      attachmentOptions: [
        {
          action: 'takeImage',
          icon: 'bi:camera-fill',
          backgroundColor: 'bg-danger',
          tooltip: 'camera',
        },
        {
          action: 'uploadDocument',
          icon: 'ant-design:file-text-filled',
          backgroundColor: 'bg-primary',
          tooltip: 'Document',
        },
        {
          action: 'uploadImage',
          icon: 'bi:image',
          backgroundColor: 'bg-info',
          tooltip: 'Photos',
        },
      ],
      showAttachmentOptions: false,
      showSearch: '',
      newConnection: '',
      conversationWith: {},
      chatId: '',
      showSingleConversationSpinner: false,
      searchingConversations: false,
      currentChat: [],
      showMessages: false,
      conversationSpinner: false,
      conversations: [],
      conversationsToShow: [],
      items: [],
      allConversations: [],
      searchConversation: '',
      input: '',
      showStudentConversations: false,
      reply: {},
      singleConversation: {},

      showAudio: false,
      audiofile: 'ss',
      chats: [],
      mtype: null,
      showaudioComponent: false,
      showDialog: false,
      broadcastSpinner: false,
      chatName: '',
      messageFileSpinner: false,
      search: '',
      previewImaged: {
        profile: '',
        img: '',
      },
      broadcastMessage: {
        message: '',
        topic: '',
        files: [],
        students_class_ids: [],
      },

      class_student_id: '',
      chatpic: 'male',
      searchChat: '',
      broadcastStudents: [],
      conversationThread: [],
      makeSearch: true,
      staffChats: [],
      staffChats1: [],
      messageFiles: [],
      myText: '',
      pack: '',
      chatDetails: {
        student_json: {
          admission_name: '--',
        },
      },
    }
  },
  async fetch() {
    try {
      this.conversationSpinner = true
      const {
        data: { data },
      } = await this.$axios.get(
        `/chats/v2/staff/school/${this.loggedInStaff.school_details.id}/contacts/`
      )
      this.allConversations = data
      this.allStudents = data.students.concat(data.staffs)
      // arrage the staff and student data in a 'zebra' pattern. Dont ask, mock-up looks like that
      if (data.staffs.length > data.students.length) {
        for (let i = 0; i < data.staffs.length; i++) {
          this.conversations.push(data.staffs[i])
          if (data.students[i]) {
            this.conversations.push(data.students[i])
          }
        }
      } else {
        for (let i = 0; i < data.students.length; i++) {
          this.conversations.push(data.students[i])
          if (data.staffs[i]) {
            this.conversations.push(data.staffs[i])
          }
        }
      }

      this.conversationSpinner = false
    } catch (error) {
      console.error(error)
    }
    // if youre routing from /classmates
    if (this.$route.query.entity) {
      const entityId = this.$route.query.entity
      console.log('ss', this.allStudents)

      const entityObject = this.allStudents.find((e) =>
        e.entity_id ? e.entity_id === entityId : e.id === entityId
      )
      console.log('entity obj', entityObject)
      if (entityObject) {
        this.selectConversation(entityObject)
      }
    }
  },
  computed: {
    loggedInStaff() {
      return this.$store.getters['staff/getSchoolByCode'](this.$route.params.id)
    },

    entity_id() {
      return this.loggedInStaff.staff_details.id
    },
    listener() {
      return `slate_chat_notify_entity_${this.entity_id}`
    },
    // studentClass() {
    //   return this.$store.getters['staff/getSchoolByCode'](this.$route.params.id)
    // },
    // student() {
    //   return this.$store.state.student
    // },
    // studentAdmissionId() {
    //   return this.$store.state.student.studentProfile.admission_id
    // },
    activeConversations() {
      return this.conversations.filter((chat) => {
        return chat.last_message
      })
    },
    filteredConversations() {
      if (this.searchConversation) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.searchingConversations = true
        // search with the search input
        return this.conversationsToShow.filter((item) => {
          return item.student_name
            ? item.student_name.toLowerCase().includes(this.searchConversation)
            : item.staff_name
            ? item.staff_name.toLowerCase().includes(this.searchConversation)
            : {}
        })
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.searchingConversations = false
        return this.conversationsToShow
      }
    },
  },

  created() {
    this.newConnection = io('ws://161.35.213.111:8004/slate')
  },
  mounted() {
    this.newConnection.on(this.listener, (e) => {
      this.handleEvent(e)
    })
    this.changeHeight() // change the height of the emoji container
    this.newConnection.on('connect', () => {
      console.log('success connected')
      console.log(this.newConnection.connected) // true
    })

    this.newConnection.on('connect_error', () => {
      console.log('Websocket Disconnected')
      this.newConnection.io.opts.transports = ['polling', 'websocket']
    })
    this.newConnection.on('disconnect', (reason) => {
      console.log('disconnected', reason)
    })
  },
  methods: {
    async submitDocumentAttachment(file) {
      const formData = new FormData()
      formData.append('name', file.name)
      // formData.append('file', file)
      formData.append('file', '.pdf')
      formData.append('type', file.type)

      try {
        const imgResponse = await this.$axios.post(
          `/chats/v2/school/${this.loggedInStaff.school_details.id}/file/upload/`,
          formData
        )
        console.log('img', imgResponse)
      } catch (error) {
        console.log(error)
      }
    },
    handleFileAttachment(file) {
      console.log('image', file)
      if (!file.type.includes('image')) {
        this.showDocumentAttachment = true
        this.fileAttachment = file
        // this.somefunction(file.url, file.name)
      } else {
        this.selectedImage = file
        this.showImagePreview = true
      }
    },
    async somefunction(pic, text) {
      // convert the base64 url to a file and upload it
      console.log(pic, 'sds', text)
      const url = pic
      const res = await fetch(url)
      const blob = await res.blob()
      const fileName = `file_${Math.floor(Math.random() * 50)}` // random name
      const file = new File([blob], fileName, {
        type: 'image/png',
      })
      const formData = new FormData()
      formData.append('name', fileName)
      formData.append('file', file)
      formData.append('type', 'chat_inbox')
      console.log('file', file)

      try {
        const imgResponse = await this.$axios.post(
          `/chats/v2/school/${this.loggedInStaff.school_details.id}/file/upload/`,
          formData
        )
        console.log('img', imgResponse)
      } catch (error) {
        console.log(error)
      }
    },
    handleEvent(e) {
      // alert('its working')
      this.chat_get_messags(e.chat_id)
      this.getonGoingConversations()

      // console.log('from event', e)
    },
    handleReplyMessage(message) {
      this.reply = message

      console.log('reply', message)
    },
    // handleFileAttachment(image) {
    //   alert('file attachment')
    //   this.selectedImage = image
    //   // this.showImagePreview = true
    // },
    handlePreviewImage(image) {
      alert('hanle preview')
    },
    async getonGoingConversations() {
      try {
        const {
          data: { data },
        } = await this.$axios.get(
          `/chats/v2/staff/school/${this.loggedInStaff.school_details.id}/contacts/`
        )
        this.allConversations = data
        const activeStaffs = data.staffs.filter((e) => {
          return e.last_message
        })
        const activeStudents = data.students.filter((e) => {
          return e.last_message
        })
        // arrage the staff and student data in a 'zebra' pattern. Dont ask, mock-up looks like that
        this.conversations = []
        if (activeStaffs.length > activeStudents.length) {
          for (let i = 0; i < activeStaffs.length; i++) {
            this.conversations.push(activeStaffs[i])
            if (activeStudents[i]) {
              this.conversations.push(activeStudents[i])
            }
          }
        } else {
          for (let i = 0; i < activeStudents.length; i++) {
            this.conversations.push(activeStudents[i])
            if (activeStaffs[i]) {
              this.conversations.push(activeStaffs[i])
            }
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    pushCurrentMessage() {
      const currentTime = DateTime.now().toSQL()

      this.currentChat.push({
        id: '3e54153a-cab2-4f42-a4de-66ad55c9e3cb',
        create_date: currentTime,
        log_type: 'ok',
        message: {
          file: [],
          post: this.input,
          topic: this.input,
          active: true,

          datetime: currentTime,
          sender: {
            name: 'Blessing Kosarachi Nworie ',
            gender: 'female',
            entity_id: this.entity_id,
          },

          reply_for: this.reply.reply_post_id
            ? {
                reply_post: 'okss',
                reply_post_id: '3e54153a-cab2-4f42-a4de-66ad55c9e3cb',
                reply_post_files: [],
                reply_post_sender: {
                  name: 'sds Kosarachi Nworie ',
                  gender: 'female',
                  entity_id: 'd1afc7d8-4496-430b-8d54-274cd32ac2d6',
                  image_url:
                    'https://slate-assets.s3.amazonaws.com/media/560aeb58-f3af-464a-8dab-9192ce4228ca/admissions/d1afc7d8-4496-430b-8d54-274cd32ac2d6_2022-03-03.jpg',
                  entity_type: 'staff',
                },
              }
            : null,
        },
        read: false,
        notify: false,
        active: true,
        chat: this.chatId,
        school: this.loggedInStaff.school_details.id,
      })
      this.scrollToBottomOfChat()
      this.input = ''
      this.reply = {}
      this.messageFiles = []
    },
    async sendMessage() {
      const input = this.input
      const reply = this.reply
      const messageFiles = this.messageFiles
      this.pushCurrentMessage()

      try {
        await this.$axios.post(
          `/chats/v2/school/${this.loggedInStaff.school_details.id}/staff/${this.entity_id}/chat/${this.chatId}/post/`,
          {
            message: input,
            reply_post_id: reply.id ? reply.id : '',
            files: messageFiles,
          }
        )

        this.scrollToBottomOfChat()

        this.chat_get_messags(this.chatId)

        this.getonGoingConversations()
      } catch (error) {
        console.log(error)
      }
    },
    async selectConversation(e) {
      console.log('convo', e)
      // clear input fields
      this.input = ''
      this.reply = {}
      this.messageFiles = []
      this.showAttachmentOptions = false
      this.showImagePreview = false
      this.showDocumentAttachment = false
      this.showInboxCamera = false

      this.conversationWith = e
      this.singleConversation = e
      this.showSearch = false
      this.showStudentConversations = false
      if (e.chat_id === null) {
        this.showSingleConversationSpinner = true
        try {
          const {
            data: { data },
          } = await this.$axios.post(
            `/chats/v2/school/${this.loggedInStaff.school_details.id}/staff/${
              this.entity_id
            }/conversations/start/${e.id ? e.id : e.entity_id}/`
          )
          this.chatId = data.chat_id

          this.chat_get_messags(data.chat_id)
        } catch (error) {
          console.error(error)
        }
      } else {
        this.chat_get_messags(e.chat_id)
        this.chatId = e.chat_id
      }
    },
    async chat_get_messags(e) {
      if (e) {
        this.showSingleConversationSpinner = true

        try {
          const {
            data: { data },
          } = await this.$axios.get(
            `/chats/v2/chat/${e}/messages/?page=1&page_size=999`
          )
          this.currentChat = data.results.reverse()
          this.showSingleConversationSpinner = false
          this.showMessages = true

          this.scrollToBottomOfChat()
        } catch (error) {
          consol.error(error)
        }
      }
    },
    showConversations() {
      this.showStudentConversations = !this.showStudentConversations
      this.showSearch = !this.showSearch

      let time = 0

      const interval = setInterval(() => {
        if (time < this.conversations.length) {
          this.conversationsToShow.push(this.conversations[time])
          time++
        } else {
          clearInterval(interval)
        }
      }, 200)
    },

    toogleDialogEmoji() {
      this.showDialog = !this.showDialog
      this.scrollToBottomOfChat()
    },

    async downloadPreviewImage() {
      console.log(this.previewImaged.profile)
      try {
        const response = await axios.get(
          this.previewImaged.profile.file[0].url,
          {
            responseType: 'blob',
          }
        )
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

    onSelectEmoji(emoji) {
      this.input += emoji.data
      // Optional
      // this.toogleDialogEmoji();
    },
    changeHeight() {
      const div = document.querySelector('.container-emoji')
      const emoji = document.querySelector('.grid-emojis')
      if (div && emoji) {
        div.style.height = '100px'
        emoji.style.display = 'inline'
      }
    },
    previewImage(e) {
      this.previewImaged.img = e.file[0].url
      this.previewImaged.profile = e
    },
    callback(data) {
      console.debug(data)
    },

    async deleteMessageFile(e, i) {
      try {
        this.messageFileSpinner = true
        await this.$axios.delete(
          `/communications/v3/school/${this.schoolId}/file/${e.file_id}/delete/`
        )
        this.messageFiles.splice(i, 1)
        this.messageFileSpinner = false
      } catch (error) {
        console.error(error)
        this.messageFileSpinner = false
      }
    },
    async deleteBroadcastFile(e, i) {
      try {
        this.broadcastSpinner = true
        await this.$axios.delete(
          `/communications/v3/school/${this.schoolId}/file/${e.file_id}/delete/`
        )
        this.broadcastMessage.files.splice(i, 1)
        this.broadcastSpinner = false
      } catch (error) {
        console.error(error)
      }
    },

    onClickFileUpload() {
      if (this.$refs.fileInput) {
        const uploadField = this.$refs.fileInput
        uploadField.click()
      }
    },
    async onChange(event) {
      const file = event.target.files[0]

      const broadcastForm = new FormData()
      broadcastForm.append('name', file.name)
      broadcastForm.append('file', file)
      broadcastForm.append('type', file.type)
      try {
        this.broadcastSpinner = true
        const {
          data: { data },
        } = await this.$axios.post(
          `/communications/v3/school/${this.schoolId}/file/upload/`,
          broadcastForm
        )
        this.broadcastSpinner = false
        this.broadcastMessage.files.push(data)
      } catch (error) {
        console.error(error)
        this.broadcastSpinner = false
      }
    },

    async getSingleConversation(conversation) {
      this.singleConversation = conversation

      if (conversation.student_data.family_data.family_id) {
        this.singleConversation = conversation

        const {
          data: { data },
        } = await this.$axios.get(
          `/communications/v3/class/student/${conversation.student_data.class_student_id}/teacher/chats/?page=1&page_size=1000`
        )
        this.conversationThread = data.results.reverse()
        const objDiv = document.getElementById('chatView')
        setTimeout(() => {
          objDiv.scrollTop = objDiv.scrollHeight
        }, 100)
      } else {
        this.conversationThread = 'bastard'
      }
    },
    filterChat() {
      this.staffChats = this.staffChats1.filter((word) =>
        word.student_data.admission_name.toLowerCase().includes(this.searchChat)
      )
    },

    onInput(event) {
      // event.data contains the value of the textarea
      console.log(event)
    },

    getChatDetails(e) {
      this.chatDetails = e
    },
    convertDate(value) {
      const newDate = DateTime.fromISO(value).toLocaleString({
        hour: 'numeric',
        minute: '2-digit',
      })
      return newDate
    },
  },
}
</script>

<style scoped>
.override {
  margin-top: 4rem;
}
.attach-container {
  position: relative;
}
.attach {
  position: absolute;
  bottom: 3rem;
}
.table-container {
  padding: 2rem 0rem 0rem 0rem;
}
.messenger-wrapper {
  height: 82vh;
  position: relative;
}

.chats-list {
  overflow: auto !important;
  min-width: 3rem !important;
}
.left-side {
  background-color: white;
  overflow: scroll;
  width: 26rem;
}
@media only screen and (max-width: 1200px) {
  .chats-list {
    overflow: auto !important;
    min-width: 3rem !important;
  }
  .left-side {
    background-color: white;
    width: 26rem;
    overflow: scroll;
  }
}
.chat-header {
  height: 3.8rem;
  background-color: white;
  width: 24rem;
  border-bottom: 1px solid #e6e6e6;
  position: absolute;
}
.modal-backdropp {
  position: absolute;
  top: 4rem;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #111c22;
  z-index: 2;
  height: 80vh;
}
.right-side {
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #f0f7fc;
  width: 20rem;

  /* overflow: auto; */
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

.p-multiselect >>> .p-multiselect-label {
  width: 26rem;
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
</style>
