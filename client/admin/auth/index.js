import Vue from 'vue'
import Auth from './Auth'

import '../admin.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#auth',
  template: '<Auth/>',
  components: { Auth }
})
