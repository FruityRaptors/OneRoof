<template>
    <v-card
    class="mx-auto pa-2 mt-5 orange lighten-4"
     max-width="95%"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="title mt-6  font-weight-bold">
          {{ this.username }}'s Profile 
        </v-list-item-title>
        <v-list-item-title >{{this.houseName}}</v-list-item-title>

   
      </v-list-item-content>

      

      


        <v-avatar size="83" class="mb-3" >
                <Avatar v-if="!this.$store.state.user.photo_url" :username="this.$store.state.user.username" :size="83"></Avatar>
                <v-img v-else :src="this.$store.state.user.photo_url"></v-img>
        </v-avatar>
  
    </v-list-item>

       <v-divider></v-divider>
      
      <v-card class="text-center orange lighten-4 pa-3 mb-3" elevation="0">
       <v-list-item-subtitle class="font-weight-bold mt-4  d-flex justify-center title ">
          Invite people to your home!
        </v-list-item-subtitle>

        <v-btn
            label="House Code"
            class="mt-3 black--text"
            @click="copyText"
            color="orange lighten-2"
            block
            rounded
          > Copy House Key</v-btn>

          <v-list-item-subtitle class="mt-3 mb-3 font-weight-bold">
          Or.. Manually copy housekey
          </v-list-item-subtitle>

          <v-text-field
            solo-inverted
            dense
            readonly
            :value="$store.state.user.house_keys[0]"
          ></v-text-field>

          <v-snackbar v-model="snackbar" timeout="2000">
      Copied to Clipboard!
      </v-snackbar>
      
      </v-card>
       
         <v-divider></v-divider>

    <v-card class="d-flex justify-center orange lighten-4" elevation="0">
        <v-list-item-subtitle class="font-weight-bold mt-4  d-flex justify-center">
          Personal Info
        </v-list-item-subtitle>
    </v-card>
    

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-subtitle class="font-weight-bold mb-2 text--primary">
          Username
        </v-list-item-subtitle>
        <v-list-item-subtitle class="font-weight-normal pl-4 text--primary">{{this.username}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item two-line>
      <v-list-item-content>

        <v-list-item-subtitle class=" font-weight-bold mb-2 text--primary">
          Email
        </v-list-item-subtitle>
        <v-list-item-subtitle class="font-weight-normal pl-4 text--primary">{{this.email}}</v-list-item-subtitle>

      </v-list-item-content>
    </v-list-item>
    
    <v-card class="mt-2 mb-2 d-flex justify-space-between orange lighten-4" elevation="0">

      <UpdateUser @setProfilePageUsername="changeUsername" />
      <UpdatePhoto />

    </v-card>



    <v-divider></v-divider>
    <v-card class="d-flex justify-center mt-3 mb-2" elevation="0" color="orange lighten-4">
     <v-btn
        outlined
        rounded
        text
        class="pa-4 red darken-4 white--text"
        elevation="3"
        block
        @click="logout"
      >
        Logout
      </v-btn>
    </v-card>
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
      snackbar: false,
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
    this.houseName = this.$store.state.houseName;
  },

  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    },
    changeUsername(username) {
      this.username = username;
      this.$store.dispatch("changeUsername", { email: this.email, newUsername: username })
    },
    copyText() {
      this.snackbar = true
      console.log(this.$store.state.user.house_keys[0])
      navigator.clipboard.writeText(this.$store.state.user.house_keys[0])
        }
  },
};
</script>


<style scoped>
</style>