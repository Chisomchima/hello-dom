<template>
  <div class="">
    <p v-if="$fetchState.pending">
      <LoadingBar />
    </p>
    <div v-else-if="$fetchState.error">An error occurred :(</div>
    <div v-else class="conatiner">
      <PageExerciseAttemptBackToExerciseNavigation
        :attempt="attempt"
        @saveComplete="markStudent"
      />
      <PageExerciseAttemptHeader :attempt="attempt" />
      <div v-if="$route.query.type === 'objective'">
        <div
          v-for="(section, sectionIndex) in attempt.answers"
          :key="sectionIndex"
          class="card"
        >
          <div class="card-body">
            <div>
              <div class="row m-0 p-0">
                <div class="col-xl-7 mb-3 mb-xl-0">
                  <div class="text-primary fs-14 mb-4">
                    <strong>Section {{ sectionIndex + 1 }}</strong>
                    <span>{{ section.title }}</span>
                  </div>
                  <div class="mb-2">
                    <label
                      class="form-control-label font-weight-normal font-family_brown mb-2"
                    >
                      <!-- eslint-disable vue/no-v-html -->
                      <span v-html="section.header ? section.header : section.text"></span
                    ></label>
                    <!-- <div class="fs-14 text-dark font-family_brown">
                        
                          </div> -->
                  </div>
                </div>
              </div>
              <hr class="my-4" />

              <div class="">
                <div
                  v-for="(question, questionIndex) in section.questions"
                  :key="questionIndex"
                >
                  <div v-if="question.answer_type === 'trueFalse'" class="row">
                    <div class="col-md-8 col-lg-12 col-xl-8">
                      <div
                        class="text-primary fs-14 mb-3 font-family_brown d-flex align-items-center justify-content-between"
                      >
                        <div>
                          QUESTION {{ questionIndex + 1 }} of
                          {{ section.questions.length }}
                        </div>
                      </div>
                      <div class="mb-3 font-family_brown fs-16 text-dark">
                        {{ question.text }}
                      </div>
                      <div class="disable-interaction">
                        <div
                          v-for="(option, optionIndex) in question.question_option"
                          :key="optionIndex"
                          class="d-flex align-items-center mb-2"
                        >
                          <label class="exercise-option-check">
                            <input
                              :id="'age1' + Math.random()"
                              disabled
                              :checked="
                                question.student_answer.selected_option_id ===
                                option.option
                              "
                              type="radio"
                              :name="'TrueFalse' + Math.random()"
                            />

                            <span
                              class="checkmark"
                              :class="{
                                wrong:
                                  question.student_answer.selected_option_id !==
                                    question.question_option[0].correct_flag &&
                                  option.option ===
                                    question.student_answer.selected_option_id,
                              }"
                            ></span>
                            <span class="text-capitalize">{{
                              option.option.toString()
                            }}</span>
                            <span
                              v-if="
                                question.question_option[0].correct_flag === option.option
                              "
                              class="text-success"
                            >
                              – &nbsp;Correct
                            </span>
                          </label>
                        </div>
                      </div>

                      <div class="mt-3">
                        <div class="text-light fs-12">Obtained Score</div>
                        <div class="text-dark fs-14">
                          <input
                            v-model="question.graded_score"
                            :disabled="attempt.status === 'marked'"
                            type="text"
                            class="form-control w-auto d-inline-block"
                            style="max-width: 60px"
                          />
                          / {{ question.marks }} marks
                        </div>
                      </div>
                      <div>
                        <p class="text-primary mb-0 mt-2">Marking Guide</p>
                        <input
                          id=""
                          v-model="question.hint"
                          :style="{
                            width: question.hint
                              ? question.hint.length + 1 + 'ch'
                              : '20ch',
                          }"
                          name=""
                          placeholder="No guide"
                          disabled
                        />
                      </div>
                    </div>

                    <!--  <div
                      class="
                        col-md-4 col-lg-12 col-xl-4
                        mt-3 mt-md-0 mt-lg-3 mt-xl-0
                      "
                    >
                      <div style="max-width: 241px">
                        <textarea
                          class="form-control"
                          placeholder="Enter Comment"
                        ></textarea>
                      </div>
                    </div> -->
                  </div>
                  <div v-else-if="question.answer_type === 'options'" class="row">
                    <div class="col-md-8 col-lg-12 col-xl-8">
                      <div
                        class="text-primary fs-14 mb-3 font-family_brown d-flex align-items-center justify-content-between"
                      >
                        <div>
                          QUESTION {{ questionIndex + 1 }} of
                          {{ section.questions.length }}
                        </div>
                      </div>
                      <div class="mb-3 font-family_brown fs-16 text-dark">
                        {{ question.text }}

                        <br />
                        <small>Select all that apply</small>
                      </div>
                      <div class="disable-interaction">
                        <div
                          v-for="(option, optionIndex) in question.question_option"
                          :key="optionIndex"
                          class="d-flex align-items-center mb-2"
                        >
                          <label class="exercise-option-check">
                            <input
                              type="checkbox"
                              name="customRadio"
                              class=""
                              :class="!option.correct_flag ? 'failed-check' : ''"
                              :checked="
                                question.student_answer
                                  ? question.student_answer
                                      .map((e) =>
                                        e.selected_option_id === option.option
                                          ? true
                                          : false
                                      )
                                      .filter((e) => e === true)[0]
                                  : option.option
                                  ? question.student_answer
                                      .map((e) =>
                                        e.selected_option_id === option.option
                                          ? true
                                          : false
                                      )
                                      .filter((e) => e === true)[0]
                                  : false
                              "
                            />
                            <span class="checkmark"></span>
                            <span class="text">{{ option.option }}</span>
                          </label>
                          <div
                            v-if="question.correct_answer === option.option"
                            class="ml-3 mb-2 text-success"
                          >
                            <span v-if="option.correct_flag"> – &nbsp;Correct </span>
                          </div>
                        </div>
                      </div>

                      <div class="mt-3">
                        <div class="text-light fs-12">Obtained Score</div>
                        <div class="text-dark fs-14">
                          <input
                            v-model="question.graded_score"
                            :disabled="attempt.status === 'marked'"
                            type="text"
                            class="form-control w-auto d-inline-block"
                            style="max-width: 60px"
                          />
                          / {{ question.marks }} marks
                        </div>
                      </div>
                      <div>
                        <p class="text-primary mb-0 mt-2">Marking guide</p>
                        <input
                          id=""
                          v-model="question.hint"
                          name=""
                          :style="{
                            width: question.hint
                              ? question.hint.length + 1 + 'ch'
                              : '20ch',
                          }"
                          disabled
                          placeholder="No Solution"
                        />
                      </div>
                    </div>
                    <!--  <div
                      class="
                        col-md-4 col-lg-12 col-xl-4
                        mt-3 mt-md-0 mt-lg-3 mt-xl-0
                      "
                    >
                      commenting it
                      <div style="max-width: 241px">
                        <div
                          class="
                            text-primary
                            d-flex
                            align-items-center
                            pointer
                            mt-xl-4
                          "
                        >
                          <span
                            class="iconify text-primary fs-18 mr-1"
                            data-inline="false"
                            data-icon="fluent:comment-24-regular"
                          ></span>
                          <span class="fs-14">Add Comment</span>
                        </div>
                      </div>
                    </div> -->
                  </div>
                  <div v-else-if="question.answer_type === 'freeText'" class="row">
                    <div class="col-md-8 col-lg-12 col-xl-8 py-3 py-xl-4">
                      <div
                        class="text-primary fs-14 mb-3 font-family_brown d-flex align-items-center justify-content-between"
                      >
                        <div>
                          QUESTION {{ questionIndex + 1 }} of
                          {{ section.questions.length }}
                        </div>
                      </div>
                      <div class="mb-3 font-family_brown fs-16 text-dark">
                        {{ question.text }}
                      </div>
                      <div>
                        <textarea
                          id=""
                          name=""
                          class="text-left w-100"
                          cols="60"
                          rows="3"
                          disabled
                        >
                            {{ question.student_answer.selected_option_id }}
                           </textarea
                        >
                      </div>

                      <div class="mb-4">
                        <div class="form-control-label">Obtained Score</div>
                        <div class="text-dark fs-14">
                          <input
                            v-model="question.graded_score"
                            :disabled="attempt.status === 'marked'"
                            type="text"
                            class="form-control w-auto d-inline-block"
                            style="max-width: 60px"
                          />
                          / {{ question.marks }} marks
                        </div>
                      </div>
                      <div>
                        <p class="text-primary mb-0 mt-2">Marking Guide</p>
                        <textarea
                          id=""
                          cols="55%"
                          rows="3"
                          disabled
                          style="overflow: auto"
                        ></textarea>
                        <!-- <input
                          id=""
                          v-model="question.hint"
                          name=""
                          v-model="question.hint"
                          id=""
                          cols="80%"
                          rows="5"
                          disabled
                          placeholder="No Solution"
                        /> -->
                      </div>
                    </div>
                    <div
                      class="col-md-4 col-lg-12 col-xl-4 py-3 py-xl-4 border-xl-left border-gray"
                    >
                      <!--   <div style="max-width: 241px">
                        <div
                          class="
                            text-primary
                            d-flex
                            align-items-center
                            pointer
                            mt-xl-4
                          "
                        >
                          <span
                            class="iconify text-primary fs-18 mr-1"
                            data-inline="false"
                            data-icon="fluent:comment-24-regular"
                          ></span>
                          <span class="fs-14">Add Comment</span>
                        </div>
                        <label class="form-control-label">Comment</label>
                        <textarea
                          class="form-control"
                          placeholder="Enter Comment"
                        ></textarea>
                      </div> -->
                    </div>
                  </div>

                  <hr class="my-4" />
                </div>
              </div>
            </div>
          </div>
          <hr class="my-4" />
          <hr class="my-4" />
          <hr class="my-4" />
        </div>
      </div>
      <div v-else-if="$route.query.type === 'essay'">
        <div class="row px-1 mx-0 mt-5">
          <div class="col-6">
            <template v-if="attempt.quiz_files.length">
              <div class="row">
                <template v-for="(file, index) in attempt.quiz_files">
                  <div :key="index" class="row mt-2 eachItem">
                    <div class="col-9">
                      <div
                        class="file-type-display py-3 text-center bg-white"
                        style="cursor: pointer"
                      >
                        <Icon icon="entypo:download" style="font-size: 25px" />
                        <span
                          class="wrap text-truncater text-truncater-lines-2 custom-span text-primary"
                          @click="handleView(file)"
                        >
                          <!-- @click="openViewer(attempt.quiz_meta_data.essay_item)" -->

                          {{ file.file_name }}
                        </span>

                        <br />
                      </div>
                    </div>
                    <div class="col-2 p-0 m-0">
                      <b-button
                        variant="primary"
                        class="newButton my-2"
                        @click="handleView(file)"
                        >View</b-button
                      >

                      <b-button
                        variant="primary"
                        class="newButton"
                        @click="handleDownload(file)"
                        >Download</b-button
                      >
                    </div>
                  </div>
                </template>
              </div>
            </template>
            <template v-else>
              <div
                class="file-type-display col py-3 px-3 text-center mr-1 bg-white my-3 my-md-0"
                style="cursor: pointer; height: 5rem"
              >
                <Icon icon="entypo:download" style="font-size: 25px" />
                <span>
                  <a href="#"> No Attacment </a>
                </span>
                <br />
              </div>
            </template>
          </div>

          <div class="col-3 my-3">
            <p class="text-secondary">Obtained Score</p>
            <div class="text-dark fs-14 hmm">
              <ValidationObserver ref="form">
                <ValidationProviderWrapper
                  :rules="['required', `max_value:${attempt.total_score}`]"
                >
                  <input
                    v-model="attempt.student_score"
                    :disabled="attempt.status === 'marked'"
                    type="texgt"
                    class="form-control w-auto d-inline-block"
                    style="max-width: 60px"
                  />
                </ValidationProviderWrapper>
              </ValidationObserver>

              / {{ attempt.total_score }} marks
            </div>
          </div>
          <div class="col-3 my-3">
            <div class="d-flex justify-content-md-end">
              <div>
                <p class="text-secondary">Teacher's Comment</p>
                <p v-if="!visibleComment">
                  {{ attempt.comment ? attempt.comment : "" }}
                </p>
                <b-button
                  v-if="!visibleComment && attempt.status !== 'marked'"
                  variant="primary"
                  @click="showvisibleComment = !showvisibleComment"
                >
                  Add comment
                </b-button>
                <div v-else-if="visibleComment">
                  <textarea
                    id=""
                    v-model="attempt.comment"
                    name=""
                    :disabled="attempt.status === 'marked'"
                    cols="30"
                    rows="5"
                  ></textarea>
                  <br />
                  <b-button
                    class="mb-2"
                    variant="primary"
                    @click="showvisibleComment = !showvisibleComment"
                  >
                    Save</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- please dont delete incase they change their mind -->
        <!--
        <h5 class="mt-2">Student Attachment</h5>
        <template v-if="attempt.quiz_files.length">
          <div v-for="(file, index) in attempt.quiz_files" :key="index" class="mt-4">
            <UploadedImageItemTeacher
              :file-name="file.file_name"
              :file="file.url"
              :whole-file="file"
            />
          </div>
        </template>
        <template v-else>
          <p class="p-3 bg-secondary text-center">No File Attached</p>
        </template>
         -->
      </div>
    </div>
    <!-- ********* modals ******** -->
    <section>
      <b-modal
        id="uploadedFileModal"
        centered
        hide-header-close
        header-class="mt-n3 pt-5"
        hide-footer
        size="lg"
      >
        <template #modal-header="{ close }">
          <div class="d-flex justify-content-between w-100">
            <img
              src="~/assets/lessons/svg/closeIcon.svg"
              alt="close icon"
              class="pointer mr-4"
              @click="close()"
            />
            <!-- <b-button variant="primary" @click="downloadFile(fileToView)"
              >Download</b-button
            > -->
          </div>
        </template>
        <div class="text-center">
          <WebViewer
            v-if="fileToView"
            ref="webViewer"
            :style="{ height: '700px' }"
            :url="fileToView"
          />
        </div>
      </b-modal>
    </section>
  </div>
