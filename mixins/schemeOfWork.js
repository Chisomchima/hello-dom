export default {
  methods: {
    addSchemeOfWork() {
      this.showAddedScheme = true
      this.schemesOfWork.push({
        title: '',
        objective: '',
        edit: true,
        activeTabs: [0],

        weeks: [],
      })
      // make any new tab expanded
      this.activeTab = []
      const tab = this.schemesOfWork.length - 1
      this.activeTab.push(tab)
    },
    //   topics methods
    tabClose(e) {
      //    this.schemesOfWork[schemeIndex].weeks[weekIndex].topics[e.index]
      console.log('event', e)
    },
    addTopic(schemeIndex, weekIndex) {
      this.schemesOfWork[schemeIndex].weeks[weekIndex].topics.push({
        title: '',
        description: '',
        edit: true,
      })
      // make any new tab expanded
      const tab = this.schemesOfWork[schemeIndex].weeks[weekIndex].length - 1
      this.schemesOfWork[schemeIndex].weeks[weekIndex].activeTabs = []
      this.schemesOfWork[schemeIndex].weeks[weekIndex].activeTabs.push(tab)
    },
    editTopic(schemeIndex, weekIndex, topicIndex) {
      //   this.activeTopicTab = topicIndex

      this.schemesOfWork[schemeIndex].weeks[weekIndex].topics[
        topicIndex
      ].edit = true
    },

    saveTopic(schemeIndex, weekIndex, topicIndex) {
      this.schemesOfWork[schemeIndex].weeks[weekIndex].topics[
        topicIndex
      ].edit = false
    },
    deleteTopic(schemeIndex, weekIndex, topicIndex) {
      this.schemesOfWork[schemeIndex].weeks[weekIndex].topics.splice(
        topicIndex,
        1
      )
    },

    //   week methods
    addWeek(schemeIndex) {
      this.schemesOfWork[schemeIndex].weeks.push({
        title: '',
        description: '',
        edit: true,
        activeTabs: [0],
        topics: [],
      })
      // make any new tab expanded
      this.schemesOfWork[schemeIndex].activeTabs = []

      const tab = this.schemesOfWork[schemeIndex].weeks.length - 1
      this.schemesOfWork[schemeIndex].activeTabs.push(tab)
    },
    saveSchemeOfWorkWeek(schemeIndex, weekIndex) {
      this.schemesOfWork[schemeIndex].weeks[weekIndex].edit = false
    },
    editSchemeOfWorkWeek(schemeIndex, weekIndex) {
      //   this.activeWeekTab = weekIndex
      this.schemesOfWork[schemeIndex].weeks[weekIndex].edit = true
    },
    deleteSchemeOfWorkWeek(schemeIndex, weekIndex) {
      this.schemesOfWork[schemeIndex].weeks.splice(weekIndex, 1)
    },
    // scheme of work methods
    editSchemeOfWork(schemeIndex) {
      // make the accordion active and editable
      //   this.activeTab = null
      //   this.activeTab = schemeIndex
      this.schemesOfWork[schemeIndex].edit = true
    },
    saveSchemeOfWork(schemeIndex) {
      this.schemesOfWork[schemeIndex].edit = false
    },
    deleteSchemeOfWork(schemeIndex) {
      this.schemesOfWork.splice(schemeIndex, 1)
    },
    clearScheme() {
      this.schemesOfWork = []
    },

    demoScheme(e) {
      if (e !== 'topic') {
        this.activeTab = []
        this.schemesOfWork = [
          {
            title: 'FIRST TERM',
            objective: '',
            edit: false,
            activeTabs: [],
            weeks: [
              {
                title: 'WEEK 1',
                description: '',
                edit: false,
                activeTabs: [0, null],
                topics: [
                  {
                    title: 'Revision of last term’s work',
                    description: '',
                    edit: false,
                  },
                ],
                objective: '<p><strong>TOPICS/CONTENTS</strong></p>',
              },
              {
                title: 'WEEK 2',
                description: '',
                edit: false,
                activeTabs: [0, null, null, 1],
                topics: [
                  {
                    title: 'HEAT ENERGY',
                    description: '<p>Definition, sources, usage</p>',
                    edit: false,
                  },
                  {
                    title: 'EFFECTS OF HEAT ENERGY',
                    description:
                      '<ul><li>Advantages</li><li>Disadvantages</li></ul>',
                    edit: false,
                  },
                ],
              },
              {
                title: 'WEEK 3',
                description: '',
                edit: false,
                activeTabs: [0, null],
                topics: [
                  {
                    title: 'THERMOMETER AND ITS TYPES',
                    description:
                      '<p>Boiling temperature and melting temperature</p>',
                    edit: false,
                  },
                ],
              },
            ],
          },
          {
            title: 'SECOND TERM',
            objective: '',
            edit: false,
            activeTabs: [0],
            weeks: [],
          },
        ]
      } else {
        this.activeTab = []
        this.schemesOfWork = [
          {
            title: 'FIRST TERM',
            objective: '',
            edit: false,
            activeTabs: [0, 1, 2],
            weeks: [
              {
                title: 'Topic 1',
                description: '',
                edit: false,
                activeTabs: [0, null],
                topics: [],
                objective: '<p>Description for Topic 1</p>',
              },
              {
                title: 'Topic 2',
                description: '',
                edit: false,
                activeTabs: [0, null, null, 1],
                topics: [],
                objective: '<p>Description for Topic 2</p>',
              },
              {
                title: 'TOPIC 3',
                description: '',
                edit: false,
                activeTabs: [0, null],
                topics: [],
                objective: '<p>Description for Topic 3</p>',
              },
            ],
          },
          {
            title: 'SECOND TERM',
            objective: '',
            edit: false,
            activeTabs: [2, 1],
            weeks: [
              {
                title: 'Topic 1',
                description: '',
                edit: false,
                activeTabs: [null],
                topics: [],
                objective: '<p>Description for Topic 1</p>',
              },
              {
                title: 'Topic 2',
                description: '',
                edit: false,
                activeTabs: [0],
                topics: [],
                objective: '<p>Description for Topic 2</p>',
              },
              {
                title: 'Topic 3',
                description: '',
                edit: false,
                activeTabs: [0],
                topics: [],
                objective: '<p>Description for Topic 3</p>',
              },
            ],
          },
        ]
      }
    },
  },
}
