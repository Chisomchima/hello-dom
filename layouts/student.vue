<template>
  <div>
    <Transition name="slide-fade">
      <div v-show="$nuxt.isOffline" class="absolutebanner">
        <OfflineDefault />
      </div>
    </Transition>
    <div class="site-nav" :class="{ offline: $nuxt.isOffline }">
      <LayoutAuthNavbar />
      <LayoutAuthStudentTopBar
        v-if="
          Object.entries($store.state.student.classDetails).length > 0 &&
          Object.entries($store.state.student.studentProfile).length > 0
        "
        :key="index"
      />
      <LayoutAuthStudentSideBar />
    </div>
    <!-- <div class="site-container"> -->
    <div
      class="site-container"
      :style="{
        marginLeft: $route.query.collapse ? '130px' : '',
        width: $route.query.collapse ? '1300px' : '',
      }"
    >
      <StudentBreadcrumb />
      <Nuxt @student-load-done="++index" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      index: 0,
    }
  },
  computed: {
    ...mapState('student', ['studentLoadingComplete']),
  },
  watch: {
    studentLoadingComplete(v) {
      // console.log('updated topbar plesssss', this.index, v)
      ++this.index
    },
  },
}
</script>

<style lang="css" scoped>
.site-nav.offline {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  width: 100%;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  z-index: 999;
}

.absolutebanner {
  position: fixed;
  top: 0rem;
  /* top: -100px; */
  z-index: 1001;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

/* .slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
} */

.slide-fade-enter,
.slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.offlinewrapper {
  /* margin-top: 150px;
  height: 90vh; */
  /* margin-bottom: 150px; */
}
</style>
