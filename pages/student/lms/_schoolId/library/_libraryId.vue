<template>
  <div class="conatiner">
    <div v-if="readItem" class="border rounded">
      <div class="d-flex justify-content-end">
        <b-button class="bg-danger" @click="readItem = false">
          <Icon icon="akar-icons:circle-x" />
        </b-button>
      </div>

      <WebViewer :url="book.file"></WebViewer>
    </div>

    <div v-if="book" class="card">
      <div class="card-body">
        <div class="row p-lg-5">
          <div class="col-xl-11">
            <div class="d-md-flex d-lg-block d-xl-flex">
              <div class="d-sm-flex d-md-block d-lg-flex d-xl-block mr-4 mb-3">
                <div
                  class="mb-4"
                  :style="{
                    height: '14rem',
                    width: '10rem',
                    transition: 'transform 0.3s ease-out',

                    'background-image': `url('${book.thumbnail}')`,

                    'background-repeat': 'no-repeat, repeat',
                    'background-size': '10rem 14rem',
                    'background-position': '50% 10%',
                  }"
                ></div>

                <div style="max-width: 147.17px">
                  <!-- <a :href="book.file" target="_blank" rel="noopener noreferrer"> -->
                  <button
                    class="btn btn-primary btn-primary-2 btn-block py-2 mb-2"
                    @click="startReading(book)"
                  >
                    Read
                  </button>
                  <!-- </a> -->
                  <template v-show="book.id">
                    <button
                      v-if="!book.is_favourite"
                      :disabled="favoriteSpinner"
                      class="btn btn-borderless-primary-2 btn-block py-2"
                      @click="addToFavourite(book)"
                    >
                      <span v-if="favoriteSpinner">
                        <b-spinner
                          style="width: 1rem; height: 1rem"
                          label="Large Spinner"
                          variant="primary"
                        ></b-spinner>
                      </span>
                      <span v-else style="font-size: 0.9rem">
                        Add to Favourite
                      </span>
                    </button>
                    <button
                      v-else
                      :disabled="favoriteSpinner"
                      class="btn btn-borderless-danger border-0 btn-block py-2"
                      @click="removeFromFavourite(book)"
                    >
                      <span v-if="favoriteSpinner">
                        <b-spinner
                          style="width: 1rem; height: 1rem"
                          label="Large Spinner"
                          variant="primary"
                        ></b-spinner>
                      </span>
                      <span v-else style="font-size: 0.9rem">
                        Remove Favourite
                      </span>
                    </button>
                  </template>
                </div>
              </div>
              <div class="ml-5">
                <div
                  class="fs-24 font-weight-bold line-height-100p text-dark mb-4"
                >
                  Amara the Brave
                </div>
                <div class="mb-3">
                  <div class="fs-14 text-light">Author(s):</div>
                  <div>
                    <span
                      v-for="(author, index) in book.author"
                      :key="index"
                      class="
                        badge
                        mr-2
                        fs-12
                        text-primary
                        alert-primary
                        font-weight-normal
                        border-0
                        py-1
                      "
                    >
                      {{
                        author
                          ? author
                              .replaceAll("'", '')
                              .replaceAll('[', '')
                              .replaceAll(']', '')
                          : ''
                      }}
                    </span>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="fs-14 text-light">Description:</div>
                  <div class="fs-14 text-dark">
                    {{ book.description }}
                  </div>
                </div>
                <div class="mb-3">
                  <div class="fs-14 text-light">Subject(s):</div>
                  <div>
                    <span
                      v-for="(subject, index) in book.subjects"
                      :key="index"
                      class="
                        badge
                        fs-12
                        mr-2
                        text-primary
                        alert-primary
                        font-weight-normal
                        border-0
                        py-1
                      "
                    >
                      {{
                        subject
                          ? subject
                              .replaceAll("'", '')
                              .replaceAll('[', '')
                              .replaceAll(']', '')
                          : ''
                      }}
                    </span>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="fs-14 text-light">Publisher:</div>
                  <div>
                    <span
                      v-for="(publisher, index) in book.publishers"
                      :key="index"
                      class="
                        badge
                        fs-12
                        mr-2
                        text-primary
                        alert-primary
                        font-weight-normal
                        border-0
                        py-1
                      "
                    >
                      {{
                        publisher
                          ? publisher
                              .replaceAll("'", '')
                              .replaceAll('[', '')
                              .replaceAll(']', '')
                          : ''
                      }}
                    </span>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="fs-14 text-light">Format:</div>
                  <div>
                    <span
                      class="
                        badge
                        fs-12
                        text-primary
                        alert-primary
                        font-weight-normal
                        border-0
                        py-1
                      "
                      >{{ book.format }}</span
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <div class="fs-14 text-light">Publishing Date:</div>
                  <div class="fs-14 text-dark">
                    {{ book.publishing_date }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <UtilsEmptyState text="This item isnt in your class." />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LibraryDetail',
  data() {
    return {
      book: {},
      books: [1, 2, 3],
      favoriteSpinner: false,
      isFavourite: false,
      readItem: false,
    }
  },

  // layout: 'authWithoutTopbar',
  async fetch() {
    const libraryId = this.$route.params.libraryId
    try {
      const {
        data: { data },
      } = await this.$axios.get(`/lms/library/${libraryId}/item/`)

      data.author = data.author.split(',')
      data.grades = data.grades.split(',')
      data.publishers = data.publishers.split(',')
      data.subjects = data.subjects.split(',')
      this.book = data
      this.favoriteSpinner = false
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    student() {
      return this.$store.state.student.studentProfile
    },
  },
  methods: {
    async addToFavourite(e) {
      try {
        this.favoriteSpinner = true
        await this.$axios.get(
          `/lms/library/${e.id}/item/student/${this.student.admission_id}/favourite/add/`
        )

        this.$fetch()
      } catch (error) {
        console.error(error)
      }
    },
    async removeFromFavourite(e) {
      try {
        this.favoriteSpinner = true
        await this.$axios.delete(
          `/lms/library/${e.id}/item/student/${this.student.admission_id}/favourite/remove/`
        )

        this.$fetch()
      } catch (error) {
        console.error(error)
      }
    },
    startReading() {
      this.readItem = true
    },
  },
}
</script>
