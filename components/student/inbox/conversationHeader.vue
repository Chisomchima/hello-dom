<template>
  <div
    v-if="showMessages"
    class="
      chat-header
      bg-light
      d-flex
      justify-content-start
      align-items-center
      px-3
    "
  >
    <img
      class="avatar-img"
      :src="
        entity.image
          ? entity.image
          : require(`~/assets/img/${
              entity.gender === 'female' ? 'female' : 'male'
            }-young.jpeg`)
      "
    />
    <span class="ml-3">
      {{ entity.staff_name ? entity.staff_name : entity.student_name }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    entity: {
      type: Object,
      required: true,
    },
    showMessages: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.chat-header {
  height: 3.8rem;
  border-bottom: 1px solid #e6e6e6;
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
</style>
