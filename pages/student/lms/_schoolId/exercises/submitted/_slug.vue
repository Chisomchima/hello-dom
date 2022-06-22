<template>
  <div class="conatiner">
    <div class="card class-details-card mb-3">
      <div class="card-body">
        <div
          class="
            d-flex
            align-items-center
            justify-content-between
            flex-wrap
            mb-3
          "
        >
          <div class="class-name mr-1">
            {{ quiz.quiz_name }}
          </div>
        </div>
        <hr class="my-0" />
        <div class="mt-3">
          <div class="row">
            <div class="col-lg-10">
              <div class="row">
                <!-- <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                                        <span class="class-details-data_label">Exercise Name:</span>
                                        <span class="class-details-data_value">Plants and Animals</span>
                                    </div> -->
                <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                  <span class="class-details-data_label">Date Started:</span>
                  <span class="class-details-data_value">{{
                    new Date(quiz.start_time).toLocaleDateString()
                  }}</span>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                  <span class="class-details-data_label">Date Submitted:</span>
                  <span class="class-details-data_value">
                    {{ new Date(quiz.submit_time).toLocaleDateString() }}</span
                  >
                  <!-- 15/03/2021 -->
                </div>
                <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                  <span class="class-details-data_label">Status:</span>
                  <span
                    :class="`pr-3 mb-2 ${
                      quiz.status === 'submitted'
                        ? 'warnText'
                        : quiz.status === 'marked'
                        ? 'successText'
                        : ''
                    }`"
                  >
                    <span v-if="quiz.status === 'marked'"> Graded </span>

                    <span v-else> {{ quiz.status }}</span>
                  </span>
                  <!-- <span class="class-details-data_value"
                                        ><span class="text-danger"
                                            >Not graded</span
                                        ></span
                                    > -->
                </div>
                <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                  <span class="class-details-data_label">Subject:</span>
                  <span class="class-details-data_value">{{
                    quiz.subject_name
                  }}</span>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                  <span class="class-details-data_label">Class:</span>
                  <span class="class-details-data_value">{{ quiz.class }}</span>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-6 col-xl-4 mb-2">
                  <span class="class-details-data_label">No of Attempts:</span>
                  <span class="class-details-data_value">{{
                    quiz.attempted_questions
                  }}</span>
                </div>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="font-family_brown font-weight-bold fs-14 text-light">
                Total Score
              </div>
              <div class="font-family_brown font-weight-bold fs-30 text-dark">
                {{ quiz.score
                }}<span class="fs-16">/{{ quiz.total_score }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div v-if="quiz.answers">
          <div v-for="(section, i) in quiz.answers.sections" :key="i">
            <div class="row">
              <div class="col-xl-7 mb-3 mb-xl-0">
                <div class="text-primary family_brown fs-18 mb-3">
                  <strong>Section {{ i + 1 }}</strong>
                </div>
                <div
                  class="text-primary family_brown fs-18 mb-3"
                  v-html="section.header"
                ></div>
                <div class="mb-2">
                  <label
                    class="
                      form-control-label
                      fs-14
                      font-weight-normal
                      font-family_brown
                      mb-2
                    "
                    v-html="section.title"
                  ></label>
                  <div
                    class="fs-14 text-dark font-family_brown"
                    v-html="section.text"
                  ></div>
                </div>
              </div>
            </div>
            <hr class="my-4" />

            <div class="">
              <div
                v-for="(question, index) in section.questions"
                :key="index"
                class="row"
              >
                <div class="col-md-8 col-lg-12 col-xl-7">
                  <div
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
                    <div>
                      QUESTION {{ index + 1 }} of
                      {{ section.questions.length }}
                    </div>
                    <div>
                      {{ question.marks }}
                      <span class="text-light">marks</span>
                    </div>
                  </div>

                  <!-- if answer_type is trueFalse -->
                  <div v-if="question.answer_type === 'trueFalse'">
                    <div class="mb-3 font-family_brown fs-16 text-dark">
                      {{ question.text }}
                    </div>
                    <div class="disable-interaction">
                      <div class="d-flex align-items-center mb-2">
                        <label class="exercise-option-check">
                          <input
                            type="radio"
                            :name="'customRadio' + Math.random()"
                            :checked="
                              question.student_answer.selected_option_id ===
                                'true' ||
                              question.student_answer.selected_option_id ===
                                true ||
                              question.student_answer.selected_option_id ===
                                'True'
                            "
                          />
                          <span class="checkmark"></span>
                          <span class="text">True</span>
                        </label>
                      </div>
                      <div class="d-flex align-items-center mb-2">
                        <label class="exercise-option-check">
                          <input
                            type="radio"
                            :name="'customRadio' + Math.random()"
                            :checked="
                              question.student_answer.selected_option_id ===
                                'false' ||
                              question.student_answer.selected_option_id ===
                                false ||
                              question.student_answer.selected_option_id ===
                                'False'
                            "
                          />
                          <span class="checkmark"></span>
                          <span class="text">False</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div v-if="question.answer_type === 'freeText'">
                    <div class="mb-3 font-family_brown fs-16 text-dark">
                      {{ question.text }}
                    </div>
                    <div class="disable-interaction">
                      <div
                        class="
                          form-control
                          line-height-150p
                          fs-14
                          border-0
                          bg-grayish-pink
                          h-auto
                          py-3
                          px-3
                        "
                        style="min-height: 60px"
                      >
                        {{
                          question.student_answer.selected_option_id ||
                          'No answer'
                        }}
                      </div>
                    </div>
                  </div>

                  <div v-if="question.answer_type === 'options'">
                    <div class="mb-3 font-family_brown fs-16 text-dark">
                      {{ question.text }}
                      <br />
                      <small>Select all that apply</small>
                    </div>

                    <div class="disable-interaction">
                      <!-- <div
                                                class="
                                                    d-flex
                                                    align-items-center
                                                    mb-2
                                                "
                                            >
                                                <label
                                                    class="
                                                        exercise-option-check
                                                    "
                                                >
                                                    <input
                                                        type="checkbox"
                                                        name="customRadio"
                                                        class="failed-check"
                                                        checked
                                                    />
                                                    <span
                                                        class="checkmark"
                                                    ></span>
                                                    <span class="text"
                                                        >Orchestra</span
                                                    >
                                                </label>
                                            </div> -->
                      <!-- <div
                                                class="
                                                    d-flex
                                                    align-items-center
                                                    mb-2
                                                "
                                            >
                                                <label
                                                    class="
                                                        exercise-option-check
                                                    "
                                                >
                                                    <input
                                                        type="checkbox"
                                                        name="customRadio"
                                                        class="failed-check"
                                                        checked
                                                    />
                                                    <span
                                                        class="checkmark"
                                                    ></span>
                                                    <span class="text"
                                                        >Piano</span
                                                    >
                                                </label>
                                            </div> -->
                      <!-- <div
                                                class="
                                                    d-flex
                                                    align-items-center
                                                    mb-2
                                                "
                                            >
                                                <label
                                                    class="
                                                        exercise-option-check
                                                    "
                                                >
                                                    <input
                                                        type="checkbox"
                                                        name="customRadio"
                                                    />
                                                    <span
                                                        class="checkmark"
                                                    ></span>
                                                    <span class="text"
                                                        >Guitar</span
                                                    >
                                                </label>

                                                <div
                                                    class="
                                                        ml-3
                                                        mb-2
                                                        text-success
                                                    "
                                                >
                                                    – &nbsp;Correct
                                                </div>
                                            </div> -->
                      <div
                        v-for="(
                          { option }, optionIndex
                        ) in question.question_option"
                        :key="optionIndex"
                        class="d-flex align-items-center mb-2"
                      >
                        <label class="exercise-option-check">
                          <input
                            type="checkbox"
                            name="customRadio"
                            :checked="
                              question.student_answer
                                .map((item) => item.selected_option_id)
                                .includes(option)
                            "
                          />
                          <span class="checkmark"></span>
                          <span class="text">{{ option }}</span>
                        </label>

                        <div
                          v-if="
                            option === question.hint && quiz.status === 'marked'
                          "
                          class="ml-3 mb-2 text-success"
                        >
                          – &nbsp;Correct
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div
                                    class="
                                        col-md-4 col-lg-12 col-xl-5
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
                                            Opera refers to a dramatic art form,
                                            originating in Europe, in which the
                                            emotional content is conveyed to the
                                            audience as much through music, both
                                            vocal and instrument...
                                            <span class="pointer text-primary"
                                                >more</span
                                            >
                                        </div>
                                    </div>
                                    <div class="mt-2">
                                        <span
                                            class="
                                                text-primary
                                                fs-14
                                                font-family_brown
                                                pointer
                                            "
                                            >View Solution</span
                                        >
                                    </div>
                                </div> -->
              </div>
              <hr class="my-4" />
              <!-- <div class="row">
                            <div class="col-md-8 col-lg-12 col-xl-7">
                                <div
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
                                    <div>QUESTION 2 of 6</div>
                                    <div>
                                        0 <span class="text-light">marks</span>
                                    </div>
                                </div>
                                <div
                                    class="
                                        mb-3
                                        font-family_brown
                                        fs-16
                                        text-dark
                                    "
                                >
                                    From the passage above, what instruments do
                                    the singers prefer?
                                    <br />
                                    <small>Select all that apply</small>
                                </div>
                                <div class="disable-interaction">
                                    <div class="d-flex align-items-center mb-2">
                                        <label class="exercise-option-check">
                                            <input
                                                type="checkbox"
                                                name="customRadio"
                                                class="failed-check"
                                                checked
                                            />
                                            <span class="checkmark"></span>
                                            <span class="text">Orchestra</span>
                                        </label>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <label class="exercise-option-check">
                                            <input
                                                type="checkbox"
                                                name="customRadio"
                                                class="failed-check"
                                                checked
                                            />
                                            <span class="checkmark"></span>
                                            <span class="text">Piano</span>
                                        </label>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <label class="exercise-option-check">
                                            <input
                                                type="checkbox"
                                                name="customRadio"
                                            />
                                            <span class="checkmark"></span>
                                            <span class="text">Guitar</span>
                                        </label>

                                        <div class="ml-3 mb-2 text-success">
                                            – &nbsp;Correct
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <label class="exercise-option-check">
                                            <input
                                                type="checkbox"
                                                name="customRadio"
                                            />
                                            <span class="checkmark"></span>
                                            <span class="text"
                                                >All of the above</span
                                            >
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="
                                    col-md-4 col-lg-12 col-xl-5
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
                                        Opera refers to a dramatic art form,
                                        originating in Europe, in which the
                                        emotional content is conveyed to the
                                        audience as much through music, both
                                        vocal and instrument...
                                        <span class="pointer text-primary"
                                            >more</span
                                        >
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <span
                                        class="
                                            text-primary
                                            fs-14
                                            font-family_brown
                                            pointer
                                        "
                                        >View Solution</span
                                    >
                                </div>
                            </div>
                        </div>
                        <hr class="my-4" />
                        <div class="row">
                            <div class="col-md-8 col-lg-12 col-xl-7">
                                <div
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
                                    <div>QUESTION 3 of 6</div>
                                    <div>
                                        10 <span class="text-light">marks</span>
                                    </div>
                                </div>
                                <div
                                    class="
                                        mb-3
                                        font-family_brown
                                        fs-16
                                        text-dark
                                    "
                                >
                                    From the passage above, what instruments do
                                    the singers prefer?
                                </div>
                                <div class="disable-interaction">
                                    <div
                                        class="
                                            form-control
                                            line-height-150p
                                            fs-14
                                            border-0
                                            bg-grayish-pink
                                            h-auto
                                            py-3
                                            px-3
                                        "
                                        style="min-height: 60px"
                                    >
                                        Opera refers to a dramatic art form,
                                        originating in Europe, in which the
                                        emotional content is conveyed to the
                                        audience as much through music, both
                                        vocal and instrumental, as it is through
                                        the lyrics. By contrast, in
                                    </div>
                                </div>
                            </div>
                            <div
                                class="
                                    col-md-4 col-lg-12 col-xl-5
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
                                        Opera refers to a dramatic art form,
                                        originating in Europe, in which the
                                        emotional content is conveyed to the
                                        audience as much through music, both
                                        vocal and instrument...
                                        <span class="pointer text-primary"
                                            >more</span
                                        >
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <span
                                        class="
                                            text-primary
                                            fs-14
                                            font-family_brown
                                            pointer
                                        "
                                        >View Solution</span
                                    >
                                </div>
                            </div>
                        </div>
                        <hr class="my-4" />
                        <div class="row">
                            <div
                                class="col-md-8 col-lg-12 col-xl-7 py-3 py-xl-4"
                            >
                                <div
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
                                    <div>QUESTION 4 of 6</div>
                                    <div>
                                        0 <span class="text-light">marks</span>
                                    </div>
                                </div>
                                <div
                                    class="
                                        mb-3
                                        font-family_brown
                                        fs-16
                                        text-dark
                                    "
                                >
                                    Write an essay and attach pictures to
                                    illustrate your points, upload a word
                                    document
                                </div>
                                <div>
                                    <div class="upload-doc-wrapper">
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
                                            <div
                                                class="doc-title text-truncate"
                                            >
                                                Essay.doc
                                            </div>
                                            <div class="doc-size">570 kb</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="
                                    col-md-4 col-lg-12 col-xl-5
                                    mt-3 mt-md-0 mt-lg-3 mt-xl-0
                                "
                            ></div>
                        </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { DateTime } from 'luxon'
export default {
  data() {
    return {
      quiz: {
        answers: {
          sections: [],
        },
      },
    }
  },
  async fetch() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    // this.$nuxt.$loading.start()
    const { data } = await this.$axios.$get(
      `/quiz/v3/student_quiz/${this.$route.params.slug}/review/`
    )

    this.quiz = data
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
      // this.$nuxt.$loading.start()
    })
  },
  methods: {
    getAnswerSubmittedByStudent(question) {
      if (question.answer_type === 'trueFalse') {
        //
      }
    },
    // formatDate(date) {
    //   const dt = DateTime.fromISO(date)
    //   return dt.toFormat('DDDD-mm-tt')
    // },
  },
}
</script>
