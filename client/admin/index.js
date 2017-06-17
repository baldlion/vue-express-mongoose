import Vue from 'vue'
import 'babel-polyfill'
import { sync } from 'vuex-router-sync'
import Admin from './Admin'
import router from './router'
import store from './store/admin.store'

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#admin',
  store,
  router,
  template: '<Admin/>',
  components: { Admin }
})
