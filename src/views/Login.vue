<template>
<v-app>
<v-card class="mx-auto mt-5 text-center pa-5" width="300" max-width="400px" color="brown lighten-5" >

        <v-img
        src="@/assets/OneRoof.png"
        width="300"
        contain
        class="mt-2 mr-3 pa-0"
        ></v-img>
        
      <v-container>
      <v-card-title class="text-center d-flex justify-center">
        Login
      </v-card-title>
      </v-container>

      <v-text-field  filled  label="Email" v-model="email"></v-text-field>
      <v-text-field filled  type="password" label="Password" v-model="password"></v-text-field>

      <v-btn class="text-center ma-2 pa-5" @click="login">
        Login
      </v-btn>

      <v-container>
        <v-card-subtitle>
          Don't have an account?
        </v-card-subtitle>
      </v-container>

      <v-btn block @click="$emit('emit')"> 
        Register
      </v-btn>
</v-card>


</v-app>

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
