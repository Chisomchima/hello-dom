<template>
  <div>
    <!-- <BackwardNavigation /> -->
    <div v-if="readItem" class="border rounded">
      <div class="d-flex justify-content-end">
        <b-button class="bg-danger" @click="readItem = false">
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
                    'background-size': '10rem 14.5rem',
                    'background-position': '50% 10%',
                  }"
                >
                  <div v-if="!data.thumbnail">no thumbnail</div>
                </div>
                <br />
                <div style="max-width: 147.17px">
                  <button
                    class="btn btn-primary btn-primary-2 btn-block py-2 mb-2"
                    @click="startReading()"
                  >
                    Read
                  </button>

                  <!-- <button class="btn btn-borderless-primary-2 btn-block py-2">
                    Add to Favourite
                  </button>
                  <button
                    class="btn btn-borderless-danger border-0 btn-block py-2"
                  >
                    Remove Favourite
                  </button> -->
                </div>
              </div>
              <div class="">
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
                      >{{ author }}</span
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
                      {{ subject }}
                    </span>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="fs-14 text-light">Publisher:</div>
                  <div>
                    <span
                      v-for="(publisher, index) in data.publishers"
                      :key="index"
                      class="
                        badge
                        fs-12
                        text-primary
                        alert-primary
                        font-weight-normal
                        border-0
                        py-1
                      "
                    >
                      {{ publisher }}
                    </span>
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
  </div>
</template>

<script>
export default {
  async asyncData({ route, $axios }) {
    const { item } = await $axios.$get(
      `/schools/v2/school_item/${route.params.book_id}/library/`
    )
    const data = item
    data.author = data.author.split(',')
    data.grades = data.grades.split(',')
    data.publishers = data.publishers.split(',')
    data.subjects = data.subjects.split(',')
    return {
      data,
    }
    // return store.dispatch('fetchSms', route.params.id)
  },
  data() {
    return {
      readItem: false,
    }
  },
  methods: {
    startReading() {
      this.readItem = true

      console.log(this.book)
    },
  },
}
</script>

<style lang="scss" scoped></style>
