import Vue from 'vue'

//  if i decide to use Regex expression to match the file name
/*
    const disabledPages = [
    '/trips',
    '^/$', // exact match for homepage
    '/student/.*',
    ].map((r) => new RegExp(r))
*/
 // this uses name to disable the page
const disabledPages = [
    'student-lms-schoolId-subjects-subject',
]

Vue.mixin({
  beforeRouteLeave(to, _from, next) {
    if (disabledPages.find((p) =>  p.includes(to.name))) {
      this.$store.commit('loader/setRouterLoadingEnable', false)
    }
    next()  
  },
})
