<template>
  <div>
    <div class="d-flex align-items-center justify-content-end flex-wrap mb-3">
      <!-- <BackwardNavigation text="Report Card Template" /> -->

      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <a
            href="#"
            @click.prevent="$router.back()"
            class="btn btn-light py-2 px-3"
            >Cancel</a
          >
        </div>
        <div>
          <div class="dropdown">
            <!-- data-toggle="dropdown" -->
            <template v-role="'admin'">
              <BaseButton
                v-if="!$route.fullPath.includes('edit')"
                class="btn btn-primary py-2 px-3"
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                watch-request
                @click="SaveDraft()"
              >
                Save
              </BaseButton>

              <BaseButton
                v-else
                class="btn btn-primary py-2 px-3"
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                watch-request
                @click="updateTemplate()"
              >
                Save
              </BaseButton>
            </template>
            <!-- <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              <a class="dropdown-item" href="#" @click.prevent="SaveDraft()"
                >Save as Draft</a
              >
              <a class="dropdown-item" href="#">Save and Publish</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-white mb-3">
      <div class="card-header pt-4 pb-0">
        <div v-once class="card-title text-light fs-24">
          {{
            $route.fullPath.includes('edit')
              ? 'Edit Template'
              : 'Create New Template'
          }}
        </div>
        <hr class="mb-0" />
      </div>
      <div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-7 mb-2">
              <ValidationProviderWrapper
                :name="'Report Card Template'"
                :rules="['required']"
              >
                <BaseInput v-model="reportCardTemplate.name"></BaseInput>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-7 mb-2">
              <ValidationProviderWrapper
                :name="'Description'"
                :rules="['required']"
              >
                <textarea
                  v-model="reportCardTemplate.description"
                  placeholder="Enter Description"
                  class="form-control w-100"
                ></textarea>
              </ValidationProviderWrapper>
            </div>
          </div>
        </div>

        <UtilsBaseCardTab>
          <UtilsCardTab title="Academics">
            <template v-if="$route.name.includes('edit')">
              <PageConfigurationsReportCardTemplateAcademicsTabOnEdit
                :edit-field="reportCardTemplate.academic_section"
                @field-input="reportCardTemplate.academic_section = $event"
              />
            </template>

            <PageConfigurationsReportCardTemplateAcademicsTab
              v-else
              :edit-field="reportCardTemplate.academic_section"
              @field-input="reportCardTemplate.academic_section = $event"
            />
          </UtilsCardTab>
          <UtilsCardTab title="Behavioral">
            <ReportTemplateBehavioralTab
              :edit-field="reportCardTemplate.behaviour_section"
              @field-input="reportCardTemplate.behaviour_section = $event"
            />
          </UtilsCardTab>
          <UtilsCardTab title="Comment">
            <ReportTemplateCommentTab
              :edit-field="reportCardTemplate.comment_section"
              @field-input="reportCardTemplate.comment_section = $event"
            >
            </ReportTemplateCommentTab>
          </UtilsCardTab>
          <template v-if="$route.fullPath.includes('edit')">
            <UtilsCardTab title="Preview">
              <ReportTemplatePreview
                :template="reportCardTemplate.template_html"
                :dummy-data="reportCardTemplate.dummy_data"
                @refresh="$emit('refresh')"
              />
            </UtilsCardTab>
          </template>
        </UtilsBaseCardTab>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editFields: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      key: 'value',
      reportCardTemplate: {
        name: '',
        description: '',
        academic_section: [],
        // the way it is from the api
        behaviour_section: [],
        comment_section: [],
      },
    }
  },
  mounted() {
    if (Object.values(this.reportCardTemplate).length > 0) {
      this.reportCardTemplate = Object.assign(
        this.reportCardTemplate,
        this.editFields
      )
    }
  },
  methods: {
    async SaveDraft() {
      try {
        const school = this.$store.getters['school/getSchoolByCode'](
          this.$route.params.id
        )

        // mapping index of
        this.reportCardTemplate.academic_section.forEach((item) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          item.element = item.element.map((item, index) => index)
        })

        await this.$axios.$post(
          `/slate-admin/school/${school.id}/card_templates/`,
          this.reportCardTemplate
        )

        this.$router.push({
          name: 'sms-id-administration-configuration-report-card-template',
        })
      } catch (error) {
        console.log(error)
      }
    },
    async updateTemplate() {
      try {
        // const school = this.$store.getters['school/getSchoolByCode'](
        //   this.$route.params.id
        // )

        // mapping index of
        // this.reportCardTemplate.academic_section.forEach((item) => {
        //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //   item.element = item.element.map((item, index) => index)
        // });

        await this.$axios.$put(
          `/slate-admin/card_template/${this.$route.params.template}/`,
          this.reportCardTemplate
        )

        this.$router.push({
          name: 'sms-id-administration-configuration-report-card-template',
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
