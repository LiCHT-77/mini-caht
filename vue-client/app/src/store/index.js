import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from "js-cookie"
import { UserServiceClient } from '../pb/user_grpc_web_pb'
import { RoomServiceClient } from '../pb/room_grpc_web_pb'
import user from './modules/user'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserServiceClient: UserServiceClient,
    RoomServiceClient: RoomServiceClient,
  },
  getters: {
    getGrpcMetadata: (state, getters) => {
      return {
        'authorization': getters['auth/getAccessToken'],
      }
    },
  },
  mutations: {
    setUserServiceClient(state, client) {
      state.UserServiceClient = client
    },
    setRoomServiceClient(state, client) {
      state.RoomServiceClient = client
    },
  },
  actions: {
    connectClients({ commit }, { hostname, port }) {
      commit('setUserServiceClient', new UserServiceClient(
        'http://' + hostname + ':' + port,
        null,
        null
      ))
      commit('setRoomServiceClient', new RoomServiceClient(
        'http://' + hostname + ':' + port,
        null,
        null
      ))
    }
  },
  modules: {
    user: user,
    auth: auth
  },
  plugins: [createPersistedState({
    key: 'mini-chat',
    paths: [
      'user.id',
      'auth.accessToken'
    ],
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 365 }),
      removeItem: key => Cookies.remove(key)
    }
  })]
})
