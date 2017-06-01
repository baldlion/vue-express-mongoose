import Vue from 'vue';
import Admin from './Admin';
import router from './router';
// import store from './store';

Vue.config.productionTip = false;

new Vue({
  el: '#admin',
  // store,
  router,
  template: '<Admin/>',
  components: { Admin }
});