<template>
  <div>
    <UtilsHeaderCardWithColor
      :disable-action="true"
      enable-image
      :color="data.icon_data.icon_font_color"
      :img-src="data.icon_data.icon"
      :img-src-base64="'data:image/svg+xml;base64,' + data.icon_data.icon_base_64"
      :bg-color="data.icon_data.icon_bg_color"
      :title="data.subject_name"
      :data="data"
      :display-key="[
        'teachers',
        'lessons_count',
        'gradebook_count',

        'subject_code',
        'exercise_count',
      ]"
      @edit="$bvModal.show('media-modal')"
    >
      <template #teachers="{ value }">
        <span
          :style="{
            color: `${data.icon_data.icon_font_color} !important`,
          }"
        >
          {{
            value.designation === "form_teacher"
              ? value.first_name + " " + value.last_name
              : ""
          }}
        </span>
      </template>
      <template #teachers-label>
        <span
          :style="{
            color: `${data.icon_data.icon_font_color} !important`,
            'font-size': '14px',
          }"
          >Teacher:
        </span>
      </template>
      <template #lessons_count-label>
        <span
          :style="{
            color: `${data.icon_data.icon_font_color} !important`,
            'font-size': '14px',
          }"
          >Lessons:
        </span>
      </template>
      <template #exercise_count-label>
        <span
          :style="{
            color: `${data.icon_data.icon_font_color} !important`,
            'font-size': '14px',
          }"
          >Exercises:
        </span>
      </template>
    </UtilsHeaderCardWithColor>

    <UtilsBaseCardTab>
      <UtilsCardTab title="Lessons">
        <StudentSubjectLessons :data="data" :live-class="data.live_class" />
      </UtilsCardTab>
      <UtilsCardTab title="Exercise">
        <StudentSubjectExercise
          :data="data"
          :class-details="{
            classIid: data.class_id,
            className: data.class_name,
            subjectName: data.subject_name,
          }"
        />
      </UtilsCardTab>
      <UtilsCardTab title="Gradebook">
        <StudentSubjectGradebook :parent="data" />
      </UtilsCardTab>
      <UtilsCardTab title="Scheme of Work">
        <student-schemeof-work :data="data.scheme_of_work" />
      </UtilsCardTab>

      <UtilsCardTab title="Resources">
        <LmsSubjectResources :is-teacher-page="false" />
      </UtilsCardTab>
    </UtilsBaseCardTab>
    <lms-class-subject-edit-media-modal
      :subject="data"
      @refresh="$nuxt.refresh()"
    ></lms-class-subject-edit-media-modal>
  </div>
</template>

<script>
import studentSchemeofWork from "~/components/studentSchemeofWork.vue";
export default {
  components: { studentSchemeofWork },
  async asyncData({ $axios, route }) {
    // `schools/v2/lms/subject/${route.params.subject}/`

    const { data } = await $axios.$get(`lms/v3/class/subject/${route.params.subject}`);
    return {
      data,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
