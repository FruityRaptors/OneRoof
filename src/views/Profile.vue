<template>
    <v-card
    class="mx-auto pa-2 mt-5 orange lighten-4"
    width="344px" max-width="350"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4 text-decoration-underline">
          {{ this.username }}'s Profile 
        </div>
        <v-list-item-title class="text-h6 mb-1">
          House Name
        </v-list-item-title>
        <v-list-item-subtitle class="font-weight-bold">this.houseName</v-list-item-subtitle>
      </v-list-item-content>

      

      <v-list-item-avatar
        rounded="circle"
        size="83">
        <Avatar :src="this.$store.state.user.photo_url" :username="this.$store.state.user.username" :size="80"></Avatar>
      </v-list-item-avatar>
    </v-list-item>

    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-2 text-decoration-underline">
          Personal Info
        </div>
        <v-list-item-title class="text-h6 mb-2">
          Username
        </v-list-item-title>
        <v-list-item-subtitle class="font-weight-bold">{{this.username}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h6 mb-2">
          Email
        </v-list-item-title>
        <v-list-item-subtitle class="font-weight-bold">{{this.email}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item class="mt-2 mb-2">
      <UpdateUser @setProfilePageUsername="changeUsername" />
    </v-list-item>
  
    <v-list-item class="d-flex justify-center mb-2 mt-1">
    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        class="button"
        @click="logout"
      >
        Logout
      </v-btn>
    <UpdatePhoto class="button" />
    </v-card-actions>
    </v-list-item>
  </v-card>
    
    <!-- <button @click="logout">Logout</button> -->
</template>

<script>
import Avatar from "vue-avatar";
import UpdateUser from "../components/UpdateUser";
import UpdatePhoto from "../components/UpdatePhoto";
export default {
  name: "Profile",
  data() {
    return {
      username: "",
      email: "",
      houseName: "",
    };
  },
  components: {
    UpdateUser,
    Avatar,
    UpdatePhoto,
  },

  mounted() {
    this.username = this.$store.state.user.username;
    this.email = this.$store.state.user.email;
    // this.houseName = this.$store.state.houseName;
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


<style scoped>
  .button{
    padding: 20px
  }
</style>