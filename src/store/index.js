import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
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
    plugins: [createPersistedState()],
})
