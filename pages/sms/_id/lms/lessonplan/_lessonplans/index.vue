<template>
  <div class="conatiner" ref="downloadpage">
    <div class="d-flex align-items-center justify-content-end flex-wrap mb-3">
      <!-- <BackwardNavigation text="Lesson Plans" /> -->

      <LessonPlanTopic
        :approvals="approvals"
        :sections="sections"
        :data="data"
        @edit-lessonplan="goedit(e)"
        @download-pdf="downloadpdf"
      >
        <template #delete>
          <button
            class="btn btn-outline-danger bg-white text-danger py-2 px-3"
            @click="deletePlan"
          >
            <b-icon icon="trash" font-scale="0.9" class=""></b-icon>
          </button>
        </template>
      </LessonPlanTopic>
    </div>

    <section ref="document">
      <UtilsHeaderCard
        disable-image
        disable-action
        bg-color="#FBFDFE"
        color="black"
        :title="data.title"
        :data="data"
        :display-key="[
          'grade_level.grade_name',
          'subject.name',
          'created_at',
          'created_by.name',
          'academic_year.name',
          'academic_period.name',
          'academic_week.name',
        ]"
      >
        <template #created_at="{ value }">
          <span style="color: green !important">{{ value }}</span>
        </template>

        <template #actions>
          <div class="d-flex align-items-center">
            <span class="mr-2 line-height-100p text-light fs-14">Status:</span>
            <span v-if="status === 'draft'" class="draft badge badge-light">{{
              status
            }}</span>
            <span
              v-if="status === 'Awaiting Approval'"
              class="badge yellow-badge bg-white"
              >{{ status }}</span
            >
          </div>
        </template>
      </UtilsHeaderCard>

      <div v-for="(section, i) in sections" :key="i" class="card">
        <div
          class="
            card-body
            fs-14
            text-dark
            border-bottom border-gray
            px-4 px-xl-5
          "
        >
          <div
            class="
              d-flex
              flex-wrap
              align-items-center
              justify-content-between
              line-height-100p
              mb-3
            "
          >
            <div class="font-weight-bold mb-1 text-capitalize">
              {{ section.type.split('_').join(' ') }}
            </div>
            <div class="mb-1">
              <span class="text-primary pointer" @click="$bvModal.show(`${i}`)"
                ><span
                  class="iconify fs-14"
                  data-icon="fluent:add-24-filled"
                ></span>
                Add comment</span
              >
            </div>
            <ModalWrapper :id="`${i}`" title="Topics">
              <div class="modal-body">
                <pre>{{ comments.commentText }}</pre>
                <div class="mb-2">
                  <ValidationProviderWrapper
                    name="Comment"
                    :rules="['required']"
                  >
                    <textarea
                      v-model="section.comments"
                      class="form-control"
                      placeholder="Enter Comment"
                    ></textarea>
                  </ValidationProviderWrapper>
                </div>
              </div>

              <template #modal-footer>
                <div class="w-100 d-flex justify-content-end">
                  <div
                    class="
                      d-flex
                      align-items-center
                      justify-content-end
                      mt-4
                      mb-2
                    "
                  >
                    <div class="mr-2">
                      <button
                        class="btn btn-light py-2 px-3"
                        @click="show = false"
                      >
                        Cancel
                      </button>
                    </div>
                    <div>
                      <button
                        class="btn btn-primary py-2 px-3"
                        @click="postComment(i)"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </template>
            </ModalWrapper>
          </div>
          <div class="mb-2">
            <div class="mb-1">
              <span
                v-if="section.type === 'topics_subtopics'"
                class="text-light line-height-100p"
                >Topic:</span
              >
              <span
                v-if="section.type === 'topics_subtopics'"
                class="line-height-150p"
                >{{ section.text.split('_').join(' ') }}</span
              >
              <div
                v-if="section.type === 'topics_subtopics'"
                class="line-height-150p"
              >
                {{ section.subtopic.split('_').join(' ') }}
              </div>
              <span
                v-if="section.type !== 'topics_subtopics'"
                class="line-height-150p"
                v-html="section.text"
                >else
              </span>

              <div v-if="section.files">
                <div v-for="(file, i) in section.files" :key="i" class="m">
                  <div class="btn btn-light text-light bg-white py-2 my-1">
                    <a :href="file.url" target="_blank" class="text-dark">
                      <span
                        class="iconify text-dark"
                        data-icon="feather:file"
                      ></span>
                      <span class="fs-14 text-dark">{{ file.name }}</span></a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import html2pdf from 'html2pdf.js'
export default {
  components: {},
  async asyncData({ $axios, route, store }) {
    const { data: DataField } = await $axios.$get(
      `/schools/v3/${store.state.administration.school.id}/lessonplan/get/${route.params.lessonplans}/`
    )

    const createdDate = DateTime.fromISO(DataField.created_at).toLocaleString()
    console.log('data field', DataField)
    const data = {
      ...DataField,
      created_at: createdDate,
    }

    return {
      data,
    }
  },
  data() {
    return {
      sections: [],
      status: '',
      comments: [],
      approvals: [],
      datasection: [],
    }
  },

  async fetch() {
    try {
      const { data } = await this.$axios.$get(
        `/schools/v3/${this.$store.state.administration.school.id}/lessonplan/get/${this.$route.params.lessonplans}/`
      )
      console.log('data is', data)

      this.datasection.push({})
      this.status = data.status
      this.sections.push(...data.content)
    } catch (e) {
      console.log(e)
    }

    try {
      const approvals = await this.$axios.$get(
        `/schools/v3/${this.$store.state.administration.school.id}/lessonplan/approver/list/?page=1&page_size=1`
      )

      console.log(approvals.data.results)

      approvals.data.results.forEach((e) => {
        this.approvals.push(e.approver)
      })

      console.log('approvals', this.approvals)
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    async deletePlan() {
      try {
        await this.$axios.$delete(
          `/schools/v3/${this.$store.state.administration.school.id}/lessonplan/delete/${this.$route.params.lessonplans}/`
        )
        this.$router.push(`/sms/${this.$route.params.id}/lms/lessonplan`)
      } catch (e) {
        console.log(e)
      }
    },

    postComment(i) {
      this.comments.push({
        index: i,
        commentText: '',
      })

      console.log(this.comments)
    },

    goedit() {
      this.$router.push({
        name: 'sms-id-lms-lessonplan-lessonplans-editplan',
        params: {
          lessonplans: this.$route.params.lessonplans,
        },
      })
    },

    downloadpdf() {
      html2pdf(this.$refs.document, {
        margin: 1,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' },
      })
    },
  },
}
</script>

<style scoped>
#comments-right {
  top: 107px !important;
}

.draft.badge.badge-light {
  color: #8f9aa3;
  background-color: none;
  border: 1px solid #8f9aa3;
}
</style>
