<template>
  <div>
    <template v-if="loading">
      <nuxt-child />
      <!-- <permission-denied v-else /> -->
    </template>

    <!-- <h1>Landing</h1>
    <h2>{{$permission.hasAccess()}}</h2> -->
  </div>
</template>

<script>
export default {
 layout({route}){
    // made layout specially for live class page to be an empty layout
    if (route.name === 'sms-id-lms-subjects-subject-lesson-lesson-live-live') {
      return 'emptyLayout'
    }
    return 'auth'
  },
  data() {
    return {
      loading: false,
    }
  },
  watch: {
    '$route.params.id': {
      async handler(newVal) {
        const school = this.$store.getters['school/getSchoolByCode'](newVal)
        if (school) {
          const { data } = await this.$axios.$get(
            `./slate-admin/school/${school.id}/year/?paginate=false`
          )
          const currentAcademicYear = data.find(
            (item) => item.current_academic_year
          )
          this.$store.commit(
            'school/SET_CURRENT_ACADEMIC_YEAR',
            currentAcademicYear
          )
        }
        this.loading = true
      },
    },
  },
  async created() {
    const school = this.$store.getters['school/getSchoolByCode'](
      this.$route.params.id
    )

    if (school) {
      const { data } = await this.$axios.$get(
        `./slate-admin/school/${school.id}/year/?paginate=false`
      )
      const currentAcademicYear = data.find(
        (item) => item.current_academic_year
      )
      this.$store.commit(
        'school/SET_CURRENT_ACADEMIC_YEAR',
        currentAcademicYear
      )
    }
    this.loading = true
  },
}
</script>

<style lang="scss" scoped></style>
