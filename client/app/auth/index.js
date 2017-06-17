import Vue from 'vue'
import Auth from './Auth'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#auth',
  template: '<Auth/>',
  components: { Auth }
})
