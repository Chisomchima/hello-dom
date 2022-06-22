<template>
  <div>
    <pre>{{ classDetails }}</pre>
    <div
      class="d-flex align-items-center justify-content-between flex-wrap mb-3"
    >
      <div class="class-name fs-20 mr-1">{{ data.name }}</div>
      <div class="">
        <button
          class="btn btn-light d-inline-flex align-items-center py-2"
          data-toggle="modal"
          data-target="#editGradebookCardModal"
        >
          <span
            class="iconify text-danger mr-2"
            data-inline="false"
            data-icon="feather:trash-2"
          ></span>
          <span class="text-light fs-12">Delete</span>
        </button>
        <button
          class="btn btn-light d-inline-flex align-items-center py-2"
          data-toggle="modal"
          data-target="#editGradebookCardModal"
        >
          <span
            class="iconify text-dark mr-1"
            data-inline="false"
            data-icon="ic:round-mode-edit-outline"
          ></span>
          <span class="text-light fs-12">Edit</span>
        </button>
      </div>
    </div>
    <div class="mt-3">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
          <span class="class-details-data_label">Grade:</span>
          <span class="class-details-data_value">{{ data.grade }}</span>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
          <span class="class-details-data_label">Academic Year:</span>
          <span class="class-details-data_value">{{
            data.academic_year
          }}</span>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
          <span class="class-details-data_label">Academic Period:</span>
          <span class="class-details-data_value">{{
            data.academic_period
          }}</span>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
          <span class="class-details-data_label">Class:</span>
          <span class="class-details-data_value">{{ data.class }}</span>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
          <span class="class-details-data_label">Form Teacher:</span>
          <span class="class-details-data_value">{{
            data.form_teacher
          }}</span>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
          <span class="class-details-data_label">Report Card Template:</span>
          <span class="class-details-data_value">{{
            data.report_card_template_name
          }}</span>
        </div>
      </div>
    </div>
    <div>
      <button
        class="btn text-primary pointer d-inline-flex align-content-center"
        @click="$emit('sync-students')"
      >
        <div class="mr-1 line-height-0">
          <span class="iconify fs-16" data-icon="fa-solid:sync-alt"></span>
        </div>
        <strong class="fs-14">Add Students</strong>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddStudentHeader',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      classDetails: '',
    }
  },
}
</script>

<style lang="scss" scoped></style>
