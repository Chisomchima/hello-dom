<template>
  <div class="">
    <div class="conatiner">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div class="page-heading">Exercise</div>
        <div>
          <b-btn class="btn-primary py-2 px-3" @click="gotoExcerciseCreation"
            >New Exercise</b-btn
          >
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <GridListToggle
            :disable-grid="true"
            @grid="showGrid"
            @list="showList"
            @searchAllItems="search"
            @filter="handleFilter"
          />

          <div v-if="listView">
            <Table
              fixed
              :filter="filter"
              :items="exerciseList"
              :is-busy="isBusy"
              :pages="pages"
              :new-value="newValue"
              :fields="fields"
              @page-changed="pageChange"
              @edit="edit"
              @unpublish="Unpublish"
              @row-clicked="gotoExcercise"
            >
              <template #statusExercise="{ data }">
                <ToggleSwitchButton
                  :value="data.value === 'open' ? true : false"
                  @change="togglePublish($event, data.item)"
                />
              </template>
            </Table>
          </div>
          <div v-else>grid</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";

import { stubFalse } from "lodash";
import GridListToggle from "~/components/Utils/GridListToggle.vue";
export default {
  components: { GridListToggle },
  data() {
    return {
      currentAcademicyear: "",
      newValue: 1,
      subject_teacher: true,
      class_teacher: "",
      listView: true,
      page: 1,
      isBusy: true,
      filter: "",
      exerciseList: [],
      fields: [
        { key: "exercise_name", sortable: true },
        { key: "exercise_type", sortable: true },
        { key: "class", sortable: true },
        { key: "subject", sortable: true },
        { key: "date_available", label: "Available Date", sortable: true },
        { key: "date_due", label: "Due Date        ", sortable: true },
        { key: "Submissions", sortable: false },
        { key: "statusExercise", label: "Status", sortable: true },

        // { key: 'triple_dots', sortable: false },
      ],
      pages: "",
    };
  },
  async fetch() {
    this.isBusy = true;

    try {
      if (!this.currentAcademicyear) {
        await this.$axios.get(
          `slate-admin/school/${this.$store.state.administration.school.id}/year/?paginate=false`
        );
        const currentYear = await this.$axios.$get(
          `./slate-admin/school/${this.$store.state.administration.school.id}/year/?paginate=false`
        );
        const currentAcademicyear = currentYear.data.find(
          (item) => item.current_academic_year
        ).id;
        this.currentAcademicyear = currentAcademicyear;
        console.log("current year", currentAcademicyear);
      }

      const { data } = await this.$axios.get(
        `/quiz/v3/${this.currentAcademicyear}/teacher/quizzes/list/?page=${this.page}&search=${this.filter}&subject_teacher=${this.subject_teacher}&class_teacher=${this.class_teacher}`
      );
      this.pages = data.pages;
      this.exerciseList = data.data.map((ex) => ({
        exercise_name: ex.quiz_meta_data.name,
        exercise_type: ex.type.charAt(0).toUpperCase() + ex.type.slice(1),
        class: ex.quiz_class.name,
        subject: ex.subject,
        Submissions: `${ex.number_of_students_submitted}/${ex.number_of_students}`,

        date_available: this.convertDate(ex.quiz_meta_data.available_date),
        date_due: this.convertDate(ex.quiz_meta_data.due_date),

        statusExercise: ex.state,

        id: ex.id,
        allItems: ex,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.isBusy = false;
    }
  },
  methods: {
    handleFilter(field) {
      console.log(field);
      switch (field) {
        case "all":
          this.subject_teacher = "";
          this.class_teacher = "";
          this.newValue = 1;
          this.page = 1;
          this.$fetch();
          break;
        case "mine":
          this.subject_teacher = true;
          this.class_teacher = "";
          this.newValue = 1;
          this.page = 1;

          this.$fetch();
          break;
        case "class":
          this.subject_teacher = "";
          this.class_teacher = true;
          this.newValue = 1;
          this.page = 1;

          this.$fetch();
          break;
        default:
          this.subject_teacher = "";
          this.class_teacher = "";
          this.newValue = 1;
          this.page = 1;

          this.$fetch();
      }
    },
    async togglePublish(event, item) {
      const result = await this.showConfirmMessageBox(
        `Are you sure you want to ${event ? "publish" : "unpublish"} this Exercise?`
      );

      if (result) {
        try {
          if (event) {
            item.allItems.quiz_type = item.allItems.type;
            await this.$axios.$put(
              `/quiz/v3/quiz_config/${item.id}/draft/edit/?publish=true`,
              {
                quiz_config: item.allItems,
                quiz_id: item.id,
              }
            );
          } else {
            await this.$axios.$put(`/quiz/v3/quiz_config/${item.id}/unpublish/`);
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.$fetch();
        }
      }
    },
    async showConfirmMessageBox(text = "Please confirm ") {
      const result = await this.$bvModal.msgBoxConfirm(text, {
        title: "Please Confirm",
        okVariant: "primary",
        okTitle: "Confirm",
        cancelVariant: "light",
        cancelTitle: "Cancel",
        hideHeaderClose: false,
        centered: true,
      });
      return result;
    },
    gotoExcerciseCreation() {
      this.$router.push(`/sms/${this.$route.params.id}/lms/excercises/creation`);
    },
    convertDate(value) {
      if (value) {
        return value.slice(0, 10);
      }
    },
    pageChange(e = 1) {
      this.page = e;
      this.newValue = e;
      this.$fetch();
    },
    gotoExcercise(e) {
      this.$router.push({
        name: "sms-id-lms-excercises-excercise",
        params: { excercise: e.id, id: this.$route.params.id },
        query: { _name: `${e.exercise_name}` },
      });
      // this.$router.push(`excercises/${e.id}`)
    },
    edit(e) {
      const schoolCode = this.$store.state.administration.school.code;

      this.$router.push(`/sms/${schoolCode}/lms/excercises/${e.id}/edit`);
    },
    Unpublish(e) {},
    showGrid() {
      this.listView = false;
    },
    showList() {
      this.listView = true;
    },
    search(e) {
      this.filter = e;
      this.$fetch();
    },
  },
};
</script>

<style lang="scss" scoped></style>
