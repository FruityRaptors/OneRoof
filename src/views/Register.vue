<template>
  <v-app>

    

  <v-card class="mx-auto pa-5 mt-5 text-center brown lighten-5" width="300px" max-width="350">

    <v-img
        src="@/assets/OneRoof.png"
        width="300"
        contain
        class="mt-2 mr-3 pa-0"
    ></v-img>

    <v-card-title class="text-center d-flex justify-center">
      Welcome to Oneroof
    </v-card-title>

    <v-card-title class="text-center d-flex justify-center">
      Register
    </v-card-title>

    <v-text-field filled v-model="email" label="Email"></v-text-field>
    <v-text-field filled type="password" v-model="password" label="Password"></v-text-field>
    <v-text-field filled v-model="username" label="Username"></v-text-field>

    <v-btn @click="register">
      Register
    </v-btn>

    <v-container>
        <v-card-subtitle>
          Already have an account?
        </v-card-subtitle>
    </v-container>

    <v-btn block @click="$emit('emit')"> 
        Back to Login
    </v-btn>
  </v-card>
    
  </v-app>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      username: "",
    };
  },
  methods: {
    register() {
      let email = this.email.toLowerCase();
      let password = this.password;
      let username = this.username;
      this.$store.dispatch("registerUser", {email: email, password: password, username: username});
      this.email = "";
      this.password = "";
      this.username = ""
    },
  },
};
</script>

<style>
</style>