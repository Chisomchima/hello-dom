<template>
  <div class="row justify-content-between">
    <div
      class="
        col-xl-6 col-lg-12 col-md-8
        order-last order-md-first order-lg-last order-xl-first
      "
    >
      <!-- <div class="w-100 border bg-grayish-blue py-2 px-2 px-sm-3 mb-4">
        <div
          class="
            d-flex
            align-items-center
            justify-content-between
            flex-wrap
            fs-14
          "
        >
          <div class="mr-1">
            <span class="text-light">Lesson Objective:</span>
            <span class="text-dark">3 Topics selected</span>
          </div>
          <div>
            <span
              class="text-primary pointer"
              data-toggle="modal"
              data-target="#viewLessonsObjModal"
              ><u>View</u></span
            >
          </div>
        </div>
      </div> -->

      <div class="mb-2">
        <label class="form-control-label mb-2">Description</label>
        <div class="fs-14 text-dark">
          {{ data.description }}
        </div>
      </div>
    </div>
    <div class="col-xl-4 col-lg-12 col-md-3 mb-3">
      <!-- <button
        class="
          btn btn-primary
          py-2
          px-3
          float-right float-md-none float-lg-right float-xl-none
        "
      >
        Start Exercise
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
