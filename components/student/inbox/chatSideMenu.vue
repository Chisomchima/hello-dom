<template>
  <div>
    <transition-group
      v-if="!showActiveConversations"
      tag="div"
      class="list-group"
      name="fade"
    >
      <div
        v-for="(conversation, index) in conversationsToShow"
        :key="index"
        class="chat-list-item"
        :class="{ active: conversation.activeEntity }"
        @click="selectConversation(conversation, index)"
      >
        <template v-if="conversation && conversation.entity === 'student'">
          <div class="mr-3">
            <img
              class="avatar-img"
              :src="
                conversation.image
                  ? conversation.image
                  : require(`~/assets/img/${
                      conversation.gender === 'male' ? 'male' : 'female'
                    }-young.jpeg`)
              "
            />
          </div>
          <div class="w-100">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center mr-3">
                <div class="chat-name text-truncater mr-2">
                  {{ conversation.student_name }}
                </div>
                <div
                  v-if="conversation.unread_messages !== 0"
                  class="new-count"
                >
                  {{
                    conversation.unread_messages
                      ? conversation.unread_messages
                      : 0
                  }}
                </div>
              </div>
              <div class="time">
                {{ justTime(conversation.last_message_on) }}
              </div>
            </div>
            <div class="message-preview text-truncater mt-2 pt-1 pr-3">
              <span
                class="text-warning rounded-pill p-1"
                style="background-color: #fffcf0"
              >
                Student:
              </span>
              <span class="rounded-pill p-1">
                {{ conversation.class_name ? conversation.class_name : '' }}
              </span>
            </div>
            <div class="message-preview text-truncater mt-2 pt-1 pr-3">
              {{ conversation.last_message }}
            </div>
          </div>
        </template>
        <template v-else-if="conversation && conversation.entity === 'staff'">
          <div class="mr-3">
            <img
              class="avatar-img"
              :src="
                conversation.image
                  ? conversation.image
                  : require(`~/assets/img/${
                      conversation.gender === 'male' ? 'male' : 'female'
                    }-young.jpeg`)
              "
            />
          </div>
          <div class="w-100">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center mr-3">
                <div class="chat-name text-truncater mr-2">
                  {{ conversation.staff_name }}
                </div>
                <div
                  v-if="conversation.unread_messages !== 0"
                  class="new-count"
                >
                  {{
                    conversation.unread_messages
                      ? conversation.unread_messages
                      : 0
                  }}
                </div>
              </div>
              <div class="time">
                {{ justTime(conversation.last_message_on) }}
              </div>
            </div>
            <div class="message-preview text-truncater mt-2 pt-1 pr-3">
              <span
                class="text-primary rounded-pill p-1"
                style="background-color: #f1f8fe"
              >
                Staff
              </span>
            </div>
            <div
              v-if="conversation.last_message"
              class="message-preview text-truncater mt-2 pt-1 pr-3"
            >
              {{ conversation.last_message ? conversation.last_message : '' }}
            </div>
          </div>
        </template>
      </div>
    </transition-group>
    <!-- active converations -->
    <transition-group
      v-if="showActiveConversations"
      tag="div"
      class="list-group mt5"
      name="fade"
    >
      <div
        v-for="(conversation, index) in list"
        :key="index"
        class="chat-list-item"
        :class="{ active: conversation.activeEntity }"
        @click="selectConversation(conversation, index)"
      >
        <template v-if="conversation && conversation.entity === 'student'">
          <div class="mr-3">
            <img
              class="avatar-img"
              :src="
                conversation.image
                  ? conversation.image
                  : require(`~/assets/img/${
                      conversation.gender === 'male' ? 'male' : 'female'
                    }-young.jpeg`)
              "
            />
          </div>
          <div class="w-100">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center mr-3">
                <div class="chat-name text-truncater mr-2">
                  {{ conversation.student_name }}
                </div>
                <div
                  v-if="conversation.unread_messages !== 0"
                  class="new-count"
                >
                  {{
                    conversation.unread_messages
                      ? conversation.unread_messages
                      : 0
                  }}
                </div>
              </div>
              <div class="time">
                {{ justTime(conversation.last_message_on) }}
              </div>
            </div>
            <div class="message-preview text-truncater mt-2 pt-1 pr-3">
              <span
                class="text-warning rounded-pill p-1"
                style="background-color: #fffcf0"
              >
                Student:
              </span>
              <span class="rounded-pill p-1">
                {{ conversation.class_name ? conversation.class_name : '' }}
              </span>
            </div>
            <div class="message-preview text-truncater mt-2 pt-1 pr-3">
              {{ conversation.last_message }}
            </div>
          </div>
        </template>
        <template v-else-if="conversation && conversation.entity === 'staff'">
          <div class="mr-3">
            <img
              class="avatar-img"
              :src="
                conversation.image
                  ? conversation.image
                  : require(`~/assets/img/${
                      conversation.gender === 'male' ? 'male' : 'female'
                    }-young.jpeg`)
              "
            />
          </div>
          <div class="w-100">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center mr-3">
                <div class="chat-name text-truncater mr-2">
                  {{ conversation.staff_name }}
                </div>
                <div
                  v-if="conversation.unread_messages !== 0"
                  class="new-count"
                >
                  {{
                    conversation.unread_messages
                      ? conversation.unread_messages
                      : 0
                  }}
                </div>
              </div>
              <div class="time">
                {{ justTime(conversation.last_message_on) }}
              </div>
            </div>
            <div class="message-preview text-truncater mt-2 pt-1 pr-3">
              <span
                class="text-primary rounded-pill p-1"
                style="background-color: #f1f8fe"
              >
                Staff
              </span>
            </div>
            <div
              v-if="conversation.last_message"
              class="message-preview text-truncater mt-2 pt-1 pr-3"
            >
              {{ conversation.last_message ? conversation.last_message : '' }}
            </div>
          </div>
        </template>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  props: {
    conversationsToShow: {
      type: Array,
      required: true,
    },
    showActiveConversations: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    list() {
      return this.conversationsToShow.map((e) => ({
        activeEntity: false,
        ...e,
      }))
    },
  },

  methods: {
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
    selectConversation(conversation, index) {
      if (this.list.length) {
        this.list.forEach((chat) => {
          chat.activeEntity = false
        })
        this.list[index].activeEntity = true
      }

      this.$emit('selectConversation', conversation)
    },
  },
}
</script>

<style scoped>
.fade-leave-active,
.fade-enter-active {
  transition: 0.3s;
}
.fade-enter-active,
.fade-leave-active {
  transform: translate(5%, 0);
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  transform: translate(-100%, 0);
}
</style>
