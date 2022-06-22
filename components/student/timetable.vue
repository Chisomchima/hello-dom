<template>
  <div>
    <b-button @click="modalShow = !modalShow">show timetable</b-button>

    <b-modal v-model="modalShow" size="xl" scrollable>
      <template #modal-header>
        <div>
          <h5 class="modal-header-title">My Timetable</h5>
          <h6 class="modal-header-subtitle">
            View your lessons and excercises for the week
          </h6>
        </div>
      </template>
      <div class="container">
        <div class="row">
          <div class="col">
            <h6 class="week-day">Monday</h6>
            <timetable-item v-for="(num, i) in 5" :key="i" />
          </div>
          <div class="col">
            <h6 class="week-day">Tuesday</h6>
            <timetable-item v-for="(num, i) in 5" :key="i" />
          </div>
          <div class="col">
            <h6 class="week-day">Wednesday</h6>
            <timetable-item v-for="(num, i) in 5" :key="i" />
          </div>
          <div class="col">
            <h6 class="week-day">Thursday</h6>
            <timetable-item v-for="(num, i) in 5" :key="i" />
          </div>
          <div class="col">
            <h6 class="week-day">Friday</h6>
            <timetable-item v-for="(num, i) in 5" :key="i" />
          </div>
        </div>
      </div>
      <template #modal-footer><div></div></template>
    </b-modal>
  </div>
</template>

<script>
import timetableItem from '~/components/student/timetableItem'
export default {
  components: {
    timetableItem,
  },
  data() {
    return {
      modalShow: true,
    }
  },
}
</script>

<style scoped>
.modal-content {
  padding-top: 40px;
  padding-left: 20px;
}
.modal-body {
  padding: 0;
  margin-top: 43px;
}
.modal-header {
  border-bottom: 0;
  padding: 0;
}
.modal-footer {
  border-top: 0;
}

.modal-header-title {
  font-size: 24px;
  color: #484848;
}
.modal-header-subtitle {
  font-size: 16px;
  color: #8b9eb0;
  margin-top: 8px;
}
.week-day {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
}
</style>
