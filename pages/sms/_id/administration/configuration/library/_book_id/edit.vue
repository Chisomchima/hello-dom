<template>
  <div>
    <div class="d-flex justify-content-between">
      <div :style="{ cursor: 'pointer' }" @click="$router.go(-1)">
        <h4>
          <Icon
            class=""
            icon="akar-icons:arrow-left"
            :style="{ fontSize: '1.5rem' }"
          />

          Library Item
        </h4>
      </div>
    </div>
    <div class="mt-5">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <div>
            <div class="d-flex justify-content-between mb-3 mt-4"></div>
            <div>
              <div class="bg-white p-3">
                <div class="row">
                  <div class="col-2">
                    <div
                      class="mb-4 p-1 text-primary rounded"
                      :style="{
                        height: '12rem',
                        maxWidth: '10rem',
                        transition: 'transform 0.3s ease-out',
                        'border-style': 'dotted',
                        'border-color': '#80B4D9',

                        'background-image': `url('${form.thumbnail}')`,

                        'background-repeat': 'no-repeat, repeat',
                        'background-size': '10rem 12rem',
                        'background-position': '50% 10%',
                      }"
                      @click="uploadThumbail(index)"
                    >
                      <div
                        class="
                          mt-5
                          d-flex
                          flex-column
                          align-items-center
                          justify-content-center
                        "
                      >
                        <template v-if="!form.thumbnail">
                          <div class="">
                            <Icon
                              icon="akar-icons:image"
                              :style="{ fontSize: '1.5rem' }"
                            />
                          </div>

                          <br />
                          <div class="m-0 text-center text-truncater">
                            Upload Thumbnail
                          </div>
                        </template>
                        <template v-else>
                          <div class="bg-white text-dark p-2">reupload</div>
                        </template>
                      </div>

                      ggf
                      {{ form.spinner }}dfd
                    </div>
                    <span class="text-secondary"> File Upload</span>
                    <div
                      class="
                        blue-dashed
                        rounded
                        text-center
                        p-1
                        d-flex
                        align-items-center
                        justify-content-center
                      "
                      @click="uploadFile()"
                    >
                      <div
                        v-if="form.spinner"
                        class="spinner-grow text-primary"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                      <div v-else class="d-flex mt-2 flex-column">
                        <div class="">
                          <Icon
                            class="text-primary"
                            icon="ant-design:file-filled"
                            :style="{ fontSize: '1.5rem' }"
                          />
                        </div>
                        <div class="text-truncater text-primary">
                          {{ fileName ? fileName : form.name + form.format }}
                        </div>
                      </div>
                    </div>
                    <span class="">
                      <small class="text-secondary text-right">
                        Formats: PPT, DOC, EPUB, Video
                      </small>
                    </span>

                    <input
                      id="fileInput"
                      ref="fileInput"
                      type="file"
                      class="invisible"
                      accept=".epub,.pdf,.doc,.ppt,.pptx,.docx,.xlsx,.xls,.mp4,.mp3,.avi,.flv,.mov,.wmv,.m4v"
                      @change="onChange"
                    />
                    <input
                      id="fileInput2"
                      ref="fileInput2"
                      type="file"
                      class="invisible"
                      accept="image/x-png,image/gif,image/jpeg"
                      @change="onChange2"
                    />
                  </div>
                  <div class="col-10">
                    <div class="form-group">
                      <ValidationProviderWrapper :rules="['required']">
                        <label class="" for="title">Book Title</label> <br />
                        <input
                          id="title"
                          v-model="form.name"
                          class="w-100 form-control"
                          type="text"
                          placeholder="Enter Title"
                        />
                      </ValidationProviderWrapper>
                    </div>
                    <div class="mt-2 form-group">
                      <ValidationProviderWrapper :rules="['required']">
                        <label for="title">Authors</label> <br />
                        <input
                          id="title"
                          v-model="form.author"
                          class="w-100 form-control"
                          type="text"
                          placeholder="Enter Author(s)"
                        />
                      </ValidationProviderWrapper>
                    </div>
                    <div class="row mt-2">
                      <div class="col form-group">
                        <ValidationProviderWrapper :rules="['required']">
                          <label class="" for="subject">Subjects</label> <br />
                          <input
                            id="subject"
                            v-model="form.subjects"
                            class="w-100 form-control"
                            type="text"
                            placeholder="Enter Subject(s)"
                          />
                        </ValidationProviderWrapper>
                      </div>
                      <div class="col form-group">
                        <ValidationProviderWrapper :rules="['required']">
                          <label class="" for="grades">Grades</label> <br />
                          <input
                            id="grades"
                            v-model="form.grades"
                            class="w-100 form-control"
                            type="text"
                            placeholder="Enter Grade(s)"
                          />
                        </ValidationProviderWrapper>
                      </div>
                    </div>
                    <div class="mt-2 form-group">
                      <ValidationProviderWrapper :rules="['required']">
                        <label for="description">Description</label> <br />
                        <textarea
                          id="description"
                          v-model="form.description"
                          rows="4"
                          cols="50"
                          class="w-100 form-control"
                          type="text"
                          placeholder="Enter Description"
                        />
                      </ValidationProviderWrapper>
                    </div>
                    <div class="row mt-2">
                      <div class="col form-group">
                        <ValidationProviderWrapper :rules="['required']">
                          <label class="" for="publishers">Publishers</label>
                          <br />
                          <input
                            id="publishers"
                            v-model="form.publishers"
                            class="w-100 form-control"
                            type="text"
                            placeholder="Enter Publishers(s)"
                          />
                        </ValidationProviderWrapper>
                      </div>
                      <div class="col form-group">
                        <ValidationProviderWrapper :rules="['required']">
                          <label class="" for="date">Publishing Date</label>
                          <br />
                          <input
                            id="publishers"
                            v-model="form.publishing_date"
                            class="w-100 form-control"
                            type="text"
                            placeholder="YYYY-MM-DD"
                          />
                          <!-- <v-date-picker
                            v-model="form.publishing_date"
                            :model-config="modelConfig"
                            mode="date"
                          >
                            <template #default="{ togglePopover }">
                              <span @click="togglePopover()">
                                <input
                                  class="form-control"
                                  :placeholder="form.publishing_date"
                                />
                              </span>
                            </template>
                          </v-date-picker> -->
                        </ValidationProviderWrapper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end mt-3">
            <BaseButton>Submit</BaseButton>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Click to upload',
      isLoading: false,
      fileSpinner: false,
      filetoUpload: {},
      fileName: '',
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
      form: {
        name: '',
        subjects: '',
        grades: '',
        description: '',
        publishers: '',
        author: '',
        publishing_date: '',
        thumbnail: '',
        file: '',
        spinner: false,
      },
    }
  },
  async fetch() {
    try {
      const {
        data: { item },
      } = await this.$axios.get(
        `/schools/v2/school_item/${this.$route.params.book_id}/library/`
      )

      this.form = item
      this.form.spinner = false
      // this.form.name = item.name;
      // this.form.thumbnail = item.name;
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    schoolId() {
      return this.$store.state.administration.school.id
    },
    schoolCode() {
      return this.$store.state.administration.school.code
    },
  },
  methods: {
    uploadThumbail() {
      if (this.$refs.fileInput2) {
        const btn = document.querySelector('#fileInput2')
        btn.click()
      }
    },
    async onChange2(e) {
      const file = e.target.files[0]
      if (file.name) {
        console.log(file)

        const fd = new FormData()

        fd.append('file', file)
        fd.append('type', file.name)

        try {
          const {
            data: { data },
          } = await this.$axios.post(
            `schools/v2/school/${this.schoolId}/resource/`,
            fd
          )
          this.form.thumbnail = data.url
        } catch (error) {
          console.error(error)
        }
      }
    },
    uploadFile() {
      if (this.$refs.fileInput) {
        const btn = document.querySelector('#fileInput')
        btn.click()
      }
    },
    async onChange(e) {
      const file = e.target.files[0]
      if (file.name) {
        this.form.spinner = true

        const fd = new FormData()

        this.fileName = file.name

        fd.append('file', file)
        fd.append('type', file.name)

        try {
          const {
            data: { data },
          } = await this.$axios.post(
            `schools/v2/school/${this.schoolId}/resource/`,
            fd
          )
          this.$refs.fileInput.value = null
          console.log(this.form.spinner)
          this.form.spinner = false

          this.form.file = data.url
        } catch (error) {
          console.error(error)
        }
      }
    },

    async submitForm() {
      console.log(this.form)
      const submit = this.form
      delete submit.spinner
      console.log('for submit', submit)

      try {
        await this.$axios.put(
          `schools/v2/school_item/${this.form.id}/library/`,
          submit
        )

        this.$router.go(-1)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped>
label {
  margin-bottom: 0px;
}
.blue-dashed {
  max-width: 10rem;
  height: 6rem;
  background-color: #ecf7ff;
  border-style: dotted;
  cursor: pointer;

  border-color: #80b4d9;
}
</style>
