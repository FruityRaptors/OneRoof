<template>
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
                <v-list-item-subtitle>{{ todo.victimid }}</v-list-item-subtitle>
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
      todos: [],
    };
  },
  mounted() {
    this.todos = this.$store.state.todos
    this.$store.dispatch("getTodos")
  },
  methods: {
    addTodo() {
        let newTodo = {
            id: Date.now(),
            todo: this.newTodoMessage,
            assignee: "Gotta get from database",
            complete: false,
        }
        this.$store.state.todos.push(newTodo) //send to state?
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