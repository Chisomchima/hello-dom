<template>
  <div>
    <div class="inbox-wrapper d-flex flex-wrap p-3">
      <div class="mr-3 avatar-cont">
        <img src="/img/avatar-01.png" alt="avatar" />
      </div>
      <div class="col">
        <div
          class="
            d-flex
            justify-content-between
            align-items-center
            user-info-cont
          "
        >
          <div>
            <div class="d-flex align-items-center">
              <span class="user-name text-truncate" style="margin-right: 8px">
                {{ chat.name }}
              </span>
              <span
                class="d-flex justify-content-center align-items-center"
                style="
                  background: #51b8f4;
                  font-size: 10px;
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  color: #fff;
                "
                >2</span
              >
            </div>
          </div>
          <div class="info-time">{{ chat.last_posted_on }}</div>
        </div>
        <div class="other-info">
          <span>{{ chat.entity }}</span>
          <span>Primary 6</span>
        </div>
        <p class="msg-cont text-truncate">{{ chat.last_message }}</p>
      </div>
    </div>
    <hr style="border: 1px solid #dbeaf4; width: 100%" class="m-0" />
  </div>
</template>

<script>
export default {
  name: 'UserInboxInfo',
  // layout: 'authWithoutTopbar',
  props: {
    chat: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.active {
  background: #f3f8fc;
}
.active .other-info span:first-child {
  background: #fffcf0;
}
.avatar-cont {
  margin-right: 16px;
}
.user-name {
  font-weight: 600;
  font-size: 14px;

  color: #40484f;
}
.info-time {
  font-size: 12px;
  color: #8e929b;
}
.user-info-cont {
  margin-bottom: 12px;
}
.other-info {
  margin-bottom: 12px;
}
.other-info span {
  font-size: 12px;
}
.other-info span:first-child {
  font-weight: 600;
  color: #c86409;
  margin: 0px 10px;
}
.other-info span:last-child {
  color: #40484f;
}
.msg-cont {
  margin-top: 12px;
  font-size: 12px;
  color: #8f9aa3;
  margin: 0;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
