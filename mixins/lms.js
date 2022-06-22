export default {
  layout: 'school',

    data(){
        return {
            routes: [
                { name: 'Dashboard', link: 'dashboard' },
                { name: 'Classes', link: 'classes' },
                { name: 'Subjects', link: 'subjects' },
                { name: 'Excercises', link: 'excercises' },
                { name: 'Clubs', link: 'clubs' },
                { name: 'Library', link: 'library' },
                { name: 'Question Bank', link: 'question-bank' },
        
        
              ],
        }
    },
    mounted() {
        this.emit()
      },
      methods: {
        emit() {
          //   alert('emit')
          this.$nuxt.$emit('sideOptions', this.routes)
        },
      },
}