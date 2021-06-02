<template>
  <div class="text-center" v-if="this.loading == true">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>

  <v-container v-else-if="this.$store.state.isUserLoggedIn == false">
    <v-container>
    <Login @emit="toggleRegLog" v-if="this.login === true" />
    <Register @emit="toggleRegLog" v-if="this.login === false" />
    </v-container>
   
  </v-container>

  <v-app v-else id="one-roof-app">
    <!-- Nav drawer starts -->
    <v-navigation-drawer v-model="drawer" color="brown lighten-4" app>
      <!-- Navbar title start -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="pt-3 white--text font-weight-thin"> OneRoof </v-list-item-title>
          <v-list-item-subtitle> Yamada Home </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- Nav bar title ends -->

      <v-divider></v-divider>

      <!-- Navigation bar start -->
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-badge
            :content="item.notifications"
            :value="item.notifications"
            color="red"
            offset-x="40"
            offset-y="40"
            overlap
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-badge>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- Navigation bar ends -->
    </v-navigation-drawer>
    <!-- Nav drawer ends -->

    <!-- App top bar start -->
    <v-app-bar 
    app
    color="brown lighten-4"
    class="pa-0"
    >

    <v-container
      class="d-flex justify-space-between pl-0 ml-0"
      
      >
      <v-badge
        :content="this.allNotifications"
        :value="this.allNotifications"
        color="red"
        offset-x="20"
        offset-y="50"
        overlap
        ><v-app-bar-nav-icon
         @click="drawer = !drawer"
         class="mr-0"
         >
          
         </v-app-bar-nav-icon
      ></v-badge>

      <!-- <v-toolbar-title
      class="pt-3 white--text font-weight-thin"
      >
        OneRoof
      </v-toolbar-title> -->

      <v-img
        src="@/assets/placeholder_logo.png"
        height="30"
        width="10"
        contain
        class="mt-3 mr-3"
      >

      </v-img>

   
      <router-link to="/profile">
          <v-icon
          class="pt-3"
          >
          mdi-account-circle-outline
          </v-icon>
      </router-link>
    </v-container>

    </v-app-bar>
    <!-- App top bar ends -->

    <!-- Main app component -->
    <v-main>
      <!-- Placeholder to test components -->
      <!-- Placeholder to test components -->
      <router-view></router-view>
    </v-main>
    <!-- Main app ends -->
  </v-app>
</template>


<script>
import Login from "./views/Login.vue";
import Register from "./views/Register";

export default {
  data: () => ({
    drawer: null,
    items: [
      {
        title: "Chat",
        icon: "mdi-chat",
        to: "/yourhome",
        notifications: 0,
      }, //Use to: to link views
      {
        title: "To-do",
        icon: "mdi-format-list-checks",
        to: "/todo",
        notifications: 0,
      },
    ],
    allNotifications: 0,
    login: true,
    loading: true,
  }),
  name: "App",
  components: {
    Login,
    Register,
  },
  methods: {
    toggleRegLog() {
      this.login = !this.login;
    },
  },
  async mounted() {
    console.log("app mounting")
    this.loading = true;
    let checker = await this.$store.dispatch("checkIfLoggedInUser");
    if(checker) {
      await this.$store.dispatch("getTodos", this.$store.state.user.house_keys[0])
      await this.$store.dispatch("populateVictimList", this.$store.state.user.house_keys[0]);
      //await get all messages for general chat
      this.allNotifications = 0;
      this.items[1].notifications = this.$store.state.userTodoNotifications;
      for (let item of this.items) {
        this.allNotifications += item.notifications;
      }
    }
    this.loading = false;
  },
  computed: {
    countNotifications() {
      return this.$store.state.userTodoNotifications;
    },
  },
  watch: {
    countNotifications(newCount) {
      this.items[1].notifications = newCount;
      console.log(this.items[1].notifications);
      this.allNotifications = 0;
      for (let item of this.items) {
        this.allNotifications += item.notifications;
      }
    },
  },
};
</script>

<style>

</style>
