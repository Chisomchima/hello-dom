<template>
  <div class="conatiner">
    <div class="d-flex align-items-center justify-content-end flex-wrap mb-3">
      <!-- <BackwardNavigation text="Lesson Plans" /> -->

      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <a href="#" class="btn btn-light py-2 px-3" @click="$router.go(-1)"
            >Cancel</a
          >
        </div>
        <div>
          <button
            class="btn btn-primary py-2 px-3"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            @click="Post()"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <div class="card bg-white mb-3">
      <div class="card-header pt-4 pb-0">
        <div class="card-title text-light fs-24">Edit Lesson Plan</div>
        <hr class="mb-0" />
      </div>
      <div class="card-body">
        <div>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form class="row" @submit.prevent="handleSubmit(submitForm)">
              <div class="col-md-6 my-2">
                <ValidationProviderWrapper
                  :name="'Grade Level'"
                  :rules="['required']"
                  :label="'Grade Level'"
                >
                  <v-select
                    v-model="dataMeta.grade_level"
                    class="style-chooser"
                    placeholder="Select Grade Level"
                    label="name"
                    :reduce="(option) => option.id"
                    :options="gradeLevels"
                    @input="getSubjects"
                  ></v-select>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-6 my-2">
                <ValidationProviderWrapper
                  :name="'Subject'"
                  :rules="['required']"
                  :label="'Subject'"
                >
                  <v-select
                    v-model="dataMeta.subject"
                    class="style-chooser"
                    placeholder="Select Subject"
                    label="name"
                    :reduce="(option) => option.id"
                    :options="subjects"
                  ></v-select>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-12 my-2">
                <ValidationProviderWrapper
                  name="Title"
                  :rules="['required']"
                  label="Title"
                >
                  <BaseInput
                    v-model="editTitle"
                    placeholder="Enter Lesson Plan Title"
                  ></BaseInput>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-6 my-2">
                <ValidationProviderWrapper
                  :name="'Academic Year'"
                  :rules="['required']"
                  :label="'Academic Year'"
                >
                  <v-select
                    v-model="dataMeta.academic_year"
                    class="style-chooser"
                    placeholder="Select Academic Year"
                    label="name"
                    :reduce="(option) => option.id"
                    :options="academicYear"
                  ></v-select>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-6 my-2">
                <ValidationProviderWrapper
                  :name="'Academic Period'"
                  :rules="['required']"
                  :label="'Academic Period'"
                >
                  <v-select
                    v-model="dataMeta.academic_period"
                    class="style-chooser"
                    placeholder="Select Academic Period"
                    label="name"
                    :reduce="(option) => option.id"
                    :options="academicPeriod"
                  ></v-select>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-6 my-2">
                <ValidationProviderWrapper
                  :name="'Week'"
                  :rules="['required']"
                  :label="'Week'"
                >
                  <v-select
                    v-model="dataMeta.academic_week"
                    class="style-chooser"
                    placeholder="Select Week"
                    label="name"
                    :reduce="(option) => option.id"
                    :options="weeks"
                  >
                  </v-select>
                </ValidationProviderWrapper>
              </div>
              <div class="col-md-6 my-2">
                <ValidationProviderWrapper name="Date" :rules="['required']">
                  <v-date-picker
                    v-model="createdDate"
                    mode="date"
                    popover-align="center"
                    popover-placement="bottom"
                    :model-config="modelConfig"
                    class=""
                  >
                    <template #default="{ inputValue, togglePopover }">
                      <div class="d-flex">
                        <input
                          :value="inputValue"
                          class="form-control ng-valid ng-dirty ng-touched"
                          @click="togglePopover()"
                        />

                        <span
                          class="input-group-text border-left-0 bg-white"
                          @click="togglePopover()"
                          ><span
                            class="iconify"
                            data-inline="false"
                            data-icon="carbon:calendar"
                            style="font-size: 20px"
                          ></span
                        ></span>
                      </div>
                    </template>
                  </v-date-picker>
                </ValidationProviderWrapper>
              </div>
            </form>
          </ValidationObserver>

          <!-- show existing components -->
          <div v-for="(component, i) in dataContent" :key="i">
            <div v-if="component.type === `topics_subtopics`">
              <div class="card card-bordered bg-grayish-variant-2">
                <div class="card-body border-bottom py-3">
                  <div class="d-flex align-items-center">
                    <div class="mr-3 line-height-0 pointer">
                      <svg
                        width="8"
                        height="13"
                        viewBox="0 0 8 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                        <rect
                          y="5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          y="10"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          y="5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          y="10"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                      </svg>
                    </div>
                    <div
                      class="fs-14 line-height-100p font-weight-bold mr-3"
                      style="min-width: 68px"
                    >
                      Topic:
                    </div>
                    <div class="flex-grow-1">
                      <ValidationProviderWrapper
                        name=""
                        :rules="['required']"
                        label=""
                      >
                        <BaseInput
                          v-model="component.text"
                          placeholder="Topic:"
                        ></BaseInput>
                      </ValidationProviderWrapper>
                    </div>
                  </div>
                </div>
                <div class="card-body border-bottom py-3">
                  <div class="d-flex align-items-center">
                    <div class="mr-3 line-height-0 opacity-0">
                      <svg
                        width="8"
                        height="13"
                        viewBox="0 0 8 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                        <rect
                          y="5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          y="10"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          y="5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          y="10"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                      </svg>
                    </div>
                    <div
                      class="fs-14 line-height-100p font-weight-bold mr-3"
                      style="min-width: 68px"
                    >
                      Sub topic:
                    </div>
                    <div class="flex-grow-1">
                      <ValidationProviderWrapper
                        name=""
                        :rules="['required']"
                        label=""
                      >
                        <BaseInput
                          v-model="component.subtopic"
                          placeholder="Enter Sub Topic:"
                        ></BaseInput>
                      </ValidationProviderWrapper>
                    </div>
                  </div>
                </div>
                <div class="card-body py-3">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <button
                      class="btn btn-light text-danger bg-white"
                      @click="deleteDataContent(i)"
                    >
                      <span
                        class="iconify fs-16"
                        data-icon="uil:trash-alt"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-else>
              <hr class="my-4" />
              <div class="card card-bordered bg-grayish-variant-2">
                <div class="card-body py-3">
                  <div class="d-flex align-items-center">
                    <div class="mr-3 line-height-0 pointer">
                      <svg
                        width="8"
                        height="13"
                        viewBox="0 0 8 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                        <rect
                          y="5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          y="10"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          y="5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          y="10"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                      </svg>
                    </div>
                    <div
                      class="
                        fs-14
                        line-height-100p
                        font-weight-bold
                        mr-3
                        text-capitalize
                      "
                      style="min-width: 68px"
                    >
                      {{ component.type.split('_').join(' ') }}
                    </div>
                  </div>
                  <div class="mt-3">
                    <ValidationProviderWrapper
                      name=""
                      :rules="['required']"
                      label=""
                    >
                      <VueEditor
                        v-model="component.text"
                        placeholder="Description"
                      />
                    </ValidationProviderWrapper>
                  </div>
                  <div
                    class="
                      d-flex
                      align-items-center
                      flex-wrap
                      justify-content-between
                      mt-3
                    "
                  >
                    <button
                      class="btn btn-light text-danger bg-white my-1"
                      @click="deleteDataContent(i)"
                    >
                      <span
                        class="iconify fs-16"
                        data-icon="uil:trash-alt"
                      ></span>
                    </button>
                    <div
                      v-if="component.files"
                      class="d-flex align-items-center"
                    >
                      <div
                        v-for="(file, i) in component.files"
                        :key="i"
                        class="mx-3"
                      >
                        <div
                          class="btn btn-light text-light bg-white py-2 my-1"
                        >
                          <span class="iconify" data-icon="feather:file"></span>
                          <span class="fs-14">{{ file.name }}</span>
                          <span class="text-dark fs-12 font-weight-bold mx-1"
                            >{{ Math.round(file.size / 1024) }}kb</span
                          >
                          <span
                            class="iconify fs-16 pointer text-danger"
                            data-icon="ci:off-outline-close"
                            @click="deletefile"
                          ></span>
                        </div>
                      </div>

                      <div class="button-wrapper">
                        <span class="label"
                          ><span
                            class="iconify"
                            data-icon="feather:file"
                          ></span>
                          Attach File</span
                        >

                        <input
                          type="file"
                          name="upload"
                          multiple
                          id="upload"
                          ref="fileup"
                          class="upload-box"
                          placeholder="Upload File"
                          @change="handlefileupload($event, i)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- if topic is selected -->

          <div
            v-for="(content, i) in selectedContent"
            :key="i"
            draggable="true"
            style="cursor: move"
            class="mb-3"
            @drop="onDrop($event, i)"
            @dragstart="startDrag($event, i)"
            @dragover.prevent
            @dragenter.prevent
          >
            <div v-if="content.name == `Topic/Sub-topic`">
              <hr class="my-4" />
              <div class="card card-bordered bg-grayish-variant-2">
                <div class="card-body border-bottom py-3">
                  <div class="d-flex align-items-center">
                    <div class="mr-3 line-height-0 pointer">
                      <svg
                        width="8"
                        height="13"
                        viewBox="0 0 8 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                        <rect
                          y="5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          y="10"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          y="5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          y="10"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                      </svg>
                    </div>
                    <div
                      class="fs-14 line-height-100p font-weight-bold mr-3"
                      style="min-width: 68px"
                    >
                      Topic:
                    </div>
                    <div class="flex-grow-1">
                      <ValidationProviderWrapper
                        name=""
                        :rules="['required']"
                        label=""
                      >
                        <BaseInput placeholder="Topic:"></BaseInput>
                      </ValidationProviderWrapper>
                    </div>
                  </div>
                </div>
                <div class="card-body border-bottom py-3">
                  <div class="d-flex align-items-center">
                    <div class="mr-3 line-height-0 opacity-0">
                      <svg
                        width="8"
                        height="13"
                        viewBox="0 0 8 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                        <rect
                          y="5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          y="10"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          y="5"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                        <rect
                          x="4.5"
                          y="10"
                          width="3"
                          height="3"
                          rx="1"
                          fill="#B7CCDC"
                        />
                      </svg>
                    </div>
                    <div
                      class="fs-14 line-height-100p font-weight-bold mr-3"
                      style="min-width: 68px"
                    >
                      Sub topic:
                    </div>
                    <div class="flex-grow-1">
                      <ValidationProviderWrapper
                        name=""
                        :rules="['required']"
                        label=""
                      >
                        <BaseInput placeholder="Enter Sub Topic:"></BaseInput>
                      </ValidationProviderWrapper>
                    </div>
                  </div>
                </div>
                <div class="card-body py-3">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <button
                      class="btn btn-light text-danger bg-white"
                      @click="deleteContent(i)"
                    >
                      <span
                        class="iconify fs-16"
                        data-icon="uil:trash-alt"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-else>
              <hr class="my-4" />
              <div>
                <div class="card card-bordered bg-grayish-variant-2">
                  <div class="card-body py-3">
                    <div class="d-flex align-items-center">
                      <div class="mr-3 line-height-0 pointer">
                        <svg
                          width="8"
                          height="13"
                          viewBox="0 0 8 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                          <rect
                            y="5"
                            width="3"
                            height="3"
                            rx="1"
                            fill="#B7CCDC"
                          />
                          <rect
                            y="10"
                            width="3"
                            height="3"
                            rx="1"
                            fill="#B7CCDC"
                          />
                          <rect
                            x="4.5"
                            width="3"
                            height="3"
                            rx="1"
                            fill="#B7CCDC"
                          />
                          <rect
                            x="4.5"
                            y="5"
                            width="3"
                            height="3"
                            rx="1"
                            fill="#B7CCDC"
                          />
                          <rect
                            x="4.5"
                            y="10"
                            width="3"
                            height="3"
                            rx="1"
                            fill="#B7CCDC"
                          />
                        </svg>
                      </div>
                      <div
                        class="fs-14 line-height-100p font-weight-bold mr-3"
                        style="min-width: 68px"
                      >
                        {{ content.name }}
                      </div>
                    </div>
                    <div class="mt-3">
                      <ValidationProviderWrapper
                        name=""
                        :rules="['required']"
                        label=""
                      >
                        <VueEditor
                          v-model="selectedContent[i].text"
                          placeholder="Description"
                        />
                      </ValidationProviderWrapper>
                    </div>
                    <div
                      class="
                        d-flex
                        align-items-center
                        flex-wrap
                        justify-content-between
                        mt-3
                      "
                    >
                      <button
                        class="btn btn-light text-danger bg-white my-1"
                        @click="deleteContent(i)"
                      >
                        <span
                          class="iconify fs-16"
                          data-icon="uil:trash-alt"
                        ></span>
                      </button>
                      <div
                        v-if="content.files"
                        class="d-flex align-items-center"
                      >
                        <div
                          v-for="(file, i) in content.files"
                          :key="i"
                          class="mx-3"
                        >
                          <div
                            class="btn btn-light text-light bg-white py-2 my-1"
                          >
                            <span
                              class="iconify"
                              data-icon="feather:file"
                            ></span>
                            <span class="fs-14">{{ file.name }}</span>
                            <span class="text-dark fs-12 font-weight-bold mx-1"
                              >{{ Math.round(file.size / 1024) }}kb</span
                            >
                            <span
                              class="iconify fs-16 pointer text-danger"
                              data-icon="ci:off-outline-close"
                              @click="deletefile"
                            ></span>
                          </div>
                        </div>

                        <div class="button-wrapper">
                          <span class="label"
                            ><span
                              class="iconify"
                              data-icon="feather:file"
                            ></span>
                            Attach File</span
                          >

                          <input
                            id="upload"
                            type="file"
                            name="upload"
                            multiple
                            class="upload-box"
                            placeholder="Upload File"
                            @change="handlefileupload($event, i)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- end -->

          <div class="d-flex justify-content-end">
            <!-- <button class="btn" @click="Post()">Post</button> -->
            <div class="dropdown">
              <button
                id="dropdownMenuButton"
                class="btn btn-outline-primary py-2 px-3"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span
                  class="iconify fs-16"
                  data-icon="fluent:add-24-filled"
                ></span>
                Add Plan Component
              </button>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
              >
                <a
                  v-for="(plan, i) in planData"
                  :key="i"
                  class="dropdown-item border-0 fs-12"
                  href="#"
                  @click="showContent(plan, i)"
                >
                  {{ plan.name }}
                </a>
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
  data() {
    return {
      planData: [
        { name: 'Topic/Sub-topic' },
        { name: 'Objectives' },
        { name: 'Differentiation' },
        { name: 'Materials Needed' },
        { name: 'Previous Knowledge' },
        { name: 'Starter' },
        { name: 'Direct Instruction' },
        { name: 'Keywords' },
        { name: 'Student Activity (Guided Practice)' },
        { name: 'Class Assessment' },
        { name: 'Class Summary/Conclusion' },
        { name: 'Home Assessment' },
      ],

      selectedContent: [],
      selectedTopics: [],

      subjects: [],
      gradeLevels: [],
      academicYear: [],
      academicPeriod: [],
      weeks: [],
      existingTopics: [],
      allcontent: [],
      files: [],

      topics_subtopics: [],
      objectives: [],
      differentiation: [],
      materials: [],
      previous_knowledge: [],
      starter: [],
      direct_instruction: [],
      keywords: [],
      student_activity: [],
      class_assesment: [],
      class_summary: [],
      home_assesment: [],

      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD',
      },
      selectedDate: '',

      selectedData: {
        title: '',
        grade_level: '',
        academic_year: '',
        academic_period: '',
        academic_week: '',
        subject: '',
      },

      dataMeta: {},
      editTitle: '',
      createdDate: '',
      dataContent: {},

      gradelevelid: '',
      acyearid: '',
      acperiodid: '',
      acweekid: '',
      subjid: '',
    }
  },

  async fetch() {
    const schoolId = await this.$store.state.administration.school.id

    const academicYearId = await this.$store.state.school.currentAcademicYear.id

    // grade level
    const gradeLevel = await this.$axios.$get(
      `/slate-admin/school/${schoolId}/grades/?paginate=false`
    )
    this.gradeLevels = gradeLevel.data.map((grade) => grade)

    // academic year

    const academicyear = await this.$axios.$get(
      `/slate-admin/school/${schoolId}/year/?paginate=false`
    )

    this.academicYear = academicyear.data.map((year) => year)

    // academic period

    const academicperiod = await this.$axios.$get(
      `/slate-admin/school/${schoolId}/periods/?paginate=false`
    )
    this.academicPeriod = academicperiod.data.map((period) => period)

    // get week
    const week = await this.$axios.$get(
      `schools/v2/academic_year/${academicYearId}/weeks/`
    )

    this.weeks = week.data.map((weekcontent) => weekcontent)

    // get

    const { data } = await this.$axios.$get(
      `/schools/v3/${this.$store.state.administration.school.id}/lessonplan/get/${this.$route.params.lessonplans}/`
    )

    this.dataMeta = data
    this.dataContent = data.content
    this.editTitle = data.title
    this.createdDate = data.created_at

    console.log(data)
  },

  methods: {
    startDrag(evt, id) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', id)
    },
    onDrop(event, index) {
      const ItemID = event.dataTransfer.getData('itemID')

      const selectedContentPlaceholder = this.selectedContent
      const newItem = selectedContentPlaceholder[index]

      selectedContentPlaceholder[index] = selectedContentPlaceholder[ItemID]
      selectedContentPlaceholder[ItemID] = newItem

      this.selectedContent = []
      this.selectedContent = selectedContentPlaceholder
    },

    async handlefileupload(event, i) {
      if (event.target.files[0]) {
        const submit = new FormData()
        const temp = []
        const temp2 = []
        console.log(event)
        temp.push(event.target.files)

        const filedata = event.target.files[0]
        submit.append('type', filedata.type)
        submit.append('file', filedata)

        console.log('est', event.target.files[0])

        try {
          const { data } = await this.$axios.$post(
            `/schools/v2/school/${this.schoolId}/resource/`,
            submit
          )
          console.log('data response', data)
          data.name = filedata.name
          this.selectedContent[i].files.push(data)
          this.$refs.fileup.value = null
        } catch (e) {
          console.log(e)
        }

        for (const f of temp) {
          temp2.push(...f)
        }
      }
    },

    showContent(plan, i) {
      this.selectedContent.push({
        name: plan.name,
        id: i,
        files: [],
        text: '',
        subtopic: '',
        comments: [],
      })
    },

    deleteContent(index) {
      this.selectedContent.splice(index, 1)
    },

    deleteDataContent(i) {
      this.dataContent.splice(i, 1)
    },

    deletefile() {
      console.log('works')
      // this.files.splice(index, 1);
    },

    async getSubjects(e) {
      const schoolId = await this.$store.state.administration.school.id
      const getInputSubject = await this.$axios.$get(
        `/slate-admin/school/${schoolId}/subjects/?grade__exact=${e}&paginate=false`
      )

      this.subjects = getInputSubject.data
        .map((subject) => subject)
        .map((sub) => ({
          name: sub.name,
          id: sub.id,
        }))

      console.log('getsubjects', this.subjects)
    },
    async Post() {
      this.dataContent.forEach((element) => {
        this.allcontent.push(element)
      })
      this.selectedContent.forEach((element) => {
        switch (element.name) {
          case 'Topic/Sub-topic':
            this.topics_subtopics.push({
              type: 'topics_subtopics',
              text: element.text,
              subtopic: element.subtopic,
            })

            this.topics_subtopics.forEach((e) => {
              this.allcontent.push(e)
            })
            break
          case 'Objectives':
            this.objectives.push({
              type: 'objectives',
              text: element.text,
              files: element.files,
              comments: element.comments,
            })
            this.objectives.forEach((e) => {
              this.allcontent.push(e)
            })
            break
          case 'Differentiation':
            this.differentiation.push({
              type: 'differentiation',
              text: element.text,
              files: element.files,
              comments: element.comments,
            })
            this.differentiation.forEach((e) => {
              this.allcontent.push(e)
            })
            break
          case 'Materials Needed':
            this.materials.push({
              type: 'materials_needed',
              text: element.text,
              files: element.files,
              comments: element.comments,
            })
            this.materials.forEach((e) => {
              this.allcontent.push(e)
            })

            break
          case 'Previous Knowledge':
            this.previous_knowledge.push({
              type: 'previous_knowledge',
              text: element.text,
              files: element.files,
              comments: element.comments,
            })
            this.previous_knowledge.forEach((e) => {
              this.allcontent.push(e)
            })
            break
          case 'Starter':
            this.starter.push({
              type: 'starter',
              text: element.text,
              files: element.files,
              comments: element.comments,
            })
            this.starter.forEach((e) => {
              this.allcontent.push(e)
            })
            break
          case 'Direct Instruction':
            this.direct_instruction.push({
              type: 'direct_instruction',
              text: element.text,
              files: element.files,
              comments: element.comments,
            })
            this.direct_instruction.forEach((e) => {
              this.allcontent.push(e)
            })

            break
          case 'Keywords':
            this.keywords.push({
              type: 'keywords',
              text: element.text,
              files: element.files,
              comments: element.comments,
            })

            this.keywords.forEach((e) => {
              this.allcontent.push(e)
            })
            break
          case 'Student Activity (Guided Practice)':
            this.student_activity.push({
              type: 'student_activity',
              text: element.text,
              files: element.files,
              comments: element.comments,
            })
            this.student_activity.forEach((e) => {
              this.allcontent.push(e)
            })
            break
          case 'Class Assessment':
            this.class_assesment.push({
              type: 'class_assesment',
              text: element.text,
              files: element.files,
              comments: element.comments,
            })

            this.class_assesment.forEach((e) => {
              this.allcontent.push(e)
            })
            break
          case 'Class Summary/Conclusion':
            this.class_summary.push({
              type: 'class_summary',
              text: element.text,
              files: element.files,
              comments: element.comments,
            })
            this.class_summary.forEach((e) => {
              this.allcontent.push(e)
            })

            break
          case 'Home Assessment':
            this.home_assesment.push({
              type: 'home_assesment',
              text: element.text,
              files: element.files,
              comments: element.comments,
            })
            this.home_assesment.forEach((e) => {
              this.allcontent.push(e)
            })
            break

          default:
            console.log(`invalid.`)
        }
      })

      this.gradelevelid = this.dataMeta.grade_level.id
      this.acyearid = this.dataMeta.academic_year.id
      this.acperiodid = this.dataMeta.academic_period.id
      this.acweekid = this.dataMeta.academic_week.id
      this.subjid = this.dataMeta.subject.id

      const lessonplan = {
        title: this.editTitle,
        grade_level: this.gradelevelid,
        academic_year: this.acyearid,
        academic_period: this.acperiodid,
        academic_week: this.acweekid,
        subject: this.subjid,
        content: this.allcontent,
      }

      try {
        const schoolId = await this.$store.state.administration.school.id

        await this.$axios.put(
          `schools/v3/${schoolId}/lessonplan/update/${this.$route.params.lessonplans}/`,
          lessonplan
        )

        this.$router.push(`/sms/${this.$route.params.id}/lms/lessonplan`)
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>
.button-wrapper {
  position: relative;
  width: 150px;
  text-align: center;
}

.button-wrapper span.label {
  position: relative;
  z-index: 0;
  display: inline-block;
  width: 100%;
  background: #fff;
  border: 1px solid #e7e8eb;
  border-radius: 4px;
  cursor: pointer;
  color: #1070b7;
  padding: 10px 0;
  font-size: 14px;
}

#upload {
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
