import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth';
import router from '../router/index'
import axios from 'axios'
import keygen from 'keygenerator'
import utils from "../utils/utils"

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  state: {
    //Current logged in User information
    user: {},
    userTodoNotifications: 0,
    isUserLoggedIn: false,
    todos: [],
    chores: [],
    usersInSameHouse: [],
    houseName: '',
    currentTodo: {},
    currentTodoMessage: '',
    currentHouseModules: '',
    // areTodosLoaded: false, // add a way to change it to false
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setUsername(state, username) {
      state.user.username = username
    },

    resetUser(state) {
      state.user = {
        //Current logged in User information
        user: {},
        userTodoNotifications: 0,
        isUserLoggedIn: false,
        todos: [],
        chores: [],
        usersInSameHouse: [],
        houseName: '',
        currentTodo: {},
        currentTodoMessage: '',
        currentHouseModules: '',
        // areTodosLoaded: false, // add a way to change it to false
      }
    },

    setUserRGB(state, rgb) {
      state.user.userRGB = rgb
    },

    toggleLoginBool(state, payload) {
      if (payload) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = !state.isUserLoggedIn
      }
    },

    addTodosToList(state, todos) {
      state.todos = todos
    },

    populateUsersInSameHouse(state, users) {
      state.usersInSameHouse = users
    },

    setTodoNotifications(state, notifications) {
      state.userTodoNotifications = notifications
    },

    resetTodoNotifications(state) {
      state.userTodoNotifications = 0
    },

    setHouseName(state, name) {
      state.houseName = name
    },

    setChores(state, chores) {
      state.chores = chores
    },

    resetChorelist(state) {
      state.chores = []
    },

    setCurrentTodo(state, todo) {
      state.currentTodo = todo
    },
    setCurrentTodoMessage(state, message) {
      state.currentTodoMessage = message
    },
    setCurrentHouseModules(state, modules) {
      state.currentHouseModules = modules
    }
  },

  actions: {

    ///////
    //User related actions start
    ///////

    //Fetches user and set user to front end state
    async getUser(context, email) {
      console.log(`Getting User: ${email} from the database...`)
      try {
        await axios({
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
                photo_url
               }
              }`
          }
        }).then((response) => {
          
          context.commit("setUser", response.data.data.getUserByEmail)
          //If fetched user belonged to a house, set user normally
          if (response.data.data.getUserByEmail.house_keys) {
            let housekey = JSON.parse(response.data.data.getUserByEmail.house_keys)
            context.dispatch('getHouseName', housekey[0])
            context.commit("toggleLoginBool", "true")
            response.data.data.getUserByEmail.house_keys = housekey
            console.log(`User already belonged to chat room(s)... going to home page`)
            // router.push('/yourhome')
          } else {
            console.log(`User doesn't have a home... going to join a home page`)
            context.commit("toggleLoginBool", "true")
            //Should route to Join a house page, THE FOLLOWING LINE SHOULD BE DELETED!
            router.push('/joinhouse')
          }
        });
      } catch (error) {
        console.log(error)
        return
      }
      
    },

    //Adds user to the database after they have registered
    async addUserToSQLDatabase(context, user) {
      let email = user.email
      console.log(`adding ${user.email} ${user.username} to database...`)

      await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `
          mutation{
          createUser(email:"${user.email}", username: "${user.username}", isAdmin: false )
          }`
        }
      }).then(() => {
        context.dispatch("getUser", email)
      });
    },

    async changeUsername(context, user) {
      let email = user.email
      let newUsername = user.newUsername
      console.log(`changing user: ${email}'s username to ${newUsername}`)
      await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `
          mutation{
          updateUsername(email:"${email}", newUsername: "${newUsername}", )
          }`
        }
      }).then(() => {
        context.dispatch("getUser", email)
        context.commit("setUsername", newUsername)
      });
    },

    async updateUserPhoto(context, data) {
      console.log("here is the URL", data.url, "and here is the email", data.email)
      await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `
            mutation{
              updateUserPhoto(email: "${data.email}", photo_url: "${data.url}")
            }`
        }
      }).then(() => {
        context.dispatch("getUser", data.email)
      });
    },

    ///////
    //User related actions ends
    ///////

    ///////
    //House related actions start
    ///////

    //Creating a new chat room + pushes it to the database + assigning it to the front end state
    async createHouse(context, payload) {
      let roomkey = keygen._()

      console.log(`Adding ${payload.homename} to database... with the key ${roomkey}`)
      await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `
            mutation{
              createHouseWithName(house_name:"${payload.homename}", house_key:"${roomkey}")
            }`
        }
      }).then(() => {
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

      }).then(() => {
        console.log(`User: ${payload.email} created and joined room... re-fetching user from database...`)
        context.dispatch("getUser", payload.email)
      })
    },

    joinHouse(context, payload) {
      console.log(`Joining ${payload.email} to room ${payload.roomkey}`)

      //Check if house exists in the database
      let checkExists = axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `{
            getHouseName(house_key:"${payload.roomkey}"){
              house_key
              house_name
            }
        }`
        }
      }).then(() => {
        console.log('Adding to home!')
        //If so, add to the user
        if (checkExists) {
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
        } else {
          alert('House Key error!')
        }
      }).then(() => {
        context.dispatch("getUser", payload.email)
      })
    },

    async getHouseName(context, payload) {
      await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `
          {
            getHouseName(house_key:"${payload}"){
              house_name
              modules
            }
          }
          `
        }
      }).then((response) => {
        return JSON.parse(response.data.data.getHouseName.modules)
        
      }).then((response) => {
        context.commit('setCurrentHouseModules', response)
      })
    },

    ///////
    //House related actions ends
    ///////

    ///////
    //Todolist related actions starts
    ///////
    getTodos(context, house_key) {
      console.log(`Getting Todos By House...`)
      try {
        axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `
            {
              getTodosByHouse(house_key:"${house_key}"){
                id
                creatorid
                victimid
                todo
                date
                complete
                house_key
              }
            }`
          }
        })
          .then((response) => {
            console.log("Received todos from server...")
            let todosByHouse = response.data.data.getTodosByHouse
            context.commit("addTodosToList", todosByHouse)
            return todosByHouse
            }).then((todosByHouse) => {

                context.commit("resetTodoNotifications")
                return todosByHouse
                    }).then((todosByHouse) => {

                        let notifications = 0
                        for (let todo of todosByHouse) {
                          if (todo.victimid === this.state.user.username) {
                            notifications++
                          }
                        }
                         context.commit("setTodoNotifications", notifications)
                        })
      } catch (error) {
        console.log("No user is logged in")
        return
      }
    },

    async deleteTodo(context, id) {
      console.log(`Deleting Todo with ${id}`)
      try {
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `
            mutation{
              deleteTodo(id:${id})
            }`
          }
        })
          .then(() => {
            console.log('Todo deleted')
            context.dispatch('getTodos', this.state.user.house_keys[0])
          })
      } catch (error) {
        console.log("This is your error", error)
      }
    },

    async updateTodo(context, todo) {
      console.log(`UPDATING TODO ${todo.id} & ${todo.todo}`)
      try {
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `
            mutation {
              updateTodoMessage(id:${todo.id}, todo:"${todo.todo}")
            }`
          }
        }).then(() => {
          console.log("TODO UPDATED")
        })
      } catch (error) {
        console.log("This is your error", error)
      }
    },

    async addTodo(context, newTodo) {
      console.log('Adding a todo to database')
      try {
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `
          mutation {
            createTodo(
              todo: "${newTodo.todo}", 
              date: "${newTodo.date}",
              victimid: "${newTodo.victimid}",
              creatorid: "${newTodo.creatorid}",
              complete: ${newTodo.complete},
              house_key: "${newTodo.house_key}",
            )
          }`
          }
        })
      } catch (error) {
        console.log("This is your error", error)
      }
    },

    // I changed this, maybe didn't need to. Jay didn't like it ;)
    populateVictimList(context, house_key) {
      console.log(`Chasing victims in ${house_key}`)
      axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `
      {
        getUsersByHousekey(house_keys:"${house_key}"){
          username
          id
        }
      }
      `
        }
      }).then((response) => {
        context.commit('populateUsersInSameHouse', response.data.data.getUsersByHousekey)
      })
    },

    updateTodoVictim(context, selectedTodo) {
      console.log('Attemping to update VictimID', selectedTodo)
      axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `
        mutation{
          updateTodoVictim(
            id: ${selectedTodo.id},
            victimid: "${selectedTodo.victimid}"
          )
        }`
        }
      }).then(() => {
        context.dispatch('getTodos', selectedTodo.house_key)
      })
    },

    ///////
    //Todolist related actions end
    ///////

    ///////
    //DM related actions start
    ///////
    async checkDmTarget(context, users){
      console.log(users)
      let checkIfAlreadyChatted = await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `
          {
            checkIfInSameDm(
              userid1:"${users.username_1}",
              userid2:"${users.username_2}"
            ){
              dm_key
            }
          }
          `
        }
      })

      if (checkIfAlreadyChatted.data.data){
        return checkIfAlreadyChatted.data.data.checkIfInSameDm.dm_key
      } 
      
      else  {
        let roomkey = keygen._()

        console.log(users, roomkey)

        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `
               mutation{
                 addUsersToChat(
                    userid1:"${users.username_1}",
                    userid2:"${users.username_2}",
                    dm_key:"${roomkey}")
                    }`
                }})
      
         
        let result = await axios({
            method: "POST",
            url: "/graphql",
            data: {
              query: `
              {
                checkIfInSameDm(
                  userid1:"${users.username_1}",
                  userid2:"${users.username_2}"
                ){
                  dm_key
                }
              }
              `
            }
          })

          console.log(result)

          return result.data.data.checkIfInSameDm.dm_key

        }
      },
    ///////
    //DM related actions end
    ///////



