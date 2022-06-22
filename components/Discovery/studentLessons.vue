<template>
  <div
    class="card more my-3 p-2 col-md-6 mb-5"
    :style="{
      backgroundColor: 'inherit',
    }"
  >
    <div
      class="d-flex justify-content-between align-items-center"
      :style="{ height: '5rem' }"
    >
      <nuxt-link :to="'/student/lms/' + school.school_details.code + '/dashboard'">
        <img
          alt="School Crest"
          height="42"
          width="42"
          class="rounded-circle"
          :src="school.school_details.crest"
        />
      </nuxt-link>

      <p class="mt-2 mx-2 lessonstitlecontent">
        Lessons @ {{ school.school_details.name }}
      </p>
    </div>
    <!-- lessons loop starts here -->
    <div class="row d-flex justify-content-center more2">
      <div
        v-for="(lesson, lessonIndex) in school.lessons.slice(0, 4)"
        :key="lessonIndex"
        :ref="`card${lessonIndex}`"
        class="mb-4 rounded mr-2"
        :style="{
          'min-width': '10rem',
          'max-width': '13rem',
          'box-shadow': '0px 4px 8px #cdd4cf',
          cursor: 'pointer',
        }"
        @click="
          $router.push(`/student/lms/${school.school_details.code}/lessons/${lesson.id}`)
        "
      >
        <div
          :style="{
            cursor: 'pointer',
            height: '4rem',
            transition: 'transform 0.3s ease-out',
            'background-color': lesson.class_subject.icon_data.icon_bg_color,

            'background-image':
              'url(data:image/svg+xml;base64,' +
              lesson.class_subject.icon_data.icon_base_64 +
              ')',
            'background-repeat': 'no-repeat, repeat',
            'background-size': '200px 45px',
            'background-position': '50% 10%',
            position: 'relative',
          }"
          class="move rounded-top d-flex justify-content-end"
        >
          <div
            :style="{
              position: 'absolute',
              bottom: '-2px',
            }"
          >
            <span class="smallfont subject-badge-custom">
              {{ lesson.subject_details.name }}
            </span>
          </div>
        </div>

        <div class="rounded-bottom">
          <div
            class="mb-0"
            :style="{
              height: '2.2rem',
              maxWidth: '10rem',
            }"
          >
            <p
              class="smallfont mb-0 pb-0 my-0 m-2"
              :style="{ zIndex: 1, fontWeight: 600 }"
            >
              {{ " " + lesson.name }}
            </p>
          </div>

          <div class="d-flex justify-content-between mb-0 mx-2">
            <span
              class="smallerfont text-primary"
              :style="{ zIndex: 1, fontWeight: 600 }"
            >
              Due Date:
            </span>
            <span class="smallerfont text-secondary">
              {{ lesson.available_date.slice(0, 10) + " " }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <p
      class="text-primary ml-2"
      :style="{ cursor: 'pointer' }"
      @click="$router.push(`/student/lms/${school.school_details.code}/lessons`)"
    >
      See all Lessons >
    </p>
  </div>
</template>

<script>
export default {
  props: {
    school: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      cardWidth: 40,
      cardHeight: 40,
    };
  },
};
</script>

<style scoped>
.smallfont {
  font-size: 13px;
}
.smallerfont {
  font-size: 12px;
}
.lessonstitlecontent {
  font-size: 16px;
  font-weight: 1000;
}

@media (max-width: 700px) {
  .lessonstitlecontent {
    font-size: 12px;
  }
}

.subject-badge {
  background: rgba(255, 255, 255, 0.9);
  color: #4f6373;
  text-align: center;
  font-size: 12px;
  min-width: 74px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 2px;
  border-radius: 4px;
  z-index: 1;
}

.br-10 {
  border-radius: 10px;
}

.schoolimageplaceholder img {
  width: 50px;
  height: 50px;
}

.schooltitle {
  background: #dff2ff;
  width: 90%;
}

.bluebg {
  background: #f2faff;
}
.more {
  /* min-width: 19rem; */
  border: 2px;
}
.more2 {
  /* min-width: 10rem; */
}

.move:hover {
  transition: all 0.7s;

  transform: translate(0, -5px);
}
.subject-badge-custom {
  background: rgba(255, 255, 255, 0.9);
  color: #4f6373;
  text-align: center;
  font-size: 12px;
  min-width: 74px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 2px;
  /* border-radius: 4px; */
  z-index: 1;
}
</style>
