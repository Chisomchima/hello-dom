<template>
  <div class="conatiner">
    <UtilsEmptyState
      v-if="boards.length < 1"
      text="You have no items on your noticeboard."
    />
    <div v-else class="d-block">
      <div class="page-heading mb-4">Notice Board</div>
      <div v-for="(board, i) in boards" :key="i" class="row">
        <NoticeCard :board="board" />
      </div>
    </div>
  </div>
</template>

<script>
import studentUtils from '@/mixins/studentUtils'
export default {
  name: 'NoticeBoard',
  mixins: [studentUtils],
  data() {
    return {
      boards: [],
    }
  },
  async fetch() {
    const school = this.$store.getters['student/getSchoolByCode'](
      this.$route.params.schoolId
    )
    const { data } = await this.$axios.$get(
      `schools/v3/${school.id}/noticeboard/?class_id=${this.studentDetails.class_id}&status=published`
    )

    this.boards = data.results
  },
}
</script>
