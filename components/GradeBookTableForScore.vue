<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-end mb-3"
      style="margin-top: -0.5rem"
    >
      <BaseButton class="btn btn-primary py-2 px-3" @click="saveEntry()">
        Save Entry
      </BaseButton>
    </div>
    <div class="table-container mt-0">
      <div v-if="busy" class="row">
        <div class="col text-center text-capitalize m-2 p-3">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
            variant="primary"
          ></b-spinner>
        </div>
      </div>
      <div v-else class="table-responsive">
        <table class="table table-bordered gradebook-details-table">
          <thead class="border-top">
            <tr>
              <th
                scope="col"
                class="sortable border-right-0 border-left-0 border-top-0"
              >
                <span class="sort-arrows">First Name</span>
              </th>
              <th scope="col" class="sortable border-left-0 border-top-0">
                <span class="sort-arrows">Last Name</span>
              </th>
              <th
                scope="col"
                class="sortable text-center border-top-0 border-bottom-0"
                style="width: 120px"
              >
                <span class="sort-arrows justify-content-center">Score</span>
              </th>
              <th
                scope="col"
                class="border-right-0 border-top-0 w-50 border-bottom-0"
              >
                Comments
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(score, index) in dataField" :key="index">
              <td class="border-right-0 border-left-0">
                {{ score.first_name }}
              </td>
              <td class="border-left-0 border-right-0">
                {{ score.last_name }}
              </td>
              <td class="input-cell input-cell-score">
                <div class="h-100">
                  <input
                    v-model.number="score.score"
                    type="number"
                    class="form-control"
                    placeholder="Enter Score"
                  />
                </div>
              </td>
              <td class="input-cell">
                <div class="h-100">
                  <input
                    v-model="score.comment"
                    type="text"
                    class="form-control text-left"
                    placeholder="No Comment"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scores: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dataField: [],
      busy: false
    }
  },
  watch: {
    scores: {
      handler() {
        this.dataField = this.scores
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async saveEntry() {
      this.busy = true
      try {
        const { data } = await this.$axios.$put(
          `./schools/v2/class/subject/${this.$route.params.subject}/gradebook/${this.$route.params.grade_book}/`,
          {
            scores: this.dataField
          }
        )
        this.dataField = data.scores
      } catch (error) {
        console.log(error)
      }
      this.busy = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
