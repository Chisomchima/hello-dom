<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Class Library</div>
      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <BaseButton class="py-2 px-3" @click="showAddModal">
            <b-icon icon="calendar-plus"></b-icon> Add Item to class
          </BaseButton>
        </div>
      </div>
    </div>

    <ModalWrapper
      id="delete-item-modal"
      title="Remove class Item"
      buttonColor="bg-danger"
      submit-title="Remove"
      @ok="removeItemFromClass"
    >
      <div class="">
        Are you sure you want to remove this item from this class?
      </div>
    </ModalWrapper>
    <ModalWrapper
      id="AddSchoolItems"
      title="Add Item to class"
      submit-title="Add"
      @ok="addItemToClass"
      @hide="clearForm"
    >
      <div class="">
        <form class="form-group">
          <label for="item"> Library Item</label>
          <v-select
            v-model="newItem.libraryItemId"
            class="style-chooser1"
            placeholder="Library Item"
            label="name"
            :reduce="(option) => option.id"
            :options="AllSchoolItems"
          ></v-select>
          <label for="note" class="mt-3"> Note </label>
          <textarea
            id="note"
            v-model="newItem.note"
            class="form-control"
            rows="4"
            cols="50"
            type="text"
          />
        </form>
      </div>
    </ModalWrapper>
    <UtilsFilterComponent visual="grid" @search-input="filter">
      <template #default="{ visualization }">
        <Table
          v-if="visualization === 'list'"
          :items="filteredData.map((e) => ({ moreActions: 's', ...e }))"
          :fields="fields"
          :pages="pages"
          :per-page="page_size"
          @page-changed="refresh"
          @row-clicked="onRowClicked"
        >
          <template #subjects="{ data }">
            <span>
              {{
                data.item.subjects
                  ? data.item.subjects
                      .replaceAll("'", '')
                      .replaceAll('[', '')
                      .replaceAll(']', '')
                  : ''
              }}</span
            >
          </template>
          <template #grades="{ data }">
            <span>
              {{
                data.item.grades
                  ? data.item.grades
                      .replaceAll("'", '')
                      .replaceAll('[', '')
                      .replaceAll(']', '')
                  : ''
              }}</span
            >
          </template>
          <template #author="{ data }">
            <span>
              {{
                data.item.author
                  ? data.item.author
                      .replaceAll("'", '')
                      .replaceAll('[', '')
                      .replaceAll(']', '')
                  : ''
              }}</span
            >
          </template>
          <template #moreActions="{ data }">
            <b-button class="bg-danger" @click="DeleteItem(data)">
              Remove
            </b-button>
            <!-- 
            <b-dropdown
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                <Icon icon="bi:three-dots-vertical"></Icon>
              </template>
              <b-dropdown-item @click="DeleteItem(data)">
                <span class="text-danger"> Remove Item </span>
              </b-dropdown-item>
            </b-dropdown> -->
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
                    placement="right"
                    theme="info-custom"
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
                      <div class="">
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
                              .replaceAll("'", '')
                              .replaceAll('[', '')
                              .replaceAll(']', '')
                          }}
                        </div>
                        <p class="mb-0">Description: {{ book.description }}</p>
                        <p class="mb-0">Format: {{ book.format }}</p>
                        <p class="mb-0">
                          Subject:
                          {{
                            book.subjects
                              .replaceAll("'", '')
                              .replaceAll('[', '')
                              .replaceAll(']', '')
                          }}
                        </p>
                        <p class="mb-0">
                          Grades(s):
                          {{
                            book.grades
                              .replaceAll("'", '')
                              .replaceAll('[', '')
                              .replaceAll(']', '')
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
      </template>
    </UtilsFilterComponent>
  </div>
</template>

<script>
import difference from 'lodash'
export default {
  data() {
    return {
      totalRows: 0,
      page: 1,
      itemtoDelete: '',
      AllSchoolItems: [],
      pageSize: 12,
      pages: '',
      newItem: {
        note: '',
        libraryItemId: '',
      },
      search: {
        name: '',
        fileformat: '',
        author: '',
        grades: '',
        subjects: '',
        publishers: '',
        description: '',
      },
      currentPage: '',
      data: [],
      fullData: [],
      page_size: 8,
      fields: [
        { key: 'name', label: 'Book Title', sortable: false },
        { key: 'author', label: 'Author(s)', sortable: true },
        { key: 'format', sortable: true },
        { key: 'subjects', sortable: true },
        { key: 'grades', sortable: true },
        { key: 'moreActions', label: '', sortable: false },
      ],
    }
  },
  async fetch() {
    try {
      const { data } = await this.$axios.get(
        `/schools/v3/library/items/?class_id=${this.$route.params.class}`
        // `/lms/class/${this.$route.params.class}/library/items/?type=class&page=${this.page}&page_size=${this.pageSize}&fileformat=${this.search.fileformat}&name=${this.search.name}&author=${this.search.author}&grades=${this.search.grades}&subjects=${this.search.subjects}&publishers=${this.search.publishers}&description=${this.search.description}`
      )
      this.pages = data.pages
      this.fullData = data.data
      this.data = data.data
    } catch {
      console.log('error')
    }
  },
  computed: {
    filteredData() {
      if (this.search.name) {
        return this.data.filter((item) => {
          return this.search.name
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
    clearForm() {
      this.newItem = {}
    },
    async removeItemFromClass() {
      try {
        await this.$axios.post(
          `/schools/v3/library/class/${this.$route.params.class}/class_item/${this.itemtoDelete}/remove/`
        )
        this.$bvModal.hide('delete-item-modal')
        this.$fetch()
      } catch (error) {
        console.error(error)
      }
    },
    DeleteItem(e) {
      this.itemtoDelete = e.item.class_library_id
      this.$bvModal.show('delete-item-modal')
    },
    showAddModal() {
      this.getAllSchoolItems()
      this.$bvModal.show('AddSchoolItems')
    },
    async addItemToClass() {
      try {
        const fd = new FormData()
        fd.append('note', this.newItem.note)
        await this.$axios.post(
          `/schools/v3/library/class/${this.$route.params.class}/school_item/${this.newItem.libraryItemId}/add/`,
          fd
        )
        this.newItem = {}
        this.$bvModal.hide('AddSchoolItems')

        this.$fetch()
      } catch (error) {
        console.error(error)
      }
    },
    async getAllSchoolItems() {
      const school = this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )
      try {
        const data = await this.$axios.$get(
          `/schools/v2/school/${school.id}/library/?page=1&page_size=999&name=`
        )

        // filter out books that are already in the class
        this.AllSchoolItems = data.data.filter((object1) => {
          return !this.data.some((object2) => {
            return object1.id === object2.id
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
    refresh(page) {
      this.page = page
      this.$fetch()
    },
    filter(e) {
      this.search.name = e
      this.$fetch()
    },
    onRowClicked(e) {
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
.style-chooser1 >>> .vs__search::placeholder,
.style-chooser1 >>> .vs__dropdown-toggle,
.style-chooser1 >>> .vs__dropdown-menu {
  background: #fbfdfe;
  color: #abb4bc;
}

.style-chooser1 >>> .vs__clear,
.style-chooser1 >>> .vs__open-indicator {
  fill: #abb4bc;
}
</style>
