<template>
  <v-card class="text-center" v-if="this.loading == true">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-card>

  <v-app v-else-if="this.$store.state.isUserLoggedIn == false">
    <v-container class="orange lighten-5 fill-height">
       <Login @emit="toggleRegLog" v-if="this.login === true" />
       <Register @emit="toggleRegLog" v-if="this.login === false" />
    </v-container>
      
  </v-app>

  <v-app v-else id="one-roof-app">
    <!-- Nav drawer starts -->
    <v-navigation-drawer
      v-model="drawer"
      color="orange lighten-4"
      width="185"
      app
    >
      <!-- Navbar title start -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="pt-3 font-weight-bold">
            OneRoof
          </v-list-item-title>
          <v-list-item-subtitle>
            {{this.$store.state.houseName}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- Nav bar title ends -->

      <v-divider></v-divider>

      <!-- Navigation bar start -->
      <v-list v-for="value in items" :key="value.title" :to="value.to" dense nav>
        <v-list-item v-if="value.purchased" link>
          <v-badge
            :content="value.notifications"
            :value="value.notifications"
            color="orange darken-4"
            offset-x="40"
            offset-y="40"
            overlap
          >
            <v-list-item-icon>
              <v-icon color="brown lighten-1">{{ value.icon }}</v-icon>
            </v-list-item-icon>
          </v-badge>
          <v-list-item-content>
            <v-list-item-title>{{ value.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- Navigation bar ends -->
    </v-navigation-drawer>
    <!-- Nav drawer ends -->

    <!-- App top bar start -->
    <v-app-bar app color="orange lighten-4">
      <v-container class="d-flex justify-space-between pl-0 ml-0">
        <v-badge
          :content="this.allNotifications"
          :value="this.allNotifications"
          color="red"
          offset-x="28"
          offset-y="50"
          overlap
          ><v-app-bar-nav-icon @click="drawer = !drawer" class="mr-0 pt-4 pr-6">
          </v-app-bar-nav-icon
        ></v-badge>

        <!-- <v-toolbar-title
      class="pt-3 white--text font-weight-thin"
      >
        OneRoof
      </v-toolbar-title> -->

        <v-img
          src="@/assets/OneRoof.png"
          height="50"
          width="20"
          contain
          class="mt-2 mr-3 pa-0"
        >
        </v-img>

        <router-link style="text-decoration: none" to="/profile">
          <v-icon class="pt-5" color="brown lighten-1">
            mdi-account-circle-outline
          </v-icon>
        </router-link>
      </v-container>
    </v-app-bar>
    <!-- App top bar ends -->

    <!-- Main app component -->
    <v-main class="orange lighten-5">
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
    houseName: "",
    items: '', 
    allNotifications: 0,
    loggedInFlag: false,
    login: true,
    loading: true,
  }), // data ends

  name: "App", //Name Ends

  components: {
    Login,
    Register,
  }, // components ends

  methods: {
    toggleRegLog() {
      this.login = !this.login;
    },
    async appSetUp(){

      let loggedInFlag = await this.$store.dispatch("checkIfLoggedInUser")

      if (loggedInFlag !== false){
        let house_key = this.$store.state.user.house_keys[0]

        await this.$store.dispatch("getTodos", house_key);
        await this.$store.dispatch("populateVictimList", house_key);
        await this.$store.dispatch("getChores", house_key);

        this.items = this.$store.state.currentHouseModules
      }
    },
  }, //Method ends

  async mounted() {

    console.time("app mounting");

    this.loading = true;

    await this.appSetUp()

    //Setting notifications
    this.items.todo.notifications = this.$store.state.userTodoNotifications;
        for (let item in this.items) {
            this.allNotifications += this.items[item].notifications;
        }
    //Setting notifications

    console.timeEnd("app mounting");
    this.loading = false;

     
  }, //mounted ends

  computed: {
    countNotifications() {
      return this.$store.state.userTodoNotifications;
    },
  }, //computed ends

  watch: {
    countNotifications(newCount) {
      this.items['todo'].notifications = newCount;
      this.allNotifications = 0;
      for (let item in this.items) {
        this.allNotifications += this.items[item].notifications;
      }
    },
  }, //watch ends

};
</script>

<style>
body {
  background-color: tan;
}
</style>
