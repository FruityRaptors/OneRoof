<template>
  <v-app id="one-roof-app">
   <v-navigation-drawer 
   v-model="drawer"
   app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            OneRoof
          </v-list-item-title>
          <v-list-item-subtitle>
            Yamada Home
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>OneRoof</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script>
import firebase from 'firebase';
// import Navbar from './components/Navbar.vue';

export default {
  data: () => ({
      drawer: null,
      items: [
          { title: 'Chat', icon: 'mdi-view-dashboard', to: '/yourhome' }, //Use to: to link views
          { title: 'To-do', icon: 'mdi-format-list-checks', to: '/todo'}, 
      ]
    }),
  name: 'App',
  components: {
    // Navbar 
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
