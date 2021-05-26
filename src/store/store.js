import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  // global state, yo!
  state: {
    user: {},
    isUserLoggedIn: false
  },
  //mutations obv mutate shit
  mutations: {
    loadUser(state, email) {
      state.user.email = email
    },

    resetUser(state) {
      state.user = {}
    },
    
    toggleLoginBool(state) {
      if (state.isUserLoggedIn === false) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    }
  },
  // Here be yer actions
  actions: {

    logoutUser(context) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          context.commit("toggleLoginBool")
          context.commit("resetUser")
          router.push('/');
        })
        .catch(error => {
          alert(error.message);
          router.push('/');
        });
    },

    loginUser: (context, user) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          context.commit("loadUser", user.email)
          context.commit("toggleLoginBool")
          router.push('/yourhome')
        })
        .catch(error => {
           alert(error.message);
        });
    },
  },
  //why are there modules in $store again?
  modules: {
  }
})
