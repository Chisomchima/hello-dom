import { difference } from 'lodash'

export default {
  data() {
    return {
      isLoading: false,
      counter: 0,
      current: {
        class: '',
        grade: '',
      },

      rightActive: false,
      leftActive: false,
      nextYearStudents: [],
      currentStudents: [],
      selected: [],
      selectedNext: [],
      allSelected: false,
      allSelectedNext: false,
      indeterminate: false,
      indeterminateNext: false,
    }
  },
  computed: {
    loggedInStaff() {
      return this.$store.getters['staff/getSchoolByCode'](this.$route.params.id)
    },
  },
  watch: {
    selected(newValue, oldValue) {
      // Handle changes in individual  checkboxes
      if (newValue.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newValue.length === this.currentStudents.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
        this.indeterminate = true
        this.allSelected = false
      }
    },
    selectedNext(newValue, oldValue) {
      // Handle changes in individual  checkboxes
      if (newValue.length === 0) {
        this.indeterminateNext = false
        this.allSelectedNext = false
      } else if (newValue.length === this.nextYearStudents.length) {
        this.indeterminateNext = false
        this.allSelectedNext = true
      } else {
        this.indeterminateNext = true
        this.allSelectedNext = false
      }
    },
  },
  methods: {
    clearFields() {
      this.selected = []
      this.selectedNext = []
      this.currentStudents = []
      this.nextYearStudents = []
    },
    toast(toaster, append = false, variant = 'success', title, body) {
      this.counter++
      this.$bvToast.toast(body, {
        title,
        toaster,
        variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      })
    },
    toggleAll(checked) {
      console.log(this.selected, checked)
      this.selected = checked
        ? this.currentStudents.map((e) => e.id).slice()
        : []
    },
    toggleAllNext(checked) {
      console.log(this.selectedNext, checked)
      this.selectedNext = checked
        ? this.nextYearStudents.map((e) => e.id).slice()
        : []
    },
    moveCurrentStudentToNext() {
      const toBeMoved = this.selected.map((current) => {
        return this.currentStudents.find((e) => e.id === current)
      })

      this.nextYearStudents = this.nextYearStudents.concat(toBeMoved)
      const diff = difference(this.currentStudents, this.nextYearStudents)
      this.currentStudents = diff
      this.selected = []
      this.rightActive = true
      this.leftActive = false
    },

    moveNextStudentToCurrent() {
      const toBeMoved = this.selectedNext.map((current) => {
        return this.nextYearStudents.find((e) => e.id === current)
      })

      this.currentStudents = this.currentStudents.concat(toBeMoved)

      this.selectedNext.forEach((element) => {
        const id = this.nextYearStudents.findIndex((e) => e.id === element)
        this.nextYearStudents.splice(id, 1)
      })

      this.selectedNext = []
      this.rightActive = false
      this.leftActive = true
    },

    moveStudent(e) {
      if (e === 'right') {
        if (this.selected.length === 0) {
          this.toast(
            'b-toaster-bottom-center',
            true,
            'danger',
            "You can't move students",
            'Please select atleast 1 student'
          )
        } else {
          this.moveCurrentStudentToNext()
        }
      } else if (e === 'left') {
        if (this.selectedNext.length === 0) {
          this.toast(
            'b-toaster-bottom-center',
            true,
            'danger',
            "You can't move students",
            'Please select atleast 1 student'
          )
        } else {
          this.moveNextStudentToCurrent()
          // this.currentStudents = this.selectedNext
        }
      }
    },
    handleReset() {
      this.$fetch()
    },
  },
}
