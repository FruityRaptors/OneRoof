<template>
  <v-card>
    <v-card-title>
      Register
    </v-card-title>

    <v-text-field v-model="email" label="Email"></v-text-field>
    <v-text-field v-model="password" label="Password"></v-text-field>
    <v-text-field v-model="username" label="Username"></v-text-field>

    <v-btn @click="register">
      Register
    </v-btn>
    
  </v-card>
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
    },
  },
};
</script>

<style>
</style>