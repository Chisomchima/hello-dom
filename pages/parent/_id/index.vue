<template>
  <div>
    <div class="mt-5">
      <!-- <pre>{{ getChildren }}</pre> -->
      <p class="parentheader">
        Children/Wards
        <span>
          <span v-if="getChildren"> ({{ getChildren.length }})</span>
        </span>
      </p>
    </div>

    <!-- <div v-if="$fetchState.pending" class="row mt-4">
      <div v-for="(n, index) in 6" :key="index" class="col-lg-4 col-sm-6">
        <b-skeleton-img height="195px"></b-skeleton-img>
      </div>
    </div> -->

    <div v-if="getChildren">
      <div v-if="Object.keys(getChildren).length !== 0" class="mt-4 row">
        <div
          v-for="(children, index) in getChildren"
          :key="index"
          class="col-lg-4 col-sm-6"
        >
          <!-- <pre>{{ getChildren }}</pre> -->
          <PagesParentChildCard :children="children" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'parent',
  data() {
    return {
      childrenData: {},
      academicyears: [],
    }
  },

  async fetch() {
    // academic years

    const academicyears = await this.$axios.get(
      `communications/v2/family/school/${this.getSchoolId}/`
    )
    this.academicyears = academicyears.data.data.years

    console.log('ACADEMIC YEARS', this.academicyears)

    const { data } = await this.$axios.get(
      `communications/v2/family/year/${this.academicyears[0].id}/`
    )

    // this.$store.commit('parent/SETSTUDENT', data.data.students)

    this.childrenData = data.data.students

    // if (localStorage.getItem('reloaded')) {
    //   localStorage.removeItem('reloaded')
    // } else {
    //   localStorage.setItem('reloaded', '1')
    //   window.location.reload()
    // }

    //
  },

  computed: {
    getSchoolId() {
      const school = this.$store.getters['parent/getParentSchool'](
        this.$route.params.id
      )
      return school.id
    },

    getChildren() {
      return this.$store.getters['parent/getChildren']
    },
  },
  watch: {
    '$route.params.student'() {
      this.$fetch()
    },
  },
  mounted() {
    console.log(this.$route)
  },
}
</script>

<style scoped>
.parentheader {
  font-family: Brown;
  font-size: 19px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0px;
}
</style>