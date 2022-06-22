<template>
  <div class="p-md-3">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Assignments</div>
    </div>
    <div class="row mb-4">
      <div class="col-md-4 my-2 my-md-0">
        <div class="exercisecard bg-white">
          <div class="d-flex justify-content-between p-4">
            <span>
              <!-- <span
                class="iconify"
                data-icon="vscode-icons:file-type-light-todo"
                style="color: #1070b7"
                data-width="40"
                data-height="40"
              ></span> -->
              <span
                class="iconify"
                data-icon="fluent:quiz-new-20-filled"
                style="color: #1070b7"
                data-width="40"
                data-height="40"
              ></span>
            </span>

            <h2 class="biggerheader mb-0">{{ exercisecount.exercises }}</h2>
          </div>

          <div class="mt-3 px-4">
            <p class="fs-16 lighttext">All Assignments</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 my-2 my-md-0">
        <div class="exercisecard pending bg-white">
          <div class="d-flex justify-content-between p-4">
            <span>
              <span
                class="iconify"
                data-icon="akar-icons:circle-alert-fill"
                style="color: #f0ba2f"
                data-width="40"
                data-height="40"
              ></span>
            </span>

            <h2 class="biggerheader mb-0">
              {{ exercisecount.pending_exercises }}
            </h2>
          </div>

          <div class="mt-3 px-4">
            <p class="fs-16 lighttext">Pending Assignments</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 my-2 my-md-0">
        <div class="exercisecard expired bg-white">
          <div class="d-flex justify-content-between p-4">
            <span>
              <span
                class="iconify"
                data-icon="icomoon-free:cancel-circle"
                style="color: #db6353"
                data-width="40"
                data-height="40"
              ></span>
            </span>

            <h2 class="biggerheader mb-0">{{ exercisecount.due_exercises }}</h2>
          </div>

          <div class="mt-3 px-4">
            <p class="fs-16 lighttext">Overdue Assignments</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card class-wrapper p-2">
      <div class="">
        <UtilsBaseCardTab>
          <UtilsCardTab title="Pending">
            <PagesParentNotTaken />
          </UtilsCardTab>
          <UtilsCardTab title="All">
            <div v-if="$fetchState.pending">
              <UtilsEmptyState text="Fetching Exercises" />
            </div>
            <div v-if="studentexercises.length < 1 && !$fetchState.pending">
              <UtilsEmptyState text="No Exercises" />
            </div>

            <PagesParentSubjectCard :exercises="studentexercises" />

            <div class="d-flex justify-content-end">
              <b-pagination
                v-model="currentPage"
                :per-page="perPage"
                :total-rows="count"
                align="right"
                class="my-0"
              ></b-pagination>
            </div>
          </UtilsCardTab>

          <UtilsCardTab title="Overdue">
            <PagesParentExpired />
          </UtilsCardTab>
        </UtilsBaseCardTab>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'parentdashboard',

  data() {
    return {
      count: 0,
      studentexercises: [],
      exercisecount: {},
      currentPage: 1,
      perPage: 12,
      pages: 10,
      totalpages: 10,
    }
  },

  async fetch() {
    const studentexercisescount = await this.$axios.get(
      `util/v2/mobile/exercises/${this.$route.params.studentid}/stat`
    )

    this.exercisecount = studentexercisescount.data.data
    const studentexercises = await this.$axios.get(
      `util/v2/mobile/exercises/${this.$route.params.studentid}?page_size=${this.perPage}&?page=${this.currentPage}`
    )
    this.studentexercises = studentexercises.data.data.results
    this.pages = studentexercises.data.data.page
    this.totalpages = studentexercises.data.data.total_pages
    this.count = studentexercises.data.data.count
    // console.log(this.exercisecount)

    console.log(this.totalpages)
  },
  computed: {
    totalRows() {
      return this.pages * this.totalpages
    },
  },

  watch: {
    currentPage() {
      // this.totalRows = this.page_size * this.pages
      this.$fetch()
    },
  },
  mounted() {
    // this.totalRows = this.pages * this.totalpages
    // this.totalRows = this.pages * this.totalpages
  },
}
</script>

<style scoped>
.exportbtn {
  border: 1px solid #229af2;
  font-family: Brown;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0px;
  text-align: left;
  color: #229af2;

  /* padding: 13px, 26px, 13px, 26px; */
}

.filterbtn {
  background: #dbeaf4;
  color: #229af2;
}

.lighttext {
  color: #8f9aa3;
}

.biggerheader {
  font-family: Brown;
  font-size: 32px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: right;
  color: #484848;
}

.exercisecard {
  border-left: 4px solid #1070b7;
  height: 140px;
  border-radius: 5px;
}

.exercisecard.pending {
  border-left: 4px solid #f0ba2f;
}

.exercisecard.expired {
  border-left: 4px solid #db6352;
}
</style>
