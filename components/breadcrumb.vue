<template>
  <div>
    <!-- {{ subPage }} {{ crumbs.length }} {{ enable }} -->
    <ul v-if="crumbs.length && subPage" class="breadcrumb">
      <!-- <li>
      <nuxt-link to="/" class="">
        <Icon icon="dashicons:admin-home" class="mb-1"></Icon>
      </nuxt-link>
    </li> -->

      <!-- <li>
        <button @click="stopwatcher">click</button>
      </li> -->

      <li
        v-for="(crumb, Nindex) in mainPages"
        :key="'main' + Nindex"
        property="itemListElement"
        typeof="ListItem"
      >
        <NLink
          property="item"
          typeof="WebPage"
          :to="{ path: crumb.path, params: crumb.params, query: crumb.query }"
        >
          <span property="name">{{
            $route.fullPath === crumb.path && title !== null
              ? title
              : crumb.title
          }}</span>
        </NLink>
        <meta property="position" :content="Nindex + 2" />
      </li>
      <!-- <li>end</li> -->
      <li
        v-for="(crumb, index) in crumbs"
        :key="'sub' + index"
        property="itemListElement"
        typeof="ListItem"
        @click="changeOrder(crumb)"
      >
        <NLink
          property="item"
          typeof="WebPage"
          v-if="show(crumb)"
          :to="{ path: crumb.path, params: crumb.params, query: crumb.query }"
        >
          <span property="name">{{
            $route.fullPath === crumb.path && title !== null
              ? title
              : crumb.title
          }}</span>
        </NLink>
        <meta property="position" :content="index + 2" />
      </li>
    </ul>
  </div>
</template>

