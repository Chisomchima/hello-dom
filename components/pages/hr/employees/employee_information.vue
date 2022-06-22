<template>
  <div>
    <div class="d-flex justify-content-between">
      <h5>Staff Record History</h5>
      <p class="text-primary"></p>
    </div>
    <div
      v-if="details.hr_information.staff_record_history"
      class="profile-details"
    >
      <div class="col">
        <div class="row">
          <small class="text-secondary">Start Date</small>
        </div>
        <div class="row">
          <p class="">
            {{
              details.hr_information.staff_record_history
                ? details.hr_information.staff_record_history.join_date.slice(
                    0,
                    10
                  )
                : '--'
            }}
          </p>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <small class="text-secondary">Department</small>
        </div>
        <div class="row text-wrap">
          <p v-if="details.hr_information.staff_record_history" class="m-0">
            {{
              details.hr_information.staff_record_history.department
                ? details.hr_information.staff_record_history.department
                : details.hr_information.staff_record_history.department
                ? details.hr_information.staff_record_history.department
                : '--'
            }}
          </p>
        </div>
      </div>
      <div class="col text-left">
        <div class="row">
          <small class="text-secondary">Position</small>
        </div>
        <div class="row">
          <p class="m-0">
            {{
              details.hr_information.staff_record_history
                ? details.hr_information.staff_record_history.position
                : '--'
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="mt-4 pt-4 border-top">
      <div class="d-flex justify-content-between">
        <h5>Staff Exit Record</h5>
        <p class="text-primary"></p>
      </div>
      <div v-if="details.hr_information.exit_record" class="profile-details">
        <div class="col">
          <div class="row">
            <small class="text-secondary"> Date</small>
          </div>
          <div class="row">
            <p class="">
              {{
                details.hr_information.exit_record.date
                  ? details.hr_information.exit_record.date
                  : '--'
              }}
            </p>
          </div>
        </div>
        <div class="col w-75">
          <div class="row">
            <small class="text-secondary">Exit Type</small>
          </div>
          <div class="row text-wrap">
            <p class="m-0">
              {{
                details.hr_information.exit_record.exit_type
                  ? details.hr_information.exit_record.exit_type
                  : '--'
              }}
            </p>
          </div>
        </div>
        <div class="col text-left">
          <div class="row">
            <small class="text-secondary">Reason</small>
          </div>
          <div class="row">
            <p class="m-0">
              {{
                details.hr_information.exit_record.exit_reason
                  ? details.hr_information.exit_record.exit_reason
                  : '--'
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
}
</script>

<style scoped>
.profile-details {
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  column-gap: 20px;
}
</style>
