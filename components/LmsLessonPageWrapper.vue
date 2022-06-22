<template>
  <div class="container">
    <div class="d-flex align-items-center justify-content-end flex-wrap mb-3">
      <!-- <BackwardNavigation text="Subject" /> -->
      <div class="d-flex align-items-center justify-content-end mb-2">
        <div>
          <div class="dropdown">
            <button
              id="dropdownMenuButton"
              class="btn btn-primary py-2 px-3 dropdown-toggle"
              type="button"
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
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="$emit('save:draft')"
                >Save as draft</a
              >
              <a class="dropdown-item" @click.prevent="$emit('save:publish')"
                >Save and Publish</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-white mb-3">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-xl-6 mb-3 mb-xl-0">
            <div class="wizard-steps">
              <div
                v-for="(menu, index) in menuItem"
                :key="index"
                class="step pointer"
                :class="[Number($route.query.step) === index ? 'active' : '']"
                @click="goto(index)"
              >
                <span>{{ index + 1 }}</span>
                {{ menu }}
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-5 col-md-5 col-sm-6 mb-3 mb-sm-0">
            <div class="fs-14 text-light">Subject:</div>
            <div class="fs-14 text-dark">
              {{ subjectName }}
            </div>
          </div>
          <div class="col-xl-3 col-lg-5 col-md-5 col-sm-6 mb-0">
            <div class="fs-14 text-light">Class:</div>
            <div class="fs-14 text-dark">{{ className }}</div>
          </div>
        </div>
        <hr class="my-3" />
        <slot></slot>
        <!-- <transition name="fade">
          <LmsSetupLesson
            v-show="$route.query.step === '0'"
            @lesson:details="lesson = $event"
          />
        </transition>
        <transition name="fade">
          <LmsLessonContent
            v-show="$route.query.step === '1'"
            @content:details="content = $event"
          />
        </transition>
        <transition name="fade">
          <LmsLessonExercise
            v-show="$route.query.step === '2'"
            @exercise:details="exercise = $event"
          />
        </transition> -->

        <div class="mt-4 d-flex align-items-center justify-content-end">
          <button
            v-if="Number($route.query.step) >= 1"
            class="btn btn-outline-primary py-2 px-3 ml-3"
            @click="prev()"
          >
            Previous
          </button>
          <button
            v-if="Number($route.query.step) <= 0"
            class="btn btn-outline-primary py-2 px-3 ml-3"
            @click="next()"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMsgBox from '@/mixins/modalMsgBox'
export default {
  mixins: [modalMsgBox],
  props: {
    subjectName: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      menuItem: ['Setup Lesson', 'Lesson Content'],
    }
  },
  mounted() {
    this.$router.replace({
      query: {
        step: 0,
        ...this.$route.query,
      },
    })
  },
  methods: {
    next() {
      this.$router.replace({
        query: {
          ...this.$route.query,
          step: Number(this.$route.query.step) + 1,
        },
      })
    },
    prev() {
      this.$router.replace({
        query: {
          ...this.$route.query,
          step: Number(this.$route.query.step) - 1,
        },
      })
    },
    goto(index) {
      this.$router.replace({
        query: { ...this.$route.query, step: index },
      })
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
