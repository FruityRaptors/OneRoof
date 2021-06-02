<template>
    <v-card
    class="mx-auto pa-2 mt-5 brown lighten-5"
    width="344px" max-width="350"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{ this.username }}'s Profile 
        </div>
        <v-list-item-title class="text-h6 mb-1">
          House Name?
        </v-list-item-title>
        <v-list-item-subtitle>Bio? I like Oneroof :)</v-list-item-subtitle>
      </v-list-item-content>

      

      <v-list-item-avatar
        tile
        size="80">
        <Avatar :username="this.$store.state.user.username" :size="80"></Avatar>
      </v-list-item-avatar>
    </v-list-item>

    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Another section?
        </div>
        <v-list-item-title class="text-h6 mb-1">
          User Stat
        </v-list-item-title>
        <v-list-item-subtitle>Bio? I like Oneroof :)</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        @click="logout"
      >
        Logout
      </v-btn>
    <UpdateUser @setProfilePageUsername="changeUsername" />
    </v-card-actions>
  </v-card>
    
    <!-- <button @click="logout">Logout</button> -->
</template>

<script>
import Avatar from "vue-avatar";
import UpdateUser from "../components/UpdateUser";
export default {
  name: "Profile",
  data() {
    return {
      username: "",
      email: "",
    };
  },
  components: {
    UpdateUser,
    Avatar
  },

  mounted() {
    this.username = this.$store.state.user.username;
    this.email = this.$store.state.user.email;
  },

  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    },
    changeUsername(username) {
      this.username = username;
      this.$store.dispatch("changeUsername", { email: this.email, newUsername: username})
    },
  },
};
</script>
