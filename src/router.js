import Vue from 'vue'
import Router from 'vue-router'
import Showmore from './components/Showmore.vue'
import Add from './components/Add.vue'
import Edit from './components/Edit.vue'
import UserHistory from './components/UserHistory.vue'
import AddUserHistory from './components/AddUserHistory.vue'
import SearchUser from './components/SearchUser.vue'
import UserHistoryMore from './components/UserHistoryMore.vue'
import PageNotFound404 from './components/PageNotFound404.vue'
import Doctor from './components/Doctor.vue'
import Diagnos from './components/Diagnos.vue'

import Login from './components/Login.vue'
import firebase from 'firebase/app';
import 'firebase/auth';

import NProgress from 'nprogress';
import '../node_modules/nprogress/nprogress.css'

Vue.use(Router)



let router = new Router({
  routes: [
    {
      path: '/',
      name: 'searchUser',
      component: SearchUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: Doctor,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/doctor/diagnos/:usersId/:userHistoryId',
      name: 'diagnos',
      component: Diagnos,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:uid_user',
      name: 'showmore',
      component: Showmore,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:uid_user',
      name: 'edit',
      component: Edit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/userHistory/:uid_user',
      name: 'userHistory',
      component: UserHistory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: './addUserHistory/:uid_user',
      name: 'addUserHistory',
      component: AddUserHistory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: './userHistoryMore/:userProfileId/:userHistoryId',
      name: 'userHistoryMore',
      component: UserHistoryMore,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: 'PageNotFound404',
      component: PageNotFound404
    }

  ]
})

// Router guard
router.beforeEach((to, from, next) => {
  //  Check for requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // Check if not logged in
    if(!firebase.auth().currentUser) {
      // Go to login page
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
      // Check if logged in
      if(firebase.auth().currentUser) {
        // Go to login page
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
  } else {
    // Proceed to the route
    next()
  }
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router