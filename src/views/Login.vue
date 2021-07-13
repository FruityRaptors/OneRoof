<template>
<v-card class="mx-auto text-center" width="95%" max-width="100%" color="orange lighten-5" elevation="0">

<v-card class="d-flex justify-center" color="orange lighten-5" elevation="0">
 <v-img
        src="@/assets/OneRoof.png"
        max-width="250"
        contain
        class="pa-0"
        ></v-img>
</v-card>
       
        
      <v-container>
        <v-card-title class="text-center d-flex justify-center">
           Login
        </v-card-title>
      </v-container>

      <v-text-field  filled  rounded label="Email" v-model="email"></v-text-field>
      <v-text-field filled rounded type="password" label="Password" v-model="password"></v-text-field>

      <v-btn class="text-center ma-2 pa-5 orange lighten-2 white--text" @click="login">
        Login
      </v-btn>

      <v-container>
        <v-card-subtitle>
          Don't have an account?
        </v-card-subtitle>
      </v-container>

      <v-btn block @click="$emit('emit')" class="orange lighten-2 white--text"> 
        Register
      </v-btn>
</v-card>

</template>

<script>

export default {
  name: "Login",
  data() {
    return {
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
