<template>
  <div>
    <nuxt-child v-if="!$fetchState.pending" />
  </div>
</template>

<script>
export default {
  layout({route}){
    // made layout specially for live class page to be an empty layout
    if (route.name === 'student-lms-schoolId-lessons-live-lesson-live') {
      return 'emptyLayout'
    }
    return 'student'
  },
  data() {
    return {};
  },
  async fetch() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
    const school = this.$store.getters["student/getSchoolByCode"](
      this.$route.params.schoolId
    );
    // get current academic year details
    const { data } = await this.$axios.$get(`lms/school/${school.id}/profile/`);
    this.$store.commit(
      "student/SET_CURRENT_ACADEMIC_YEAR",
      data.classes[0].academic_year_id
    );
    this.$store.commit("student/SET_STUDENT_PROFILE_DETAILS", data);

    this.$emit("student-load-done");
    this.$store.commit("student/SET_STUDENT_LOAD_COMPLETE", true);
    this.$nextTick(() => {
      // this.$nuxt.$loading.start()
      this.$nuxt.$loading.finish();
    });

    // const classs = await this.$axios.$get(
    //   `lms/v2/school/${school.id}/dashboard/general_data/${data.classes[0].academic_year_id}/`
    // );
    // this.$store.commit("student/SET_STUDENT_CLASS_DETAILS", classs.data);

    this.$axios
      .$get(
        `lms/v2/school/${school.id}/dashboard/general_data/${data.classes[0].academic_year_id}/`
      )
      .then((res) => {
        // console.log("new bright response", res);
        this.studentData = res.data.student_bio.gender
        this.$store.commit('student/SET_STUDENT_CLASS_DETAILS', res.data)
      })
  },
  watch: {
    "$route.params.schoolId": {
      handler() {
        this.$fetch();
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
