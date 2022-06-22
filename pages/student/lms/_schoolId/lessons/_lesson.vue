<template>
  <div>
    <!-- <BackwardNavigation text="Lessons" /> -->
    <div class="row bg-white">
      <div
        :class="[
          $route.query.collapseSideBar === 'true' ? 'col-md-12' : 'col-md-8',
        ]"
      >
        <!-- <div> -->
        <NuxtChild :lesson="lesson" @updateLesson="lesson = $event" />
        <div>
          <button
            v-if="$route.query.collapseSideBar === 'true'"
            class="btn btn-borderless-primary-2"
            style="position: absolute; right: -30px; top: 30%"
            @click="updateRouteToCollapseSideBar(false)"
          >
            <b-icon font-scale="1.8" icon="chevron-double-left"></b-icon>
          </button>
        </div>
        <!-- </div> -->
      </div>
      <transition name="fade">
        <div
          v-if="$route.query.collapseSideBar !== 'true'"
          class="col-md-4 mt-4"
        >
          <StudentLessonSideCard
            :title="'Lesson Content'"
            :items="lesson.lesson_contents"
            :content="lesson.content"
            :busy="false"
            @collapse-side-bar="updateRouteToCollapseSideBar(true)"
            @item-click="updateRouteQueryParamsWithIndex($event)"
          />

          <!-- <StudentLessonSideCard class="mt-3" :title="'Exercise'" /> -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  async asyncData({ store, $axios, route }) {
    const school = store.getters['student/getSchoolByCode'](
      route.params.schoolId
    )

    const { data } = await $axios.$get(
      `lms/v2/school/${school.id}/${store.state.student.currentAcademicYear}/lesson/${route.params.lesson}`
    )
    const content = data.content.filter((item) => item.type !== 'quiz')
    const lessonContents = data.lesson_contents.filter(
      (item) => item.type !== 'quiz'
    )

    return {
      lesson: { ...data, content, lesson_contents: lessonContents },
    }
  },
  data() {
    return {
      lesson: {},
      lessonContent: [],
    }
  },
  computed: {},

  mounted() {
    console.log('check route', this.$route)
  },

  methods: {
    formatData(date) {
      return DateTime.fromISO(date).toFormat('yyyy LLL dd')
    },

    updateRouteQueryParamsWithIndex(event) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          content_index: event.content_index,
        },
      })
    },

    updateRouteToCollapseSideBar(value) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          collapseSideBar: value,
        },
      })
    },
  },
}
</script>

<style scoped>
.info-card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.info-card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.info-card-body {
  flex: 1 1 auto;
  padding: 1.25rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
