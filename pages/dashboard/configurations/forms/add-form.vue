<template>
  <div>
    <BackwardNavigation />
    <div class="page-heading mb-4">Create Form</div>
    <div
      class="container d-flex wrap justify-content-center align-items-center"
    >
      <div class="container d-flex">
        <ValidationObserver ref="form" class="block">
          <form>
            <div class="w-100 cards my-3 row p-4">
              <div class="col-md-12 mb-2">
                <ValidationProviderWrapper :rules="['required']">
                  <input
                    v-model="dataObject.title"
                    type="text"
                    class="form-control"
                    placeholder="Form Title"
                  />
                </ValidationProviderWrapper>
              </div>

              <div class="col-md-12 mb-2">
                <ValidationProviderWrapper :rules="['']">
                  <input
                    v-model="dataObject.description"
                    type="text"
                    class="form-control"
                    placeholder="Form Description"
                  />
                </ValidationProviderWrapper>
              </div>
            </div>
            <div
              v-for="(section, index) in dataObject.content"
              :key="index"
              class="cards p-4 my-3 row"
            >
              <Accordion
                class="accordion-custom col-12 shadow-sm p-2"
                :key="innerIndex"
                :active-index="index"
                v-for="(col, innerIndex) in section.cols"
              >
                <AccordionTab>
                  <template #header>
                    <div
                      class="
                        d-flex
                        p-3
                        shadow-sm
                        nav
                        justify-content-between
                        align-items-center
                      "
                    >
                      <div
                        class="
                          header
                          d-flex
                          justify-content-between
                          align-items-end
                          px-2
                          pb-0
                        "
                      >
                        <div class="w-100 hh d-flex align-items-end">
                          <span
                            v-if="section.show"
                            class="point mr-1"
                            @click="closeSection(index)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="m6.7 18l-5.65-5.65l1.425-1.4l4.25 4.25l1.4 1.4Zm5.65 0L6.7 12.35l1.4-1.425l4.25 4.25l9.2-9.2l1.4 1.425Zm0-5.65l-1.425-1.4L15.875 6L17.3 7.4Z"
                              />
                            </svg>
                          </span>
                          <span
                            v-else
                            class="point mr-1"
                            @click="openSection(index)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575q.837 0 1.412.575l1.4 1.4q.575.575.6 1.388q.025.812-.55 1.387ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725l-.7-.7l1.4 1.4Z"
                              />
                            </svg>
                          </span>
                          <div class="rounded w-100">
                            <input
                              ref="sectionheader"
                              class="formhead2"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="d-flex">
                        <div
                          v-tooltip="'Add Row'"
                          class="
                            point
                            d-flex
                            align-items-center
                            text-14
                            border
                            rounded-circle
                            p-2
                            text-primary
                          "
                        >
                          <span
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill="currentColor"
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                              />
                            </svg>
                          </span>
                        </div>
                        <div
                          v-tooltip="'Remove Row'"
                          class="
                            point
                            d-flex
                            align-items-center
                            text-14
                            border
                            rounded-circle
                            mx-2
                            p-2
                            text-primary
                          "
                        >
                          <i
                            class="pi pi-minus-circle"
                            style="color: red; font-weight: 600"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </template>
                  <div
                    v-for="(option, optionIndex) in col.form_field"
                    :key="optionIndex"
                    class="
                      p-3
                      row
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                    style="
                      background-color: rgb(230, 235, 242);
                      color: rgb(91, 91, 231) !important;
                      border-radius: 10px;
                    "
                  >
                    <div class="col-6 mb-2">
                      <ValidationProviderWrapper :rules="['']">
                        <input
                          v-model="option.context"
                          type="text"
                          class="form-control"
                          placeholder="Write a question"
                        />
                      </ValidationProviderWrapper>
                    </div>
                    <!-- 
                    <div class="col-5 mb-2">
                      <v-select
                        class="text-grey text-14"
                        placeholder="Add form Fields"
                        label="label"
                        :options="sectionType"
                        :reduce="(option) => option.label"
                      >
                      </v-select>
                    </div> -->
                    <b-dropdown
                      size="sm"
                      text="Add form field"
                      variant="outline-primary"
                      class="col-5 mb-2"
                    >
                      <b-dropdown-item
                        v-for="(form, formindex) in sectionType"
                        :key="formindex"
                        @click="
                          setInputType(index, innerIndex, optionIndex, form)
                        "
                        >{{ form.label }}</b-dropdown-item
                      >
                    </b-dropdown>

                    <div
                      v-tooltip="'Remove Field'"
                      class="
                        col-1
                        d-flex
                        justify-content-center
                        align-items-center
                        point
                        text-14 text-danger
                      "
                      @click="
                        deleteField(index, innerIndex, optionIndex, itemindex)
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"
                        />
                      </svg>
                    </div>
                    <div v-if="option.type === 'text'" class="w-100 mb-2">
                      <!-- Handle textfield -->
                      <div class="w-100 d-flex mb-2">
                        <input
                          placeholder="Enter value"
                          v-model="option.options"
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div v-if="option.type === 'checkbox'" class="w-100 mb-2">
                      <!-- Handle checkbox -->
                      <div class="w-100 d-flex mb-2">
                        <div class="ml-3">
                          <input
                            v-model="option.options"
                            type="checkbox"
                            class="checkbox"
                          />
                        </div>
                      </div>
                    </div>
                    <div v-if="option.type === 'text-area'" class="w-100 mb-2">
                      <!-- Handle text-area -->
                      <div class="w-100 d-flex mb-2">
                        <div class="w-100">
                          <textarea
                            id=""
                            v-model="option.options"
                            class="form-control"
                            name=""
                            cols="30"
                            rows="1"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div v-if="option.type === 'date'" class="w-100 mb-2">
                      <!-- Handle Date -->
                      <div class="w-100 d-flex mb-2">
                        <div class="w-100">
                          <input
                            v-model="option.options"
                            type="date"
                            class="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="
                        option.type === 'diagnosis' ||
                        option.type === 'lab_Order' ||
                        option.type === 'imaging' ||
                        option.type === 'prescription' ||
                        option.type === 'nursing'
                      "
                      class="w-100 mb-2"
                    >
                      <!-- Handle Date -->
                      <div class="w-100 d-flex align-items-center mb-2">
                        <div class="mr-2">
                          <button class="btn btn-success">
                            <span class="text-capitalize">{{
                              option.type.split('_').join(' ')
                            }}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTab>
              </Accordion>
              <hr class="col-11 my-3 p-2 mx-3" />

              <div
                class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-end"
              >
                <BaseButton class="mr-1 w-23" @click="addSection">
                  Add Section
                </BaseButton>
                <BaseButton
                  class="ml-1 w-23 btn-danger"
                  @click="deleteSection(index)"
                >
                  Remove Section
                </BaseButton>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
