<template>
  <div class="text-center class-card-wrapper mb-20">
    <div class="class-avatar">
      <img
        v-if="mate.student_image"
        :src="mate.student_image"
        alt="classmates picture"
        class="avatar"
      />
      <img
        v-else
        :src="
          mate.profile.gender === 'female'
            ? ''
            : mate.profile.gender === 'male'
            ? require('~/assets/img/male-young.jpeg')
            : require('~/assets/lessons/image/defaulUserImage.png')
        "
        alt="classmates picture"
        class="avatar"
      />
    </div>
    <div class="mate-name text-truncate">{{ mate.student_name }}</div>
    <div>
      <button
        :style="`
  padding: 4px 8px;
  border: 1px solid ${mate.house.color};
  color: ${mate.house.color};
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: 8px;
  height: 2.3rem;
  margin-bottom: 20px;
  background: transparent;`"
      >
        {{ mate.house.name || '' }}
      </button>
    </div>
    <div>
      <button class="class-msg-btn">
        <div class="d-flex align-items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.66536 2.6665H13.332C14.0654 2.6665 14.6654 3.2665 14.6654 3.99984V11.9998C14.6654 12.7332 14.0654 13.3332 13.332 13.3332H2.66536C1.93203 13.3332 1.33203 12.7332 1.33203 11.9998V3.99984C1.33203 3.2665 1.93203 2.6665 2.66536 2.6665Z"
              stroke="#40484F"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.6654 4L7.9987 8.66667L1.33203 4"
              stroke="#40484F"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span> Message </span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mate: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.avatar {
  height: 70px;
  width: 70px;
  border-radius: 18.3158px;
}

.class-card-wrapper {
  background: #ffffff;
  border: 1px solid #e7e8eb;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 16px;
}
.class-avatar {
  margin-bottom: 16px;
}
.mate-name {
  font-size: 14px;
  color: #40484f;
}
.class-btn {
  padding: 4px 8px;
  border: 1px solid #1070b7;
  color: #1070b7;
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: 8px;
  margin-bottom: 20px;
  background: transparent;
}
.class-msg-btn {
  background: transparent;
  border: 1px solid #e7e8eb;
  border-radius: 4px;
  color: #40484f;
  padding: 9px 20px;
  align-items: center;
}
.class-msg-btn svg {
  margin-right: 8px;
}
.mb-20 {
  margin-bottom: 20px;
}
</style>
