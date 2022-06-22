<template>
  <PageProfileLinkPageComponent
    @reload-page="forceRerender"
    :display-details-key="displayDetailsKey"
    :data="schoolData"
    :entity="`staff`"
  >
  </PageProfileLinkPageComponent>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "profile",
  data() {
    return {
      schoolData: [],
      displayDetailsKey: ["staff_name", "gender", "employee_number"],
    };
  },
  async mounted() {
    const { data } = await this.$axios.get("./schools/v2/records/");
    console.log("data is ", data.data.schools);
    this.schoolData = data.data.schools;
    // this.schoolData = []
  },

  methods: {
    forceRerender() {
      this.$router.go(0);
    },
  },
});
</script>

<style lang="scss" scoped></style>
