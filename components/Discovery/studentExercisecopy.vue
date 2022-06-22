<template>
  <div
    class="col card my-3 border p-3"
    :style="{ backgroundColor: '#F4FBFF', borderColor: '#DBE1E5' }"
  >
    <div class="d-flex justify-content-between">
      <p class="" :style="{ fontWeight: '1000' }">Exercises</p>
    </div>
    <div class="row mx-auto">
      <div
        v-for="(exercise, exerciseIndex) in school.exercises.slice(0, 4)"
        :key="exerciseIndex"
        :style="{
          minWidth: `14rem`,
          maxWidth: `14rem`,
          cursor: 'pointer',
          height: `8rem`,
          backgroundColor: exercise.subject_details.icon_data.icon_bg_color,
          'background-image': 'url(' + exercise.subject_details.icon_data.icon + ')',
          'background-repeat': 'no-repeat, repeat',
          'background-size': '200px 85px',
          'background-position': '50% 60%',
          color: exercise.subject_details.icon_data.icon_font_color,
        }"
        class="col d-flex flex-column justify-content-between p-2 m-1 move rounded"
        @click="
          $router.push(
            `/student/lms/${school.school_details.code}/exercises/${exercise.id}`
          )
        "
      >
        <div style="bac"></div>
        <span class="mr-3 subject-badge">{{ exercise.subject_details.name }} </span>

        <div
          :style="{ zIndex: 1, fontWeight: 600 }"
          class="smallfont d-flex justify-content-center"
        >
          {{ exercise.name }}
        </div>
      </div>
    </div>
    <p
      class="text-primary"
      :style="{ cursor: 'pointer' }"
      @click="$router.push(`/student/lms/${school.school_details.code}/exercises`)"
    >
      See more >
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
  font-size: 12px;
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
.animate {
  transition: all 0.3s;
}
.move {
  transition: transform 0.3s ease-out;
}
.move:hover {
  transform: translate(0, -5px);
}
</style>
