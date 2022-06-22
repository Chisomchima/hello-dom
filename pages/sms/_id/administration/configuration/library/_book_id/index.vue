<template>
  <div>
    <div class="mb-3 d-flex justify-content-end">
      <!-- <BackwardNavigation text="Library" /> -->
      <div>
        <b-button class="bg-danger" @click="deleteLibraryItem">
          <Icon class="" icon="ci:trash-full" :style="{ fontSize: '1.5rem' }" />
        </b-button>
        <b-button class="bg-primary" @click="editLibraryItem"
          >Edit Library Item</b-button
        >
      </div>
    </div>
    <div v-if="readItem" class="border rounded">
      <div class="d-flex justify-content-end">
        <b-button @click="readItem = false" class="bg-danger">
          <Icon icon="akar-icons:circle-x" />
        </b-button>
      </div>

      <WebViewer :url="data.file"></WebViewer>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="row p-lg-5">
          <div class="col-xl-11">
            <div class="d-md-flex d-lg-block d-xl-flex">
              <div class="block mr-4 mb-3">
                <div
                  class="
                    mb-4
                    d-flex
                    flex-column
                    align-items-center
                    justify-content-center
                  "
                  :style="{
                    height: '14.5rem',
                    width: '10rem',
                    transition: 'transform 0.3s ease-out',

                    'background-image': `url('${data.thumbnail}')`,
                    backgroundColor: `${data.thumbnail ? '' : '#6A9ABF'}`,

                    'background-repeat': 'no-repeat, repeat',
                    'background-size': '10rem 15rem',
                    'background-position': '50% 10%',
                  }"
                >
                  <div v-if="!data.thumbnail">no thumbnail</div>
                </div>
                <div style="max-width: 147.17px">
                  <button
                    class="btn btn-primary btn-primary-2 btn-block py-2 mb-2"
                    @click="startReading()"
                  >
                    Read
                  </button>
                </div>
              </div>
              <div class="ml-5">
                <div
                  class="fs-24 font-weight-bold line-height-100p text-dark mb-4"
                >
                  {{ data.name }}
                </div>
                <div class="mb-3">
                  <div class="fs-14 text-light">Author(s):</div>
                  <div>
                    <span
                      v-for="(author, index) in data.author"
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
                      >{{
                        author
                          ? author
                              .replaceAll("'", '')
                              .replaceAll('[', '')
                              .replaceAll(']', '')
                          : ''
                      }}</span
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <div class="fs-14 text-light">Description:</div>
                  <div class="fs-14 text-dark">
                    {{ data.description }}
                  </div>
                </div>
                <div class="mb-3">
                  <div class="fs-14 text-light">Subject(s):</div>
                  <div>
                    <span
                      v-for="(subject, index) in data.subjects"
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
                      }}</span
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <div class="fs-14 text-light">Publisher(s):</div>
                  <div>
                    <span
                      v-for="(publisher, index) in data.publishers"
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
                      >{{
                        publisher
                          ? publisher
                              .replaceAll("'", '')
                              .replaceAll('[', '')
                              .replaceAll(']', '')
                          : '__'
                      }}</span
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <div class="fs-14 text-light">Publishing Date:</div>
                  <div class="fs-14 text-dark">{{ data.publishing_date }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalWrapper
      id="delete-library-item"
      title="Delete"
      submitTitle="Delete"
      @ok="deleteItem"
    >
      Are you sure you want to delete this library material?
    </ModalWrapper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      readItem: false,
    }
  },
  async fetch() {
    const { item } = await this.$axios.$get(
      `/schools/v2/school_item/${this.$route.params.book_id}/library/`
    )
    const data = item
    data.author = data.author.split(',')
    data.grades = data.grades.split(',')
    data.publishers = data.publishers.split(',')
    data.subjects = data.subjects.split(',')
    this.data = data

    // return store.dispatch('fetchSms', route.params.id)
  },
  methods: {
    startReading() {
      this.readItem = true

      console.log(this.book)
    },
    async deleteItem() {
      try {
        await this.$axios.delete(
          `schools/v2/school_item/${this.data.id}/library/`
        )
        this.$router.go(-1)
        this.$bvModal.hide('delete-library-item')
      } catch (error) {
        console.error(error)
      }
    },
    deleteLibraryItem() {
      this.$bvModal.show('delete-library-item')
    },
    editLibraryItem() {
      this.$router.push(`${this.data.id}/edit`)
    },
  },
}
</script>

<style lang="scss" scoped></style>
