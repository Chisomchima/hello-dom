<template>
  <div class="">
    <div class="px-2" :style="{ backgroundColor: '#F0F0F0' }">
      <VEmojiPicker
        v-show="showDialog"
        :style="{ width: '100%', height: 'auto' }"
        label-search="Search"
        lang="pt-BR"
        @select="onSelectEmoji"
      />
    </div>
    <div
      :style="{
        postion: 'relative',
        backgroundColor: '#F0F0F0',
      }"
    >
      <div
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
              reply name
            </small>
            <div class="time font-weight-bold m-0 p-0">reply title</div>

            <div class="m-0 p-0 text-truncater">reply post</div>
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
        <div class="pl-5 mt-2">
          <div class="btn btn-light text-light bg-white p-0 mr-2">
            <span class="iconify" data-icon="feather:file"></span>
            <span class="" :style="{ fontSize: '0.7rem' }">file name</span>
            <!-- <span class="text-dark fs-12 font-weight-bold mx-1">250kb</span> -->
            <span class="" @click="deleteMessageFile(file, fileIndex)">
              <span
                class="iconify fs-16 pointer text-danger"
                data-icon="ci:off-outline-close"
              ></span>
            </span>
          </div>
        </div>
        <div class="m-2 ml-5 spinner-border text-primary m-0" role="status">
          <span class="sr-only mt-2"></span>
        </div>
      </div>

      <div
        :style="{ backgroundColor: '#F0F0F0' }"
        class="row align-items-center"
      >
        <div v-show="showDialog" class="mr-2">
          <button
            class="btn-mine mr-2 pl-1 text-danger"
            @click="showDialog = false"
          >
            <Icon icon="bi:x" style="font-size: 2rem" class="mr-1" />
          </button>
        </div>
        <div class="mr-2">
          <button class="btn-mine pl-1" @click="attachFile">
            <Icon icon="zmdi:attachment-alt" class="mr-1" />
          </button>
        </div>
        <div class="mr-2">
          <button class="btn-mine pl-1" @click="showDialog = !showDialog">
            😊
          </button>
        </div>

        <div class="chat-message-input-mine ml-2">
          <input
            v-model="input"
            class="form-control input-mine"
            :disabled="!showMessages"
            type="text"
            placeholder="Start a message"
            @keyup.enter="sendMessage"
          />
          <button class="btn-mine" @click="sendMessage">
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
          <button class="btn-mine text-danger bg-white" @click="closeAudio">
            <Icon icon="akar-icons:circle-x" />
          </button>
        </div>
        <div v-if="showaudioComponent">
          <button class="btn-mine" @click="sendaudio">
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
          <button class="btn-mine" @click="startAudio">
            <span
              class="iconify icon"
              data-inline="false"
              data-icon="ic:baseline-keyboard-voice"
            ></span>
          </button>
        </div>
        <div v-if="showAudio">
          <button class="btn-mine pl-1 text-danger ml-1" @click="stopAudio">
            <Icon icon="bi:stop-circle" class="mr-1" style="font-size: 2rem" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VEmojiPicker } from 'v-emoji-picker'
import audio from '~/mixins/audio.js'
export default {
  components: {
    VEmojiPicker,
  },
  mixins: [audio],
  data() {
    return {
      showDialog: false,
    }
  },
  mounted() {
    this.changeHeight()
  },
  methods: {
    changeHeight() {
      // resize the emoji library
      const div = document.querySelector('.container-emoji')
      const emoji = document.querySelector('.grid-emojis')

      div.style.height = '100px'
      emoji.style.display = 'inline'
    },
  },
}
</script>

<style lang="scss" scoped></style>
