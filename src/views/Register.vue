<template>
  <v-card class="mx-auto pa-5 text-center orange lighten-5" width="95%" max-width="350" elevation="5">

    <v-img
        src="@/assets/OneRoof.png"
        width="300"
        contain
        class="mt-2 ml-1 pa-0"
    ></v-img>

    <v-card-title class="text-center d-flex justify-center">
      Welcome to Oneroof
    </v-card-title>

    <v-card-title class="text-center d-flex justify-center">
      Register
    </v-card-title>

    <v-text-field filled rounded dense v-model="email" label="Email"></v-text-field>
    <v-text-field filled rounded dense type="password" v-model="password" label="Password"></v-text-field>
    <v-text-field filled rounded dense type="password" v-model="passwordConfirm" label="Confirm Password" :rules="[formRules.samePass]"></v-text-field>
    <v-text-field filled rounded dense v-model="username" label="Username" hint="What do your housemates call you?"></v-text-field>

    <v-btn @click="register" class="orange lighten-2 white--text">
      Register
    </v-btn>

    <v-container>
        <v-card-subtitle>
          Already have an account?
        </v-card-subtitle>
    </v-container>

    <v-btn block @click="$emit('emit')" class="orange lighten-2 white--text"> 
        Back to Login
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
      passwordConfirm: "",
      formRules: {
        samePass: v => v === this.password || 'Passwords do not match'
      }
    };
  },
  methods: {
    register() {
      if (this.password !== this.passwordConfirm){
        window.alert('Passwords do not match')
        return
      }

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