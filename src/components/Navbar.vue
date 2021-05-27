<template>
  <div class="navbar">
    <div v-if="loggedInState !== true">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register you dummy</router-link> |
      <router-link to="/yourhome">Your Home</router-link>
    </div>
    <div v-else>
      <p>Welcome {{this.user.email}}</p>
      <router-link to="/yourhome">Your Home</router-link> |
      <button @click="logout">Logout</button>
    </div>
  <todo-list />
  </div>
</template>

<script>
import TodoList from './TodoList.vue';

export default {
  name: "Navbar",
  components: { 
  TodoList
  },
  computed: {
    loggedInState() {
      return this.$store.state.isUserLoggedIn;
    },
    user() {
      return this.$store.state.user;
    },
    users() {
      return this.$store.state.users;
    }
  },
  mounted() {
    this.populateUsers()
  },
 /*  mounted(){
    this.$store.dispatch("getUsers")
    console.log(this.$store.state.users)
  }, */
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    },
    populateUsers() {
      this.$store.dispatch("getUsers")
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
