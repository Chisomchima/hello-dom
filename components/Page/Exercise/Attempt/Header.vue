<template>
  <div class="card class-details-card mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-start flex-wrap mb-3">
        <div class="class-name mr-1">{{ attempt.student_name }}</div>
      </div>
      <hr class="my-0" />
      <div class="mt-3">
        <div class="row">
          <div class="col-lg-10">
            <div class="row">
              <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                <span class="class-details-data_label">Exercise Name:</span>
                <span class="class-details-data_value">{{ attempt.quiz_name }}</span>
              </div>
              <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                <span class="class-details-data_label">Subject:</span>
                <span class="class-details-data_value">{{ attempt.subject_name }}</span>
              </div>
              <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                <span class="class-details-data_label">Class:</span>
                <span class="class-details-data_value">{{ attempt.class }}</span>
              </div>

              <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2 text-capitalize">
                <span class="class-details-data_label">Status:</span>
                <span class="class-details-data_value"
                  ><span
                    :class="
                      attempt.status === 'marked'
                        ? 'text-success'
                        : attempt.status === 'submitted'
                        ? 'text-info'
                        : 'text-danger'
                    "
                    >{{ attempt.status === "marked" ? "Graded" : attempt.status }}</span
                  ></span
                >
              </div>
              <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                <span class="class-details-data_label">Date Started:</span>
                <span class="class-details-data_value">
                  {{
                    attempt.start_time ? formatDate(attempt.start_time) : "not available"
                  }}
                </span>
              </div>

              <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                <span class="class-details-data_label">Date Submitted:</span>
                <span class="class-details-data_value">
                  {{
                    attempt.submit_time
                      ? formatDate(attempt.submit_time)
                      : "not available"
                  }}
                </span>
              </div>

              <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                <span class="class-details-data_label">Questions Attempted:</span>
                <span v-if="!attempt.attempted_questions" class="class-details-data_label"
                  >not Available</span
                >
                <span class="class-details-data_value">{{
                  attempt.attempted_questions
                }}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="font-family_brown font-weight-bold fs-14 text-light">
              Total Score
            </div>

            <div class="font-family_brown font-weight-bold fs-30 text-dark">
              {{ getTotal(attempt) }}
              <!-- {{ attempt.student_score ? attempt.student_score : '__'
              }} -->

              <span class="fs-16">/{{ attempt.total_score }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { format } from "date-fns/esm";
import { DateTime } from "luxon";

export default {
  props: {
    attempt: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  methods: {
    formatDate(date) {
      return DateTime.fromSQL(date).toFormat("f");

      // return format(new Date(date), "dd/MM/yyyy/hh::");
    },
    getTotal(attempt) {
      if (attempt.type === "objective") {
        if (attempt.student_score) {
          return attempt.student_score;
        } else {
          const allScore = [];
          let totalObtainableScore = 0;
          attempt.answers.forEach((section) => {
            section.questions.forEach((question) =>
              allScore.push(Number(question.graded_score))
            );
          });
          const numbersLength = allScore.length;
          for (let i = 0; i < numbersLength; i++) {
            totalObtainableScore += allScore[i];
          }
          console.log("all scores", allScore);
          return totalObtainableScore;
        }
      } else if (attempt.student_score) {
        return attempt.student_score;
      } else {
        return "__";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
