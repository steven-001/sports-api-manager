import Vue from 'vue'
import Vuex from 'vuex'
import timeUtil from '../util/timeUtil.js'
//import getters from './getters.js'
Vue.use(Vuex);


// https://webpack.js.org/guides/dependency-management/#requirecontext


// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file

const state = {

}

const store = new Vuex.Store({
  state,
  mutations:{

  },
 
})

export default store