export default {
  components: { Accordion, AccordionTab },
  data() {
    return {
      editMode: false,
      startCol: false,
      dataObject: {
        title: '',
        description: '',
        content: [
          {
            section: 'Section title',
            show: false,
            cols: [
              {
                header: 'Title',
                form_field: [
                  {
                    context: '',
                    type: null,
                    options: [
                      {
                        value: '',
                      },
                    ],
                  },
                ],
                required: false,
                show: false,
              },
            ],
          },
        ],
        is_active: false,
        is_default: true,
      },
      sectionType: [
        {
          label: 'Text',
          val: 'text',
        },
        {
          label: 'Text Area',
          val: 'text-area',
        },
        {
          label: 'Checkbox',
          val: 'checkbox',
        },
        {
          label: 'File',
          val: 'file',
        },
        {
          label: 'Date',
          val: 'date',
        },
        {
          label: 'Dropdown',
          val: 'dropdown',
        },
        {
          label: 'Diagnosis',
          val: 'diagnosis',
        },
        {
          label: 'Lab Order',
          val: 'lab_Order',
        },
        {
          label: 'Imaging',
          val: 'imaging',
        },
        {
          label: 'Prescription',
          val: 'prescription',
        },
        {
          label: 'Nursing',
          val: 'nursing',
        },
      ],
      title: '',
      departments: [],
    }
  },

  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.dataObject.id) {
          this.edit()
        } else {
          this.save()
        }
      }
    },
    closeSection(index) {
      this.dataObject.content[index].show = false
    },
    openSection(index) {
      this.dataObject.content[index].show = true
      console.log(this.$refs.sectionheader[0])
      this.$refs.sectionheader[0].focus()
    },
    addField(index, innerIndex) {
      this.dataObject.content[index].cols[innerIndex].form_field.push({
        context: '',
        type: null,
        options: [
          {
            value: '',
          },
        ],
      })
    },
    deleteField(index, innerIndex, optionIndex) {
      this.dataObject.content[index].cols[innerIndex].form_field.splice(
        optionIndex,
        1
      )
    },
    closeMode(index, innerIndex) {
      this.dataObject.content[index].cols[innerIndex].show = false
    },
    openMode(index, innerIndex) {
      this.dataObject.content[index].cols[innerIndex].show = true
    },
    printOption(index, innerIndex, optionIndex) {
      const length =
        this.dataObject.content[index].cols[innerIndex].form_field[optionIndex]
          .options.length
      this.dataObject.content[index].cols[innerIndex].form_field[
        optionIndex
      ].options.push({
        // label: `Option ${length + 1}`,
        value: '',
      })
    },
    deleteOption(index, innerIndex, optionIndex, itemindex) {
      this.dataObject.content[index].cols[innerIndex].form_field[
        optionIndex
      ].options.splice(itemindex, 1)
    },
    setInputType(index, innerIndex, optionIndex, input) {
      if (input.val === 'dropdown') {
        this.dataObject.content[index].cols[innerIndex].form_field[
          optionIndex
        ].options = [
          {
            value: '',
          },
        ]
      } else if (input.val === 'checkbox') {
        this.dataObject.content[index].cols[innerIndex].form_field[
          optionIndex
        ].options = false
      } else {
        this.dataObject.content[index].cols[innerIndex].form_field[
          optionIndex
        ].options = ''
      }
      this.dataObject.content[index].cols[innerIndex].form_field[
        optionIndex
      ].type = input.val
    },
    addColumn(index) {
      if (this.dataObject.content[index].cols.length < 4) {
        this.dataObject.content[index].cols.push({
          header: 'Title',
          context: '',
          form_field: [
            {
              context: '',
              type: null,
              options: [
                {
                  value: '',
                },
              ],
            },
          ],
          required: false,
          show: false,
        })
      }
    },
    addSection(e) {
      e.preventDefault()
      this.dataObject.content.push({
        section: 'Section title',
        show: false,
        cols: [
          {
            header: 'Title',
            context: '',
            form_field: [
              {
                context: '',
                type: null,
                options: [
                  {
                    value: '',
                  },
                ],
              },
            ],
            required: false,
            show: false,
          },
        ],
      })
    },
    deleteSection(e) {
      this.dataObject.content.length !== 0 &&
        this.dataObject.content.splice(e, 1)
    },
    deleteColumn(index, innerIndex) {
      this.dataObject.content[index].cols[innerIndex].length !== 1 &&
        this.dataObject.content[index].cols.splice(innerIndex, 1)
    },
    async save() {
      try {
        const data = await this.$api.templates.createEncTemplate(
          this.dataObject
        )
        this.$emit('refresh')
        this.$bvModal.hide('addTemplate')
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      try {
        const data = await this.$api.templates.updateEncTemplate(
          this.dataObject.id,
          this.dataObject
        )
        this.$emit('refresh')
        this.$bvModal.hide('addTemplate')
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        title: '',
        description: '',
        content: [
          {
            section: 'Section title',
            show: false,
            cols: [
              {
                header: 'Title',
                context: '',
                form_field: [
                  {
                    context: '',
                    type: null,
                    options: [
                      {
                        value: '',
                      },
                    ],
                  },
                ],
                required: false,
                show: false,
              },
            ],
          },
        ],
        is_active: false,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  background-color: white;
  border-radius: 10px;
  width: 95%;
}
.block {
  width: 95%;
  //   height: 100%;
}
.cards {
  width: 100%;
  background-color: white;
  border-radius: 10px;
  // border-left: 10px solid rgb(91, 91, 231);

  border-left: 10px solid $COLOR_TWO;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  border: none !important;
}

.v-select {
  background: #f5f6f8;
  border: none !important;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
  border-bottom: 2px solid rgb(139, 139, 227) !important;
}

input[type='text'] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid rgb(139, 139, 227);
}
.accordions {
  background-color: white !important;
}
</style>
