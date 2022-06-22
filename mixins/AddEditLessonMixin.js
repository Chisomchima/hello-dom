import { DateTime } from 'luxon'
// import formStorageWatch from './formStorageWatch'
export default {
  // mixins: [formStorageWatch],
  async asyncData({ $axios, route, $dexie }) {
    if (route.query.local_draft_id && route.query.local_draft_id.length > 0) {
      const response = await $dexie.formData.get({
        id: route.query.local_draft_id,
      })
      return {
        data: response.data.data,
        lessonLocal: response.data.lesson,
        contentLocal: response.data.content,
        exerciseLocal: response.data.exercise,
      }
    }

    const { data } = await $axios.$get(
      `schools/v2/lms/subject/${route.params.subject}/`
    )

    return {
      data,
    }
  },
  data() {
    return {
      menuItem: ['Setup Lesson', 'Lesson Content', 'Exercise'],
      lesson: {},
      content: [],
      exercise: {},
      lessonLocal: {},
      contentLocal: {},
      exerciseLocal: {},
    }
  },
  // mounted() {
  //   this.$router.replace({
  //     query: {
  //       step: 0,
  //     },
  //   })
  // },
  methods: {
    async checkContentIsDoneUploading() {
      let requestPromises = []
      if (this.content.length > 0) {
        if (this.$refs.lessonContent.$refs.uploadComponent) {
          requestPromises = this.$refs.lessonContent.$refs.uploadComponent.map(
            (item) => {
              if (item.$refs.fileUploadComponent) {
                return item.$refs.fileUploadComponent.requestPromise
              }
              return null
            }
          )
        }
      }
      try {
        await Promise.all(requestPromises)
        return Promise.resolve(true)
      } catch (e) {
        return Promise.reject(new Error('Some Content Failed to Upload'))
      }
    },
    async draft() {
      try {
        const isValid = await this.$refs.setupLesson.$refs.form.validate();
        if (isValid) {
          this.$nuxt.$loading.start()
          const result = await this.checkContentIsDoneUploading()
          if (result) {
            const dataObj = this.prepare_data()
            const dbId = await this.storeDataInIndex()
            const data = await this.$axios.$post(
              `schools/v3/class_subject/${this.$route.params.subject}/lesson/draft/`,
              dataObj
            )

            this.deleteDataFromDb(dbId)
            this.$router.push({
              name: 'sms-id-lms-subjects-subject-lesson-lesson',
              params: {
                lesson: data.lesson_plan_id,
              },
              query: { _name: `${this.lesson.name}` },
            })

            this.$nuxt.$loading.finish()
          }
        } else {
          this.$toast({ type: 'info', text: "Please make sure all required fields are entered" })
          this.$router.push({
            query: {
              step: 0,
            }
          });
        }
      } catch (error) {
        console.log(error)
        this.$toast({ type: 'error', text: error.message })
        this.$nuxt.$loading.finish()
      }
    },
    prepare_data() {
      const lessonMaterials = this.content.map((item) => item.dataField)
      const dataObj = {
        name: this.lesson.name,
        description: this.lesson.description,
        week: this.lesson.week.week_id
          ? this.lesson.week.week_id
          : this.lesson.week.id,
        available_date:
          DateTime.fromISO(this.lesson.available_date).toFormat('yyyy-M-d') +
          ` 1:0:0`,
        lesson_materials: lessonMaterials,
        quiz_config: this.exercise,
      }
      return dataObj
    },
    async publish() {
      try {
        const isValid = await this.$refs.setupLesson.$refs.form.validate();
        if (isValid) {
          const msgResponse = await this.showConfirmMessageBox(
            'Are you sure you want to publish this lesson?'
          )
          this.$nuxt.$loading.start()
          if (msgResponse) {
            const result = await this.checkContentIsDoneUploading()
            if (result) {
              const dbId = await this.storeDataInIndex()
              const dataObj = await this.prepare_data()
              const data = await this.$axios.$post(
                `schools/v3/class_subject/${this.$route.params.subject}/lesson/`,
                dataObj
              )

              // throw new Error('Loremeem')
              this.deleteDataFromDb(dbId)

              this.$nuxt.$loading.finish()
              this.$router.push({
                name: 'sms-id-lms-subjects-subject-lesson-lesson',
                params: { lesson: data.lesson_plan_id },
                query: { _name: `${this.lesson.name}` },
              })
            }
          }
        } else {
          this.$toast({ type: 'info', text: "Please make sure all required fields are entered" })
          this.$router.push({
            query: {
              step: 0,
            }
          });
        }
      } catch (error) {
        this.$toast({ type: 'error', text: error.message })
        this.$nuxt.$loading.finish()
      }
    },
  },
}
