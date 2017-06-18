import Vue from 'vue'
import Vuex from 'vuex'

import admin from './admin.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin
  }
})
