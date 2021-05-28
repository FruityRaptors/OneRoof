import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router/index'
import axios from 'axios'
import keygen from 'keygenerator'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Current logged in User information
    user: {},
    isUserLoggedIn: false,
  },

  mutations: {
    setUser(state, user) {
      console.log('Mutating user state....')
      state.user = user;
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

  actions: {

///////
//User related actions starts
///////

//Fetches user and set user to front end state
getUser(context, email) {
      console.log(`Getting User: ${email} from the database...`)
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
            console.log(`fetched ${response.data.data.getUserByEmail}...`)

          //If fetched user belonged to a house, set user normally
          if(response.data.data.getUserByEmail.house_key){

            console.log(`User already belonged to chat room(s)... going to home page`)
            context.commit("setUser", response.data.data.getUserByEmail)
            router.push('/yourhome')

          } else {

            console.log(`User doesn't have a home... going to join a home page`)
            //if they don't belonged to any house.. should route to JOIN A HOUSE page
            context.commit("setUser", response.data.data.getUserByEmail)
            //Should route to Join a house page

          }
        });
      } catch (error) {
        console.log(`You got an ${error}`);
      }
    },

//Adds user to the database after they have registered
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

///////
//User related actions ends
///////



///////
//House related actions starts
///////

//Creating a new chat room + pushes it to the database + assigning it to the front end state
createHouse:(context, payload) => {
  let roomkey = keygen._()

      console.log(`Adding ${payload.homename} to database...`)
      axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `{
            mutation{
              createHouseWithName(house_name:"${payload.homename}", house_key:"${roomkey}")
            }
          }`
        }
      })
      console.log(`Assigning room to user: ${payload.email}`)
      try{
        axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `
        mutation{
        addToRoom(email:"${payload.email}", house_key:"${roomkey}")
        }`
        }
      })
      console.log(`User: ${payload.email} created and joined room... re-fetching user from database...`)
      context.dispatch("getUser", payload.email)
    } catch (err) {
      console.log(err)
      }
  },

  joinHouse:(context, payload) => {
    console.log(`Joining ${payload.email} to room ${payload.roomkey}`)

    axios({
      method: "POST",
      url: "/graphql",
      data: {
        query: `
      mutation{
      addToRoom(email:"${payload.email}", house_key:"${roomkey}")
      }`
      }
    })



  },

///////
//House related actions ends
///////




///////
//Todolist related actions starts
///////

placeholderFunction(context){
    console.log(context)
  },

///////
//Todolist related actions ends
///////




///////
//Firebase related actions starts
///////

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
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          context.commit("toggleLoginBool")

          console.log('Adding user to the database...')
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

////
//Firebase related action ends
////

  },

})
