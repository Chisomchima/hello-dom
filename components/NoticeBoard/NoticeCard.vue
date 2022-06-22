<template>
  <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 mb-3 mb-md-4">
    <nuxt-link
      :to="`/student/lms/${$route.params.schoolId}/notice-board/${board.id}`"
      class="post-card"
    >
      <div class="post-img mb-3">
        <img :src="board.image" />
      </div>
      <div>
        <div class="post-title text-truncater text-truncater-lines-2 mb-2">
          {{ board.title }}
        </div>
        <div class="post-summary text-truncater text-truncater-lines-3 mb-2">
          {{ board.content }}
        </div>
        <div class="post-meta">Posted: {{ formatDate(board.publish_at) }}</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { format } from 'date-fns/esm'
export default {
  name: 'NoticeCard',
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), 'dd-MM-yyyy')
    },
  },
}
</script>
