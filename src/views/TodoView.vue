<template>
  <div v-if="this.$store.state.isUserLoggedIn !== true">
    <h1>Please click above to login or register!</h1>
  </div>
  <div v-else>
    <div class="todo-page" id="todo-page-container">
      <v-list two-line flat>
        <div id="todo-container" v-for="todo in todos" :key="todo.id">
          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active" color="green"> </v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ todo.todo }}</v-list-item-title>
                <v-list-item-subtitle>{{ todo.assignee }}</v-list-item-subtitle>
              </v-list-item-content>
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
      todos: [
        {
          id: 1,
          todo: "testing",
          assignee: "the id is 1",
        },
        {
          id: 2,
          todo: "testing FURTHER",
          assignee: "the id is 2",
        },
        {
          id: 3,
          todo: "testing EVEN FURTHER BEYOND",
          assignee: "the id is THREEEEEEE",
        },
      ],
    };
  },
  components: {
    //   TodoList,
  },
};
</script>