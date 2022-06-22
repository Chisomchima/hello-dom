<template>
  <PageProfileLinkPageComponent
    @reload-page="forceRerender"
    :key="componentKey"
    :data="studentData"
    :entity="`student`"
    :display-details-key="displayKeys"
  >
  </PageProfileLinkPageComponent>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "profile",
  data() {
    return {
      studentData: [],
      componentKey: 0,
      displayKeys: [
        "student_name",
        "gender",
        "grade",
        "admission_number",
        "date_of_birth",
      ],
    };
  },

  async created() {
    const { data } = await this.$axios.get("./lms/v2/records/");

    this.studentData = data.data.schools;
  },

  methods: {
    forceRerender() {
      this.$router.go(0);
    },
  },
});
</script>

<style lang="scss" scoped></style>
