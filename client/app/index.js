import Vue from 'vue'
import 'babel-polyfill'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store'
import './app.scss'

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App />',
  components: { App }
})
