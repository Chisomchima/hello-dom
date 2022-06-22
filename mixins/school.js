export default {

    layout: 'school',
  data() {
    return {
      routes: [
        { name: 'Students', icon: 'fa-solid:user-graduate', link: '/sms/' + this.token + '/administration/students' },
        { name: 'Classes', icon: 'whh:student', link: `/sms/${this.token}/administration/classes` },
        { name: 'Clubs', icon: 'clarity:flag-solid', link: '/sms/' + this.token + '/administration/clubs' },

        { name: 'Families', icon: 'ic:baseline-family-restroom', link: '/sms/' + this.token + '/administration/families' },

        { name: 'Configuration', icon: 'ant-design:setting-filled', link: 'configuration/year' , configuration: [
            {name: 'summ'},
            {name: 'ss'},
            {name: 'summ'}

        ]},

      ],
    }
  },
  computed: {
   
   
    token() {
            return this.$store.state.administration.school.code

    },
  },
  mounted() {
      this.emit()
     
  },
  methods: {
      emit(){
        //   alert('emit')      
    this.$nuxt.$emit('sideOptions', this.routes)

      }
  }
}