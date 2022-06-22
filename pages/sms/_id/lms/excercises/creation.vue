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
                <span v-if="submitForm" key="">
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
                <div class="dropdown-item" style="cursor: pointer" @click="saveDraft">
                  Save as draft
                </div>
                <div class="dropdown-item" style="cursor: pointer" @click="savePublish">
                  Save and Publish
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-white mb-3">
        <div class="card-header pt-4 pb-0">
          <div class="card-title" @click="showSections">Create Exercise</div>
        </div>
        <div class="card-body">
          <ValidationObserver v-slot="{ validate }">
            <div id="runValidate" ref="runValidate" type="button" @click="validate"></div>
            <div class="row mt-4">
              <div class="col">
                <div v-if="!$route.query.subjectId" class="mb-2">
                  <ValidationProviderWrapper
                    :name="'subject - class'"
                    :rules="['required']"
                    :label="'Subject - Class'"
                  >
                    <v-select
                      v-model="subject"
                      :loading="loading"
                      class="style-chooser"
                      placeholder="Select Subject"
                      :reduce="(subject) => subject.id"
                      label="subjectName"
                      :options="allSubjects"
                    >
                      <template #spinner="{ loading }">
                        <div
                          v-if="loading"
                          style="border-left-color: rgba(88, 151, 251, 0.71)"
                          class="vs__spinner"
                        >
                          The .vs__spinner class will hide the text for me.
                        </div>
                      </template>
                    </v-select>
                  </ValidationProviderWrapper>
                </div>
                <div class="mb-2">
                  <ValidationProviderWrapper
                    :name="'Exercise Name'"
                    :rules="['required']"
                    :label="'Exercise Name'"
                  >
                    <input
                      v-model="exercise_name"
                      class="form-control"
                      placeholder="Enter Name"
                    />
                  </ValidationProviderWrapper>
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
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <ValidationProviderWrapper
                      :name="'exercise format'"
                      :rules="['required']"
                      :label="'Exercise Format'"
                    >
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
                    </ValidationProviderWrapper>
                  </div>
                  <div class="col-md-6 mb-2">
                    <ValidationProviderWrapper
                      :name="'exercise type'"
                      :rules="['required']"
                      :label="'Exercise Type'"
                    >
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
                    </ValidationProviderWrapper>
                  </div>

                  <template v-if="showDates">
                    <div class="col-md-6 mb-2">
                      <label class="form-control-label">Available Date</label>
                      <div class="">
                        <v-date-picker
                          v-model="available_date"
                          :min-date="new Date()"
                          :model-config="modelConfig"
                          mode="date"
                          @dayclick="datePicker1 = false"
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
                          :min-date="new Date()"
                          :model-config="modelConfig"
                          mode="date"
                          @dayclick="datePicker2 = false"
                        >
                          <template #default="{ togglePopover }">
                            <span @click="togglePopover()">
                              <input
                                v-model="due_date"
                                class="form-control form-control-lg"
                                placeholder="Due Date"
                              />
                            </span>
                          </template>
                        </v-date-picker>
                      </div>
                    </div>
                  </template>
                  <div class="col-md-6 mb-2">
                    <!-- <ValidationProviderWrapper :rules="['required']"> -->
                    <label class="form-control-label">Obtainable Score</label>
                    <div>
                      <input
                        v-model="full_score"
                        :disabled="disableObtainableScore"
                        placeholder="eg 100"
                        type="number"
                      />
                    </div>
                    <span
                      v-if="exercise_type === 'objective'"
                      class="text-secondary smaller"
                      >( This will be derived from the sum of the marks awarded to each
                      question.)
                    </span>
                    <!-- </ValidationProviderWrapper> -->
                  </div>

                  <div v-if="showDuration" class="col-md-6 mb-2">
                    <label class="form-control-label">Set Duration</label>

                    <div>
                      <input
                        v-model="duration"
                        placeholder=" eg 30 minutes"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="exercise_type === 'objective'">
                <div class="col-12">
                  <hr />

                  <div class="card-title mb-3 fs-20 font-weight-normal">Sections</div>
                </div>
                <div class="col-12">
                  <div class="exc-sections-wrapper">
                    <div
                      v-for="(section, index) in sections"
                      :key="index"
                      class="exc-section mb-2"
                    >
                      <div
                        class="bg-primary rounded accordion-header active target-icon creation-accordion-header px-3 py-3"
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
                              {{ section.title ? section.title : "" }}
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
                          <div class="line-height-0 mr-3" @click="deleteSection(index)">
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
                          <div class="col-lg-12">
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
                            class="bg-primary rounded accordion-header target-icon creation-accordion-header active px-3 py-3"
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
                                class="bg-grayish-variant-1 fs-14 text-dark py-1 px-2 font-weight-bold rounded mr-2"
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
                                  <label class="form-control-label">Question Score</label>
                                  <input
                                    v-model="question.marks"
                                    type="text"
                                    @input="changeObtainableScore($event.target.value)"
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
                                  class="file-type-display py-3 px-3 text-center w-100"
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
                                      question.file_upload.name
                                        ? question.file_upload.name
                                        : "Click to upload an Image(optional)"
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
                                v-for="(option, optionIndex) in question.question_option"
                                :key="optionIndex"
                                class="row align-items-center mb-2"
                              >
                                <div class="col-md-10 col-11">
                                  <div
                                    class="d-flex align-items-center form-control py-0 h-auto"
                                  >
                                    <div class="flex-grow-1 mr-2">
                                      <input
                                        v-model="option.option"
                                        type="text"
                                        :placeholder="`Option ${optionIndex + 1}`"
                                        class="form-control bg-white h-100 px-0 border-0 py-2 fs-14"
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
                                    class="d-flex align-content-center justify-content-end"
                                  >
                                    <div
                                      class="text-primary pointer d-flex align-content-center"
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
                                  <label class="form-control-label">Question Score</label>
                                  <input
                                    v-model="question.marks"
                                    type="text"
                                    @input="changeObtainableScore($event.target.value)"
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
                                  class="file-type-display py-3 px-3 text-center w-100"
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
                                      question.file_upload.name
                                        ? question.file_upload.name
                                        : "Click to upload an Image(optional)"
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
                                v-for="(option, optionIndex) in question.question_option"
                                :key="optionIndex"
                                class="row align-items-center mb-2"
                              >
                                <div class="col-md-10 col-11">
                                  <div
                                    class="d-flex align-items-center form-control py-0 h-auto"
                                  >
                                    <div class="flex-grow-1 mr-2">
                                      <input
                                        v-model="option.option"
                                        type="text"
                                        disabled
                                        :placeholder="
                                          optionIndex === 0 ? 'True' : 'False'
                                        "
                                        class="form-control bg-white h-100 px-0 border-0 py-2 fs-14 text-capitalize"
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
                                  <label class="form-control-label">Question Score</label>
                                  <input
                                    v-model="question.marks"
                                    type="text"
                                    @input="changeObtainableScore($event.target.value)"
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
                                  class="file-type-display py-3 px-3 text-center w-100"
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
                                      question.file_upload.name
                                        ? question.file_upload.name
                                        : "Click to upload an Image(optional)"
                                    }}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row align-items-center mb-2">
                              <div class="col-md-10">
                                <div class="mb-3">
                                  <label class="form-control-label">Marking Guide</label>
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
                        <div class="text-primary pointer d-flex align-content-center">
                          <b-dropdown
                            v-model="section_question"
                            text="Add Questions"
                            variant="primary"
                            class="m-2"
                          >
                            <b-dropdown-item @click="addQuestion(index, 'options')"
                              >Multichoice</b-dropdown-item
                            >
                            <b-dropdown-item @click="addQuestion(index, 'trueFalse')"
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
                      <div class="text-primary pointer d-flex align-content-center ml-4">
                        <div class="mr-1 line-height-0">
                          <span
                            class="iconify fs-18"
                            data-icon="fluent:add-24-filled"
                            style="font-size: 18px; color: #1070b7"
                          ></span>
                        </div>
                        <strong class="fs-14" @click="addSection">Add Section</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

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

                      <div class="d-flex align-items-center">
                        <div
                          class="file-type-display py-3 px-3 text-center bg-white"
                          style="cursor: pointer; width: 80%"
                          @click="uploadEssay"
                        >
                          <span v-if="essaySpinner == false" class="text-primary">{{
                            essayAttachment.name
                              ? essayAttachment.name
                              : "Click to Upload"
                          }}</span>

                          <span v-else>
                            <b-spinner
                              variant="primary"
                              type="grow"
                              label="Spinning"
                            ></b-spinner>
                          </span>
                        </div>

                        <span class="text-danger ml-3" @click="deleteUpload">
                          <span class="iconify" data-icon="fluent:delete-28-filled"></span
                        ></span>
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

                      <div class="d-flex align-items-center">
                        <div
                          class="file-type-display py-3 px-3 text-center bg-white"
                          style="cursor: pointer"
                          @click="uploadEssay"
                        >
                          <span v-if="essaySpinner == false" class="text-primary">{{
                            essayAttachment.name
                              ? essayAttachment.name
                              : "Click to Upload"
                          }}</span>
                          <span v-else>
                            <b-spinner
                              variant="primary"
                              type="grow"
                              label="Spinning"
                            ></b-spinner>
                          </span>
                        </div>

                        <span class="text-danger ml-3" @click="deleteUpload">
                          <span class="iconify" data-icon="fluent:delete-28-filled"></span
                        ></span>
                      </div>
                      <p class="text-grey font10 font-museo">
                        Formats: PPT, DOC, PDF, JPEG
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </ValidationObserver>
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
              <span v-if="submitForm" key="">
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
              <div class="dropdown-item" style="cursor: pointer" @click="saveDraft">
                Save as draft
              </div>
              <div class="dropdown-item" style="cursor: pointer" @click="savePublish">
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
// import { values } from "lodash";
export default {
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  data() {
    return {
      submitForm: false,
      loading: true,
      editorConfig: {
        title: {
          // placeholder: 'h1',
        },
        placeholder: "Provide brief description for students for this exercise",
        removePlugins: ["Title"],
      },
      editorConfigForSection: {
        title: {
          // placeholder: 'h1',
        },
        placeholder: "Add Header / Description / Instruction",
        removePlugins: ["Title"],
      },
      allSubjects: [],
      essayAttachment: {},
      exercise_type: "",
      essayResponse: {},
      essaySpinner: false,
      datePicker1: false,
      datePicker2: false,
      showDates: true,
      showDuration: true,
      questionImage: { section: 0, question: 0 },
      imagesArray: "",
      gradeList: "",
      section_question: "",
      exercise_name: "",
      exercise_description: "",
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
      grade: "",
      subject: "",
      classes: "",
      exercise_type: "",
      exercise_format: "assessment",
      available_date: "",
      due_date: "",
      duration: "",
      full_score: "",
      essay: {
        essay_description_item: "",
      },

      sections: [],
    };
  },
  async fetch() {
    const slate_school_id = await this.$store.state.administration.school.id;

    const allGrades = await this.$axios.get(
      `/slate-admin/school/${slate_school_id}/grades/?paginate=false`
    );
    const allSubjects = await this.$axios.get(
      `schools/v2/lms/${this.$store.state.school.currentAcademicYear.id}/subjects/?paginate=false`
    );
    console.log("subjects", this.allSubjects);

    this.allSubjects = allSubjects.data.data.map((e) => ({
      subjectName: `${e.subject} - ${e.school_class}`,
      ...e,
    }));

    this.loading = false;
    console.log("subjects", this.allSubjects);

    this.gradeList = allGrades.data.data;
    console.log("allss grades", this.gradeList);
    try {
      //   await axios.all([allGrades, allSubjects]).then(
      //     axios.spread(
      //       function (grades, subjects) {
      //         this.gradeList = grades.data
      //         console.log('all the grades', this.gradeList)
      //         console.log('all the subjects', subjects)
      //       }.bind(this)
      //     )
      //   )
      //   console.log('gerade', this.gradeList)
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    disableObtainableScore() {
      if (this.exercise_type === "objective") {
        // full_score
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return true;
      } else {
        return false;
      }
    },
    routeClassName() {
      if (this.$route.query.subjectId) {
        return this.$route.query.className;
      } else {
        return "NaN";
      }
    },
    routeSubjectName() {
      if (this.$route.query.subjectId) {
        return this.$route.query.subjectName;
      } else {
        return "NaN";
      }
    },
  },
  watch: {
    // exercise_format: {
    //   handler(val) {
    //     if (val === 'assessment') {
    //       this.showDates = true
    //       this.showDuration = false
    //     } else if (val === 'examination') {
    //       this.showDates = true
    //       this.showDuration = true
    //     } else if (val === 'exercise') {
    //       this.showDuration = true
    //     } else {
    //       this.showDates = false
    //       this.showDuration = false
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
  // head() {
  //   return {
  //     script: [
  //       {
  //         src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js',
  //         integrity:
  //           'sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj',
  //         crossorigin: 'anonymous',
  //       },
  //       {
  //         src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js',
  //         integrity:
  //           'sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns',
  //         crossorigin: 'anonymous',
  //       },
  //     ],
  //   }
  // },
  mounted() {
    $(document).on("click", ".accordion-header:not(.creation-accordion-header)", (e) => {
      console.log(e.currentTarget.nextElementSibling);
      $(e.currentTarget.nextElementSibling).toggleClass("show");
      $(e.currentTarget).toggleClass("active");
    });

    $(document).on("click", ".creation-accordion-header", (e) => {
      $(
        e.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling
      ).toggleClass("show");
      $(e.target.parentNode.parentNode.parentNode.parentNode).toggleClass("active");
    });
  },
  methods: {
    changeObtainableScore(e) {
      const allScore = [];
      let totalObtainableScore = 0;
      this.sections.forEach((section) => {
        section.questions.forEach((question) => allScore.push(Number(question.marks)));
      });
      const numbersLength = allScore.length;
      for (let i = 0; i < numbersLength; i++) {
        console.log(allScore[i]);
        totalObtainableScore += allScore[i];
      }
      this.full_score = totalObtainableScore;

      // console.log(e, allScore)
      // console.log('total', totalObtainableScore)
    },
    async deleteUpload() {
      const schoolId = await this.$store.state.administration.school.id;
      try {
        await this.$axios.$delete(
          `/schools/v2/school/${schoolId}/resource/${this.essayResponse.file_id}/`
        );

        this.essayAttachment = {};
      } catch (e) {
        console.log(e);
      }
    },
    uploadEssay() {
      if (this.$refs.upload_essay) {
        this.$refs.upload_essay.click();
      }
    },
    showSections() {
      console.log(this.questionImage);
    },
    async saveDraft() {
      if (this.$refs.runValidate) {
        this.$refs.runValidate.click();
      }
      const schoolCode = this.$store.state.administration.school.code;
      if (this.exercise_type === "objective") {
        this.submitForm = true;
        await this.changeObtainableScore();

        try {
          const response = await this.$axios.post(
            `quiz/v3/class_subject/${
              this.$route.query.subjectId ? this.$route.query.subjectId : this.subject
            }/quiz_config/draft/`,
            {
              quiz_config: {
                available_date: this.available_date
                  ? `${this.available_date} 0:00:00`
                  : "",
                description: this.exercise_description,
                due_date: this.due_date ? `${this.due_date} 0:00:00` : "",
                duration: this.duration ? this.duration : "",
                essay_item: {},
                full_score: this.full_score,
                lesson_objective: [],
                name: this.exercise_name,
                quiz_mode: this.exercise_format,
                quiz_type: this.exercise_type,
                sections: this.sections,
                subject_id: this.$route.query.subjectId
                  ? this.$route.query.subjectId
                  : this.subject,
              },
            }
          );
          this.submitForm = false;

          this.$router.push({
            path: `/sms/${schoolCode}/lms/excercises/${response.data.quiz_id}?tab=0`,

            query: { _name: `${this.exercise_name}` },
          });
        } catch (error) {
          this.submitForm = false;

          console.log(error);
        }
      } else if (this.exercise_type === "essay") {
        try {
          this.submitForm = true;

          const response = await this.$axios.post(
            `/quiz/v3/class_subject/${
              this.$route.query.subjectId ? this.$route.query.subjectId : this.subject
            }/quiz_config/draft/`,
            {
              quiz_config: {
                available_date: `${this.available_date} 0:00:00`,
                due_date: this.due_date ? `${this.due_date} 0:00:00` : "",
                description: this.exercise_description,
                essay_item: this.essayResponse.url
                  ? {
                      essay_sample_url: this.essayResponse.url
                        ? this.essayResponse.url
                        : "",
                      essay_description_item: this.essay.essay_description_item
                        ? this.essay.essay_description_item
                        : "",
                      file_name: this.essayAttachment.name
                        ? this.essayAttachment.name
                        : "",
                    }
                  : {},
                duration: this.duration ? this.duration : 0,
                full_score: this.full_score ? this.full_score : "",
                name: this.exercise_name,
                quiz_mode: this.exercise_format,

                quiz_type: this.exercise_type,
                subject_id: this.$route.query.subjectId
                  ? this.$route.query.subjectId
                  : this.subject,
              },
            }
          );
          this.submitForm = false;

          this.$router.push({
            path: `/sms/${schoolCode}/lms/excercises/${response.data.quiz_id}?tab=0`,

            query: { _name: `${this.exercise_name}` },
          });
        } catch (error) {
          this.submitForm = false;

          console.log(error);
        }
      } else if (this.exercise_type === "offline") {
        try {
          this.submitForm = true;

          const response = await this.$axios.post(
            `/quiz/v3/class_subject/${
              this.$route.query.subjectId ? this.$route.query.subjectId : this.subject
            }/quiz_config/draft/`,
            {
              quiz_config: {
                available_date: `${this.available_date} 0:00:00`,
                due_date: this.due_date ? `${this.due_date} 0:00:00` : "",
                description: this.exercise_description,
                essay_item: this.essayResponse.url
                  ? {
                      essay_sample_url: this.essayResponse.url
                        ? this.essayResponse.url
                        : "",
                      essay_description_item: this.essay.essay_description_item
                        ? this.essay.essay_description_item
                        : "",
                      file_name: this.essayAttachment.name
                        ? this.essayAttachment.name
                        : "",
                    }
                  : {},
                duration: this.duration ? this.duration : 0,
                full_score: this.full_score ? this.full_score : "",
                name: this.exercise_name,
                quiz_mode: this.exercise_format,

                quiz_type: this.exercise_type,
                subject_id: this.$route.query.subjectId
                  ? this.$route.query.subjectId
                  : this.subject,
              },
            }
          );
          this.$router.push({
            path: `/sms/${schoolCode}/lms/excercises/${response.data.quiz_id}?tab=0`,

            query: { _name: `${this.exercise_name}` },
          });
        } catch (error) {
          console.log(error);
        } finally {
          this.submitForm = false;
        }
      }
    },
    async savePublish() {
      if (this.$refs.runValidate) {
        this.$refs.runValidate.click();
      }
      const schoolCode = this.$store.state.administration.school.code;
      if (this.exercise_type === "objective") {
        await this.changeObtainableScore();
        try {
          this.submitForm = true;

          const response = await this.$axios.post(
            `quiz/v3/class_subject/${
              this.$route.query.subjectId ? this.$route.query.subjectId : this.subject
            }/quiz_config/`,
            {
              quiz_config: {
                available_date: this.available_date
                  ? `${this.available_date} 0:00:00`
                  : "",
                description: this.exercise_description,
                due_date: this.due_date ? `${this.due_date} 0:00:00` : "",
                duration: this.duration ? this.duration : 0,
                full_score: this.full_score,
                lesson_objective: [],
                name: this.exercise_name,
                quiz_mode: this.exercise_format,
                quiz_type: this.exercise_type,
                sections: this.sections,
                subject_id: this.$route.query.subjectId
                  ? this.$route.query.subjectId
                  : this.subject,
              },
            }
          );
          this.$router.push({
            path: `/sms/${schoolCode}/lms/excercises/${response.data.quiz_id}?tab=0`,

            query: { _name: `${this.exercise_name}` },
          });
        } catch (error) {
          console.log(error);
        } finally {
          this.submitForm = false;
        }
      } else if (this.exercise_type === "essay") {
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
        };

        try {
          this.submitForm = true;

          const response = await this.$axios.post(
            `/quiz/v3/class_subject/${
              this.$route.query.subjectId ? this.$route.query.subjectId : this.subject
            }/quiz_config/`,
            {
              quiz_config: {
                available_date: this.available_date
                  ? `${this.available_date} 0:00:00`
                  : "",
                due_date: this.due_date ? `${this.due_date} 0:00:00` : "",
                description: this.exercise_description ? this.exercise_description : "",
                essay_item: this.essayResponse.url
                  ? {
                      essay_sample_url: this.essayResponse.url,
                      essay_description_item: this.essay.essay_description_item,
                      file_name: this.essayAttachment.name,
                    }
                  : {},
                sections: this.sections ? this.sections : {},

                duration: this.duration ? this.duration : 0,
                full_score: this.full_score ? this.full_score : "",
                name: this.exercise_name ? this.exercise_name : "",
                quiz_mode: this.exercise_format ? this.exercise_format : "",

                quiz_type: this.exercise_type ? this.exercise_type : "",
                subject_id: this.$route.query.subjectId
                  ? this.$route.query.subjectId
                  : this.subject,
              },
            }
          );
          this.$router.push({
            path: `/sms/${schoolCode}/lms/excercises/${response.data.quiz_id}?tab=0`,

            query: { _name: `${this.exercise_name}` },
          });
        } catch (error) {
          console.log(error);
        } finally {
          this.submitForm = false;
        }
      } else if (this.exercise_type === "offline") {
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
        };

        try {
          this.submitForm = true;

          const response = await this.$axios.post(
            `/quiz/v3/class_subject/${
              this.$route.query.subjectId ? this.$route.query.subjectId : this.subject
            }/quiz_config/`,
            {
              quiz_config: {
                available_date: this.available_date
                  ? `${this.available_date} 0:00:00`
                  : "",
                due_date: this.due_date ? `${this.due_date} 0:00:00` : "",
                description: this.exercise_description ? this.exercise_description : "",
                essay_item: this.essayResponse.url
                  ? {
                      essay_sample_url: this.essayResponse.url,
                      essay_description_item: this.essay.essay_description_item,
                      file_name: this.essayAttachment.name,
                    }
                  : {},
                sections: this.sections ? this.sections : {},

                duration: this.duration ? this.duration : 0,
                full_score: this.full_score ? this.full_score : "",
                name: this.exercise_name ? this.exercise_name : "",
                quiz_mode: this.exercise_format ? this.exercise_format : "",

                quiz_type: this.exercise_type ? this.exercise_type : "",
                subject_id: this.$route.query.subjectId
                  ? this.$route.query.subjectId
                  : this.subject,
              },
            }
          );
          this.$router.push({
            path: `/sms/${schoolCode}/lms/excercises/${response.data.quiz_id}?tab=0`,

            query: { _name: `${this.exercise_name}` },
          });
        } catch (error) {
          console.log(error);
        } finally {
          this.submitForm = false;
        }
      }
    },
    removeOption(index, value, optionIndex) {
      this.sections[index].questions[value].question_option.splice(optionIndex, 1);
    },
    addOption(index, value) {
      if (this.sections[index].questions[value].question_option.length < 5) {
        this.sections[index].questions[value].question_option.push({
          option: "",
          correct_flag: false,
        });
      }
    },
    async updateAvatar(imageName) {
      const schoolId = await this.$store.state.administration.school.id;

      const formData = new FormData();
      formData.append("file", this.imagesArray);
      formData.append("type", "image");
      try {
        this.submitForm = true;

        const {
          data: { data },
        } = await this.$axios.post(`schools/v2/school/${schoolId}/resource/`, formData);
        this.sections[this.questionImage.section].questions[
          this.questionImage.question
        ].file_upload = {
          file: {},
          name: imageName,
          stat: 100,
          status: "completed",
          type: "image",
          url: data.url,
        };
        this.imgText = imageName;
        console.log("image", data.url, imageName);
      } catch (error) {
        console.log(error);
      } finally {
        this.$refs.fileInput.value = null;

        this.submitForm = false;
      }
    },
    essayFile(e) {
      this.essayAttachment = "";
      if (e.target.files.length > 0) {
        this.essayAttachment = e.target.files[0];
        console.log("essay attachment", this.essayAttachment);
        this.essaySpinner = true;
        this.submitEssayAttachment();
      }
    },
    async submitEssayAttachment() {
      const schoolId = await this.$store.state.administration.school.id;
      const formData = new FormData();
      formData.append("file", this.essayAttachment);
      formData.append("type", this.essayAttachment.type);
      try {
        this.submitForm = true;

        const {
          data: { data },
        } = await this.$axios.post(`schools/v2/school/${schoolId}/resource/`, formData);
        this.essayResponse = data;
        console.log("essay image response is", this.essayResponse);
      } catch (error) {
        console.log(error);
        this.essayAttachment = {};
      } finally {
        this.$refs.upload_essay.value = null;

        this.submitForm = false;

        this.essaySpinner = false;
      }
    },
    onChange(event) {
      console.log(event);
      if (event.target.files.length > 0) {
        this.imagesArray = event.target.files[0];
        const imageName = event.target.files[0].name;
        this.updateAvatar(imageName);
      }
    },

    uploadQuestionImage(index, value) {
      if (this.$refs.fileInput) {
        document.getElementById("questionImage").click();
        this.questionImage.section = index;
        this.questionImage.question = value;
      }
    },
    removeSectionQuestion(index, value) {
      this.sections[index].questions.splice(value, 1);
    },
    questionObject(
      type = "options",
      options = [
        {
          option: "",
          correct_flag: false,
        },
        {
          option: "",
          correct_flag: false,
        },
        {
          option: "",
          correct_flag: false,
        },
      ]
    ) {
      return {
        active: true,
        answer_type: type,
        difficulty: "",
        file_upload: {
          file: {},
          name: "",
          stat: 100,
          status: "",
          type: "",
          url: "",
        },
        hint: "",
        image_url: "",
        marks: 1,
        practice_question: "",
        question_option: options,
        question_type: type,
        test_question: "",
        text: "",
        topic: "",
      };
    },
    addQuestion(index, question_type = "options") {
      if (question_type === "options") {
        this.sections[index].questions.push(this.questionObject("options"));
      } else if (question_type === "trueFalse") {
        this.sections[index].questions.push(
          this.questionObject("trueFalse", [
            { option: true, correct_flag: false },
            { option: false, correct_flag: false },
          ])
        );
      } else if (question_type === "freeText") {
        this.sections[index].questions.push(this.questionObject("freeText", []));
      }
      setTimeout(() => {
        this.changeObtainableScore();
      }, 1500);
    },
    deleteSection(index) {
      this.sections.splice(index, 1);
    },
    changeHeader(index) {
      this.sections[index].editSectionHeader = !this.sections[index].editSectionHeader;
    },
    addSection() {
      this.sections.push({
        title: "",
        header: "",
        editSectionHeader: true,
        questions: [],
        options: {},
        true_false: {},
        free_text: {},
      });
    },
    datePicker1Toggle() {
      if (this.datePicker1 === true) {
        this.datePicker1 = false;
      }
      if (this.datePicker2 === true) {
        this.datePicker2 = false;
      }
    },
  },
};
</script>

<style scoped>
.calender {
  position: absolute;
  z-index: 4;
}
.smaller {
  font-size: 15px;
  font-style: italic;
}
</style>
