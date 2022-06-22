<template>
  <div>
    <div class="site-topbar px-lg-4">
      <div class="d-flex align-items-center">
        <div class="pointer d-lg-none" @click="$nuxt.$emit('openSidebar')">
          <span
            class="iconify fs-28 text-light line-height-0"
            data-inline="false"
            data-icon="eva:menu-fill"
          ></span>
        </div>
        <div class="ml-3 ml-lg-0 d-md-block d-none">
          <div class="d-flex align-items-center">
            <slot> </slot>

            <!-- <pre class="mt-5 pt-5">{{ getSchoolName }}</pre> -->
            <!-- <pre>{{ menuData }}</pre> -->
            <!-- <h2
              v-for="(menu, index) in menuData"
              :key="index"
              class="schoolname mb-0"
            >
              {{ menu.name }}
            </h2> -->

            <h2 class="schoolname mb-0">{{ getSchoolName }}</h2>
          </div>

          <!-- 
          {{ getSchoolId.id }} -->
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <div class="ac-year-dropdown-label mr-2">Academic Year:</div>
        <div>
          <!-- <pre>{{ defaultValue }}</pre> -->
          <v-select
            class="customdropdown"
            placeholder="Select Year"
            label="name"
            :options="academicyears"
            :reduce="(option) => option.id"
            @input="sendacademic"
          >
          </v-select>

          <!-- <select class="ac-year-dropdown" @change="sendacademic">
            <option v-for="(year, index) in academicyears" :key="index">
              {{ year.name }}
            </option>
          </select> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuData: {},
      academicyears: [],
      selected: {},
      defaultValue: {},
    }
  },
  async fetch() {
    const { data } = await this.$axios.get('lms/menu/')
    this.menuData = data.data.children_school

    // academic years

    const academicyears = await this.$axios.get(
      `communications/v2/family/school/${this.getSchoolId}/`
    )
    this.academicyears = academicyears.data.data.years

    //

    const children = await this.$axios.get(
      `communications/v2/family/year/${this.academicyears[0].id}/`
    )

    this.$store.commit('parent/SETSTUDENT', children.data.data.students)

    this.$store.dispatch('parent/setchildren', this.academicyears)

    // this.defaultValue = this.academicyears[0]
  },

  computed: {
    getSchoolId() {
      const school = this.$store.getters['parent/getParentSchool'](
        this.$route.params.id
      )
      return school.id
    },
    getSchoolName() {
      const school = this.$store.getters['parent/getParentSchool'](
        this.$route.params.id
      )
      return school.name
    },
    // getSchoolName() {
    //   const school = this.$store.getters['parent/getSchoolName'](
    //     this.$route.params.id
    //   )
    //   return school.id
    // },
  },

  // created() {
  //   this.$store.dispatch('parent/setchildren', this.academicyears)
  // },

  methods: {
    async sendacademic(value) {
      try {
        const { data } = await this.$axios.get(
          `communications/v2/family/year/${value}/`
        )

        this.$store.commit('parent/SETSTUDENT', data.data.students)

        console.log(data.data.students)
      } catch (e) {
        console.log(e)
      }
    },
    openSidebar() {
      this.$emit('open-sidebar')
      console.log('sidenbar')
    },
  },
}
</script>

<style scoped>
.schoolname {
  font-size: 16px;
  font-weight: 900;
}

.customdropdown {
  height: 36px;
  width: 163px;

  border-radius: 5px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 996;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  opacity: 0;
  background: none;
}

.fs14 {
  font-size: 14px;
}

@media (max-width: 768px) {
  .schoolname {
    font-size: 14px;
  }
  .fs14 {
    font-size: 12px;
  }
}
@media (max-width: 568px) {
  .schoolname {
    font-size: 12px;
  }
}
</style>
