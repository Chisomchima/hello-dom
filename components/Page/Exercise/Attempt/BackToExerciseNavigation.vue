<template>
  <div class="d-flex align-items-center justify-content-end flex-wrap mb-3">
    <!-- <div class="page-back-navigation mb-2 mr-2">
      <a
        href="#"
        @click="
          $router.push(
            `/sms/${$store.state.administration.school.code}/lms/excercises`
          )
        "
      >
        <span class="pr-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8337 10H4.16699"
              stroke="#1070B7"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.0003 15.8334L4.16699 10L10.0003 4.16671"
              stroke="#1070B7"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span>Excercise</span>
      </a>
      <span class="mx-2"
        ><span
          class="iconify"
          data-inline="false"
          data-icon="fluent:chevron-right-16-filled"
          style="height: 15px; color: #8f9aa3"
        ></span
      ></span>
      <a
        href="#"
        @click="
          $router.push(
            `/sms/${$store.state.administration.school.code}/lms/excercises/${$route.params.excercise}`
          )
        "
      >
        <span>{{ attempt.quiz_name }} </span>
      </a>

      <span class="mx-2"
        ><span
          class="iconify"
          data-inline="false"
          data-icon="fluent:chevron-right-16-filled"
          style="height: 15px; color: #8f9aa3"
        ></span
      ></span>
      <span> {{ attempt.student_name }}</span>
    </div> -->
    <div
      v-if="attempt.status !== 'marked'"
      class="d-flex align-items-center mb-2"
    >
      <div class="mr-3">
        <BaseButton @click="$emit('saveComplete')"> Grade </BaseButton>
      </div>
      <!-- <div>
        <div class="dropdown">
          <button
            class="btn btn-primary py-2 px-3 dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Save
          </button>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
          >
            <a class="dropdown-item" href="#">Save and continue later</a>
            <a class="dropdown-item" href="#" @click="$emit('saveComplete')"
              >Save and complete</a
            >
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackToExerciseNavigation',

  props: {
    attempt: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped></style>
