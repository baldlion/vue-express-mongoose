import Vue from 'vue';
import Auth from './Auth';

Vue.config.productionTip = false;

new Vue({
  el: '#auth',
  template: '<Auth/>',
  components: { Auth }
});