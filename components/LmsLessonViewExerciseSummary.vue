<template>
  <div>
    <div class="d-flex align-items-center justify-content-end mb-5">
      <button class="btn btn-primary py-2 px-3 mr-3">Start Exercise</button>
      <button class="btn btn-outline-primary py-2 px-3">
        View Exercise Details
      </button>
    </div>

    <div>
      <div class="">
        <div v-if="Object.values(data.quiz_data).length > 0" class="row">
          <div class="col-xl-7 mb-3 mb-xl-0">
            <div class="font-weight-bold text-dark mb-2 fs-20">
              {{ data.quiz_data.name }}
            </div>
            <div class="mb-2">
              <label class="form-control-label mb-2">Description</label>
              <div class="fs-14 text-dark">
                {{ data.quiz_data.description }}.
              </div>
            </div>
          </div>
          <div class="col-xl-5 border-xl-left border-gray">
            <div class="row">
              <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                <div class="fs-12 text-light">Exercise Type</div>
                <div class="fs-14 text-dark">
                  {{ data.quiz_data.quiz_type }}
                </div>
              </div>
              <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                <div class="fs-12 text-light">Exercise Format</div>
                <div class="fs-14 text-dark">
                  {{ data.quiz_data.quiz_mode }}
                </div>
              </div>
              <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                <div class="fs-12 text-light">Duration</div>
                <div class="fs-14 text-dark">
                  {{ data.quiz_data.duration }} Minutes
                </div>
              </div>
              <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                <div class="fs-12 text-light">No. of Sections</div>
                <div
                  v-if="data.quiz_data.sections.length > 0"
                  class="fs-14 text-dark"
                >
                  {{ data.quiz_data.sections.length }}
                </div>
              </div>
              <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                <div class="fs-12 text-light">Available Date</div>
                <div class="fs-14 text-dark">
                  {{ data.quiz_data.available_date }}
                </div>
              </div>
              <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                <div class="fs-12 text-light">Due Date</div>
                <div class="fs-14 text-dark">{{ data.quiz_data.due_date }}</div>
              </div>
              <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                <div class="fs-12 text-light">Total Obtainable Score</div>
                <div class="fs-14 text-dark">
                  {{ data.quiz_data.full_score }} Marks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-for="(section, index) in data.quiz_data.sections">
        <hr :key="index" class="my-4" />
        <div :key="index" class="">
          <div class="row">
            <div class="col-xl-7 mb-3 mb-xl-0">
              <div class="font-weight-bold text-dark mb-2">Sections</div>
              <div class="text-primary fs-12 mb-1">Section 2</div>
              <div class="mb-2">
                <label class="form-control-label mb-2"
                  >Header / Section Instruction</label
                >
                <div class="fs-14 text-dark">
                  I must explain to you how all this mistaken idea of denouncing
                  pleasure and praising pain was born and I will give you a
                  complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure, but because
                  those who do not know how to pursue pleasure rationally
                  encounter consequences that are extremely painful.
                </div>
              </div>
            </div>
            <div class="col-xl-5 border-xl-left border-gray">
              <div class="row">
                <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                  <div class="fs-12 text-light">Number of Questions</div>
                  <div class="fs-14 text-dark">4</div>
                </div>
                <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                  <div class="fs-12 text-light">Section Obtainable Score</div>
                  <div class="fs-14 text-dark">10 marks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: { data: { type: Object, required: true } }
}
</script>

<style lang="scss" scoped></style>
