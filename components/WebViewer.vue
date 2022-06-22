<template>
  <div v-if="onUrlChange" id="webviewer" ref="viewer"></div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'WebViewer',
  data() {
    return {
      /**
       * @type {Boolean}
       * @description Hells to rerender the WebViewer on url Change
       *
       */
      onUrlChange: true,

      scrollTopNum: 121,
      viewerElem: null,
    }
  },
  props: {
    path: String,
    url: String,
    scrollToTop: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    url() {
      this.onUrlChange = false
      setTimeout(() => {
        this.onUrlChange = true
        this.init()
      }, 300)
      // this.$forceUpdate()
    },
    scrollToTop(newVal) {
      if (this.viewerElem) {
        this.viewerElem.scrollIntoView({ behavior: 'smooth' })
        this.viewerElem.scrollTo(0, newVal)
      }
      // scroll.animateScroll(newVal, this.viewerElem)
      // this.viewerElem.scrollTo(0, newVal)
    },
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init() {
      import('@pdftron/webviewer').then(() => {
        WebViewer(
          {
            path: `${window.location.origin}/webviewer`,
            initialDoc: this.url, // replace with your own PDF file
          },
          this.$refs.viewer
        ).then((instance) => {
          // call apis here
          // console.log(instance)
          // instance.UI.setTheme('dark')
          instance.setFitMode('FitWidth')
          instance.setLayoutMode('Continuous')
          instance.UI.disableElements(['ribbons'])
          instance.UI.disableElements(['toolsHeader'])
          instance.UI.disableElements(['toolbarGroup-Shapes'])
          instance.UI.disableElements(['toolbarGroup-Edit'])
          instance.UI.disableElements(['toolbarGroup-Insert'])

          const { documentViewer } = instance.Core
          documentViewer.addEventListener('documentLoaded', () => {
            this.viewerElem = documentViewer.getScrollViewElement()
            this.viewerElem.addEventListener('scroll', () => {
              // console.log(`Scrolling... ${this.viewerElem.scrollTop}`)
              this.$emit('scroll', this.viewerElem.scrollTop)
            })
          })
        })
      })
    },
  },
}
</script>

<style>
#webviewer {
  height: 100vh;
}
</style>
