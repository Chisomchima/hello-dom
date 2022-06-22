import { uniq, union } from 'lodash'
// import difference from 'lodash'

export default {
  data() {
    return {
      selectedBook: {},
      allSchoolBooks: [],
      noFooter: false,
      visibleSearch: false,
      modalPage: 'showOptions',
      subjects: [],
      publishers: [],

      gradeLevels: [{ name: 'loading...' }],
      allSubjects: ['loading...'],
      msg: 'Click to upload',
      isLoading: false,
      fileSpinner: false,
      filetoUpload: { index: '', thumbnail: '' },
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
      books: [
        {
          name: '',
          subjects: '',
          grades: '',
          description: '',
          publishers: '',
          author: '',
          publishing_date: '',
          thumbnail: '',
          fileName: '',
          file: '',
          spinner: false,
          thumbnailSpinner: false,
        },
      ],
      showAddForm: false,
      totalRows: 0,
      page: 1,
      itemtoDelete: '',
      AllSchoolItems: [],
      pageSize: 12,
      pages: '',
      newItem: {
        note: '',
        libraryItemId: [],
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
        // { key: 'subjects', sortable: true },
        // { key: 'grades', sortable: true },
        { key: 'description', sortable: true },
        { key: 'moreActions', label: '', sortable: false },
      ],
    }
  },
  async fetch() {
    console.log('routes')
    try {
      const { data } = await this.$axios.get(
        `/schools/v3/class_subject/${this.$route.params.subject}/resources/?page=${this.page}&page_size=${this.pageSize}&fileformat=${this.search.fileformat}&name=${this.search.name}&author=${this.search.author}&publishers=${this.search.publishers}&description=${this.search.description}`
        // `/schools/v3/library/items/?class_id=${this.content.class_id}`
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
    schoolId() {
      return this.$store.state.administration.school.id
    },
    schoolCode() {
      return this.$store.state.administration.school.code
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
    modalPage: {
      handler(newValue) {
        console.log('modal value', newValue)
        if (newValue === 'showOptions') {
          this.noFooter = true
        } else if (newValue === 'newResource') {
          this.noFooter = true
          this.getAllSchoolItems()
        } else if (newValue === 'librarydropdown') {
          this.noFooter = false
        } else if (newValue === 'libraryTable') {
          this.noFooter = true
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.totalRows = this.page_size * this.pages
  },
  methods: {
    handleVisible(e) {
      // this.visibleSearch = true
      console.log(e)
    },
    hideSearch() {
      this.visibleSearch = false
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
    async getSubjects(e, bookIndex) {
      console.log('sas', e)
      this.subjects = []
      const lastItem = e.length

      const fetchId = e[lastItem - 1]
      console.log(fetchId)

      // this.books[bookIndex].subjects = []
      const schoolId = await this.$store.state.administration.school.id
      const getInputSubject = await this.$axios.$get(
        `/slate-admin/school/${schoolId}/subjects/?grade__exact=${fetchId.id}&paginate=false`
      )

      this.subjects = union(
        this.subjects,
        uniq(
          getInputSubject.data.map((subject) => subject).map((sub) => sub.name)
        )
      )
    },
    uploadThumbail(i) {
      this.filetoUpload.thumbnail = i
      if (this.$refs.fileInput2) {
        const btn = document.querySelector('#fileInput2')
        btn.click()
      }
    },
    async onChange2(e) {
      const i = this.filetoUpload.thumbnail
      console.log(i)
      this.books[i].thumbnailSpinner = true
      const file = e.target.files[0]
      if (file.name) {
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

          const i = this.filetoUpload.thumbnail
          // stop spinner
          this.books[i].thumbnailSpinner = false
          // put image into thumbnail
          this.books[i].thumbnail = data.url
          // empty input value so if can reupload again
          this.$refs.fileInput2.value = null
        } catch (error) {
          console.error(error)
        }
      }
    },
    uploadFile(i) {
      this.filetoUpload.index = i

      if (this.$refs.fileInput) {
        const btn = document.querySelector('#fileInput')
        btn.click()
      }
    },
    async onChange(e) {
      this.fileSpinner = true
      const i = this.filetoUpload.index
      this.books[i].spinner = true
      const file = e.target.files[0]
      if (file.name) {
        const fd = new FormData()
        const i = this.filetoUpload.index

        this.books[i].fileName = file.name

        fd.append('file', file)
        fd.append('type', file.name)

        try {
          const {
            data: { data },
          } = await this.$axios.post(
            `schools/v2/school/${this.schoolId}/resource/`,
            fd
          )
          const i = this.filetoUpload.index
          this.books[i].file = data.url
          this.books[i].spinner = false
          this.$refs.fileInput.value = null
          this.fileSpinner = false
        } catch (error) {
          console.error(error)
        }
      }
    },

    addItem() {
      this.books.push({
        name: '',
        subjects: '',
        grades: '',
        description: '',
        publishers: '',
        author: '',
        publishing_date: '',
        thumbnail: '',
        fileName: '',
        file: '',
        spinner: false,
        thumbnailSpinner: false,
      })
    },
    handleRefresh() {
      this.$bvModal.hide('AddSchoolItems')

      this.$fetch()
    },
    async submitForm() {
      // remove spinners and othe ui additions

      try {
        const submit = this.books.map(
          ({ fileName, thumbnailSpinner, spinner, ...book }) => {
            return book
          }
        )
        // remove the grade Id since its only the name needed for submission
        // the api expects publishers to be a comma seperated
        //  string and grades to be an array of names
        submit.forEach((e) => {
          console.log(e.grades)
          if (Array.isArray(e.publishers)) {
            e.publishers = e.publishers.join(',')
          }
        })
        await this.$axios.post(
          // `/schools/v3/class_subject/${this.$route.params.subject}/resources/`,
          `/schools/v2/school/${this.schoolId}/library/`,
          {
            data: submit,
          }
        )
        console.log('what was submitted', submit)
        this.$emit('submit', submit)

        this.$emit('toDropDown')
        console.log('what was library item', this.newItem.libraryItemId)

        // this.showAddForm = false
        this.$fetch()
      } catch (error) {
        console.error(error)
      }
    },
    handleUnshift(submit) {
      console.log('new methods', submit)
      submit.forEach((book) => {
        this.AllSchoolItems.unshift(book)
        this.newItem.libraryItemId.push(book)
      })
    },
    clearForm() {
      this.newItem = {}
      this.AllSchoolItems = []
      this.newItem.libraryItemId = []
    },
    async removeItemFromClass() {
      try {
        await this.$axios.delete(
          `schools/v3/class_subject_resource/${this.itemtoDelete}/details/`
          //   `/schools/v3/library/class/${this.$route.params.class}/class_item/${this.itemtoDelete}/remove/`
        )
        this.$bvModal.hide('delete-item-modal')
        this.$fetch()
      } catch (error) {
        console.error(error)
      }
    },
    DeleteItem(e) {
      console.log(e)
      this.itemtoDelete = e.item.id
      this.$bvModal.show('delete-item-modal')
    },
    async showAddModal() {
      this.$bvModal.show('AddSchoolItems')
      this.modalPage = 'showOptions'

      // this.showAddForm = true

      const schoolId = await this.$store.state.administration.school.id

      const gradeLevel = await this.$axios.$get(
        `/slate-admin/school/${schoolId}/grades/?paginate=false`
      )
      this.gradeLevels = gradeLevel.data.map((grade) => grade)
      // `schools/v2/lms/${this.$store.state.school.currentAcademicYear.id}/subjects/?paginate=false`
      const allSubjects = await this.$axios.get(
        `/schools/v2/lms/${this.$store.state.school.currentAcademicYear.id}/subjects/?paginate=false&param=all
      `
      )
      console.log('all subjects', allSubjects.data.data)
      this.allSubjects = uniq(allSubjects.data.data.map((e) => e.name))
      const publishers = await this.$axios.get(
        `/schools/v2/school/${schoolId}/library/publishers/`
      )
      this.publishers = publishers.data.data
      console.log('publishers', publishers.data.data)

      // this.getAllSchoolItems()
    },

    async addItemToClass() {
      try {
        const fd = new FormData()
        fd.append('note', this.newItem.note)
        await this.$axios.post(
          `/schools/v3/class_subject/${this.$route.params.subject}/resources/`,
          // `/schools/v3/library/class/${this.$route.params.class}/school_item/${this.newItem.libraryItemId}/add/`,
          { data: this.newItem.libraryItemId }
        )
        this.newItem = {}
        this.$bvModal.hide('AddSchoolItems')
        this.AllSchoolItems = []
        this.newItem.libraryItemId = []
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
        const all = data.data.filter((object1) => {
          return !this.data.some((object2) => {
            return object1.id === object2.id
          })
        })
        this.AllSchoolItems = all
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
      console.log(e)
      if (e) {
        this.selectedBook = e
        // this.showAddForm = true
      }

      //   this.$router.push({
      //     name: 'sms-id-lms-library-book_id',
      //     params: { book_id: e.id, id: this.$route.params.id },
      //     query: { _name: `${e.name}` },
      //   })
    },
  },
}
