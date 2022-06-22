import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  required,
  email,
  confirmed,
  alpha_spaces,
  digits,
  // eslint-disable-next-line camelcase
  max_value,
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('email', {
  ...email,
  message: 'This email field is not an email format',
})
extend('confirmed', {
  ...confirmed,
})
extend('alpha_spaces', {
  ...alpha_spaces,
  message: 'must be alphabetic',
})
extend('digits', {
  ...digits,
  message: 'Must be an 11 digit number',
})
extend('max_value', {
  // eslint-disable-next-line camelcase
  ...max_value,
  message: 'Maximum value exceeded',
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
