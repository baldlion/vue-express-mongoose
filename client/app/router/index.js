import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['../components/Home.vue'], resolve)
    },
    {
      path: '/contact',
      name: 'Contact',
      component: resolve => require(['../components/Contact.vue'], resolve)
    }
  ]
});
