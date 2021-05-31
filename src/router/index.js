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
  // {
  //   path: '/yourhome',
  //   name: 'Your Home',
  //   component: () =>
  //       import('../views/Chat.vue'),
  //       meta: {
  //         authRequired: false,
  //       }
  // },
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
  if (to.matched.some(record => record.meta.authRequired)) {
      if (firebase.auth().currentUser) {
          next();
      } else {
          alert('You must be logged in to see this page');
          next({
              path: '/',
          });
      }
  } else {
      next();
  }
});

export default router