<script>
const titleCase = require('ap-style-title-case')
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      routes: [],
      subPage: false,
      // enable: true,
    }
  },
  computed: {
    enable() {
      return this.$store.state.breadcrumbs.enable
    },
    enableRootRoute() {
      return this.$store.state.breadcrumbs.enableRootRoute
    },
    crumbs() {
      if (this.enable) {
        const fullPath = this.$route.fullPath
        const params = fullPath.startsWith('/')
          ? fullPath.substring(1).split('/')
          : fullPath.split('/')
        const crumbs = []
        let path = ''
        if (this.subPage) {
          params.forEach((param, index) => {
            path = `${path}/${param}`
            const match = this.$router.match(path)
            // console.log('match', match, 'param', param)
            if (
              match.name !== null &&
              match.name !== 'sms' &&
              match.name !== 'sms-id-administration-configuration' &&
              match.name !== 'sms-id-administration'
            ) {
              // console.log('match', match)
              if (param.includes('-')) {
                // if it is a slug replace it with the name of the route before it with lowercase
                const newSlugName = match.name.split('-').slice(-2)[0]
                crumbs.push({
                  title: match.query._name ? match.query._name : newSlugName,
                  ...match,
                })
              } else {
                crumbs.push({
                  title: titleCase(param.replace(/-/g, ' ')),
                  ...match,
                })
              }
              const length = params.length - 1
              const before = length - 1
              // console.log('param', params, 'match', match)
              // if it is the last route, add it to store and show it as a breadcrumb
              if (length === index) {
                // console.log('match for store  ', match)
                const datum = {
                  title: match.query._name
                    ? match.query._name
                    : titleCase(param.replace(/-/g, ' ')),
                  fullPath: match.fullPath ? match.fullPath : '',
                  hash: match.hash ? match.hash : '',
                  meta: match.meta ? match.meta : {},
                  name: match.name ? match.name : '',
                  params: match.params ? match.params : {},
                  path: match.path ? match.path : '',
                  query: match.query ? match.query : {},
                }

                this.$store.commit('breadcrumbs/ADD_ROUTE', datum)
              }
            }
          })
        }
      }
      return this.$store.state.breadcrumbs.routes
    },
    mainPages() {
      if (this.enableRootRoute) {
        const fullPath = this.$route.fullPath
        const params = fullPath.startsWith('/')
          ? fullPath.substring(1).split('/')
          : fullPath.split('/')
        const crumbs = []
        let path = ''
        if (this.subPage) {
          params.forEach((param, index) => {
            path = `${path}/${param}`
            const match = this.$router.match(path)
            if (
              match.name !== null &&
              match.name !== 'sms' &&
              match.name !== 'sms-id-administration-configuration' &&
              match.name !== 'sms-id-administration'
            ) {
              // console.log('match', match)
              if (param.includes('-')) {
                // if it is a slug replace it with the name of the route before it with lowercase
                const newSlugName = match.name.split('-').slice(-2)[0]
                crumbs.push({
                  title: match.query._name ? match.query._name : newSlugName,
                  ...match,
                })
              } else {
                crumbs.push({
                  title: titleCase(param.replace(/-/g, ' ')),
                  ...match,
                })
              }
              const length = params.length - 1
              const before = length - 1
              // console.log('param', params, 'match', match)
              // if it is the last route, add it to store and show it as a breadcrumb
              if (before === index) {
                const datum = {
                  title: match.query._name
                    ? match.query._name
                    : titleCase(param.replace(/-/g, ' ')),
                  fullPath: match.fullPath ? match.fullPath : '',
                  hash: match.hash ? match.hash : '',
                  meta: match.meta ? match.meta : {},
                  name: match.name ? match.name : '',
                  params: match.params ? match.params : {},
                  path: match.path ? match.path : '',
                  query: match.query ? match.query : {},
                }
                this.$store.commit('breadcrumbs/ADD_ROOT_ROUTE', datum)

                // this.$store.commit('breadcrumbs/ADD_ROUTE', datum)
              }
              if (
                match.name ===
                'sms-id-administration-configuration-report-card-template-edit-template'
              ) {
                // console.log('match report card', match, 'param', param)

                const datum = {
                  title: 'Report Card Template',
                  fullPath: match.fullPath ? match.fullPath : '',
                  hash: match.hash ? match.hash : '',
                  meta: match.meta ? match.meta : {},
                  name: match.name ? match.name : '',
                  params: match.params ? match.params : {},
                  path: '/sms/SVAA/administration/configuration/report-card-template/',
                  query: match.query ? match.query : {},
                }
                this.$store.commit('breadcrumbs/ADD_ROOT_ROUTE', datum)
              }
            }
          })
        }
      }
      return this.$store.state.breadcrumbs.rootPage
    },
    trackedCrumbs() {
      return this.$store.state.breadcrumbs.routes
    },
  },
  watch: {
    $route: {
      handler() {
        this.subPage = this.noMainPages()
      },
      immediate: true,
    },
    '$route.query': {
      handler(e) {
        if (e.tab) {
          this.$store.commit('breadcrumbs/ADD_TAB', e.tab)
        }
      },
    },
  },

  methods: {
    show(e) {
      if (
        e.name ===
        'sms-id-administration-configuration-grade-grade-subject-subject'
      ) {
        return true
      } else if (e.query.step) {
        return false
      } else return true
    },
    noMainPages() {
      // console.log('noMainPages', this.$route.name)
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      if (
        this.$route.name ===
        'sms-id-administration-configuration-report-card-template'
      ) {
        this.$store.commit('breadcrumbs/RESET_ROUTE')
        return false
      } else if (params.length === 5 && params[3] === 'configuration') {
        // if params.length === 5, then it is a configuration main page
        this.$store.commit('breadcrumbs/RESET_ROUTE')

        return false
      } else if (params.length > 4) {
        // if params.length > 3, then it is a sub-page

        return true
      } else {
        this.$store.commit('breadcrumbs/RESET_ROUTE')

        return false
      }
    },
    stopwatcher() {
      this.$store.dispatch('breadcrumbs/popRoute')
    },
    changeOrder(e) {
      // if (e) {
      this.watcher = this.$watch('$route.path', (newValue, oldValue) => {
        // alert('sds')
        this.$store.dispatch('breadcrumbs/removeRoute', e)
        // e = null
        this.watcher() // turns off the watcher
      })

      // }
    },
  },
}
</script>

<style scoped>
ul.breadcrumb {
  padding: 10px 16px;
  list-style: none;
  background-color: #eee;
}

/* Display list items side by side */
ul.breadcrumb li {
  display: inline;
  font-size: 18px;
}

/* Add a slash symbol (/) before/behind each list item */
ul.breadcrumb li + li:before {
  padding: 8px;
  color: black;
  content: '/\00a0';
}

li a.nuxt-link-exact-active.nuxt-link-active {
  color: grey;
}
/* Add a color to all links inside the list */
ul.breadcrumb li a {
  color: #0275d8;
  text-decoration: none;
}

/* Add a color on mouse-over */
ul.breadcrumb li a:hover {
  color: #01447e;
  text-decoration: underline;
}
</style>
