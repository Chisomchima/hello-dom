import Vue from 'vue'
import vueDebounce from 'vue-debounce'

Vue.use(vueDebounce)

// Or if you want to pass in the lock option
Vue.use(vueDebounce, {
    lock: true
})

// Listening to multiple events
Vue.use(vueDebounce, {
    listenTo: ['input', 'keyup']
})

// Setting a default timer This is set to '300ms' if not specified
Vue.use(vueDebounce, {
    defaultTime: '700ms'
})