<template>
  <div class="card bg-white mb-3">
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-xl-6 mb-3 mb-xl-0">
          <div class="wizard-steps">
            <div
              v-for="(tab, index) in tabArray"
              :key="index"
              class="step"
              :class="[index === selectedTab ? 'active' : '']"
              @click="goTo(index)"
            >
              <span>{{ index + 1 }}</span>
              {{ tab }}
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-5 col-md-5 col-sm-6 mb-0">
          <div class="fs-14 text-light">Class:</div>
          <div class="fs-14 text-dark">
            {{ data.class_name }} - {{ data.grade }}
          </div>
        </div>
      </div>
      <hr class="my-3" />
      <slot :currentTab="selectedTab"></slot>
      <div class="mt-4 d-flex align-items-center justify-content-end">
        <button
          v-if="selectedTab > 0 && selectedTab < tabArray.length"
          class="btn btn-outline-primary py-2 px-3 ml-3"
          @click="prev()"
        >
          Previous
        </button>
        <button
          v-if="tabArray.length - 1 != selectedTab"
          class="btn btn-outline-primary py-2 px-3 ml-3"
          @click="next()"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedTab: 0,
      tabArray: ['Setup Report Card', 'Add Students'],
    }
  },
  methods: {
    next() {
      this.selectedTab++
    },
    prev() {
      this.selectedTab--
    },
    goTo(index) {
      this.selectedTab = index
    },
  },
}
</script>

<style lang="scss" scoped></style>
