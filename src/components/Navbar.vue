<template>
  <div class="navbar">
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register you dummy</router-link> |
    <router-link to="/yourhome">Your Home</router-link> |
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    loggedInState() {
      return this.$store.state.isUserLoggedIn;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser")
    }
  }
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
