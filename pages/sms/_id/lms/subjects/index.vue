<template>
  <div class="row">
    <div class="col">
      <UtilsFilterComponent
        disable-visualization
        disable-pagination
        @search-input="getSubject($event)"
      >
        <div v-if="busy" class="row">
          <div v-for="index in 6" :key="index" class="col-4 py-2">
            <b-skeleton-img class="rounded" height="180px"></b-skeleton-img>
          </div>
        </div>
        <div v-else class="row">
          <template v-if="items.length > 0">
            <UtilsMiniColorCard
              v-for="(item, index) in items"
              :key="index"
              :subject="item"
              :name="item.subject"
              :bg-color="item.icon_data.icon_bg_color"
              :color="item.icon_data.icon_font_color"
              :teacher="
                item.teachers.length > 0
                  ? item.teachers[0].first_name +
                    ' ' +
                    item.teachers[0].last_name
                  : ''
              "
              :code="item.code"
              :lessons-count="item.lesson_count"
              :school-class="item.school_class"
              :grade-book-count="item.gradebook_count"
              :exercise-count="item.exercise_count"
              @click="routeTo(item)"
            />
          </template>
          <template v-else>
            <!-- <div class="row"> -->
            <div class="col w-100 mx-auto text-center">
              <img
                src="~/assets/img/empty-box.svg"
                alt="permission denied image"
                class="img-fluid"
              />
              <h6 class="tet-gray">No Subject to show</h6>
              <!-- </div> -->
            </div>
          </template>
        </div>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="right"
          class="my-0"
        ></b-pagination>
      </UtilsFilterComponent>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      busy: false,
      currentPage: 1,
      perPage: 12,
      totalRows: 0,
    }
  },
  watch: {
    async currentPage() {
      this.busy = true
      const data = await this.getData()
      this.items = data.data
      this.totalRows = data.pages * this.perPage
      this.busy = false
      // this.$nuxt.$loading.finish()
    },
  },
  async mounted() {
    try {
      await this.getSubject()
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async getData(search = '') {
      try {
        const data = await this.$axios.$get(
          `schools/v2/lms/${this.$store.state.school.currentAcademicYear.id}/subjects/?page=${this.currentPage}&search=${search}`
        )
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async getSubject(search = '') {
      try {
        this.busy = true
        const data = await this.getData(search)
        this.items = data.data
        this.totalRows = data.pages * this.perPage
        this.busy = false
      } catch (error) {
        console.log(error)
      }
    },
    routeTo(item) {
      this.$router.push({
        name: 'sms-id-lms-subjects-subject',
        params: {
          subject: item.id,
        },
        query: { _name: `${item.name}` },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
