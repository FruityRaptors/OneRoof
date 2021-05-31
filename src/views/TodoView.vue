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
<!-- todo list -->
      <v-list v-if="todos.length" class="pt-0" two-line flat>
        <div id="todo-container" v-for="todo in todos" :key="todo.id">
          <v-list-item @click="completeTodo(todo.id)" :class="{ 'green lighten-4' : todo.complete }">
            <template v-slot:default>
              <v-list-item-action>
                <v-checkbox :input-value="todo.complete" color="green"> </v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title :class="{ 'text-decoration-line-through' : todo.complete}">
                    {{ todo.todo }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ todo.victimid }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
<!-- First Button. Currently does nothing -->
          <v-btn icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
<!-- Delete Button -->
          <v-btn icon @click.stop="setState(todo)" > 
            <v-icon color="brown lighten-3">mdi-delete-sweep-outline</v-icon>
          </v-btn>
        </v-list-item-action>
            </template>  
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
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
      todos: [],
      modals: {
        deleteTodo: false,
      },
      currentId: ''
    };
  },
 async mounted() {
   console.log("before await")
   await this.$store.dispatch("getTodos");
   this.todos = this.$store.state.todos;  
  },
  methods: {
    async addTodo() {
        let newTodo = {
            todo: this.newTodoMessage,
            date: Date.now(),
            victimid: "everyone",
            creatorid: this.$store.state.user.username,
            complete: false,
        }
        await this.$store.dispatch("addTodo", newTodo)
        this.newTodoMessage = 
        await this.$store.dispatch("getTodos");
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
    async deleteFromModal(){
      await this.$store.dispatch('deleteTodo', this.currentId)
      await this.$store.dispatch("getTodos")
      this.todos = this.$store.state.todos
    }
  },
};
</script>