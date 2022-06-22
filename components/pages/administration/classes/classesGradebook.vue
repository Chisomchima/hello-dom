<template>
  <!-- <div>Grade Book</div> -->
  <div class="row">
    <b-skeleton-img
      v-if="$fetchState.pending"
      no-aspect
      height="150px"
    ></b-skeleton-img>
    <template v-if="!$fetchState.pending">
      <template v-if="!$route.query.grade_book_subject">
        <UtilsMiniColorCard
          v-for="(item, index) in subjectsData"
          :key="index"
          :subject="item"
          :showLessonCount="false"
          :name="item.subject"
          :bg-color="item.icon_data ? item.icon_data.icon_bg_color : '#2f18f3'"
          :color="item.icon_data ? item.icon_data.icon_font_color : '#e5e086'"
          :teacher="
            item.all_teachers && item.all_teachers.length
              ? item.all_teachers[0].teacher_name
              : '---'
          "
          :code="item.code"
          :school-class="item.school_class"
          :others="['gradebook_count']"
          @click="showGradeBook(item)"
        />
      </template>
      <template v-else>
        <PageGradeBookBreadCrumb />
        <GradeBookTable
          :table-data="tableData"
          :busy="tableBusy"
          @column-clicked="toRoute($event)"
        />
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    subjects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      subjectsData: [],
      tableData: [],
      tableBusy: true,
      showGradeBookTable: false,
    }
  },
  async fetch() {
    try {
      const classId = this.$route.params.class
      const { data } = await this.$axios.$get(`/slate-admin/class/${classId}/`)
      this.subjectsData = data.subjects
    } catch (error) {
      console.error(error)
    }
  },
  watch: {
    '$route.query.grade_book_subject': {
      async handler(newValue) {
        if (newValue) {
          try {
            this.tableData = {
              students: [],
            }
            this.showGradeBookTable = true
            this.tableBusy = true
            const { data } = await this.$axios.$get(
              `./schools/v2/class/subject/${newValue}/gradebook/?academic_period=`
            )

            this.tableData = data
            this.tableBusy = false
          } catch (error) {
            console.error(error)
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    toRoute(entry) {
      this.$router.push({
        name: 'sms-id-lms-subjects-subject-grade-book-grade_book',
        params: {
          subject: this.$route.query.grade_book_subject,
          grade_book: entry.id,
        },
        // query: {
        //   grade_book_subject: this.$route.query.grade_book_subject,
        //   grade_book_subject_name: this.$route.query.grade_book_subject_name
        // }
      })
    },
    showGradeBook(subject) {
      this.$router.replace({
        name: this.$route.name,
        query: {
          grade_book_subject: subject.id,
          grade_book_subject_name: subject.subject,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
