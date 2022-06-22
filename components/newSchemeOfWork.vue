<template>
  <div>
    <div v-if="!schemesOfWork.length" class="d-flex justify-content-end">
      <b-dropdown
        id="dropdown-left"
        text="Create Scheme of work "
        variant="none"
        size="lg"
        class="ml-2 rounded newColor"
      >
        <b-dropdown-item href="#" @click="addSchemeOfWork"
          >Create new Scheme of Work</b-dropdown-item
        >
        <b-dropdown-item href="#" @click="demoScheme"
          >Load Sample by Weeks</b-dropdown-item
        >
        <b-dropdown-item href="#" @click="demoScheme('topic')"
          >Load Sample by Topics
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div v-if="!schemesOfWork.length">
      <NoRecordPlaceholder text="No Scheme of work Added" />
    </div>
    <!-- ************  scheme of work loop starts here **************-->

    <div v-if="schemesOfWork.length" class="mt-3 text-center">
      <div class="d-flex justify-content-end">
        <div class="d-flex align-items-center">
          <b-button
            v-if="schemesOfWork.length"
            class="dropdown-custom mr-3"
            variant="warning"
            @click="handleEdit"
          >
            <span v-if="!edit"> Edit </span>
            <span v-else> Preview </span>
          </b-button>
          <b-button
            v-if="edit"
            class="dropdown-custom mr-3"
            variant="primary"
            :disabled="isLoading"
            @click="schemesOfWork = []"
          >
            <span> Clear </span>
          </b-button>
          <b-button
            v-if="edit"
            class="dropdown-custom mr-3"
            variant="danger"
            :disabled="isLoading"
            @click="$bvModal.show('delete-scheme')"
          >
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-else> Delete </span>
          </b-button>
          <b-button
            v-if="edit"
            class="dropdown-custom mr-3"
            :disabled="isSubmitLoading"
            variant="primary"
            @click="$bvModal.show('save-scheme')"
          >
            <span
              v-if="isSubmitLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-else> Save </span>
          </b-button>
          <!-- <b-button
            class="dropdown-custom"
            variant="danger"
            @click="clearScheme"
            >Clear Scheme of work</b-button
          > -->
        </div>
      </div>

      <Accordion :active-index="activeTab" multiple>
        <AccordionTab
          v-for="(scheme, schemeIndex) in schemesOfWork"
          :key="schemeIndex"
          class="my-3 border border-secondary rounded"
        >
          <template #header>
            <div class="d-flex justify-content-between w-100">
              <div v-if="scheme.edit" class="row ml-2" @click.stop>
                <BaseInput
                  v-model="scheme.title"
                  placeholder="Enter Title"
                  @click.stop
                ></BaseInput>
                <span
                  class="text-primary ml-2 d-flex align-items-center"
                  @click.stop="saveSchemeOfWork(schemeIndex)"
                >
                  <span
                    class="iconify"
                    data-icon="akar-icons:check"
                    data-width="20"
                  ></span>
                </span>
              </div>
              <div v-else>
                {{ scheme.title ? scheme.title : 'Enter Title ' }}
              </div>
              <div v-if="edit" class="row">
                <div
                  class="line-height-0 mr-3"
                  @click.prevent.stop="editSchemeOfWork(schemeIndex)"
                >
                  <Icon
                    class="text-primary pointer fs-18 ml-3"
                    icon="bx:edit"
                  ></Icon>
                </div>
                <div
                  class="line-height-0 mr-3"
                  @click.prevent.stop="deleteSchemeOfWork(schemeIndex)"
                >
                  <Icon
                    class="text-danger pointer fs-18 ml-3"
                    icon="uil:trash-alt"
                  ></Icon>
                </div>
              </div>
            </div>
          </template>
          <!-- ************ edit the scheme of work details **************-->
          <div v-if="scheme.edit" class="px-4">
            <div class="mb-2 text-left">
              <label for="" class="form-control-label">
                <h5>Description</h5>
              </label>
              <ckeditor-nuxt
                v-model="scheme.objective"
                :config="editorConfig"
              />
            </div>
            <div class="mt-2 d-flex justify-content-end">
              <b-button
                class="btn-primary"
                @click="saveSchemeOfWork(schemeIndex)"
              >
                Save
              </b-button>
            </div>
          </div>
          <!-- ************ Week loop starts here  *************-->

          <div v-else class="ml-4">
            <div class="text-left">
              <span v-html="scheme.objective"> </span>
            </div>
            <Accordion :active-index="scheme.activeTabs" multiple>
              <AccordionTab
                v-for="(week, weekIndex) in scheme.weeks"
                :key="weekIndex"
                class="my-3 border border-secondary rounded"
              >
                <template #header>
                  <div class="d-flex justify-content-between w-100">
                    <div v-if="week.edit" class="row ml-2" @click.stop>
                      <BaseInput
                        v-model="week.title"
                        placeholder="Enter Title"
                        @click.stop
                      ></BaseInput>
                      <span
                        class="text-primary ml-2 d-flex align-items-center"
                        @click.stop="
                          saveSchemeOfWorkWeek(schemeIndex, weekIndex)
                        "
                      >
                        <span
                          class="iconify"
                          data-icon="akar-icons:check"
                          data-width="20"
                        ></span>
                      </span>
                    </div>
                    <div v-else>
                      {{ week.title ? week.title : 'Enter Title ' }}
                    </div>
                    <div v-if="edit" class="row">
                      <div
                        class="line-height-0 mr-3"
                        @click.stop="
                          editSchemeOfWorkWeek(schemeIndex, weekIndex)
                        "
                      >
                        <Icon
                          class="text-primary pointer fs-18 ml-3"
                          icon="bx:edit"
                        ></Icon>
                      </div>
                      <div
                        class="line-height-0 mr-3"
                        @click.prevent.stop="
                          deleteSchemeOfWorkWeek(schemeIndex, weekIndex)
                        "
                      >
                        <Icon
                          class="text-danger pointer fs-18 ml-3"
                          icon="uil:trash-alt"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </template>
                <!-- ************ edit the Week details **************-->
                <div v-if="week.edit" class="px-4">
                  <div class="mb-2 text-left">
                    <label for="" class="form-control-label">
                      <h5>Description</h5>
                    </label>
                    <ckeditor-nuxt
                      v-model="week.objective"
                      :config="editorConfig"
                    />
                  </div>
                  <div class="mt-2 d-flex justify-content-end">
                    <!-- <b-button class="mr-3 btn-danger"> cancel </b-button> -->

                    <b-button
                      class="btn-primary"
                      @click="saveSchemeOfWorkWeek(schemeIndex, weekIndex)"
                    >
                      Save
                    </b-button>
                  </div>
                </div>
                <!-- ************ Topic loop starts here  *************-->

                <div v-else>
                  <div class="text-left">
                    <span v-html="week.objective"> </span>
                  </div>
                  <Accordion
                    :active-index="week.activeTabs"
                    multiple
                    @tab-close="tabClose"
                  >
                    <AccordionTab
                      v-for="(topic, topicIndex) in week.topics"
                      :key="topicIndex"
                      class="my-3 border border-secondary rounded"
                      @tab-close="tabClose($event)"
                    >
                      <template #header>
                        <div class="d-flex justify-content-between w-100">
                          <div
                            v-if="topic.edit"
                            class="row ml-2 w-100"
                            @click.stop
                          >
                            <BaseInput
                              v-model="topic.title"
                              class=""
                              placeholder="Enter Title"
                              @click.stop
                            ></BaseInput>
                            <span
                              class="
                                text-primary
                                ml-2
                                d-flex
                                align-items-center
                              "
                              @click.stop.prevent="
                                saveTopic(schemeIndex, weekIndex, topicIndex)
                              "
                            >
                              <span
                                class="iconify"
                                data-icon="akar-icons:check"
                                data-width="20"
                              ></span>
                            </span>
                          </div>
                          <div v-else>
                            {{ topic.title ? topic.title : 'Enter Title ' }}
                          </div>

                          <div v-if="edit" class="row">
                            <div
                              class="line-height-0 mr-3"
                              @click.prevent.stop="
                                editTopic(schemeIndex, weekIndex, topicIndex)
                              "
                            >
                              <Icon
                                class="text-primary pointer fs-18 ml-3"
                                icon="bx:edit"
                              ></Icon>
                            </div>
                            <div
                              class="line-height-0 mr-3"
                              @click.prevent.stop="
                                deleteTopic(schemeIndex, weekIndex, topicIndex)
                              "
                            >
                              <Icon
                                class="text-danger pointer fs-18 ml-3"
                                icon="uil:trash-alt"
                              ></Icon>
                            </div>
                          </div>
                        </div>
                      </template>
                      <!-- ************ edit the topic details **************-->
                      <div v-if="topic.edit" class="px-4">
                        <div class="mb-2 text-left">
                          <label for="" class="form-control-label">
                            <h5>Description</h5>
                          </label>
                          <ckeditor-nuxt
                            v-model="topic.description"
                            :config="editorConfig"
                          />
                        </div>
                        <div class="mt-2 d-flex justify-content-end">
                          <!-- <b-button class="mr-3 btn-danger"> cancel </b-button> -->

                          <b-button
                            class="btn-primary"
                            @click="
                              saveTopic(schemeIndex, weekIndex, topicIndex)
                            "
                          >
                            Save
                          </b-button>
                        </div>
                      </div>
                      <!-- ************ Topic description here *************-->

                      <div v-else>
                        <div class="text-left">
                          <span v-html="topic.description"> </span>
                        </div>
                      </div>
                    </AccordionTab>
                  </Accordion>
                  <div v-if="edit" class="mt-2 d-flex justify-content-end">
                    <!-- <b-button class="mr-3 btn-danger"> cancel </b-button> -->

                    <b-button
                      class="btn-primary"
                      @click="addTopic(schemeIndex, weekIndex)"
                    >
                      Add Section
                    </b-button>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>

            <div v-if="edit" class="mt-2 d-flex justify-content-end">
              <!-- <b-button class="mr-3 btn-danger"> cancel </b-button> -->

              <b-button
                class="btn-primary add-week"
                @click="addWeek(schemeIndex)"
              >
                Add Section
              </b-button>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
      <div v-if="edit" class="d-flex justify-content-end">
        <BaseButton class="btn-borderless-primary" @click="addSchemeOfWork">
          Add Section
        </BaseButton>
      </div>
    </div>
    <!--     ********************   modals   ********************************  -->
    <section>
      <modal-wrapper
        id="save-scheme"
        title="Save Scheme of Work"
        submit-title="Save"
        @ok="handleSubmit"
      >
        <div>Are you sure you want to save this scheme of work?</div>
      </modal-wrapper>
      <modal-wrapper
        id="delete-scheme"
        title="Delete Scheme of Work"
        submit-title="Delete"
        @ok="handleDeleteOfWork"
      >
        <div>Are you sure you want to delete this scheme of work?</div>
      </modal-wrapper>
    </section>
  </div>
