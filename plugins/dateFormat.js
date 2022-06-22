import Vue from 'vue'
import { DateTime } from 'luxon'

export default () => {
  Vue.filter('date', function (value) {
    if (value) {
      try {
        const oldDate = value.toISOString()
        const newDate = DateTime.fromISO(oldDate).toISODate()
      return newDate

        
      } catch (error) {
        console.log('error oo', error)
        return value
        
      }
     
    }
    else {
      return value
    }
  })
}
