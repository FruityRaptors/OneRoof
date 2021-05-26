<template>
  <div id="app">
    <div class="nav">
      <Navbar />
    </div>
    <div class="auth-request-page">
      <router-view />
    </div>
    
  </div>
</template>

<script>
import firebase from 'firebase'
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  },

  methods: {
  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert('Successfully logged out');
        this.$router.push('/');
      })
      .catch(error => {
        alert(error.message);
        this.$router.push('/');
      });
  },
},
}

</script>


<style>
input {
  margin-right: 20px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  padding: 30px;
  background-color:yellow;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