</template>

<script>
import axios from "axios";

import LoadingBar from "~/components/LoadingBar.vue";

export default {
  components: { LoadingBar },

  data() {
    return {
      fileToView: "",

      attempt: { comment: "" },
      showvisibleComment: false,
    };
  },
  async fetch() {
    console.log(this.$route.query.type);
    try {
      const response = await this.$axios(
        `/quiz/v3/student_quiz/${this.$route.params.attempt}/mark/${
          this.$route.query.type === "essay" ? "essay/" : ""
        }`
      );
      this.attempt = response.data;
      if (response.data.type === "objective") {
        const newer = response.data.answers.map((item) => {
          return {
            ...item,
            questions: item.questions.map((question) => {
              return {
                ...question,
                // graded_score: null,
              };
            }),
          };
        });
        // if the exercise is marked do nothing

        this.attempt.answers =
          response.data.status === "marked" ? newer : this.autoMark(newer);
      }
      console.log("this attempt is ", response.data);
    } catch (error) {
      this.$router.go(-1);
      console.log(error);
    }
  },
  computed: {
    visibleComment() {
      if (this.showvisibleComment) {
        return true;
      } else if (this.showvisibleComment) {
        return true;
      } else if (!this.showvisibleComment) {
        return false;
      } else {
        return false;
      }
    },
  },
  methods: {
    handleView(file) {
      this.fileToView = file.url;
      this.$bvModal.show("uploadedFileModal");
    },
    async handleDownload(file) {
      console.log("download", file);
      if (!file) return;
      try {
        const response = await axios.get(file.url, {
          responseType: "blob",
        });
        const filename = file.file_name.split(".")[0];
        const filetype = file.format.split(".").pop();
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}.${filetype}`;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (e) {
        console.error(e);
      }
    },
    async downloadFile(file) {
      const fullName = this.attempt.quiz_meta_data.essay_item.file_name;
      try {
        const response = await axios.get(file, { responseType: "blob" });
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fullName;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (e) {
        console.error(e);
      }
    },
    openViewer(file) {
      try {
        if (file.essay_sample_url) {
          this.fileToView = file.essay_sample_url;

          this.$bvModal.show("uploadedFileModal");
        }
      } catch (e) {
        console.log(e);
      }
    },
    autoMark(sections) {
      const marked = sections.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            return {
              ...question,
              graded_score: this.markQuestion(question),
            };
          }),
        };
      });
      return marked;
    },
    markQuestion(question) {
      let score;
      switch (question.answer_type) {
        case "freeText":
          score = "";
          // code block
          break;
        case "options":
          // if the student selected more than one option give them zero
          if (question.student_answer.length > 2) {
            score = 0;
          } else if (
            question.correct_answer === question.student_answer[1].selected_option_id
          ) {
            score = question.marks;
          } else {
            score = 0;
          }

          // code block
          break;
        case "trueFalse":
          // very annoying data to work with
          if (
            question.student_answer.selected_option_id ===
            question.question_option[0].correct_flag
          ) {
            score = question.marks;
          } else {
            score = 0;
          }

          // code block
          break;
        default:
          score = 0;
        // code block
      }
      // console.log('each question', question)

      return score;
    },
    covertBooloean(e) {
      if (e === "True") {
        return true;
      } else if (e === "False") {
        return false;
      }
    },

    makeToast(variant = null) {
      this.$bvToast.toast("Exercise graded successfully", {
        title: `Success`,
        variant,
        solid: true,
      });
    },
    async checkFormValidity() {
      const result = await this.$refs.form.validate();
      return result;
    },
    async markStudent() {
      console.log(this.$route.params);
      const result = await this.checkFormValidity();

      if (!result) {
        return;
      }

      if (this.$route.query.type === "objective") {
        try {
          const sections = this.attempt.answers;
          await console.log(sections);
          await this.$axios.post(
            `/quiz/v3/student_quiz/${this.$route.params.attempt}/mark/submit/`,
            {
              id: this.$route.params.attempt,
              student_answers: {
                sections,
              },
            }
          );
          this.msg = "Graded Succesfully";
          this.makeToast("success");
          this.$fetch();
        } catch (error) {
          console.log(error);
        }
      } else if (this.$route.query.type === "essay") {
        this.attempt.score = this.attempt.student_score;
        try {
          await this.$axios.post(
            `/quiz/v3/student_quiz/${this.$route.params.attempt}/mark/essay/submit/`,
            this.attempt
          );
          this.msg = "Graded Succesfully";
          this.makeToast("success");
          this.$fetch();
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.eachItem {
  width: 35rem;
}
@media screen and (max-width: 1200px) {
  .eachItem {
    width: 20rem !important;
  }
}
@media screen and (max-width: 1125px) {
  .eachItem {
    width: 15rem !important;
  }
}
.hmm {
  width: 20rem;
}
.newButton {
  /* color: #1070b7; */
  font-weight: 600;
  cursor: pointer;
}
.wrap {
  word-wrap: break-word;
  font-size: 1rem;
}
ul {
  list-style: none;
}
</style>
