<template>
  <!-- <div v-if="this.$store.state.isUserLoggedIn !== true">
    <h1>Please click above to login or register!</h1>
  </div>  add v-else to line 5--->
  <div> 
    <div class="todo-page" id="todo-page-container">
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
          ></v-text-field>
      <v-list class="pt-0" two-line flat>
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
                <v-list-item-subtitle>{{ todo.assignee }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
          <v-btn icon @click.stop="deleteTodo(todo.id)">
            <v-icon color="brown lighten-3">mdi-delete-sweep-outline</v-icon>
          </v-btn>
        </v-list-item-action>
            </template>  
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </div>
  </div>
</template>

<script>
// import TodoList from '../components/TodoList.vue'

export default {
  name: "Home",
  data() {
    return {
      newTodoMessage: '',
      todos: [
        // {
        //   id: 1,
        //   todo: "testing",
        //   assignee: "the id is 1",
        //   complete: false,
        // },
        // {
        //   id: 2,
        //   todo: "testing FURTHER",
        //   assignee: "the id is 2",
        //   complete: false,
        // },
        // {
        //   id: 3,
        //   todo: "testing EVEN FURTHER BEYOND",
        //   assignee: "the id is THREEEEEEE",
        //   complete: false,
        // },
      ],
    };
  },
  methods: {
    addTodo() {
        let newTodo = {
            id: Date.now(),
            todo: this.newTodoMessage,
            assignee: "Gotta get from database",
            complete: false,
        }
        this.todos.push(newTodo)
        this.newTodoMessage = ''
    },
    completeTodo(id) {
        let todo = this.todos.filter(todo => todo.id === id)[0]
        todo.complete = !todo.complete
    },
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }
  },
};
</script>