</template>

<script>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import SchemeOfWork from '~/mixins/schemeOfWork'
export default {
  components: {
    Accordion,
    AccordionTab,
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },
  mixins: [SchemeOfWork],
  props: {
    page: {
      type: String,
      default: 'lms',
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      edit: false,
      isSubmitLoading: false,
      isLoading: false,
      schemeOfWork: [],
      editorConfig: {
        title: {
          // placeholder: 'h1',
        },
        placeholder:
          'Provide brief description for subjects for this Scheme of Work',
        removePlugins: ['Title'],
      },
      activeTab: [0],
      activeTopicTab: 0,

      showAddedScheme: false,
      schemesOfWork: [],
    }
  },
  mounted() {
    console.log('scheme', this.data)
    if (Array.isArray(this.data) && this.data.length > 0) {
      this.schemesOfWork = this.data
    }
  },
  methods: {
    handleEdit() {
      if (this.edit) {
        this.schemesOfWork.forEach((scheme) => {
          if (scheme) {
            scheme.edit = false
            scheme.weeks.forEach((week) => {
              if (week) {
                week.edit = false
                week.topics.forEach((topic) => {
                  if (topic) {
                    topic.edit = false
                  }
                })
              }
            })
          }
        })
      }

      this.edit = !this.edit
    },
    toast(toaster, append = false, variant = 'success', title, body) {
      this.counter++
      this.$bvToast.toast(body, {
        title,
        toaster,
        variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      })
    },
    async handleDeleteOfWork() {
      let url
      if (this.page === 'admin') {
        url = `/slate-admin/subject/${this.$route.params.subject}/scheme_of_work/`
      } else if (this.page === 'lms') {
        url = `/schools/v3/class_subject/${this.$route.params.subject}/scheme_of_work/`
      }
      try {
        this.isLoading = true
        await this.$axios.post(url, { scheme_of_work: [] })
        this.clearScheme()

        this.$emit('refresh')
        this.toast(
          'b-toaster-bottom-center',
          true,
          'danger',
          'Success',
          'Scheme of work deleted'
        )
        this.$bvModal.hide('delete-scheme')
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async handleSubmit() {
      this.isSubmitLoading = true
      let url
      if (this.page === 'admin') {
        url = `/slate-admin/subject/${this.$route.params.subject}/scheme_of_work/`
      } else if (this.page === 'lms') {
        url = `/schools/v3/class_subject/${this.$route.params.subject}/scheme_of_work/`
      }
      try {
        await this.$axios.post(url, { scheme_of_work: this.schemesOfWork })
        this.$emit('refresh')
        this.toast(
          'b-toaster-bottom-center',
          true,
          'success',
          'Success',
          'Scheme of work Updated'
        )
        this.$bvModal.hide('save-scheme')
      } catch (error) {
        console.error(error)
      } finally {
        this.isSubmitLoading = false
      }
    },
  },
}
</script>

<style scoped>
.dropdown-custom {
  height: 2.4rem;
}
.newColor {
  background-color: #dbeaf4;
}
</style>
