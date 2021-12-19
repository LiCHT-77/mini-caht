import { UserServiceClient } from '../../pb/user_grpc_web_pb'
import {
  LoginRequest,
  RegisterRequest,
  GetUserRequest,
  PutUserRequest,
  AddFriendRequest,
  RemoveFriendRequest,
  GetFriendsRequest,
  User
} from '../../pb/user_pb'
import router from '../../router/index'

const state = {
  UserServiceClient: UserServiceClient,
  user: new User(),
  id: 0,
  accessToken: '',
  friends: [],
}

const getters = {
  getUser: (state) => {
    return state.user
  },
  getName: (state) => {
    return state.user.getName()
  },
  getEmail: (state) => {
    return state.user.getEmail()
  },
  getId: (state) => {
    return state.id
  },
  getAccessToken: (state) => {
    return state.accessToken
  },
  getGrpcMetadata: (state, getters) => {
    return {
      'authorization': getters.getAccessToken,
    }
  },
  isAuth: (state) => {
    return state.accessToken
  },
  getFriends: (state) => {
    return state.friends
  }
}

const actions = {
  connectClient({ commit }, { hostname, port }) {
    commit('setUserServiceClient', {
      hostname: hostname,
      port: port
    })
  },
  login({ state, commit, getters }, { email, password }) {
    var request = new LoginRequest()
    request.setEmail(email)
    request.setPassword(password)
    state.UserServiceClient.login(request, getters.getGrpcMetadata, function (err, response) {
      if (!err) {
        commit('setId', response.getUser().getId())
        commit('setUser', response.getUser())
        commit('setAccessToken', response.getAccessToken())
        router.push({ name: 'Dashboard' })
      } else {
        console.log(err.message)
      }
    })
  },
  register({ state, commit, getters }, { name, email, password }) {
    var user = new User()
    user.setName(name)
    user.setEmail(email)
    user.setPassword(password)
    var request = new RegisterRequest()
    request.setUser(user)
    state.UserServiceClient.register(request, getters.getGrpcMetadata, function (err, response) {
      if (!err) {
        commit('setId', response.getUser().getId())
        commit('setUser', response.getUser())
        commit('setAccessToken', response.getAccessToken())
        router.push({ name: 'Dashboard' })
      } else {
        console.log(err.message)
      }
    })
  },
  logout({ commit }) {
    commit('setId', 0)
    commit('setUser', new User())
    commit('setAccessToken', '')
    router.push({ name: 'Login' }).catch(() => { })
  },
  loadUser({ state, commit, getters }) {
    var request = new GetUserRequest()
    request.setId(getters.getId)
    state.UserServiceClient.getUser(request, getters.getGrpcMetadata, function (err, response) {
      if (!err) {
        commit('setId', response.getUser().getId())
        commit('setUser', response.getUser())
      } else {
        console.log(err.message)
        if (err.code === 16) {
          commit('setId', 0)
          commit('setAccessToken', '')

          router.push({ name: 'Login' }).catch(() => { })
        }
      }
    })
  },
  updateUser({ state, commit, getters }, {name, email}) {
    var user = new User()
    user.setId(getters.getId)
    user.setName(name)
    user.setEmail(email)
    var request = new PutUserRequest()
    request.setUser(user)
    request.setId(getters.getId)
    state.UserServiceClient.putUser(request, getters.getGrpcMetadata, function(err) {
      if (!err) {
        commit('setUser', user)
      } else {
        console.log(err.message)
      }
    })
  },
  addFriend({state, getters}, {id}) {
    var request = new AddFriendRequest
    request.setId(id)
    state.UserServiceClient.addFriend(request, getters.getGrpcMetadata, function(err) {
      if (err) {
        console.log(err.message)
      }
    })
  },
  removeFriend({state, getters}, {id}) {
    var request = new RemoveFriendRequest
    request.setId(id)
    state.UserServiceClient.removeFriend(request, getters.getGrpcMetadata, function(err) {
      if (err) {
        console.log(err.message)
      }
    })
  },
  getFriends({state, getters, commit}) {
    var request = new GetFriendsRequest
    request.setId(getters.getId)
    return state.UserServiceClient.getFriends(request, getters.getGrpcMetadata, function(err, response) {
      if (!err) {
        commit('setFriends', response.getFriendList())
      } else {
        console.log(err.message)
      }
    })
  },
}

const mutations = {
  setUserServiceClient(state, host) {
    state.UserServiceClient = new UserServiceClient(
      'http://' + host.hostname + ':' + host.port,
      null,
      null
    )
  },
  setUser(state, user) {
    state.user = user
  },
  setId(state, id) {
    state.id = id
  },
  setAccessToken(state, token) {
    state.accessToken = token
  },
  setFriends(state, friends) {
    state.friends = friends
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}