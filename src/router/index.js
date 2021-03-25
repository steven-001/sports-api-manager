import Vue from 'vue';
import Router from 'vue-router';

const index = r => require.ensure([], () => r(require('../components/index')), 'index')

Vue.use(Router)

export default new Router({
  routes: [

  ],
  // mode:"history"
})

