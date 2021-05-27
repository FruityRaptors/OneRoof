import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router/index'
import { textSpanContainsTextSpan } from 'typescript'

Vue.use(Vuex)

export default new Vuex.Store({
  // global state, yo!
  state: {
    user: {},
    users: [],
    isUserLoggedIn: false
  },

  //mutations obv mutate shit
  mutations: {

    setUser(state, user) {
      state.users = user;
    },

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

    getUsers() {
      try {
        const result = axios({
          method: "POST",
          url: "https://localhost:4000/graphql",
          data: {
            query: `
            {
            getAllUsers{
              id
              username
              house_key
              email
            }
      
            }`
          }
        });
        context.commit("setUser", result)
      } catch (error) {
        console.log(`You got an ${error}`);
      }
          },

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
