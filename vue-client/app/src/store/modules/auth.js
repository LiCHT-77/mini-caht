import {
  LoginRequest,
  GetUserRequest,
  User
} from '../../pb/user_pb'
import router from '../../router/index'

const state = {
  user: new User(),
  id: 0,
  accessToken: '',
  friends: [],
}

const getters = {
  getAccessToken: (state) => {
    return state.accessToken
  },
  isAuth: (state) => {
    return state.accessToken
  },
}

const actions = {
  login({rootState, commit, rootGetters}, { email, password }) {
    let request = new LoginRequest()
    request.setEmail(email)
    request.setPassword(password)
    rootState.UserServiceClient.login(request, rootGetters.getGrpcMetadata, function (err, response) {
      if (!err) {
        commit('user/setPbUser', response.getUser(), {root:true})
        commit('setAccessToken', response.getAccessToken())
        router.push({ name: 'Dashboard' }).catch(() => { })
      } else {
        console.log(err.message)
      }
    })
  },
  logout({ commit }) {
    commit('user/setUser', {
      id: '', 
      name: '', 
      email: '', 
      password: '',
    }, {root:true})
    commit('user/setId', 0, {root: true})
    commit('setAccessToken', '')
    router.push({ name: 'Login' }).catch(() => { })
  },
  loadUser({rootState, commit, rootGetters, dispatch}) {
    let request = new GetUserRequest()
    request.setId(rootGetters['user/getId'])
    rootState.UserServiceClient.getUser(request, rootGetters.getGrpcMetadata, function (err, response) {
      if (!err) {
        commit('user/setPbUser', response.getUser(), {root: true})
      } else {
        console.log(err.message)
        if (err.code === 16) {
          dispatch('logout')
        }
      }
    })
  },
}

const mutations = {
  setAccessToken(state, token) {
    state.accessToken = token
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}