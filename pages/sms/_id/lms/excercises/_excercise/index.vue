<template>
  <div>
    <div>
      <div class="d-flex justify-content-end">
        <div>
          <b-btn
            v-if="allData.quiz_details.state === 'draft'"
            class="btn-primary"
            @click="
              $router.push(
                `/sms/${$route.params.id}/lms/excercises/${$route.params.excercise}/edit`
              )
            "
            >Edit Excercise</b-btn
          >
          <b-btn
            v-if="allData.quiz_details.state === 'draft'"
            class="btn-primary"
            @click="$bvModal.show('publish-modal')"
            >Publish</b-btn
          >
          <b-btn
            v-if="allData.quiz_details.state === 'open'"
            class="btn-danger"
            @click="showUnpublishModal"
            >Unpublish</b-btn
          >
          <b-btn
            v-if="allData.quiz_details.state === 'open'"
            class="btn-warning"
            @click=""
            >Archive</b-btn
          >
        </div>
      </div>
      <UtilsHeaderCardWithColor
        v-if="!$fetchState.pending"
        class="mt-4"
        enable-image
        :disable-action="true"
        :color="
          data.icon_data.icon_font_color ? data.icon_data.icon_font_color : '#000000'
        "
        :img-src="data.icon_data.icon ? data.icon_data.icon : ''"
        :bg-color="data.icon_data.icon_bg_color"
        :title="data.name"
        :published="allData.quiz_details.state"
        :status="allData.quiz_details.status"
        :data="data"
        :display-key="[
          'class',
          'excercise_type',
          'available_date',

          'subject',
          'excercise_format',

          'due_date',
        ]"
        @edit="onEdit(data)"
        @delete="onDelete(data)"
      >
        <template #excercise_format="value">
          <span
            v-if="value.value === 'exercise'"
            :style="{
              color: data.icon_data.icon_font_color
                ? data.icon_data.icon_font_color
                : '#000000',
            }"
            >Classwork</span
          >
          <span
            v-else-if="value.value === 'assessment'"
            :style="{
              color: data.icon_data.icon_font_color
                ? data.icon_data.icon_font_color
                : '#000000',
            }"
            >Homework</span
          >
          <span
            v-else
            :style="{
              color: data.icon_data.icon_font_color
                ? data.icon_data.icon_font_color
                : '#000000',
            }"
            >{{ value.value }}</span
          >
        </template>
      </UtilsHeaderCardWithColor>
      <UtilsBaseCardTab v-if="!$fetchState.pending">
        <!-- <UtilsCardTab title="Details"> </UtilsCardTab> -->
        <UtilsCardTab
          title="
           Details
          "
        >
          <div>
            <div>
              <div class="row">
                <div class="col-xl-7 mb-3 mb-xl-0">
                  <div class="mb-2">
                    <label class="form-control-label mb-2">Instruction</label>
                    <div class="descriptionContainer fs-14 text-dark">
                      <span v-html="allData.quiz_details.description"></span>
                    </div>
                  </div>
                </div>
                <div class="col-xl-5 border-xl-left border-gray">
                  <div class="row">
                    <div
                      v-show="
                        allData.quiz_details.quiz_meta_data.quiz_type === 'objective'
                      "
                      class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3"
                    >
                      <div class="fs-12 text-light">Duration</div>
                      <div class="fs-14 text-dark">
                        {{ allData.quiz_details.duration }} Minutes
                      </div>
                    </div>
                    <div
                      v-show="
                        allData.quiz_details.quiz_meta_data.quiz_type === 'objective'
                      "
                      class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3"
                    >
                      <div class="fs-12 text-light">No. of Sections</div>
                      <div class="fs-14 text-dark">
                        {{
                          allData.quiz_details.quiz_meta_data.sections
                            ? allData.quiz_details.quiz_meta_data.sections.length
                            : "0"
                        }}
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                      <div class="fs-12 text-light">Total Obtainable Score</div>
                      <div class="fs-14 text-dark">
                        {{ allData.quiz_details.full_score }} Marks
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                      <div class="fs-12 text-light">Total Number of Students</div>
                      <div class="fs-14 text-dark">
                        {{ allData.quiz_details.number_of_students }} Student(s)
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                      <div class="fs-12 text-light">Students submitted</div>
                      <div class="fs-14 text-dark">
                        {{ allData.quiz_details.number_of_students_submitted }}
                        Student(s)
                      </div>
                    </div>

                    <!-- <div v-if="allData.quiz_details.qc_mode === 'exercise' || allData.quiz_details.qc_mode ==='examination'" class="col-xl-6  col-lg-4 col-md-3 col-sm-4 mb-3">
                                        <div  v-if="!started" class="d-flex align-items-center justify-content-start mb-5">
                                            <button class="btn btn-primary py-2 px-3 mr-3" @click="startTimer">Start </button>
                                        </div>
                                        <div v-else>
                                            <button  class="btn btn-danger py-2 px-3 mr-3" @click="stopTimer">Stop </button>
                                            <progress  id="progressBar" value="0" max="10"></progress>

                                        </div>

                                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="allData.quiz_details.type === 'objective'">
            <div
              v-for="(section, sectionIndex) in allData.quiz_details.quiz_meta_data
                .sections"
              :key="sectionIndex"
            >
              <div class="row">
                <div class="col-xl-7 mb-3 mb-xl-0">
                  <div class="text-primary fs-14 mb-4">
                    <strong>Section {{ sectionIndex + 1 }}</strong>
                  </div>
                  <div class="mb-2">
                    <label class="form-control-label mb-2"
                      >Header / Section Instruction</label
                    >
                    <div class="fs-14 text-dark">
                      <span v-html="section.header"></span>
                    </div>
                  </div>
                </div>
                <div class="col-xl-5 border-xl-left border-gray">
                  <div class="row">
                    <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                      <div class="fs-12 text-light">Number of Questions</div>
                      <div class="fs-14 text-dark">
                        {{ section.questions.length }}
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-4 col-md-3 col-sm-4 mb-3">
                      <div class="fs-12 text-light">Section Obtainable Score</div>
                      <div class="fs-14 text-dark">
                        {{ sectionsScore(section) }} marks
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-4" />

              <div class="">
                <template v-for="(question, questionIndex) in section.questions">
                  <div :key="questionIndex">
                    <div v-if="question.question_type === 'trueFalse'">
                      <div class="row">
                        <div class="col-md-8 col-lg-12 col-xl-8">
                          <div
                            class="text-primary fs-14 mb-3 font-family_brown d-flex align-items-center justify-content-between"
                          >
                            <div>
                              QUESTION {{ questionIndex + 1 }} of
                              {{ section.questions.length }}
                            </div>
                            <div>
                              {{ question.marks }}
                              <span class="text-light">marks</span>
                            </div>
                          </div>
                          <div class="mb-3 font-family_brown fs-16 text-dark">
                            {{ question.text }}
                          </div>
                          <div>
                            <div
                              v-for="(option, optionIndex) in question.question_option"
                              :key="optionIndex"
                              class="d-flex align-items-center mb-2"
                            >
                              <label class="exercise-option-check">
                                <input
                                  type="radio"
                                  :name="'customRadio' + Math.random()"
                                  disabled
                                  :checked="
                                    question.question_option[0].correct_flag ===
                                    option.option
                                  "
                                />
                                <span class="checkmark"></span>
                                <span class="text text-capitalize">{{
                                  option.option
                                }}</span>
                              </label>
                            </div>
                            <div v-if="question.hint">
                              <small> Solution</small>
                              <p class="text-capitalize">{{ question.hint }}</p>
                            </div>
                          </div>
                        </div>
                        <div v-if="question.file_upload">
                          <div
                            v-if="question.file_upload.url"
                            class="col-md-4 col-lg-12 col-xl-4 mb-3 mb-md-0 mb-lg-3 mb-xl-0 order-first order-md-last order-lg-first order-xl-last"
                          >
                            <div
                              class="file-type-display text-center bg-white"
                              style="width: 260px"
                            >
                              <img
                                :src="
                                  question.file_upload
                                    ? question.file_upload.url
                                    : require('~/assets/img/illustration-6.svg')
                                "
                                class="img-fluid w-100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="my-4" />
                    </div>
                    <div v-else-if="question.question_type === 'options'">
                      <div class="row">
                        <div class="col-md-8 col-lg-12 col-xl-8">
                          <div
                            class="text-primary fs-14 mb-3 font-family_brown d-flex align-items-center justify-content-between"
                          >
                            <div>
                              QUESTION {{ questionIndex + 1 }} of
                              {{ section.questions.length }}
                            </div>
                            <div>
                              {{ question.marks }}
                              <span class="text-light">marks</span>
                            </div>
                          </div>
                          <div class="mb-3 font-family_brown fs-16 text-dark">
                            {{ question.text }}
                            <br />
                            <small>Select all that apply</small>
                          </div>
                          <div>
                            <div
                              v-for="(option, optionIndex) in question.question_option"
                              :key="optionIndex"
                              class="d-flex align-items-center mb-2"
                            >
                              <label class="exercise-option-check">
                                <input
                                  type="checkbox"
                                  name="customRadio"
                                  :checked="option.correct_flag"
                                  disabled
                                />
                                <span class="checkmark"></span>
                                <span class="text">{{ option.option }}</span>
                              </label>
                            </div>
                            <div v-if="question.hint">
                              <small> Solution</small>
                              <p>{{ question.hint }}</p>
                            </div>
                          </div>
                        </div>
                        <div v-if="question.file_upload">
                          <div
                            v-if="question.file_upload.url"
                            class="col-md-4 col-lg-12 col-xl-4 mb-3 mb-md-0 mb-lg-3 mb-xl-0 order-first order-md-last order-lg-first order-xl-last"
                          >
                            <div
                              class="file-type-display text-center bg-white"
                              style="width: 260px"
                            >
                              <img
                                :src="
                                  question.file_upload
                                    ? question.file_upload.url
                                    : require('~/assets/img/illustration-6.svg')
                                "
                                class="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="my-4" />
                    </div>
                    <div v-else-if="question.question_type === 'freeText'">
                      <div class="row">
                        <div class="col-md-8 col-lg-12 col-xl-8">
                          <div
                            class="text-primary fs-14 mb-3 font-family_brown d-flex align-items-center justify-content-between"
                          >
                            <div>
                              QUESTION {{ questionIndex + 1 }} of
                              {{ section.questions.length }}
                            </div>
                            <div>
                              {{ question.marks }}
                              <span class="text-light">marks</span>
                            </div>
                          </div>
                          <div class="mb-3 font-family_brown fs-16 text-dark">
                            {{ question.text }}
                          </div>
                          <div>
                            <textarea id="" name="" cols="60" rows="4"></textarea>
                          </div>
                          <div v-if="question.hint">
                            <small> Solution</small>
                            <p>{{ question.hint }}</p>
                          </div>
                        </div>
                        <div v-if="question.file_upload">
                          <div
                            v-if="question.file_upload.url"
                            class="col-md-4 col-lg-12 col-xl-4 mb-3 mb-md-0 mb-lg-3 mb-xl-0 order-first order-md-last order-lg-first order-xl-last"
                          >
                            <div
                              class="file-type-display text-center bg-white"
                              style="width: 260px"
                            >
                              <img
                                :src="
                                  question.file_upload
                                    ? question.file_upload.url
                                    : require('~/assets/img/illustration-6.svg')
                                "
                                class="img-fluid w-100 h-100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="my-4" />
                    </div>
                  </div>
                </template>
              </div>
              <div v-if="allData.quiz_details.quiz_meta_data.sections.length > 1">
                <hr class="my-5" />
                <hr class="my-5" />
                <hr class="my-5" />
              </div>
            </div>
          </div>
          <div v-else-if="allData.quiz_details.type === 'essay'">
            <div class="d-flex justify-content-between">
              <div v-if="allData.quiz_details.quiz_meta_data.essay_item" class="">
                <div
                  v-if="allData.quiz_details.quiz_meta_data.essay_item.essay_sample_url"
                >
                  <p class="text-secondary">Essay Sample/ Attachment</p>
                  <div class="file-type-display py-3 px-3 text-center bg-white">
                    <a
                      href="#"
                      @click="openViewer(allData.quiz_details.quiz_meta_data.essay_item)"
                    >
                      {{ allData.quiz_details.quiz_meta_data.essay_item.file_name }}
                    </a>
                  </div>
                </div>
              </div>
              <div v-else class="text-danger">No File Attached</div>
            </div>
          </div>
          <div v-else-if="allData.quiz_details.type === 'offline'">
            <div class="d-flex justify-content-between">
              <!--  <div>
                                 <p class="text-secondary">
                                Essay Guide/Instructions
                            </p>
                            <p>
                                {{allData.quiz_details.quiz_meta_data.essay_item.essay_description_item}}
                            </p>

                            </div> -->
              <div class="">
                <div
                  v-if="allData.quiz_details.quiz_meta_data.essay_item.essay_sample_url"
                >
                  <p class="text-secondary">Offline Sample</p>
                  <div class="file-type-display py-3 px-3 text-center bg-white">
                    <a
                      target="_blank"
                      :href="
                        allData.quiz_details.quiz_meta_data.essay_item.essay_sample_url
                      "
                    >
                      {{ allData.quiz_details.quiz_meta_data.essay_item.file_name }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UtilsCardTab>

        <UtilsCardTab
          :title="
            allData.quiz_details.quiz_meta_data.quiz_type !== 'offline'
              ? 'Submissions'
              : 'Submissions'
          "
        >
          <Table
            :show-pagination="false"
            :items="
              allData.quizzes.map((e) => ({
                start: e.start_time ? e.start_time.slice(0, 16) : '__',
                stats: e.status === 'open' ? 'Not Graded' : e.status,
                scores: `${e.score ? e.score : '_'}/${allData.quiz_details.full_score}`,
                attempt: e.id ? 'View Attempt' : e.type === 'offline' ? 'offline' : '__',
                ...e,
              }))
            "
            :fields="fields"
            @attempt="viewAttempt"
          >
            <template #start="{ data }">
              <span>{{ data.item.start !== "__" ? justTime(data.item.start) : "" }}</span>
            </template>
            <template #attempt="{ data }">
              <div v-if="allData.quiz_details.state === 'open'">
                <div v-if="data.item.type === 'offline'">
                  <b-button
                    v-if="data.item.status === 'submitted'"
                    class="bg-primary w-100"
                    @click="gradeOffline(data.item)"
                  >
                    Grade</b-button
                  >
                  <b-button
                    v-else-if="data.item.status === 'open'"
                    class="bg-success w-100"
                    @click="offlineAcknowledge(data.item)"
                  >
                    Receive</b-button
                  >
                </div>
                <div v-else>
                  <div
                    :class="data.item.attempt === 'View Attempt' ? 'text-primary' : ''"
                    :style="{
                      cursor: data.item.attempt === 'View Attempt' ? 'pointer' : '',
                    }"
                    @click="viewAttempt(data.item)"
                  >
                    {{ data.item.attempt === "offline" ? "Grade" : data.item.attempt }}
                  </div>
                </div>
              </div>
              <div v-else></div>
            </template>
          </Table>
        </UtilsCardTab>
      </UtilsBaseCardTab>
      <modal-wrapper
        id="unpublish-modal"
        title="Unpublish Lesson"
        variant="danger"
        submit-title="Unpublish"
        @ok="unpublishLesson"
      >
        Are you sure you want to unpublish this Exercise?
      </modal-wrapper>
      <modal-wrapper
        id="publish-modal"
        title="Publish Exercise"
        variant="primary"
        submit-title="Publish"
        @ok="publishLesson"
      >
        Are you sure you want to publish this Exercise?
      </modal-wrapper>
      <modal-wrapper
        id="acknowledgeOffline"
        title="Acknowledge Exercise"
        variant="primary"
        submit-title="I have received it"
        @ok="handleAcknowledge"
      >
        <div class="text-center">Are you sure you have received this exercise?</div>
      </modal-wrapper>
      <modal-wrapper
        id="gradeOffline"
        title="Grade Exercise"
        variant="primary"
        submit-title="Grade"
        @ok="handleGradeOffline"
        @hide="handleHide"
      >
        <div class="">
          <div class="form-group">
            <div>
              <label for="exampleInputEmail1" class="form-label">
                Score /
                <span class="text-secondary"
                  >{{ allData.quiz_details.quiz_meta_data.full_score }} (Obtainable
                  Score)</span
                >

                <span v-if="showWarning" class="text-danger"
                  >Score cannot be greater than Obtainable Score</span
                >
              </label>
              <br />
              <input
                id="exampleInputEmail1"
                v-model="offlineScores.score"
                type="text"
                class="formcontrol w-100"
                placeholder="eg 10"
              />
            </div>
            <div class="mt-2">
              <label for="" class="">Comment(Optional)</label>
              <textarea
                id=""
                v-model="offlineScores.comment"
                name=""
                cols="30"
                rows="10"
                class="form-control"
                placeholder="Comment"
              ></textarea>
            </div>
          </div>
        </div>
      </modal-wrapper>
      <b-modal
        id="uploadedFileModal"
        centered
        hide-header-close
        header-class="mt-n3 pt-5"
        hide-footer
        size="lg"
      >
        <template #modal-header="{ close }">
          <!-- <h6 class="submitExerciseClass">
          Viewing
          {{ String(fileToView.file_name).split('.')[0] }}
        </h6> -->
          <div class="d-flex justify-content-between w-100">
            <img
              src="~/assets/lessons/svg/closeIcon.svg"
              alt="close icon"
              class="pointer mr-4"
              @click="close()"
            />
            <b-button variant="primary" @click="downloadFile(fileToView)"
              >Download</b-button
            >
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
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import axios from "axios";
import Input from "~/components/Base/Input.vue";
import LoadingBar from "~/components/LoadingBar.vue";
import ModalWrapper from "~/components/ModalWrapper.vue";
import noWhiteScreen from "~/mixins/offlineExercise";
export default {
  components: { LoadingBar, ModalWrapper, Input },
  mixins: [noWhiteScreen],
  data() {
    return {
      fileToView: "",
      Questions: "Questions",
      showWarning: false,
      options: [],
      offline: {
        acknowledge: "",
        exercise_offline_id: "",
        grade: "",
      },
      offlineScores: {
        score: "",
        comment: "",
      },

      fields: [
        { key: "full_name", sortable: true },
        { key: "start", label: "Date Started", sortable: true },

        { key: "stats", label: "Status", sortable: true },
        { key: "scores", label: "Score", sortable: true },
        { key: "attempt", label: "", sortable: false },
      ],
      started: false,
      downloadTimer: 0,
      stopTime: 0,
      ForCard: {},
    };
  },
  async fetch() {
    const excercise = this.$route.params.excercise;
    try {
      const {
        data: { data },
      } = await this.$axios.get(`/quiz/v3/quiz_config/${excercise}/students/`);
      //   this.data = data
      this.allData = data;
      this.options = data.quizzes;

      this.data = {
        class: data.quiz_class ? data.quiz_class : "__",
        excercise_type: data.quiz_details.type ? data.quiz_details.type : "__",
        subject: data.quiz_details.subject ? data.quiz_details.subject : "__",
        name: data.quiz_details.name ? data.quiz_details.name : "__",
        excercise_format: data.quiz_details.quiz_meta_data
          ? data.quiz_details.quiz_meta_data.quiz_mode
          : "__",
        status: data.quiz_details.status ? data.quiz_details.status : "__",
        icon_data: data.quiz_details.subject_details.icon_data
          ? data.quiz_details.subject_details.icon_data
          : "__",
        available_date: data.quiz_details.available_date
          ? data.quiz_details.available_date.slice(0, 10)
          : "__",
        due_date: data.quiz_details.due_date
          ? data.quiz_details.due_date.slice(0, 10)
          : "__",
      };
    } catch (error) {}
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  },

  methods: {
    async downloadFile(file) {
      // const attachment =
      //   this.allData.quiz_details.quiz_meta_data.essay_item.essay_sample_url.split(
      //     '.'
      //   )
      const fullName = this.allData.quiz_details.quiz_meta_data.essay_item.file_name;
      // const attachmentLength = attachment.length -1
      // const extension = `.${attachment[attachmentLength]}`
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
    justTime(value) {
      if (value) {
        const newDate = DateTime.fromSQL(value).toFormat("D");
        return newDate;
      } else {
        return "";
      }
    },
    async gradeOffline(e) {
      this.$bvModal.show("gradeOffline");
      try {
        const {
          data: { data },
        } = await this.$axios.get(
          `/quiz/v3/student_quiz/${this.allData.quiz_details.id}/student/${e.student_class_id}/mark/offline/`
        );
        this.offline.exercise_offline_id = data.student_quiz_id;
      } catch (error) {
        console.log(error);
      }
    },
    offlineAcknowledge(e) {
      this.offline.acknowledge = e.student_class_id;
      this.$bvModal.show("acknowledgeOffline");
    },
    handleHide() {
      this.showWarning = false;
      this.offlineScores = {};
    },
    async handleAcknowledge() {
      try {
        await this.$axios.get(
          `/quiz/v3/student_quiz/${this.allData.quiz_details.id}/student/${this.offline.acknowledge}/mark/offline/`
        );

        this.$bvModal.hide("acknowledgeOffline");
        this.$fetch();
      } catch (error) {
        console.error(error);
      }
    },
    async handleGradeOffline() {
      // check if the score is less than the obtainable score
      const submittedScore = parseInt(this.offlineScores.score);
      const obtainableScore = this.allData.quiz_details.quiz_meta_data.full_score;
      if (submittedScore > obtainableScore) {
        this.showWarning = true;
      } else {
        try {
          await this.$axios.post(
            `/quiz/v3/student_quiz/${this.offline.exercise_offline_id}/mark/offline/submit/`,
            {
              score: parseInt(this.offlineScores.score),
              comment: this.offlineScores.comment,
            }
          );
          this.offlineScores = {};
          this.showWarning = false;

          this.$fetch();
          this.$bvModal.hide("gradeOffline");
        } catch (error) {
          console.log(error);
        }
      }
    },
    viewAttempt(e) {
      if (e.id) {
        // this.$router.push(
        //   `/sms/${this.$route.params.id}/lms/excercises/${this.$route.params.excercise}/view-attempt/${e.id}?type=${e.type}`
        // )

        console.log("NOTICE MEEE", e);

        this.$router.push({
          name: "sms-id-lms-excercises-excercise-view-attempt-attempt",
          params: {
            excercise: this.$route.params.excercise,
            id: this.$route.params.id,
            attempt: e.id,
          },
          query: { _name: `${e.full_name}`, type: `${e.type}` },
        });
      }
    },
    sectionsScore(section) {
      let total = 0;
      section.questions.forEach((e) => {
        total += parseInt(e.marks);
      });
      return total;
    },
    timer() {
      this.started = !this.started;
    },
    stopTimer() {
      this.started = false;
      clearInterval(this.downloadTimer);
      clearTimeout(this.stopTime);
    },
    startTimer() {
      this.started = true;
      let timeleft = 5;
      this.downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
          clearInterval(this.downloadTimer);
        }

        document.getElementById("progressBar").value = 10 - 2 * timeleft;
        timeleft -= 1;
      }, 1000);
      this.stopTime = setTimeout(() => {
        this.stopTimer();
      }, 7000);
    },
    async publishLesson() {
      await this.$axios.put(
        `/quiz/v3/quiz_config/${this.$route.params.excercise}/draft/edit/?publish=true`,
        {
          quiz_config: this.allData.quiz_details.quiz_meta_data,
          quiz_id: this.$route.params.excercise,
        }
      );
      this.$bvModal.hide("publish-modal");
      await this.$fetch();
    },

    async unpublishLesson() {
      await this.$axios.put(
        `/quiz/v3/quiz_config/${this.$route.params.excercise}/unpublish/`
      );
      this.$bvModal.hide("unpublish-modal");
      // this.$router.go(-1)
      this.$fetch();
    },

    showUnpublishModal() {
      this.$bvModal.show("unpublish-modal");
    },
  },
};
</script>

<style scoped>
.position-relative {
  position: absolute;
  z-index: 999;
}
</style>
