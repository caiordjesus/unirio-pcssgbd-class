import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logged: false,
        id_cliente: null,
        id_funcionario: null,
    },
    mutations: {
        logout (state) {
           state.logged = false
        },
        login (state) {
            state.logged = true
        },
        setClientId (state, clientId) {
            state.id_cliente = clientId
        },
        setFuncionatioId (state, funcionarioId) {
            state.id_funcionario = funcionarioId
        },
    },
    plugins: [createPersistedState()],
})
