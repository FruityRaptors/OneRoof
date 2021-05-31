<template>
  <div>
    <h1>Hello, {{ this.username }}</h1>
    <button @click="logout">Logout {{ this.username }}</button>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      username: "Jeff",
    };
  },

  mounted() {
    this.username = this.$store.state.user.username;
  },

  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    },
  },
};
</script>
