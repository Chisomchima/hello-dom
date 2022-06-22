<template>
  <div>
    <UtilsFilterComponent
      v-if="isNotSubmitted"
      class="ada"
      disable-visualization
      disable-pagination
      style="min-height: 5rem"
      @search-input="searchMethod($event)"
    >
      <template #beforeActions>
        <div class="options-container mt-0">
          <span
            class="badge blue-badge p-2"
            :class="{ active: isNotSubmitted }"
            @click="
              isNotSubmitted = true
              isSubmitted = false
            "
            >New</span
          >
          <span
            class="badge green-badge p-2 ml-3"
            :class="{ active: isSubmitted }"
            @click="
              isSubmitted = true
              isNotSubmitted = false
            "
          >
            Submitted</span
          >
        </div>
      </template>
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          style="min-height: 10rem"
          :fields="fields"
          :busy="busy"
          :items="
            itemsToShow.filter((e) => {
              return (
                e.student_status === 'expired' || e.student_status === 'new'
              )
            })
          "
          @row-clicked="onRowClicked"
        >
          <template #student_status="{ data }">
            <span
              v-if="data.item.student_status === 'expired'"
              class="text-danger"
              >Overdue</span
            >
            <span
              v-else-if="data.item.student_status === 'new'"
              class="text-warning"
              >Not Started</span
            >
            <span
              v-else-if="data.item.student_status === 'graded'"
              class="text-success"
              >Graded</span
            >
            <span
              v-else-if="data.item.student_status === 'submitted'"
              class="text-info"
              >Submitted</span
            >
            <span v-else>{{ data.item.student_status }}</span>
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <UtilsFilterComponent
      v-if="isSubmitted"
      disable-visualization
      disable-pagination
      @search-input="searchMethod($event)"
    >
      <template #beforeActions>
        <div class="options-container mt-0">
          <span
            class="badge blue-badge p-2"
            :class="{ active: isNotSubmitted }"
            @click="
              isNotSubmitted = true
              isSubmitted = false
            "
            >New</span
          >
          <span
            class="badge green-badge p-2 ml-3"
            :class="{ active: isSubmitted }"
            @click="
              isSubmitted = true
              isNotSubmitted = false
            "
          >
            Submitted</span
          >
        </div>
      </template>
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          class="ada"
          :fields="fields"
          :busy="busy"
          :items="
            itemsToShow.filter((e) => {
              return (
                e.student_status === 'graded' ||
                e.student_status === 'submitted'
              )
            })
          "
          @row-clicked="onRowClicked"
        >
          <template #student_status="{ data }">
            <span
              v-if="data.item.student_status === 'expired'"
              class="text-danger"
              >Overdue</span
            >
            <span
              v-else-if="data.item.student_status === 'new'"
              class="text-warning"
              >Not Started</span
            >
            <span
              v-else-if="data.item.student_status === 'graded'"
              class="text-success"
              >Graded</span
            >
            <span
              v-else-if="data.item.student_status === 'submitted'"
              class="text-info"
              >Submitted</span
            >
            <span v-else>{{ data.item.student_status }}</span>
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins

export default {
  mixins: [TableFunc],
  props: {
    classDetails: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isSubmitted: false,
      isNotSubmitted: true,
      busy: false,

      search: '',
      fields: [
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'due_date',
          formatter: (value) => {
            return DateTime.fromSQL(value).toFormat('DDD')
          },
        },

        { key: 'type' },

        { key: 'qc_mode', label: 'Format', sortable: false },

        { key: 'number_of_questions', label: 'Questions', sortable: false },

        { key: 'full_score', sortable: false },

        { key: 'student_status', label: 'My Status', sortable: false },
        // { key: 'submissions' },
        // { key: "number_of_students" },
        // { key: "number_of_students_submitted" },
      ],
    }
  },
  async fetch() {
    try {
      this.busy = true
      const { data } = await this.$axios.get(
        `/quiz/v3/${this.data.class_id}/student/quizzes/list/?subject_id=${this.$route.params.subject}&page_size=9999`
      )
      this.busy = false
      this.items = data.data
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    itemsToShow() {
      if (this.search) {
        return this.items.filter((item) => {
          return this.search
            .toLowerCase()
            .split('')
            .every((v) => item.name.toLowerCase().includes(v))
        })
      } else {
        return this.items
      }
    },
  },

  methods: {
    searchMethod(text) {
      this.search = text
    },

    onRowClicked(item) {
      this.$router.push({
        name: 'student-lms-schoolId-exercises-slug',
        params: { schoolId: this.$route.params.schoolId, slug: item.id },
        query: { _name: `${item.name}` },
      })
    },
  },
}
</script>

<style scoped>
.moveUp {
  position: relative;
  bottom: 1rem;
}
.options-container {
  /*  border-bottom: 1.5px solid #e7e8eb; */
  display: inline-block;
  padding-bottom: 0.5rem;
  z-index: 100;
}
.toggle {
  color: #8f9aa3;
  font-family: Museo Sans, Arial, Helvetica, sans-serif;
  font-weight: 400;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
}
.active {
  /*color: black; */
  /* border-bottom: 1.5px solid #1170b7; */
  background: #d8dff9;
}
.ada {
  min-height: 11rem;
}
</style>
