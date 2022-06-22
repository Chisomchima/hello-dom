<template>
  <UtilsFilterComponent disable-visualization @search-input="search($event)">
    <template #besideFilterButton>
      <BaseButton class="btn-borderless-primary" @click="routeToExe()"
        >Create Exercise</BaseButton
      >
    </template>
    <template #default="{ visualization }">
      <TableComponent
        v-if="visualization === 'list'"
        :fields="fields"
        :pages="pages"
        :busy="busy"
        :items="items"
        @page-changed="pageChange"
        @row-clicked="onRowClicked"
      >
        <template #submissions="{ data }">
          <span
            >{{ data.item.number_of_students_submitted }}/{{
              data.item.number_of_students
            }}</span
          >
        </template>
      </TableComponent>
      <div v-else class="row">
        <div
          v-for="(value, index) in items"
          :key="index"
          class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
        >
          <UtilsGridViewCard
            :data="value"
            :display-key="['name', 'type', 'grade_level', 'subject']"
          ></UtilsGridViewCard>
        </div>
      </div>
    </template>
  </UtilsFilterComponent>
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
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Name',
        },
        { key: 'type' },
        { key: 'full_score' },
        { key: 'submissions' },
        // { key: "number_of_students" },
        // { key: "number_of_students_submitted" },
        {
          key: 'available_date',
          formatter: (value) => {
            return DateTime.fromSQL(value).toFormat('DDD')
          },
        },
        {
          key: 'due_date',
          formatter: (value) => {
            return DateTime.fromSQL(value).toFormat('DDD')
          },
        },
      ],
    }
  },
  mounted() {
    this.pageChange(1)
  },
  methods: {
    async pageChange(page, search = '') {
      this.busy = true

      const data = await this.$axios.$get(
        `/quiz/v3/${this.$store.state.school.currentAcademicYear.id}/teacher/quizzes/list/?subject_id=${this.$route.params.subject}&page=${page}&search=${search}&param=all`
      )
      this.items = data.data
      this.pages = data.pages
      this.busy = false
    },

    async search(text) {
      await this.pageChange(1, text)
    },

    onRowClicked(item) {
      console.log(item)
      this.$router.push({
        name: 'sms-id-lms-excercises-excercise',
        params: { excercise: item.id },
        query: { _name: `${item.name}` },
      })
    },
    routeToExe() {
      this.$router.push({
        name: 'sms-id-lms-excercises-creation',
        query: {
          subjectId: this.$route.params.subject,
          classId: this.classDetails.classIid,
          className: this.classDetails.className,
          subjectName: this.classDetails.subjectName,
          _name: 'Create Exercise',
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
