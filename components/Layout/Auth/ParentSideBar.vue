<template>
  <div>
    <div
      v-if="isShowing"
      class="modal-overlay"
      :class="{ show: isShowing }"
      @click="isShowing = false"
    ></div>
    <div
      id="site-sidebar font-brown"
      class="site-sidebar parentsidebarwidth"
      style="overflow: hidden"
      :class="{ show: isShowing }"
    >
      <div>
        <div
          class="sidebar-items-wrapper font-brown mx-3"
          style="overflow-x: hidden"
        >
          <div class="topbar-school-selector d-md-block d-block">
            <div class="d-flex justify-content-between align-items-center">
              <p
                class="
                  d-lg-flex
                  align-items-lg-center
                  my-3
                  childheader
                  greytext
                "
              >
                Child/Ward
              </p>

              <div style="cursor: pointer">
                <span class="iconcolor" @click="gotoPrevChild">
                  <span
                    class="iconify"
                    data-icon="akar-icons:chevron-left"
                  ></span>
                </span>
                <span class="iconcolor" @click="gotoNextChild">
                  <span
                    class="iconify"
                    data-icon="akar-icons:chevron-right"
                  ></span>
                </span>
              </div>
            </div>

            <div class="mt-1">
              <div class="lightestbluebg rounded p-3">
                <div v-if="$fetchState.pending">
                  <div class="d-flex justify-content-center mb-3">
                    <b-skeleton-icon
                      icon="person-fill"
                      :icon-props="{ fontScale: 2, variant: 'dark' }"
                      class="img-fluid rounded-circle childrenimg"
                    ></b-skeleton-icon>
                  </div>
                  <p class="text-center studentdataname mb-0">
                    <b-skeleton></b-skeleton>
                  </p>

                  <div class="mt-3">
                    <div
                      class="
                        d-flex
                        justify-content-between
                        align-items-center
                        my-2
                      "
                    >
                      <p class="mb-0 fs-12 greytext">Class:</p>
                      <p class="mb-0 fs-12">
                        <b-skeleton></b-skeleton>
                      </p>
                    </div>
                    <div
                      class="
                        d-flex
                        justify-content-between
                        align-items-center
                        my-2
                      "
                    >
                      <p class="mb-0 fs-12 greytext">Admission No:</p>
                      <p class="mb-0 fs-12">
                        <b-skeleton></b-skeleton>
                      </p>
                    </div>
                    <div
                      class="
                        d-flex
                        justify-content-between
                        align-items-center
                        my-2
                      "
                    >
                      <p class="mb-0 fs-12 greytext">Class Teacher:</p>
                      <p class="mb-0 fs-12" style="white-space: nowrap">
                        <b-skeleton></b-skeleton>
                      </p>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="d-flex justify-content-center mb-3">
                    <img
                      v-if="studentData.student_image"
                      class="img-fluid rounded-circle childrenimg"
                      :src="studentData.student_image"
                    />

                    <img
                      v-else
                      class="img-fluid rounded-circle childrenimg"
                      :src="
                        require(`~/assets/img/${
                          studentData.student_gender === 'male'
                            ? 'male'
                            : 'female'
                        }-young.jpeg`)
                      "
                    />
                  </div>
                  <p class="text-center studentdataname mb-0">
                    {{ studentData.student_name }}
                  </p>

                  <div class="mt-3">
                    <div
                      class="
                        d-flex
                        justify-content-between
                        align-items-center
                        my-2
                      "
                    >
                      <p class="mb-0 fs-12 greytext">Class:</p>
                      <p class="mb-0 fs-12">
                        {{ studentData.school_class_name }}
                      </p>
                    </div>
                    <div
                      class="
                        d-flex
                        justify-content-between
                        align-items-center
                        my-2
                      "
                    >
                      <p class="mb-0 fs-12 greytext">Admission No:</p>
                      <p class="mb-0 fs-12">
                        {{ studentData.school_admission_number }}
                      </p>
                    </div>
                    <div
                      class="
                        d-flex
                        justify-content-between
                        align-items-center
                        my-2
                      "
                    >
                      <p class="mb-0 fs-12 greytext">Class Teacher:</p>
                      <p class="mb-0 fs-12" style="white-space: nowrap">
                        {{
                          studentData.school_class_teacher
                            ? studentData.school_class_teacher.length > 14
                              ? studentData.school_class_teacher.slice(0, 14) +
                                '...'
                              : studentData.school_class_teacher
                            : ''
                        }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <!-- <div class="my-2">
                <NuxtLink
                  :to="`/parent/${$route.params.id}/${$route.params.students}/${$route.params.student}/${$route.params.studentid}/communication`"
                  class="nav-item"
                >
                  <span class="mr-3" style="color: #73778c">
                    <span
                      class="iconify"
                      data-icon="bi:chat-dots-fill"
                      data-width="15"
                      data-height="15"
                    ></span>
                  </span>
                  <span class="nav-item-text text-capitalize fs-14">
                    Communication Log
                  </span>
                </NuxtLink>
              </div> -->
              <div class="my-2">
                <NuxtLink
                  :to="`/parent/${$route.params.id}/${$route.params.students}/${$route.params.student}/${$route.params.studentid}/gradebook`"
                  class="nav-item"
                >
                  <span class="mr-3" style="color: #73778c">
                    <span
                      class="iconify"
                      data-icon="fluent:notepad-edit-16-filled"
                      data-width="15"
                      data-height="15"
                    ></span>
                  </span>
                  <span class="nav-item-text text-capitalize fs-14">
                    Grade Book
                  </span>
                </NuxtLink>
              </div>
              <div class="my-2">
                <NuxtLink
                  :to="`/parent/${$route.params.id}/${$route.params.students}/${$route.params.student}/${$route.params.studentid}/reportcard`"
                  class="nav-item"
                >
                  <span class="mr-3" style="color: #73778c">
                    <span
                      class="iconify"
                      data-icon="uis:graph-bar"
                      data-width="15"
                      data-height="15"
                    ></span>
                  </span>
                  <span class="nav-item-text text-capitalize fs-14">
                    Report Card
                  </span>
                </NuxtLink>
              </div>
              <div class="my-2">
                <NuxtLink
                  :to="`/parent/${$route.params.id}/${$route.params.students}/${$route.params.student}/${$route.params.studentid}/exercises`"
                  class="nav-item"
                >
                  <span class="mr-3" style="color: #73778c">
                    <span
                      class="iconify"
                      data-icon="ant-design:exclamation-circle-filled"
                      data-width="15"
                      data-height="15"
                    ></span>
                  </span>
                  <span class="nav-item-text text-capitalize fs-14">
                    Assignments
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isMobile: false,
      isShowing: false,
      studentData: {},
      nextadmissionid: '',
      nextclassid: '',
      tempArr: [],
      nextData: [],
      current: 1,
    }
  },
  async fetch() {
    //
    // this.studentData = {}

    try {
      const studentdata = await this.$axios.get(
        `communications/v2/family/class/${this.$route.params.student}/admission/${this.$route.params.students}`
      )
      this.studentData = studentdata.data.data

      console.log('STUDENT DATAAA exist? IS:::::', this.studentData)
      console.log(
        'STUDENT DATAAA IS:::::',
        this.studentData.data[0].student_json.class_student_id
      )
    } catch (e) {
      console.log(e)
    }
    //
  },
  computed: {
    ...mapState('parent', ['student', 'children']),
  },
  watch: {
    '$route.params.student'() {
      this.$fetch()
    },
  },

  mounted() {
    this.$nuxt.$on('openSidebar', () => {
      this.isMobile = !this.isMobile
      this.isShowing = !this.isShowing
    })
    try {
      // console.log('HAPPIII LOOK AT THIS!!!', this.student)

      this.children.forEach((element) => {
        this.nextData.push({
          admission_id: element.admission_id,
          school_class_id: element.school_class_id,
          class_student_id: element.class_student_id,
        })
      })
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    gotoNextChild() {
      if (this.current >= 1 && this.current < this.nextData.length) {
        this.current++

        const newData = this.nextData.slice(this.current - 1, this.current)

        newData.forEach((element) => {
          this.$router.push({
            name: 'parent-id-students-student-studentid-gradebook',
            params: {
              id: this.$route.params.id,
              students: element.admission_id,
              student: element.school_class_id,
              studentid: element.class_student_id,
            },
          })
          // this.studentData = {}
        })
      } else {
        this.current--
      }

      // await this.$fetch()
    },

    gotoPrevChild() {
      if (this.current > 1) {
        this.current--

        const newData = this.nextData.slice(this.current - 1, this.current)

        newData.forEach((element) => {
          this.$router.push({
            name: 'parent-id-students-student-studentid-gradebook',
            params: {
              id: this.$route.params.id,
              students: element.admission_id,
              student: element.school_class_id,
              studentid: element.class_student_id,
            },
          })
        })
      }
    },

    created() {
      this.$nuxt.$on('openSidebar', () => {
        this.isMobile = !this.isMobile
        this.isShowing = !this.isShowing
      })
    },

    openSide() {
      alert('hey')
      this.isMobile = !this.isMobile
    },
  },
}
</script>

