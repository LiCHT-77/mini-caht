import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/index'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/User/Dashboard.vue'
import Profile from '../views/User/Profile.vue'
import RoomList from '../views/Room/RoomList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      authOnly: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      authOnly: true
    }
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: RoomList,
    meta: {
      authOnly: true
    }
  },
  {
    path: '/',
    redirect: {
      name: 'Login'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  var isAuth = Store.state.auth.accessToken
  if (to.matched.some(record => record.meta.authOnly) && !isAuth) {
    next({ name: 'Login' })
  } else if (to.matched.some(record => record.meta.guestOnly) && isAuth) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
