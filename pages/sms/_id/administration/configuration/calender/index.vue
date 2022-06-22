<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">School Calender</div>
      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <BaseButton v-role="'admin'" class="py-2 px-3" @click="toRoute()"
            ><b-icon icon="calendar-plus"></b-icon> Add Calender
            Event</BaseButton
          >
        </div>
      </div>
    </div>

    <UtilsFilterComponent>
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :fields="fields"
          :items="items"
        />
        <div v-else class="row">
          <div class="col-8 font-brown font-weight-light">
            <PageConfigurationsCalenderFullCalender
              v-if="events.length > 0"
              :events="events"
            />
          </div>
          <div class="col-4">
            <PageConfigurationsCalenderEventCard
              :events="items"
            ></PageConfigurationsCalenderEventCard>
          </div>
        </div>
      </template>
    </UtilsFilterComponent>
  </div>
</template>

<script>
// import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins

export default {
  mixins: [TableFunc],
  async asyncData({ $axios, store }) {
    const { data } = await $axios.$get(
      `./slate-admin/calendar/year/${store.state.school.currentAcademicYear.id}/`
    )
    return {
      items: data.raw_events,
      data
    }
  },
  data() {
    return {
      key: 'value',
      fields: [
        { key: 'name', label: 'Event Title', sortable: true },
        { key: 'location', sortable: true },
        {
          key: 'start_date_time',
          sortable: true
        },
        { key: 'end_date_time', sortable: true, formatter: 'dataTimeFormat' }
      ],
      data: [],
      events: []
    }
  },
  mounted() {
    const events = []

    for (const date in this.data.events) {
      this.data.events[date].forEach((event) => {
        events.push({
          id: event.id,
          title: event.name,
          start: `${event.start_date} ${event.start_time}`,
          end: `${event.end_date} ${event.end_time}`,
          allDay: false
        })
      })
    }
    console.log(events)
    this.events = events
    // data.events
  },
  methods: {
    toRoute() {
      this.$router.push({
        name: 'sms-id-administration-configuration-calender-year',
        params: {
          year: this.$store.state.school.currentAcademicYear.id
        }
      })
    }
  }
}
</script>

<style scoped></style>
