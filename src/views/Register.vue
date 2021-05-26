<template>
  <div>
    <form @submit.prevent="login">
      <h2>Register</h2>
      <input type="email" placeholder="Email address..." v-model="email" />
      <input type="password" placeholder="password..." v-model="password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
  register() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        alert('Successfully registered! Please login.');
        this.$router.push('/Home');
      })
      .catch(error => {
        alert(error.message);
      });
  },
},
};
</script>

<style>
</style>