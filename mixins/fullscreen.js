export default {
  data() {
    return {
      fullScreenText: 'Go Full Screen',
      onFullScreen:false,
    }
  },
  methods: {
    fullScreenFunc(elementId) {
      if (this.IsFullScreenCurrently()) {
        this.GoOutFullscreen()
        this.fullScreenText = 'Go Full Screen'
        this.onFullScreen = false
      } else {
        this.GoInFullscreen(document.getElementById(elementId))
        this.fullScreenText = 'Exit Full Screen'
        this.onFullScreen = true
      }
    },

    GoInFullscreen(element) {
      if (element.requestFullscreen) element.requestFullscreen()
      else if (element.mozRequestFullScreen) element.mozRequestFullScreen()
      else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen()
      else if (element.msRequestFullscreen) element.msRequestFullscreen()
    },
    GoOutFullscreen() {
      if (document.exitFullscreen) document.exitFullscreen()
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
      else if (document.msExitFullscreen) document.msExitFullscreen()
    },
    IsFullScreenCurrently() {
      // eslint-disable-next-line camelcase
      const full_screen_element =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        null

      // If no element is in full-screen
      // eslint-disable-next-line camelcase
      if (full_screen_element === null) return false
      else return true
    },
    exitFullscreen() {
      if (this.IsFullScreenCurrently()) {
        this.GoOutFullscreen()
        this.fullScreenText = 'Go Full Screen'
      }
    },
  },
}
