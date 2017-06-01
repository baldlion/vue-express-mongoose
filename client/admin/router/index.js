import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/admin',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: resolve => require(['../components/Dashboard.vue'], resolve)
    }
  ]
});
