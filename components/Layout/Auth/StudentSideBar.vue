<template>
  <div>
    <div
      v-if="isShowing"
      class="modal-overlay"
      :class="{ show: isShowing }"
      @click="isShowing = false"
    ></div>
    <div
      id="site-sidebar"
      class="site-sidebar font-brown"
      :class="{
        show: isShowing,
        'collapse-sidebar-view': $route.query.collapse === 'true',
      }"
    >
      <div class="sidebar-logo mt-3 mb-2 mx-2">
        <img :src="getSchoolLogo" />
      </div>

      <div v-if="isShowing" class="ml-3 ml-lg-0 d-block d-lg-none">
        <h2 class="schoolname text-center">
          {{ $store.state.administration.school.name }}
        </h2>
      </div>
      <div class="sidebar-items-wrapper font-brown">
        <nuxt-link
          v-for="(item, i) in sideBars"
          :key="i"
          :to="`/student/lms/${$route.params.schoolId}/${item.path}`"
          :class="$route.fullPath.includes(item.path) ? 'nav-item active' : 'nav-item'"
        >
          <Icon
            class="mr-lg-3 nav-item-icon d-lg-none d-md-block customiconify"
            :icon="item.icon"
          />
          <div class="nav-item-text" @click="resetBreadCrumbs">
            <Icon
              class="mr-3 nav-item-icon d-lg-block d-none dontshow customiconify"
              :icon="item.icon"
            />
            <span
              :class="[
                $route.query.collapse === 'true' ? 'collapse-sidebar-view-text' : '',
              ]"
            >
              {{ item.name }}</span
            >
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import "./SideBarIcons";
export default {
  data() {
    return {
      isMobile: false,
      isShowing: false,
      sideBars: [
        {
          name: "Dashboard",
          icon: "home",
          path: "dashboard",
        },
        {
          name: "Subjects",
          icon: "books",
          path: "subjects",
        },
        {
          name: "Lessons",
          icon: "book",
          path: "lessons",
        },

        {
          name: "Exercises",
          icon: "excercises",
          path: "exercises",
        },
        {
          name: "My Gradebook",
          icon: "grommet-icons:scorecard",
          path: "gradebook",
        },
        {
          name: "Report Card",
          icon: "report",
          path: "reportcard",
        },
        {
          name: "Clubs",
          icon: "organization",
          path: "clubs",
        },
        {
          name: "Class Mates",
          icon: "classmates",
          path: "classmates",
        },
        {
          name: "Library",
          icon: "library",
          path: "library",
        },
        {
          name: "Notice Board",
          icon: "noticeboard",
          path: "notice-board",
        },
      ],
    };
  },

  computed: {
    getSchoolLogo() {
      const school = this.$store.getters["student/getSchoolByCode"](
        this.$route.params.schoolId
      );
      return school?.image;
    },
  },
  created() {
    this.$nuxt.$on("openSidebar", () => {
      this.isMobile = !this.isMobile;
      this.isShowing = !this.isShowing;
    });
  },

  methods: {
    resetBreadCrumbs() {
      this.$store.dispatch("breadcrumbs/removeRoot");

      this.$store.dispatch("breadcrumbs/sliceRoutes");
    },
    isShowingMethod() {
      this.isShowing = !this.isShowing;
    },
  },
  // mounted() {
  //   console.log(this.$route)
  // },
};
</script>

<style scoped>
/* @media (max-width: 768px) {
  .student-dropdown-container {
    background: none;
    border: none;
    position: fixed;
    top: calc(var(--navbar-height) + var(--topbar-height-style-2));
    bottom: 0;
    right: 0;
    width: 330px;
    max-width: calc(100vw - 35px);
    z-index: 1000;
    padding: 1rem 1rem 4rem;
    overflow: auto;
    animation: filter-container-slide-in 0.3s 1;
    -webkit-animation: filter-container-slide-in 0.3s 1;
  }
} */

.schoolname {
  font-size: 16px;
  font-weight: 900;
}

.site-sidebar {
  z-index: 901 !important;
}

@media (max-width: 768px) {
  .schoolname {
    font-size: 14px;
  }
}
@media (max-width: 568px) {
  .schoolname {
    font-size: 12px;
  }
}
</style>
