<template>
  <div class="">
    <div class="conatiner">
      <div class="d-flex align-items-center justify-content-end flex-wrap mb-3">
        <div class="d-flex align-items-center justify-content-end mb-2">
          <div>
            <div class="dropdown">
              <button
                id="dropdownMenuButton"
                :disabled="submitForm"
                class="btn btn-primary py-2 px-3 dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span key="" v-if="submitForm">
                  <b-spinner
                    style="width: 1rem; height: 1rem"
                    label="Large Spinner"
                    variant="light"
                  ></b-spinner>
                </span>
                <span v-else> Save </span>
              </button>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
              >
                <div class="dropdown-item" @click="saveDraft">
                  Save as draft
                </div>
                <div class="dropdown-item" @click="savePublish">
                  Save and Publish
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-white mb-3">
        <div class="card-header pt-4 pb-0">
          <div class="card-title">Edit Exercise</div>
        </div>
        <div class="card-body">
          <div class="row mt-4">
            <div class="col">
              <div class="mb-2">
                <label class="form-control-label">Subject - Class</label>
                <input
                  v-model="exerciseSubJectClass"
                  disabled
                  class="form-control"
                  placeholder="Enter Name"
                />
              </div>
            </div>
            <div class="col">
              <div class="mb-2">
                <label class="form-control-label">Exercise Name</label>
                <input
                  v-model="exercise_name"
                  class="form-control"
                  placeholder="Enter Name"
                />
              </div>
              <div class="mb-2">
                <label class="form-control-label">Exercise Instruction</label>
                <client-only>
                  <ckeditor-nuxt
                    v-model="exercise_description"
                    :config="editorConfig"
                    placeholder="Add something here"
                  />
                </client-only>
                <!-- <client-only>
                  <VueEditor
                    v-model="exercise_description"
                    placeholder="Description"
                  />
                </client-only> -->
              </div>
            </div>

            <div class="col-12">
              <hr />
            </div>
            <div class="col">
              <div class="row" tabindex="0" @focus="datePicker1Toggle">
                <div class="col-md-6 mb-2">
                  <label class="form-control-label">Exercise Format</label>
                  <v-select
                    v-model="exercise_format"
                    class="style-chooser"
                    placeholder="Select exercise format"
                    label="text"
                    :reduce="(option) => option.value"
                    :options="[
                      { value: 'assessment', text: 'Homework' },
                      { value: 'exercise', text: 'Classwork' },
                      { value: 'examination', text: 'Examination' },
                    ]"
                  ></v-select>
                </div>
                <div class="col-md-6 mb-2">
                  <label class="form-control-label">Exercise Type</label>
                  <v-select
                    v-model="exercise_type"
                    class="style-chooser"
                    placeholder="Select exercise type"
                    :reduce="(option) => option.value"
                    label="text"
                    :options="[
                      { value: 'objective', text: 'Objective' },
                      { value: 'essay', text: 'Essay' },
                      { value: 'offline', text: 'Offline' },
                    ]"
                  ></v-select>
                </div>

                <template v-if="showDates">
                  <div class="col-md-6 mb-2">
                    <label class="form-control-label">Available Date</label>
                    <div class="">
                      <v-date-picker
                        v-model="available_date"
                        mode="date"
                        :model-config="modelConfig"
                        @dayclick="datePicker1 = false"
                        class=""
                      >
                        <template #default="{ togglePopover }">
                          <span @click="togglePopover()">
                            <input
                              v-model="available_date"
                              class="form-control form-control-lg"
                              placeholder="Available Date"
                              @click="datePicker1 = true"
                            />
                          </span>
                        </template>
                      </v-date-picker>
                    </div>
                  </div>
                  <div class="col-md-6 mb-2">
                    <label class="form-control-label">Due Date</label>
                    <div class="">
                      <v-date-picker
                        v-model="due_date"
                        mode="date"
                        :model-config="modelConfig"
                        @dayclick="datePicker2 = false"
                        class=""
                      >
                        <template #default="{ togglePopover }">
                          <span @click="togglePopover()">
                            <input
                              v-model="due_date"
                              class="form-control form-control-lg"
                              placeholder="Due Date"
                              @click="datePicker2 = true"
                            />
                          </span>
                        </template>
                      </v-date-picker>
                    </div>
                  </div>
                </template>

                <div v-if="showDuration" class="col-md-6 mb-2">
                  <label class="form-control-label">Set Duration</label>
                  <div>
                    <input
                      v-model="duration"
                      placeholder="30 minutes"
                      type="number"
                    />
                  </div>
                </div>
                <div class="col-md-6 mb-2">
                  <label class="form-control-label">Obtainable Score</label>
                  <div>
                    <input
                      v-model="full_score"
                      placeholder="100 marks"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="exercise_type === 'objective'">
            <div class="col-12">
              <hr />
              <div class="card-title mb-3 fs-20 font-weight-normal">
                Sections
              </div>
            </div>
            <div class="col-12">
              <div class="exc-sections-wrapper">
                <div
                  v-for="(section, index) in sections"
                  :key="index"
                  class="exc-section mb-2"
                >
                  <div
                    class="
                      bg-primary
                      rounded
                      accordion-header
                      active
                      target-icon
                      creation-accordion-header
                      px-3
                      py-3
                    "
                  >
                    <div class="d-flex align-items-center">
                      <div class="mr-3 line-height-0">
                        <svg
                          class="toggle-icon"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0Z"
                            fill="#D6DAEB"
                          />
                          <path
                            d="M15 9.5L11 13.5L7 9.5"
                            stroke="#484848"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div class="title-text text-white mr-2">
                        Section {{ index + 1 }} -
                        <template v-if="section.editSectionHeader">
                          {{ section.title ? section.title : '' }}
                          <span @click="changeHeader(index)">
                            <span
                              class="iconify text-white pointer fs-18"
                              data-icon="eva:edit-2-outline"
                            ></span>
                          </span>
                        </template>

                        <template v-else>
                          <input
                            v-model="section.title"
                            @keyup.enter="changeHeader(index)"
                          />
                          <div
                            :style="{ display: 'inline' }"
                            @click="changeHeader(index)"
                          >
                            <span
                              class="iconify text-white"
                              data-icon="teenyicons:tick-outline"
                            ></span>
                          </div>
                        </template>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <div
                        class="line-height-0 mr-3"
                        @click="deleteSection(index)"
                      >
                        <span
                          class="iconify text-danger pointer fs-18 ml-3"
                          data-icon="uil:trash-alt"
                        ></span>
                      </div>
                      <div class="pointer d-flex align-items-center">
                        <span
                          class="iconify"
                          data-icon="fluent:re-order-dots-vertical-16-filled"
                          data-width="20"
                          data-height="20"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-content show px-4 px-md-5 mb-5">
                    <div class="row mt-3">
                      <div class="col-lg-10">
                        <div class="mb-2">
                          <label class="form-control-label"
                            >Header/Section Instruction</label
                          >
                          <client-only>
                            <ckeditor-nuxt
                              v-model="section.header"
                              :config="editorConfigForSection"
                            />
                          </client-only>
                          <!-- <VueEditor
                            v-model="section.header"
                            placeholder="Add Header / Description / Instruction"
                          /> -->
                        </div>
                      </div>
                    </div>
                    <hr />

                    <!-- Questions Start Here  -->
                    <label class="form-control-label fs-14 mb-2"
                      >Section Questions</label
                    >
                    <div
                      v-for="(question, value) in section.questions"
                      :key="value"
                      class="exc-section-question mb-2"
                    >
                      <div
                        class="
                          rounded
                          accordion-header
                          bg-primary
                          target-icon
                          creation-accordion-header
                          active
                          px-3
                          py-3
                        "
                      >
                        <div class="d-flex align-items-center">
                          <div class="mr-3 line-height-0">
                            <svg
                              class="toggle-icon"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0Z"
                                fill="#D6DAEB"
                              />
                              <path
                                d="M15 9.5L11 13.5L7 9.5"
                                stroke="#484848"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          <div
                            class="
                              bg-grayish-variant-1
                              fs-14
                              text-dark
                              py-1
                              px-2
                              font-weight-bold
                              rounded
                              mr-2
                            "
                          >
                            Question {{ value + 1 }}
                          </div>
                        </div>
                        <div class="d-flex align-items-center">
                          <div
                            class="line-height-0 mr-3"
                            @click="removeSectionQuestion(index, value)"
                          >
                            <span
                              class="iconify text-danger pointer fs-18 ml-3"
                              data-icon="uil:trash-alt"
                            ></span>
                          </div>
                          <div class="pointer d-flex align-items-center">
                            <span
                              class="iconify"
                              data-icon="fluent:re-order-dots-vertical-16-filled"
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="question.question_type === 'options'"
                        class="accordion-content show px-2"
                      >
                        <div class="row mt-3">
                          <div class="col-lg-10 order-last order-xl-first">
                            <div class="mb-3">
                              <label class="form-control-label">Question</label>
                              <textarea
                                v-model="question.text"
                                class="form-control form-control-sm"
                                placeholder="Enter Question"
                              ></textarea>
                            </div>
                            <div class="mb-3">
                              <label class="form-control-label"
                                >Question Score</label
                              >
                              <input
                                v-model="question.marks"
                                type="text"
                                class="form-control"
                                placeholder="Enter Score"
                                style="max-width: 220px"
                              />
                            </div>
                          </div>
                          <div
                            class="col-xl-2 mb-3 mb-lg-0"
                            :style="{ cursor: 'pointer' }"
                            @click="uploadQuestionImage(index, value)"
                          >
                            <div
                              class="
                                file-type-display
                                py-3
                                px-3
                                text-center
                                w-100
                              "
                              style="max-width: 241px"
                            >
                              <div class="mb-2">
                                <span
                                  class="iconify mr-2"
                                  data-icon="bi:file-image"
                                  style="font-size: 31px"
                                ></span>
                              </div>
                              <div class="text-primary fs-10">
                                {{
                                  question.file_upload
                                    ? question.file_upload.name
                                    : 'Click to upload an Image(optional)'
                                }}
                                <input
                                  id="questionImage"
                                  ref="fileInput"
                                  class="invisible"
                                  type="file"
                                  accept="image/*"
                                  name="imagesArray"
                                  @change="onChange"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="">
                          <div class="mb-2">
                            <label class="form-control-label">Options</label>
                            <div class="fs-12 font-weight-bold text-dark">
                              Highlight correct answer
                            </div>
                          </div>
                          <div
                            v-for="(
                              option, optionIndex
                            ) in question.question_option"
                            :key="optionIndex"
                            class="row align-items-center mb-2"
                          >
                            <div class="col-md-10 col-11">
                              <div
                                class="
                                  d-flex
                                  align-items-center
                                  form-control
                                  py-0
                                  h-auto
                                "
                              >
                                <div class="flex-grow-1 mr-2">
                                  <input
                                    v-model="option.option"
                                    type="text"
                                    :placeholder="`Option ${optionIndex + 1}`"
                                    class="
                                      form-control
                                      bg-white
                                      h-100
                                      px-0
                                      border-0
                                      py-2
                                      fs-14
                                    "
                                    style="box-shadow: none"
                                  />
                                </div>
                                <div>
                                  <label class="custom-checkbox">
                                    <input
                                      v-model="option.correct_flag"
                                      type="checkbox"
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div
                              class="line-height-0 mr-3"
                              @click="removeOption(index, value, optionIndex)"
                            >
                              <span
                                class="iconify text-danger pointer fs-18"
                                data-icon="uil:trash-alt"
                              ></span>
                            </div>
                          </div>

                          <div class="row align-items-center mb-2">
                            <div class="col-md-10 col-11">
                              <div
                                class="
                                  d-flex
                                  align-content-center
                                  justify-content-end
                                "
                              >
                                <div
                                  class="
                                    text-primary
                                    pointer
                                    d-flex
                                    align-content-center
                                  "
                                >
                                  <div class="mr-1 line-height-0">
                                    <span
                                      class="iconify fs-18"
                                      data-icon="fluent:add-24-filled"
                                      style="font-size: 18px; color: #1070b7"
                                    ></span>
                                  </div>
                                  <strong
                                    class="fs-14"
                                    @click="addOption(index, value)"
                                    >Add Option</strong
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row align-items-center mb-2">
                            <div class="col-md-10">
                              <div class="mb-3">
                                <label class="form-control-label"
                                  >Marking Guide</label
                                >
                                <textarea
                                  v-model="question.hint"
                                  class="form-control"
                                  placeholder="Add marking guide"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-else-if="question.question_type === 'trueFalse'"
                        class="accordion-content show px-2"
                      >
                        <div class="row mt-3">
                          <div class="col-lg-10 order-last order-xl-first">
                            <div class="mb-3">
                              <label class="form-control-label">Question</label>
                              <textarea
                                v-model="question.text"
                                class="form-control form-control-sm"
                                placeholder="Enter Question"
                              ></textarea>
                            </div>
                            <div class="mb-3">
                              <label class="form-control-label"
                                >Question Score</label
                              >
                              <input
                                v-model="question.marks"
                                type="text"
                                class="form-control"
                                placeholder="Enter Score"
                                style="max-width: 220px"
                              />
                            </div>
                          </div>
                          <div
                            class="col-xl-2 mb-3 mb-lg-0"
                            :style="{ cursor: 'pointer' }"
                            @click="uploadQuestionImage(index, value)"
                          >
                            <div
                              class="
                                file-type-display
                                py-3
                                px-3
                                text-center
                                w-100
                              "
                              style="max-width: 241px"
                            >
                              <div class="mb-2">
                                <span
                                  class="iconify mr-2"
                                  data-icon="bi:file-image"
                                  style="font-size: 31px"
                                ></span>
                              </div>
                              <div class="text-primary fs-10">
                                {{
                                  question.file_upload
                                    ? question.file_upload.name
                                    : 'Click to upload an Image(optional)'
                                }}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="">
                          <div class="mb-2">
                            <label class="form-control-label">Options</label>
                            <div class="fs-12 font-weight-bold text-dark">
                              Highlight correct answer true or false
                            </div>
                          </div>

                          <div
                            v-for="(
                              option, optionIndex
                            ) in question.question_option"
                            :key="optionIndex"
                            class="row align-items-center mb-2"
                          >
                            <div class="col-md-10 col-11">
                              <div
                                class="
                                  d-flex
                                  align-items-center
                                  form-control
                                  py-0
                                  h-auto
                                "
                              >
                                <div class="flex-grow-1 mr-2">
                                  <input
                                    v-model="option.option"
                                    type="text"
                                    disabled
                                    :placeholder="
                                      optionIndex === 0 ? 'True' : 'False'
                                    "
                                    class="
                                      form-control
                                      bg-white
                                      h-100
                                      px-0
                                      border-0
                                      py-2
                                      fs-14
                                      text-capitalize
                                    "
                                    style="box-shadow: none"
                                  />
                                </div>
                                <div>
                                  <label class="custom-checkbox">
                                    <input
                                      :id="'age1' + Math.random()"
                                      v-model="
                                        question.question_option[0].correct_flag
                                      "
                                      :checked="
                                        question.question_option[0]
                                          .correct_flag === option.option
                                      "
                                      type="radio"
                                      :value="option.option"
                                      :name="'TrueFalse' + Math.random()"
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="row align-items-center mb-2">
                            <div class="col-md-10">
                              <div class="mb-3">
                                <label class="form-control-label"
                                  >Marking Guide</label
                                >
                                <textarea
                                  v-model="question.hint"
                                  class="form-control"
                                  placeholder="Add marking guide"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-else-if="question.question_type === 'freeText'"
                        class="accordion-content show px-2"
                      >
                        <div class="row mt-3">
                          <div class="col-lg-10 order-last order-xl-first">
                            <div class="mb-3">
                              <label class="form-control-label">Question</label>
                              <textarea
                                v-model="question.text"
                                class="form-control form-control-sm"
                                placeholder="Enter Question"
                              ></textarea>
                            </div>
                            <div class="mb-3">
                              <label class="form-control-label"
                                >Question Score</label
                              >
                              <input
                                v-model="question.marks"
                                type="text"
                                class="form-control"
                                placeholder="Enter Score"
                                style="max-width: 220px"
                              />
                            </div>
                          </div>
                          <div
                            class="col-xl-2 mb-3 mb-lg-0"
                            :style="{ cursor: 'pointer' }"
                            @click="uploadQuestionImage(index, value)"
                          >
                            <div
                              class="
                                file-type-display
                                py-3
                                px-3
                                text-center
                                w-100
                              "
                              style="max-width: 241px"
                            >
                              <div class="mb-2">
                                <span
                                  class="iconify mr-2"
                                  data-icon="bi:file-image"
                                  style="font-size: 31px"
                                ></span>
                              </div>
                              <div class="text-primary fs-10">
                                {{
                                  question.file_upload
                                    ? question.file_upload.name
                                    : 'Click to upload an Image(optional)'
                                }}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row align-items-center mb-2">
                          <div class="col-md-10">
                            <div class="mb-3">
                              <label class="form-control-label"
                                >Marking Guide</label
                              >
                              <textarea
                                v-model="question.hint"
                                class="form-control"
                                placeholder="Add marking guide"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Questions End Here  -->
                  <hr />
                  <div class="d-flex align-content-center justify-content-end">
                    <div
                      class="text-primary pointer d-flex align-content-center"
                    >
                      <b-dropdown
                        v-model="section_question"
                        text="Add Questions"
                        variant="primary"
                        class="m-2"
                      >
                        <b-dropdown-item @click="addQuestion(index, 'options')"
                          >Multichoice</b-dropdown-item
                        >
                        <b-dropdown-item
                          @click="addQuestion(index, 'trueFalse')"
                          >True or False</b-dropdown-item
                        >
                        <b-dropdown-item @click="addQuestion(index, 'freeText')"
                          >Free Text</b-dropdown-item
                        >
                      </b-dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <hr />
              <div>
                <div class="d-flex align-items-center justify-content-end">
                  <div class="text-primary pointer d-flex align-content-center">
                    <!-- <strong class="fs-14">Import Previous Sections</strong> -->
                  </div>
                  <div
                    class="
                      text-primary
                      pointer
                      d-flex
                      align-content-center
                      ml-4
                    "
                  >
                    <div class="mr-1 line-height-0">
                      <span
                        class="iconify fs-18"
                        data-icon="fluent:add-24-filled"
                        style="font-size: 18px; color: #1070b7"
                      ></span>
                    </div>
                    <strong class="fs-14" @click="addSection"
                      >Add Section</strong
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <template v-else-if="exercise_type === 'essay'">
            <div class="col-12">
              <hr />

              <div class="row ng-star-inserted">
                <div class="col-lg-4 col-md-5 col-11 mt-4">
                  <p class="mb-0 font12 font-museo">
                    Upload Essay Sample
                    <span class="text-grey">(optional)</span>
                  </p>
                  <input
                    ref="upload_essay"
                    type="file"
                    accept=".pptx,.xlsx,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*, .pdf"
                    class="invisible"
                    @change="essayFile"
                  />
                  <div
                    class="file-type-display py-3 px-3 text-center bg-white"
                    style="cursor: pointer"
                    @click="uploadEssay"
                  >
                    <span v-if="essaySpinner == false" class="text-primary">{{
                      essayAttachment.name
                        ? essayAttachment.name
                        : 'Click to Upload'
                    }}</span>
                    <span v-else>
                      <b-spinner
                        variant="primary"
                        type="grow"
                        label="Spinning"
                      ></b-spinner>
                    </span>
                  </div>
                  <p class="text-grey font10 font-museo">
                    Formats: PPT, DOC, PDF, JPEG
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template v-else-if="exercise_type === 'offline'">
            <div class="col-12">
              <hr />

              <div class="row ng-star-inserted">
                <div class="col-lg-4 col-md-5 col-11 mt-4">
                  <p class="mb-0 font12 font-museo">
                    Upload Offline Sample
                    <span class="text-grey">(optional)</span>
                  </p>
                  <input
                    ref="upload_essay"
                    type="file"
                    accept=".pptx,.xlsx,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*, .pdf"
                    class="invisible"
                    @change="essayFile"
                  />
                  <div
                    class="file-type-display py-3 px-3 text-center bg-white"
                    style="cursor: pointer"
                    @click="uploadEssay"
                  >
                    <span v-if="essaySpinner == false" class="text-primary">{{
                      essayAttachment.name
                        ? essayAttachment.name
                        : 'Click to Upload'
                    }}</span>
                    <span v-else>
                      <b-spinner
                        variant="primary"
                        type="grow"
                        label="Spinning"
                      ></b-spinner>
                    </span>
                  </div>
                  <p class="text-grey font10 font-museo">
                    Formats: PPT, DOC, PDF, JPEG
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="mt-4 d-flex align-items-center justify-content-end">
          <div class="dropdown">
            <button
              id="dropdownMenuButton"
              :disabled="submitForm"
              class="btn btn-primary py-2 px-3 dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span key="" v-if="submitForm">
                <b-spinner
                  style="width: 1rem; height: 1rem"
                  label="Large Spinner"
                  variant="light"
                ></b-spinner>
              </span>
              <span v-else> Save </span>
            </button>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              <div class="dropdown-item" @click="saveDraft">Save as draft</div>
              <div class="dropdown-item" @click="savePublish">
                Save and Publish
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },
  data() {
    return {
      submitForm: false,
      exerciseSubJectClass: '',

      editorConfig: {
        title: {
          // placeholder: 'h1',
        },
        placeholder: 'Provide brief description for students for this exercise',
        removePlugins: ['Title'],
      },
      editorConfigForSection: {
        title: {
          // placeholder: 'h1',
        },
        placeholder: 'Add Header / Description / Instruction',
        removePlugins: ['Title'],
      },
      allSubjects: [],
      datePicker1: false,
      essaySpinner: false,
      essayAttachment: {},
      changedAttachment: false,
      datePicker2: false,
      showDates: true,
      showDuration: true,
      questionImage: { section: 0, question: 0 },
      imagesArray: '',
      gradeList: '',
      section_question: '',
      exercise_name: '',
      exercise_description: '',
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
      grade: '',
      subject: '',
      classes: '',
      exercise_type: '',
      exercise_format: '',
      available_date: '',
      due_date: '',
      duration: '',
      full_score: '',

      sections: [],
    }
  },
  async fetch() {
    const slate_school_id = await this.$store.state.administration.school.id

    try {
      const exerciseDetails = await this.$axios.get(
        `/quiz/v3/quiz_config/${this.$route.params.excercise}/students/?paginate=false`
      )
      this.allData = exerciseDetails.data.data
      console.log('exercise details', this.allData)
      this.subject = this.allData.quiz_details.quiz_meta_data.subject_id
      this.exercise_name = this.allData.quiz_details.name
      this.exerciseSubJectClass =
        this.allData.quiz_details.subject + ' - ' + this.allData.quiz_class
      this.exercise_description = this.allData.quiz_details.description
      this.exercise_type = this.allData.quiz_details.type
      this.exercise_format = this.allData.quiz_details.qc_mode
      this.available_date = this.allData.quiz_details.available_date.slice(
        0,
        10
      )
      this.due_date = this.allData.quiz_details.due_date.slice(0, 10)
      this.duration = this.allData.quiz_details.duration
      this.full_score = this.allData.quiz_details.full_score
      this.sections = this.allData.quiz_details.quiz_meta_data.sections
      this.essayAttachment.name = this.allData.quiz_details.quiz_meta_data
        .essay_item
        ? this.allData.quiz_details.quiz_meta_data.essay_item.file_name
        : ''

      const allSubjects = await this.$axios.get(
        `schools/v2/lms/${this.$store.state.school.currentAcademicYear.id}/subjects/`
      )
      console.log('subjects', this.allSubjects)
      this.allSubjects = allSubjects.data.data.map((e) => ({
        subjectName: `${e.subject} - ${e.school_class}`,
        ...e,
      }))
    } catch (error) {
      console.log(error)
    }
  },
  watch: {
    // exercise_format: {
    //   handler(val) {
    //     if (val === 'assessment') {
    //       this.showDates = true
    //       this.showDuration = true
    //     } else if (val === 'examination') {
    //       this.showDuration = true
    //       this.showDates = true
    //     } else if (val === 'exercise') {
    //       this.showDuration = true
    //     } else {
    //       this.showDuration = false
    //       this.showDates = false
    //     }
    //   },
    //   immediate: true,
    // },
    // exercise_type(val) {
    //   if (val === 'objective') {
    //     this.showDuration = true
    //   } else {
    //     this.showDuration = false
    //   }
    // },
  },
  mounted() {
    $(document).on(
      'click',
      '.accordion-header:not(.creation-accordion-header)',
      (e) => {
        console.log(e.currentTarget.nextElementSibling)
        $(e.currentTarget.nextElementSibling).toggleClass('show')
        $(e.currentTarget).toggleClass('active')
      }
    )

    $(document).on('click', '.creation-accordion-header', (e) => {
      $(
        e.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling
      ).toggleClass('show')
      $(e.target.parentNode.parentNode.parentNode.parentNode).toggleClass(
        'active'
      )
    })
  },
  methods: {
    uploadEssay() {
      if (this.$refs.upload_essay) {
        this.$refs.upload_essay.click()
      }
    },
    essayFile(e) {
      this.essayAttachment = ''
      if (e.target.files.length > 0) {
        this.essayAttachment = e.target.files[0]
        console.log('essay attachment', this.essayAttachment)
        this.essaySpinner = true
        this.submitEssayAttachment()
      }
    },
    async submitEssayAttachment() {
      const schoolId = await this.$store.state.administration.school.id
      const formData = new FormData()
      formData.append('file', this.essayAttachment)
      formData.append('type', this.essayAttachment.type)
      try {
        const {
          data: { data },
        } = await this.$axios.post(
          `schools/v2/school/${schoolId}/resource/`,
          formData
        )
        this.essayResponse = data
        ;(this.changedAttachment = true),
          console.log('essay image response is', this.essayResponse)
      } catch (error) {
        console.log(error)
        this.essayAttachment = {}
      } finally {
        this.essaySpinner = false
      }
    },

    async saveDraft() {
      const schoolCode = this.$store.state.administration.school.code
      const lala = {
        essay_sample_url: this.essayResponse ? this.essayResponse.url : '',
        essay_description_item: this.essay
          ? this.essay.essay_description_item
          : '',
        file_name: this.essayAttachment.name ? this.essayAttachment.name : '',
      }

      try {
        this.submitForm = true

        const response = await this.$axios.put(
          `/quiz/v3/quiz_config/${this.$route.params.excercise}/draft/edit/`,

          {
            quiz_config: {
              available_date: this.available_date
                ? `${this.available_date} 0:00:00`
                : '',
              description: this.exercise_description,
              due_date: this.due_date ? `${this.due_date} 0:00:00` : '',
              duration: this.duration ? this.duration : '',
              essay_item:
                this.exercise_type === 'objective'
                  ? {}
                  : this.changedAttachment === true
                  ? {
                      essay_sample_url: this.essayResponse
                        ? this.essayResponse.url
                        : '',
                      essay_description_item: this.essay
                        ? this.essay.essay_description_item
                        : '',
                      file_name: this.essayAttachment.name
                        ? this.essayAttachment.name
                        : '',
                    }
                  : this.allData.quiz_details.quiz_meta_data.essay_item,
              full_score: this.full_score ? this.full_score : '',
              name: this.exercise_name,
              quiz_mode: this.exercise_format,
              quiz_type: this.exercise_type,
              sections: this.sections,
              subject_id: this.subject,
            },
          }
        )
        this.$router.push(
          `/sms/${schoolCode}/lms/excercises/${this.allData.quiz_details.id}?tab=0`
        )

        this.$store.dispatch('breadcrumbs/popRoute')
      } catch (error) {
        console.log(error)
      } finally {
        this.submitForm = false
      }
    },
    async savePublish() {
      const schoolCode = this.$store.state.administration.school.code

      try {
        this.submitForm = true

        const response = await this.$axios.put(
          `/quiz/v3/quiz_config/${this.$route.params.excercise}/draft/edit/?publish=true`,

          {
            quiz_config: {
              available_date: this.available_date
                ? `${this.available_date} 0:00:00`
                : '',
              description: this.exercise_description,
              due_date: this.due_date ? `${this.due_date} 0:00:00` : '',
              duration: this.duration ? this.duration : '',
              essay_item:
                this.exercise_type === 'objective'
                  ? {}
                  : this.changedAttachment === true
                  ? {
                      essay_sample_url: this.essayResponse
                        ? this.essayResponse.url
                        : '',
                      essay_description_item: this.essay
                        ? this.essay.essay_description_item
                        : '',
                      file_name: this.essayAttachment.name
                        ? this.essayAttachment.name
                        : '',
                    }
                  : this.allData.quiz_details.quiz_meta_data.essay_item,
              full_score: this.full_score ? this.full_score : '',
              name: this.exercise_name,
              quiz_mode: this.exercise_format,
              quiz_type: this.exercise_type,
              sections: this.sections,
              subject_id: this.subject,
            },
            quiz_id: `${this.$route.params.excercise}`,
          }
        )
        this.$router.push(
          `/sms/${schoolCode}/lms/excercises/${this.allData.quiz_details.id}?tab=0`
        )
        this.$store.dispatch('breadcrumbs/popRoute')
      } catch (error) {
        consol.log(error)
      } finally {
        this.submitForm = false
      }
    },
    removeOption(index, value, optionIndex) {
      this.sections[index].questions[value].question_option.splice(
        optionIndex,
        1
      )
    },
    addOption(index, value) {
      if (this.sections[index].questions[value].question_option.length < 5) {
        this.sections[index].questions[value].question_option.push({
          option: '',
          correct_flag: false,
        })
      }
    },
    async updateAvatar(imageName) {
      const schoolId = await this.$store.state.administration.school.id

      const formData = new FormData()
      formData.append('file', this.imagesArray)
      formData.append('type', 'image')
      const {
        data: { data },
      } = await this.$axios.post(
        `schools/v2/school/${schoolId}/resource/`,
        formData
      )
      this.sections[this.questionImage.section].questions[
        this.questionImage.question
      ].file_upload = {
        file: {},
        name: imageName,
        stat: 100,
        status: 'completed',
        type: 'image',
        url: data.url,
      }
      this.imgText = imageName
      console.log('image', data.url, imageName)
    },
    onChange(event) {
      console.log(event)
      if (event.target.files.length > 0) {
        this.imagesArray = event.target.files[0]
        const imageName = event.target.files[0].name
        this.updateAvatar(imageName)
      }
    },

    uploadQuestionImage(index, value) {
      if (this.$refs.fileInput) {
        document.getElementById('questionImage').click()
      }
      this.questionImage.section = index
      this.questionImage.question = value
      console.log('for real', index, value)
    },
    removeSectionQuestion(index, value) {
      this.sections[index].questions.splice(value, 1)
    },
    questionObject(type = 'options', options = []) {
      return {
        active: true,
        answer_type: type,
        difficulty: '',
        file_upload: {
          file: {},
          name: '',
          stat: 100,
          status: '',
          type: '',
          url: '',
        },
        hint: '',
        image_url: '',
        marks: 1,
        practice_question: '',
        question_option: options,
        question_type: type,
        test_question: '',
        text: '',
        topic: '',
      }
    },
    addQuestion(index, question_type = 'options') {
      if (question_type === 'options') {
        this.sections[index].questions.push(this.questionObject('options'))
      } else if (question_type === 'trueFalse') {
        this.sections[index].questions.push(
          this.questionObject('trueFalse', [
            { option: 'True', correct_flag: false },
            { option: 'False', correct_flag: false },
          ])
        )
      } else if (question_type === 'freeText') {
        this.sections[index].questions.push(this.questionObject('freeText', []))
      }
    },
    deleteSection(index) {
      this.sections.splice(index, 1)
    },
    changeHeader(index) {
      this.sections[index].editSectionHeader =
        !this.sections[index].editSectionHeader
    },
    addSection() {
      this.sections = []

      console.log(this.sections)
      this.sections.push({
        title: '',
        header: '',
        editSectionHeader: true,
        questions: [],
        options: {},
        true_false: {},
        free_text: {},
      })
    },
    datePicker1Toggle() {
      if (this.datePicker1 === true) {
        this.datePicker1 = false
      }
      if (this.datePicker2 === true) {
        this.datePicker2 = false
      }
    },
  },
}
</script>

<style scoped>
.calender {
  position: absolute;
  z-index: 4;
}
</style>
