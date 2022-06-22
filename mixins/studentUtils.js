export default {
  computed: {
    studentDetails() {
      // debugger;
      // const school = this.$store.getters['school/getSchoolByCode'](
      //   this.$route.params.schoolId
      // )

      // eslint-disable-next-line prefer-const
      let school = this.$store.state.student.schools.find(
        (item) => item.code === this.$route.params.schoolId
      )

      const schoolDetails = this.$store.state.student.discoveryData.find(
        (item) => item.school_details.id === school.id
      )
      return schoolDetails.student_details
    },
  },
}
