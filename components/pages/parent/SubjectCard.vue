<template>
  <div>
    <div class="row">
      <div
        v-for="(exercise, exerciseIndex) in exercises"
        :key="exerciseIndex"
        style="cursor: pointer"
        class="col-xl-3 col-12 col-sm-6 col-lg-6 col-md-6 mb-4"
      >
        <!-- <pre>{{ exercise.subject }}</pre> -->
        <div
          class="
            card
            bg-white
            card-shadowed
            rounded
            overflow-hidden
            font-family_brown
            line-height-100p
            pointer
          "
        >
          <div
            class="
              align-items-center
              d-flex
              justify-content-center
              position-relative
            "
            :style="{
              'background-color': exercise.subject.icon_data.icon_bg_color
                ? exercise.subject.icon_data.icon_bg_color
                : '#A4C2F4',
              height: '128px',
            }"
          >
            <img
              v-if="exercise.subject.icon_data"
              :src="exercise.subject.icon_data.icon"
              class="object-fit-contain"
              height="70px"
            />

            <div
              class="
                position-absolute
                bottom-0
                right-0
                px-lg-2
                py-1
                bg-white
                text-dark
                opacity-90p
              "
            >
              {{ exercise.subject.name }}
            </div>
          </div>
          <div class="px-3 py-3" key="">
            <div
              class="mb-1 text-dark font-weight-bold text-capitalize"
              style="height: 20px"
            >
              {{
                exercise.name
                  ? exercise.name.length > 28
                    ? exercise.name.slice(0, 28) + '...'
                    : exercise.name
                  : ''
              }}
            </div>
            <div class="text-light mt-4">
              <div class="mb-2 text-truncate text-secondary font-weight-bold">
                <span class="text-dark font-weight-bold text-capitalize">
                  {{ exercise.type }}</span
                >
              </div>
            </div>
            <div
              class="text-truncate fs-14 text-dark font-weight-bold mb-3"
              :style="{
                lineHeight: '1rem',
              }"
            >
              <div class="d-flex my-0 justify-content-between">
                <span class="text-secondary">
                  Due Date:
                  <span class="font-weight-bold text-dark">
                    {{ new Date(exercise.due_date).toLocaleDateString() }}
                  </span>
                </span>
              </div>
            </div>
            <div
              class="text-truncate fs-14 mb-0"
              :style="{
                lineHeight: '1rem',
              }"
            >
              <div class="d-flex my-0 justify-content-between">
                <span class="text-danger text-capitalize">
                  {{ exercise.state }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    exercises: {
      type: Array,
      default: () => [],
    },
  },

  //   computed: {
  //     school() {
  //       return this.$store.getters['school/getSchoolByCode'](
  //         this.$route.params.id
  //       )
  //     },
  //   },
  //   methods: {
  //     handleCardClick(e) {
  //       console.log(e)
  //       this.$router.push({
  //         name: 'student-lms-schoolId-exercises-exercise',
  //         params: { schoolId: this.$route.params.schoolId, exercise: e.id },
  //         query: { _name: `${e.name}` },
  //       })
  //     },
  //   },
}
</script>

<style scoped>
* {
  font-size: 0.85rem !important;
}
</style>
