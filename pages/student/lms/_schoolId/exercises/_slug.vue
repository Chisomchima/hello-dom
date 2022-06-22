/* eslint-disable vue/no-v-html */
<template>
  <div v-if="showHeaders">
    <div v-if="exerciseStarted && exerciseStartedDetails.type === 'objective'">
      <div class="">
        <div class="conatiner">
          <div class="card">
            <div class="card-body">
              <div class="p-xl-3 mx-xl-3">
                <div class="row">
                  <div class="col-12">
                    <div
                      class="
                        mb-4
                        d-flex
                        align-items-center
                        justify-content-between
                      "
                    >
                      <div class="text-primary fs-18">
                        <h5 class="fs-20">
                          <strong>
                            Section {{ objQuizSectionIndex + 1 }}
                          </strong>
                        </h5>
                        <strong
                          class="fs-16"
                          style="font-size: 1.2rem"
                          v-html="
                            exerciseStartedDetails.sections[objQuizSectionIndex]
                              .header
                              ? exerciseStartedDetails.sections[
                                  objQuizSectionIndex
                                ].header
                              : ''
                          "
                        ></strong>
                      </div>
                      <div
                        v-if="quizDurationMin > 0"
                        class="
                          text-danger
                          fs-14
                          card
                          shadow-sm
                          p-3
                          border
                          rounded
                        "
                      >
                        <strong
                          v-if="quizDurationMin < 1 && quizDurationSec < 1"
                          >Time up</strong
                        >
                        <strong v-else class="d-flex">
                          <span class="mr-2">Remaining Time: </span>

                          <Timer
                            v-if="quizDurationMin > 0"
                            :minutes="quizDurationMin"
                            @timeover="timeover"
                        /></strong>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-9">
                    <div
                      v-if="
                        exerciseStartedDetails.sections[objQuizSectionIndex]
                      "
                      class="mb-2"
                    >
                      <label
                        class="form-control-label mb-3 fs-14 line-height-100p"
                        >{{
                          exerciseStartedDetails.sections[objQuizSectionIndex]
                            .text
                        }}</label
                      >
                      <div class="fs-14 text-dark line-height-170p"></div>
                    </div>
                  </div>
                </div>

                <div class="mt-4">
                  <div class="row mb-3">
                    <div class="col-md-8 col-lg-12">
                      <div
                        v-if="
                          exerciseStartedDetails.sections[objQuizSectionIndex]
                        "
                        class="
                          fs-14
                          mb-3
                          font-family_brown
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                      >
                        <div class="text-light">
                          QUESTION
                          {{ objQuizQuestionIndex + 1 }}
                          of
                          {{
                            exerciseStartedDetails.sections[objQuizSectionIndex]
                              .questions.length
                          }}
                        </div>
                        <div class="text-primary border p-2 rounded shadow-sm">
                          {{
                            exerciseStartedDetails.sections[objQuizSectionIndex]
                              .questions[objQuizQuestionIndex]
                              ? exerciseStartedDetails.sections[
                                  objQuizSectionIndex
                                ].questions[objQuizQuestionIndex].marks
                              : 1
                          }}
                          <span class="text-light">marks </span>
                        </div>
                      </div>
                      <div
                        v-if="
                          exerciseStartedDetails.sections[objQuizSectionIndex]
                        "
                        class="mb-3 font-family_brown fs-16 text-dark"
                      >
                        {{
                          exerciseStartedDetails.sections[objQuizSectionIndex]
                            .questions[objQuizQuestionIndex]
                            ? exerciseStartedDetails.sections[
                                objQuizSectionIndex
                              ].questions[objQuizQuestionIndex].text
                            : ''
                        }}
                        <br
                          v-if="
                            exerciseStartedDetails.sections[objQuizSectionIndex]
                              .questions[objQuizQuestionIndex].question_type ===
                            'options'
                          "
                        />
                        <small
                          v-if="
                            exerciseStartedDetails.sections[objQuizSectionIndex]
                              .questions[objQuizQuestionIndex].question_type ===
                            'options'
                          "
                          >Select all that apply</small
                        >
                      </div>

                      <div
                        v-if="
                          exerciseStartedDetails.sections[objQuizSectionIndex]
                        "
                      >
                        <div
                          v-if="
                            exerciseStartedDetails.sections[objQuizSectionIndex]
                              .questions[objQuizQuestionIndex].question_type !==
                            'freeText'
                          "
                          class="text-light fs-12 mb-3"
                        >
                          Options
                        </div>

                        <div
                          v-if="
                            exerciseStartedDetails.sections[objQuizSectionIndex]
                              .questions[objQuizQuestionIndex].question_type ===
                            'options'
                          "
                        >
                          <div
                            v-for="(option, i) in exerciseStartedDetails
                              .sections[objQuizSectionIndex].questions[
                              objQuizQuestionIndex
                            ].question_option"
                            :key="i"
                            class="d-flex align-items-center mb-2"
                          >
                            <label class="exercise-option-check blue-check">
                              <input
                                :value="
                                  exerciseStartedDetails.sections[
                                    objQuizSectionIndex
                                  ].questions[objQuizQuestionIndex]
                                    .student_answer.selected_option_id
                                "
                                type="checkbox"
                                name="customRadio"
                                :checked="
                                  exerciseStartedDetails.sections[
                                    objQuizSectionIndex
                                  ].questions[
                                    objQuizQuestionIndex
                                  ].student_answer
                                    .map((item) => {
                                      return item.selected_option_id
                                    })
                                    .includes(option.option)
                                "
                                @change="
                                  addSelectedAnswer(
                                    objQuizSectionIndex,
                                    objQuizQuestionIndex,
                                    option.option,
                                    'options'
                                  )
                                "
                              />
                              <span class="checkmark"></span>
                              <span class="text">{{ option.option }}</span>
                            </label>
                          </div>
                        </div>

                        <div
                          v-if="
                            exerciseStartedDetails.sections[objQuizSectionIndex]
                              .questions[objQuizQuestionIndex].question_type ===
                            'freeText'
                          "
                        >
                          <div class="text-light fs-12 mb-2">Answer</div>

                          <textarea
                            :id="`freeText${objQuizSectionIndex}${objQuizQuestionIndex}`"
                            :value="
                              exerciseStartedDetails.sections[
                                objQuizSectionIndex
                              ].questions[objQuizQuestionIndex].student_answer
                                .selected_option_id
                            "
                            class="form-control"
                            placeholder="Enter your answer into this text area"
                            style="resize: none"
                            @input="
                              addSelectedAnswer(
                                objQuizSectionIndex,
                                objQuizQuestionIndex,
                                null,
                                'freeText'
                              )
                            "
                          ></textarea>
                        </div>

                        <div
                          v-if="
                            exerciseStartedDetails.sections[objQuizSectionIndex]
                              .questions[objQuizQuestionIndex].question_type ===
                            'trueFalse'
                          "
                        >
                          <div
                            v-for="(option, i) in exerciseStartedDetails
                              .sections[objQuizSectionIndex].questions[
                              objQuizQuestionIndex
                            ].question_option"
                            :key="i"
                            class="d-flex align-items-center mb-2"
                          >
                            <label
                              class="
                                exercise-option-check
                                blue-check
                                text-capitalize
                              "
                            >
                              <input
                                type="radio"
                                name="customRadio"
                                :checked="
                                  option.option ===
                                  exerciseStartedDetails.sections[
                                    objQuizSectionIndex
                                  ].questions[objQuizQuestionIndex]
                                    .student_answer.selected_option_id
                                "
                                @change="
                                  addSelectedAnswer(
                                    objQuizSectionIndex,
                                    objQuizQuestionIndex,
                                    option.option,
                                    'trueFalse'
                                  )
                                "
                              />
                              <span class="checkmark"></span>
                              <span class="text">{{ option.option }}</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="
                        exerciseStartedDetails.sections[objQuizSectionIndex]
                          .questions[objQuizQuestionIndex].image_url &&
                        exerciseStartedDetails.sections[objQuizSectionIndex]
                          .questions[objQuizQuestionIndex].image_url.length > 2
                      "
                      class="
                        col-md-4 col-lg-12 col-xl-4
                        mb-3 mb-md-0 mb-lg-3 mb-xl-0
                        order-first order-md-last order-lg-first order-xl-last
                      "
                    >
                      <div
                        class="file-type-display py-3 px-3 text-center bg-white"
                        style="max-width: 241px"
                      >
                        <img
                          :src="
                            exerciseStartedDetails.sections[objQuizSectionIndex]
                              .questions[objQuizQuestionIndex].image_url
                          "
                          class="img-fluid w-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="
                    mt-5
                    text-right
                    d-flesx
                    align-items-center
                    justify-content-between
                  "
                >
                  <button
                    class="
                      btn btn-borderless-primary-2
                      fs-14
                      d-inline-flex
                      align-items-center
                      py-2
                      px-3
                      mx-auto
                    "
                    :disabled="
                      objQuizQuestionIndex === 0 && objQuizSectionIndex === 0
                    "
                    @click="prevQuizAndSection()"
                  >
                    <span
                      class="iconify fs-16 mr-2"
                      data-inline="false"
                      data-icon="akar-icons:arrow-left"
                    ></span>
                    Previous
                  </button>
                  <button
                    v-if="
                      objQuizQuestionIndex ===
                        exerciseStartedDetails.sections[objQuizSectionIndex]
                          .questions.lastIndex &&
                      exerciseStartedDetails.sections.lastIndex ===
                        objQuizSectionIndex
                    "
                    class="
                      btn btn-primary-2 btn-primary
                      fs-14
                      d-inline-flex
                      align-items-center
                      py-2
                      px-3
                      mx-auto
                    "
                    @click="$bvModal.show('submitQuiz')"
                  >
                    Submit
                  </button>
                  <button
                    v-else
                    class="
                      btn btn-borderless-primary-2
                      fs-14
                      d-inline-flex
                      align-items-center
                      py-2
                      px-3
                      mx-auto
                    "
                    @click="nextQuizAndSection()"
                  >
                    Next
                    <!-- <span
                                            class="iconify fs-16 ml-2"
                                            data-inline="false"
                                            data-icon="akar-icons:arrow-right"
                                        ></span> -->
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card">
        <div class="card-body font-family_brown">
          <UtilsHeaderCardWithColor
            v-if="!$fetchState.pending && showExercisAndOrObj"
            class="mt-4"
            enable-image
            :disable-action="true"
            :status="student_status"
            :tinysubjecttitle="details.subject_details.name"
            :color="
              details.icon_data ? details.icon_data.icon_font_color : '#000000'
            "
            :img-src="
              details.subject_details.icon_data.icon
                ? details.subject_details.icon_data.icon
                : ''
            "
            :bg-color="details.subject_details.icon_data.icon_bg_color"
            :title="details.name"
            :data="details"
            :display-key="[
              'student_status',
              'excercise_type',
              'excercise_format',
              'due_date',
              'available_date',

              'type',
              'qc_mode',
              'full_score',
              'duration',
            ]"
          >
            <template #created_on-label>
              <span
                class="class-details-data_value mb-0"
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
              >
                Posted on:
              </span>
            </template>
            <template #student_status-label>
              <span
                class="class-details-data_value mb-0"
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
              >
                Status:
              </span>
            </template>

            <template #full_score-label>
              <span
                class="class-details-data_value mb-0"
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
              >
                Obtainable Score:
              </span>
            </template>
            <template #full_score="{ value }">
              <span
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
                >{{ value }} marks</span
              >
            </template>

            <template #qc_mode="{ value }">
              <span
                v-if="value === 'exercise'"
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
                >Classwork</span
              >
              <span
                v-else-if="value === 'assessment'"
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
                >Homework</span
              >
              <span
                v-else
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
                >{{ value }}</span
              >
            </template>
            <template #qc_mode-label>
              <span
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
                >Exercise format:
              </span>
            </template>
            <template #type-label>
              <span
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
                >Exercise type:
              </span>
            </template>

            <!-- <template #description-label>
              <span
                class="class-details-data_value mb-0"
                :style="`color: ${details.icon_data ? details.icon_data.icon_font_color : ''}`"
              >
                Exercise Instruction:
              </span>
            </template>
            <template #description="{ value }">
              <span
                :style="`color: ${details.icon_data ? details.icon_data.icon_font_color : ''}`"
                v-html="value"
              ></span>
            </template> -->

            <template #duration="{ value }">
              <span
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
                >{{ value }} minutes</span
              >
            </template>
            <template #created_on="{ value }">
              <span
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
                >{{ value }}</span
              >
            </template>

            <template #due_date="{ value }">
              <span
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
              >
                {{ new Date(value).toLocaleDateString() }}
              </span>
            </template>
            <template #available_date="{ value }">
              <span
                :style="`color: ${
                  details.icon_data ? details.icon_data.icon_font_color : ''
                }`"
              >
                {{ new Date(value).toLocaleDateString() }}
              </span>
            </template>
          </UtilsHeaderCardWithColor>
          <div v-if="showExercisAndOrObj" class="px-lg-5">
            <div class="rounded-lg">
              <!-- <div class="text-center px-4 my-3">
                <div class="fs-12 font-weight-bold line-height-150p text-light">
                  Quiz Type
                </div>
                <div class="fs-14 text-dark text-capitalize">
                  {{ details.type }}
                </div>
              </div>
              <div
                v-if="showExercisAndOrObj && exerciseStarted"
                class="text-center px-4 my-3"
              >
                <div class="fs-12 font-weight-bold line-height-150p text-light">
                  Due Date
                </div>
                <div class="fs-14 text-dark">
                  {{ new Date(details.due_date).toLocaleDateString() }}
                </div>
              </div>
              <div v-if="!exerciseStarted" class="text-center px-4 my-3">
                <div class="fs-12 font-weight-bold line-height-150p text-light">
                  No of Questions
                </div>
                <div class="fs-14 text-dark">
                  {{ details.number_of_questions }}
                </div>
              </div>
              <div class="text-center px-4 my-3">
                <div class="fs-12 font-weight-bold line-height-150p text-light">
                  Duration
                </div>
                <div class="fs-14 text-dark">
                  <span v-if="details.duration >= 0"
                    >{{ details.duration }}
                  </span>

                  <span v-else>0</span> minutes
                </div>
              </div>
              <div class="text-center px-4 my-3">
                <div class="fs-12 font-weight-bold line-height-150p text-light">
                  Obtainable Score
                </div>
                <div class="fs-14 text-dark">
                  {{ details.full_score }} marks
                </div>
              </div>
              <div v-if="!exerciseStarted" class="text-center px-4 my-3">
                <div class="fs-12 font-weight-bold line-height-150p text-light">
                  Due Date
                </div>
                <div class="fs-14 text-dark">
                  {{ new Date(details.due_date).toLocaleDateString() }}
                </div>
              </div>
              <div
                v-if="showExercisAndOrObj && exerciseStarted"
                class="text-center px-4 my-3"
              >
                <div class="fs-12 font-weight-bold line-height-150p text-light">
                  Your Score
                </div>
                <div class="fs-14 text-dark">--</div>
              </div> -->

              <div
                v-if="!$fetchState.pending "
                class="
                  col-12
                  fs-16
                  text-dark
                  line-height-150p
                  mt-4
                  d-flex
                  justify-content-between
                "
              >
              
                <div
                  class="
                    font-weight-bold
                    line-height-150p
                    text-light
                    omotola
                    teacher-comment
                  "
                >
                  Exercise Instruction 
                  <br />
                  <span v-html="details.description" class="omo"></span>
                   
                </div>

                <div
                  v-if="
                    details.student_status === 'graded' &&
                    details.type === 'essay'
                  "
                  class="p-2 teacher-comment"
                >
                  <h5>Teacher's Comment</h5>
                  {{ teacherComment }}
                 
                </div>
                <div
                  v-if="
                    details.type === 'essay' &&
                    details.student_status === 'graded'
                  "
                  class="graded-wrapper"
                >
                  <div class="text-center graded-starr">
                    <div>
                      <span class="studentScore">
                        {{ details.student_score }}
                      </span>

                      <span class="totalScore">
                        /
                        {{ details.full_score }}
                      </span>
                    </div>

                    <!-- <h5 class="">Your Score</h5> -->
                  </div>
                </div>
                <!-- eslint-disable vue/no-v-html -->
              </div>
            </div>

            <div class="text-dark line-height-170p">
              <!-- more description here -->
            </div>

            <!-- essay -->
            <div
              v-if="
                details.student_status === 'submitted' ||
                exerciseStarted ||
                details.student_status === 'opened' ||
                details.student_status === 'new'
              "
              class="mt-5"
            >
              <!-- <div
                v-if="details.type !== 'essay'"
                class="
                  text-primary
                  fs-14
                  mb-3
                  font-family_brown
                  d-flex
                  align-items-center
                  justify-content-between
                "
              >
                <div>QUESTION</div>
              </div>
              <div
                v-if="details.type !== 'essay'"
                class="mb-3 font-family_brown fs-14 text-dark"
                v-html="details.description"
              ></div> -->

              <div v-if="details.quiz_meta_data.essay_item">
                <template
                  v-if="
                    Object.values(details.quiz_meta_data.essay_item).length > 0
                  "
                >
                  <div class="mb-3 font-family_brown fs-14 text-dark px-4">
                    <div class="d-flex flex-column rounded">
                      <!-- <pre>{{ details.quiz_meta_data }}</pre> -->
                      <UploadedImageItem
                        :file-name="details.quiz_meta_data.essay_item.file_name"
                        :file="details.quiz_meta_data.essay_item"
                      />
                      <span
                        v-html="
                          details.quiz_meta_data.essay_item
                            .essay_description_item
                        "
                      ></span>
                    </div>
                  </div>
                </template>
              </div>
              <div
                v-if="
                  details.student_status === 'new' ||
                  details.student_status === 'opened'
                "
              ></div>

              <!-- -->
            </div>

            <div v-if="details.type === 'essay'">
              <div>
                <div v-if="showProgress" class="py-3">
                  <b-progress
                    :value="value"
                    variant="info"
                    animated
                  ></b-progress>
                </div>

                <div v-if="totalEssayFiles.length < 1" class="noFilesAdded">
                  No File Attached
                </div>
                <div v-else class="d-flex flex-column rounded">
                  <div
                    v-for="(file, i) in totalEssayFiles"
                    :key="i"
                    class="
                      d-flex
                      flex-lg-row flex-column
                      justify-content-lg-between
                      align-items-lg-center align-items-start
                      upload-doc-wrapper
                      w-max-100
                      my-1
                    "
                  >
                    <div class="d-flex align-items-lg-center">
                      <div class="icon-wrapper">
                        <svg
                          class="icon"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0)">
                            <path
                              d="M15.5002 8.16634C15.2557 8.16634 15.0418 8.07467 14.8585 7.89134L10.0002 3.03301L5.14183 7.89134C4.77516 8.25801 4.19461 8.25801 3.8585 7.89134C3.49183 7.52467 3.49183 6.94412 3.8585 6.60801L9.3585 1.10801C9.72516 0.741341 10.3057 0.741341 10.6418 1.10801L16.1418 6.60801C16.5085 6.97467 16.5085 7.55523 16.1418 7.89134C15.9585 8.07467 15.7446 8.16634 15.5002 8.16634Z"
                              fill="#1070B7"
                            />
                            <path
                              d="M16.3557 19.1659H3.64461C2.08627 19.1659 0.833496 17.9131 0.833496 16.3548V12.6882C0.833496 12.1687 1.23072 11.7715 1.75016 11.7715C2.26961 11.7715 2.66683 12.1687 2.66683 12.6882V16.3548C2.66683 16.9048 3.09461 17.3326 3.64461 17.3326H16.3557C16.9057 17.3326 17.3335 16.9048 17.3335 16.3548V12.6882C17.3335 12.1687 17.7307 11.7715 18.2502 11.7715C18.7696 11.7715 19.1668 12.1687 19.1668 12.6882V16.3548C19.1668 17.9131 17.914 19.1659 16.3557 19.1659Z"
                              fill="#1070B7"
                            />
                            <path
                              d="M10.0002 14.4911C9.48072 14.4911 9.0835 14.0939 9.0835 13.5744V2.72721C9.0835 2.20777 9.48072 1.81055 10.0002 1.81055C10.5196 1.81055 10.9168 2.20777 10.9168 2.72721V13.5744C10.9168 14.0939 10.5196 14.4911 10.0002 14.4911Z"
                              fill="#1070B7"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width="18.3333"
                                height="18.3333"
                                fill="white"
                                transform="translate(0.833496 0.833008)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div class="ml-3">
                        <!-- if edit file name -->
                        <div
                          v-if="checkFilesToRename(i)"
                          class="doc-title d-flex align-items-center"
                        >
                          <input
                            :id="`fileName${i}`"
                            v-model="String(file.file_name).split('.')[0]"
                            class="
                              form-control
                              h-auto
                              fs-14
                              px-1
                              py-1
                              flex-grow-1
                            "
                            placeholder="Enter name"
                          />
                          {{ file.format }}
                        </div>
                        <div v-else class="doc-title text-truncate">
                          {{
                            String(file.file_name).split('.')[0] ||
                            'Name Unavailable'
                          }}{{ file.format }}
                        </div>
                        <div class="doc-size">570 kb</div>
                      </div>
                    </div>

                    <div class="d-flex align-items-lg-center">
                      <div class="text-primary fs-14 pointer">
                        <strong @click="viewFile(file)">View</strong>
                      </div>

                      <div class="ml-3">
                        <div class="d-flex align-items-center">
                          <span
                            v-if="
                              !checkFilesToRename(i) &&
                              !['submitted', 'graded'].includes(
                                details.student_status
                              )
                            "
                            class="
                              text-primary
                              mr-2
                              fs-14
                              font-weight-bold
                              pointer
                            "
                            @click="renameFile(i)"
                            >Rename</span
                          >
                          <span
                            v-if="checkFilesToRename(i)"
                            class="
                              text-primary
                              mr-2
                              fs-14
                              font-weight-bold
                              pointer
                            "
                            @click="saveRenamedFiles(file, i)"
                            >Save</span
                          >

                          <span
                            v-if="
                              !['submitted', 'graded'].includes(
                                details.student_status
                              )
                            "
                            class="
                              text-danger
                              mr-2
                              fs-14
                              font-weight-bold
                              pointer
                            "
                            @click="deleteAttachment(file)"
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="isDeleting">
                    <b-modal
                      id="modal-center"
                      v-model="isDeleting"
                      centered
                      size="sm"
                      hide-footer
                      hide-header
                      title="Deleting"
                    >
                      <div
                        class="
                          bg-white
                          d-flex
                          justify-content-center
                          align-items-center
                        "
                      >
                        <div>
                          <b-spinner
                            variant="danger"
                            label="Spinning"
                          ></b-spinner>
                        </div></div
                    ></b-modal>
                  </div>
                </div>
              </div>

              <!-- <div
                                class="
                                    col-md-5 col-lg-12 col-xl-5
                                    mt-3 mt-md-0 mt-lg-3 mt-xl-0
                                "
                            >
                                <div
                                    class="
                                        form-control
                                        font-family_brown
                                        h-auto
                                        w-100
                                        bg-grayish-blue
                                        p-3
                                    "
                                >
                                    <div class="fs-12 text-light mb-2">
                                        Comment
                                    </div>
                                    <div class="fs-14 line-height-170p">
                                        No comments
                                        <span class="pointer text-primary"
                                            >more</span
                                        >
                                    </div>
                                </div>
                            </div> -->
            </div>

            <!-- v-if="
                    details.student_status === 'opened' ||
                    details.student_status === 'new' ||
                    exerciseStarted
                  " -->
            <label
              v-if="
                details.student_status != 'graded' &&
                details.type !== 'offline' &&
                details.type !== 'objective' &&
                !$fetchState.pending
              "
              for="fileUploadLabel"
              class="text-primary pointer d-flex align-content-center mt-3"
            >
              <!-- @click="addAttachment()" -->
              <input
                id="fileUploadLabel"
                type="file"
                class="inputfile"
                accept=".xlsx,.xls,.docx,.pptx,video/mp4,audio/mp3,application/pdf,image/*"
                @change="handleFileSelect"
              />

              <div class="mr-1 h1 line-height-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                  class="iconify fs-16"
                  data-icon="fluent:add-24-filled"
                  style="vertical-align: -0.125em; transform: rotate(360deg)"
                >
                  <g fill="none">
                    <path
                      d="M11.883 3.007L12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </div>
              <strong class="fs-14">Add Attachment</strong>
            </label>

            <div class="my-5 pt-5 pb-4 text-center">
              <!-- if graded -->
              <div
                v-if="
                  details.student_status === 'graded' &&
                  details.type !== 'essay'
                "
              >
                <p class="text-muted mb-n1">Your Score</p>
                <span
                  style="
                    font-family: Museo Sans;
                    font-size: 50px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 60px;
                    letter-spacing: -0.28999999165534973px;
                    text-align: left;
                  "
                >
                  {{ details.student_score }}</span
                >
                <span
                  style="
                    font-family: Brown;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 16px;
                    letter-spacing: -0.28999999165534973px;
                    text-align: left;
                  "
                  >/{{ details.full_score }}
                </span>
                <div>
                  <button
                    class="btn py-3 px-3 mx-auto viewGrading"
                    @click="
                      $router.push({
                        path: `/student/lms/${$route.params.schoolId}/exercises/submitted/${details.student_quiz_id}`,
                        query: {
                          _name: 'My Grade',
                        },
                      })
                    "
                  >
                    View Grading
                  </button>
                </div>
              </div>

              <div
                v-if="
                  details.student_status === 'submitted' &&
                  details.type === 'essay'
                "
              >
                <div>
                  <button
                    class="btn py-3 px-3 mx-auto viewGrading"
                    @click="unSubmitEssay()"
                  >
                    Un-Submit
                  </button>
                </div>
              </div>

              <div
                v-if="
                  details.student_status === 'submitted' &&
                  details.type !== 'essay'
                "
              >
                <div>
                  <button
                    class="btn py-3 px-3 mx-auto viewGrading"
                    @click="
                      $router.push({
                        path: `/student/lms/${$route.params.schoolId}/exercises/submitted/${details.student_quiz_id}`,
                        query: {
                          _name: 'My Submission',
                        },
                      })
                    "
                  >
                    View My Submission
                  </button>
                </div>
              </div>

              <!-- old code -->
              <!-- <div
                v-if="
                  details.student_status === 'new' ||
                  details.student_status === 'opened'
                "
              >
                <button
                  v-if="
                    !exerciseStarted &&
                    details.student_status !== 'opened' &&
                    details.type !== 'offline'
                  "
                  class="btn btn-primary-2 btn-primary py-3 px-3 mx-auto"
                  @click="startExercise()"
                >
                  
                  <span > Start Exercise </span>
                </button>
                <button
                  v-if="details.student_status === 'opened' || exerciseStarted"
                  class="btn btn-primary-2 btn-primary py-3 px-3 mx-auto"
                  :disabled="totalEssayFiles.length < 1"
                  @click="openSubmitModal()"
                >
            
                  Submit
                </button>
              </div> -->

              <!-- new stash 
              
                  v-if="
                    (!exerciseStarted && details.student_status === 'new') ||
                    details.student_status !== 'opened'
                  "
                   -->

              <div
                v-if="
                  details.student_status === 'new' ||
                  details.student_status === 'opened' ||
                  details.student_status === 'started'
                "
              >
                <button
                  v-if="
                    !exerciseStarted &&
                    details.student_status !== 'opened' &&
                    details.type !== 'offline' &&
                    details.type !== 'essay'
                  "
                  class="btn btn-primary-2 btn-primary py-3 px-3 mx-auto"
                  @click="startExercise()"
                >
                  <!-- Start Exercise -->

                  <span>
                    <span v-if="details.student_status === 'started'">
                      Continue
                    </span>
                    <span v-else> Start </span>

                    Exercise
                  </span>
                </button>

                <!-- <button
                  class="btn btn-primary-2 btn-primary py-3 px-3 mx-auto"
                  @click="startExercise()"
                >
                  Start Exercise
                </button> -->

                <button
                  v-if="
                    details.type !== 'offline' && details.type !== 'objective'
                  "
                  class="btn btn-primary-2 btn-primary py-3 px-3 mx-auto"
                  :disabled="totalEssayFiles.length < 1"
                  @click="openSubmitModal()"
                >
                  <!-- Start Exercise -->
                  Submit
                </button>
              </div>

              <div
                v-if="
                  details.student_status === 'new' &&
                  !exerciseStarted &&
                  details.type !== 'offline'
                "
                class="
                  fs-12
                  mt-3
                  text-light
                  line-height-100p
                  d-flex
                  align-items-center
                  justify-content-center
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 28 28"
                  class="iconify mr-1"
                  data-inline="false"
                  data-icon="fluent:info-28-filled"
                  style="transform: rotate(360deg)"
                >
                  <g fill="none">
                    <path
                      d="M2 14c0 6.627 5.373 12 12 12s12-5.373 12-12S20.627 2 14 2S2 7.373 2 14zm13.25-6a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zM14 11a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0v-8a1 1 0 0 1 1-1z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
                Your Exercise will begin once you click the button
              </div>
              <div
                v-if="
                  details.student_status === 'new' ||
                  details.student_status === 'submitted'
                "
                class="
                  fs-12
                  mt-3
                  text-light
                  line-height-100p
                  d-flex
                  align-items-center
                  justify-content-center
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 28 28"
                  class="iconify mr-1"
                  data-inline="false"
                  data-icon="fluent:info-28-filled"
                  style="transform: rotate(360deg)"
                >
                  <g fill="none">
                    <path
                      d="M2 14c0 6.627 5.373 12 12 12s12-5.373 12-12S20.627 2 14 2S2 7.373 2 14zm13.25-6a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zM14 11a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0v-8a1 1 0 0 1 1-1z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
                This exercise has not been graded yet
              </div>
            </div>
          </div>

          <div v-else>
            <div
              v-if="exerciseStartedDetails.type === 'objective'"
              class="p-xl-3 mx-xl-3"
            >
              <div class="row">
                <div class="col-12">
                  <div
                    class="
                      mb-4
                      d-flex
                      align-items-center
                      justify-content-between
                    "
                  >
                    <div class="text-primary fs-12">
                      <strong>Section 1</strong>
                    </div>
                    <div class="text-danger fs-14">
                      <strong
                        >Time: {{ quizDurationMin }}:{{
                          quizDurationSec
                        }}</strong
                      >
                    </div>
                  </div>
                </div>
                <div class="col-xl-9">
                  <div class="mb-2">
                    <label
                      class="form-control-label mb-3 fs-14 line-height-100p"
                      >Answer all questions in this section with the passage
                      below.</label
                    >
                    <div class="fs-14 text-dark line-height-170p">
                      Opera refers to a dramatic art form, originating in
                      Europe, in which the emotional content is conveyed to the
                      audience as much through music, both vocal and
                      instrumental, as it is through the lyrics. By contrast, in
                      musical theater an actor's dramatic performance is
                      primary, and the music plays a lesser role. The drama in
                      opera is presented using the primary elements of theater
                      such as scenery, costumes, and acting. However, the words
                      of the opera, or libretto, are sung rather than spoken.
                      The singers are accompanied by a musical ensemble ranging
                      from a small instrumental ensemble to a full symphonic
                      orchestra.
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <div class="row mb-3">
                  <div class="col-md-8 col-lg-12 col-xl-8">
                    <div
                      class="
                        fs-14
                        mb-3
                        font-family_brown
                        d-flex
                        align-items-center
                        justify-content-between
                      "
                    >
                      <div class="text-light">QUESTION 1 of 6</div>
                      <div class="text-primary">
                        10
                        <span class="text-light">marks</span>
                      </div>
                    </div>
                    <div class="mb-3 font-family_brown fs-16 text-dark">
                      From the passage above, what instruments do the singers
                      prefer?
                    </div>

                    <div>
                      <div class="text-light fs-12 mb-3">Options</div>

                      <div class="d-flex align-items-center mb-2">
                        <label class="exercise-option-check blue-check">
                          <input type="radio" name="customRadio" />
                          <span class="checkmark"></span>
                          <span class="text">True</span>
                        </label>
                      </div>
                      <div class="d-flex align-items-center mb-2">
                        <label class="exercise-option-check blue-check">
                          <input type="radio" name="customRadio" />
                          <span class="checkmark"></span>
                          <span class="text">False</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    class="
                      col-md-4 col-lg-12 col-xl-4
                      mb-3 mb-md-0 mb-lg-3 mb-xl-0
                      order-first order-md-last order-lg-first order-xl-last
                    "
                  >
                    <div
                      class="file-type-display py-3 px-3 text-center bg-white"
                      style="max-width: 241px"
                    >
                      <img
                        src="~/assets/img/illustration-6.svg"
                        class="img-fluid w-100"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-8 col-lg-12 col-xl-8">
                    <div
                      class="
                        fs-14
                        mb-3
                        font-family_brown
                        d-flex
                        align-items-center
                        justify-content-between
                      "
                    >
                      <div class="text-light">QUESTION 1 of 6</div>
                      <div class="text-primary">
                        10
                        <span class="text-light">marks</span>
                      </div>
                    </div>
                    <div class="mb-3 font-family_brown fs-16 text-dark">
                      From the passage above, what instruments do the singers
                      prefer?
                      <br />
                      <small>Select all that apply</small>
                    </div>
                    <div>
                      <div class="text-light fs-12 mb-3">Options</div>

                      <div class="d-flex align-items-center mb-2">
                        <label class="exercise-option-check blue-check">
                          <input type="checkbox" name="customRadio" />
                          <span class="checkmark"></span>
                          <span class="text">Orchestra</span>
                        </label>
                      </div>
                      <div class="d-flex align-items-center mb-2">
                        <label class="exercise-option-check blue-check">
                          <input type="checkbox" name="customRadio" />
                          <span class="checkmark"></span>
                          <span class="text">Piano</span>
                        </label>
                      </div>
                      <div class="d-flex align-items-center mb-2">
                        <label class="exercise-option-check blue-check">
                          <input type="checkbox" name="customRadio" />
                          <span class="checkmark"></span>
                          <span class="text">Guitar</span>
                        </label>
                      </div>
                      <div class="d-flex align-items-center mb-2">
                        <label class="exercise-option-check blue-check">
                          <input type="checkbox" name="customRadio" />
                          <span class="checkmark"></span>
                          <span class="text">All of the above</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    class="
                      col-md-4 col-lg-12 col-xl-4
                      mb-3 mb-md-0 mb-lg-3 mb-xl-0
                      order-first order-md-last order-lg-first order-xl-last
                    "
                  >
                    <div
                      class="file-type-display py-3 px-3 text-center bg-white"
                      style="max-width: 241px"
                    >
                      <img
                        src="~/assets/img/illustration-6.svg"
                        class="img-fluid w-100"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-8 col-lg-12 col-xl-8">
                    <div
                      class="
                        fs-14
                        mb-3
                        font-family_brown
                        d-flex
                        align-items-center
                        justify-content-between
                      "
                    >
                      <div class="text-light">QUESTION 1 of 6</div>
                      <div class="text-primary">
                        10
                        <span class="text-light">marks</span>
                      </div>
                    </div>
                    <div class="mb-3 font-family_brown fs-16 text-dark">
                      From the passage above, what instruments do the singers
                      prefer?
                    </div>
                    <div>
                      <div class="text-light fs-12 mb-2">Answer</div>

                      <textarea
                        class="form-control"
                        placeholder="Enter your answer into this text area"
                        style="resize: none"
                      ></textarea>
                    </div>
                  </div>
                  <div
                    class="
                      col-md-4 col-lg-12 col-xl-4
                      mb-3 mb-md-0 mb-lg-3 mb-xl-0
                      order-first order-md-last order-lg-first order-xl-last
                    "
                  >
                    <div
                      class="file-type-display py-3 px-3 text-center bg-white"
                      style="max-width: 241px"
                    >
                      <img
                        src="~/assets/img/illustration-6.svg"
                        class="img-fluid w-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="
                  mt-5
                  text-right
                  d-flesx
                  align-items-center
                  justify-content-between
                "
              >
                <button
                  class="
                    btn btn-borderless-primary-2
                    fs-14
                    d-inline-flex
                    align-items-center
                    py-2
                    px-3
                    mx-auto
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                    class="iconify fs-16 mr-2"
                    data-inline="false"
                    data-icon="akar-icons:arrow-left"
                    style="transform: rotate(360deg)"
                  >
                    <g fill="none">
                      <path
                        d="M11 5l-7 7l7 7"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M4 12h16"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                  Previous
                </button>
                <button
                  class="
                    btn btn-borderless-primary-2
                    fs-14
                    d-inline-flex
                    align-items-center
                    py-2
                    px-3
                    mx-auto
                  "
                >
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                    class="iconify fs-16 ml-2"
                    data-inline="false"
                    data-icon="akar-icons:arrow-right"
                    style="transform: rotate(360deg)"
                  >
                    <g fill="none">
                      <path
                        d="M4 12h16"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M13 5l7 7l-7 7"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                </button>
                <button
                  class="
                    btn btn-primary-2 btn-primary
                    fs-14
                    d-inline-flex
                    align-items-center
                    py-2
                    px-3
                    mx-auto
                  "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- view uploaded file modal -->
    <b-modal
      id="uploadedFileModal"
      centered
      hide-header-close
      header-class="mt-n3 pt-5"
      hide-footer
      size="xl"
    >
      <template #modal-header="{ close }">
        <h6 class="submitExerciseClass">
          Viewing
          {{ String(fileToViewComputed.file_name).split('.')[0] }}
        </h6>
        <img
          src="~/assets/lessons/svg/closeIcon.svg"
          alt="close icon"
          class="pointer mr-4"
          @click="close()"
        />
      </template>
      <div class="text-center">
        <img
          v-if="
            ['.png', '.jpeg', '.jpg', '.gif'].includes(
              fileToViewComputed.format
            )
          "
          style="max-width: 100%; height: auto"
          :src="fileToViewComputed.url"
          :alt="fileToViewComputed.file_name"
        />
        <WebViewer
          v-if="
            ['.pdf', '.xlsx', '.xls', '.pptx', '.docx'].includes(
              fileToViewComputed.format
            )
          "
          :url="fileToViewComputed.url"
        />
        <audio v-if="['.mp3'].includes(fileToViewComputed.format)" controls>
          <source :src="fileToViewComputed.url" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <video
          v-if="['.mp4'].includes(fileToViewComputed.format)"
          width="500"
          height="340"
          controls
        >
          <source :src="fileToViewComputed.url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </b-modal>

    <!-- file not added -->
    <b-modal id="fileNotAdded" hide-footer hide-header>
      <div class="text-center mt-0 mb-4">
        <img src="~/assets/lessons/svg/cantUpload.svg" alt="cant Upload Icon" />
      </div>
      <p
        class="my-3 text-center"
        style="
          font-family: Brown;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 150%;
          text-align: center;
          color: #8b9eb0;
        "
      >
        You have not uploaded a file for this exercise
      </p>
      <div class="text-center mb-4">
        <button
          class="lightPrimary fs-14 d-inline-flex align-items-center mx-auto"
          @click="closeModal('fileNotAdded')"
        >
          Upload a File
        </button>
      </div>
    </b-modal>
    <!-- successful submit modal -->
    <b-modal
      id="successfulSubmitQuiz"
      hide-footer
      hide-header
      header-class="pt-5"
    >
      <div class="text-center mt-0 mb-4">
        <img
          src="~/assets/lessons/svg/lessonComplete.svg"
          alt="Lesson Complete Icon"
        />
      </div>
      <p
        class="my-3 text-center"
        style="
          font-family: Brown;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 150%;
          text-align: center;
          color: #8b9eb0;
        "
      >
        You have successfully submitted this exercise 🎉. <br />
        Your exercise will be graded by your teacher.
      </p>
      <div class="text-center mb-4">
        <button
          class="lightPrimary fs-14 d-inline-flex align-items-center mx-auto"
          @click="
            $router.push(`/student/lms/${$route.params.schoolId}/exercises`)
          "
        >
          Back to Exercises
        </button>
      </div>
    </b-modal>
    <!-- submit modal -->
    <b-modal
      id="submitQuiz"
      hide-header-close
      header-class="mt-n3 pt-5"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h6 class="submitExerciseClass">Submit Exercise</h6>
        <img
          src="~/assets/lessons/svg/closeIcon.svg"
          alt="close icon"
          class="pointer mr-4"
          @click="close()"
        />
      </template>
      <p
        class="my-3 mt-n2 text-center"
        style="
          font-family: Brown;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 150%;
          text-align: center;
          color: #8b9eb0;
        "
      >
        Are you sure you want to submit this quiz? <br />
        If there is time, you can review your answers
      </p>
      <div class="text-center mb-4 mt-4">
        <button
          class="lightPrimary fs-14 d-inline-flex align-items-center mx-auto"
          @click="closeModal('submitQuiz')"
        >
          Cancel
        </button>
        <button
          :disabled="submitbuttonEnabled"
          class="fixPrimary fs-14 d-inline-flex align-items-center mx-auto"
          @click="submitEssayExercise()"
        >
          Submit
        </button>
      </div>
    </b-modal>
    <!-- auto submit modal -->
    <b-modal id="autoSubmitQuiz" hide-footer hide-header>
      <div class="text-center mt-0 mb-4">
        <img
          src="~/assets/lessons/svg/autoSubmitIcon.svg"
          alt="Auto Submit Icon"
        />
      </div>
      <p
        class="my-3 text-center"
        style="
          font-family: Brown;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 150%;
          text-align: center;
          color: #8b9eb0;
        "
      >
        Your time is up and your exercise has been <br />
        automatically submitted.
      </p>
      <div class="text-center mb-4">
        <button
          class="lightPrimary fs-14 d-inline-flex align-items-center mx-auto"
          @click="
            $router.push(`/student/lms/${$route.params.schoolId}/exercises`)
          "
        >
          Back to Exercises
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import WebViewer from '@/components/WebViewer.vue'
export default {
  name: 'LessonDetails',
  components: { WebViewer },
  layout: 'authWithoutTopbar',
  data() {
    return {
      showHeaders: true,
      teacherComment: '',
      instance: null,
      submitbuttonEnabled: false,

      value: 0,
      showProgress: false,
      totalEssayFiles: [],
      isDeleting: false,
      timeout: {},
      fileToView: {},
      modalShow: false,
      objExerciseSubmissionDetails: {},
      quizDurationMin: 0,
      quizDurationSec: 59,
      objQuizQuestionIndex: 0,
      objQuizSectionIndex: 0,
      filesToRename: [],
      currentFileIndex: 0,
      essayFiles: [{ name: null, size: 0 }],
      details: {},
      exerciseStarted: false,
      exerciseStartedDetails: {
        sections: [],
      },
      exerciseStartedDetailsToShow: {
        sections: [],
      },
    }
  },
  async fetch() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    // this.$nuxt.$loading.start()
    const { data } = await this.$axios.$get(
      `quiz/v3/quiz/${this.$route.params.slug}/detail/student`
    )

    console.log('is ID RETURNED', data)
    this.details = data

    if (data.type === 'essay' || data.type === 'offline') {
      this.exerciseStarted = true
      // this.details = data
      this.startExercise()
    }
    this.totalEssayFiles = data.student_quiz_files

    if (data.student_status === 'opened') {
      this.exerciseStarted = true
    }
    if (data.student_status === 'graded' && data.type === 'essay') {
      this.getTeacherComment(data.student_quiz_id)
    }
    // this.getFilesForEssay()

    this.$nextTick(() => {
      // this.$nuxt.$loading.start()
      this.$nuxt.$loading.finish()
    })
  },
  computed: {
    fileToViewComputed() {
      return this.fileToView
    },
    checkIfFilesValid() {
      return this.totalEssayFiles.filter((item) => {
        return item.name === null || item.size < 1
      })
    },
    showExercisAndOrObj() {
      if (
        this.exerciseStarted &&
        this.exerciseStartedDetails.type === 'essay'
      ) {
        return true
      }
      if (!this.exerciseStarted && this.exerciseStartedDetails === {}) {
        return true
      }
      return true
    },
    currentRouteName() {
      const nameArr = this.$route.name.split('-')
      return (
        nameArr[nameArr.length - 2] +
        '/' +
        this.$route.params.slug.replace(/-/g, ' ')
      )
    },
  },

  watch: {
    quizDurationSec: {
      async handler(value) {
        if (this.exerciseStarted) {
          if (this.quizDurationMin < 1 && this.quizDurationSec < 1) {
            try {
              clearTimeout(this.timeout)
              this.$bvModal.show('autoSubmitQuiz')
              await this.submitObjExercise()

              // setTimeout(() => {
              //   this.$router.push(
              //     `/student/lms/${this.$route.params.schoolId}/exercises`
              //   )
              // }, 500)

              // if (this.exerciseStartedDetails.type === 'objective') {
              //   this.$bvModal.show('autoSubmitQuiz')

              //   // this.$bvModal.hide('autoSubmitQuiz')

              // }
            } catch (error) {
              clearTimeout(this.timeout)
            }
          }
        }

        this.timeout = setTimeout(() => {
          // twice to fix the 2 seconds skipping

          setTimeout(() => {
            this.quizDurationSec--

            if (value === 1) {
              this.quizDurationSec = 59
              this.quizDurationMin--
            }
          }, 1100)
        }, 1000)
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
  mounted() {
    this.instance = axios.create({
      baseURL: `${process.env.BASE_URL}`,
    })

    this.instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${this.$store.state.auth.token}`
      return config
    })
    console.log(this.$route)
  },
  methods: {
    // eslint-disable-next-line camelcase
    async getTeacherComment(student_quiz_id) {
      // eslint-disable-next-line camelcase
      this.showHeaders =false
      try{

 const {
        data: { data },
      } = await this.$axios.get(
        `https://stagingapi.slate.ng/quiz/v3/student_quiz/${student_quiz_id}/review/`
      )
      this.teacherComment = data.comment
      console.log('comment', data)

      }catch(error){
console.log(error)
      }finally{
        this.showHeaders = true
      }
     
    },
    async timeover() {
      try {
        this.$bvModal.show('autoSubmitQuiz')
        await this.submitObjExercise()
      } catch (e) {
        console.log(e)
      }
    },
    viewFile(file) {
      this.fileToView = file

      this.$bvModal.show('uploadedFileModal')
    },
    async downloadFile(file) {
      console.log(file)
      try {
        const response = await axios.get(file.url, {
          responseType: 'blob',
        })
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `name ${file.format}`
        link.click()
        URL.revokeObjectURL(link.href)
      } catch (e) {
        console.error(e)
      }
    },
    async getFilesForEssay(studentquizid) {
      let files
      // get files if started already
      if (studentquizid) {
        files = await this.$axios.$get(`quiz/v3/${studentquizid}/essay/files`)
      } else {
        console.log('THIS DETILA', this.details)
        files = await this.$axios.$get(
          `quiz/v3/${this.details.student_quiz_id}/essay/files`
        )
      }
      this.totalEssayFiles = files.data.results
    },
    changeFileNames() {},
    addSelectedAnswer(sectionIndex, objQuizQuestionIndex, answer, type) {
      if (type === 'freeText') {
        const valueAnswer = this.$el.querySelector(
          `#freeText${sectionIndex}${objQuizQuestionIndex}`
        ).value
        answer = valueAnswer
      }

      if (type === 'options') {
        // check if item is already selected
        const arrayOfValues = this.exerciseStartedDetails.sections[
          sectionIndex
        ].questions[objQuizQuestionIndex].student_answer.map((item) => {
          return item.selected_option_id
        })

        const findIndexOfItemSelected = arrayOfValues.indexOf(answer)
        // remove if already selected
        if (findIndexOfItemSelected >= 0) {
          this.exerciseStartedDetails.sections[sectionIndex].questions[
            objQuizQuestionIndex
          ].student_answer.splice(findIndexOfItemSelected, 1)
        } else {
          // add if not selected
          this.exerciseStartedDetails.sections[sectionIndex].questions[
            objQuizQuestionIndex
          ].student_answer.push({
            selected_option_id: answer,
          })
        }
      } else {
        this.exerciseStartedDetails.sections[sectionIndex].questions[
          objQuizQuestionIndex
        ].student_answer = {
          selected_option_id: answer,
        }
      }
      console.log(this.exerciseStartedDetails.sections)
    },
    async submitObjExercise() {
      const exerciseDetailsToSubmit = {
        available_date: this.details.available_date,
        description: this.details.description,
        due_date: this.details.due_date,
        duration: this.details.duration,
        // essay_item: {
        //     file_name: '',
        //     essay_sample_url: '',
        //     essay_description_item: '',
        // },
        full_score: this.details.full_score,
        // icon_data: {
        //     icon: 'assets/img/Illustrations/Books.svg',
        //     icon_bg_color: 'green',
        //     icon_font_color: 'navyblue',
        // },
        lesson_objective: [],
        name: this.details.name,
        quiz_mode: this.details.qc_mode,
        quiz_type: this.details.type,
        sections: this.exerciseStartedDetails.sections,
        subject_id: this.exerciseStartedDetails.student_quiz_id,
      }

      this.objExerciseSubmissionDetails = exerciseDetailsToSubmit
      // try {
      await this.$axios.$post(
        `/quiz/v3/submit/${this.exerciseStartedDetails.student_quiz_id}/obj/`,
        {
          student_answers: exerciseDetailsToSubmit,
        }
      )
      // } catch (error) {
      //     console.log(error)
      // }
    },
    async unSubmitEssay() {
      await this.$axios.$get(
        `/quiz/v3/unsubmit/${this.details.student_quiz_id}/essay/`
      )
      await this.$fetch()
    },
    nextQuizAndSection() {
      // if there is an existing next section
      // if (this.exerciseStartedDetails.sections[this.objQuizSectionIndex + 1]) {
      ++this.objQuizQuestionIndex
      // }
      if (this.exerciseStartedDetails.type === 'objective') {
        const total =
          this.exerciseStartedDetails.sections[this.objQuizSectionIndex]
            .questions.length
        // if the  current question is the last question in the section
        if (total === this.objQuizQuestionIndex) {
          this.objQuizSectionIndex++
          this.objQuizQuestionIndex = 0
        }
      }
    },
    prevQuizAndSection() {
      // if the question index is not zero
      if (this.objQuizQuestionIndex !== 0) {
        --this.objQuizQuestionIndex
      }
      if (this.exerciseStartedDetails.type === 'objective') {
        // if the question index is zero and there is an existing previous section

        if (
          this.objQuizQuestionIndex === 0 &&
          this.exerciseStartedDetails.sections[this.objQuizSectionIndex - 1]
        ) {
          --this.objQuizSectionIndex
          const total =
            this.exerciseStartedDetails.sections[this.objQuizSectionIndex]
              .questions.length
          this.objQuizQuestionIndex = total - 1
        }
      }
    },
    closeModal(item) {
      this.$bvModal.hide(item)
    },
    openSubmitModal() {
      this.exerciseStarted = true
      this.startExercise()

      // check if all files are valid
      // if valid
      if (this.totalEssayFiles.length < 1) {
        this.$bvModal.show('fileNotAdded')
        return
      }
      this.$bvModal.show('submitQuiz')
    },
    async submitEssayExercise() {
      try {
        this.submitbuttonEnabled = true

        if (this.exerciseStartedDetails.type === 'objective') {
          await this.submitObjExercise()
          this.$bvModal.show('successfulSubmitQuiz')
          this.$bvModal.hide('successfulSubmitQuiz')
          // setTimeout(() => {
          //   this.$bvModal.hide('successfulSubmitQuiz')
          //   this.$router.push(
          //     `/student/lms/${this.$route.params.schoolId}/exercises`
          //   )
          // }, 2000)
        } else {
          // submit quiz
          await this.$axios.$post(
            `/quiz/v3/submit/${this.details.student_quiz_id}/essay/`,
            {}
          )

          this.$bvModal.show('successfulSubmitQuiz')

          setTimeout(() => {
            this.$bvModal.hide('successfulSubmitQuiz')
            this.$router.push(
              `/student/lms/${this.$route.params.schoolId}/exercises`
            )
          }, 2000)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.submitbuttonEnabled = false
      }
    },
    // getInputRenamed(item) {},
    async saveRenamedFiles(file, i) {
      const newName = this.$el.querySelector(`#fileName${i}`).value
      try {
        await this.$axios.$post(
          `/quiz/v3/rename/${this.details.student_quiz_id}/essay/file/${file.file_id}/`,
          {
            name: newName,
          }
        )
        const index = this.filesToRename.indexOf(i)
        this.filesToRename.splice(index, 1)
        await this.getFilesForEssay()
        this.$toast({
          type: 'success',
          text: 'File Renamed',
        })
      } catch (error) {}
    },
    checkFilesToRename(index) {
      return this.filesToRename.includes(index)
    },
    renameFile(i) {
      this.filesToRename.push(i)
    },
    async deleteAttachment(file) {
      this.isDeleting = true
      try {
        await this.$axios.$post(
          `/quiz/v3/remove/${this.details.student_quiz_id}/essay/file/${file.file_id}/`,
          {}
        )
        await this.getFilesForEssay()
        this.$toast({
          type: 'success',
          text: 'File Deleted',
        })
        this.isDeleting = false
      } catch (error) {
        this.isDeleting = false
      }
      // this.essayFiles.splice(index, 1)
    },
    addAttachment() {
      this.essayFiles.push({ name: null, size: 0 })
    },
    setFileIndex(i) {
      this.currentFileIndex = i
    },
    async handleFileSelect(event) {
      this.exerciseStarted = true
      this.startExercise()
      this.showProgress = true
      this.value = this.value + 10
      console.log('file upload started', this.details.student_quiz_id)

      // https://stagingapi.slate.ng/quiz/v3/72dc13cd-14a4-42df-bdeb-09ef670803c2/essay/files/
      try {
        this.value = this.value + 20
        const formData = new FormData()
        formData.append('file', event.target.files[0])
        formData.append('name', event.target.files[0].name)
        await this.$axios.$post(
          `/quiz/v3/upload/${this.details.student_quiz_id}/essay/file/`,
          formData
        )
        this.value = this.value + 60

        await this.getFilesForEssay()
        this.$toast({
          type: 'success',
          text: 'File Attached',
        })
        this.value = this.value + 10

        setTimeout(() => {
          this.showProgress = false
          this.value = 0
        }, 300)
      } catch (error) {
        this.showProgress = false
        console.log(error)
      }
    },
    async startExercise() {
      console.log('exercise started', this.details.type)
      this.exerciseStarted = true
      try {
        let data
        if (this.details.type === 'objective') {
          data = await this.$axios.$get(
            `/quiz/v3/start/${this.details.id}/obj/`
          )

          console.log('IMPORTANT!!!!!!', data)
          data.sections = data.sections.map((item) => {
            console.log('first item !!!!!!', item)
            return {
              ...item,
              questions: item.questions.map((item2) => {
                console.log('second item !!!!!!', item2)
                return {
                  ...item2,
                  student_answer:
                    item2.answer_type === 'options'
                      ? [{ selected_option_id: '' }]
                      : { selected_option_id: '' },
                }
              }),
            }
          })
          console.log(data)
        } else if (this.details.type === 'essay') {
          this.exerciseStarted = true
          let data2 = await this.instance.get(
            `/quiz/v3/start/${this.details.id}/essay/`
          )
          data = data2.data
          await this.getFilesForEssay(data.student_quiz_id)
          // console.log(data)
        }

        // NOTE: check if sections are enough
        this.exerciseStartedDetails = data
        this.exerciseStartedDetailsToShow = data
        this.quizDurationMin = data.duration
        this.quizDurationSec = 59
        this.exerciseStarted = true
        this.details.student_quiz_id = data.student_quiz_id
        // console.log(
        //     'ccccccccccccccccccccccccccccccccccc',
        //     this.exerciseStartedDetails
        // )
      } catch (error) {
        this.exerciseStartedDetails = {}
        this.exerciseStartedDetailsToShow = {}
        this.quizDurationMin = 0
        this.exerciseStarted = false
        console.log(error)
      }
    },
    showLesson() {
      this.$router.push({
        name: 'lesson',
        params: {
          schoolId: this.$route.params.schoolId,
          slug: this.$route.params.slug,
        },
      })
    },
    getId(url) {
      const [, id] = url.split('.')
      return id
    },
  },
}
</script>

