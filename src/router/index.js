import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Register Request',
    /*   component: ???*/
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/yourhome',
    name: 'Chat',
    component: () =>
      import('../views/Chat.vue'),
    meta: {
      authRequired: false,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () =>
      import('../views/Profile.vue'),
    meta: {
      authRequired: false,
    }
  },
  {
    path: '/todo',
    name: 'Todo List',
    component: () =>
      import('../views/TodoView.vue'),
    meta: {
      authRequired: false,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const authRequired = to.matched.some(record => record.meta.authRequired);
  
  if (authRequired == true && !currentUser) {
    alert('You must be logged in to see this page');
    next({
      path: '/',
    });
  } else {
    next();
  }
});

export default router
