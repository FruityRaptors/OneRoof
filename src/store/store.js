import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router/index'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // global state, yo!
  state: {
    //Current logged in User information
    user: {},
    isUserLoggedIn: false,
  },

  //mutations obv mutate shit
  mutations: {
    setUser(state, user) {
      console.log('setting user state....')
      state.user = user;
      console.log(state.user.email)
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
    },
  },
  // Here be yer actions
  actions: {
    getUser(context, email) {
      console.log('fetching user from database...', email)
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
              house_keys
              email
             }
            }`
          }
        }).then((response) => {
          console.log(response)
          //If fetched user belonged to a house, set user normally
          if(response.data.data.getUserByEmail.house_key){
            context.commit("setUser", response.data.data.getUserByEmail)
            router.push('/yourhome')
          } else {
            console.log(response.data.data.getUserByEmail)
            //if they don't belonged to any house.. should route to JOIN A HOUSE page
            context.commit("setUser", response.data.data.getUserByEmail)
            //Should route to Join a house page
          }
        });
      } catch (error) {
        console.log(`You got an ${error}`);
      }
    },

    addUserToSQLDatabase(context, user) {
      console.log('fetching user from database...')
      try {
        axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `
          mutation{
          createUser(email:"${user.email}", username: "${user.username}", isAdmin: false )
          }`
          }
        }).then((response, user) => {
          console.log("🔥 When this goes through we're in great shape! 🔥  ", response, user)
          //User should be added and now we will fetch the user from our Database...
          context.dispatch("getUser", response.data.data.createUser)
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
        })
        .catch(error => {
          alert(error.message);
        });
    },

    registerUser: (context, user) => {
      console.log(user)
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          context.commit("toggleLoginBool")
          //Add user to Database
          context.dispatch("addUserToSQLDatabase", user)
            .then(() => {
              //this should instead route user to JOIN A HOUSE page
              router.push('/yourhome')
              alert('Successfully registered!');
            })
        })
        .catch(error => {
          alert(error.message);
        });
    },

    joinChatRoom:(context, payload) => {
      console.log(payload)
      try{
        axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `
        mutation{
        addToRoom(email:"${payload.email}", house_key:"${payload.roomkey}")
        }`
        }
      })
      console.log('success!')
      context.dispatch("getUser", payload.email)
    } catch (err) {
      console.log(err)
    }
    }




  },

})