<style scoped>
.submitExerciseClass {
  font-family: Museo Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #8b9eb0;
}

.viewGrading {
  border: 1px solid #229af2;
  background: #fff;
  box-shadow: 0px 4px 8px rgba(16, 112, 183, 0.05);
  border-radius: 5px;
  padding: 14px 20px 12px;
  color: #229af2;
}
.lightPrimary {
  border: none;
  background: #d2ecfd;
  box-shadow: 0px 4px 8px rgba(16, 112, 183, 0.05);
  border-radius: 5px;
  padding: 9px 20px 9px 20px;
  color: #229af2;
}
.fixPrimary {
  border: none;
  background: #229af2;
  box-shadow: 0px 4px 8px rgba(16, 112, 183, 0.05);
  border-radius: 5px;
  padding: 9px 20px 9px 20px;
  color: #fff;
}
.noFilesAdded {
  background-color: #f2f2f2;
  width: 100%;
  height: 10vh;
  padding: 1rem;
  border-radius: 5px;
}
.inputfile {
  /* visibility: hidden etc. wont work */
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.studentScore {
  font-size: 3rem;
  font-weight: 800;
}
.totalScore {
  font-size: 2rem;
  font-weight: 400;
}
.omotola {
  font-size: 1rem;
}
.omo {
  font-size: 1.3rem;
}
.graded-starr {
  background: url('~assets/img/Star.png') center no-repeat;
  width: 152px;
  height: 152px;

  color: #fff;
  font-family: Museo-md;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.graded-wrapper {
  /* margin-left: 25rem; */
}
.teacher-comment {
  max-width: 25rem;
  word-wrap: break-word;
}
</style>
