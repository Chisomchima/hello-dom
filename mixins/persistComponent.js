export default {
  mounted() {
    const storageName = this.buttons[0].page
    const localComponent = JSON.parse(localStorage.getItem(storageName))
    if (localComponent) {
      const correctTab = document.getElementById(localComponent.component)

      correctTab.click()
    } else {
      this.currentTabComponent = this.buttons[0].component
    }
  },
  methods: {
    switchComponent(e) {
      this.buttons.forEach((each) => {
        each.isActive = false
      })
      e.isActive = true
      localStorage.setItem(e.page, JSON.stringify(e))

      this.currentTabComponent = e.component
    },
  },
  destroyed() {
    const storageName = this.buttons[0].page
    localStorage.removeItem(storageName)
  },
}
