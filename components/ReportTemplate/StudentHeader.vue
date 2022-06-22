<template>
  <div class="card class-details-card mb-3">
    <div class="card-body">
      <div class="row">
        <div
          class="
            col-md-4 col-xl-3
            mb-4 mb-md-0
            font-family_brown
            fs-14
            text-center
            line-height-100p
          "
        >
          <div>
            <img
              v-if="data.avatar"
              class="rounded-circle object-fit-cover"
              height="100"
              width="100"
              :src="data.avatar"
            />
            <b-avatar v-else size="100"></b-avatar>
          </div>
          <div class="text-dark mt-2">
            <!-- {{ data.student_name }} -->

            {{
              data.student_data
                ? data.student_data.first_name +
                  ' ' +
                  (data.student_data.middle_name
                    ? data.student_data.middle_name
                    : '') +
                  ' ' +
                  data.student_data.last_name
                : data.student_name
            }}
          </div>
          <div class="mt-2">
            <a class="text-light" :href="`mailto:{{data.student_email}}`">
              {{ data.student_email }}</a
            >
          </div>
        </div>
        <div class="col-md-8 col-xl-9">
          <div
            class="
              d-flex
              align-items-center
              justify-content-between
              flex-wrap
              mb-3
            "
          >
            <div class="class-name mr-1">{{ data.report_card_batch_name }}</div>
            <div class="d-flex align-items-center">
              <slot name="audit">
                <div class="actions-dropdown">
                  <div class="dropdown">
                    <button
                      id="dropdownMenuButton"
                      class="btn btn-sm px-0 dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Audit Log
                    </button>
                    <!-- </slot> -->
                    <div
                      class="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
              </slot>
            </div>
          </div>
          <hr class="my-0" />
          <div class="mt-3">
            <div class="row">
              <div class="col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                <span class="class-details-data_label">Class:</span>
                <span class="class-details-data_value">{{
                  data.class_name
                }}</span>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                <span class="class-details-data_label">Status:</span>

                <span class="class-details-data_value">
                  <template>
                    <span
                      v-if="data.status === 'draft'"
                      class="badge grey-badge bg-grayish-variant-1"
                      >Draft</span
                    >
                    <span
                      v-if="data.status === 'completed'"
                      class="badge blue-badge"
                      >Completed</span
                    >
                    <span
                      v-if="data.status === 'processed'"
                      class="badge green-badge"
                      >Processed</span
                    >
                    <span
                      v-if="data.status === 'approved'"
                      class="badge green-badge text-capitalize"
                      >approved</span
                    >
                  </template>
                </span>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                <span class="class-details-data_label">Form Teacher:</span>
                <span class="class-details-data_value">{{
                  data.teachers_list.length
                    ? data.teachers_list[0].teacher_first_name +
                      ' ' +
                      data.teachers_list[0].teacher_last_name
                    : ''
                }}</span>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                <span class="class-details-data_label">Academic Year:</span>
                <span class="class-details-data_value">{{
                  data.academic_year
                }}</span>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                <span class="class-details-data_label">Academic Period:</span>
                <span class="class-details-data_value">{{
                  data.academic_period
                }}</span>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                <span class="class-details-data_label">No of Subjects:</span>
                <span class="class-details-data_value">{{
                  data.number_of_subjects
                }}</span>
              </div>
              <div
                v-if="auditLogData.length"
                class="col-sm-12 col-md-12 col-lg-12 col-xl-8 mb-2"
              >
                <span class="class-details-data_label"
                  >Last Change made by:</span
                >
                <span class="class-details-data_value">
                  {{ auditFormat(auditLogData) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    auditLogData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      key: 'value',
    }
  },
  methods: {
    auditFormat(audits) {
      const length = audits.length
      const lastAudit = audits[length - 1]
      return `${lastAudit.staff} on ${DateTime.fromSQL(lastAudit.on).toFormat(
        'FF'
      )} `
    },
  },
}
</script>

<style lang="scss" scoped></style>
