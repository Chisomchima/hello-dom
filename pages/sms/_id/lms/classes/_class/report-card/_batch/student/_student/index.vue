<template>
  <div>
    <div class="d-flex align-items-center justify-content-end flex-wrap mb-3">
      <!-- <BackwardNavigation /> -->
      <div class="d-flex align-items-center flex-wrap mb-2">
        <template v-if="['approved', 'processed'].includes(data.status)">
          <div
            class="bg-white d-flex align-items-center py-2 px-3 border rounded"
          >
            Download:
            <div
              class="d-flex align-items-center py-2 px-3 mx-2"
              @click="studentBroadsheet()"
            >
              <Icon
                style="font-size: 25px"
                icon="vscode-icons:file-type-excel2"
              />
            </div>
            <div
              class="d-flex align-items-center py-2 px-3 mx-2"
              @click="downloadPdf()"
            >
              <Icon
                style="font-size: 25px"
                icon="ant-design:file-pdf-filled"
                class="text-danger"
              />
            </div>
          </div>
        </template>

        <div
          v-if="!['approved', 'processed'].includes(data.status)"
          class="mr-2"
        >
          <BaseButton
            watch-request
            class="d-flex align-items-center py-2 px-3"
            @click="save()"
          >
            <b-icon icon="record-circle" />
            <span class="px-1"> Save</span>
          </BaseButton>
        </div>

        <div
          v-if="!['approved', 'processed'].includes(data.status)"
          class="mr-2"
        >
          <BaseButton
            watch-request
            class="d-flex align-items-center py-2 px-3"
            @click="approved()"
          >
            <b-icon icon="check-all" />
            <span class="px-1">Approve</span>
          </BaseButton>
        </div>
      </div>
    </div>
    <ReportTemplateStudentHeader :data="data" :audit-log-data="auditLogData">
      <template #audit>
        <button
          v-b-toggle.sidebar-right
          class="btn btn-sm btn-light text-capitalize"
        >
          audit log
        </button>
      </template>
    </ReportTemplateStudentHeader>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Academics">
        <ReportTemplateStudentAcademic
          :report-columns="data.report_card_columns"
          :report="data.report_card"
          :status="data.status"
          @sync="sync()"
          @change="updateScore($event)"
        />
      </UtilsCardTab>
      <UtilsCardTab title="Behavioral">
        <ReportTemplateStudentBehavioural
          :items="data.behaviours"
          :status="data.status"
          @field-input="data.behaviours = $event"
          @sync="syncBehavior()"
        />
      </UtilsCardTab>
      <UtilsCardTab title="Comment">
        <ReportTemplateStudentComment
          :items="data.comments"
          :status="data.status"
          @field-input="data.comments = $event"
          @sync="syncComment()"
        />
      </UtilsCardTab>
    </UtilsBaseCardTab>

    <RightSideBar title="Audit Log" @shown="getAuditLog()">
      <template v-if="auditLogData.length <= 0">
        <b-card v-for="n in 3" :key="n">
          <b-skeleton animation="fade" width="85%"></b-skeleton>
          <b-skeleton animation="fade" width="55%"></b-skeleton>
          <b-skeleton animation="fade" width="70%"></b-skeleton>
        </b-card>
      </template>

      <template v-else>
        <div
          v-for="(section, i) in auditLogData"
          :key="i"
          class="border-bottom d-flex py-3 px-3"
        >
          <div>
            <div
              class="
                d-flex
                align-items-center
                justify-content-between
                line-height-100p
              "
            >
              <div class="text-dark fs-12 text-capitalize">
                {{ section.staff }}
              </div>
            </div>
            <div class="text-light fs-10">{{ section.on }}</div>
            <div class="text-light fs-12 text-capitalize">
              Action:<span class="text-dark fs-12 text-capitalize">
                {{ section.action }}</span
              >
            </div>
          </div>
        </div>
      </template>
    </RightSideBar>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    try {
      const { data } = await $axios.$get(
        `schools/v3/report_card/batch/${route.params.batch}/class_student/${route.params.student}`
      )
      const audit = await $axios.$get(
        `schools/v2/class/batch/${route.params.batch}/class/student/${route.params.student}/audit/`
      )
      const auditLogData = audit.data.audit

      return { data, auditLogData }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      watcher: () => {},
      data: {},
      auditLogData: [],
    }
  },
  methods: {
    updateScore(e) {
      this.data.report_card[e.subjectIndex].student_subject_scores[
        e.subjectScoreIndex
      ].student_score = e.value
    },
    async sync() {
      try {
        const { data } = await this.$axios.$get(
          `schools/v3/report_card/batch/${this.$route.params.batch}/class_student/${this.$route.params.student}/?sync=true`
        )
        this.data = data
        await this.$nuxt.refresh()
      } catch (error) {
        console.log(error)
      }
    },
    async syncBehavior() {
      try {
        const { data } = await this.$axios.$get(
          `schools/v3/report_card/batch/${this.$route.params.batch}/class_student/${this.$route.params.student}/?sync=true&resync_behaviour=true`
        )
        this.data = data
        await this.$nuxt.refresh()
      } catch (error) {
        console.log(error)
      }
    },
    async syncComment() {
      try {
        const { data } = await this.$axios.$get(
          `schools/v3/report_card/batch/${this.$route.params.batch}/class_student/${this.$route.params.student}/?sync=true&resync_comment=true`
        )
        this.data = data
        await this.$nuxt.refresh()
      } catch (error) {
        console.log(error)
      }
    },
    async save() {
      try {
        await this.$axios.$post(
          `/schools/v3/report_card/batch/${this.$route.params.batch}/class_student/${this.$route.params.student}/`,
          {
            data: this.data,
          }
        )
        await this.$nuxt.refresh()
        this.$toast({
          type: 'success',
          text: 'Saved Successfully',
        })
      } catch (error) {
        console.log(error)
      }
    },
    async approved() {
      try {
        await this.$axios.$post(
          `/schools/v3/report_card/batch/${this.$route.params.batch}/class_student/${this.$route.params.student}/?approve=true`,
          {
            data: this.data,
          }
        )
        this.watcher = this.$watch('$route.path', (newValue, oldValue) => {
          alert('sds')
          // this.$store.dispatch('breadcrumbs/removeRoute', e)
          // e = null
          this.watcher() // turns off the watcher
        })
        this.$router.back()
        // alert('we')
        this.$store.dispatch('breadcrumbs/popRoute')

        this.$toast({
          type: 'success',
          text: 'Approved Successfully',
        })
      } catch (error) {
        console.log(error)
      }
    },
    studentBroadsheet() {
      window.open(
        `${process.env.BASE_URL}/schools/v3/report_card/student/${this.data.report_card_id}/report_card/broadsheet/`
      )
    },

    downloadPdf() {
      window.open(
        `${process.env.BASE_URL}/schools/v3/report_card/${this.data.report_card_id}/file`
      )
    },

    async getAuditLog() {
      try {
        const { data } = await this.$axios.$get(
          `schools/v2/class/batch/${this.$route.params.batch}/class/student/${this.$route.params.student}/audit/`
        )
        this.auditLogData = data.audit
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
