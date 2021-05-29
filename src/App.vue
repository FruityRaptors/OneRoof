<template>
  <v-app id="one-roof-app">
    
<!-- Nav drawer starts -->
    <v-navigation-drawer v-model="drawer" color="brown" app>

<!-- Navbar title start -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> OneRoof </v-list-item-title>
          <v-list-item-subtitle> Yamada Home </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
<!-- Nav bar title ends -->

      <v-divider></v-divider>

<!-- Navigation bar start -->
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
<!-- Navigation bar ends -->

    </v-navigation-drawer>
<!-- Nav drawer ends -->

<!-- App top bar start -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>OneRoof</v-toolbar-title>
      <section v-if="this.$store.state.isUserLoggedIn !== true" class="login-options">
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Reg</router-link>
      </section>
      <section v-else>
        <button @click="logout">Logout</button>
      </section>
    </v-app-bar>
<!-- App top bar ends -->

<!-- Main app component -->
    <v-main>

      <!-- Placeholder to test components -->
      <!-- Placeholder to test components -->
      <Chat />
        <router-view></router-view>

    </v-main>
<!-- Main app ends -->

  </v-app>
</template>


<script>
/* import firebase from "firebase"; */
// import Navbar from './components/Navbar.vue';
import Chat from "./views/chat"

export default {
  data: () => ({
    loginRerouteFlag: false,
    drawer: null,
    items: [
      { title: "Chat", icon: "mdi-view-dashboard", to: "/yourhome" }, //Use to: to link views
      { title: "To-do", icon: "mdi-format-list-checks", to: "/todo" },
    ],
  }),
  name: "App",
  components: {
    Chat
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    },
  },
};
</script>

<style>
  .login-options {
    right: 0;
    padding: 5px
  }
</style>
