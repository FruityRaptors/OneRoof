import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router/index'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // global state, yo!
  state: {
    user: {},
    users: [],
    isUserLoggedIn: false,
  },

  //mutations obv mutate shit
  mutations: {

    setUser(state, user) {
      console.log('setting user state....', user)
      state.user = user;
      console.log(state.user.house_key)
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

    getUser(context, email) {
      console.log('fetching user from database...')
      try {
        axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `
            {
            getUserByEmail(email:"${email}"){
              id
              username
              house_key
              email
             }
            }`
          }
        }).then((response) => {
          context.commit("setUser", response.data.data.getUserByEmail)
        });
      } catch (error) {
        console.log(`You got an ${error}`);
      }
    },

    // Here's the logic to update
    addUserToSQLDatabase(context, user) {
      console.log('fetching user from database...')
      try {
        axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `
          mutation{
          getUserByEmail(User:"${user}"){
            id
            username
            house_key
            email
           }
          }`
          }
        }).then((response) => {
          context.commit("setUser", response.data.data.getUserByEmail)
        });
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
          context.commit("toggleLoginBool")
          context.dispatch("getUser", user.email)
          router.push('/yourhome')
        })
        .catch(error => {
          alert(error.message);
        });
    },

    registerUser: (context, user) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          context.commit("toggleLoginBool")
          context.dispatch("addUserToSQLDatabase", user)
            .then((user) => {
              context.dispatch("getUser", user.email)
              router.push('/yourhome')
              alert('Successfully registered! Please login.');
            })
        })
        .catch(error => {
          alert(error.message);
        });
    }
  },
  //why are there modules in $store again?
  modules: {
  }
})