//////
//Chores related actions start
//////
    async getChores(context, house_key) {
      console.log(`Getting Chores By House...`, house_key)
      try {
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `
            {
              getChoresByHouse(house_key:"1Ubwo8IMWZqrT9Yb2jb8wq4bgPZUg7GQ"){
                id
                creatorid
                assignee
                chore
                description
                house_key
              }
            }`
          }
        })
          .then((response) => {
            let choresByHouse = response.data.data.getChoresByHouse
            console.log("Received chores from server...", choresByHouse)
            context.commit("setChores", choresByHouse)
          })
      } catch (error) {
        console.log("No user is logged in or house key not recognized")
        return
      }
    },

    async addNewChore(context, newChore) {
      console.log('Adding a chore to database:', newChore)
      try {
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `
          mutation {
            createChore(
              chore: "${newChore.chore}", 
              description: "${newChore.description}",
              assignee: "${newChore.assignee}",
              creatorid: "${newChore.creatorid}",
              house_key: "${newChore.house_key}",
            )
          }`
          }
        })
        .then(() => {})
      } catch (error) {
        console.log("This is your error", error)
      }
    },

    async updateChore(context, chore) {
      console.log(`Updating chore number ${chore.id}'s assignee to ${chore.newAssignee}`)
      try {
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `
            mutation {
              updateChoreAssignee(id:${chore.id}, newAssignee:"${chore.newAssignee}")
            }`
          }
        }).then(() => {
          console.log("CHORE UPDATED")
        })
      } catch (error) {
        console.log("This is your error", error)
      }
    },

    async deleteChore(context, id) {
      console.log(`Deleting Chore with ID: ${id}`)
      try {
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `
            mutation{
              deleteChore(id:${id})
            }`
          }
        })
          .then(() => {
            console.log('Chore deleted')
            context.dispatch('getChores', this.state.user.house_keys[0])
          })
      } catch (error) {
        console.log("This is your error", error)
      }
    },

    ///////
    //Chores related actions end
    ///////

    

    ///////
    //Firebase related actions start
    ///////

    async loginUser(context, user) {
      await firebase
        .auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
              context.dispatch("getUser", user.email)
            }).then(()=> {
              router.push('/yourhome')
            })
            .catch(error => {
              alert(error.message);
            });
        })
        .catch(error => {
          alert(error.message);
        });
    },

    async registerUser(context, user) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          console.log('Adding user to the database...')
          //Add user to Database
          context.dispatch("addUserToSQLDatabase", { email: user.email, username: user.username })
        })
        .catch(error => {
          alert(error.message);
        });
    },

    async logoutUser(context) {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logging out user")
          }).then(() => {
            context.commit("resetUser")
            context.commit("toggleLoginBool")
            router.push('/');
          })
        .catch(error => {
          alert(error.message);
          router.push('/');
        });
    },

    async checkIfLoggedInUser(context) {
      const user = await firebase.auth().currentUser
      if (user) {
        await context.dispatch("getUser", user.email)
        return true
      } else {
        console.log("no user, pushing to login")
        router.push('/login')
        return false
      }
    },

    ////
    //Firebase related actions end
    ////


    calculateUserRGB(context, username) {
      context.commit("setUserRGB", utils.intToRGB(utils.hashCode(username)))
    },
  },
})
