<template>
  <div>
    <div v-if="$fetchState.pending">
      <UtilsEmptyState text="Fetching Exercises..." />
    </div>
    <div v-if="studentexercises.length < 1 && !$fetchState.pending">
      <UtilsEmptyState text="No Exercises" />
    </div>
    <PagesParentSubjectCard :exercises="studentexercises" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentexercises: [],
    }
  },

  async fetch() {
    const studentexercises = await this.$axios.get(
      `util/v2/mobile/exercises/${this.$route.params.studentid}?status=untaken`
    )

    this.studentexercises = studentexercises.data.data.results
  },
}
</script>

<style>
</style>