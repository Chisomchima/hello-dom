<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import "@fortawesome/fontawesome-free/css/all.css"; // needs additional webpack config

// import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          listPlugin,
          bootstrapPlugin,
        ],
        themeSystem: "bootstrap",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        initialView: "dayGridMonth",
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
        events: [
          { title: "event 4556", date: "2021-12-09" },
          { title: "event 2", date: "2021-12-02" },
        ],
      },
      currentEvents: [],
    };
  },
  watch: {
    events: {
      handler(newEvents) {
        this.calendarOptions.events = newEvents;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleDateClick(arg) {
      
      //   alert('date click! ' + arg)
    },
    handleDateSelect(selectInfo) {
      const title = prompt("Please enter a new title for your event");
      const calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: Math.random(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },
    handleEventClick(clickInfo) {
      if (
        confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)
      ) {
        clickInfo.event.remove();
      }
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>

<style scoped>
/* .fc,
.fc-button {
  text-transform: capitalize !important;
}
.fc-button-primary {
  background-color: #f8f9fa !important;
  border-color: #f8f9fa !important;
} */

.fc-toolbar {
  text-transform: capitalize !important;
}

.AStyle {
  background-color: #f8f9fa !important;
  border-color: #f8f9fa !important;
}

.btn.btn-primary {
  text-transform: capitalize !important;
}
</style>
