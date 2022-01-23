import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logged: false,
  },
  mutations: {
    logout (state) {
      state.logged = false
    },
    login (state) {
      state.logged = true
    },
  },
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
