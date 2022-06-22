<template>
  <div v-if="attempt.answers">
    <div
      v-for="(section, sectionIndex) in attempt.answers"
      :key="sectionIndex"
      class="card"
    >
      <div class="card-body">
        <div>
          <div class="row">
            <div class="col-xl-7 mb-3 mb-xl-0">
              <div class="text-primary fs-14 mb-4">
                <strong>Section {{ sectionIndex + 1 }}</strong>
                <span>{{ section.title }}</span>
              </div>
              <div class="mb-2">
                <label
                  class="
                    form-control-label
                    font-weight-normal
                    font-family_brown
                    mb-2
                  "
                >
                  <span
                    v-html="section.header ? section.header : section.text"
                  ></span
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
                          type="radio"
                          name="customRadio"
                          :checked="covertBooloean(option.option)"
                        />
                        <span class="checkmark"></span>
                        <span class="text">{{ option.option }}</span>
                      </label>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="text-light fs-12">Obtained Score</div>
                    <div class="text-dark fs-14">
                      {{ question.graded_score }} marks
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="text-light fs-12">Obtained Score</div>
                    <div class="text-dark fs-14">
                      <input
                        type="text"
                        class="form-control w-auto d-inline-block"
                        style="max-width: 60px"
                      />
                      / {{ question.marks }} marks
                    </div>
                  </div>
                </div>

                <div
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
                </div>
              </div>
              <div v-else-if="question.answer_type === 'options'" class="row">
                <div class="col-md-8 col-lg-12 col-xl-8">
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
                          :class="
                            question.student_answer.selected_option_id !==
                            option.option
                              ? 'failed-check'
                              : ''
                          "
                          :checked="
                            question.student_answer.selected_option_id ===
                            option.option
                          "
                        />
                        <span class="checkmark"></span>
                        <span class="text">{{ option.option }}</span>
                      </label>
                      <div
                        v-if="question.correct_answer === option.option"
                        class="ml-3 mb-2 text-success"
                      >
                        – &nbsp;Correct
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="text-light fs-12">Obtained Score</div>
                    <div class="text-dark fs-14">
                      {{ question.graded_score }} marks
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="text-light fs-12">Obtained Score</div>
                    <div class="text-dark fs-14">
                      <input
                        type="text"
                        class="form-control w-auto d-inline-block"
                        style="max-width: 60px"
                      />
                      / {{ question.marks }} marks
                    </div>
                  </div>
                </div>
                <div
                  class="
                    col-md-4 col-lg-12 col-xl-4
                    mt-3 mt-md-0 mt-lg-3 mt-xl-0
                  "
                >
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
                </div>
              </div>
              <div v-else-if="question.answer_type === 'freeText'" class="row">
                <div class="col-md-8 col-lg-12 col-xl-8 py-3 py-xl-4">
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
                      QUESTION {{ questionIndex + 1 }} of
                      {{ section.questions.length }}
                    </div>
                  </div>
                  <div class="mb-3 font-family_brown fs-16 text-dark">
                    {{ question.text }}
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
                        <div class="doc-title text-truncate">Essay.doc</div>
                        <div class="doc-size">570 kb</div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="text-light fs-12">Obtained Score</div>
                    <div class="text-dark fs-14">
                      {{ question.graded_score }} marks
                    </div>
                  </div>
                </div>
                <div
                  class="
                    col-md-4 col-lg-12 col-xl-4
                    py-3 py-xl-4
                    border-xl-left border-gray
                  "
                >
                  <div class="mb-4">
                    <div class="form-control-label">Obtained Score</div>
                    <div class="text-dark fs-14">
                      <input
                        type="text"
                        class="form-control w-auto d-inline-block"
                        style="max-width: 60px"
                      />
                      / {{ question.marks }} marks
                    </div>
                  </div>
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
                    <label class="form-control-label">Comment</label>
                    <textarea
                      class="form-control"
                      placeholder="Enter Comment"
                    ></textarea>
                  </div>
                </div>
              </div>

              <hr class="my-4" />
            </div>

            <!-- <div class="row">
              <div class="col-md-8 col-lg-12 col-xl-8">
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
                </div>
                <div class="mb-3 font-family_brown fs-16 text-dark">
                  From the passage above, what instruments do the singers
                  prefer?
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
                    Opera refers to a dramatic art form, originating in Europe,
                    in which the emotional content is conveyed to the audience
                    as much through music, both vocal and instrumental, as it is
                    through the lyrics. By contrast, in
                  </div>
                </div>
                <div class="mt-3">
                  <div class="text-light fs-12">Obtained Score</div>
                  <div class="text-dark fs-14">10 marks</div>
                </div>
                <div class="mt-3">
                  <div class="text-light fs-12">Obtained Score</div>
                  <div class="text-dark fs-14">
                    <input
                      type="text"
                      class="form-control w-auto d-inline-block"
                      style="max-width: 60px"
                    />
                    / 10 marks
                  </div>
                </div>
              </div>
              <div
                class="col-md-4 col-lg-12 col-xl-4 mt-3 mt-md-0 mt-lg-3 mt-xl-0"
              >
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
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <hr class="my-4" />
      <hr class="my-4" />
      <hr class="my-4" />
    </div>
  </div>
  <div v-else>No Question Attempted</div>
</template>

<script>
export default {
  props: {
    attempt: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  methods: {
    covertBooloean(e) {
      if (e === 'True') {
        return true
      } else if (e === 'False') {
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
