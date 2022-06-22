<template>
  <div>
    <!-- {{ $route.params }} -->
    <div class="d-flex align-items-center justify-content-end flex-wrap mb-3">
      <!-- <SimpleBreadCrumb :crumb-items="crumbItem" /> -->
      <div class="d-flex align-items-center mb-2">
        <div v-if="data.state != 'published'" class="mr-2">
          <button
            class="btn btn-borderless-primary py-2 px-3"
            @click="toEditRoute()"
          >
            Edit Lesson
          </button>
        </div>
        <div v-if="data.state === 'published'">
          <button class="btn btn-danger py-2 px-3" @click="unPublishLesson()">
            Unpublish
          </button>
        </div>
        <div v-else>
          <button class="btn btn-primary py-2 px-3" @click="publishLesson()">
            Publish
          </button>
        </div>
      </div>
    </div>

    <!-- <BackwardNavigation text="Subject" link-name="sms-id-lms-subjects" /> -->
    <!-- <pre> {{ data }}</pre> -->

    <!-- :color="data.icon_data.icon_font_color"
      :img-src="data.icon_data.icon"
      :bg-color="data.icon_data.icon_bg_color" -->

    <UtilsHeaderCardWithColor
      enable-image
      disable-action
      :color="subject.icon_data.icon_font_color"
      :img-src="subject.icon_data.icon"
      :bg-color="subject.icon_data.icon_bg_color"
      :title="data.name"
      :data="data"
      :display-key="[
        'class',
        'week.week_name',
        'available_date',
        'subject_name',
        'status',
        'students_count',
      ]"
    ></UtilsHeaderCardWithColor>

    <UtilsBaseCardTab>
      <UtilsCardTab
        v-for="(component, index) in components"
        :key="index"
        :title="component.title"
      >
        <component :is="component.component" :data="data"></component>
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  async asyncData({ $axios, route }) {
    try {
      const { data: subject } = await $axios.$get(
        `schools/v2/lms/subject/${route.params.subject}/`
      )

      const data = await $axios.$get(
        `./schools/v3/lesson/${route.params.lesson}/detail/`
      )

      const availableDate = DateTime.fromSQL(
        data.available_date
      ).toLocaleString(DateTime.DATE_FULL)
      const dataObject = {
        ...data,
        ...{
          class_id: subject.class_id,
          class: subject.class_name,
          available_date: availableDate,
        },
      }

      return {
        data: dataObject,
        subject,
      }
    } catch (error) {
      console.error(error)
    }
  },
  data() {
    return {
      crumbItem: [
        {
          text: 'Subject1',
          routeObject: {
            name: 'sms-id-lms-subjects',
          },
        },
        { text: 'Subject2', routeObject: { name: 'sms-id-lms-subjects' } },
      ],
      components: [
        // {
        //   title: 'Details',
        //   component: 'LmsLessonViewDetails',
        // },
        {
          title: 'Details',
          component: 'LmsLessonViewContentMaterial',
        },
        {
          title: 'Exercise Summary',
          component: 'LmsLessonViewExerciseSummary',
        },
        {
          title: 'Students',
          component: 'LmsLessonViewStudent',
        },
      ],
    }
  },
  mounted() {
    this.setupBreadCrumb()
  },
  methods: {
    toEditRoute() {
      this.$router.push({
        name: 'sms-id-lms-subjects-subject-lesson-lesson-edit',
        params: {
          lesson: this.$route.params.lesson,
        },
      })
    },
    async publishLesson() {
      try {
        await this.$axios.$put(
          `./schools/v3/lesson/${this.$route.params.lesson}/draft/publish/`
        )
        await this.$nuxt.refresh()
      } catch (error) {
        console.log(error)
      }
    },
    async unPublishLesson() {
      try {
        await this.$axios.$get(
          `./schools/v3/lesson/${this.$route.params.lesson}/unpublish/`
        )
        await this.$nuxt.refresh()
      } catch (error) {
        console.log(error)
      }
    },
    setupBreadCrumb() {
      this.crumbItem = [
        {
          text: 'Subjects',
          routeObject: {
            name: 'sms-id-lms-subjects',
          },
        },
        {
          text: this.data.subject_name,
          routeObject: {
            name: 'sms-id-lms-subjects-subject',
            params: {
              subject: this.$route.params.subject,
            },
          },
        },
        { text: this.data.name },
      ]
    },
  },
}
</script>

<style scoped>
.class {
  background-color: brown;
}
</style>
