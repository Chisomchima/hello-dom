<template>
  <div id="all" class="conatiner">
    <div class="page-heading mb-4" @click="showpre = !showpre">Library</div>
    <!-- <pre v-show="showpre">{{ this.alldata[0] }}</pre> -->

    <div id="allBooks" class="card">
      <div id="conatiner" class="card-body">
        <LibraryBanner @filter="handleFilter" />
        <LibrarySearch :visible="visible" class="mt-3" @search="handleSearch" />

        <LibraryDetailsFilter @filter="handleFilter" />

        <LibraryBooksList
          v-if="allBooks.length"
          :books="allBooks"
          :enable-filters="enableFilters"
          :filter-name="filterName"
          :pages="pages"
          :page-size="pageSize"
          :group-name="groupName"
          @pagination-change="changePage"
        />
        <UtilsEmptyState
          v-else
          text="No Items to show ."
          style="height: 55rem"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Library',
  layout: 'authWithoutTopbar',
  data() {
    return {
      visible: false,
      groupName: 'format',
      libraryBooks: [],
      libraryType: 'school',
      currentPage: 1,
      filterName: 'All Books',
      totalRows: 0,
      page: 1,

      pageSize: 12,
      pages: '',
      search: {
        name: '',
        fileformat: '',
        author: '',
        grades: '',
        subjects: '',
        publishers: '',
        description: '',
      },
      alldata: [],
      showpre: false,
      enableFilters: false,
    }
  },
  async fetch() {
    const studentProfile = await this.$store.state.student.studentProfile
    const studentClassId = studentProfile.classes[0].id

    try {
      const { data } = await this.$axios.get(
        `/lms/class/${studentClassId}/library/items/?type=${this.libraryType}&page=${this.page}&page_size=${this.pageSize}&fileformat=${this.search.fileformat}&name=${this.search.name}&author=${this.search.author}&grades=${this.search.grades}&subjects=${this.search.subjects}&publishers=${this.search.publishers}&description=${this.search.description}`
      )
      this.libraryBooks = data.data
      this.alldata = data.data
      this.pages = data.pages
    } catch (error) {
      console.log(error)
    }
    // this.scrollToBottom()
  },
  computed: {
    allBooks() {
      if (this.search.name) {
        return this.libraryBooks.filter((item) => {
          return this.search.name
            .toLowerCase()
            .split('')
            .every(
              (v) =>
                item.name.toLowerCase().includes(v) ||
                item.author.toLowerCase().includes(v)
            )
        })
      } else {
        return this.libraryBooks
      }
    },
    studentProfile() {
      return this.$store.state.student.studentProfile
    },
  },

  methods: {
    scrollToBottom() {
      const objDiv = document.getElementById('conatiner')
      const all = document.getElementById('all')
      const view = document.getElementById('books3')
      console.log(view)
      // objDiv.scrollTop = 800
      view.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // all.scrollTop = 800
    },
    changePage(e) {
      this.page = e
      this.$fetch()
    },
    handleSearch(p, e) {
      switch (p) {
        case 'name':
          this.search.name = e
          break
        case 'author':
          this.search.author = e
          break
        case 'grade':
          this.search.grades = e
          break
        case 'subject':
          this.search.subjects = e
          break
        case 'description':
          this.search.description = e
          break
        case 'publisher':
          this.search.publishers = e
          break
        default:
          this.$fetch()

        // code block
      }
      this.$fetch()
    },
    async handleFilter(e) {
      switch (e) {
        case 'all':
          this.filterName = 'All Books'
          this.libraryType = 'school'

          this.enableFilters = false
          this.$fetch()

          break
        case 'class':
          this.filterName = 'Class Books'
          this.libraryType = 'class'
          this.enableFilters = false

          this.$fetch()
          // code block

          break
        case 'favourite':
          try {
            const {
              data: { data },
            } = await this.$axios.get(
              `/lms/library/items/student/${this.studentProfile.admission_id}/favourites/?page=1&page_size=999`
            )
            this.libraryBooks = data.results
          } catch (error) {
            console.error(error)
          } finally {
            this.filterName = 'Favourites'

            this.enableFilters = false
            this.scrollToBottom()
          }
          // code block

          break
        case 'subject':
          this.filterName = 'Subjects'
          this.groupName = 'subjects'

          this.enableFilters = 'subject'

          break
        case 'format':
          this.filterName = 'Formats'
          this.groupName = 'format'

          this.enableFilters = 'format'

          break
        default:
        // code block
      }
    },
  },
}
</script>
