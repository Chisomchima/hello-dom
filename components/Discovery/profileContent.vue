<template>
  <div class="px-4 px-lg-0 card mx-lg-2 px-lg-4" :style="{ backgroundColor: 'inherit' }">
    <div v-if="user" class="relativecontainer badgerel pt-3 mt-lg-5">
      <h1 class="text-left text-dark usernamedetails mt-md-3">
        Happy New Year {{ user.first_name }}👋🏽
      </h1>
      <h2 class="text-left text-dark smalltxt">Ready to jump back in?</h2>
    </div>
    <div v-for="(profile, profileIndex) in userProfiles" :key="profileIndex">
      <transition name="fade">
        <div v-if="profile.length">
          <!-- if the data is for a student -->
          <div v-if="profile[0].student_details" class="row">
            <div v-for="(school, schoolIndex) in profile" :key="schoolIndex" class="col">
              <!-- <div
              class="d-flex align-items-center bg-light rounded px-2"
              :style="{ cursor: 'pointer' }"
              @click="
                $router.push(`/student/lms/${school.school_details.code}}/dashboard`)
              "
            >
              <div class="d-flex align-items-center children-card">
                <div class="mr-2">
                  <img
                    alt="School Crest"
                    height="42"
                    width="42"
                    class="rounded-circle"
                    :src="school.school_details.crest"
                  />
                </div>

                <div class="font16 font-museo" :style="{ fontWeight: '900' }">
                  {{ school.student_details.name }} <br /><span
                    class="text-grey font-museo"
                  >
                  </span>
                </div>
                <div class="mx-1"><p class="mb-0">@</p></div>
              </div>
              <div class="rounded py-2 my-2">
                {{ school.school_details.name }}
              </div>
            </div> -->
              <div class="row pc">
                <DiscoveryStudentLessons :school="school" />

                <DiscoveryStudentExercise :school="school" />
              </div>
            </div>
          </div>

          <!-- if the data is for a staff -->

          <div v-else-if="profile[0].staff_details" class="">
            <div class="row">
              <div
                class="col-sm-6 col-md-4 my-3 my-sm-0"
                v-for="(school, schoolIndex) in profile"
                :key="schoolIndex"
              >
                <div
                  class="bg-white br-10"
                  @click="$router.push(`/sms/${school.school_details.code}/lms`)"
                >
                  <div class="d-flex align-items-center justify-content-center py-3">
                    <div
                      class="schooltitle schoolimageplaceholder d-flex align-items-center px-3 py-2"
                    >
                      <img :src="school.school_details.crest" alt="" class="img-fluid" />

                      <h3 class="schooltext fs-16 text-center mx-3 mb-0">
                        {{ school.school_details.name }}
                      </h3>
                    </div>
                  </div>

                  <div class="staffinfo px-3 mx-1">
                    <div class="staffplaceholder py-3 d-flex align-items-center">
                      <img
                        :src="`https://demo.slate.ng/assets/img/${
                          school.staff_details.gender === 'female' ? 'female' : 'male'
                        }-young.jpeg`"
                        alt=""
                        class="img-fluid mx-2"
                      />

                      <h3 class="schooltext fs-16 mb-0 mx-2">
                        {{ school.staff_details.first_name }}
                        {{ school.staff_details.last_name }}
                      </h3>
                    </div>

                    <div class="pb-3">
                      <div class="bluebg my-2">
                        <div class="d-flex justify-content-between px-3 py-2">
                          <p class="mb-0 fs-12">Designation</p>

                          <p class="mb-0 fs-12">
                            {{ school.school_position }}
                          </p>
                        </div>
                      </div>
                      <div class="bluebg my-2">
                        <div class="d-flex justify-content-between px-3 py-2">
                          <p class="mb-0 fs-12">Employee Number</p>

                          <p class="mb-0 fs-12">
                            {{ school.staff_details.employee_id_number }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- if the data is for a parent -->

          <div v-else></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userProfiles: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      cardWidth: 40,
      cardHeight: 40,
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    hoverOut(e) {
      // const l = `card${e}`
      // console.log(this.$refs.l)
      this.cardWidth = 30;
      this.cardHeight = 40;
    },
    hoverin() {
      this.cardWidth = 35;
      this.cardHeight = 45;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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

.br-10 {
  border-radius: 10px;
}

.schoolimageplaceholder img {
  width: 50px;
  height: 50px;
}

.staffplaceholder img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.schooltitle {
  background: #dff2ff;
  width: 90%;
}

.bluebg {
  background: #f2faff;
}

.usernamedetails {
  font-size: 20px;
}

.smalltxt {
  font-size: 14px;
}

@media (max-width: 694px) {
  .usernamedetails {
    font-size: 14px;
  }

  .smalltxt {
    font-size: 12px;
  }
}
</style>
