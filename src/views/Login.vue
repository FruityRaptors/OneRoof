<template>
<v-card max-width="80%">
  
      <v-container>
      <v-card-title class="text-center">
        Login
      </v-card-title>
      </v-container>

      <v-text-field  label="Username" v-model="email"></v-text-field>
      <v-text-field label="Password" v-model="password"></v-text-field>

      <v-btn class="text-center" @click="login">
        Login
      </v-btn>

</v-card>

</template>

<script>
/* import firebase from "firebase"; */

export default {
  name: "Login",
  data() {
    return {
      // not sure if either of these are necessary yet
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      this.$store.dispatch("loginUser", { email, password })
    },
  },
};
</script>

<style>
</style>
