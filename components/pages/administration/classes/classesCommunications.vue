<template>
  <div>
    <div class="table-container">
      <div class="messenger-wrapper">
        <div class="left-side">
          <div class="top-bar">
            <div v-show="makeSearch">
              <button
                class="btn broadcast-btn"
                @click="$bvModal.show('broadcastModal')"
              >
                <span
                  class="iconify fs-20 mr-2"
                  data-inline="false"
                  data-icon="fluent:megaphone-24-filled"
                ></span>
                <span>Broadcast</span>
              </button>
            </div>
            <div v-show="!makeSearch" class="filter-wrapper flex-grow-1 mr-2">
              <div class="search-input student-filter-input">
                <span
                  class="iconify icon"
                  data-inline="false"
                  data-icon="carbon:search"
                  style="color: #b8bec2"
                ></span>
                <input
                  v-model="searchChat"
                  type="text"
                  class="form-control rounded-pill w-100"
                  placeholder="Search chats or contacts"
                  @input="filterChat"
                />
              </div>
            </div>
            <div v-show="makeSearch">
              <button class="btn btn-search-btn" @click="makeSearch = false">
                <span
                  class="iconify icon"
                  data-inline="false"
                  data-icon="heroicons-solid:search"
                ></span>
              </button>
            </div>
            <div v-show="!makeSearch">
              <button class="btn btn-search-btn" @click="makeSearch = true">
                <span
                  class="iconify icon text-danger"
                  data-inline="false"
                  data-icon="heroicons-solid:x"
                ></span>
              </button>
            </div>
          </div>
          <div class="chats-list" :style="{ width: '19rem' }">
            <div
              v-for="(conversation, index) in staffChats"
              :key="index"
              class="chat-list-item"
              :class="{ active: conversation.isActive }"
              @click="
                staffChats.map((e) => (e.isActive = false))
                conversation.isActive = true
                chatName = conversation.student_data.admission_name
                chatpic = conversation.student_data.gender
                class_student_id = conversation.student_data.class_student_id
                getSingleConversation(conversation)
              "
            >
              <div class="mr-3">
                <img
                  class="avatar-img"
                  :src="
                    conversation.student_data.admission_image
                      ? conversation.student_data.admission_image
                      : require(`~/assets/img/${
                          conversation.student_data.gender === 'male'
                            ? 'male'
                            : 'female'
                        }-young.jpeg`)
                  "
                />
              </div>
              <div class="w-100">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center mr-3">
                    <div class="chat-name text-truncater mr-2">
                      {{ conversation.student_data.admission_name }}
                    </div>
                    <div
                      v-if="conversation.unread_messages > 0"
                      class="new-count"
                    >
                      {{ conversation.unread_messages }}
                    </div>
                  </div>
                  <div class="time">
                    {{ justTime(conversation.last_message_on) }}
                  </div>
                </div>
                <div class="message-preview text-truncater mt-2 pt-1 pr-3">
                  {{ conversation.last_message }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-side ova">
          <div v-if="previewImaged.img" class="p-2 modal-backdropp">
            <div class="d-flex justify-content-between px-4 mb-2">
              <div class="row">
                <div class="mr-3">
                  <img
                    class="avatar-img img-fluid"
                    :src="
                      previewImaged.profile.image
                        ? previewImaged.profile.image
                        : require(`~/assets/img/${
                            previewImaged.profile.gender === 'male'
                              ? 'male'
                              : 'female'
                          }-young.jpeg`)
                    "
                  />
                </div>
                <div>
                  <div class="small text-truncater mr-2 text-secondary">
                    {{ previewImaged.profile.name }}
                  </div>
                  <div class="small text-truncater mr-2 text-secondary">
                    {{ previewImaged.profile.datetime.slice(11, 16) }}
                    {{
                      parseInt(previewImaged.profile.datetime.slice(11, 13)) >
                      12
                        ? 'PM'
                        : 'AM'
                    }}
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
            <div class="mx-5 mt-5 h-75">
              <img
                :src="previewImaged.img"
                alt=""
                class="img-fluid"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div class="top-bar">
            <div class="d-flex align-items-center">
              <div class="mr-3">
                <img
                  v-if="singleConversation.student_data.class_student_id"
                  class="avatar-img"
                  :src="
                    singleConversation.student_data.admission_image
                      ? singleConversation.student_data.admission_image
                      : require(`~/assets/img/${
                          singleConversation.student_data.gender === 'male'
                            ? 'male'
                            : 'female'
                        }-young.jpeg`)
                  "
                />
              </div>
              <div class="chat-name">{{ chatName }}</div>
            </div>
            <div>
              <div class="dropdown">
                <button
                  id="dropdownMenuButton"
                  class="
                    btn
                    rounded-pill
                    d-flex
                    align-items-center
                    justify-content-center
                    p-0
                  "
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span
                    class="iconify fs-20"
                    data-inline="false"
                    data-icon="bi:three-dots-vertical"
                  ></span>
                </button>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a class="dropdown-item" href="#">Delete Chat</a>
                  <a class="dropdown-item" href="#">Archive Conversation </a>
                </div>
              </div>
            </div>
          </div>
          <div id="chatView" class="chat-view-wrapper">
            <div
              v-if="!conversationThread.length"
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
                It’s Nice to chat with someone. 😊
              </div>
              <div class="font-family_brown fs-12 line-height-150p text-light">
                Search for someone from the left menu<br />and start your
                conversation
              </div>
            </div>
            <!-- <div v-else-if="conversationThread === 'bastard'">
              <h2>This student isn't linked to a family yet</h2>
            </div> -->
            <div v-else>
              <div
                v-for="(message, messageIndex) in conversationThread"
                :key="messageIndex"
                class="mb-2"
              >
                <div
                  :class="`d-flex justify-content-${
                    message.entity === 'family' ? 'start' : 'end'
                  }`"
                >
                  <div class="d-flex align-items-center mr-2 text-primary">
                    <span @click="replyMessage(message)">
                      <Icon
                        icon="bi:reply-fill"
                        data-rotate="180deg"
                        style="font-size: 15px"
                      />
                    </span>
                  </div>
                  <div>
                    <div
                      v-if="message.reply"
                      class="reply-box rounded p-1"
                      :style="{
                        fontSize: '0.5rem',
                        backgroundColor: '#F4F6F8',
                      }"
                    >
                      <p
                        :style="{ fontSize: '0.7rem' }"
                        class="m-0 text-primary"
                      >
                        {{ message.reply_for.reply_post_name }}
                      </p>
                      <!-- <p :style="{ fontSize: '0.7rem' }" class="m-0 text-secondary">
                        title
                      </p> -->
                      <p :style="{ fontSize: '0.7rem' }" class="m-0">
                        {{ message.reply_for.reply_post }}
                      </p>
                    </div>
                    <div class="bg-white card p-1">
                      <div v-if="message.file && message.file.length">
                        <audio
                          v-if="message.file[0].format === '.mp3'"
                          :src="message.file[0].url"
                          controls
                        ></audio>
                      </div>
                      <div v-if="message.file && message.file.length">
                        <div
                          v-if="
                            message.file[0].format === '.png' ||
                            message.file[0].format === '.jpg' ||
                            message.file[0].format === '.jpeg'
                          "
                          class="rounded bg-dark"
                          :style="{
                            'background-image':
                              'url(' + message.file[0].url + ')',
                            height: '8rem',
                            'background-repeat': 'no-repeat, repeat',
                            'background-size': '100%',
                          }"
                          @click="previewImage(message)"
                        ></div>
                      </div>

                      <div>
                        <small class="text-primary font-weight-bold">{{
                          message.thread_title
                        }}</small>
                        <div>{{ message.post }}</div>
                        <div class="d-flex justify-content-between">
                          <span class="time mr-2">
                            {{ message.name }}
                          </span>
                          <span class="time">
                            {{ convertDate(message.datetime) }}
                            <!-- {{
                              message.datetime
                                ? message.datetime.slice(11, 16)
                                : ''
                            }}
                            {{
                              parseInt(message.datetime.slice(11, 13)) > 12
                                ? 'PM'
                                : 'AM'
                            }} -->
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="message.entity !== 'family'"
                      class="d-flex justify-content-end text-primary"
                      :style="{ fontSize: '0.8rem' }"
                    >
                      Delivered
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-2" :style="{ backgroundColor: '#F0F0F0' }">
            <VEmojiPicker
              v-show="showDialog"
              :style="{ width: '100%', height: 'auto' }"
              label-search="Search"
              lang="pt-BR"
              @select="onSelectEmoji"
            />
          </div>
          <div :style="{ postion: 'relative', backgroundColor: '#F0F0F0' }">
            <div
              v-if="reply.id"
              class="ml-5 p-1 pl-59 reply-box-container"
              :style="{ position: '', bottom: '5rem', right: '35%' }"
            >
              <div class="row">
                <div
                  class="col-10 rounded reply-box w-100"
                  :style="{ backgroundColor: '#F0F7FC' }"
                >
                  <small class="text-primary font-weight-bold m-0 p-0">
                    {{ reply.name }}
                  </small>
                  <div class="time font-weight-bold m-0 p-0">
                    {{ reply.thread_title }}
                  </div>

                  <div class="m-0 p-0 text-truncater">{{ reply.post }}</div>
                </div>
                <div
                  class="col-2 d-flex align-items-center text-danger"
                  :style="{ cursor: 'pointer', fontSize: '3rem' }"
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
                  <!-- <span class="text-dark fs-12 font-weight-bold mx-1">250kb</span> -->
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
              <div class="mr-2 row">
                <button class="btn pl-1" @click="attachFile">
                  <Icon icon="zmdi:attachment-alt" class="mr-1" />
                </button>
              </div>
              <div class="mr-2">
                <button class="btn pl-1" @click="toogleDialogEmoji">😊</button>
              </div>

              <div class="chat-message-input ml-2">
                <input
                  v-model="input"
                  class="form-control"
                  :disabled="
                    showAudio ||
                    showaudioComponent ||
                    !singleConversation.student_data.class_student_id
                  "
                  type="text"
                  placeholder="Start a message"
                  @keyup.enter="sendChat"
                />
                <button class="btn" :disabled="sendingChat" @click="sendChat">
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
                <button class="btn" @click="sendaudio">
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

    <!-- <WebViewer
        url="https://slate-assets.s3.amazonaws.com/media/560aeb58-f3af-464a-8dab-9192ce4228ca/admissions/df40ff76-71be-4bb5-b106-83e43b10717a_2022-01-16.jpg"
      ></WebViewer> -->
    <ModalWrapper
      id="broadcastModal"
      class="custom-modal fade"
      title="Broadcast Message"
      tabindex="-1"
      aria-labelledby="broadcast-modalLabel"
      aria-hidden="true"
      @ok="submitBroadCastMessage"
    >
      <div class="">
        <!-- <ComingSoon /> -->
        <div class="">
          <div class="">
            <div class="">
              <label class="form-control-label">Recipient(s)</label>
              <MultiSelect
                v-model="broadcastMessage.students_class_ids"
                :options="broadcastStudents"
                :option-value="(option) => option.id"
                option-label="label"
              >
              </MultiSelect>
            </div>
            <hr />
            <div class="mb-2">
              <label class="form-control-label">Topic</label>
              <input
                v-model="broadcastMessage.topic"
                class="form-control"
                placeholder="Enter Topic e.g medical"
              />
            </div>
            <div class="mb-2">
              <label class="form-control-label">Message</label>
              <textarea
                v-model="broadcastMessage.message"
                class="form-control"
                placeholder="Message"
              ></textarea>
            </div>
            <div>
              <button
                class="btn btn-light text-primary bg-white my-1 py-2"
                @click="onClickFileUpload"
              >
                <span class="iconify" data-icon="feather:file"></span> Attach
                File
              </button>
              <input
                ref="fileInput"
                class="invisible"
                type="file"
                name="imagesArray"
                @change="onChange"
              />
              <div class="d-inline-block">
                <div
                  v-for="(file, fileIndex) in broadcastMessage.files"
                  :key="fileIndex"
                  class="btn btn-light text-light bg-white py-2 my-1 mr-2"
                >
                  <span class="iconify" data-icon="feather:file"></span>
                  <span class="fs-14">{{ file.file_name }}</span>
                  <!-- <span class="text-dark fs-12 font-weight-bold mx-1">250kb</span> -->
                  <span @click="deleteBroadcastFile(file, fileIndex)">
                    <span
                      class="iconify fs-16 pointer text-danger"
                      data-icon="ci:off-outline-close"
                    ></span>
                  </span>
                </div>

                <div v-if="broadcastSpinner" class="mt-2">
                  <div class="spinner-border text-primary m-0" role="status">
                    <span class="sr-only mt-2"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  </div>
</template>

<script>
import axios from 'axios'

import { DateTime } from 'luxon'
import MultiSelect from 'primevue/multiselect'
import { VEmojiPicker } from 'v-emoji-picker'
import audio from '~/mixins/audio.js'

export default {
  components: {
    MultiSelect,
    VEmojiPicker,
  },
  mixins: [audio],
  data() {
    return {
      sendingChat: false,
      showAudio: false,
      audiofile: 'ss',
      chats: [],
      mtype: null,
      showaudioComponent: false,
      showDialog: false,
      broadcastSpinner: false,
      chatName: '',
      messageFileSpinner: false,
      reply: {},
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
      singleConversation: {
        student_data: {
          admission_image: null,
        },
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
      input: '',
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
      const {
        data: { data },
      } = await this.$axios.get(
        `/communications/v3/class/${this.$route.params.class}/students/`
      )

      this.staffChats = data.map((e) => ({ ...e, isActive: false }))
      this.broadcastStudents = data.map((e) => ({
        id: e.student_data.class_student_id,
        label: e.student_data.admission_name,
      }))
      this.staffChats1 = data
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    schoolId() {
      return this.$store.state.administration.school.id
    },
  },
  mounted() {
    this.changeHeight()
  },

  methods: {
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
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog
    },
    onSelectEmoji(emoji) {
      this.input += emoji.data
      // Optional
      // this.toogleDialogEmoji();
    },
    changeHeight() {
      const div = document.querySelector('.container-emoji')
      const emoji = document.querySelector('.grid-emojis')

      div.style.height = '100px'
      emoji.style.display = 'inline'
      console.log('emoji style', emoji.style)
    },
    previewImage(e) {
      this.previewImaged.img = e.file[0].url
      this.previewImaged.profile = e
    },
    callback(data) {
      console.debug(data)
    },

    async deleteMessageFile(e, i) {
      console.log(e, i)
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
    replyMessage(message) {
      this.reply = message
    },
    attachFile() {
      if (this.$refs.fileInput2) {
        const uploadField = this.$refs.fileInput2
        uploadField.click()
      }
    },
    async onChange2(event) {
      console.log(event)
      if (event.target.files.length) {
        this.messageFileSpinner = true
        const file = event.target.files[0]
        const broadcastForm = new FormData()
        broadcastForm.append('name', file.name)
        broadcastForm.append('file', file)
        broadcastForm.append('type', file.type)
        try {
          // this.broadcastSpinner = true;
          const {
            data: { data },
          } = await this.$axios.post(
            `/communications/v3/school/${this.schoolId}/file/upload/`,
            broadcastForm
          )
          // this.broadcastSpinner = false;
          this.messageFiles.push(data)
        } catch (error) {
          console.error(error)
          // this.broadcastSpinner = false;
        } finally {
          this.messageFileSpinner = false
        }
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
        console.log('response', data)
      } catch (error) {
        console.error(error)
        this.broadcastSpinner = false
      }
    },
    async submitBroadCastMessage() {
      try {
        await this.$axios.post(
          `/communications/v3/class/teacher/chat/broadcast/`,
          this.broadcastMessage
        )
        this.$fetch()
        if (this.singleConversation.student_data.class_student_id) {
          this.getSingleConversation(this.singleConversation)
        }
        this.broadcastMessage = {}
        this.$bvModal.hide('broadcastModal')
      } catch (error) {
        console.error(error)
      }
    },
    async sendChat() {
      this.sendingChat = true
      try {
        const message = this.input

        await this.$axios.post(
          `/communications/v3/class/student/${this.class_student_id}/teacher/chat/post/`,
          {
            message,
            topic: '',
            files: this.messageFiles,
            reply_post_id: this.reply.id ? this.reply.id : '',
          }
        )
        this.input = ''
        this.reply = {}
        this.messageFiles = []
        this.getSingleConversation(this.singleConversation)

        this.$fetch()
      } catch (error) {
        console.log(error)
      } finally {
        this.sendingChat = false
      }
    },
    async getSingleConversation(conversation) {
      this.singleConversation = conversation

      // if (conversation.student_data.family_data.family_id) {
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
      // } else {
      //   this.conversationThread = 'bastard'
      // }
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
  },
}
</script>

<style scoped>
@media only screen and (max-width: 1200px) {
  .chats-list {
    width: 14rem !important;
  }
  .left-side {
    width: 14rem;
    overflow: scroll;
  }
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

  overflow: auto;
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
