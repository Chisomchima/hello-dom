<template>
  <div class="">
    <div class="conatiner">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div class="page-heading">Lesson Plan</div>
        <div>
          <b-btn class="btn-primary py-2 px-3" @click="goToCreateLesson"
            >Create Lesson Plans</b-btn
          >
        </div>
      </div>

      <UtilsBaseCardTab>
        <UtilsCardTab title="My Lesson Plans" style="height: auto">
          <UtilsFilterComponent disable-visualization>
            <TableComponent
              fixed
              :filter="filter"
              :items="lessonsToDisplay"
              :fields="fields"
              :busy="busy"
              @page-changed="pageChange"
              @row-clicked="onRowClicked"
            >
              <template #status="{ data }">
                <span
                  v-if="data.item.status === 'draft'"
                  class="draft badge badge-light"
                  >{{ data.item.status }}</span
                >
                <span
                  v-if="data.item.status === 'Awaiting Approval'"
                  class="badge yellow-badge bg-white"
                  >{{ data.item.status }}</span
                >
              </template>
            </TableComponent>
          </UtilsFilterComponent>
        </UtilsCardTab>
        <UtilsCardTab title="Lesson Plan Gallery">
          <UtilsFilterComponent disable-visualization>
            <TableComponent
              fixed
              :filter="filter"
              :items="lessonsToDisplay"
              :fields="fields"
              :busy="busy"
              @page-changed="pageChange"
              @row-clicked="onRowClicked"
            >
              <template #status="{ data }">
                <span v-if="data.item.status === 'draft'" class="badge badge-light">{{
                  data.item.status
                }}</span>
                <span
                  v-if="data.item.status === 'Awaiting Approval'"
                  class="text-success"
                  >{{ data.item.status }}</span
                >
              </template>
            </TableComponent>
          </UtilsFilterComponent>
        </UtilsCardTab>
        <UtilsCardTab title="Awaiting My Approval"> new </UtilsCardTab>
      </UtilsBaseCardTab>
    </div>
  </div>
</template>

<script>
import TableFunc from "~/mixins/TableCompFun";
export default {
  mixins: [TableFunc],
  data() {
    return {
      listView: true,
      page: 1,
      page_size: 12,
      busy: false,
      filter: "",
      fields: [
        { key: "title", sortable: true },
        { key: "subject.name", label: "Subject", sortable: true },
        { key: "grade_level.grade_name", label: "Grade", sortable: true },
        { key: "academic_year.name", label: "Acad Year", sortable: true },
        { key: "academic_period.name", label: "Acad Period", sortable: true },
        { key: "academic_week.name", label: "Acad Week", sortable: true },
        { key: "created_by.name", label: "Teacher", sortable: true },
        { key: "status", label: "Status", sortable: true },
      ],
      pages: "",
      lessons: [],
      lessonsToDisplay: [],
    };
  },

  async mounted() {
    await this.pageChange(1);
  },

  methods: {
    async pageChange(page, search = "all") {
      try {
        this.busy = true;
        const { data } = await this.$axios.$get(
          `/schools/v3/${this.$store.state.administration.school.id}/lessonplan/list/?page=${page}&page_size=${this.page_size}&filter_category=${search}`
        );
        this.lessonsToDisplay = data.results;
        this.pages = data.pages;
        this.busy = false;
        console.log(data);
      } catch (error) {
        console.log(error);
        this.busy = false;
      }
    },

    onRowClicked(e) {
      this.$router.push({
        name: "sms-id-lms-lessonplan-lessonplans",
        params: {
          lessonplans: e.id,
        },
      });
    },

    goToCreateLesson() {
      this.$router.push(`/sms/${this.$route.params.id}/lms/lessonplan/createplan`);
    },
  },
};
</script>

<style>
.draft.badge.badge-light {
  color: #8f9aa3;
  background-color: none;
  border: 1px solid #8f9aa3;
}
</style>
