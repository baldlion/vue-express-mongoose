import Vue from 'vue'
import Router from 'vue-router'

const Dashboard = resolve => require(['../components/Dashboard.vue'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/admin',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
