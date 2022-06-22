<template>
  <div class="card shadow-sm">
    <div class="card-header">
      <h3>Events</h3>
      <p class="small text-capitalize text-light">
        school events and activities
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="(item, index) in events" :key="index" class="list-group-item">
        <div class="d-flex justify-content-between mb-0 small text-light">
          <div class="date">
            <span class="day">{{
              formatDate(item.start_date_time).split(',')[0]
            }}</span>
          </div>
          <div class="time">
            <span class="day">{{
              formatDate(item.start_date_time).split(',')[1]
            }}</span>
          </div>
        </div>
        <p class="mb-0 text-capitalize">{{ item.name }}</p>
        <p class="mb-0 small text-light">{{ item.location }}</p>
      </li>
      <!-- <li class="list-group-item">A second item</li> -->
      <!-- <li class="list-group-item">A third item</li> -->
    </ul>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'EventCard',
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      const dt = DateTime.fromFormat(date, 'y-L-d H:m')
      return dt.toLocaleString(DateTime.DATETIME_MED)
    }
  }
}
</script>

<style lang="scss" scoped></style>
