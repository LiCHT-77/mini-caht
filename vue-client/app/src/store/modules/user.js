import {
  RegisterRequest,
  PutUserRequest,
  AddFriendRequest,
  RemoveFriendRequest,
  User
} from '../../pb/user_pb'
import router from '../../router/index'

const state = {
  id: '',
  email: '',
  name: '',
  password: '',
}

const getters = {
  getId: (state) => {
    return state.id
  },
  getName: (state) => {
    return state.name
  },
  getEmail: (state) => {
    return state.email
  },
}

const actions = {
  register({rootState, commit, rootGetters}, { name, email, password }) {
    var user = new User()
    user.setName(name)
    user.setEmail(email)
    user.setPassword(password)
    var request = new RegisterRequest()
    request.setUser(user)
    rootState.UserServiceClient.register(request, rootGetters.getGrpcMetadata, function (err, response) {
      if (!err) {
        commit('setPbUser', response.getUser())
        commit('auth/setAccessToken', response.getAccessToken(), {root:true})
        router.push({ name: 'Dashboard' })
      } else {
        console.log(err.message)
      }
    })
  },
  updateUser({getters, rootGetters, commit, rootState}, {name, email}) {
    var user = new User()
    user.setId(getters.getId)
    user.setName(name)
    user.setEmail(email)
    var request = new PutUserRequest()
    request.setUser(user)
    request.setId(getters.getId)
    rootState.UserServiceClient.putUser(request, rootGetters.getGrpcMetadata, function(err) {
      if (!err) {
        commit('setPbUser', user)
      } else {
        console.log(err.message)
      }
    })
  },
  addFriend({rootGetters, rootState}, {id}) {
    var request = new AddFriendRequest
    request.setId(id)
    rootState.UserServiceClient.addFriend(request, rootGetters.getGrpcMetadata, function(err) {
      if (err) {
        console.log(err.message)
      }
    })
  },
  removeFriend({rootGetters, rootState}, {id}) {
    var request = new RemoveFriendRequest
    request.setId(id)
    rootState.UserServiceClient.removeFriend(request, rootGetters.getGrpcMetadata, function(err) {
      if (err) {
        console.log(err.message)
      }
    })
  },
}

const mutations = {
  setPbUser(state, user) {
    state.id = user.getId()
    state.email = user.getEmail()
    state.name = user.getName()
  },
  setUser(state, {id, name, email, password}) {
    state.id = id
    state.email = email
    state.name = name
    state.password = password
  },
  setId(state, id) {
    state.id = id
  },
  setEmail(state, email) {
    state.email = email
  },
  setName(state, name) {
    state.name = name
  },
  setPassword(state, password) {
    state.password = password
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}