<template>
  <div> 
    <div class="todo-page" id="todo-page-container">

<!-- Add todo input field-->
         <v-text-field
            v-model="newTodoMessage"
            @click:append="addTodo"
            @keyup.enter="addTodo"
            class="pa-2"
            outlined
            label="New Todo"
            append-icon="mdi-pencil-plus-outline"
            color="black lighten-3"
            clearable
            hide-details
          >
          </v-text-field>
<!-- Add todo input field ends-->


<!-- todo list platform -->
      <v-list v-if="todos.length" class="pt-0" two-line flat>

<!-- Each Todo in Todo list -->
        <div id="todo-container" v-for="todo in todos" :key="todo.id">
          <v-list-item @click="completeTodo(todo.id)" :class="{ 'green lighten-4' : todo.complete }">
          
<!-- Todo tick box     -->
              <v-list-item-action>
                <v-checkbox :input-value="todo.complete" color="green"> </v-checkbox>
              </v-list-item-action>
<!-- Todo tick box ends -->


<!-- Todo list text -->
              <v-list-item-content>
                <v-list-item-title :class="{ 'text-decoration-line-through' : todo.complete}">
                    {{ todo.todo }}
                </v-list-item-title>

                <v-list-item-subtitle>
                {{ todo.victimid }}
                </v-list-item-subtitle>
              </v-list-item-content>
<!-- Todo list text ends -->
              

<!-- Delete Button -->
        <v-list-item-action class="">
          
            <v-icon 
            icon @click.stop="setState(todo)" 
            color="brown lighten-3">
            mdi-delete</v-icon>
          
<!-- Delete Button ends-->
<!-- Assignee Dropdown Starts -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
          <v-icon 
          class="pt-2"
          color="brown lighten-3"
          v-bind="attrs"
          v-on="on"
          >mdi-account-plus</v-icon>
      </template>
      <v-list>
        <v-list-item
          v-for="user in users"
          :key="user.id"
          :value="todo.id"
        >
          <v-list-item-title @click="setAssignee(user, todo.id)">
          {{ user.username }}
          </v-list-item-title>

        </v-list-item>
      </v-list>
    </v-menu>
    
        </v-list-item-action>
<!-- Assignee Dropdown Ends -->


          </v-list-item>
        </div>
<!-- Each Todo in Todo list ends-->

      </v-list>
<!-- todo list platform ends-->


<!-- No Todos if todo list is empty -->
      <div v-else>
        <div id="no-todo-bg">
          NO TODOS
        </div>
      </div>
    </div>
<!-- Delete Modal -->
          <DeleteModal v-if="modals.deleteTodo" :todo="currentId" @closeModal="modals.deleteTodo = false"  @clicked="deleteFromModal" />
  </div>
</template>

<script>
// import TodoList from '../components/TodoList.vue'
import DeleteModal from './Modals/DeleteModal.vue'

export default {
  name: "Home",
  props: ['todo'],
  components: {
    DeleteModal
  },
  data() {
    return {
      newTodoMessage: 'HERE I AM',
      stateTodo: this.$store.state.todos,
      todos: '',
      modals: {
        deleteTodo: false,
      },
      currentId: '',
      selectedVictim: '',
      users: [
        {id: 1, username: "bob", house_keys: "testkey"},
        {id: 2, username: "bobilly", house_keys: "testkey"},
        {id: 3, username: "ben", house_keys: "testkey"},
        {id: 4, username: "bboi", house_keys: "testkey"},
        {id: 5, username: "beef", house_keys: "testkey"}
        ]
    };
  },
 async mounted() {
   //here we need the house key
   await this.$store.dispatch("getTodos", this.$store.state.user.house_keys[0]);
   this.todos = this.$store.state.todos;  
  },
  methods: {
    async addTodo() {
        let newTodo = {
            // id: Date.now(), and maybe + random number? To ensure it would not match other IDs?
            todo: this.newTodoMessage,
            date: Date.now(),
            victimid: "everyone",
            creatorid: this.$store.state.user.username,
            complete: false,
            house_key: this.$store.state.user.house_keys[0]  //getting from user state
        }
        await this.$store.dispatch("addTodo", newTodo)
        this.todos.push(newTodo)
        this.newTodoMessage = 
        await this.$store.dispatch("getTodos", this.$store.state.user.house_keys[0]);
        this.todos = this.$store.state.todos;  
    },
    completeTodo(id) {
        let todo = this.todos.filter(todo => todo.id === id)[0]
        todo.complete = !todo.complete
    },
    async deleteTodo(id) {
        console.log("THIS IS THE ID",id)
        this.$store.state.todos = this.$store.state.filter(todo => todo.id !== id)
        this.todos = this.$store.state.todos
        await this.$store.dispatch("deleteTodo", id)
    },

    async setState(todo){
      console.log('abracadabra...', todo.id)
      this.modals.deleteTodo = true
      this.currentId = todo.id
    },
    deleteFromModal(){

      this.$store.dispatch('deleteTodo', this.currentId).then(() => {
      console.log("getting updated to do list...")
      this.$store.dispatch("getTodos", this.$store.state.user.house_keys[0])

      }).then(()=> {
        
        this.todos = this.$store.state.todos
  
      }).then(() => {

         this.todos = this.todos.filter((todo) => todo.id !== this.currentId)

      })
       
    },
    setAssignee(user, id){
      console.log(user)
      console.log(user.username)
      console.log(id)
      //todo.victimid = user.username
    }
  },
};
</script>