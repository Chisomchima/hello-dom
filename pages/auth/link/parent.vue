<template>
  <PageProfileLinkPageComponent
    :data="schoolData"
    :entity="`parent`"
    @reload-page="forceRerender"
  >
    <template #card>
      <div v-if="schoolData.length > 0" class="row">
        <div
          v-for="(school, index) in schoolData"
          :key="index"
          class="bg-white rounded border-left border-primary col-lg-4 col-md-6 col-10 p-3"
        >
          <!-- {{ school }} -->
          <div class="d-flex justify-content-around">
            <div class="img">
              <img
                width="80px"
                :src="school.image"
                class="img-thumbnail rounded-circle"
                alt=""
              />
            </div>
            <div class="d-flex flex-column justify-content-center">
              <div class="font-weight-bold text-capitalize text-primary">
                {{ school.school_name }}
              </div>
              <div class="text-black-50">{{ school.address }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PageProfileLinkPageComponent>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "profile",
  data() {
    return {
      schoolData: [],
    };
  },
  async created() {
    const { data } = await this.$axios.$get("/communications/v2/family/records/");
    this.schoolData = data.schools;
  },

  methods: {
    forceRerender() {
      this.$router.go(0);
    },
  },
});
</script>

<style scoped>
.border-left {
  /* border-left: 4px; */
  border-left: 3px solid #1070b7 !important;
}
</style>