<style scoped>
.childheader {
  font-family: Brown;
  font-size: 12px;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: -0.5px;
  text-align: left;
}

.studentdataname {
  font-family: Brown;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: -0.5px;
  text-align: left;
}

.childrenimg {
  height: 48px;
  width: 48px;
}

.lightestbluebg {
  background: #eff5fb;
}

.iconcolor {
  color: #1070b7;
}

.iconcolor:hover {
  color: #b8daf5;
}

.greytext {
  color: #6f7984;
}

.nav-item-icon {
  z-index: 999;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 900;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  background: rgba(0, 0, 0, 0.2);
}

.site-sidebar {
  z-index: 901 !important;
}

.bold {
  font-weight: 900;
}

.site-sidebar .nav-item .nav-item-icon {
  line-height: 0;
}
.site-sidebar .nav-item .nav-item-icon svg {
  height: 36px;
  width: 36px;
}
.site-sidebar .nav-item .nav-item-icon svg path {
  fill: #8f9aa3;
}

.site-sidebar.show .dontshow {
  display: none;
}

.nuxt-link-exact-active {
  background: rgba(16, 112, 183, 0.1) !important;
}
.nuxt-link-active {
  background: rgba(16, 112, 183, 0.1) !important;
}
.nuxt-link-active .nav-item-text {
  color: #0d6cbb !important;
}

.nuxt-link-active .nav-item-icon {
  color: #0d6cbb !important;
}
.nuxt-link-exact-active .nav-item-text {
  color: #0d6cbb !important;
}

.nuxt-link-exact-active .nav-item-icon {
  color: #0d6cbb !important;
}

.nav-item {
  border-radius: 8px;
  position: relative;
}
</style>
