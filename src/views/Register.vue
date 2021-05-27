<template>
  <div>
    <form @submit.prevent="register">
      <h2>Register</h2>
      <section>
        <label for="name">What do your housemates call you?</label>
        <input id="name" type="text" placeholder="name..." v-model="username" />
      </section>
      <section>
        <label for="email">Please enter a valid email address</label>
        <input
          id="email"
          type="email"
          placeholder="Email address..."
          v-model="email"
        />
      </section>
      <section>
        <label for="password">Enter a password, at least 6 characters</label>
        <input
          id="password"
          type="password"
          placeholder="password..."
          v-model="password"
        />
      </section>

      <button type="submit">Register</button>
    </form>
  </div>
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
      let email = this.email;
      let password = this.password;
      let username = this.username;
      this.$store.dispatch("registerUser", { email, password, username });
    },
  },
};
</script>

<style>
</style>