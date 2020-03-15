import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import cart from './modules/cart'
import shop from './modules/shop'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    cart,
    shop
  },
  getters
})

export default store
