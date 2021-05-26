import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  // global state, yo!
  state: {
    user: {
      username: "",
      email: "",
      /* avatar_url: "", */
    },
    isUserLoggedIn: false
  },
  //mutations obv mutate shit
  mutations: {
    loadUser(state, email) {
      state.user.email = email
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

    logoutUser() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('Successfully logged out');
          //this is not working, why?
          this.$router.push('/');
        })
        .catch(error => {
          alert(error.message);
          this.$router.push('/');
        });
    },

    loginUser: (context) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          context.commit("loadUser", this.email)
          context.commit("toggleLoginBool")
          alert('Successfully logged in');
          this.$router.push('/yourhome');
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
