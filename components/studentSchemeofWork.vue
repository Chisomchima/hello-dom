<template>
  <div>
    <div v-if="!schemesOfWork.length">
      <NoRecordPlaceholder text="No Scheme of work Added" />
    </div>
    <!-- ************  scheme of work loop starts here **************-->

    <div v-if="schemesOfWork.length" class="mt-3 text-center">
      <Accordion :active-index="activeTab" multiple>
        <AccordionTab
          v-for="(scheme, schemeIndex) in schemesOfWork"
          :key="schemeIndex"
          class="my-3 border border-secondary rounded"
        >
          <template #header>
            <div class="d-flex justify-content-between w-100">
              <div>
                {{ scheme.title ? scheme.title : 'Enter Title ' }}
              </div>
              <div class="row"></div>
            </div>
          </template>

          <!-- ************ Week loop starts here  *************-->

          <div class="ml-4">
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
                    <div>
                      {{ week.title ? week.title : 'Enter Title ' }}
                    </div>
                  </div>
                </template>

                <!-- ************ Topic loop starts here  *************-->

                <div>
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
                          <div>
                            {{ topic.title ? topic.title : 'Enter Title ' }}
                          </div>
                        </div>
                      </template>

                      <!-- ************ Topic description here *************-->

                      <div>
                        <div class="text-left">
                          <span v-html="topic.description"> </span>
                        </div>
                      </div>
                    </AccordionTab>
                  </Accordion>
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </AccordionTab>
      </Accordion>
      <div class="d-flex justify-content-end"></div>
    </div>
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
    classId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isSubmitLoading: false,
      isLoading: false,
      schemeOfWork: [],

      activeTab: [],
      activeTopicTab: 0,

      showAddedScheme: false,
      schemesOfWork: [],
    }
  },
  mounted() {
    // console.log('scheme', this.data)
    if (Array.isArray(this.data) && this.data.length > 0) {
      this.schemesOfWork = this.data
      // const formatted = this.data.map((term) => {
      //   return {
      //     ...term,
      //     eddit: false,
      //   }
      // })
      // console.log('unformatted', this.data, 'formatted', formatted)
    }
  },
  methods: {},
}
</script>

<style scoped>
.dropdown-custom {
  height: 2.4rem;
}
</style>
