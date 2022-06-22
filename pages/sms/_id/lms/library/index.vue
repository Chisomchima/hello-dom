<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Library Management</div>
      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <BaseButton class="py-2 px-3" @click="$router.push('library/add')"
            ><b-icon icon="calendar-plus"></b-icon> Add to Library</BaseButton
          >
        </div>
      </div>
    </div>

    <UtilsFilterComponent visual="grid" @search-input="filter">
      <template #default="{ visualization }">
        <Table
          v-if="visualization === 'list'"
          :items="filteredData"
          :fields="fields"
          :pages="pages"
          :per-page="page_size"
          @page-changed="refresh"
          @row-clicked="onRowClicked"
        >
          <template #grades="{ data }">
            <div class="text-capitalize">
              {{
                data.item.grades
                  ? data.item.grades
                      .replaceAll("'", '')
                      .replaceAll('[', '')
                      .replaceAll(']', '')
                  : ''
              }}
            </div>
          </template>
          <template #subjects="{ data }">
            <div class="text-capitalize">
              {{
                data.item.subjects
                  ? data.item.subjects
                      .replaceAll("'", '')
                      .replaceAll('[', '')
                      .replaceAll(']', '')
                  : ''
              }}
            </div>
          </template>
          <template #format="{ data }">
            <div class="text-uppercase">{{ data.item.format }}</div>
          </template>
          <template #author="{ data }">
            <div class="text-capitalize">
              {{
                data.item.author
                  ? data.item.author
                      .replaceAll("'", '')
                      .replaceAll('[', '')
                      .replaceAll(']', '')
                  : ''
              }}
            </div>
          </template>
        </Table>

        <div v-else>
          <div class="row">
            <div
              v-for="(book, index) in filteredData"
              :key="index"
              class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
            >
              <div
                class="
                  pt-2
                  pl-2
                  new-libray-container-mine
                  d-flex
                  align-items-start
                  flex-column
                  rounded
                  text-white
                "
                :style="{
                  position: 'relative',

                  'background-image': `url('${book.thumbnail}')`,

                  'background-repeat': 'no-repeat, repeat',
                  'background-size': '10rem 15rem',
                  'background-position': '50% 10%',
                }"
                @click="onRowClicked(book)"
              >
                <div class="ml-auto">
                  <VTooltip
                    theme="info-custom"
                    placement="right"
                    :triggers="['hover']"
                    :skidding="-32"
                    :arrow-padding="8"
                  >
                    <button class="info-icon border-0 bg-transparent text-dark">
                      <span
                        class="iconify"
                        data-inline="false"
                        data-icon="foundation:info"
                      ></span>
                    </button>

                    <template #popper>
                      <div
                        class=""
                        style="max-width: 20rem; word-wrap: break-word"
                      >
                        <h5>{{ book.name }}</h5>
                        <div
                          class="mt-auto d-flex justify-content-start"
                          :style="{
                            'font-weight': 'normal',
                            'font-size': '0.8rem',
                            'line-height': '150%',
                            color: 'rgba(255, 255, 255, 0.8) ',
                          }"
                        >
                          by
                          {{
                            book.author
                              ? book.author
                                  .replaceAll("'", '')
                                  .replaceAll('[', '')
                                  .replaceAll(']', '')
                              : ''
                          }}
                        </div>
                        <p class="mb-0">Description: {{ book.description }}</p>
                        <p class="mb-0">Format: {{ book.format }}</p>
                        <p class="mb-0">
                          Subject:
                          {{
                            book.subjects
                              ? book.subjects
                                  .replaceAll("'", '')
                                  .replaceAll('[', '')
                                  .replaceAll(']', '')
                              : ''
                          }}
                        </p>
                        <p class="mb-0">
                          Grades(s):
                          {{
                            book.grades
                              ? book.grades
                                  .replaceAll("'", '')
                                  .replaceAll('[', '')
                                  .replaceAll(']', '')
                              : ''
                          }}
                        </p>
                      </div>
                    </template>
                  </VTooltip>
                </div>
                <div
                  v-if="!book.thumbnail"
                  class="d-flex justify-content-start"
                  :style="{}"
                >
                  <span class="text-dark"> Name: </span>
                  <br />
                  <span class="text-truncater-custom ml-2">
                    {{ book.name }}
                  </span>
                </div>
                <div
                  v-if="!book.thumbnail"
                  class="mt-auto mb-4 d-flex justify-content-start"
                  :style="{}"
                >
                  <span class="text-dark"> By: </span>
                  <span class="text-truncater-custom ml-2">
                    {{
                      book.author
                        ? book.author
                            .replaceAll("'", '')
                            .replaceAll('[', '')
                            .replaceAll(']', '')
                        : '__'
                    }}
                  </span>
                </div>
                <div
                  class="px-2 ml-auto text-uppercase"
                  :style="{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    'background-color': 'rgb(229, 135, 77)',
                  }"
                >
                  {{ book.format.slice(1) }}
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="page_size"
              aria-controls="my-table"
              @change="refresh"
            ></b-pagination>
          </div>
        </div>

        <!-- <div v-else class="row">
          <div
            v-for="(value, index) in data"
            :key="index"
            class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
          >
            <UtilsGridViewCard
              :data="value"
              :display-key="['name', 'author', 'subjects', 'grades']"
            ></UtilsGridViewCard>
          </div>
        </div> -->
      </template>
    </UtilsFilterComponent>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      currentPage: '',
      page: 1,
      totalRows: 0,
      pages: '',
      data: [],
      fullData: [],
      page_size: 8,
      fields: [
        { key: 'name', label: 'Book Title', sortable: false },
        { key: 'author', label: 'Author(s)', sortable: true },
        { key: 'format', sortable: true },
        { key: 'subjects', sortable: true },
        { key: 'grades', sortable: true },
      ],
    }
  },
  async fetch() {
    const school = this.$store.getters['school/getSchoolByCode'](
      this.$route.params.id
    )
    console.log('store result', school)
    const data = await this.$axios.$get(
      `/schools/v2/school/${school.id}/library/?page=${this.page}&page_size=${this.page_size}&name=${this.search}`
    )
    this.pages = data.pages
    this.fullData = data.data
    this.data = data.data
    console.log('full datass', data)
  },
  computed: {
    filteredData() {
      if (this.search) {
        return this.data.filter((item) => {
          return this.search
            .toLowerCase()
            .split('')
            .every(
              (v) =>
                item.name.toLowerCase().includes(v) ||
                item.author.toLowerCase().includes(v) ||
                item.subjects.toLowerCase().includes(v)
            )
        })
      } else {
        return this.data
      }
    },
    // school() {
    //   return this.$store.state.administration.school.id;
    //   return;
    // },
  },
  watch: {
    pages() {
      this.totalRows = this.page_size * this.pages
    },
  },
  mounted() {
    this.totalRows = this.page_size * this.pages
  },
  methods: {
    refresh(page) {
      this.page = page
      this.$fetch()
    },
    filter(e) {
      this.search = e
      this.$fetch()
    },
    onRowClicked(e) {
      console.log(e)
      this.$router.push({
        name: 'sms-id-lms-library-book_id',
        params: { book_id: e.id, id: this.$route.params.id },
        query: { _name: `${e.name}` },
      })
    },
  },
}
</script>

<style scoped>
.new-libray-container-mine {
  cursor: pointer;
  width: 9.4rem;
  min-height: 15rem;
  max-height: 20rem;
  box-shadow: 0px 15px 50px rgb(82 20 24 / 5%);
  /*  border: 3px solid #8ebfe4; */
  background: center no-repeat #6b9abf;
}
</style>
