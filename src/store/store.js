import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: "",
      email: "",
      /* avatar_url: "", */
    },
    isUserLoggedIn: false
  },
  mutations: {
  },
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
  },
  modules: {
  }
})
