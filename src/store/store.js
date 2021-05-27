import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    user: {
      username: "",
      email: "",
      /* avatar_url: "", */
    },
    isUserLoggedIn: false
  },

  methods: {
    async getUsers() {
try {
  const result = await axios({
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
  this.users
}
    }


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
