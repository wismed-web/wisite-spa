import { createStore } from 'vuex'
const store = createStore({
    state: {
        user: {

        },
        token: null
    },
    mutations: {
        setToken(state, value) {
            state.token = value
        },
        clearToken(state) {
            state.token = null
        }
    },
    actions: {
        setToken(context, value) {
            console.log('token:' + value)
            context.commit('setToken', value)
        },
        clearToken(context) {
            context.commit('clearToken')
        }
    }
})
export default store