export default {
  methods: {
    resetBreadCrumbs() {
      this.$store.dispatch('breadcrumbs/sliceRoutes')
      this.$store.dispatch('breadcrumbs/removeRoot')
    },
  },
}
